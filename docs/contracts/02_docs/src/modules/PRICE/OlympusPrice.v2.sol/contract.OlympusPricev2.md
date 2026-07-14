# OlympusPricev2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/OlympusPrice.v2.sol)

**Inherits:**
[PRICEv2](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PRICEv2), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:**
OlympusPriceV2

**Author:**
Oighty

SPDX-License-Identifier: AGPL-3.0
forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Provides current and historical prices for assets

## Functions

### constructor

Constructor to create OlympusPrice V2

The constructor reverts if:

- `observationFrequency_` is invalid (zero)

```solidity
constructor(Kernel kernel_, uint8 decimals_, uint32 observationFrequency_) PRICEv2(kernel_);
```

**Parameters**

| Name                    | Type     | Description                                             |
| ----------------------- | -------- | ------------------------------------------------------- |
| `kernel_`               | `Kernel` | Kernel address                                          |
| `decimals_`             | `uint8`  | Decimals that all prices will be returned with          |
| `observationFrequency_` | `uint32` | Frequency at which prices are stored for moving average |

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure virtual override(IVersioned, Module) returns (uint8 major, uint8 minor);
```

**Returns**

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| `major` | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| `minor` | `uint8` | - Minor version change retains backward-compatible interface.       |

### supportsInterface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual override returns (bool);
```

### getAssets

Provides a list of registered assets

Does not revert.

```solidity
function getAssets() external view override returns (address[] memory);
```

**Returns**

| Name     | Type        | Description                               |
| -------- | ----------- | ----------------------------------------- |
| `<none>` | `address[]` | assets The addresses of registered assets |

### getAssetData

Provides the configuration of a specific asset

Does not revert.

```solidity
function getAssetData(address asset_) external view override returns (Asset memory);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name     | Type    | Description                                       |
| -------- | ------- | ------------------------------------------------- |
| `<none>` | `Asset` | data The asset configuration as an `Asset` struct |

### isAssetApproved

Indicates whether `asset_` has been registered

Does not revert.

```solidity
function isAssetApproved(address asset_) external view override returns (bool);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name     | Type   | Description                            |
| -------- | ------ | -------------------------------------- |
| `<none>` | `bool` | approved Whether the asset is approved |

### registerNonContractAsset

Registers a non-contract asset

Will revert if:

- `asset_` is the zero address

- `asset_` is a contract

- `asset_` is already registered

```solidity
function registerNonContractAsset(address asset_) external override permissioned;
```

**Parameters**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `asset_` | `address` | The address of the asset to register |

### unregisterNonContractAsset

Unregisters a non-contract asset

Will revert if:

- `asset_` is the reserved unit of account

- `asset_` is not registered

- `asset_` still has an active PRICE configuration

```solidity
function unregisterNonContractAsset(address asset_) external override permissioned;
```

**Parameters**

| Name     | Type      | Description                            |
| -------- | --------- | -------------------------------------- |
| `asset_` | `address` | The address of the asset to unregister |

### \_isUnitOfAccount

Returns true if `asset_` is the reserved unit-of-account asset

Does not revert.

```solidity
function _isUnitOfAccount(address asset_) internal pure returns (bool);
```

### \_unitPrice

Returns the unit price scaled to PRICE decimals

Does not revert.

```solidity
function _unitPrice() internal view virtual returns (uint256);
```

### \_validateApprovedAsset

Reverts unless `asset_` is an approved asset

Will revert if:

- `asset_` is not approved

```solidity
function _validateApprovedAsset(address asset_) internal view;
```

### \_getLastObservationPrice

Returns the most recent stored observation for an asset

Will revert if:

- `asset_` does not store the moving average (and thus does not have stored observations)

```solidity
function _getLastObservationPrice(address asset_) internal view returns (uint256 price_, uint48 timestamp_);
```

**Parameters**

