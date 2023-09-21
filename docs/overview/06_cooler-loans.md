# Cooler Loans

## Overview

Cooler Loans is a decentralized lending facility that allows OHM (Olympus) token holders to borrow DAI by using their gOHM (governance OHM) tokens as collateral. This lending facility is permissionless, immutable, and governed by Olympus smart contracts. With Cooler Loans, users will have a reliable access to liquidity using their gOHM token as collateral.

Cooler Loans differentiates itself from existing lending markets:

- **Peer-to-lender** - loans originate from Olympus Treasury through a clearinghouse contract. Practically, Cooler Loans acts as lender-of-last-resort and can guarantee liquidity because every gOHM is backed by DAI.
- **Fixed duration** - all loans have a fixed maturity.
- **Fixed interest** - all loans have a fixed interest rate that is independent of market conditions.
- **No liquidations** - whereas most lending markets will liquidate your position if underlying collateral falls below a certain price, Cooler Loans is in a unique position to offer liquidation-free loans because every gOHM is backed by DAI. As long as Loan-to-Collateral value is at a safe discount relative to actual backing, the protocol remains solvent.
- **Oracle-free** - since Cooler Loans does not have liquidations, it doesn’t depend on any external oracles.
- **Isolated risk architecture** - whereas most lending markets socialize borrower risk through shared pool architecture, Cooler Loans isolates risk via user-specific debt-collateral contracts called Coolers.

## Architecture

Cooler Loans is built on top of three smart contracts and two structs:

- **Cooler.sol** - Cooler is an escrow contract that facilitates fixed-duration, peer-to-peer loans for a user-debt-collateral combination. Some of the responsibilities of Cooler contract include:
  - Keeps track of all the requests/loans and their status
  - Escrows the collateral during the lending period
  - Handles clearings, repayments, rollovers and defaults
  - Offers callbacks to the lender after key actions happen
- **Clearinghouse.sol** - Clearinghouse is a lender-owned contract that manages loan workflows including fulfilling requests, extending maturities, claiming defaults and rebalancing funds to/from Olympus Treasury. Some of the responsibilities of Clearinghouse contract include:
  - Implements the mandate of the Olympus community in OIP-144 by offering loans at the governance-approved terms
  - Tracks the outstanding debt and interest that the protocol should be received upon repayment
  - Its lending capacity is limited by a FUND_AMOUNT and a FUND_CADENCE.
    Despite providing loans denominated in DAI, the system allocates its dormant capital to the Dai Savings Rate (DSR) while maintaining holdings in sDAI.
    Implements permissioned functions to shutdown, defund, and reactivate the lending facility
- **CoolerFactory.sol** - CoolerFactory is a factory contract for deploying Cooler.sol contracts associated with a user-debt-collateral combination. Some of the responsibilities of CoolerFactory contract include:
  - Keeps track of all the deployed contracts
  - Deploys a new Cooler if the combination of user-debt-collateral doesn't exist yet
  - Uses clones with immutable arguments to save gas
  - In charge of logging the Cooler events
- **Request struct** - Request is a struct that represents intent (or request) by the borrower to borrow DAI against gOHM. Technically, requests may or may not be filled, but current implementation of Clearinghouse.sol automatically fills all requests.
- **Loan struct** - Loan is a struct that represents fulfillment by the lender of a particular Request.

The following diagram may help understand the relationship between the various components:

![Cooler Loan Architecture](/gitbook/assets/cooler-architecture.png)

## Using Cooler Loans

When a user wants to use Cooler Loans, they begin by interacting with CoolerFactory.sol to create a Cooler.sol that is unique to them, the collateral, and the borrowable asset. For this reason, each user can only have one Cooler.sol.

Next, when a user signals intent to borrow say 95 DAI against 100 DAI worth of gOHM, a Request struct is created. Simultaneously, Clearinghouse.sol withdraws the requisite amount of DAI from TRSRY.sol and fulfills the request. The act of fulfillment creates the Loan struct.

At this point, Clearinghouse.sol gets gOHM collateral and the user gets DAI in their wallet. The user can then repay the loan, extend the loan, or default on the loan.

### Loan Terms and Conditions

Before borrowing from the Clearinghouse, it's important to understand the terms and conditions:

- Loans are extended in DAI, against gOHM collateral
- Loans have an annualized interest rate of 0.5%, as approved by TAP-28
- Loan duration is 121 days, as approved by TAP-28
- The loan-to-collateral ratio is 3,000 DAI per gOHM, as approved by TAP-28
- Loans can be extended with the same terms an arbitrary number of times into the future.
- While Clearinghouse.sol is immutable, future governance proposals may deploy new Clearinghouse contracts with updated parameters. Any loan terms made under the original Clearinghouse contract are not affected.
- To minimize smart contract risk, Cooler Loans will be rolled out with a weekly cadence of 18M DAI capacity.

### Opening a Loan

To open a loan, a user will first need to create a Cooler.sol escrow contract for themselves. This happens by interacting with CoolerFactory.sol factory, available on the Olympus frontend.

Once a Cooler is created, a user requests a loan by specifying the amount of DAI to borrow. Alternatively, a user can specify the amount of gOHM collateral to deposit. The calculation between collateral and borrowable asset is fixed by the Loan-to-Collateral defined on Clearinghouse.sol.

In the same transaction that a request is created, Clearinghouse.sol fulfills the request by creating a Loan struct with the following parameters:

- principal - amount of DAI that is borrowed
- expiry - expiration of the loan, defined to be the current block timestamp plus 121 days
- interestDue - amount of interest, in DAI, to be paid 121 days from current timestamp.

