# ConvertibleDepositAuctioneer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/deposits/ConvertibleDepositAuctioneer.sol)

**Inherits:**
[IConvertibleDepositAuctioneer](/main/contracts/docs/src/policies/interfaces/deposits/IConvertibleDepositAuctioneer.sol/interface.IConvertibleDepositAuctioneer), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), ReentrancyGuard

forge-lint: disable-start(mixed-case-function, screaming-snake-case-const)

Implementation of the {IConvertibleDepositAuctioneer} interface for a specific deposit token and 1 or more deposit periods

*This contract implements an auction for convertible deposit tokens. It runs these auctions according to the following principles:

- Auctions are of infinite duration
- Auctions are of infinite capacity
- Users place bids by supplying an amount of the configured bid token
- The payout token is a receipt token (managed by {DepositManager}), which can be converted to OHM at the price that was set at the time of the bid
- During periods of greater demand, the conversion price will increase
- During periods of lower demand, the conversion price will decrease
- The auction has a minimum price, below which the conversion price will not decrease
- The auction has a target amount of convertible OHM to sell per day
- When the target is reached, the amount of OHM required to increase the conversion price will decrease, resulting in more rapid price increases (assuming there is demand)
- The auction parameters are able to be updated in order to tweak the auction's behaviour*

## State Variables

### ROLE_EMISSION_MANAGER

The role that can perform periodic actions, such as updating the auction parameters

```solidity
bytes32 public constant ROLE_EMISSION_MANAGER = "cd_emissionmanager";
```

### _ohmScale

Scale of the OHM token

```solidity
uint256 internal constant _ohmScale = 1e9;
```

### ONE_HUNDRED_PERCENT

```solidity
uint24 public constant ONE_HUNDRED_PERCENT = 100e2;
```

### WAD

Fixed point scale (WAD)

```solidity
uint256 internal constant WAD = 1e18;
```

### TICK_SIZE_BASE_MIN

Minimum and maximum allowed tick size base (in WAD)

```solidity
uint256 internal constant TICK_SIZE_BASE_MIN = 1e18;
```

### TICK_SIZE_BASE_MAX

```solidity
uint256 internal constant TICK_SIZE_BASE_MAX = 10e18;
```

### MAX_RPOW_EXP

Maximum safe exponent for rpow to prevent overflow

```solidity
uint256 internal constant MAX_RPOW_EXP = 41;
```

### SECONDS_IN_DAY

Seconds in one day

```solidity
uint256 internal constant SECONDS_IN_DAY = 1 days;
```

### _ENABLE_PARAMS_LENGTH

The length of the enable parameters

```solidity
uint256 internal constant _ENABLE_PARAMS_LENGTH = 192;
```

### _TICK_SIZE_MINIMUM

The minimum tick size

```solidity
uint256 internal constant _TICK_SIZE_MINIMUM = 1;
```

### _depositPeriodsEnabled

Whether the deposit period is enabled

```solidity
mapping(uint8 depositPeriod => bool isDepositPeriodEnabled) internal _depositPeriodsEnabled;
```

### _DEPOSIT_ASSET

The deposit asset

```solidity
IERC20 internal immutable _DEPOSIT_ASSET;
```

### _depositPeriods

Array of enabled deposit periods

```solidity
EnumerableSet.UintSet internal _depositPeriods;
```

### _depositPeriodPreviousTicks

Previous tick for each deposit period

*Use `getCurrentTick()` to recalculate and access the latest data*

```solidity
mapping(uint8 depositPeriod => Tick previousTick) internal _depositPeriodPreviousTicks;
```

### CD_FACILITY

Address of the Convertible Deposit Facility

```solidity
ConvertibleDepositFacility public immutable CD_FACILITY;
```

### _auctionParameters

Auction parameters

*These values should only be set through the `setAuctionParameters()` function*

```solidity
AuctionParameters internal _auctionParameters;
```

### _currentTickSize

The current tick size

```solidity
uint256 internal _currentTickSize;
```

### _dayState

Auction state for the day

```solidity
Day internal _dayState;
```

### _tickStep

The tick step

*See `getTickStep()` for more information*

```solidity
uint24 internal _tickStep;
```

### _minimumBid

The minimum bid amount

*The minimum bid amount is the minimum amount of deposit asset that can be bid
See `getMinimumBid()` for more information*

```solidity
uint256 internal _minimumBid;
```

### _tickSizeBase

The base used for exponential tick size reduction (by 1/(base^multiplier)) when the day target is crossed (WAD, 1e18 = 1.0)

