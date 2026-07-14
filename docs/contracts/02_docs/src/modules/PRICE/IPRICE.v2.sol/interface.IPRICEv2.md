# IPRICEv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/modules/PRICE/IPRICE.v2.sol)

Price oracle interface for PRICEv2

Interface extracted from PRICEv2 abstract contract

## Functions

### observationFrequency

The frequency of price observations (in seconds)

```solidity
function observationFrequency() external view returns (uint48);
```

### decimals

The number of decimals to used in output values

```solidity
function decimals() external view returns (uint8);
```

### unitOfAccount

The reserved unit-of-account key

```solidity
function unitOfAccount() external pure returns (address);
```

### getAssets

Provides a list of registered assets

```solidity
function getAssets() external view returns (address[] memory assets);
```

**Returns**

| Name     | Type        | Description                        |
| -------- | ----------- | ---------------------------------- |
| `assets` | `address[]` | The addresses of registered assets |

### getAssetData

Provides the configuration of a specific asset

```solidity
function getAssetData(address asset_) external view returns (Asset memory data);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name   | Type    | Description                                  |
| ------ | ------- | -------------------------------------------- |
| `data` | `Asset` | The asset configuration as an `Asset` struct |

### isAssetApproved

Indicates whether `asset_` has been registered

```solidity
function isAssetApproved(address asset_) external view returns (bool approved);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name       | Type   | Description                   |
| ---------- | ------ | ----------------------------- |
| `approved` | `bool` | Whether the asset is approved |

### isNonContractAsset

Indicates whether `asset_` is registered as a non-contract asset

```solidity
function isNonContractAsset(address asset_) external view returns (bool registered);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name         | Type   | Description                     |
| ------------ | ------ | ------------------------------- |
| `registered` | `bool` | Whether the asset is registered |

### getPrice

Returns the current price of an asset in the system unit of account

```solidity
function getPrice(address asset_) external view returns (uint256 price);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name    | Type      | Description                                           |
| ------- | --------- | ----------------------------------------------------- |
| `price` | `uint256` | The USD price of the asset in the scale of `decimals` |

### getPrice

Returns the requested variant of the asset price in the system unit of account and the timestamp at which it was calculated

- Variant.CURRENT: current aggregating feed price, including moving average if configured

Reverts with `PRICE_MovingAverageStale` when a configured moving average is stale

- Variant.LAST: last stored observation price

- Variant.MOVINGAVERAGE: raw stored moving average price (no staleness check)

```solidity
function getPrice(address asset_, Variant variant_) external view returns (uint256 _price, uint48 _timestamp);
```

**Parameters**

| Name       | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| `asset_`   | `address` | The address of the asset           |
| `variant_` | `Variant` | The variant of the price to return |

**Returns**

| Name         | Type      | Description                                           |
| ------------ | --------- | ----------------------------------------------------- |
| `_price`     | `uint256` | The USD price of the asset in the scale of `decimals` |
| `_timestamp` | `uint48`  | The timestamp at which the price was calculated       |

### getPriceIn

Returns the current price of an asset in terms of the quote asset

```solidity
function getPriceIn(address asset_, address quote_) external view returns (uint256 price);
```

**Parameters**

| Name     | Type      | Description                                                         |
| -------- | --------- | ------------------------------------------------------------------- |
| `asset_` | `address` | The address of the asset being priced                               |
| `quote_` | `address` | The address of the quote asset that the price will be calculated in |

**Returns**

| Name    | Type      | Description                                 |
| ------- | --------- | ------------------------------------------- |
| `price` | `uint256` | The price of the asset in units of `quote_` |

### getPriceIn

Returns the requested variant of the asset price in terms of the quote asset

```solidity
function getPriceIn(address asset_, address quote_, Variant variant_)
    external
    view
    returns (uint256 _price, uint48 _timestamp);
```

**Parameters**