| Name     | Type      | Description       |
| -------- | --------- | ----------------- |
| `asset_` | `address` | The asset address |

**Returns**

| Name         | Type      | Description                                         |
| ------------ | --------- | --------------------------------------------------- |
| `price_`     | `uint256` | The most recent observation price                   |
| `timestamp_` | `uint48`  | The timestamp of the most recent stored observation |

### getPrice

Returns the current price of an asset in the system unit of account

Returns the CURRENT variant from feeds/strategy (plus MA where configured).

The reserved unit-of-account returns `10 ** decimals()`.

Will revert if:

- `asset_` is not approved

- No price could be determined

```solidity
function getPrice(address asset_) external view override returns (uint256);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `<none>` | `uint256` | price The USD price of the asset in the scale of `decimals` |

### getPrice

Returns the requested variant of the asset price in the system unit of account and the timestamp at which it was calculated

The reserved unit of account returns:

- `(10 ** decimals(), block.timestamp)` for `Variant.CURRENT`

- `(10 ** decimals(), block.timestamp)` for `Variant.LAST`

- reverts `PRICE_MovingAverageNotStored(asset_)` for `Variant.MOVINGAVERAGE`

Will revert if:

- `asset_` is not approved

- No price could be determined

- `variant_ == Variant.CURRENT` and a configured moving average is stale

- An invalid variant is requested

```solidity
function getPrice(address asset_, Variant variant_)
    public
    view
    override
    returns (uint256 _price, uint48 _timestamp);
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

### \_getFeedPrices

Gets the raw feed prices for an asset

```solidity
function _getFeedPrices(address asset_) internal view returns (uint256[] memory, bool);
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

**Returns**

| Name     | Type        | Description                                       |
| -------- | ----------- | ------------------------------------------------- |
| `<none>` | `uint256[]` | uint256[] Array of raw feed prices                |
| `<none>` | `bool`      | bool Flag indicating if all feeds were successful |

### \_aggregate

Aggregates an array of prices using the configured strategy

```solidity
function _aggregate(address asset_, uint256[] memory prices_) internal view returns (uint256);
```

**Parameters**

| Name      | Type        | Description                  |
| --------- | ----------- | ---------------------------- |
| `asset_`  | `address`   | The address of the asset     |
| `prices_` | `uint256[]` | Array of prices to aggregate |

**Returns**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `<none>` | `uint256` | uint256 The aggregated price |

### \_getInclusivePrices

Appends a moving average value to an array of prices

```solidity
function _getInclusivePrices(uint256[] memory prices_, uint256 movingAverage_)
    internal
    pure
    returns (uint256[] memory);
```

**Parameters**

| Name             | Type        | Description                    |
| ---------------- | ----------- | ------------------------------ |
| `prices_`        | `uint256[]` | Array of prices to append to   |
| `movingAverage_` | `uint256`   | Moving average value to append |

**Returns**

| Name     | Type        | Description                                                |
| -------- | ----------- | ---------------------------------------------------------- |
| `<none>` | `uint256[]` | uint256[] The array of prices including the moving average |

### \_validateMovingAverageStrategy

Validates both runtime input shapes for a moving-average strategy

The stored observation path must aggregate raw feed values only. The
CURRENT path must aggregate raw feed values plus a moving average. This
uses the raw observation value as a synthetic moving average to avoid
rejecting updates solely because the stored moving average is stale.
Assumes that the asset has useMovingAverage set to true.

```solidity
function _validateMovingAverageStrategy(address asset_) internal view returns (bool);
```

**Parameters**

| Name     | Type      | Description       |
| -------- | --------- | ----------------- |
| `asset_` | `address` | Asset to validate |

**Returns**

| Name     | Type   | Description                                       |
| -------- | ------ | ------------------------------------------------- |
| `<none>` | `bool` | bool Flag indicating if all feeds were successful |

### \_getCurrentPrice

Gets the current price of the asset

This function follows this logic:

- Get the price from each feed

- If using the moving average, append the moving average to the results

- If there is only one price and it is not zero, return it

- Process the prices with the configured strategy

Will revert if:

- The resulting price is zero

- The configured strategy cannot aggregate the prices

- The moving average is used, but is stale

```solidity
function _getCurrentPrice(address asset_, bool includeMovingAverage_)
    internal
    view
    returns (uint256, uint48, bool);