```solidity
uint256 internal _tickSizeBase;
```

### _auctionResultsNextIndex

The index of the next auction result

```solidity
uint8 internal _auctionResultsNextIndex;
```

### _auctionTrackingPeriod

The number of days that auction results are tracked for

```solidity
uint8 internal _auctionTrackingPeriod;
```

### _auctionResults

The auction results, where a positive number indicates an over-subscription for the day.

*The length of this array is equal to the auction tracking period*

```solidity
int256[] internal _auctionResults;
```

### _pendingDepositPeriodChanges

Queue of pending deposit period enable/disable changes

```solidity
PendingDepositPeriodChange[] internal _pendingDepositPeriodChanges;
```

## Functions

### constructor

```solidity
constructor(address kernel_, address cdFacility_, address depositAsset_) Policy(Kernel(kernel_));
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

### bid

Submit a bid for convertible deposit tokens

*This function performs the following:

- Updates the current tick based on the current state
- Determines the amount of OHM that can be purchased for the deposit amount, and the updated tick capacity and price
- Updates the day state, if necessary
- Creates a convertible deposit position using the deposit amount, the average conversion price and the deposit period
This function reverts if:
- The contract is not active
- The auction is disabled
- The bid amount is below the minimum bid
- Deposits are not enabled for the asset/period/operator
- The depositor has not approved the DepositManager to spend the deposit asset
- The depositor has an insufficient balance of the deposit asset
- The calculated amount of OHM out is 0
- The calculated amount of OHM out is < minOhmOut_*

```solidity
function bid(uint8 depositPeriod_, uint256 depositAmount_, uint256 minOhmOut_, bool wrapPosition_, bool wrapReceipt_)
    external
    override
    nonReentrant
    onlyEnabled
    onlyDepositPeriodEnabled(depositPeriod_)
    returns (uint256, uint256, uint256, uint256);
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
|`<none>`|`uint256`|ohmOut          Amount of OHM tokens that the deposit can be converted to|
|`<none>`|`uint256`|positionId      The ID of the position created by the DEPOS module to represent the convertible deposit terms|
|`<none>`|`uint256`|receiptTokenId  The ID of the receipt token created by the DepositManager to represent the deposit|
|`<none>`|`uint256`|actualAmount    The actual amount of deposit assets that were deposited (receipt tokens minted)|

### _bid

Internal function to submit an auction bid on the given deposit asset and period

*This function expects the calling function to have already validated the contract state and deposit asset and period*

```solidity
function _bid(BidParams memory params) internal returns (uint256, uint256, uint256, uint256);
```

### _previewBid

Internal function to preview the quantity of OHM tokens that can be purchased for a given deposit amount

*This function performs the following:

- Cycles through ticks until the deposit is fully converted
- If the current tick has enough capacity, it will be used
- If the current tick does not have enough capacity, the remaining capacity will be used. The current tick will then shift to the next tick, resulting in the capacity being filled to the tick size, and the price being multiplied by the tick step.
Notes:
- This function assumes that the auction is active (i.e. the target is non-zero) and the tick size is non-zero
- The function returns the updated tick capacity and price after the bid
- If the capacity of a tick is depleted (but does not cross into the next tick), the current tick will be shifted to the next one. This ensures that `getCurrentTick()` will not return a tick that has been depleted.*

```solidity
function _previewBid(uint256 deposit_, Tick memory tick_) internal view returns (BidOutput memory output);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deposit_`|`uint256`|           The amount of deposit to be bid|
|`tick_`|`Tick`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`output`|`BidOutput`|             The output of the bid|

### previewBid

Get the amount of OHM tokens that could be converted for a bid

```solidity
function previewBid(uint8 depositPeriod_, uint256 bidAmount_)
    external
    view
    override
    onlyEnabled
    onlyDepositPeriodEnabled(depositPeriod_)
    returns (uint256 ohmOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|
|`bidAmount_`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmOut`|`uint256`|         Amount of OHM tokens that the deposit could be converted to|

### _getConvertedDeposit

Internal function to preview the quantity of OHM tokens that can be purchased for a given deposit amount

*This function does not take into account the capacity of the current tick*

