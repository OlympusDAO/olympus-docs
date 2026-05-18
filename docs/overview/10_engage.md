# Engage Program

## 1. Introduction

### What is the Engage Program?

The Engage Program is an Olympus initiative that distributes convertible OHM tokens (convOHM) to users who participate in Convertible Deposits (CDs). Participation is measured in **Drachmas (Dp)** — an off-chain accounting unit that tracks each participant's daily activity across a 7-day epoch. At the end of every epoch, participants receive a pro-rata share of the epoch's convOHM incentive pool, sized by the Drachmas they accrued relative to all other participants.

Engage exists to align the users, who carry the protocol forward, with the protocol's long-term economic outcomes. Instead of distributing OHM directly, Engage distributes call options on OHM that can be exercised at a defined conversion price within a defined exercise window.

## 2. Design Principles

### No dilution to token holders

Engage does not introduce new OHM emissions on top of existing protocol cash flows. convOHM only mints OHM when a participant exercises, and only at a conversion price that is bounded below by backing plus a buffer value. Every OHM produced through Engage is paid for in a quote token (such as USDS) and delivered to the treasury above its backing value, so exercises add to treasury reserves rather than dilute them.

### Pool sized against CD revenue

The convOHM incentive pool for each epoch is **sized against** the CD revenue generated during that epoch. CD yield continues to flow to the [Yield Repurchase Facility](./06_yield-repurchase-facility.md) as it does today.

### Long-term alignment over short-term extraction

convOHM is a call option, not an immediate transfer of OHM. Each allocation carries:

- A **lock period** (3 months from epoch close) during which convOHM cannot be exercised.
- An **exercise window** (1 month after the Lock Period ends) during which convOHM can be converted into OHM at the Conversion Price.

This structure rewards participants who remain engaged with the protocol over time rather than those who arrive only to extract a single distribution.

## 3. How Engage Program Works

### Lifecycle

1. **Accrue Drachmas.** As you participate in eligible CD actions, you generate Drachmas every day. Different actions accrue at different rates.
2. **Epoch closes.** Each epoch lasts 7 days. When the epoch ends, every participant's Drachma total is finalized and used to compute their pro-rata share of the incentive pool.
3. **Pool sizing and conversion price are set.** The pool size is derived from CD revenue for that epoch. The Conversion Price for the epoch's convOHM is set by the formula `max(Backing × (1 + Buffer), TWAP × (1 − Discount))`.
4. **Allocation is published on-chain.** A Merkle root encoding every participant's convOHM allocation is posted on-chain by the protocol multisig.
5. **Participants claim convOHM.** Using a Merkle proof, each participant claims their convOHM tokens. Claims can be batched across multiple epochs in a single transaction.
6. **Hold through the lock period.** convOHM is non-exercisable for 3 months after epoch close.
7. **Exercise during the exercise window.** During the 1-month exercise window, participants can pay the conversion price in the configured quote token to mint OHM. Any convOHM not exercised before the window closes expires.

### Eligibility

To accrue Drachmas in a given epoch, a participant must hold at least **0.5 gOHM or OHM**, or have an equivalent amount of voting power delegated to or from them. The floor is designed to keep distributions targeted at participants with a real stake in the protocol. Activity from addresses that do not meet the floor is not credited.

## 4. Drachmas

### What is a Drachma?

A **Drachma (Dp)** is the accounting unit of the Engage Program. Drachmas measure how much a participant has engaged with eligible protocol activities during an epoch. They are not a token, are not transferable, and have no on-chain representation. Drachmas exist solely as a record of activity used to size each participant's pro-rata share of the convOHM incentive pool at epoch close.

Drachmas are scoped to a single epoch. They do not roll over.

### How Drachmas are accrued

Every day, the Engage backend takes a snapshot of each participant's eligible positions and activity on a UTC daily cadence, then credits Drachmas accordingly. Each incentivized action has its own Drachma rate:

- **Recurring actions** (such as holding a CD deposit) accrue Drachmas every day the position is held.
- **One-shot actions** (such as converting a CD) credit a fixed amount of Drachmas at the moment they occur.