```

**Parameters**

| Name                    | Type      | Description                                                                        |
| ----------------------- | --------- | ---------------------------------------------------------------------------------- |
| `asset_`                | `address` | Asset to get the price of                                                          |
| `includeMovingAverage_` | `bool`    | Flag to indicate if the moving average should be included in the price calculation |

**Returns**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `<none>` | `uint256` | uint256 The aggregated price                      |
| `<none>` | `uint48`  | uint48 The current block timestamp                |
| `<none>` | `bool`    | bool Flag indicating if all feeds were successful |

### \_revertIfMovingAverageStale

Reverts if the moving average observation is stale

```solidity
function _revertIfMovingAverageStale(address asset_, uint48 lastObservationTime_) internal view;
```

**Parameters**

| Name                   | Type      | Description                                      |
| ---------------------- | --------- | ------------------------------------------------ |
| `asset_`               | `address` | The asset address used in the revert payload     |
| `lastObservationTime_` | `uint48`  | Last stored moving-average observation timestamp |

### getPriceIn

Returns the current price of an asset in terms of the quote asset

Returns the pair price from CURRENT per-asset values.

If either side is the unit of account, that side resolves to `10 ** decimals()`.

Will revert if:

- `asset_` is not approved (and not the unit of account)

- `quote_` is not approved (and not the unit of account)

- No price could be determined for either non-unit asset

```solidity
function getPriceIn(address asset_, address quote_) external view override returns (uint256);
```

**Parameters**

| Name     | Type      | Description                                                         |
| -------- | --------- | ------------------------------------------------------------------- |
| `asset_` | `address` | The address of the asset being priced                               |
| `quote_` | `address` | The address of the quote asset that the price will be calculated in |

**Returns**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `<none>` | `uint256` | price The price of the asset in units of `quote_` |

### getPriceIn

Returns the requested variant of the asset price in terms of the quote asset

Derives the pair quote from per-asset variants.

Reverts if:

- `variant_` is invalid

- `asset_` is not approved (and not the unit of account)

- `quote_` is not approved (and not the unit of account)

- The requested variant is unavailable for either side

(for example `Variant.LAST`/`Variant.MOVINGAVERAGE` without stored observations)

- A price cannot be determined for either side

```solidity
function getPriceIn(address asset_, address quote_, Variant variant_)
    external
    view
    override
    returns (uint256, uint48);
```

**Parameters**

| Name       | Type      | Description                                                         |
| ---------- | --------- | ------------------------------------------------------------------- |
| `asset_`   | `address` | The address of the asset being priced                               |
| `quote_`   | `address` | The address of the quote asset that the price will be calculated in |
| `variant_` | `Variant` | The variant of the price to return                                  |

**Returns**

| Name     | Type      | Description                                                 |
| -------- | --------- | ----------------------------------------------------------- |
| `<none>` | `uint256` | _price The price of the asset in units of `quote_`          |
| `<none>` | `uint48`  | \_timestamp The timestamp at which the price was calculated |

### storeObservation

Stores a price observation for moving average calculation

Implements the following logic:

- Get the current price using `_getCurrentPrice()`

- Store the price in the asset's observation array at the index corresponding to the asset's value of `nextObsIndex`

- Updates the asset's `lastObservationTime` to the current block timestamp

- Increments the asset's `nextObsIndex` by 1, wrapping around to 0 if necessary

- If the asset is configured to store the moving average, update the `cumulativeObs` value subtracting the previous value and adding the new one

- Emit a `PriceStored` event

Will revert if:

- The asset is not approved

- The asset does not store moving average

- The caller is not permissioned

- The price was not able to be determined

Reentrancy note: feed/strategy resolution is done via `staticcall`, so callbacks

cannot perform state-changing reentry.

This function enforces an implementation-defined earliest allowed timestamp for each

asset observation write. The current implementation uses `lastObservationTime + 1`,

which prevents same-block double writes.

It does not enforce a larger minimum frequency between observations.

Calling policies are responsible for cadence/epoch scheduling.

```solidity
function storeObservation(address asset_) public override permissioned;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### \_storeObservation