```solidity
function _getConvertedDeposit(uint256 deposit_, uint256 price_) internal pure returns (uint256 convertibleAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`deposit_`|`uint256`|           The amount of deposit to be converted|
|`price_`|`uint256`|             The price of the deposit in OHM|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`convertibleAmount`|`uint256`|  The quantity of OHM tokens that can be purchased|

### _getNewTickPrice

Internal function to preview the new price of the current tick after applying the tick step

*This function does not take into account the capacity of the current tick*

```solidity
function _getNewTickPrice(uint256 currentPrice_, uint256 tickStep_) internal pure returns (uint256 newPrice);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentPrice_`|`uint256`|      The current price of the tick in terms of the bid token|
|`tickStep_`|`uint256`|          The step size of the tick|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newPrice`|`uint256`|           The new price of the tick|

### _getNewTickSize

Internal function to calculate the new tick size based on the amount of OHM that has been converted in the current day

*This implements exponential tick size reduction (by 1/(base^multiplier)) for each multiple of the day target that is reached
If the new tick size is 0 or a calculation would result in an overflow, the tick size is set to the minimum*

```solidity
function _getNewTickSize(uint256 ohmOut_, AuctionParameters memory auctionParams_)
    internal
    view
    returns (uint256 newTickSize);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`ohmOut_`|`uint256`|    The amount of OHM that has been converted in the current day|
|`auctionParams_`|`AuctionParameters`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newTickSize`|`uint256`|The new tick size|

### _getOhmUntilNextThreshold

Internal function to calculate the amount of OHM remaining until the next day target threshold is reached

```solidity
function _getOhmUntilNextThreshold(uint256 currentConvertible_, uint256 target_)
    internal
    pure
    returns (uint256 ohmUntilThreshold);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`currentConvertible_`|`uint256`|The current cumulative amount of OHM that has been converted|
|`target_`|`uint256`|            The day target|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ohmUntilThreshold`|`uint256`|  The amount of OHM remaining until the next threshold|

### _getCurrentTick

```solidity
function _getCurrentTick(uint8 depositPeriod_) internal view returns (Tick memory tick);
```

### getCurrentTick

Calculate the current tick of the auction

*This function calculates the tick at the current time.
It uses the following approach:

- Calculate the added capacity based on the time passed since the last bid, and add it to the current capacity to get the new capacity
- Until the new capacity is <= to the standard tick size, reduce the capacity by the standard tick size and reduce the price by the tick step
- If the calculated price is ever lower than the minimum price, the new price is set to the minimum price and the capacity is set to the standard tick size
Notes:
- If the target is 0, the price will not decay and the capacity will not change. It will only decay when a target is set again to a non-zero value.
This function reverts if:
- The deposit asset and period are not enabled*

```solidity
function getCurrentTick(uint8 depositPeriod_)
    external
    view
    onlyDepositPeriodEnabled(depositPeriod_)
    returns (Tick memory tick);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`Tick`|Tick info|

### getPreviousTick

Get the previous tick of the auction

*This function returns the previous tick for the deposit period
If the deposit period is not configured, all values will be 0*

```solidity
function getPreviousTick(uint8 depositPeriod_) public view override returns (Tick memory tick);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tick`|`Tick`|Tick info|

### getCurrentTickSize

Get the current tick size

```solidity
function getCurrentTickSize() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|tickSize The current tick size|

### getAuctionParameters

Get the current auction parameters

```solidity
function getAuctionParameters() external view override returns (AuctionParameters memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`AuctionParameters`|auctionParameters Auction parameters|

### isAuctionActive

Check if the auction is currently active

*The auction is considered active when target > 0*

```solidity
function isAuctionActive() external view override returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isActive True if the auction is active, false if disabled|

### getDayState

Get the auction state for the current day

```solidity
function getDayState() external view override returns (Day memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Day`|day Day info|

### getTickStep

The multiplier applied to the conversion price at every tick, in terms of `ONE_HUNDRED_PERCENT`

*This is stored as a percentage, where 100e2 = 100% (no increase)*

```solidity
function getTickStep() external view override returns (uint24);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|tickStep The tick step, in terms of `ONE_HUNDRED_PERCENT`|

### getMinimumBid

Get the minimum bid amount

```solidity
function getMinimumBid() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|minimumBid The minimum bid amount required|

### getAuctionTrackingPeriod

Get the number of days that auction results are tracked for

```solidity
function getAuctionTrackingPeriod() external view override returns (uint8);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|daysTracked The number of days that auction results are tracked for|

### getAuctionResultsNextIndex

Get the index of the next auction result

```solidity
function getAuctionResultsNextIndex() external view override returns (uint8);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|index The index where the next auction result will be stored|

### getAuctionResults

Get the auction results for the tracking period

