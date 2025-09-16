# Convertible Deposits

## 1. Introduction

### What are Convertible Deposits?

Convertible Deposits (CDs) are a financial instrument that enables users to deposit stablecoins into the Olympus protocol with three flexible exit options. When making a convertible deposit, users place a structured bet on the future price of OHM while helping the protocol diversify its treasury holdings.

Users deposit stablecoins (such as USDS) and receive receipt tokens plus a non-fungible position that locks in a specific conversion price for OHM. Before the deposit expires, users can choose to convert their deposit to OHM at the locked-in price, wait for full redemption of their original deposit, or exit early with a discount applied.

This creates "no-risk speculation on the future price of OHM" - if OHM's market price rises above the conversion price, users profit by converting. If not, users receive their original deposit back, subject to the discount if they choose early exit.

### Benefits for Users

Convertible Deposits offer several advantages:

- **Flexible Exit Options**: Users are not locked into a single outcome. They can convert to OHM if profitable, wait for full redemption for certainty, or exit early if liquidity is needed.

- **Risk-Limited OHM Exposure**: Users can speculate on OHM's price appreciation without the full downside risk of holding OHM directly. Maximum loss is limited to the discount applied for early exit rather than OHM's price volatility.

- **Liquidity Options**: Receipt tokens are fungible and tradable, and users can borrow against active redemptions if needed while maintaining their position.

### Benefits for the Protocol

Convertible Deposits serve strategic purposes for Olympus:

- **Treasury Diversification**: The protocol receives stablecoins that diversify its treasury beyond OHM-denominated assets, reducing overall risk.

- **Increased Protocol Income**: The protocol earns yield on deposited assets and benefits from reclaim discounts, creating additional revenue streams.

- **Demand-Responsive OHM Emissions**: The auction mechanism enables the protocol to emit OHM at market-driven prices rather than fixed rates, ensuring fair value exchange.

- **Capital Efficiency**: The system allows the protocol to access capital for yield generation while providing users with structured exposure to OHM.

## 2. How Convertible Deposits Work

### The Auction and Bidding Process

Convertible Deposits operate through a continuous auction system where users bid by depositing stablecoins. Unlike traditional auctions with fixed end times, this auction runs continuously with dynamic pricing.

#### How Bidding Works

1. Users choose their deposit amount and period
2. The system calculates the conversion price based on current auction conditions
3. Users deposit their stablecoins and receive receipt tokens plus a position record
4. The conversion price is locked in for the duration of the deposit

#### Price Discovery

The conversion price is determined by supply and demand:

- High demand → Higher conversion prices (less favorable for depositors)
- Low demand → Lower conversion prices (more favorable for depositors)
- The system maintains a minimum conversion price floor

### Exit Options

After making a deposit, users have three ways to exit:

#### 1. Convert to OHM

Convert the deposit to OHM at any point before the position's expiry date at the conversion price locked in when the deposit was made. This is profitable when OHM's market price exceeds the conversion price.

#### 2. Full Redemption

Wait for the deposit period to complete, then redeem receipt tokens for the full amount of the original deposit. This guarantees users receive exactly what they deposited, regardless of OHM's price movement.

#### 3. Early Reclaim

Exit the position at any time by reclaiming the deposit with a discount applied. The protocol retains the discount as a fee.

### Key Components

#### Receipt Tokens

Receipt tokens are fungible tokens that represent deposits in a 1:1 ratio. They are created when users make deposits and are named with the facility prefix plus the asset and deposit period.

##### Examples

- `cdfUSDS-1m` for 1-month USDS deposits through the convertible deposit facility
- `cdfUSDS-3m` for 3-month USDS deposits through the convertible deposit facility

##### Key Properties

- **Fungible**: All cdfUSDS-3m tokens are identical and interchangeable
- **Tradable**: Users can transfer or trade these tokens independently of their position
- **Redeemable**: Use them for full redemption after the deposit period

#### CD Positions

A convertible deposit position is a non-fungible record that contains the specific terms of the deposit:

- Deposit amount and asset
- Conversion price for OHM
- Expiry date
- Deposit period

##### Position Properties

- **Unique Terms**: Each position has its own conversion price based on when the deposit was made
- **Optional NFT Wrapping**: Positions can be wrapped into ERC721 NFTs for easier management and trading
- **Required for Conversion**: Users need their position to convert to OHM, but not for redemption

#### DepositManager

The DepositManager is the secure custody system that holds all deposited funds. This is a critical security feature with flexible yield strategies:

##### Security Guarantees

