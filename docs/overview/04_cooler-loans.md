# Cooler Loans

## Overview

Cooler Loans is Olympus DAO's protocol-native, perpetual lending system that allows OHM (Olympus) token holders to borrow USDS by using their gOHM (governance OHM) tokens as collateral. This lending facility is permissionless, immutable, and governed by Olympus smart contracts. With Cooler Loans, users will have a reliable access to liquidity using their gOHM token as collateral. Cooler V2 introduces a fixed-rate borrowing model backed directly by the Olympus Treasury, with no price-based liquidations and no expiry. V2 evolves beyond V1’s fixed term-based model, offering a more flexible credit primitive for long-term gOHM holders and treasuries.

Cooler Loans differentiates itself from existing lending markets:

- **Peer-to-lender** - loans originate from Olympus Treasury. Practically, Cooler Loans acts as lender-of-last-resort and can guarantee liquidity because every gOHM is backed by USDS.
- **Perpetual Borrowing** - No expiration or renewal needed. Positions stay open as long as interest is paid.
- **Fixed 0.5% APR** - Continuous interest accrual, set via governance, independent of market conditions.
- **No Price-Based Liquidations** - Whereas most lending markets will liquidate your position if underlying collateral falls below a certain price, Cooler Loans is in a unique position to offer liquidation-free loans because every gOHM is backed by USDS. As long as Loan-to-Collateral value is at a safe discount relative to actual backing, the protocol remains solvent. Loans default only when unpaid interest exceeds a governance-defined threshold.
- **Unified Loan Position** - One dynamic loan per user- collateral, debt, and repayments are managed flexibly.
- **Governance-Aligned LTV Drip** - Origination LTV increases over time through a governance-controlled drip system.
- **gOHM Collateral** - Ensures borrowing is backed by a protocol-native asset, reinforcing system solvency.
- **Delegated Multi-Wallet Access** - Up to 10 wallets can manage a single loan position.
- **Oracle-Free, Fully Treasury-Backed** - Since Cooler Loans does not have price liquidations and origination is based on a governance defined value, it doesn’t depend on any external oracles or price feeds.
- **Manual Leverage Flexibility** - Users can re-leverage at their discretion by adding collateral and borrowing more, enabling custom exposure timing and pricing based on market premiums.
- **No Exit Fees** - There are no penalties or fees for full or partial repayment of loans.
- **Reduced Contract Risk** - Cooler V2 is a minimal, single-purpose system, reducing attack surface and simplifying security assumptions.
- **Predictable Terms** - Capacity, Loan-to-backing amount, drip rate, and interest rates are all established parameters determined by governance.

## Architecture

### Policies
`MonoCooler` - Core contract managing loan state.
`LTV Oracle` - Defines origination and liquidation LTVs.
`Treasury Borrower` - Connects loan disbursement to the Olympus Treasury.
### Modules
`DLGTE` - Enables multi-wallet delegation and vote assignment.
### Periphery
`Composites` - Enables gas-efficient combined actions (e.g., deposit + borrow).
`Migrator` - Streamlines transition from Cooler V1 to V2.


### Loan Terms and Conditions

Before borrowing from the Clearinghouse, it's important to understand the terms and conditions:

- Loans are extended in USDS, against gOHM collateral
- Loans have an annualized interest rate of 0.5%, as approved by OCG Proposal 8
- The Initial Origination loan-to-collateral ratio (as of May 15, 2025) is 2961.64 USDS/gOHM (~ 11 USDS/OHM)
- The Liquidation Premium is 1%.
- The LTV Drip Rate: max (positive) rate of change of Origination LTV allowed: 0.0000011574 USDS/second (0.1 USDS/day)
- Minimum debt required to open a loan: 1000 USDS
- Origination LTV Update Interval: 604800 seconds (7 days)

:::Note
The system gradually increases the LTV through a drip mechanism, moving from its current value toward the target origination LTV for the Cooler V2 policy to be 2991.2564 USDS/gOHM (~ 11.11 USDS/OHM) on 15th May 2026.  This is a linear release, not a cadence-based recalculation.
:::

Governance can update these parameters as needed.

### Opening a Loan

