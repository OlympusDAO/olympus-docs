# IPriceConfigv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/interfaces/IPriceConfigv2.sol)

forge-lint: disable-start(mixed-case-function)

Interface for PriceConfigv2 policy

Policy to configure PRICEv2

## Functions

### queueTimelockDelay

Queue a timelocked change to the timelock delay

The delay update is not applied until the queued action is executed. Intended to be callable only by `admin`.

```solidity
function queueTimelockDelay(uint48 delay_) external returns (uint64 actionId_);
```

**Parameters**

| Name     | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| `delay_` | `uint48` | The new timelock delay in seconds |

**Returns**

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `actionId_` | `uint64` | The queued action ID |

### addAsset

Configure a new asset on the PRICE module

See PRICEv2 for more details on caching behavior when no moving average is stored and component interface

```solidity
function addAsset(
    address asset_,
    bool storeMovingAverage_,
    bool useMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_,
    IPRICEv2.Component memory strategy_,
    IPRICEv2.Component[] memory feeds_,
    PriceFeedExpectation[] memory feedExpectations_
) external;
```

**Parameters**

| Name                     | Type                     | Description                                                                                                                                       |
| ------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset_`                 | `address`                | The address of the asset to add                                                                                                                   |
| `storeMovingAverage_`    | `bool`                   | Whether to store the moving average for this asset                                                                                                |
| `useMovingAverage_`      | `bool`                   | Whether to use the moving average as part of the price resolution strategy for this asset                                                         |
| `movingAverageDuration_` | `uint32`                 | The duration of the moving average in seconds, only used if `storeMovingAverage_` is true                                                         |
| `lastObservationTime_`   | `uint48`                 | The timestamp of the last observation                                                                                                             |
| `observations_`          | `uint256[]`              | The array of observations to add - the number of observations must match the moving average duration divided by the PRICEv2 observation frequency |
| `strategy_`              | `IPRICEv2.Component`     | The price resolution strategy to use for this asset                                                                                               |
| `feeds_`                 | `IPRICEv2.Component[]`   | The array of price feeds to use for this asset                                                                                                    |
| `feedExpectations_`      | `PriceFeedExpectation[]` | Expected price and tolerance for each feed, aligned by index with `feeds_`                                                                        |

### registerNonContractAsset

Register a non-contract asset for management by the PRICE module

After registration, the address can be used as a non-contract asset identifier in PRICE

```solidity
function registerNonContractAsset(address asset_) external;
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `asset_` | `address` | The non-contract asset address to register |

### unregisterNonContractAsset

Deregister a non-contract asset from management by the PRICE module

This reverts if the asset is reserved or still configured on PRICE

```solidity
function unregisterNonContractAsset(address asset_) external;
```

**Parameters**

| Name     | Type      | Description                                  |
| -------- | --------- | -------------------------------------------- |
| `asset_` | `address` | The non-contract asset address to deregister |

### queueRemoveAsset

Queue removal of an asset from the PRICE module

After execution, calls to PRICEv2 for the asset's price will revert.

```solidity
function queueRemoveAsset(address asset_) external returns (uint64 actionId_);
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `asset_` | `address` | The address of the asset to remove |

**Returns**

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `actionId_` | `uint64` | The queued action ID |

### queueUpdateAsset

Queue an atomic asset configuration update

Only updates components flagged in params\_ after the queued action is executed.

See PRICEv2 for more details on the UpdateAssetParams struct

```solidity
function queueUpdateAsset(
    address asset_,
    IPRICEv2.UpdateAssetParams memory params_,
    PriceFeedExpectation[] memory feedExpectations_
) external returns (uint64 actionId_);
```

**Parameters**

| Name                | Type                         | Description                                                                                             |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| `asset_`            | `address`                    | The address of the asset to update                                                                      |
| `params_`           | `IPRICEv2.UpdateAssetParams` | Update parameters with flags indicating which components to update                                      |
| `feedExpectations_` | `PriceFeedExpectation[]`     | Expected price and tolerance for each feed when `params_.updateFeeds` is true. Must be empty otherwise. |

**Returns**

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `actionId_` | `uint64` | The queued action ID |

### storeObservation

Store a price observation for an asset

Calls PRICE.storeObservation(asset\_) to calculate and store current price

```solidity
function storeObservation(address asset_) external;
```

**Parameters**

| Name     | Type      | Description          |
| -------- | --------- | -------------------- |
| `asset_` | `address` | The address of asset |

### storeObservations

Store the current price of all assets that track a moving average

Calls PRICE.storeObservations() to calculate and store observations

```solidity
function storeObservations() external;
```

### installSubmodule

Install a new submodule on the designated module

```solidity
function installSubmodule(address submodule_) external;
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `submodule_` | `address` | The address of the submodule to install |

### queueUpgradeSubmodule

Queue an upgrade of a submodule on the PRICE module

The upgraded submodule must have the same keycode as an existing submodule that it is replacing, otherwise use installSubmodule.