It’s important to highlight that interest on the loan is accrued at the time the loan is opened. Keep this in mind as you read the next two sections.

Example: user requests to borrow 95 DAI against 100 DAI worth of gOHM. At the time the loan is opened, the user owes 1.57 DAI in interest (0.05% multiplied by 95 DAI principal multiplied by 121 days out of 365). User gets 95 DAI in their wallet and transfers 100 DAI worth of gOHM.

### Repaying a Loan

A user can repay a loan at any time with any amount. However, because of how loans are fulfilled, any repayment will be allocated toward interest first. Any repayment in excess of interest owed is then allocated to repaying the principal. Once all outstanding interest and principal have been repaid, the user unlocks their collateral.

Example: user requests to borrow 95 DAI against 100 DAI worth of gOHM, owing 1.57 DAI in interest.

- If user repays 1 DAI, the user now owes 0.57 DAI in interest and 95 DAI in principal. User gets no collateral back.
- If user repays 1.57 DAI, user owes no interest and only 95 DAI in principal. User gets no collateral back.
- If user repays 50 DAI, user has fully repaid interest (1.57 DAI) and partially repaid principal (48.43 DAI). User gets back 50.98 DAI worth of collateral back.
- If user repays 96.57 DAI, user has fully repaid interest (1.57 DAI) AND fully repaid 95 DAI in principal. Users gets back all of their collateral.

### Extending Duration

A user can extend a loan at any time, for as long as they want, with the same terms they opened a Cooler with. However, because of how loans are fulfilled, any loan extension must first repay the accrued interest on previous loans before the extension is granted. This is done automatically in a single transaction.

Furthermore, since Clearinghouse.sol gives the ability to extend a loan an arbitrary number of times, the user must pay up to N-1 interest terms if they want to extend a loan for N terms. This is best demonstrated with the examples below.

Example: user has an open loan, borrowing 95 DAI against 100 DAI worth of gOHM, owing 1.57 DAI in interest. They want to extend the loan for one more term (121 days). For this to work, they transfer 1.57 DAI (paying off interest on previous loan) and loan expiry extends by 121 days. In another 121 days, user owes 1.57 DAI interest and 95 DAI in principal.

Example: Consider the same example but now the user wants to extend for 10 terms (1210 days). For this to work, they transfer 15.7 DAI (ten times 1.57 DAI) and loan expiry extends by 1210 days. In 1210 days, user owes 1.57 DAI and 95 DAI in principal.

Notice how interest due remains the same as the original loan term. Why? Functionally speaking, user’s interestDue variable didn’t change; the user just transferred the amount of interest that would’ve been charged during the extension directly to Clearinghouse.sol contract.

## FAQ

What chains are Cooler Loans available on?

Cooler Loans are only available on Ethereum.
What token do I need for interest payments?
Interest payments must be completed with DAI.

Can I pay interest from a different wallet?
Yes, interest payments can be made by wallets other than the one originating the loan.

What if I need to repay before the term is over, can I pay partial interest?

Interest is charged upfront. To get your principal back or extend a loan, you will need to pay that in full. As this is a fixed-term product, there's no distinction between paying at maturity or earlier.

Is there a limit to the number of times I can extend my loan?

There is no functional limit to the number of extensions, however extensions are not supported past August 23rd, 275760. Please plan accordingly.

How many cooler loans can I have?

There is no limit on the number of loans or the total cumulative value of loans per user. Limits are based on fixed terms and the weekly clearinghouse capacity.

Can I loop my loan?

Yes, it is possible to convert the DAI obtained from the loan back into gOHM and take out another Cooler Loan. Use caution when choosing to leverage.

What if I want to add to my loan amount?

You cannot add to an existing loan. To increase the loan amount either take out an additional loan, or pay off the first loan in full and take a new loan with the total amount desired.

Can I partially pay back my loan?

You may make a partial payment on your loan. All payments are automatically applied towards outstanding interest payment prior to being applied to the principal.

If I partially repay a loan, can I just reborrow those funds later?

No, there's no ability to add to the loan once a payment has been received.

If I partially repay a loan, will my interest payments change to reflect the lower balance?

If you have paid part of the balance prior to maturity, the interest amount on the next roll will reflect the outstanding balance instead of the original loan value.
What if price or backing goes up, can I pull out the added equity from my loan?
Loan terms are hard-coded at time of launch. So if backing goes up, LTV remains at X DAI per gOHM. Price has no impact on loan terms.
What if I forget to roll my loan, is there a grace period before defaulting?
Defaults will occur automatically according to contract terms.

I accidentally defaulted, can I recover my collateral?

Unfortunately, this is not possible. Once a default occurs contract terms are automatically executed.

If other users repay their loans, will that increase the capacity available in the clearinghouse?

The capacity in the clearinghouse is rebalanced weekly. If a user repays their loan, the DAI will be available in the clearinghouse. If the available amount is below the threshold upon rebalancing it will be topped up, if the available amount is above the threshold the excess will be removed when rebalancing occurs.

Do Cooler Loans increase OHM supply?

No, Cooler Loans do not cause an increase in supply.

What happens to the defaulted gOHM?

When a loan is defaulted, the underlying collateral is burned.

What happens with the collected interest payments?

Interest payments are directed to Liquid Backing.

| Contract      | Address                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| Clearinghouse | [0xD6A6E8d9e82534bD65821142fcCd91ec9cF31880](https://etherscan.io/address/0xD6A6E8d9e82534bD65821142fcCd91ec9cF31880) |
