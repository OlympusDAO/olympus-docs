---
title: "Cooler Loans: Borrow USDS Against gOHM"
description: "Cooler Loans is Olympus's perpetual lending facility: borrow USDS against gOHM at a fixed 0.5% APR, with no price-based liquidation, no oracle, and no expiry."
sidebar_label: "Cooler Loans"
---

# Cooler Loans

## Overview

Cooler Loans is Olympus DAO's protocol-native, perpetual lending system that allows OHM (Olympus) token holders to borrow USDS by using their gOHM (governance OHM) tokens as collateral. This lending facility is permissionless, immutable, and governed by Olympus smart contracts. With Cooler Loans, users will have a reliable access to liquidity using their gOHM token as collateral. Cooler V2 introduces a fixed-rate borrowing model backed directly by the Olympus Treasury, with no price-based liquidations and no expiry. V2 evolves beyond V1’s fixed term-based model, offering a more flexible credit primitive for long-term gOHM holders and treasuries.

Cooler Loans differentiates itself from existing lending markets:

- **Peer-to-lender** - loans originate from Olympus Treasury. Practically, Cooler Loans acts as lender-of-last-resort and can guarantee liquidity because every gOHM is backed by USDS.
- **Perpetual Borrowing** - No expiration or renewal needed. Positions stay open as long as interest is paid.
- **Governance-Set Fixed APR** - Continuous interest accrual, set by governance. The current on-chain rate is approximately 0.4988% per year.
- **No Market Price-Based Liquidations** - Whereas most lending markets liquidate positions when collateral market price falls below a threshold, Cooler V2 does not use an external price oracle for liquidations. Positions can still be liquidated if debt grows past the on-chain liquidation LTV set by the LTV Oracle.
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

#### Policies

- `MonoCooler` - Core contract managing loan state.
- `LTV Oracle` - Defines origination and liquidation LTVs.
- `Treasury Borrower` - Connects loan disbursement to the Olympus Treasury.

#### Modules

- `DLGTE` - Enables multi-wallet delegation and vote assignment.

#### Periphery

- `Composites` - Enables gas-efficient combined actions (e.g., deposit + borrow).
- `Migrator` - Historical periphery used to streamline transition from Cooler V1 to V2.

### Loan Terms and Conditions

Before borrowing from MonoCooler, it's important to understand the terms and conditions:

- Loans are extended in USDS, against gOHM collateral
- Loans have a governance-set annualized interest rate. The current on-chain rate is approximately 0.4988% per year.
- The current origination LTV is approximately 3,028.24 USDS/gOHM.
- The current liquidation LTV is approximately 3,058.52 USDS/gOHM.
- The liquidation premium is 1%.
- The LTV drip rate is the maximum positive rate of change of origination LTV allowed: 0.0000011574 USDS/second, or 0.1 USDS/day.
- Minimum debt required to open a loan: 1000 USDS
- Debt must remain above 1000 USDS or be paid off entirely if closing a position.
- Origination LTV Update Interval: 604800 seconds (7 days)

:::note
The system gradually increases origination LTV through a drip mechanism toward the max origination LTV configured in the Cooler V2 contract. The value users see can change over time, so the live contract should be treated as the source of truth for current borrowing capacity.
:::

Governance can update these parameters as needed.

### Opening a Loan

To open a loan, a user will first need to obtain gOHM. A user requests a loan by specifying the amount of USDS to borrow. Alternatively, a user can specify the amount of gOHM collateral to deposit and use the slider to determine the LTV. The calculation between collateral and borrowable asset is determined by the Loan-to-Collateral defined on the LTV Oracle.

It’s important to highlight that interest on the loan accrues over the duration of the loan, beginning at the time the loan is opened.

Example: if the current origination LTV is 3,028.24 USDS per gOHM, a user borrowing against 1 gOHM can borrow up to approximately 3,028.24 USDS before interest accrual. At a 0.4988% annualized rate, one day of interest on that principal is about 0.41 USDS.

![Originating a Loan](/gitbook/assets/origination.png)

### Repaying a Loan

Borrowers can repay a loan at any time with any amount using the Olympus front-end or by calling the repay() function on the Cooler V2 contract. However, because of how loans are fulfilled, any repayment will be allocated toward interest first. Any repayment in excess of interest owed is then allocated to repaying the principal. Partial repayments reduce both debt and the associated interest-bearing collateral, which becomes withdrawable. Full repayment stops interest accrual and unlocks the full gOHM collateral. Withdrawals must be executed manually unless bundled using the Composites contract.