| Name       | Type      | Description                                                         |
| ---------- | --------- | ------------------------------------------------------------------- |
| `asset_`   | `address` | The address of the asset being priced                               |
| `quote_`   | `address` | The address of the quote asset that the price will be calculated in |
| `variant_` | `Variant` | The variant of the price to return                                  |

**Returns**

| Name         | Type      | Description                                     |
| ------------ | --------- | ----------------------------------------------- |
| `_price`     | `uint256` | The price of the asset in units of `quote_`     |
| `_timestamp` | `uint48`  | The timestamp at which the price was calculated |

### storeObservation

Stores a price observation for moving average calculation

Permissioned - only authorized callers can store observations

Reverts if the asset does not store moving average

Emits PriceStored

```solidity
function storeObservation(address asset_) external;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### storeObservations

Calculates and stores the current price of assets that track a moving average

```solidity
function storeObservations() external;
```

### addAsset

Adds a new asset definition

```solidity
function addAsset(
    address asset_,
    bool storeMovingAverage_,
    bool useMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_,
    Component memory strategy_,
    Component[] memory feeds_
) external;
```

**Parameters**

| Name                     | Type          | Description                                                              |
| ------------------------ | ------------- | ------------------------------------------------------------------------ |
| `asset_`                 | `address`     | The address of the asset                                                 |
| `storeMovingAverage_`    | `bool`        | Whether the moving average should be stored periodically                 |
| `useMovingAverage_`      | `bool`        | Whether the moving average should be used as an argument to the strategy |
| `movingAverageDuration_` | `uint32`      | The duration of the moving average in seconds                            |
| `lastObservationTime_`   | `uint48`      | The timestamp of the last observation                                    |
| `observations_`          | `uint256[]`   | The observations to be used to initialize the moving average             |
| `strategy_`              | `Component`   | The strategy to be used to aggregate price feeds                         |
| `feeds_`                 | `Component[]` | The price feeds to be used to calculate the price                        |

### validateAddAsset

Validates parameters for adding a new asset definition

Does not mutate state.

```solidity
function validateAddAsset(
    address asset_,
    bool storeMovingAverage_,
    bool useMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_,
    Component memory strategy_,
    Component[] memory feeds_
) external view;
```

**Parameters**

| Name                     | Type          | Description                                                              |
| ------------------------ | ------------- | ------------------------------------------------------------------------ |
| `asset_`                 | `address`     | The address of the asset                                                 |
| `storeMovingAverage_`    | `bool`        | Whether the moving average should be stored periodically                 |
| `useMovingAverage_`      | `bool`        | Whether the moving average should be used as an argument to the strategy |
| `movingAverageDuration_` | `uint32`      | The duration of the moving average in seconds                            |
| `lastObservationTime_`   | `uint48`      | The timestamp of the last observation                                    |
| `observations_`          | `uint256[]`   | The observations to be used to initialize the moving average             |
| `strategy_`              | `Component`   | The strategy to be used to aggregate price feeds                         |
| `feeds_`                 | `Component[]` | The price feeds to be used to calculate the price                        |

### removeAsset

Removes an asset definition

```solidity
function removeAsset(address asset_) external;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### validateRemoveAsset

Validates parameters for removing an asset definition

Does not mutate state.

```solidity
function validateRemoveAsset(address asset_) external view;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### registerNonContractAsset

Registers a non-contract asset

Whitelists a non-contract address so PRICE can manage it as an asset.
Registration does not configure pricing by itself.

```solidity
function registerNonContractAsset(address asset_) external;
```

**Parameters**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `asset_` | `address` | The address of the asset to register |

### unregisterNonContractAsset

Unregisters a non-contract asset

Removes a non-contract address from PRICE asset management.
This cannot be used for the reserved unit of account or for an
asset that still has an active PRICE configuration.

```solidity
function unregisterNonContractAsset(address asset_) external;
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `asset_` | `address` | The address of the asset to unregister |