```solidity
function queueUpgradeSubmodule(address submodule_) external returns (uint64 actionId_);
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `submodule_` | `address` | The address of the submodule to upgrade to |

**Returns**

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `actionId_` | `uint64` | The queued action ID |

### queueExecOnSubmodule

Queue an action on a PRICE submodule

The action is not performed until the queued action is executed. This is timelocked
because PRICE.execOnSubmodule() can call mutable submodule functions.

This function reverts if:

- The submodule is not installed

```solidity
function queueExecOnSubmodule(bytes20 subKeycode_, bytes calldata data_) external returns (uint64 actionId_);
```

**Parameters**

| Name          | Type      | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| `subKeycode_` | `bytes20` | The bytes20 keycode of the submodule to call |
| `data_`       | `bytes`   | The calldata to send to the submodule        |

**Returns**

| Name        | Type     | Description          |
| ----------- | -------- | -------------------- |
| `actionId_` | `uint64` | The queued action ID |

## Errors

### IPriceConfigv2_UnsupportedModuleInterface

Thrown when module does not support interface

```solidity
error IPriceConfigv2_UnsupportedModuleInterface(bytes5 keycode, bytes4 interfaceId);
```

**Parameters**

| Name          | Type     | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `keycode`     | `bytes5` | The keycode of the module                         |
| `interfaceId` | `bytes4` | The interface identifier, as specified in ERC-165 |

### IPriceConfigv2_UnsupportedModuleVersion

Thrown when module version is not supported

```solidity
error IPriceConfigv2_UnsupportedModuleVersion(bytes5 keycode, uint8 major, uint8 minor);
```

**Parameters**

| Name      | Type     | Description                     |
| --------- | -------- | ------------------------------- |
| `keycode` | `bytes5` | The keycode of the module       |
| `major`   | `uint8`  | The major version of the module |
| `minor`   | `uint8`  | The minor version of the module |

### IPriceConfigv2_FeedExpectationCountInvalid

Thrown when the number of feed expectations does not match the number of feeds

```solidity
error IPriceConfigv2_FeedExpectationCountInvalid(address asset_, uint256 expectationCount_, uint256 feedCount_);
```

**Parameters**

| Name                | Type      | Description                               |
| ------------------- | --------- | ----------------------------------------- |
| `asset_`            | `address` | The address of the asset being configured |
| `expectationCount_` | `uint256` | The number of expectations provided       |
| `feedCount_`        | `uint256` | The number of feeds expected              |

### IPriceConfigv2_FeedExpectationInvalid

Thrown when a feed expectation is invalid

```solidity
error IPriceConfigv2_FeedExpectationInvalid(address asset_, uint256 index_);
```

**Parameters**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `asset_` | `address` | The address of the asset being configured |
| `index_` | `uint256` | The index of the invalid expectation      |

### IPriceConfigv2_PriceFeedCallFailed

Thrown when a feed cannot be queried for expectation validation

```solidity
error IPriceConfigv2_PriceFeedCallFailed(address asset_, uint256 index_);
```

**Parameters**

| Name     | Type      | Description                               |
| -------- | --------- | ----------------------------------------- |
| `asset_` | `address` | The address of the asset being configured |
| `index_` | `uint256` | The index of the feed that failed         |

### IPriceConfigv2_PriceFeedOutOfBounds

Thrown when a feed price is outside the configured expectation range

```solidity
error IPriceConfigv2_PriceFeedOutOfBounds(
    address asset_, uint256 index_, uint256 price_, uint256 lowerBound_, uint256 upperBound_
);
```

**Parameters**

| Name          | Type      | Description                                                |
| ------------- | --------- | ---------------------------------------------------------- |
| `asset_`      | `address` | The address of the asset being configured                  |
| `index_`      | `uint256` | The index of the feed that returned an out-of-bounds price |
| `price_`      | `uint256` | The price returned by the feed                             |
| `lowerBound_` | `uint256` | The minimum accepted price                                 |
| `upperBound_` | `uint256` | The maximum accepted price                                 |

### IPriceConfigv2_SubmoduleImplementationChanged

Thrown when a queued submodule action targets a submodule implementation that has changed since queueing

```solidity
error IPriceConfigv2_SubmoduleImplementationChanged(bytes20 subKeycode, address expected, address actual);
```

**Parameters**

| Name         | Type      | Description                                                         |
| ------------ | --------- | ------------------------------------------------------------------- |
| `subKeycode` | `bytes20` | The bytes20 keycode of the queued submodule action                  |
| `expected`   | `address` | The submodule implementation installed when the action was queued   |
| `actual`     | `address` | The submodule implementation installed when the action was executed |

## Structs

### PriceFeedExpectation

Expected price and tolerance for a configured feed

Used as a configuration-time plausibility check only. This
does not prove feed identity; a different asset with a similar
price can still pass within tolerance.

```solidity
struct PriceFeedExpectation {
    uint256 expectedPrice;
    uint16 toleranceBps;
}
```

**Properties**

| Name            | Type      | Description                                            |
| --------------- | --------- | ------------------------------------------------------ |
| `expectedPrice` | `uint256` | Expected feed price in PRICE output decimals           |
| `toleranceBps`  | `uint16`  | Allowed deviation from expected price, in basis points |