- **Isolated Custody**: Deposited funds are separated from the protocol treasury
- **No Governance Access**: No other contract in the protocol—including governance—can access funds deposited on behalf of users
- **Contract-Specific Access**: Only the specific facility contract that accepted the deposit can access those funds

##### Yield Strategy Options

- **At Rest**: Each configured ERC20 token can be held directly in the DepositManager
- **Vault Strategy**: Tokens can be deposited into a configured ERC4626 vault to earn yield
- **Immutable Configuration**: Once an ERC4626 vault is set for a token, it cannot be changed - this prevents governance attacks that could redirect funds to a malicious vault

##### What It Does

- Issues and manages receipt tokens
- Holds deposited assets securely (either directly or in configured vaults)
- Facilitates withdrawals when authorized
- Manages yield generation on deposits

#### Deposit Periods

Convertible deposits are available in multiple time periods (subject to protocol configuration):

- **1 Month**: Shorter commitment, faster access to full redemption
- **2 Months**: Medium-term option balancing flexibility and potential returns
- **3 Months**: Longer commitment, potentially better conversion opportunities

The deposit period determines:

- How long users must wait for full redemption
- The specific receipt token received (e.g., cdfUSDS-1m vs cdfUSDS-3m)
- The position's expiry date for conversions

#### Supported Assets

Initially, Convertible Deposits support:

- **USDS**: The primary stablecoin for initial launch

The system is designed to expand to other reserve assets based on protocol needs and governance decisions.

## 3. The Auction Mechanism

### How Pricing Works

The auction uses a sophisticated tick-based system to determine conversion prices dynamically based on supply and demand:

#### Tick System Explained

- **Ticks**: The auction is organized into price levels called "ticks"
- **Tick Capacity**: Each tick can sell a specific amount of OHM (the "tick size")
- **Tick Price**: Each tick has a conversion price (deposit tokens per OHM)
- **Tick Step**: When a tick is filled, the next tick's price increases by a percentage (the "tick step")

#### How Bids Fill Ticks

When users place bids, the system processes them by filling ticks sequentially:

1. **Current Tick**: The system determines how many deposit tokens are needed to fill the remaining capacity of the current tick
2. **Fill and Move**: If the bid exceeds this amount, it fills the current tick completely and moves to the next higher-priced tick
3. **Repeat Process**: This continues across multiple ticks until the entire bid is processed
4. **Calculate Average**: The final conversion price is the weighted average based on the total deposit tokens consumed and total OHM allocated

##### Example Bid Processing

For a 1,000 USDS bid:

- Current tick has 500 USDS capacity remaining at $20/OHM = 25 OHM
- Next tick needs 500 USDS at $22/OHM = ~22.73 OHM
- The position receives ~47.73 OHM total with an average conversion price of ~$20.96/OHM

#### Dynamic Price Discovery

##### Price Increases with Demand

- As ticks fill up, subsequent bids must pay higher prices
- Large bids that span multiple ticks drive prices up faster
- High demand periods see rapid price escalation

##### Price Decreases Without Demand

- When there's insufficient demand, tick prices decay over time
- Unused capacity causes the auction to move to lower-priced ticks
- Price decay has a floor - the minimum price set as part of the auction parameters
- This ensures competitive pricing during low-demand periods while protecting the protocol

##### Daily Targets and Capacity

- The protocol sets a target amount of OHM to sell per day
- Capacity is added proportionally throughout each day
- When daily targets are exceeded, tick sizes progressively halve (causing faster price increases)
- Day targets and tick sizes are reset once per day when the auction parameters are tuned by the [Emissions Manager](05_emissions-manager.md)

#### Minimum Price Protection

The auction maintains a minimum conversion price floor - meaning there's a maximum amount of OHM users can get per deposit token. This protects the protocol from selling OHM too cheaply during periods of very low demand.

### Making a Deposit

When users are ready to make a convertible deposit, here's the step-by-step process:

#### 1. Choose Parameters

##### Deposit Amount

The quantity of stablecoins to deposit

##### Deposit Period

Select from available periods (currently 1, 2, or 3 months)

##### Minimum OHM Out

Set a minimum amount of convertible OHM willing to accept (slippage protection)

##### Position Options

- Choose whether to wrap the position as an ERC721 NFT
- Choose whether to wrap receipt tokens as ERC20 tokens

#### 2. Preview Your Bid

Before committing, users can preview their bid to see:

- The conversion price they'll receive
- The amount of OHM they'll be able to convert to
- How the bid will affect current tick prices
- Which ticks the bid will consume

This preview function helps users understand the impact of their bid size on pricing.