### updateAsset

Updates an asset configuration atomically

Only updates components flagged in params\_

Validates entire configuration atomically after updates

Will revert if:

- `asset_` is not approved

- The caller is not permissioned

- Any updated submodule is not installed

- The final configuration is invalid

- All update flags are false (no-op)

```solidity
function updateAsset(address asset_, UpdateAssetParams memory params_) external;
```

**Parameters**

| Name      | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| `asset_`  | `address`           | The address of the asset to update |
| `params_` | `UpdateAssetParams` | Update parameters with flags       |

### validateUpdateAsset

Validates parameters for updating an asset configuration

Does not mutate state.

```solidity
function validateUpdateAsset(address asset_, UpdateAssetParams memory params_) external view;
```

**Parameters**

| Name      | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| `asset_`  | `address`           | The address of the asset to update |
| `params_` | `UpdateAssetParams` | Update parameters with flags       |

### validateInstallSubmodule

Validates parameters for installing a PRICE submodule

Does not mutate state.

```solidity
function validateInstallSubmodule(address submodule_) external view;
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `submodule_` | `address` | The address of the submodule to install |

### validateUpgradeSubmodule

Validates parameters for upgrading a PRICE submodule

Does not mutate state.

```solidity
function validateUpgradeSubmodule(address submodule_) external view;
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `submodule_` | `address` | The address of the submodule to upgrade to |

### validateExecOnSubmodule

Validates parameters for executing a call on a PRICE submodule

Does not mutate state.