To open a loan, a user will first need to obtain gOHM. A user requests a loan by specifying the amount of USDS to borrow. Alternatively, a user can specify the amount of gOHM collateral to deposit and use the slider to determine the LTV. The calculation between collateral and borrowable asset is determined by the Loan-to-Collateral defined on the LTV Oracle.

It’s important to highlight that interest on the loan accrues over the duration of the loan, beginning at the time the loan is opened. 

Example: user requests to borrow against 1 gOHM. The LTV for cooler is 2961.64 USDS per gOHM, at the time the loan is opened, the user owes 0.4 USDS in interest (0.5% multiplied by 2961.64 USDS principal multiplied by 1 day out of 365). User gets 2961.62 USDS in their wallet and transfers 1 gOHM.

![Originating a Loan](/gitbook/assets/origination.png)

### Repaying a Loan

Borrowers can repay a loan at any time with any amount using the Olympus front-end or by calling the repay() function on the Cooler V2 contract. However, because of how loans are fulfilled, any repayment will be allocated toward interest first. Any repayment in excess of interest owed is then allocated to repaying the principal. Partial repayments reduce both debt and the associated interest-bearing collateral, which becomes withdrawable. Full repayment stops interest accrual and unlocks the full gOHM collateral. Withdrawals must be executed manually unless bundled using the Composites contract.


Example: user borrowed against 1 gOHM 4 months ago. The LTV for cooler is 2961.64 USDS per gOHM, therefore the interest owed is 4.936 USDS at this point. For this example ignore the drip rate.

- If user repays 1 USDS, the user now owes 3.936 USDS in interest and 2961.64 USDS in principal. User gets no collateral back.
- If user repays 4.936 USDS, user owes no interest and only 2961.64 USDS in principal. User gets no collateral back.
- If user repays 500 USDS, user has fully repaid interest (4.936 USDS) and partially repaid principal (495.064 USDS). User gets 0.1671 gOHM collateral back (495.064/2961.64).
- If user repays 2966.567 USDS, user has fully repaid interest (4.936 USDS) AND fully repaid 2961.64 USDS in principal. User gets back their 1 gOHM collateral.

![Repaying a Loan](/gitbook/assets/repayment.png)

### Multi-Wallet Delegation & Voting Power

Cooler Loans V2 supports advanced delegation of gOHM through the DLGTE module. This enables users to assign voting rights to up to 10 different addresses for both wallet-held and Cooler V2 loan-associated gOHM. Note: this is also where users can manage delegation for any legacy Cooler Clearinghouse V1 voting power if they hold a position there.

Users can manage delegation through the "Governance" page in the Olympus app under the Delegation tab. Once a wallet is connected, they can assign voting power for:
- Wallet Voting Power (directly held gOHM)
- Cooler Clearinghouse V1 Voting Power (gOHM used as loan collateral)
- Cooler V2 Voting Power (gOHM used as loan collateral)

Each delegation allows users to choose a delegate address, and optionally self-delegate. Delegated gOHM is moved into a cloned DelegateEscrow contract, separating it from the DLGTE module and assigning it to the chosen delegate.

**End State:**
- Delegation is active and can be updated at any time via "Manage Delegation"
- Governance participation and Cooler loan management can be shared across up to 10 wallets

:::Note
When delegation is applied, gOHM is not just logically assigned but physically moved into escrow. This ensures separation of powers and formalized delegation at the contract level.
:::

Refer to the diagram below for a visual overview of the delegation flow.

![Delegation](/gitbook/assets/delegation.png)



### Governance Controls
**Governance has control to:**
- Adjust LTV parameters and interest rates
- Define default thresholds
- Enable/disable periphery contracts
- Assign delegate addresses
- Upgrade loan risk parameters

### Treasury Interaction
Loans are issued from Treasury USDS reserves. Interest is recycled into:
- Yield Repurchase Facility (YRF)
- Liquidity provisioning
- Governance-directed initiatives

### Migration from V1
A dedicated Migrator contract allows users to:
- Exit V1 positions
- Transition to V2 seamlessly
- Maintain collateral continuity

### Use Cases
- gOHM Holders - Access stable liquidity without selling OHM.
- DAOs/Treasuries - Borrow from protocol and retain governance control.
- Builders - Use as base credit layer for OHM-native primitives (e.g., hOHM leverage).