#### 3. Submit Your Bid

After submitting a bid:

- The user's stablecoins are transferred to the DepositManager
- The user receives receipt tokens (e.g., cdfUSDS-3m)
- The user's position is created with locked-in conversion terms
- The auction state updates with the bid

#### 4. Receive Assets

After a successful bid, users receive:

- **Receipt Tokens**: ERC6909 tokens representing the deposit that will be displayed in the Olympus frontend. These can optionally be wrapped to ERC20 for composability with other protocols
- **Position Record**: Contains the specific conversion price and terms
- **Optionally**: ERC721 NFT if they chose to wrap their position

#### Understanding the Conversion Price

The conversion price represents the weighted average of all ticks the bid consumed. This price is locked in for the entire deposit period, regardless of how the auction price moves afterward. The size of the bid relative to available tick capacity affects the average conversion price, as larger bids may consume higher-priced ticks.

## 4. Managing Your Position

Once users have a convertible deposit, they have several options for managing and exiting their position. Each option serves different strategic purposes and timing considerations.

### Converting to OHM

Converting to OHM is the primary way to profit from a convertible deposit when OHM's market price exceeds the conversion price.

#### When to Convert

- **Any Time Before Expiry**: Users can convert at any point before their position's expiry date
- **Profitable Scenarios**: Convert when OHM's market price is higher than the locked-in conversion price
- **Partial Conversions**: Users can convert portions of their position, not necessarily the entire amount

#### Conversion Process

1. **Check Profitability**: Compare current OHM market price to the conversion price
2. **Specify Amount**: Choose how much of the position to convert (partial conversions allowed)
3. **Execute Conversion**: Receipt tokens are burned, deposit tokens are sent to the protocol treasury, and the user receives newly minted OHM
4. **Position Update**: The position record is updated to reflect the remaining unconverted amount

#### What Users Need

- **Their Position**: Users need their position record (the conversion price and terms)
- **Receipt Tokens**: Required for conversion - these will be burned
- **Before Expiry**: Must convert before the position expiry date

### Early Reclaim

Early reclaim allows users to exit their position immediately but with a discount applied to their original deposit. The reclaim rate, which determines the discount, is configured by governance on a per-asset basis.

#### When to Use Early Reclaim

- **Need Liquidity**: Users need access to their funds immediately
- **Market Conditions**: Users believe OHM won't reach profitable conversion levels
- **Risk Management**: Users want to exit early to avoid potential losses

#### Reclaim Process

1. **Choose Amount**: Specify how many receipt tokens to reclaim
2. **Accept Discount**: Acknowledge that a discount will be applied
3. **Execute Reclaim**: Receipt tokens are burned and the user receives discounted deposit tokens
4. **Protocol Fee**: The discount amount goes to the protocol treasury

#### Important Notes

- **Receipt Tokens Required**: Users need receipt tokens for reclaim - they will be burned
- **Reclaim Rate**: The percentage of the deposit received when reclaiming early
- **Reclaim Discount**: The reclaim discount is 100% minus the reclaim rate
- **Governance Configured**: Reclaim rates are set by governance for each supported asset
- **Immediate Access**: Users get their funds immediately, no waiting period

### Full Redemption

Full redemption allows users to get back their complete original deposit after waiting for the appropriate period.

#### Standard Redemption Process

##### Two Redemption Approaches