Stores an observation for an asset

Will revert if:

- The asset is not approved

- The moving average is not stored for the asset

- Getting the prices fails

- Aggregating the prices fails

- The observation timestamp is before the implementation-defined earliest allowed time

- Cadence beyond same-block writes is not enforced in this module

```solidity
function _storeObservation(address asset_) internal;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### storeObservations

Calculates and stores the current price of assets that track a moving average

Implements the following logic:

- Iterate over all assets

- Ignores assets that do not store the moving average

- Store the price for each asset using `storeObservation()`

Reverts if:

- The caller is not permissioned

- Observation storage fails for any configured moving-average asset

Reentrancy note: delegates to `storeObservation()`, which only reaches external

price providers via `staticcall`.

This function enforces an implementation-defined earliest allowed timestamp for each

asset observation write. The current implementation uses `lastObservationTime + 1`,

which prevents same-block double writes.

It does not enforce a larger minimum frequency between observations.

Calling policies are responsible for cadence/epoch scheduling.

```solidity
function storeObservations() public override permissioned;
```

### \_validateAssetConfiguration

Validates asset configuration for feeds, strategy, and moving average

Will revert if:

- Moving average is used but not stored

- Multiple feeds exist but no strategy is configured

- Only one feed exists but a strategy is configured

```solidity
function _validateAssetConfiguration(
    address asset_,
    Component memory strategy_,
    uint256 feedCount_,
    bool useMovingAverage_,
    bool storeMovingAverage_
) internal pure;
```

**Parameters**

| Name                  | Type        | Description                                             |
| --------------------- | ----------- | ------------------------------------------------------- |
| `asset_`              | `address`   | Asset address for error reporting                       |
| `strategy_`           | `Component` | Strategy component configuration                        |
| `feedCount_`          | `uint256`   | Number of price feeds configured                        |
| `useMovingAverage_`   | `bool`      | Whether the moving average is used in price calculation |
| `storeMovingAverage_` | `bool`      | Whether the moving average is stored                    |

### \_validateAssetPriceFeeds

Validates the price feed components for an asset configuration

Checks that at least one feed is supplied, each feed target is installed,
and no exact feed component is duplicated.

Assumes feed components are immutable configuration data. This helper does
not call feed selectors or validate returned prices; callers that mutate
configuration must validate price resolution after storing the candidate
configuration.

Will revert if:

- No feeds are supplied
- Any feed target submodule is not installed
- Any feed component is duplicated

```solidity
function _validateAssetPriceFeeds(address asset_, Component[] memory feeds_) internal view;
```

**Parameters**

| Name     | Type          | Description                       |
| -------- | ------------- | --------------------------------- |
| `asset_` | `address`     | Asset address for error reporting |
| `feeds_` | `Component[]` | Candidate price feed components   |

### \_validateAssetPriceStrategy

Validates the price strategy component for an asset configuration

Treats a zero target as "no strategy" and otherwise checks that the
strategy target submodule is installed.

Assumes selector and params compatibility is proven when the configured
strategy is used to resolve a price. This helper only validates the
PRICE-owned invariant that configured strategy targets are installed.

Will revert if:

- A non-zero strategy target submodule is not installed

```solidity
function _validateAssetPriceStrategy(address asset_, Component memory strategy_) internal view;
```

**Parameters**

| Name        | Type        | Description                        |
| ----------- | ----------- | ---------------------------------- |
| `asset_`    | `address`   | Asset address for error reporting  |
| `strategy_` | `Component` | Candidate price strategy component |

### \_validateAssetMovingAverage

Validates moving-average storage parameters

Checks that disabled moving-average storage has no
residual moving-average parameters, and that enabled
storage has a valid duration, observation count,
timestamp, and non-zero observations.

Assumes `_observationFrequency` was validated by the
constructor and is non-zero. Observations are assumed to
be PRICE-scaled prices; this helper only rejects zero
observations and does not validate economic plausibility.

Will revert if:

- Moving-average storage is disabled but observations,
  duration, or last observation time are non-zero
- Last observation time is in the future
- Duration is zero or not divisible by observation frequency
- Observation count does not match duration/frequency
- Fewer than two observations are supplied
- Any observation is zero

```solidity
function _validateAssetMovingAverage(
    address asset_,
    bool storeMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_
) internal view;
```

**Parameters**

| Name                     | Type        | Description                                  |
| ------------------------ | ----------- | -------------------------------------------- |
| `asset_`                 | `address`   | Asset address for error reporting            |
| `storeMovingAverage_`    | `bool`      | Whether moving-average storage is enabled    |
| `movingAverageDuration_` | `uint32`    | Candidate moving-average duration in seconds |
| `lastObservationTime_`   | `uint48`    | Candidate last observation timestamp         |
| `observations_`          | `uint256[]` | Candidate moving-average observations        |

### \_validateAddAsset

Validates parameters for adding a new asset

Performs the reusable queue-time and mutation-time
validation for `addAsset()` and `validateAddAsset()`.

Assumes the caller will validate live price resolution
after writing the candidate configuration. This helper
validates structural PRICE invariants only; it does not
call feeds or strategies. It therefore does not validate
feed selector/params compatibility, strategy selector/params
compatibility, or whether a feed/strategy/moving-average
combination can resolve a non-zero price.

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is neither a contract nor a registered
  non-contract asset
- The asset is already approved
- Feed/strategy/moving-average configuration is invalid
- Any configured submodule target is not installed

```solidity
function _validateAddAsset(
    address asset_,
    bool storeMovingAverage_,
    bool useMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_,
    Component memory strategy_,
    Component[] memory feeds_
) internal view;
```

**Parameters**

| Name                     | Type          | Description                                              |
| ------------------------ | ------------- | -------------------------------------------------------- |
| `asset_`                 | `address`     | Candidate asset address                                  |
| `storeMovingAverage_`    | `bool`        | Whether moving-average storage is enabled                |
| `useMovingAverage_`      | `bool`        | Whether the moving average is included in strategy input |
| `movingAverageDuration_` | `uint32`      | Candidate moving-average duration in seconds             |
| `lastObservationTime_`   | `uint48`      | Candidate last observation timestamp                     |
| `observations_`          | `uint256[]`   | Candidate moving-average observations                    |
| `strategy_`              | `Component`   | Candidate price strategy component                       |
| `feeds_`                 | `Component[]` | Candidate price feed components                          |

### \_validateRemoveAsset

Validates parameters for removing an asset

Performs the reusable queue-time and mutation-time validation for
`removeAsset()` and `validateRemoveAsset()`.

Assumes removal deletes the complete asset configuration before the asset
can be reused. This helper does not inspect feed, strategy, or observation
data because approval status is the PRICE source of truth for an active
asset configuration.

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is not approved

```solidity
function _validateRemoveAsset(address asset_) internal view;
```

**Parameters**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `asset_` | `address` | Candidate asset address |

### \_validateUpdateAsset

Validates parameters for updating an existing asset

Performs the reusable queue-time and mutation-time validation for
`updateAsset()` and `validateUpdateAsset()`.

Builds the final configuration from the current stored asset data plus
flagged updates, then validates that final configuration atomically.

Assumes unflagged stored components were validated when they were added or
previously updated. This helper validates installed submodules only for
components supplied in `params_`; stored components are trusted as current
PRICE state.

Assumes the caller will validate live price resolution after writing the
candidate configuration. This helper validates structural PRICE invariants
only; it does not call feeds or strategies. It therefore does not validate
feed selector/params compatibility, strategy selector/params compatibility,
or whether the final feed/strategy/moving-average combination can resolve a
non-zero price.

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is neither a contract nor a registered non-contract asset
- No update flags are set
- The asset is not approved
- The final feed/strategy/moving-average configuration is invalid
- Any newly supplied submodule target is not installed

```solidity
function _validateUpdateAsset(address asset_, UpdateAssetParams memory params_) internal view;
```

**Parameters**

| Name      | Type                | Description                 |
| --------- | ------------------- | --------------------------- |
| `asset_`  | `address`           | Asset address to update     |
| `params_` | `UpdateAssetParams` | Candidate update parameters |

### validateAddAsset

Validates parameters for adding a new asset definition

Performs structural validation only. This function does not call configured
price feeds or strategies, and therefore does not prove that the supplied
feed/strategy/moving-average configuration can resolve a non-zero price.

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
) external view override;
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

### validateRemoveAsset

Validates parameters for removing an asset definition

Does not mutate state.

```solidity
function validateRemoveAsset(address asset_) external view override;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### validateUpdateAsset

