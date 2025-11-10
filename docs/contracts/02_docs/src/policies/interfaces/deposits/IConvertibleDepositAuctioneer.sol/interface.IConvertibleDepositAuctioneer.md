# IConvertibleDepositAuctioneer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/interfaces/deposits/IConvertibleDepositAuctioneer.sol)

Interface for a contract that runs auctions for a single deposit token to convert to a convertible deposit token

## Functions

### bid

Submit a bid for convertible deposit tokens

```solidity
function bid(uint8 depositPeriod_, uint256 depositAmount_, uint256 minOhmOut_, bool wrapPosition_, bool wrapReceipt_)
    external
    returns (uint256 ohmOut, uint256 positionId, uint256 receiptTokenId, uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|
|`depositAmount_`|`uint256`| Amount of deposit asset to deposit|
|`minOhmOut_`|`uint256`|     The minimum amount of OHM tokens that the deposit should convert to, in order to succeed. This acts as slippage protection.|
|`wrapPosition_`|`bool`|  Whether to wrap the position as an ERC721|
|`wrapReceipt_`|`bool`|   Whether to wrap the receipt as an ERC20|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmOut`|`uint256`|         Amount of OHM tokens that the deposit can be converted to|
|`positionId`|`uint256`|     The ID of the position created by the DEPOS module to represent the convertible deposit terms|
|`receiptTokenId`|`uint256`| The ID of the receipt token created by the DepositManager to represent the deposit|
|`actualAmount`|`uint256`|   The actual amount of deposit assets that were deposited (receipt tokens minted)|

### previewBid

Get the amount of OHM tokens that could be converted for a bid

```solidity
function previewBid(uint8 depositPeriod_, uint256 depositAmount_) external view returns (uint256 ohmOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|
|`depositAmount_`|`uint256`| Amount of deposit asset to deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmOut`|`uint256`|         Amount of OHM tokens that the deposit could be converted to|

### getPreviousTick

Get the previous tick of the auction

```solidity
function getPreviousTick(uint8 depositPeriod_) external view returns (Tick memory tick);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`Tick`|Tick info|

### getCurrentTick

Calculate the current tick of the auction

*This function should calculate the current tick based on the previous tick and the time passed since the last update*

```solidity
function getCurrentTick(uint8 depositPeriod_) external view returns (Tick memory tick);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`Tick`|Tick info|

### getCurrentTickSize

Get the current tick size

```solidity
function getCurrentTickSize() external view returns (uint256 tickSize);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickSize`|`uint256`|The current tick size|

### getAuctionParameters

Get the current auction parameters

```solidity
function getAuctionParameters() external view returns (AuctionParameters memory auctionParameters);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`auctionParameters`|`AuctionParameters`|Auction parameters|

### isAuctionActive

Check if the auction is currently active

*The auction is considered active when target > 0*

```solidity
function isAuctionActive() external view returns (bool isActive);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isActive`|`bool`|True if the auction is active, false if disabled|

### getDayState

Get the auction state for the current day

```solidity
function getDayState() external view returns (Day memory day);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`day`|`Day`|Day info|

### getTickStep

The multiplier applied to the conversion price at every tick, in terms of `ONE_HUNDRED_PERCENT`

*This is stored as a percentage, where 100e2 = 100% (no increase)*

```solidity
function getTickStep() external view returns (uint24 tickStep);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tickStep`|`uint24`|The tick step, in terms of `ONE_HUNDRED_PERCENT`|

### getAuctionTrackingPeriod

Get the number of days that auction results are tracked for

```solidity
function getAuctionTrackingPeriod() external view returns (uint8 daysTracked);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`daysTracked`|`uint8`|The number of days that auction results are tracked for|

### getAuctionResults

Get the auction results for the tracking period

```solidity
function getAuctionResults() external view returns (int256[] memory results);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`results`|`int256[]`|The auction results, where a positive number indicates an over-subscription for the day.|

### getAuctionResultsNextIndex

Get the index of the next auction result

```solidity
function getAuctionResultsNextIndex() external view returns (uint8 index);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint8`|The index where the next auction result will be stored|

### getMinimumBid

Get the minimum bid amount

```solidity
function getMinimumBid() external view returns (uint256 minimumBid);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`minimumBid`|`uint256`|The minimum bid amount required|

### getDepositAsset

Get the deposit asset

```solidity
function getDepositAsset() external view returns (IERC20 asset);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The deposit asset|

### getDepositPeriods

Get the deposit periods for the deposit asset that are enabled

```solidity
function getDepositPeriods() external view returns (uint8[] memory periods);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`periods`|`uint8[]`|The deposit periods|

### getDepositPeriodsCount

Get the number of deposit periods that are enabled

```solidity
function getDepositPeriodsCount() external view returns (uint256 count);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`count`|`uint256`|The number of deposit periods|

### isDepositPeriodEnabled

Returns whether a deposit period is enabled