Example: assume a user borrowed 3,028.24 USDS against 1 gOHM 4 months ago at a 0.4988% annualized rate. The interest owed would be about 5.03 USDS. For this example, ignore later LTV changes.

- If user repays 1 USDS, the user now owes about 4.03 USDS in interest and 3,028.24 USDS in principal. User gets no collateral back.
- If user repays 5.03 USDS, user owes no interest and only 3,028.24 USDS in principal. User gets no collateral back.
- If user repays 500 USDS, user has fully repaid interest and partially repaid principal by about 494.97 USDS. User gets about 0.1635 gOHM collateral back.
- If user repays 3,033.27 USDS, user has fully repaid interest and principal. User gets back their 1 gOHM collateral.

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

:::note
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

Loans are issued from Treasury USDS reserves. Repayments and interest return to the protocol-controlled treasury flow and can be allocated by governance.

### Migration from V1

Cooler V2 included a dedicated Migrator periphery contract to help users transition from V1 positions into V2. Current V1 and V2 positions should be treated separately unless the Olympus app or current governance materials explicitly expose a supported migration path.

### Use Cases

- gOHM Holders - Access stable liquidity without selling OHM.
- DAOs/Treasuries - Borrow from protocol and retain governance control.
- Builders - Use as base credit layer for OHM-native primitives (e.g., hOHM leverage).

## Summary

Cooler Loans V2 is a protocol-native borrowing system that replaces expiring debt with perpetual, flexible credit. It eliminates external market price liquidation risk while retaining on-chain LTV controls for protocol solvency. By requiring gOHM as collateral, it reinforces alignment with Olympus governance and long-term protocol incentives. Loan growth is managed transparently through a governance-controlled, drip-fed LTV increase mechanism, enabling sustainable expansion over time. Altogether, Cooler Loans V2 serves as a foundational building block for Olympus’ on-chain financial infrastructure.

## FAQ

### What chains are Cooler Loans available on?

Cooler Loans are only available on Ethereum.

### What token do I need for interest payments?

Interest payments must be completed with USDS.

### Can I pay interest from a different wallet?

Yes, interest payments can be made by wallets other than the one originating the loan.

### What if I need to repay, can I pay partial interest?

Interest is charged on an accrual basis. To get your principal back you will need to pay interest in full.

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

When a Cooler V2 position is liquidated, the collateral is withdrawn through the protocol flow and the resulting OHM is burned.

### Can a user vote with their Cooler collateral?

To participate in governance, users MUST self-delegate in order to be able to use Cooler collateral to vote on snapshot proposals. Undelegated collateral is unable to be recognized by snapshot. Users can either delegate to their own address, or delegate their voting power to another address, up to 10 addresses total.

- Delegation can be completed via the Cooler page on the app once a user has an active loan.
- Delegation must be completed prior to a snapshot proposal going live or the user will be unable to vote for that proposal.
- ALL of the collateral in your Cooler is delegated when calling this function.
- You only need to call delegate once, it will automatically recognize each time you add to your loan.
- You can choose to change the address(s) that you delegate to at a later time.

## Contracts

| Contract             | Type      | Address                                                                                                                 |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| Monocooler           | Policy    | [`0xdb591Ea2e5Db886dA872654D58f6cc584b68e7cC`](https://etherscan.io/address/0xdb591Ea2e5Db886dA872654D58f6cc584b68e7cC) |
| LTV Oracle           | Policy    | [`0x9ee9f0c2e91E4f6B195B988a9e6e19efcf91e8dc`](https://etherscan.io/address/0x9ee9f0c2e91E4f6B195B988a9e6e19efcf91e8dc) |
| Treasury Borrower    | Policy    | [`0xD58d7406E9CE34c90cf849Fc3eed3764EB3779B0`](https://etherscan.io/address/0xD58d7406E9CE34c90cf849Fc3eed3764EB3779B0) |
| DLGTE                | Module    | [`0xD3204Ae00d6599Ba6e182c6D640A79d76CdAad74`](https://etherscan.io/address/0xD3204Ae00d6599Ba6e182c6D640A79d76CdAad74) |
| Cooler V2 Composites | Periphery | [`0x6593768feBF9C95aC857Fb7Ef244D5738D1C57Fd`](https://etherscan.io/address/0x6593768feBF9C95aC857Fb7Ef244D5738D1C57Fd) |
| Cooler V2 Migrator   | Periphery | [`0xe045bd0a0d85e980aa152064c06eae6b6ae358d2`](https://etherscan.io/address/0xe045bd0a0d85e980aa152064c06eae6b6ae358d2) |