## Summary
Cooler Loans V2 is a protocol-native borrowing system that replaces expiring debt with perpetual, flexible credit. It eliminates price-based liquidation risk entirely, ensuring borrower safety through predictable, behavior-based mechanics. By requiring gOHM as collateral, it reinforces alignment with Olympus governance and long-term protocol incentives. Loan growth is managed transparently through a governance-controlled, drip-fed LTV increase mechanism, enabling sustainable expansion over time. Altogether, Cooler Loans V2 serves as a foundational building block for Olympus’ on-chain financial infrastructure.



## FAQ

### What chains are Cooler Loans available on?

Cooler Loans are only available on Ethereum.

### What token do I need for interest payments?

Interest payments must be completed with USDS. 

### Can I pay interest from a different wallet?

Yes, interest payments can be made by wallets other than the one originating the loan.

### What if I need to repay, can I pay partial interest?

Interest is charged on an accrual basis. To get your principal back you will need to pay interst in full.

### How many Cooler Loans can I have?

You will have one Cooler Loan per wallet. Any additional funds deposited will be reflected in this singular position. 

### Can I loop my loan?

Yes, it is possible to convert the USDS obtained from the loan back into gOHM and to add to your Cooler position. Use caution when choosing to leverage.

### What if I want to add to my loan amount?

To increase the loan amount simply deposit more collateral, or borrow more against existing deposited collateral if available. 

### Can I partially pay back my loan?

You may make a partial payment on your loan. All payments are automatically applied towards outstanding interest payment prior to being applied to the principal.

### If I partially repay a loan, can I just reborrow those funds later?

Yes, you can add to the loan at any time. 

### If I partially repay a loan, will my interest payments change to reflect the lower balance?

If you have paid part of the balance, the interest amount will reflect the outstanding balance instead of the original loan value.

### Do Cooler Loans increase OHM supply?

No, Cooler Loans do not cause an increase in supply.

### What happens to the defaulted gOHM?

When a loan is defaulted, the underlying collateral is burned.

### Can a user vote with their Cooler collateral?

To participate in governance, users MUST self-delegate in order to be able to use Cooler collateral to vote on snapshot proposals. Undelegated collateral is unable to be recognized by snapshot. Users can either delegate to their own address, or delegate their voting power to another address, up to 10 addresses total.
- Delegation can be completed via the Cooler page on the app once a user has an active loan.
- Delegation must be completed prior to a snapshot proposal going live or the user will be unable to vote for that proposal.
- ALL of the collateral in your Cooler is delegated when calling this function.
- You only need to call delegate once, it will automatically recognize each time you add to your loan.
- You can choose to change the address(s) that you delegate to at a later time.

## Contracts

| Contract              | Type    | Address                                                                                                                        |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Monocooler       | Policy  | [`0xdb591Ea2e5Db886dA872654D58f6cc584b68e7cC`](https://etherscan.io/address/0xdb591Ea2e5Db886dA872654D58f6cc584b68e7cC)        |
| LTV Oracle      | Policy  | [`0x9ee9f0c2e91E4f6B195B988a9e6e19efcf91e8dc`](https://etherscan.io/address/0x9ee9f0c2e91E4f6B195B988a9e6e19efcf91e8dc)        |
| Treasury Borrower       | Policy  | [`0xD58d7406E9CE34c90cf849Fc3eed3764EB3779B0`](https://etherscan.io/address/0xD58d7406E9CE34c90cf849Fc3eed3764EB3779B0)        |
| DLGTE       | Module  | [`0xD3204Ae00d6599Ba6e182c6D640A79d76CdAad74`](https://etherscan.io/address/0xD3204Ae00d6599Ba6e182c6D640A79d76CdAad74)        |
| Cooler V2 Composites        | Periphery  | [`0x6593768feBF9C95aC857Fb7Ef244D5738D1C57Fd`](https://etherscan.io/address/0x6593768feBF9C95aC857Fb7Ef244D5738D1C57Fd)        |
| Cooler V2 Migrator       | Periphery  | [`0xe045bd0a0d85e980aa152064c06eae6b6ae358d2`](https://etherscan.io/address/0xe045bd0a0d85e980aa152064c06eae6b6ae358d2)        |