- **Receipt Tokens Only**: Standard redemption using just receipt tokens - users must wait for the full deposit period to pass from the current date
- **Receipt Tokens + CD Position**: Uses the position to align timing - users must wait for the conversion expiry to pass (even if it's in a short time, or already in the past)

##### Starting Redemption

1. **Transfer Receipt Tokens**: Receipt tokens are transferred to the DepositRedemptionVault
2. **Select Facility**: Choose which facility to use for redemption (usually the convertible deposit facility)
3. **Commitment Period**: Tokens are locked for the appropriate waiting period based on the approach
4. **Receive Redemption ID**: Users get a redemption ID to track their redemption

##### Waiting Periods

- **Without Position**: Wait for the full deposit period from when redemption starts (e.g., 3 months from today)
- **With Position**: Wait only until the conversion expiry date passes (could be immediate if already expired)

##### During the Wait Period

- **Tokens Locked**: Receipt tokens remain in the redemption vault
- **Full Amount Reserved**: The underlying deposit amount is committed for the redemption
- **Option to Cancel**: Users can cancel and get their receipt tokens back (resets the timer)

##### Finishing Redemption

After the appropriate period completes:

1. **Initiate Completion**: Call the finish redemption function
2. **Token Exchange**: Receipt tokens are burned
3. **Receive Deposit**: Users get back their full original deposit amount

#### Borrowing Against Redemptions

While a redemption is in progress, users can borrow against the committed amount. Note: Borrowing functionality is disabled in the initial rollout and will be enabled in a future update.

##### How Borrowing Works

- **Loan Amount**: Borrow up to a configured percentage of the redemption amount
- **Fixed Interest**: Loans have fixed interest rates matching the redemption period
- **Collateralized**: The active redemption serves as collateral

##### Repayment Process

- **Interest First**: Repayments first cover interest, then principal
- **Protocol Fees**: Interest payments go to the protocol treasury
- **Flexible Timing**: Users can repay at any time during the loan period

##### Loan Extensions

- **Monthly Extensions**: Extend the loan by one or more months
- **Extension Fees**: Interest is charged at the time of extension
- **Multiple Extensions**: Users can extend multiple times if needed

##### Default Scenarios

- **Loan Expiry**: If users don't repay or extend before expiry, the loan defaults
- **Third-Party Claims**: Anyone can claim against a defaulted loan for a keeper reward
- **Partial Recovery**: Users retain any principal that was repaid; the protocol claims the remainder

##### Important Borrowing Restrictions

- **No Redemption While Borrowing**: Users cannot complete their redemption while they have an open loan
- **Must Repay First**: Either repay the loan in full or wait for it to default before completing redemption

##### Borrowing Benefits

- **Maintain Position**: Keep the redemption active while accessing liquidity
- **No Early Exit**: Avoid reclaim discounts while still getting funds
- **Flexible Terms**: Extend as needed based on the situation

## 5. Practical Guidance

### Choosing Your Strategy

#### Decision Framework

When considering convertible deposits, users should consider:

- **OHM price outlook**: Bullish expectations favor conversion strategies
- **Certainty level**: High uncertainty favors redemption-focused approaches
- **Liquidity timeline**: Need funds soon? Consider borrowing vs. early reclaim costs
- **Risk tolerance**: Higher risk tolerance allows for longer periods and larger positions

#### Strategy Matrix

| OHM Outlook | Liquidity Need | Recommended Approach |
|-------------|----------------|---------------------|
| Bullish | Low | Longer periods, plan to convert |
| Bullish | High | Shorter periods or borrowing strategy |
| Uncertain | Low | Full redemption with position timing |
| Uncertain | High | Conservative sizing, early reclaim acceptable |
| Bearish | Any | Avoid or use very short periods |

### Risk Management

#### Position Sizing

- **Start Small**: Begin with smaller amounts to understand the system
- **Diversify Periods**: Don't concentrate everything in one deposit period
- **Liquidity Buffer**: Maintain separate funds for unexpected needs

#### Monitoring Positions

- **Set Price Alerts**: Know when OHM reaches profitable conversion levels
- **Track Expiry Dates**: Conversion opportunities have hard deadlines
- **Auction Awareness**: Daily parameter resets can affect future deposits

#### Exit Planning

- **Pre-Define Targets**: Decide profit-taking levels before emotions get involved
- **Understand All Costs**: Factor in gas fees, reclaim discounts, and borrowing interest
- **Have Backup Plans**: Know options if the primary strategy doesn't work out

### Common Mistakes to Avoid

#### Timing Errors

- **Missing Expiry**: Conversion rights expire - set calendar reminders
- **Poor Auction Timing**: Large bids right after daily resets may get better prices
- **Panic Decisions**: Don't rush to early reclaim during temporary market stress

#### Technical Mistakes

- **Losing Receipt Tokens**: These are required for all actions - store them safely
- **Wrong Redemption Type**: Understand when to use position vs. non-position redemption
- **Incomplete Understanding**: Don't borrow against redemptions unless the restrictions are understood

#### Strategic Mistakes

- **Overcommitting**: Don't deposit more than can be afforded to lose or have locked up
- **Ignoring Opportunity Costs**: Consider what else could be done with the funds
- **Single Strategy**: Markets change - be prepared to adapt the approach

## 6. Technical Details & FAQ

### Fee Structures

#### Early Reclaim Discounts

- Applied when users exit their position before the deposit period completes
- The reclaim rate varies by asset and deposit period
- Reclaim rates are configured by protocol governance for each supported asset
- The reclaim discount is 100% minus the reclaim rate
- Discount amount goes to the protocol treasury
- No fees for conversion or full redemption

#### Borrowing Fees

- **Interest Rates**: Fixed rates set when users borrow, typically matching deposit period duration
- **Extension Fees**: Additional interest charged when extending loan terms
- **Keeper Rewards**: Third parties earn rewards for claiming defaulted loans
- **No Early Repayment Penalties**: Users can repay loans at any time without fees

#### Gas Costs

- Standard Ethereum transaction fees apply for all operations
- More complex operations (like multi-tick bids) may use more gas
- Consider gas costs when planning smaller positions

### Technical Parameters

#### Current Configuration (Launch Parameters)

- **Supported Asset**: USDS
- **Deposit Periods**: 1, 2, and 3 months (configurable by governance)
- **Minimum Conversion Price**: 100% premium (configurable)
- **Base Emission Rate**: 0.02% per day
- **Receipt Token Format**: ERC6909 (optionally wrappable to ERC20)

#### Auction Mechanics

- **Tick System**: Price levels with capacity-based progression
- **Daily Resets**: Auction parameters updated once per day
- **Price Decay**: Automatic price reduction during low demand (with floor)
- **Capacity Scaling**: Proportional capacity addition throughout each day

### Common Questions

#### Getting Started

**Q: How much should I deposit for a first position?**
A: Start with an amount that's comfortable to potentially lose or have locked up. This helps learn the system without significant risk.

**Q: Which deposit period should I choose?**
A: Longer periods give more time for profitable conversions but reduce flexibility. Consider liquidity needs and OHM price outlook.

**Q: Can I change my mind after depositing?**
A: Yes, through early reclaim (with discount) or redemption (with waiting period). The conversion price cannot be changed once set.

#### Managing Positions

**Q: What happens if I lose my receipt tokens?**
A: Receipt tokens are required for all actions. If lost, users cannot convert, reclaim, or redeem their position. Store them securely.

**Q: Can I transfer my position to someone else?**
A: Yes, if wrapped as an ERC721 NFT. Receipt tokens are also transferable. The new holder inherits the conversion terms.

**Q: What happens if OHM never reaches my conversion price?**
A: Users can still get their full deposit back through redemption, or exit early through reclaim (with discount).

#### Redemption and Borrowing

**Q: What's the difference between redemption approaches?**
A: Without position: wait full deposit period from start date. With position: wait only until conversion expiry (could be immediate if expired).

**Q: Can I borrow against my redemptions?**
A: Borrowing functionality is disabled in the initial rollout and will be enabled in a future update. Once enabled, borrowing will be limited to a configured percentage of the redemption amount (typically less than 100%).

**Q: What happens if I default on a borrowing loan?**
A: Third parties can claim the default for a reward. Users keep any principal repaid, but lose the remainder to the protocol.

#### Technical Issues

**Q: Why can't I see my receipt tokens in my wallet?**
A: ERC6909 tokens may not display in all wallets. The Olympus frontend will show them, or they can be wrapped as ERC20 for broader compatibility.

**Q: My transaction failed - what went wrong?**
A: Common issues include insufficient token approval, slippage on conversion amount, or trying to convert after expiry. Check error messages for specifics.

**Q: Can governance change my position terms?**
A: No, conversion price and expiry are immutable once set. Governance can change future auction parameters but not existing positions.

### Troubleshooting

#### Transaction Failures

- **Insufficient Approval**: Ensure the DepositManager is approved to spend deposit tokens
- **Slippage Protection**: The minimum OHM out may be too high for current auction conditions
- **Expired Position**: Cannot convert positions past their expiry date
- **Insufficient Balance**: Ensure there are enough tokens for the desired action

#### Missing Tokens or Positions

- **Check Token Addresses**: Ensure you are looking for the correct receipt token contract
- **Blockchain Confirmation**: Transactions may take time to confirm during network congestion
- **Correct Network**: Verify you are connected to the correct Ethereum network

#### Unexpected Behavior

- **Auction Parameter Changes**: Daily resets can change pricing - this is normal behavior
- **Partial Fills**: Large bids may only partially fill if insufficient tick capacity
- **Borrowing Restrictions**: Cannot complete redemption while loans are outstanding

### Getting Help

For additional support:

- **Olympus Discord**: Community and team support
- **Documentation**: Latest protocol documentation at docs.olympusdao.finance
- **Protocol Updates**: Follow @OlympusDAO for important announcements

### Security Reminders

- **Smart Contract Risk**: While audited, DeFi protocols carry inherent risks
- **Key Management**: Securely store private keys and seed phrases
- **Verify Contracts**: Always interact with official Olympus contracts
- **Stay Informed**: Keep up with protocol updates and security announcements