Validates parameters for updating an asset configuration

Performs structural validation only. This function does not call configured
price feeds or strategies, and therefore does not prove that the final
feed/strategy/moving-average configuration can resolve a non-zero price.

```solidity
function validateUpdateAsset(address asset_, UpdateAssetParams memory params_) external view override;
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
function validateInstallSubmodule(address submodule_) external view override;
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `submodule_` | `address` | The address of the submodule to install |

### validateUpgradeSubmodule

Validates parameters for upgrading a PRICE submodule

Does not mutate state.

```solidity
function validateUpgradeSubmodule(address submodule_) external view override;
```

**Parameters**

| Name         | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `submodule_` | `address` | The address of the submodule to upgrade to |

### validateExecOnSubmodule

Validates parameters for executing a call on a PRICE submodule

Does not mutate state.

```solidity
function validateExecOnSubmodule(bytes20 subKeycode_) external view override;
```

**Parameters**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `subKeycode_` | `bytes20` | The 20-byte SubKeycode of the submodule to call |

### addAsset

Adds a new asset definition

Implements the following logic:

- Performs basic checks on the parameters

- Sets the price strategy using `_updateAssetPriceStrategy()`

- Sets the price feeds using `_updateAssetPriceFeeds()`

- Sets the moving average data using `_updateAssetMovingAverage()`

- Validates the configuration using `_getCurrentPrice()` or, when using a moving average,

both the raw observation and MA-inclusive CURRENT strategy input shapes

- Adds the asset to the `assets` array and marks it as approved

When `useMovingAverage_` is true, validation appends a synthetic moving-average value derived from the current raw feed observation.
If the last stored observation is out of consensus, call `storeObservation(asset_)` after adding the asset before consumers rely on CURRENT price reads.

Will revert if:

- The caller is not permissioned

- `asset_` is neither a contract nor a registered non-contract asset

- `asset_` is already approved

- `asset_` is the reserved unit-of-account address

- The moving average is being used, but not stored

- An empty strategy was specified, but the number of feeds requires a strategy

- The call to get the current price of any feed fails

Reentrancy note: feed/strategy validation uses `staticcall`, so callbacks cannot
perform state-changing reentry.

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
) external override permissioned;
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

Will revert if:

- `asset_` is the reserved unit-of-account address

- `asset_` is not approved

- The caller is not permissioned

Reentrancy note: this function does not make external calls.

```solidity
function removeAsset(address asset_) external override permissioned;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `asset_` | `address` | The address of the asset |

