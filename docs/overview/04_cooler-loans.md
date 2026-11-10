---
title: "Cooler Loans: Borrow USDS Against gOHM"
description: "Cooler Loans lets holders borrow USDS against gOHM at a governance-set rate, without an external market-price liquidation oracle or loan expiry."
sidebar_label: "Cooler Loans"
---

# Cooler Loans

## Overview

Cooler Loans is Olympus DAO's protocol-native, perpetual lending system that allows OHM (Olympus) token holders to borrow USDS by using their gOHM (governance OHM) tokens as collateral. This lending facility is permissionless, immutable, and governed by Olympus smart contracts. With Cooler Loans, users will have a reliable access to liquidity using their gOHM token as collateral. Cooler V2 introduces a fixed-rate borrowing model backed directly by the Olympus Treasury, with no price-based liquidations and no expiry. V2 evolves beyond V1’s fixed term-based model, offering a more flexible credit primitive for long-term gOHM holders and treasuries.

Cooler Loans differentiates itself from existing lending markets:

- **Treasury-Funded Credit** - Loans draw USDS from the Olympus Treasury, subject to facility capacity.
- **Perpetual Borrowing** - Loans have no scheduled expiry, but debt accrues and a position can default if it crosses the protocol's liquidation threshold.
- **Governance-Set Interest** - Interest accrues continuously at the rate configured on-chain.
- **No Market-Price Liquidations** - Cooler V2 does not liquidate positions because of an external market-price feed. Its on-chain debt and collateral limits still apply.
- **Unified Loan Position** - One dynamic loan per user- collateral, debt, and repayments are managed flexibly.
- **Governance-Aligned LTV Drip** - Origination LTV increases over time through a governance-controlled drip system.
- **gOHM Collateral** - Ensures borrowing is backed by a protocol-native asset, reinforcing system solvency.
- **Delegated Voting Power** - Users can delegate voting power from Cooler collateral to up to 10 delegate addresses.
- **No External Price Oracle** - Borrowing and liquidation use governance-defined LTVs, not an external collateral-price feed.
- **Manual Leverage Flexibility** - Users can re-leverage at their discretion by adding collateral and borrowing more, enabling custom exposure timing and pricing based on market premiums.
- **No Exit Fees** - There are no penalties or fees for full or partial repayment of loans.
- **Governance-Set Terms** - Capacity, LTV parameters, drip rate and interest rate are controlled by on-chain configuration.

## Architecture

Cooler V2 uses policy, module and periphery contracts. The primary borrowing flow uses MonoCooler; the Migrator is legacy periphery rather than part of the ordinary V2 loan flow.

