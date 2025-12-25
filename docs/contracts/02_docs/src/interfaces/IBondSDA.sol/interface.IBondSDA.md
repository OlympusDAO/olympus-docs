# IBondSDA

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/interfaces/IBondSDA.sol)

**Inherits:**
[IBondAuctioneer](/main/contracts/docs/src/interfaces/IBondAuctioneer.sol/interface.IBondAuctioneer)

## Functions

### marketPrice

Calculate current market price of payout token in quote tokens

Accounts for debt and control variable decay since last deposit (vs _marketPrice())

```solidity
function marketPrice(uint256 id_) external view override returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Price for market in configured decimals (see MarketParams)|

### currentDebt

Calculate debt factoring in decay

Accounts for debt decay since last deposit

```solidity
function currentDebt(uint256 id_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Current debt for market in payout token decimals|

### currentControlVariable

Up to date control variable

Accounts for control variable adjustment

```solidity
function currentControlVariable(uint256 id_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id_`|`uint256`|         ID of market|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Control variable for market in payout token decimals|

## Structs

### BondMarket

Main information pertaining to bond market

```solidity
struct BondMarket {
    address owner; // market owner. sends payout tokens, receives quote tokens (defaults to creator)
    ERC20 payoutToken; // token to pay depositors with
    ERC20 quoteToken; // token to accept as payment
    address callbackAddr; // address to call for any operations on bond purchase. Must inherit to IBondCallback.
    bool capacityInQuote; // capacity limit is in payment token (true) or in payout (false, default)
    uint256 capacity; // capacity remaining
    uint256 totalDebt; // total payout token debt from market
    uint256 minPrice; // minimum price (hard floor for the market)
    uint256 maxPayout; // max payout tokens out in one order
    uint256 sold; // payout tokens out
    uint256 purchased; // quote tokens in
    uint256 scale; // scaling factor for the market (see MarketParams struct)
}
```

### BondTerms

Information used to control how a bond market changes

```solidity
struct BondTerms {
    uint256 controlVariable; // scaling variable for price
    uint256 maxDebt; // max payout token debt accrued
    uint48 vesting; // length of time from deposit to expiry if fixed-term, vesting timestamp if fixed-expiry
    uint48 conclusion; // timestamp when market no longer offered
}
```

### BondMetadata

Data needed for tuning bond market

Durations are stored in uint32 (not int32) and timestamps are stored in uint48, so is not subject to Y2K38 overflow

```solidity
struct BondMetadata {
    uint48 lastTune; // last timestamp when control variable was tuned
    uint48 lastDecay; // last timestamp when market was created and debt was decayed
    uint32 length; // time from creation to conclusion.
    uint32 depositInterval; // target frequency of deposits
    uint32 tuneInterval; // frequency of tuning
    uint32 tuneAdjustmentDelay; // time to implement downward tuning adjustments
    uint32 debtDecayInterval; // interval over which debt should decay completely
    uint256 tuneIntervalCapacity; // capacity expected to be used during a tuning interval
    uint256 tuneBelowCapacity; // capacity that the next tuning will occur at
    uint256 lastTuneDebt; // target debt calculated at last tuning
}
```

### Adjustment

Control variable adjustment data

```solidity
struct Adjustment {
    uint256 change;
    uint48 lastAdjustment;
    uint48 timeToAdjusted; // how long until adjustment happens
    bool active;
}
```

### MarketParams

Parameters to create a new bond market

Note price should be passed in a specific format:
formatted price = (payoutPriceCoefficient / quotePriceCoefficient)
- 10**(36 + scaleAdjustment + quoteDecimals - payoutDecimals + payoutPriceDecimals - quotePriceDecimals)
where:
payoutDecimals - Number of decimals defined for the payoutToken in its ERC20 contract
quoteDecimals - Number of decimals defined for the quoteToken in its ERC20 contract
payoutPriceCoefficient - The coefficient of the payoutToken price in scientific notation (also known as the significant digits)
payoutPriceDecimals - The significand of the payoutToken price in scientific notation (also known as the base ten exponent)
quotePriceCoefficient - The coefficient of the quoteToken price in scientific notation (also known as the significant digits)
quotePriceDecimals - The significand of the quoteToken price in scientific notation (also known as the base ten exponent)
scaleAdjustment - see below
- In the above definitions, the "prices" need to have the same unit of account (i.e. both in OHM, $, ETH, etc.)
If price is not provided in this format, the market will not behave as intended.

0. Payout Token (token paid out)

1. Quote Token (token to be received)

2. Callback contract address, should conform to IBondCallback. If 0x00, tokens will be transferred from market.owner

3. Is Capacity in Quote Token?

4. Capacity (amount in quoteDecimals or amount in payoutDecimals)

5. Formatted initial price (see note above)

6. Formatted minimum price (see note above)

7. Debt buffer. Percent with 3 decimals. Percentage over the initial debt to allow the market to accumulate at anyone time.

Works as a circuit breaker for the market in case external conditions incentivize massive buying (e.g. stablecoin depeg).

Minimum is the greater of 10% or initial max payout as a percentage of capacity.

If the value is too small, the market will not be able function normally and close prematurely.

If the value is too large, the market will not circuit break when intended. The value must be > 10% but can exceed 100% if desired.

A good heuristic to calculate a debtBuffer with is to determine the amount of capacity that you think is reasonable to be expended

in a short duration as a percent, e.g. 25%. Then a reasonable debtBuffer would be: 0.25 *1e3* decayInterval / marketDuration

where decayInterval = max(3 days, 5 * depositInterval) and marketDuration = conclusion - creation time.

8. Is fixed term ? Vesting length (seconds) : Vesting expiry (timestamp).

A 'vesting' param longer than 50 years is considered a timestamp for fixed expiry.

9. Conclusion (timestamp)

10. Deposit interval (seconds)

11. Market scaling factor adjustment, ranges from -24 to +24 within the configured market bounds.

Should be calculated as: (payoutDecimals - quoteDecimals) - ((payoutPriceDecimals - quotePriceDecimals) / 2)

Providing a scaling factor adjustment that doesn't follow this formula could lead to under or overflow errors in the market.

```solidity
struct MarketParams {
    ERC20 payoutToken;
    ERC20 quoteToken;
    address callbackAddr;
    bool capacityInQuote;
    uint256 capacity;
    uint256 formattedInitialPrice;
    uint256 formattedMinimumPrice;
    uint32 debtBuffer;
    uint48 vesting;
    uint48 conclusion;
    uint32 depositInterval;
    int8 scaleAdjustment;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`payoutToken`|`ERC20`||
|`quoteToken`|`ERC20`||
|`callbackAddr`|`address`||
|`capacityInQuote`|`bool`||
|`capacity`|`uint256`||
|`formattedInitialPrice`|`uint256`||
|`formattedMinimumPrice`|`uint256`||
|`debtBuffer`|`uint32`||
|`vesting`|`uint48`||
|`conclusion`|`uint48`||
|`depositInterval`|`uint32`||
|`scaleAdjustment`|`int8`||