```solidity
function validateExecOnSubmodule(bytes20 subKeycode_) external view;
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `subKeycode_` | `bytes20` | The 20-byte SubKeycode of the submodule to call |

## Events

### PriceStored

An asset's price is stored

```solidity
event PriceStored(address indexed asset_, uint256 price_, uint48 timestamp_);
```

**Parameters**

| Name         | Type      | Description                                          |
| ------------ | --------- | ---------------------------------------------------- |
| `asset_`     | `address` | The address of the asset                             |
| `price_`     | `uint256` | The price of the asset in the system unit of account |
| `timestamp_` | `uint48`  | The timestamp at which the price was calculated      |

### AssetAdded

An asset's definition is added

```solidity
event AssetAdded(address indexed asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### AssetRemoved

An asset's definition is removed

```solidity
event AssetRemoved(address indexed asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### AssetPriceFeedsUpdated

The price feeds of an asset are updated

```solidity
event AssetPriceFeedsUpdated(address indexed asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### AssetPriceStrategyUpdated

The price aggregation strategy of an asset is updated

```solidity
event AssetPriceStrategyUpdated(address indexed asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### AssetMovingAverageUpdated

The moving average data of an asset is updated

```solidity
event AssetMovingAverageUpdated(address indexed asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

## Errors

### PRICE_ObservationFrequencyInvalid

Passed observation frequency is invalid

```solidity
error PRICE_ObservationFrequencyInvalid(uint32 frequency_);
```

**Parameters**

| Name         | Type     | Description                                 |
| ------------ | -------- | ------------------------------------------- |
| `frequency_` | `uint32` | The observation frequency that was provided |

### PRICE_AssetNotApproved

The asset is not approved for use

```solidity
error PRICE_AssetNotApproved(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_InvalidAsset

The asset is invalid for the requested PRICE operation

This is used when the asset identifier does not satisfy PRICE's validation
rules for the relevant code path.

```solidity
error PRICE_InvalidAsset(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_AssetAlreadyApproved

The asset is already approved for use

If trying to amend the configuration, use one of the update functions

```solidity
error PRICE_AssetAlreadyApproved(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_AssetReserved

The asset address is reserved for internal PRICE usage

```solidity
error PRICE_AssetReserved(address asset_);
```

**Parameters**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `asset_` | `address` | The reserved asset address |

### PRICE_PriceFeedCallFailed

A price feed call failed when initially configuring an asset

```solidity
error PRICE_PriceFeedCallFailed(address asset_);
```

**Parameters**

| Name     | Type      | Description                                                |
| -------- | --------- | ---------------------------------------------------------- |
| `asset_` | `address` | The address of the asset that triggered the submodule call |

### PRICE_MovingAverageNotStored

The moving average for an asset was requested when it is not stored

```solidity
error PRICE_MovingAverageNotStored(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_MovingAverageStale

The moving average for an asset was used, but is stale

```solidity
error PRICE_MovingAverageStale(address asset_, uint48 lastObservationTime_);
```

**Parameters**

| Name                   | Type      | Description                           |
| ---------------------- | --------- | ------------------------------------- |
| `asset_`               | `address` | The address of the asset              |
| `lastObservationTime_` | `uint48`  | The timestamp of the last observation |

### PRICE_ObservationTooEarly

An observation was attempted before the earliest permitted timestamp

```solidity
error PRICE_ObservationTooEarly(address asset_, uint48 observationTime_, uint48 earliestAllowedTime_);
```

**Parameters**

| Name                   | Type      | Description                                                 |
| ---------------------- | --------- | ----------------------------------------------------------- |
| `asset_`               | `address` | The address of the asset                                    |
| `observationTime_`     | `uint48`  | The timestamp used by the attempted observation             |
| `earliestAllowedTime_` | `uint48`  | The earliest permissible timestamp for the next observation |

### PRICE_ParamsLastObservationTimeInvalid

The last observation time is invalid

The last observation time must be less than the latest timestamp

```solidity
error PRICE_ParamsLastObservationTimeInvalid(
    address asset_, uint48 lastObservationTime_, uint48 earliestTimestamp_, uint48 latestTimestamp_
);
```

**Parameters**

| Name                   | Type      | Description                                 |
| ---------------------- | --------- | ------------------------------------------- |
| `asset_`               | `address` | The address of the asset                    |
| `lastObservationTime_` | `uint48`  | The last observation time that was provided |
| `earliestTimestamp_`   | `uint48`  | The earliest permissible timestamp          |
| `latestTimestamp_`     | `uint48`  | The latest permissible timestamp            |

### PRICE_ParamsMovingAverageDurationInvalid

The provided moving average duration is invalid

The moving average duration must be a integer multiple
of the `observationFrequency_`

```solidity
error PRICE_ParamsMovingAverageDurationInvalid(
    address asset_, uint32 movingAverageDuration_, uint48 observationFrequency_
);
```

**Parameters**

| Name                     | Type      | Description                                   |
| ------------------------ | --------- | --------------------------------------------- |
| `asset_`                 | `address` | The address of the asset                      |
| `movingAverageDuration_` | `uint32`  | The moving average duration that was provided |
| `observationFrequency_`  | `uint48`  | The observation frequency that was provided   |

### PRICE_ParamsObservationZero

The provided observation value is zero

Observation values should not be zero

```solidity
error PRICE_ParamsObservationZero(address asset_, uint256 observationIndex_);
```

**Parameters**

| Name                | Type      | Description                                   |
| ------------------- | --------- | --------------------------------------------- |
| `asset_`            | `address` | The address of the asset                      |
| `observationIndex_` | `uint256` | The index of the observation that was invalid |

### PRICE_ParamsInvalidObservationCount

The provided observation count is invalid

```solidity
error PRICE_ParamsInvalidObservationCount(
    address asset_, uint256 observationCount_, uint256 minimumObservationCount_, uint256 maximumObservationCount_
);
```

**Parameters**

| Name                       | Type      | Description                                            |
| -------------------------- | --------- | ------------------------------------------------------ |
| `asset_`                   | `address` | The address of the asset                               |
| `observationCount_`        | `uint256` | The number of observations that was provided           |
| `minimumObservationCount_` | `uint256` | The minimum number of observations that is permissible |
| `maximumObservationCount_` | `uint256` | The maximum number of observations that is permissible |

### PRICE_ParamsPriceFeedInsufficient

The number of provided price feeds is insufficient

```solidity
error PRICE_ParamsPriceFeedInsufficient(address asset_, uint256 feedCount_, uint256 feedCountRequired_);
```

**Parameters**

| Name                 | Type      | Description                                |
| -------------------- | --------- | ------------------------------------------ |
| `asset_`             | `address` | The address of the asset                   |
| `feedCount_`         | `uint256` | The number of price feeds provided         |
| `feedCountRequired_` | `uint256` | The minimum number of price feeds required |

### PRICE_ParamsStoreMovingAverageRequired

The asset requires storeMovingAverage to be enabled

This will usually be triggered if the asset is configured to use a moving average

```solidity
error PRICE_ParamsStoreMovingAverageRequired(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_ParamsStrategyInsufficient

A strategy must be defined for the asset

This will be triggered if strategy specified is insufficient for
the configured price feeds and moving average.

```solidity
error PRICE_ParamsStrategyInsufficient(address asset_, bytes strategy_, uint256 feedCount_, bool useMovingAverage_);
```

**Parameters**

| Name                | Type      | Description                                                              |
| ------------------- | --------- | ------------------------------------------------------------------------ |
| `asset_`            | `address` | The address of the asset                                                 |
| `strategy_`         | `bytes`   | The provided strategy, as an encoded `Component` struct                  |
| `feedCount_`        | `uint256` | The number of price feeds configured for the asset                       |
| `useMovingAverage_` | `bool`    | Whether the moving average should be used as an argument to the strategy |

### PRICE_ParamsStrategyNotSupported

A strategy was provided for a single price source

Strategy is unnecessary and will not be used

```solidity
error PRICE_ParamsStrategyNotSupported(address asset_);
```

**Parameters**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `asset_` | `address` | The asset being configured |

### PRICE_ParamsVariantInvalid

The variant provided in the parameters is invalid

See the `Variant` enum for valid variants

```solidity
error PRICE_ParamsVariantInvalid(Variant variant_);
```

**Parameters**

| Name       | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `variant_` | `Variant` | The variant that was provided |

### PRICE_PriceZero

The asset returned a price of zero

This indicates a problem with the configured price feeds for `asset_`.
Consider adding more price feeds or using a different price aggregation strategy.

```solidity
error PRICE_PriceZero(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### PRICE_StrategyFailed

Executing the price strategy failed

This indicates a problem with the configured price feeds or strategy for `asset_`.

```solidity
error PRICE_StrategyFailed(address asset_, bytes data_);
```

**Parameters**

| Name     | Type      | Description                                 |
| -------- | --------- | ------------------------------------------- |
| `asset_` | `address` | The address of the asset                    |
| `data_`  | `bytes`   | The data returned when calling the strategy |

### PRICE_SubmoduleNotInstalled

The specified submodule is not installed

```solidity
error PRICE_SubmoduleNotInstalled(address asset_, bytes target_);
```

**Parameters**

| Name      | Type      | Description                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `asset_`  | `address` | The address of the asset that triggered the submodule lookup |
| `target_` | `bytes`   | The encoded SubKeycode of the submodule                      |

### PRICE_DuplicatePriceFeed

A duplicate price feed was provided when updating an asset's price feeds

```solidity
error PRICE_DuplicatePriceFeed(address asset_, uint256 index_);
```

**Parameters**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `asset_` | `address` | The asset being updated with duplicate price feeds |
| `index_` | `uint256` | The index of the price feed that is a duplicate    |

### PRICE_NoUpdatesRequested

Thrown when updateAsset is called with all update flags set to false

```solidity
error PRICE_NoUpdatesRequested(address asset_);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

## Structs

### Component

Struct to hold the configuration for calling a function on a contract

Used to configure strategy and fees in the `Asset` struct

```solidity
struct Component {
    SubKeycode target;
    bytes4 selector;
    bytes params;
}
```

**Properties**

| Name       | Type         | Description                                 |
| ---------- | ------------ | ------------------------------------------- |
| `target`   | `SubKeycode` | SubKeycode for the target submodule         |
| `selector` | `bytes4`     | The selector of the contract's function     |
| `params`   | `bytes`      | The parameters to be passed to the function |

### Asset

Struct to hold the configuration for an asset

```solidity
struct Asset {
    bool approved;
    bool storeMovingAverage;
    bool useMovingAverage;
    uint32 movingAverageDuration;
    uint16 nextObsIndex;
    uint16 numObservations;
    uint48 lastObservationTime;
    uint256 cumulativeObs;
    uint256[] obs;
    bytes strategy;
    bytes feeds;
}
```

**Properties**

| Name                    | Type        | Description                                                                  |
| ----------------------- | ----------- | ---------------------------------------------------------------------------- |
| `approved`              | `bool`      | Whether the asset is approved for use in the system                          |
| `storeMovingAverage`    | `bool`      | Whether the moving average should be stored on heartbeats                    |
| `useMovingAverage`      | `bool`      | Whether the moving average should be provided as an argument to the strategy |
| `movingAverageDuration` | `uint32`    | The duration of the moving average                                           |
| `nextObsIndex`          | `uint16`    | The index of obs at which the next observation will be stored                |
| `numObservations`       | `uint16`    | The number of observations stored                                            |
| `lastObservationTime`   | `uint48`    | The last time the moving average was updated                                 |
| `cumulativeObs`         | `uint256`   | The cumulative sum of observations                                           |
| `obs`                   | `uint256[]` | The array of stored observations                                             |
| `strategy`              | `bytes`     | Aggregates feed data into a single price result                              |
| `feeds`                 | `bytes`     | Price feeds stored in order of priority (primary feed in slot 0)             |

### UpdateAssetParams

Parameters for updating an asset configuration

Only updates components flagged in the struct

```solidity
struct UpdateAssetParams {
    bool updateFeeds;
    bool updateStrategy;
    bool updateMovingAverage;
    Component[] feeds;
    Component strategy;
    bool useMovingAverage;
    bool storeMovingAverage;
    uint32 movingAverageDuration;
    uint48 lastObservationTime;
    uint256[] observations;
}
```

**Properties**

| Name                    | Type          | Description                                                         |
| ----------------------- | ------------- | ------------------------------------------------------------------- |
| `updateFeeds`           | `bool`        | Whether to update price feeds                                       |
| `updateStrategy`        | `bool`        | Whether to update strategy                                          |
| `updateMovingAverage`   | `bool`        | Whether to update moving average configuration                      |
| `feeds`                 | `Component[]` | New price feeds (only read if updateFeeds=true)                     |
| `strategy`              | `Component`   | New strategy (only read if updateStrategy=true)                     |
| `useMovingAverage`      | `bool`        | New useMovingAverage flag (only read if updateStrategy=true)        |
| `storeMovingAverage`    | `bool`        | New storeMovingAverage flag (only read if updateMovingAverage=true) |
| `movingAverageDuration` | `uint32`      | New MA duration (only read if updateMovingAverage=true)             |
| `lastObservationTime`   | `uint48`      | New last observation time (only read if updateMovingAverage=true)   |
| `observations`          | `uint256[]`   | New observations (only read if updateMovingAverage=true)            |

## Enums

### Variant

Variant of price to retrieve

- CURRENT: The current aggregating feed price, including moving average if configured

Reverts with `PRICE_MovingAverageStale` when a configured moving average is stale

- LAST: The last stored observation price

- MOVINGAVERAGE: The raw stored moving average price of the asset

This accessor does not apply staleness checks

```solidity
enum Variant {
    CURRENT,
    LAST,
    MOVINGAVERAGE
}
```