```solidity
function isDepositPeriodEnabled(uint8 depositPeriod_) external view returns (bool isEnabled, bool isPendingEnabled);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`|     The deposit period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isEnabled`|`bool`|          Current state|
|`isPendingEnabled`|`bool`|   Desired state after applying all queued changes (equals isEnabled if no changes are queued)|

### enableDepositPeriod

Enables a deposit period

*The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Enabling the deposit period
- Emitting an event*

```solidity
function enableDepositPeriod(uint8 depositPeriod_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|

### disableDepositPeriod

Disables a deposit period

*The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Disabling the deposit period
- Emitting an event*

```solidity
function disableDepositPeriod(uint8 depositPeriod_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|

### setAuctionParameters

Update the auction parameters

*This function is expected to be called periodically.
Only callable by the auction admin*

```solidity
function setAuctionParameters(uint256 target_, uint256 tickSize_, uint256 minPrice_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target_`|`uint256`|       new target sale per day|
|`tickSize_`|`uint256`|     new size per tick|
|`minPrice_`|`uint256`|     new minimum tick price|

### setTickStep

Sets the multiplier applied to the conversion price at every tick, in terms of `ONE_HUNDRED_PERCENT`

*See `getTickStep()` for more information
Only callable by the admin*

```solidity
function setTickStep(uint24 tickStep_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickStep_`|`uint24`|    new tick step, in terms of `ONE_HUNDRED_PERCENT`|

### setAuctionTrackingPeriod

Set the number of days that auction results are tracked for

*Only callable by the admin*

```solidity
function setAuctionTrackingPeriod(uint8 days_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`days_`|`uint8`|The number of days that auction results are tracked for|

### setMinimumBid

Set the minimum bid amount

*Only callable by the admin or manager*

```solidity
function setMinimumBid(uint256 minimumBid_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`minimumBid_`|`uint256`|The new minimum bid amount|

### getTickSizeBase

Get the exponent base used for determining the tick size when the day target is crossed

```solidity
function getTickSizeBase() external view returns (uint256 baseWad);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`baseWad`|`uint256`|The tick size base|

### setTickSizeBase

Set the exponent base used for determining the tick size when the day target is crossed

*Only callable by the admin or manager*

```solidity
function setTickSizeBase(uint256 newBase_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newBase_`|`uint256`|The new base|

## Events

### Bid

Emitted when a bid is made

```solidity
event Bid(
    address indexed bidder,
    address indexed depositAsset,
    uint8 indexed depositPeriod,
    uint256 depositAmount,
    uint256 convertedAmount,
    uint256 positionId
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bidder`|`address`|           The address of the bidder|
|`depositAsset`|`address`|     The asset that is being deposited|
|`depositPeriod`|`uint8`|    The deposit period|
|`depositAmount`|`uint256`|    The amount of deposit asset that was deposited|
|`convertedAmount`|`uint256`|  The amount of OHM that can be converted|
|`positionId`|`uint256`|       The ID of the position created by the DEPOS module to represent the convertible deposit terms|

### AuctionParametersUpdated

Emitted when the auction parameters are updated

```solidity
event AuctionParametersUpdated(
    address indexed depositAsset, uint256 newTarget, uint256 newTickSize, uint256 newMinPrice
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`newTarget`|`uint256`|      Target for OHM sold per day|
|`newTickSize`|`uint256`|    Number of OHM in a tick|
|`newMinPrice`|`uint256`|    Minimum tick price|

### AuctionResult

Emitted when the auction result is recorded

```solidity
event AuctionResult(address indexed depositAsset, uint256 ohmConvertible, uint256 target, uint8 periodIndex);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`ohmConvertible`|`uint256`| Amount of OHM that was converted|
|`target`|`uint256`|         Target for OHM sold per day|
|`periodIndex`|`uint8`|    The index of the auction result in the tracking period|

### TickStepUpdated

Emitted when the tick step is updated

```solidity
event TickStepUpdated(address indexed depositAsset, uint24 newTickStep);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`newTickStep`|`uint24`|    Percentage increase (decrease) per tick|

### AuctionTrackingPeriodUpdated

Emitted when the auction tracking period is updated

```solidity
event AuctionTrackingPeriodUpdated(address indexed depositAsset, uint8 newAuctionTrackingPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`newAuctionTrackingPeriod`|`uint8`|The number of days that auction results are tracked for|

### MinimumBidUpdated

Emitted when the minimum bid is updated

```solidity
event MinimumBidUpdated(address indexed depositAsset, uint256 newMinimumBid);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`newMinimumBid`|`uint256`|The new minimum bid amount|

### TickSizeBaseUpdated

Emitted when the tick size base is updated

```solidity
event TickSizeBaseUpdated(address indexed depositAsset, uint256 newBase);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`newBase`|`uint256`|The new tick size base|

### DepositPeriodEnabled

Emitted when a deposit period is enabled

```solidity
event DepositPeriodEnabled(address indexed depositAsset, uint8 depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`|     The asset that is being deposited|
|`depositPeriod`|`uint8`|    The deposit period|

### DepositPeriodDisabled

Emitted when a deposit period is disabled

```solidity
event DepositPeriodDisabled(address indexed depositAsset, uint8 depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`|     The asset that is being deposited|
|`depositPeriod`|`uint8`|    The deposit period|

### DepositPeriodEnableQueued

Emitted when a deposit period enable is queued

```solidity
event DepositPeriodEnableQueued(address indexed depositAsset, uint8 depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`|     The asset that is being deposited|
|`depositPeriod`|`uint8`|    The deposit period|

### DepositPeriodDisableQueued

Emitted when a deposit period disable is queued

```solidity
event DepositPeriodDisableQueued(address indexed depositAsset, uint8 depositPeriod);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`|     The asset that is being deposited|
|`depositPeriod`|`uint8`|    The deposit period|

## Errors

### ConvertibleDepositAuctioneer_InvalidParams

Emitted when the parameters are invalid

```solidity
error ConvertibleDepositAuctioneer_InvalidParams(string reason);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reason`|`string`|         Reason for invalid parameters|

### ConvertibleDepositAuctioneer_ConvertedAmountZero

Emitted when the OHM output (the amount of OHM the deposit can be converted to) is zero

```solidity
error ConvertibleDepositAuctioneer_ConvertedAmountZero();
```

### ConvertibleDepositAuctioneer_ConvertedAmountSlippage

Emitted when the OHM output (the amount of OHM the deposit can be converted to) is less than the minimum specified

```solidity
error ConvertibleDepositAuctioneer_ConvertedAmountSlippage(uint256 ohmOut, uint256 minOhmOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ohmOut`|`uint256`|        The amount of OHM tokens that the deposit can be converted to|
|`minOhmOut`|`uint256`|     The minimum amount of OHM that the deposit should convert to, in order to succeed|

### ConvertibleDepositAuctioneer_DepositPeriodNotEnabled

Emitted when the deposit period is not enabled for this asset

```solidity
error ConvertibleDepositAuctioneer_DepositPeriodNotEnabled(address depositAsset, uint8 depositPeriod);
```

### ConvertibleDepositAuctioneer_DepositPeriodInvalidState

Emitted when the deposit period is in an invalid state for the requested operation

```solidity
error ConvertibleDepositAuctioneer_DepositPeriodInvalidState(address depositAsset, uint8 depositPeriod, bool isEnabled);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositAsset`|`address`||
|`depositPeriod`|`uint8`||
|`isEnabled`|`bool`|  The current enabled state: true if enabled, false if disabled|

### ConvertibleDepositAuctioneer_BidBelowMinimum

Emitted when the bid amount is below the minimum required

```solidity
error ConvertibleDepositAuctioneer_BidBelowMinimum(uint256 bidAmount, uint256 minimumBid);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bidAmount`|`uint256`|    The amount of the bid|
|`minimumBid`|`uint256`|   The minimum bid amount required|

## Structs

### AuctionParameters

Auction parameters

*These values should only be set through the `setAuctionParameters()` function*

```solidity
struct AuctionParameters {
    uint256 target;
    uint256 tickSize;
    uint256 minPrice;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`target`|`uint256`|         Number of OHM available to sell per day|
|`tickSize`|`uint256`|       Number of OHM in a tick|
|`minPrice`|`uint256`|       Minimum price that OHM can be sold for, in terms of the bid token|

### Day

Tracks auction activity for a given day

```solidity
struct Day {
    uint48 initTimestamp;
    uint256 convertible;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`initTimestamp`|`uint48`|  Timestamp when the day state was initialized|
|`convertible`|`uint256`|    Quantity of OHM that will be issued for the day's deposits|

### Tick

Information about a tick

```solidity
struct Tick {
    uint256 price;
    uint256 capacity;
    uint48 lastUpdate;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`price`|`uint256`|          Price of the tick, in terms of the bid token|
|`capacity`|`uint256`|       Capacity of the tick, in terms of OHM|
|`lastUpdate`|`uint48`|     Timestamp of last update to the tick|

### EnableParams

Parameters provided to the `enable()` function

```solidity
struct EnableParams {
    uint256 target;
    uint256 tickSize;
    uint256 minPrice;
    uint256 tickSizeBase;
    uint24 tickStep;
    uint8 auctionTrackingPeriod;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`target`|`uint256`|                 Number of OHM available to sell per day|
|`tickSize`|`uint256`|               Number of OHM in a tick|
|`minPrice`|`uint256`|               Minimum price that OHM can be sold for, in terms of the bid token|
|`tickSizeBase`|`uint256`|           Base for exponential tick size reduction (by 1/(base^multiplier)) when the day target is crossed|
|`tickStep`|`uint24`|               Percentage increase (decrease) per tick|
|`auctionTrackingPeriod`|`uint8`|  Number of days that auction results are tracked for|
