# OlympusPricev2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/OlympusPrice.v2.sol)

**Inherits:** [PRICEv2](/main/contracts/docs/src/modules/PRICE/PRICE.v2.sol/abstract.PRICEv2), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** OlympusPriceV2

**Author:** Oighty

Provides current and historical prices for assets

## Functions

<a id="constructor-kernel-uint8-uint32"></a>

### constructor

Constructor to create OlympusPrice V2

<i>

The constructor reverts if:

</i>

<i>

- `observationFrequency_` is invalid (zero)

</i>

```solidity
constructor(Kernel kernel_, uint8 decimals_, uint32 observationFrequency_) PRICEv2(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | Kernel address |
| decimals_ | `uint8` | Decimals that all prices will be returned with |
| observationFrequency_ | `uint32` | Frequency at which prices are stored for moving average |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION()
        external
        pure
        virtual
        override(IVersioned, Module)
        returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="getassets"></a>

### getAssets

Provides a list of registered assets

<i>

Does not revert.

</i>

```solidity
function getAssets() external view override returns (address[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` | The addresses of registered assets |

<a id="getassetdata-address"></a>

### getAssetData

Provides the configuration of a specific asset

<i>

Does not revert.

</i>

```solidity
function getAssetData(address asset_) external view override returns (Asset memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Asset` | The asset configuration as an `Asset` struct |

<a id="isassetapproved-address"></a>

### isAssetApproved

Indicates whether `asset_` has been registered

<i>

Does not revert.

</i>

```solidity
function isAssetApproved(address asset_) external view override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | Whether the asset is approved |

<a id="registernoncontractasset-address"></a>

### registerNonContractAsset

Registers a non-contract asset

<i>

Will revert if:

</i>

<i>

- `asset_` is the zero address

</i>

<i>

- `asset_` is a contract

</i>

<i>

- `asset_` is already registered

</i>

```solidity
function registerNonContractAsset(address asset_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to register |

<a id="unregisternoncontractasset-address"></a>

### unregisterNonContractAsset

Unregisters a non-contract asset

<i>

Will revert if:

</i>

<i>

- `asset_` is the reserved unit of account

</i>

<i>

- `asset_` is not registered

</i>

<i>

- `asset_` still has an active PRICE configuration

</i>

```solidity
function unregisterNonContractAsset(address asset_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to unregister |

<a id="_isunitofaccount-address"></a>

### _isUnitOfAccount

Returns true if `asset_` is the reserved unit-of-account asset

<i>

Does not revert.

</i>

```solidity
function _isUnitOfAccount(address asset_) internal pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_unitprice"></a>

### _unitPrice

Returns the unit price scaled to PRICE decimals

<i>

Does not revert.

</i>

```solidity
function _unitPrice() internal view virtual returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="_validateapprovedasset-address"></a>

### _validateApprovedAsset

Reverts unless `asset_` is an approved asset

<i>

Will revert if:

</i>

<i>

- `asset_` is not approved

</i>

```solidity
function _validateApprovedAsset(address asset_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` |  |

<a id="_getlastobservationprice-address"></a>

### _getLastObservationPrice

Returns the most recent stored observation for an asset

<i>

Will revert if:

</i>

<i>

- `asset_` does not store the moving average (and thus does not have stored observations)

</i>

```solidity
function _getLastObservationPrice(
        address asset_
    ) internal view returns (uint256 price_, uint48 timestamp_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The asset address |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price_ | `uint256` |          The most recent observation price |
| timestamp_ | `uint48` |      The timestamp of the most recent stored observation |

<a id="getprice-address"></a>

### getPrice

Returns the current price of an asset in the system unit of account

<i>

Returns the CURRENT variant from feeds/strategy (plus MA where configured).

</i>

<i>

The reserved unit-of-account returns `10 ** decimals()`.

</i>

<i>

Will revert if:

</i>

<i>

- `asset_` is not approved

</i>

<i>

- No price could be determined

</i>

```solidity
function getPrice(address asset_) external view override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The USD price of the asset in the scale of `decimals` |

<a id="getprice-address-variant"></a>

### getPrice

Returns the requested variant of the asset price in the system unit of account and the timestamp at which it was calculated

<i>

The reserved unit of account returns:

</i>

<i>

- `(10 ** decimals(), block.timestamp)` for `Variant.CURRENT`

</i>

<i>

- `(10 ** decimals(), block.timestamp)` for `Variant.LAST`

</i>

<i>

- reverts `PRICE_MovingAverageNotStored(asset_)` for `Variant.MOVINGAVERAGE`

</i>

<i>

Will revert if:

</i>

<i>

- `asset_` is not approved

</i>

<i>

- No price could be determined

</i>

<i>

- `variant_ == Variant.CURRENT` and a configured moving average is stale

</i>

<i>

- An invalid variant is requested

</i>

```solidity
function getPrice(
        address asset_,
        Variant variant_
    ) public view override returns (uint256 _price, uint48 _timestamp);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| variant_ | `Variant` | The variant of the price to return |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _price | `uint256` | The USD price of the asset in the scale of `decimals` |
| _timestamp | `uint48` | The timestamp at which the price was calculated |

<a id="_getfeedprices-address"></a>

### _getFeedPrices

Gets the raw feed prices for an asset

```solidity
function _getFeedPrices(address asset_) internal view returns (uint256[] memory, bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256[]` | uint256[]   Array of raw feed prices |
| &lt;none&gt; | `bool` | bool        Flag indicating if all feeds were successful |

<a id="_aggregate-address-uint256"></a>

### _aggregate

Aggregates an array of prices using the configured strategy

```solidity
function _aggregate(address asset_, uint256[] memory prices_) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| prices_ | `uint256[]` | Array of prices to aggregate |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256     The aggregated price |

<a id="_getinclusiveprices-uint256-uint256"></a>

### _getInclusivePrices

Appends a moving average value to an array of prices

```solidity
function _getInclusivePrices(
        uint256[] memory prices_,
        uint256 movingAverage_
    ) internal pure returns (uint256[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| prices_ | `uint256[]` | Array of prices to append to |
| movingAverage_ | `uint256` | Moving average value to append |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256[]` | uint256[]   The array of prices including the moving average |

<a id="_validatemovingaveragestrategy-address"></a>

### _validateMovingAverageStrategy

Validates both runtime input shapes for a moving-average strategy

<i>

The stored observation path must aggregate raw feed values only. The
CURRENT path must aggregate raw feed values plus a moving average. This
uses the raw observation value as a synthetic moving average to avoid
rejecting updates solely because the stored moving average is stale.

</i>

Assumes that the asset has useMovingAverage set to true.

```solidity
function _validateMovingAverageStrategy(address asset_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset to validate |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool        Flag indicating if all feeds were successful |

<a id="_getcurrentprice-address-bool"></a>

### _getCurrentPrice

Gets the current price of the asset

<i>

This function follows this logic:

</i>

<i>

- Get the price from each feed

</i>

<i>

- If using the moving average, append the moving average to the results

</i>

<i>

- If there is only one price and it is not zero, return it

</i>

<i>

- Process the prices with the configured strategy

</i>

<i>

Will revert if:

</i>

<i>

- The resulting price is zero

</i>

<i>

- The configured strategy cannot aggregate the prices

</i>

<i>

- The moving average is used, but is stale

</i>

```solidity
function _getCurrentPrice(
        address asset_,
        bool includeMovingAverage_
    ) internal view returns (uint256, uint48, bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset to get the price of |
| includeMovingAverage_ | `bool` | Flag to indicate if the moving average should be included in the price calculation |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256                 The aggregated price |
| &lt;none&gt; | `uint48` | uint48                  The current block timestamp |
| &lt;none&gt; | `bool` | bool                    Flag indicating if all feeds were successful |

<a id="_revertifmovingaveragestale-address-uint48"></a>

### _revertIfMovingAverageStale

Reverts if the moving average observation is stale

```solidity
function _revertIfMovingAverageStale(
        address asset_,
        uint48 lastObservationTime_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The asset address used in the revert payload |
| lastObservationTime_ | `uint48` | Last stored moving-average observation timestamp |

<a id="getpricein-address-address"></a>

### getPriceIn

Returns the current price of an asset in terms of the quote asset

<i>

Returns the pair price from CURRENT per-asset values.

</i>

<i>

If either side is the unit of account, that side resolves to `10 ** decimals()`.

</i>

<i>

Will revert if:

</i>

<i>

- `asset_` is not approved (and not the unit of account)

</i>

<i>

- `quote_` is not approved (and not the unit of account)

</i>

<i>

- No price could be determined for either non-unit asset

</i>

```solidity
function getPriceIn(address asset_, address quote_) external view override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset being priced |
| quote_ | `address` | The address of the quote asset that the price will be calculated in |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The price of the asset in units of `quote_` |

<a id="getpricein-address-address-variant"></a>

### getPriceIn

Returns the requested variant of the asset price in terms of the quote asset

<i>

Derives the pair quote from per-asset variants.

</i>

<i>

Reverts if:

</i>

<i>

- `variant_` is invalid

</i>

<i>

- `asset_` is not approved (and not the unit of account)

</i>

<i>

- `quote_` is not approved (and not the unit of account)

</i>

<i>

- The requested variant is unavailable for either side

</i>

<i>

(for example `Variant.LAST`/`Variant.MOVINGAVERAGE` without stored observations)

</i>

<i>

- A price cannot be determined for either side

</i>

```solidity
function getPriceIn(
        address asset_,
        address quote_,
        Variant variant_
    ) external view override returns (uint256, uint48);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset being priced |
| quote_ | `address` | The address of the quote asset that the price will be calculated in |
| variant_ | `Variant` | The variant of the price to return |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The price of the asset in units of `quote_` |
| &lt;none&gt; | `uint48` | The timestamp at which the price was calculated |

<a id="storeobservation-address"></a>

### storeObservation

Stores a price observation for moving average calculation

<i>

Implements the following logic:

</i>

<i>

- Get the current price using `_getCurrentPrice()`

</i>

<i>

- Store the price in the asset's observation array at the index corresponding to the asset's value of `nextObsIndex`

</i>

<i>

- Updates the asset's `lastObservationTime` to the current block timestamp

</i>

<i>

- Increments the asset's `nextObsIndex` by 1, wrapping around to 0 if necessary

</i>

<i>

- If the asset is configured to store the moving average, update the `cumulativeObs` value subtracting the previous value and adding the new one

</i>

<i>

- Emit a `PriceStored` event

</i>

<i>

Will revert if:

</i>

<i>

- The asset is not approved

</i>

<i>

- The asset does not store moving average

</i>

<i>

- The caller is not permissioned

</i>

<i>

- The price was not able to be determined

</i>

<i>

Reentrancy note: feed/strategy resolution is done via `staticcall`, so callbacks

</i>

<i>

cannot perform state-changing reentry.

</i>

<i>

This function enforces an implementation-defined earliest allowed timestamp for each

</i>

<i>

asset observation write. The current implementation uses `lastObservationTime + 1`,

</i>

<i>

which prevents same-block double writes.

</i>

<i>

It does not enforce a larger minimum frequency between observations.

</i>

<i>

Calling policies are responsible for cadence/epoch scheduling.

</i>

```solidity
function storeObservation(address asset_) public override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

<a id="_storeobservation-address"></a>

### _storeObservation

Stores an observation for an asset

<i>

Will revert if:

</i>

<i>

- The asset is not approved

</i>

<i>

- The moving average is not stored for the asset

</i>

<i>

- Getting the prices fails

</i>

<i>

- Aggregating the prices fails

</i>

<i>

- The observation timestamp is before the implementation-defined earliest allowed time

</i>

<i>

- Cadence beyond same-block writes is not enforced in this module

</i>

```solidity
function _storeObservation(address asset_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

<a id="storeobservations"></a>

### storeObservations

Calculates and stores the current price of assets that track a moving average

<i>

Implements the following logic:

</i>

<i>

- Iterate over all assets

</i>

<i>

- Ignores assets that do not store the moving average

</i>

<i>

- Store the price for each asset using `storeObservation()`

</i>

<i>

Reverts if:

</i>

<i>

- The caller is not permissioned

</i>

<i>

- Observation storage fails for any configured moving-average asset

</i>

<i>

Reentrancy note: delegates to `storeObservation()`, which only reaches external

</i>

<i>

price providers via `staticcall`.

</i>

<i>

This function enforces an implementation-defined earliest allowed timestamp for each

</i>

<i>

asset observation write. The current implementation uses `lastObservationTime + 1`,

</i>

<i>

which prevents same-block double writes.

</i>

<i>

It does not enforce a larger minimum frequency between observations.

</i>

<i>

Calling policies are responsible for cadence/epoch scheduling.

</i>

```solidity
function storeObservations() public override permissioned;
```

<a id="_validateassetconfiguration-address-component-uint256-bool-bool"></a>

### _validateAssetConfiguration

Validates asset configuration for feeds, strategy, and moving average

<i>

Will revert if:

</i>

<i>

- Moving average is used but not stored

</i>

<i>

- Multiple feeds exist but no strategy is configured

</i>

<i>

- Only one feed exists but a strategy is configured

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset address for error reporting |
| strategy_ | `Component` | Strategy component configuration |
| feedCount_ | `uint256` | Number of price feeds configured |
| useMovingAverage_ | `bool` | Whether the moving average is used in price calculation |
| storeMovingAverage_ | `bool` | Whether the moving average is stored |

<a id="_validateassetpricefeeds-address-component"></a>

### _validateAssetPriceFeeds

Validates the price feed components for an asset configuration

<i>

Checks that at least one feed is supplied, each feed target is installed,
and no exact feed component is duplicated.

</i>

<i>

Assumes feed components are immutable configuration data. This helper does
not call feed selectors or validate returned prices; callers that mutate
configuration must validate price resolution after storing the candidate
configuration.

</i>

<i>

Will revert if:

- No feeds are supplied
- Any feed target submodule is not installed
- Any feed component is duplicated

</i>

```solidity
function _validateAssetPriceFeeds(address asset_, Component[] memory feeds_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset address for error reporting |
| feeds_ | `Component[]` | Candidate price feed components |

<a id="_validateassetpricestrategy-address-component"></a>

### _validateAssetPriceStrategy

Validates the price strategy component for an asset configuration

<i>

Treats a zero target as "no strategy" and otherwise checks that the
strategy target submodule is installed.

</i>

<i>

Assumes selector and params compatibility is proven when the configured
strategy is used to resolve a price. This helper only validates the
PRICE-owned invariant that configured strategy targets are installed.

</i>

<i>

Will revert if:

- A non-zero strategy target submodule is not installed

</i>

```solidity
function _validateAssetPriceStrategy(address asset_, Component memory strategy_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset address for error reporting |
| strategy_ | `Component` | Candidate price strategy component |

<a id="_validateassetmovingaverage-address-bool-uint32-uint48-uint256"></a>

### _validateAssetMovingAverage

Validates moving-average storage parameters

<i>

Checks that disabled moving-average storage has no
residual moving-average parameters, and that enabled
storage has a valid duration, observation count,
timestamp, and non-zero observations.

</i>

<i>

Assumes `_observationFrequency` was validated by the
constructor and is non-zero. Observations are assumed to
be PRICE-scaled prices; this helper only rejects zero
observations and does not validate economic plausibility.

</i>

<i>

Will revert if:

- Moving-average storage is disabled but observations,
duration, or last observation time are non-zero
- Last observation time is in the future
- Duration is zero or not divisible by observation frequency
- Observation count does not match duration/frequency
- Fewer than two observations are supplied
- Any observation is zero

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset address for error reporting |
| storeMovingAverage_ | `bool` | Whether moving-average storage is enabled |
| movingAverageDuration_ | `uint32` | Candidate moving-average duration in seconds |
| lastObservationTime_ | `uint48` | Candidate last observation timestamp |
| observations_ | `uint256[]` | Candidate moving-average observations |

<a id="_validateaddasset-address-bool-bool-uint32-uint48-uint256-component-component"></a>

### _validateAddAsset

Validates parameters for adding a new asset

<i>

Performs the reusable queue-time and mutation-time
validation for `addAsset()` and `validateAddAsset()`.

</i>

<i>

Assumes the caller will validate live price resolution
after writing the candidate configuration. This helper
validates structural PRICE invariants only; it does not
call feeds or strategies. It therefore does not validate
feed selector/params compatibility, strategy selector/params
compatibility, or whether a feed/strategy/moving-average
combination can resolve a non-zero price.

</i>

<i>

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is neither a contract nor a registered
non-contract asset
- The asset is already approved
- Feed/strategy/moving-average configuration is invalid
- Any configured submodule target is not installed

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Candidate asset address |
| storeMovingAverage_ | `bool` | Whether moving-average storage is enabled |
| useMovingAverage_ | `bool` | Whether the moving average is included in strategy input |
| movingAverageDuration_ | `uint32` | Candidate moving-average duration in seconds |
| lastObservationTime_ | `uint48` | Candidate last observation timestamp |
| observations_ | `uint256[]` | Candidate moving-average observations |
| strategy_ | `Component` | Candidate price strategy component |
| feeds_ | `Component[]` | Candidate price feed components |

<a id="_validateremoveasset-address"></a>

### _validateRemoveAsset

Validates parameters for removing an asset

<i>

Performs the reusable queue-time and mutation-time validation for
`removeAsset()` and `validateRemoveAsset()`.

</i>

<i>

Assumes removal deletes the complete asset configuration before the asset
can be reused. This helper does not inspect feed, strategy, or observation
data because approval status is the PRICE source of truth for an active
asset configuration.

</i>

<i>

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is not approved

</i>

```solidity
function _validateRemoveAsset(address asset_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Candidate asset address |

<a id="_validateupdateasset-address-updateassetparams"></a>

### _validateUpdateAsset

Validates parameters for updating an existing asset

<i>

Performs the reusable queue-time and mutation-time validation for
`updateAsset()` and `validateUpdateAsset()`.

</i>

<i>

Builds the final configuration from the current stored asset data plus
flagged updates, then validates that final configuration atomically.

</i>

<i>

Assumes unflagged stored components were validated when they were added or
previously updated. This helper validates installed submodules only for
components supplied in `params_`; stored components are trusted as current
PRICE state.

</i>

<i>

Assumes the caller will validate live price resolution after writing the
candidate configuration. This helper validates structural PRICE invariants
only; it does not call feeds or strategies. It therefore does not validate
feed selector/params compatibility, strategy selector/params compatibility,
or whether the final feed/strategy/moving-average combination can resolve a
non-zero price.

</i>

<i>

Will revert if:

- The asset is the reserved unit-of-account address
- The asset is neither a contract nor a registered non-contract asset
- No update flags are set
- The asset is not approved
- The final feed/strategy/moving-average configuration is invalid
- Any newly supplied submodule target is not installed

</i>

```solidity
function _validateUpdateAsset(address asset_, UpdateAssetParams memory params_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset address to update |
| params_ | `UpdateAssetParams` | Candidate update parameters |

<a id="validateaddasset-address-bool-bool-uint32-uint48-uint256-component-component"></a>

### validateAddAsset

Validates parameters for adding a new asset definition

<i>

Performs structural validation only. This function does not call configured
price feeds or strategies, and therefore does not prove that the supplied
feed/strategy/moving-average configuration can resolve a non-zero price.

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| storeMovingAverage_ | `bool` | Whether the moving average should be stored periodically |
| useMovingAverage_ | `bool` | Whether the moving average should be used as an argument to the strategy |
| movingAverageDuration_ | `uint32` | The duration of the moving average in seconds |
| lastObservationTime_ | `uint48` | The timestamp of the last observation |
| observations_ | `uint256[]` | The observations to be used to initialize the moving average |
| strategy_ | `Component` | The strategy to be used to aggregate price feeds |
| feeds_ | `Component[]` | The price feeds to be used to calculate the price |

<a id="validateremoveasset-address"></a>

### validateRemoveAsset

Validates parameters for removing an asset definition

<i>

Does not mutate state.

</i>

```solidity
function validateRemoveAsset(address asset_) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

<a id="validateupdateasset-address-updateassetparams"></a>

### validateUpdateAsset

Validates parameters for updating an asset configuration

<i>

Performs structural validation only. This function does not call configured
price feeds or strategies, and therefore does not prove that the final
feed/strategy/moving-average configuration can resolve a non-zero price.

</i>

```solidity
function validateUpdateAsset(
        address asset_,
        UpdateAssetParams memory params_
    ) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to update |
| params_ | `UpdateAssetParams` | Update parameters with flags |

<a id="validateinstallsubmodule-address"></a>

### validateInstallSubmodule

Validates parameters for installing a PRICE submodule

<i>

Does not mutate state.

</i>

```solidity
function validateInstallSubmodule(address submodule_) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| submodule_ | `address` | The address of the submodule to install |

<a id="validateupgradesubmodule-address"></a>

### validateUpgradeSubmodule

Validates parameters for upgrading a PRICE submodule

<i>

Does not mutate state.

</i>

```solidity
function validateUpgradeSubmodule(address submodule_) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| submodule_ | `address` | The address of the submodule to upgrade to |

<a id="validateexeconsubmodule-bytes20"></a>

### validateExecOnSubmodule

Validates parameters for executing a call on a PRICE submodule

<i>

Does not mutate state.

</i>

```solidity
function validateExecOnSubmodule(bytes20 subKeycode_) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `bytes20` | The 20-byte SubKeycode of the submodule to call |

<a id="addasset-address-bool-bool-uint32-uint48-uint256-component-component"></a>

### addAsset

Adds a new asset definition

<i>

Implements the following logic:

</i>

<i>

- Performs basic checks on the parameters

</i>

<i>

- Sets the price strategy using `_updateAssetPriceStrategy()`

</i>

<i>

- Sets the price feeds using `_updateAssetPriceFeeds()`

</i>

<i>

- Sets the moving average data using `_updateAssetMovingAverage()`

</i>

<i>

- Validates the configuration using `_getCurrentPrice()` or, when using a moving average,

</i>

<i>

both the raw observation and MA-inclusive CURRENT strategy input shapes

</i>

<i>

- Adds the asset to the `assets` array and marks it as approved

</i>

<i>

When `useMovingAverage_` is true, validation appends a synthetic moving-average value derived from the current raw feed observation.
If the last stored observation is out of consensus, call `storeObservation(asset_)` after adding the asset before consumers rely on CURRENT price reads.

</i>

<i>

Will revert if:

</i>

<i>

- The caller is not permissioned

</i>

<i>

- `asset_` is neither a contract nor a registered non-contract asset

</i>

<i>

- `asset_` is already approved

</i>

<i>

- `asset_` is the reserved unit-of-account address

</i>

<i>

- The moving average is being used, but not stored

</i>

<i>

- An empty strategy was specified, but the number of feeds requires a strategy

</i>

<i>

- The call to get the current price of any feed fails

</i>

<i>

Reentrancy note: feed/strategy validation uses `staticcall`, so callbacks cannot
perform state-changing reentry.

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |
| storeMovingAverage_ | `bool` | Whether the moving average should be stored periodically |
| useMovingAverage_ | `bool` | Whether the moving average should be used as an argument to the strategy |
| movingAverageDuration_ | `uint32` | The duration of the moving average in seconds |
| lastObservationTime_ | `uint48` | The timestamp of the last observation |
| observations_ | `uint256[]` | The observations to be used to initialize the moving average |
| strategy_ | `Component` | The strategy to be used to aggregate price feeds |
| feeds_ | `Component[]` | The price feeds to be used to calculate the price |

<a id="removeasset-address"></a>

### removeAsset

Removes an asset definition

<i>

Will revert if:

</i>

<i>

- `asset_` is the reserved unit-of-account address

</i>

<i>

- `asset_` is not approved

</i>

<i>

- The caller is not permissioned

</i>

<i>

Reentrancy note: this function does not make external calls.

</i>

```solidity
function removeAsset(address asset_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset |

<a id="_updateassetpricefeeds-address-component"></a>

### _updateAssetPriceFeeds

Updates the price feeds for the asset

<i>

Implements the following logic:

</i>

<i>

- Sets the price feeds for the asset

</i>

<i>

Assumes the caller has already validated `feeds_`.

</i>

```solidity
function _updateAssetPriceFeeds(address asset_, Component[] memory feeds_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset to update the price feeds for |
| feeds_ | `Component[]` | Array of price feed components |

<a id="_updateassetpricestrategy-address-component-bool"></a>

### _updateAssetPriceStrategy

Updates the price strategy for the asset

<i>

Implements the following logic:

</i>

<i>

- Sets the price strategy for the asset

</i>

<i>

- Sets the `useMovingAverage` flag for the asset

</i>

<i>

Assumes the caller has already validated `strategy_`.

</i>

```solidity
function _updateAssetPriceStrategy(
        address asset_,
        Component memory strategy_,
        bool useMovingAverage_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset to update the price strategy for |
| strategy_ | `Component` | Price strategy component |
| useMovingAverage_ | `bool` | Flag to indicate if the moving average should be used in the strategy |

<a id="_updateassetmovingaverage-address-bool-uint32-uint48-uint256"></a>

### _updateAssetMovingAverage

Updates the moving average data for the asset

<i>

Implements the following logic:

</i>

<i>

- Removes existing moving average data

</i>

<i>

- Sets the moving average data for the asset

</i>

<i>

- If `storeMovingAverage_` is false, clears moving-average state

</i>

<i>

Assumes the caller has already validated moving-average
duration, timestamps, and observations.

</i>

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset to update the moving average data for |
| storeMovingAverage_ | `bool` | Flag to indicate if the moving average should be stored |
| movingAverageDuration_ | `uint32` | Duration of the moving average |
| lastObservationTime_ | `uint48` | Timestamp of the last observation |
| observations_ | `uint256[]` | Array of observations to store |

<a id="updateasset-address-updateassetparams"></a>

### updateAsset

Updates an asset configuration atomically

<i>

Implements the following logic:

</i>

<i>

- Validates that at least one update flag is true

</i>

<i>

- Validates that asset is approved

</i>

<i>

- Calculates final state (before any updates)

</i>

<i>

- Validates the final configuration atomically

</i>

<i>

- Validates submodules are installed for updated components

</i>

<i>

- Calls update functions for flagged updates

</i>

<i>

- Validates final configuration with `_getCurrentPrice()` or, when using a moving average,

</i>

<i>

both the raw observation and MA-inclusive CURRENT strategy input shapes

</i>

<i>

- Emits events based on which updates occurred

</i>

<i>

When the final configuration uses the moving average, validation appends a synthetic moving-average value derived from the current raw feed observation, in order to allow for re-configuration when the last observation is stale or out of consensus.
If the last stored observation is stale or out of consensus, call `storeObservation(asset_)` after updating the asset before consumers rely on CURRENT price reads.

</i>

<i>

Will revert if:

</i>

<i>

- All update flags are false (no-op)

</i>

<i>

- `asset_` is the reserved unit-of-account address

</i>

<i>

- `asset_` is not approved

</i>

<i>

- The final configuration is invalid

</i>

<i>

- Any updated submodule is not installed

</i>

<i>

Reentrancy note: any external feed/strategy resolution in validation uses
`staticcall`, so callbacks cannot perform state-changing reentry.

</i>

```solidity
function updateAsset(
        address asset_,
        UpdateAssetParams memory params_
    ) external virtual override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | The address of the asset to update |
| params_ | `UpdateAssetParams` | Update parameters with flags |