The full catalog of incentivized actions and their accrual rates is listed in [Section 5](#5-incentivized-actions).

### Pro-rata share at epoch close

When an epoch ends, the backend totals every participant's Drachmas for the epoch and computes their share of the incentive pool:

```
participant_allocation = (participant_drachmas / total_drachmas_in_epoch) × incentive_pool
```

The incentive pool is denominated in convOHM and is sized from the CD revenue generated during that epoch.

### Notes on Drachma accounting

- **No Drachma token.** There is no ERC-20 for Drachmas. Any third-party "Drachma token" is not part of the Engage Program.
- **Non-transferable.** Drachmas are credited to the address that performed the eligible activity and cannot be moved between addresses.
- **Off-chain unit, on-chain outcome.** Accrual is tracked off-chain, but each epoch's final allocation is committed to a Merkle root on-chain. The on-chain record is authoritative for claims.

## 5. Incentivized Actions

The table below summarizes the actions that accrue Drachmas. Recurring rates apply per dollar of position held per day; one-shot rates credit at the moment the action occurs.


| Action                      | Type      | Rate                                                 |
| --------------------------- | --------- | ---------------------------------------------------- |
| CD Deposit                  | Recurring | 0.01 Dp / $ / day                                    |
| Limit Order Deposit         | Recurring | 0.01 Dp / $ / day                                    |
| CD Borrow Bonus (LTV ≥ 80%) | Recurring | 0.0025 Dp / $ / day                                  |
| CD Conversion               | One-shot  | `(convertedAmount × cd_deposit_rate × daysHeld) / 3` |


### CD Deposit

A participant accrues Drachmas every day they hold an active Convertible Deposit position. The accrual is proportional to the size of the deposit (in USD terms), so a $1,000 CD held for one day earns 10 Dp.

### Limit Order Deposit

Participants who place a limit order against the CD auction accrue Drachmas on the unfilled portion of the order budget at the same rate as CD Deposits. This rewards participants who provide standing demand for the CD auction without requiring an immediate fill.

### CD Borrow Bonus

Participants who borrow against their redemption-stage CD position accrue an additional bonus if their loan-to-value ratio is higher than 80%. The bonus is paid on the borrowed principal and is additive to the underlying CD Deposit accrual. High-LTV borrowers continue to receive the base CD Deposit rate as well.

### CD Conversion

When a participant converts a CD into OHM, they receive a one-shot Drachma credit calculated as one third of the Drachmas they would have accrued by holding the deposit at the CD Deposit rate for `daysHeld`.

## 6. Epochs

### Epoch lifecycle

Engage operates on a continuous 7-day epoch cycle. Each epoch is identified by its end date (in UTC) and progresses through three states:

1. **Pending.** The epoch is currently accruing Drachmas. Daily snapshots are taken and the backend updates each participant's running totals.
2. **Completed.** The epoch has ended. The backend finalizes Drachma totals, sizes the incentive pool from that epoch's CD revenue, sets the conversion price, generates the Merkle tree of allocations, and computes each participant's proof.
3. **Submitted.** The protocol multisig publishes the Merkle root on-chain, after which participants can claim their convOHM allocation for the epoch.

### Incentive pool sizing

The convOHM incentive pool for an epoch is sized against the CD revenue generated during that epoch. The CD yield itself continues to flow to the [Yield Repurchase Facility](./06_yield-repurchase-facility.md); the revenue figure simply scales how much convOHM the program writes for the epoch. The pool is denominated in OHM units (the maximum number of OHM that the epoch's convOHM could mint if every option were exercised), so the size depends on both the epoch's CD revenue and the prevailing OHM price.

### Conversion Price

The Conversion Price determines how much quote token a participant must pay to exercise one OHM worth of convOHM. It is set per epoch by the formula:

```
Conversion price = max(Backing × (1 + Buffer), TWAP × (1 − Discount))
```

- **Backing** is the protocol's liquid backing per OHM. The buffer term ensures convOHM is never exercisable below backing plus a protective margin.
- **TWAP** is a time-weighted average of OHM's market price across the epoch. The discount term ensures the conversion price tracks the market while still offering a margin to convOHM holders.
- The conversion price is the **larger** of the two values, so neither protective constraint can be bypassed.

### On-chain publication

Once the epoch is complete and the Merkle tree is generated, the protocol multisig publishes the epoch's Merkle root and convOHM parameters on-chain. A new convOHM ERC-20 is deployed for the epoch (typically named `convOHM-YYYYMMDD`), and the epoch becomes claimable.

## 7. convOHM

### What is convOHM?

**convOHM** is an ERC-20 call option on OHM, issued by the Engage Program. Each epoch produces its own convOHM contract with the following immutable parameters:

- **Quote token** — the asset participants pay when exercising (typically USDS).
- **Conversion price** — the amount of quote token required to mint one OHM.
- **Eligible timestamp** — the moment exercise becomes possible (the end of the lock period).
- **Expiry timestamp** — the moment exercise stops (the end of the exercise window).

convOHM tokens are transferable like any ERC-20, but they can only be exercised by paying the conversion price to the protocol within the exercise window.

### Lock Period and Exercise Window

Every convOHM allocation moves through two phases after its epoch closes:

1. **Lock period — 3 months from epoch close.** convOHM exists in the participant's wallet but cannot be exercised. It can be transferred during this period.
2. **Exercise window — 1 month after the Lock Period ends.** convOHM can be exercised at the conversion price. Once the window closes, the option can no longer be converted.

### Exercising convOHM

To exercise convOHM, a participant:

1. Approves the convOHM contract to spend the required amount of quote token.
2. Calls the exercise function, specifying the amount of convOHM to convert.
3. The convOHM is burned, the quote-token payment is routed to the treasury, and the participant receives the corresponding amount of OHM (minted by the protocol's MINTR module).

The OHM received is freshly minted; the quote-token payment offsets the mint by adding value to the treasury.

### After the Exercise Window

convOHM that is not exercised before the exercise window closes can no longer be converted into OHM. The protocol periodically sweeps expired convOHM contracts to reclaim any reserved mint capacity. Holders should set a reminder to exercise before the window closes if they intend to convert.

## 8. Claiming

### Step-by-step

1. **Wait for the epoch to be published.** The convOHM allocation for an epoch becomes claimable only after the Merkle root is published on-chain (typically within a short delay after epoch close).
2. **Look up your allocation.** Through the Engage front-end, check your allocation.
3. **Submit the claim.** Click on the "Claim" button in the frontend. The contract verifies the proof against the on-chain Merkle root and, if valid, mints the convOHM tokens to your address.
4. **Hold through the lock period.** Once claimed, convOHM is in your wallet but is not yet exercisable.
5. **Exercise during the exercise window.** Use the "Convert" section of the app to pay the conversion price in the quote token to convert convOHM into OHM at any point during the 1-month window.

### Batch claims

Participants can claim all multiple epochs in a single transaction. This is the recommended approach for participants who let several epochs accumulate before claiming.

### Missed claims

Allocations remain claimable as long as the epoch's Merkle root is live on-chain. A participant who skips a claim window does not lose their allocation, but they should still claim before the convOHM's exercise window closes. convOHM that cannot be exercised loses its primary utility.

## 9. Frequently Asked Questions

**Does Engage create new OHM emissions?**  
No. OHM is only minted when a participant exercises convOHM, and only at the conversion price, which is bounded below by backing plus a buffer value. Each exercise is value accretive to the treasury, so the program does not add unbacked OHM to circulation. The CD revenue used to size the pool continues to flow to YRF buybacks unchanged.

**Can I participate from multiple wallets?**  
Drachmas are credited to the address that performed the eligible activity. Each address that independently meets the 0.5 gOHM / OHM / voting-power eligibility floor accrues separately. Splitting activity across wallets does not multiply the allocation, pro-rata share is preserved.

**What happens if I sell my CD position mid-epoch?**
Recurring actions accrue daily based on the position held that day. If you exit a position before an epoch ends, you stop accruing Drachmas for that action from that point onward but keep whatever you accrued earlier in the epoch.

**Can I transfer convOHM?**  
Yes. convOHM is a standard ERC-20. The lock period restricts exercise, not transfer.

**What if I miss the exercise window?**  
convOHM that is not exercised within the 1-month window can no longer be converted into OHM. Plan to exercise (or transfer to someone who will) before the window closes.

**Where do I check my Drachmas and allocations?**  
Through the Engage front-end, which exposes per-action Drachma accrual, per-epoch allocations, and Merkle proofs.

**Is the program audited?**
Yes — see the [Audits](../security/02_audits.md) page for the Trust review of the Engage incentive distribution contracts.