### \_updateAssetPriceFeeds

Updates the price feeds for the asset

Implements the following logic:

- Sets the price feeds for the asset

Assumes the caller has already validated `feeds_`.

```solidity
function _updateAssetPriceFeeds(address asset_, Component[] memory feeds_) internal;
```

**Parameters**

| Name     | Type          | Description                         |
| -------- | ------------- | ----------------------------------- |
| `asset_` | `address`     | Asset to update the price feeds for |
| `feeds_` | `Component[]` | Array of price feed components      |

### \_updateAssetPriceStrategy

Updates the price strategy for the asset

Implements the following logic:

- Sets the price strategy for the asset

- Sets the `useMovingAverage` flag for the asset

Assumes the caller has already validated `strategy_`.

```solidity
function _updateAssetPriceStrategy(address asset_, Component memory strategy_, bool useMovingAverage_) internal;
```

**Parameters**

| Name                | Type        | Description                                                           |
| ------------------- | ----------- | --------------------------------------------------------------------- |
| `asset_`            | `address`   | Asset to update the price strategy for                                |
| `strategy_`         | `Component` | Price strategy component                                              |
| `useMovingAverage_` | `bool`      | Flag to indicate if the moving average should be used in the strategy |

### \_updateAssetMovingAverage

Updates the moving average data for the asset