| Layer     | Contract                                                  | Purpose                                                              |
| --------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| Policy    | [`MonoCooler`](/main/contracts/addresses#policies)        | Core contract managing loan state.                                   |
| Policy    | [`LTV Oracle`](/main/contracts/addresses#policies)        | Defines origination and liquidation LTVs.                            |
| Policy    | [`Treasury Borrower`](/main/contracts/addresses#policies) | Connects loan disbursement to the Olympus Treasury.                  |
| Module    | [`DLGTE`](/main/contracts/addresses#modules)              | Enables multi-wallet delegation and vote assignment.                 |
| Periphery | [`Composites`](/main/contracts/addresses#periphery)       | Enables gas-efficient combined actions, such as deposit plus borrow. |

### Loan Terms and Conditions

Before borrowing from Cooler V2, it's important to understand the terms and conditions:

| Term                                     | How it works                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Loan&nbsp;asset                          | Loans are extended in USDS against gOHM collateral.                                                                                                                            |
| Interest&nbsp;rate                       | The annualized rate is configured on-chain and can change through governance.                                                                                                  |
| Origination&nbsp;LTV                     | The origination loan-to-collateral ratio is defined by the [LTV Oracle](/main/contracts/addresses#policies) and may change over time through governance-controlled parameters. |
| Liquidation&nbsp;premium                 | Read the current configured value before relying on it for a loan.                                                                                                             |
| Origination&nbsp;LTV&nbsp;drip&nbsp;rate | The configured drip moves origination LTV toward its target.                                                                                                                   |
| Minimum&nbsp;debt                        | A minimum applies when opening or maintaining a loan; check the current contract or app value before transacting.                                                              |

:::note
The [CoolerV2LtvOracle](/main/contracts/addresses#policies) supplies the current origination and liquidation LTVs. The Olympus app displays current borrowing terms; verify them before opening or changing a loan. Historical governance decisions are not a substitute for current contract state.
:::

Governance can update these parameters as needed.

### Opening a Loan

To open a loan, a user will first need to obtain gOHM. A user requests a loan by specifying the amount of USDS to borrow. Alternatively, a user can specify the amount of gOHM collateral to deposit and use the slider to determine the LTV. The calculation between collateral and borrowable asset is determined by the Loan-to-Collateral defined on the LTV Oracle.

It’s important to highlight that interest on the loan accrues over the duration of the loan, beginning at the time the loan is opened.

Example: a user requests to borrow against 1 gOHM. The LTV Oracle determines the maximum USDS borrow amount at the time the loan is opened. Interest begins accruing immediately at the annualized rate, so the user's debt gradually increases until they repay.

![Originating a Loan](../../static/gitbook/assets/origination.png)

### Repaying a Loan

Borrowers can repay a loan at any time with any amount using the Olympus front-end or by calling the `repay()` function on the [Cooler V2 contract](/main/contracts/addresses#policies). However, because of how loans are fulfilled, any repayment will be allocated toward interest first. Any repayment in excess of interest owed is then allocated to repaying the principal. Partial repayments reduce both debt and the associated interest-bearing collateral, which becomes withdrawable. Full repayment stops interest accrual and unlocks the full gOHM collateral. Withdrawals must be executed manually unless bundled using the [Composites contract](/main/contracts/addresses#periphery).

Example: a user borrowed against 1 gOHM several months ago and has accrued interest on the outstanding USDS debt. For this example, assume the user owes a small amount of interest in addition to principal.

- If the user repays less than the accrued interest, the repayment reduces interest owed but does not unlock collateral.
- If the user repays exactly the accrued interest, the user owes no interest and still owes the full principal. No collateral is unlocked.
- If the user repays more than the accrued interest, the excess repayment reduces principal and unlocks the corresponding amount of collateral.
- If the user fully repays accrued interest and principal, the full collateral balance becomes withdrawable.

![Repaying a Loan](../../static/gitbook/assets/repayment.png)

### Multi-Wallet Delegation & Voting Power

Cooler Loans V2 supports advanced delegation of gOHM through the [DLGTE module](/main/contracts/addresses#modules). This enables users to assign voting rights to up to 10 different addresses for both wallet-held and Cooler V2 loan-associated gOHM. Note: this is also where users can manage delegation for any legacy Cooler Clearinghouse V1 voting power if they hold a position there.

Users can manage delegation through the Olympus app's delegation interface. Once a wallet is connected, they can assign voting power for:

- Wallet Voting Power (directly held gOHM)
- Cooler Clearinghouse V1 Voting Power (gOHM used as loan collateral)
- Cooler V2 Voting Power (gOHM used as loan collateral)

Each delegation allows users to choose a delegate address, and optionally self-delegate. Delegated gOHM is moved into a cloned DelegateEscrow contract, separating it from the [DLGTE module](/main/contracts/addresses#modules) and assigning it to the chosen delegate.

**End State:**

- Delegation is active and can be updated at any time via "Manage Delegation"
- Governance participation can be delegated across up to 10 addresses

:::note
When delegation is applied, gOHM is not just logically assigned but physically moved into a [DelegateEscrow](../contracts/docs/src/external/cooler/DelegateEscrow.sol/contract.DelegateEscrow) contract. This ensures separation of powers and formalized delegation at the contract level.
:::

Refer to the diagram below for a visual overview of the delegation flow.

![Delegation](../../static/gitbook/assets/delegation.png)

### Governance Controls

**Governance has control to:**

- Adjust LTV parameters and interest rates
- Define default thresholds
- Enable/disable periphery contracts
- Upgrade loan risk parameters

### Treasury Interaction

Loans are issued from Treasury USDS reserves. Repayments and interest return to protocol-controlled treasury flows; subsequent allocation depends on current governance and operations.

### Existing V1 Positions

The Migrator was built for the V1-to-V2 transition. Do not assume that the historical migration path is available in the current app. V1 borrowers should inspect their existing loan and the current supported repayment or migration flow before acting.

### Use Cases

- gOHM Holders - Access stable liquidity without selling OHM.
- DAOs/Treasuries - Borrow from protocol and retain governance control.
- Builders - Use as base credit layer for OHM-native primitives (e.g., hOHM leverage).

## Summary

Cooler Loans V2 is a protocol-native borrowing system that replaces expiring debt with perpetual, flexible credit. It does not liquidate based on external market price movements, but debt accrues over time and positions can still default if debt grows beyond the protocol-defined liquidation threshold. By requiring gOHM as collateral, it reinforces alignment with Olympus governance and long-term protocol incentives. Loan growth is managed transparently through a governance-controlled, drip-fed LTV increase mechanism, enabling sustainable expansion over time. Altogether, Cooler Loans V2 serves as a foundational building block for Olympus’ on-chain financial infrastructure.

## FAQ

### What chains are Cooler Loans available on?

Cooler Loans are only available on Ethereum.

### What token do I need for interest payments?

Interest payments must be completed with USDS.

### Can I pay interest from a different wallet?

Yes, interest payments can be made by wallets other than the one originating the loan.

### What if I need to repay, can I pay partial interest?

Interest accrues continuously. Partial repayments first cover accrued interest; to fully close the position and release all collateral, you must repay accrued interest plus any outstanding principal.

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

To vote with Cooler collateral, users must delegate its voting power. They can self-delegate or choose another delegate address, up to 10 addresses total. Undelegated collateral is not counted by the voting process.

- Delegation can be completed through the Olympus app once a user has an active loan.
- Delegation must be completed prior to a snapshot proposal going live or the user will be unable to vote for that proposal.
- ALL of the collateral in your Cooler is delegated when calling this function.
- You only need to call delegate once, it will automatically recognize each time you add to your loan.
- You can choose to change the address(s) that you delegate to at a later time.

## Contracts

Current Cooler V2 contract addresses are maintained on the [contract addresses page](/main/contracts/addresses). See the [Policies](/main/contracts/addresses#policies), [Modules](/main/contracts/addresses#modules), and [Periphery](/main/contracts/addresses#periphery) sections for active Cooler V2 contracts, and [Policies (deprecated)](/main/contracts/addresses#policies-deprecated) for legacy Clearinghouse contracts.