```solidity
function getAuctionResults() external view override returns (int256[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256[]`|results The auction results, where a positive number indicates an over-subscription for the day.|

### _validateNoDuplicatePendingChange

Validates that the requested action would not result in the same effective state, preventing redundant queue operations

```solidity
function _validateNoDuplicatePendingChange(uint8 depositPeriod_, bool enable_) internal view;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period to check|
|`enable_`|`bool`|        Whether the requested operation is to enable (true) or disable (false)|

### _getEffectiveDepositPeriodState

Gets the effective state of a deposit period considering pending changes

```solidity
function _getEffectiveDepositPeriodState(uint8 depositPeriod_) internal view returns (bool effectiveState);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`effectiveState`|`bool`| The effective enabled state (current state + pending changes)|

### _processPendingDepositPeriodChanges

Processes all pending deposit period changes

```solidity
function _processPendingDepositPeriodChanges(uint256 tickSize_, uint256 minPrice_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickSize_`|`uint256`|  The tick size to initialize new periods with|
|`minPrice_`|`uint256`|  The minimum price to initialize new periods with|

### _enableDepositPeriod

Internal function to actually enable a deposit period

```solidity
function _enableDepositPeriod(uint8 depositPeriod_, uint256 tickSize_, uint256 minPrice_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period to enable|
|`tickSize_`|`uint256`|      The tick size to initialize with|
|`minPrice_`|`uint256`|      The minimum price to initialize with|

### _disableDepositPeriod

Internal function to actually disable a deposit period

```solidity
function _disableDepositPeriod(uint8 depositPeriod_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period to disable|

### getDepositAsset

Get the deposit asset

```solidity
function getDepositAsset() external view override returns (IERC20);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IERC20`|asset The deposit asset|

### getDepositPeriods

Get the deposit periods for the deposit asset that are enabled

```solidity
function getDepositPeriods() external view override returns (uint8[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8[]`|periods The deposit periods|

### isDepositPeriodEnabled

Returns whether a deposit period is enabled

```solidity
function isDepositPeriodEnabled(uint8 depositPeriod_)
    public
    view
    override
    returns (bool isEnabled, bool isPendingEnabled);
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

### _onlyDepositPeriodEnabled

```solidity
function _onlyDepositPeriodEnabled(uint8 depositPeriod_) internal view;
```

### onlyDepositPeriodEnabled

Modifier to check if a deposit period is enabled

```solidity
modifier onlyDepositPeriodEnabled(uint8 depositPeriod_);
```

### enableDepositPeriod

Enables a deposit period

*Notes:

- Enabling a deposit period will queue the change to be processed at the next setAuctionParameters call
- Can be called while the contract is disabled (changes will be processed when contract is enabled)
- The deposit period will reset the minimum price and tick size to the standard values when actually enabled
This function will revert if:
- The caller is not a manager or admin
- The deposit period is 0
- The effective state would result in enabling an already enabled period*

```solidity
function enableDepositPeriod(uint8 depositPeriod_) external override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|

### disableDepositPeriod

Disables a deposit period

*Notes:

- Disabling a deposit period will queue the change to be processed at the next setAuctionParameters call
- Can be called while the contract is disabled (changes will be processed when contract is enabled)
This function will revert if:
- The caller is not a manager or admin
- The deposit period is 0
- The effective state would result in disabling an already disabled period*

```solidity
function disableDepositPeriod(uint8 depositPeriod_) external override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositPeriod_`|`uint8`| The deposit period|

### getDepositPeriodsCount

Get the number of deposit periods that are enabled

```solidity
function getDepositPeriodsCount() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|count The number of deposit periods|

### getPendingDepositPeriodChanges

Gets the list of pending deposit period changes, from first to last

```solidity
function getPendingDepositPeriodChanges() external view returns (PendingDepositPeriodChange[] memory);
```

### _setAuctionParameters

```solidity
function _setAuctionParameters(uint256 target_, uint256 tickSize_, uint256 minPrice_) internal;
```

### _storeAuctionResults

```solidity
function _storeAuctionResults(uint256 previousTarget_) internal;
```

### _setNewTickParameters

Sets tick parameters for all enabled deposit periods

```solidity
function _setNewTickParameters(
    uint256 tickSize_,
    uint256 minPrice_,
    bool enforceCapacity_,
    bool enforceMinPrice_,
    bool setLastUpdate_
) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tickSize_`|`uint256`|          If the new tick size is less than a tick's capacity (or `enforceCapacity_` is true), the tick capacity will be set to this|
|`minPrice_`|`uint256`|          If the new minimum price is greater than a tick's price (or `enforceMinPrice_` is true), the tick price will be set to this|
|`enforceCapacity_`|`bool`|   If true, will set the capacity of each enabled deposit period to the value of `tickSize_`|
|`enforceMinPrice_`|`bool`|   If true, will set the price of each enabled deposit period to the value of `minPrice_`|
|`setLastUpdate_`|`bool`|     If true, will set the tick's last update to the current timestamp|

### _updateCurrentTicks

Takes a snapshot of the current tick values for enabled deposit periods

```solidity
function _updateCurrentTicks(uint8 excludedDepositPeriod_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`excludedDepositPeriod_`|`uint8`| The deposit period that should be excluded from updates. Provide 0 to not exclude (since 0 is an invalid deposit period).|

### setAuctionParameters

Update the auction parameters

*This function assumes that the the caller is only calling once per period (day), as the contract does not track epochs or timestamps.
This function performs the following:

- Performs validation of the inputs
- Captures the current tick state for all enabled deposit periods
- Stores the auction results for the previous period
- Sets the auction parameters
- Sets the tick parameters for all enabled deposit periods
- Processes any pending deposit period changes
This function reverts if:
- The caller does not have the ROLE_EMISSION_MANAGER role
- The new tick size is 0
- The new min price is 0*

```solidity
function setAuctionParameters(uint256 target_, uint256 tickSize_, uint256 minPrice_)
    external
    override
    onlyRole(ROLE_EMISSION_MANAGER);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`target_`|`uint256`|       new target sale per day|
|`tickSize_`|`uint256`|     new size per tick|
|`minPrice_`|`uint256`|     new minimum tick price|

### setTickStep

Sets the multiplier applied to the conversion price at every tick, in terms of `ONE_HUNDRED_PERCENT`

*This function will revert if:

- The caller does not have the ROLE_ADMIN role
- The new tick step is < 100e2*

```solidity
function setTickStep(uint24 newStep_) public override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newStep_`|`uint24`|   The new tick step|

### getTickSizeBase

Get the exponent base used for determining the tick size when the day target is crossed

```solidity
function getTickSizeBase() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|baseWad The tick size base|

### setTickSizeBase

Set the exponent base used for determining the tick size when the day target is crossed

*This function will revert if:

- The caller does not have the ROLE_ADMIN or ROLE_MANAGER role
- The new tick size base is not within the bounds (1e18 ≤ base ≤ 10e18)*

```solidity
function setTickSizeBase(uint256 newBase_) public override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newBase_`|`uint256`|   The new tick size base|

### setAuctionTrackingPeriod

Set the number of days that auction results are tracked for

*Notes:

- Calling this function will erase the previous auction results, which in turn may affect the bond markets created to sell under-sold OHM capacity
This function will revert if:
- The caller does not have the ROLE_ADMIN role
- The new auction tracking period is 0*

```solidity
function setAuctionTrackingPeriod(uint8 days_) public override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`days_`|`uint8`|   The new auction tracking period|

### setMinimumBid

Set the minimum bid amount

*This function will revert if:

- The caller does not have the ROLE_ADMIN or ROLE_MANAGER role*

```solidity
function setMinimumBid(uint256 minimumBid_) external override onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`minimumBid_`|`uint256`|   The new minimum bid amount|

### _enable

Implementation-specific enable function

*This function will revert if:

- The enable data is not the correct length
- The enable data is not an encoded `EnableParams` struct
- The auction parameters are invalid
- The tick step is invalid
- The auction tracking period is invalid
This function performs the following:
- Sets the auction parameters
- Sets the tick step
- Sets the auction tracking period
- Ensures all existing ticks have the current parameters
- Processes any pending deposit period changes with the new parameters (including any that were pending prior to disabling)
- Resets the day state
- Resets the auction results*

```solidity
function _enable(bytes calldata enableData_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`|Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation.|

## Structs

### BidOutput

```solidity
struct BidOutput {
    uint256 tickCapacity;
    uint256 tickPrice;
    uint256 tickSize;
    uint256 depositIn;
    uint256 ohmOut;
}
```

### BidParams

```solidity
struct BidParams {
    uint8 depositPeriod;
    uint256 depositAmount;
    uint256 minOhmOut;
    bool wrapPosition;
    bool wrapReceipt;
}
```

### PendingDepositPeriodChange

```solidity
struct PendingDepositPeriodChange {
    uint8 depositPeriod;
    bool enable;
}
```