Implements the following logic:

- Removes existing moving average data

- Sets the moving average data for the asset

- If `storeMovingAverage_` is false, clears moving-average state

Assumes the caller has already validated moving-average
duration, timestamps, and observations.

```solidity
function _updateAssetMovingAverage(
    address asset_,
    bool storeMovingAverage_,
    uint32 movingAverageDuration_,
    uint48 lastObservationTime_,
    uint256[] memory observations_
) internal;
```

**Parameters**

| Name                     | Type        | Description                                             |
| ------------------------ | ----------- | ------------------------------------------------------- |
| `asset_`                 | `address`   | Asset to update the moving average data for             |
| `storeMovingAverage_`    | `bool`      | Flag to indicate if the moving average should be stored |
| `movingAverageDuration_` | `uint32`    | Duration of the moving average                          |
| `lastObservationTime_`   | `uint48`    | Timestamp of the last observation                       |
| `observations_`          | `uint256[]` | Array of observations to store                          |

### updateAsset

Updates an asset configuration atomically

Implements the following logic:

- Validates that at least one update flag is true

- Validates that asset is approved

- Calculates final state (before any updates)

- Validates the final configuration atomically

- Validates submodules are installed for updated components

- Calls update functions for flagged updates

- Validates final configuration with `_getCurrentPrice()` or, when using a moving average,

both the raw observation and MA-inclusive CURRENT strategy input shapes

- Emits events based on which updates occurred

When the final configuration uses the moving average, validation appends a synthetic moving-average value derived from the current raw feed observation, in order to allow for re-configuration when the last observation is stale or out of consensus.
If the last stored observation is stale or out of consensus, call `storeObservation(asset_)` after updating the asset before consumers rely on CURRENT price reads.

Will revert if:

- All update flags are false (no-op)

- `asset_` is the reserved unit-of-account address

- `asset_` is not approved

- The final configuration is invalid

- Any updated submodule is not installed

Reentrancy note: any external feed/strategy resolution in validation uses
`staticcall`, so callbacks cannot perform state-changing reentry.

```solidity
function updateAsset(address asset_, UpdateAssetParams memory params_) external virtual override permissioned;
```

**Parameters**

| Name      | Type                | Description                        |
| --------- | ------------------- | ---------------------------------- |
| `asset_`  | `address`           | The address of the asset to update |
| `params_` | `UpdateAssetParams` | Update parameters with flags       |
