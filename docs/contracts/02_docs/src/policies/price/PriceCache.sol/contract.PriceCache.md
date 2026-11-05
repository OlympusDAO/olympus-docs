# PriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/PriceCache.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IPriceCache](/main/contracts/docs/src/interfaces/IPriceCache.sol/interface.IPriceCache), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** PriceCache

**Author:** OlympusDAO

Permissionless pair cache policy for approved PRICE assets

## Constants

### _PRICE_KEYCODE

```solidity
bytes5 internal constant _PRICE_KEYCODE = "PRICE";
```

### _ROLES_KEYCODE

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES";
```

### _PRICE_ADMIN_ROLE

```solidity
bytes32 internal constant _PRICE_ADMIN_ROLE = "price_admin";
```

### _MAX_SYMBOL_LENGTH

```solidity
uint256 internal constant _MAX_SYMBOL_LENGTH = 32;
```

### _UNIT_OF_ACCOUNT_DECIMALS

```solidity
uint8 internal immutable _UNIT_OF_ACCOUNT_DECIMALS;
```

### _UNIT_OF_ACCOUNT_SYMBOL

```solidity
bytes32 internal immutable _UNIT_OF_ACCOUNT_SYMBOL;
```

## State Variables

### PRICE

```solidity
IPRICEv2 public PRICE;
```

### _cacheEpoch

```solidity
uint256 internal _cacheEpoch;
```

### _nonContractAssetMetadata

```solidity
mapping(address asset => IPriceCache.NonContractAssetMetadata metadata)
        internal _nonContractAssetMetadata;
```

### _assetEpoch

```solidity
mapping(address asset => uint64 epoch) internal _assetEpoch;
```

### _pairSnapshot

```solidity
mapping(uint256 epoch => mapping(bytes32 key => IPriceCache.PairSnapshot snapshot))
        internal _pairSnapshot;
```

## Functions

<a id="constructor-kernel-uint8-string"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        uint8 unitOfAccountDecimals_,
        string memory unitOfAccountSymbol_
    ) Policy(kernel_);
```

**Parameters**

| Name                   | Type     | Description |
| ---------------------- | -------- | ----------- |
| kernel_                | `Kernel` |             |
| unitOfAccountDecimals_ | `uint8`  |             |
| unitOfAccountSymbol_   | `string` |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

<i>

Reverts if:

- The configured PRICE module version is unsupported
- The configured PRICE module does not implement IPRICEv2
- The configured ROLES module major version is unsupported

</i>

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

<i>

Does not revert.

</i>

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="version"></a>

### VERSION

Returns the version of the contract

<i>

Does not revert.

</i>

```solidity
function VERSION() external pure override returns (uint8, uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| &lt;none&gt; | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_onlypriceoradminrole"></a>

### _onlyPriceOrAdminRole

Reverts unless the caller has the `price_admin` or `admin` role.

<i>

Reverts with `PolicyAdmin.NotAuthorised()` if the caller lacks both roles.

</i>

```solidity
function _onlyPriceOrAdminRole() internal view;
```

<a id="onlypriceoradminrole"></a>

### onlyPriceOrAdminRole

Modifier that reverts unless the caller has the `price_admin` or `admin` role.

```solidity
modifier onlyPriceOrAdminRole();
```

<a id="onlypolicyactive"></a>

### onlyPolicyActive

Reverts if this policy is not active in the Kernel.

```solidity
modifier onlyPolicyActive();
```

<a id="_onlypolicyactive"></a>

### _onlyPolicyActive

```solidity
function _onlyPolicyActive() internal view;
```

<a id="decimals"></a>

### decimals

Return the USD decimal scale used by cached pair legs

<i>

Reverts if dependencies are not configured and the PRICE module is unset.

</i>

```solidity
function decimals() external view override returns (uint8 decimals_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| decimals_ | `uint8` | USD decimal scale for cached assetPriceUsd/quotePriceUsd values |

<a id="assetdecimals-address"></a>

### assetDecimals

Return the amount decimal scale used for `asset_` quote conversion

<i>

Reverts if:

- `asset_` is a non-contract asset that is not known to PRICE
- `asset_` is a non-contract asset without registered decimals

</i>

```solidity
function assetDecimals(address asset_) external view override returns (uint8 decimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| decimals_ | `uint8` | Amount decimal scale for `asset_` |

<a id="assetsymbol-address"></a>

### assetSymbol

Return the symbol used for naming and display of `asset_`

<i>

Reverts if:

- `asset_` is a non-contract asset that is not known to PRICE
- `asset_` is a non-contract asset without registered symbol metadata

</i>

```solidity
function assetSymbol(address asset_) external view override returns (string memory symbol_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| symbol_ | `string` | Symbol for `asset_` |

<a id="setnoncontractassetmetadata-address-uint8-string"></a>

### setNonContractAssetMetadata

Set the metadata for a registered non-contract asset

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- `asset_` is not a valid non-contract asset managed by PRICE
- `symbol_` is empty or exceeds the configured max length

</i>

```solidity
function setNonContractAssetMetadata(
        address asset_,
        uint8 decimals_,
        string calldata symbol_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Non-contract asset identifier |
| decimals_ | `uint8` | Amount decimal scale for `asset_` |
| symbol_ | `string` | Display symbol for `asset_` |

<a id="removenoncontractassetmetadata-address"></a>

### removeNonContractAssetMetadata

Remove the configured metadata for a non-contract asset

<i>

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- `asset_` is the unit of account
- `asset_` does not have registered metadata

</i>

```solidity
function removeNonContractAssetMetadata(
        address asset_
    ) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Non-contract asset identifier |

<a id="cacheprice-address-address"></a>

### cachePrice

Cache an explicit asset/quote pair snapshot

<i>

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- The pair is invalid (zero address or identical tokens)
- Either non-unit asset in the pair is not approved in PRICE
- PRICE cannot return a current USD price for either token

</i>

```solidity
function cachePrice(
        address asset_,
        address quote_
    ) public override onlyPolicyActive onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset in requested orientation |
| quote_ | `address` | Quote in requested orientation |

<a id="cachepriceifnecessary-address-address-uint48"></a>

### cachePriceIfNecessary

Cache an explicit pair only when stale for maxAge_

<i>

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- Pair validation fails while evaluating staleness
- PRICE cannot serve required data when a recache is needed

</i>

```solidity
function cachePriceIfNecessary(
        address asset_,
        address quote_,
        uint48 maxAge_
    ) external override onlyPolicyActive onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset in requested orientation |
| quote_ | `address` | Quote in requested orientation |
| maxAge_ | `uint48` | Maximum acceptable snapshot age in seconds |

<a id="getcachedprice-address-address"></a>

### getCachedPrice

Get the last cached snapshot for a pair in requested orientation

<i>

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- The pair is invalid (zero address or identical tokens)
- Either non-unit asset in the pair is not approved in PRICE
- Pair decimals validation fails

</i>

<i>

Returns a fully zeroed `CachedPrice` when the stored snapshot was invalidated by a
later non-contract decimals update or removal for either asset in the pair.

</i>

```solidity
function getCachedPrice(
        address asset_,
        address quote_
    ) public view override onlyPolicyActive onlyEnabled returns (CachedPrice memory cachedPrice);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset in requested orientation |
| quote_ | `address` | Quote in requested orientation |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cachedPrice | `CachedPrice` | Last cached pair snapshot data; all fields are zero when no snapshot exists |

<a id="isstale-address-address-uint48"></a>

### isStale

Return whether pair snapshot is stale for maxAge_

<i>

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- Pair validation fails in `getCachedPrice`

</i>

```solidity
function isStale(
        address asset_,
        address quote_,
        uint48 maxAge_
    ) public view override onlyPolicyActive onlyEnabled returns (bool stale);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset in requested orientation |
| quote_ | `address` | Quote in requested orientation |
| maxAge_ | `uint48` | Maximum acceptable snapshot age in seconds |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stale | `bool` | True when no cache exists or cache is older than maxAge_ |

<a id="_cacheprice-address-address"></a>

### _cachePrice

```solidity
function _cachePrice(address asset_, address quote_) internal;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |
| quote_ | `address` |             |

<a id="_getcachedprice-address-address"></a>

### _getCachedPrice

```solidity
function _getCachedPrice(
        address asset_,
        address quote_
    ) internal view returns (CachedPrice memory cachedPrice);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |
| quote_ | `address` |             |

**Returns**

| Name        | Type          | Description |
| ----------- | ------------- | ----------- |
| cachedPrice | `CachedPrice` |             |

<a id="_isstale-address-address-uint48"></a>

### _isStale

```solidity
function _isStale(
        address asset_,
        address quote_,
        uint48 maxAge_
    ) internal view returns (bool stale);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| asset_  | `address` |             |
| quote_  | `address` |             |
| maxAge_ | `uint48`  |             |

**Returns**

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| stale | `bool` |             |

<a id="_isunitofaccount-address"></a>

### _isUnitOfAccount

```solidity
function _isUnitOfAccount(address asset_) internal view returns (bool);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_validatepair-address-address"></a>

### _validatePair

```solidity
function _validatePair(address asset_, address quote_) internal view;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |
| quote_ | `address` |             |

<a id="_validatepairdecimals-address-address"></a>

### _validatePairDecimals

Validate that both legs in a pair have resolvable cache metadata

<i>

Reverts if `_assetDecimals(asset_)` or `_assetDecimals(quote_)` reverts.

</i>

```solidity
function _validatePairDecimals(address asset_, address quote_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset in requested orientation |
| quote_ | `address` | Quote in requested orientation |

<a id="_assetdecimals-address"></a>

### _assetDecimals

Resolve the amount-decimal scale for an asset identifier

<i>

Contract assets source decimals from `IERC20.decimals()`. Non-contract assets must be
known to PRICE and have registered metadata in this cache.

</i>

<i>

Reverts if:

- `asset_` is a non-contract asset that is not registered in PRICE
- `asset_` is a registered non-contract asset without cache decimals
- `asset_` is a contract whose `decimals()` call reverts

</i>

```solidity
function _assetDecimals(address asset_) internal view returns (uint8 decimals_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier |

**Returns**

| Name      | Type    | Description                       |
| --------- | ------- | --------------------------------- |
| decimals_ | `uint8` | Amount-decimal scale for `asset_` |

<a id="_assetsymbol-address"></a>

### _assetSymbol

Resolve the symbol for an asset identifier

<i>

Contract assets source symbols from `IERC20.symbol()`. Non-contract assets must be
known to PRICE and have registered symbol metadata in this cache.

</i>

<i>

Reverts if:

- `asset_` is a non-contract asset that is not registered in PRICE
- `asset_` is a registered non-contract asset without cache symbol metadata
- `asset_` is a contract whose `symbol()` call reverts

</i>

```solidity
function _assetSymbol(address asset_) internal view returns (string memory symbol_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier |

**Returns**

| Name    | Type     | Description         |
| ------- | -------- | ------------------- |
| symbol_ | `string` | Symbol for `asset_` |

<a id="_isknownnoncontractasset-address"></a>

### _isKnownNonContractAsset

Return whether a non-contract asset identifier is known to PRICE

<i>

Returns true for PRICE's configured unit of account. All other non-contract assets must
be explicitly registered in PRICE.

</i>

<i>

Reverts if `PRICE.unitOfAccount()` reverts because dependencies are not configured.

</i>

```solidity
function _isKnownNonContractAsset(address asset_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Non-contract asset identifier |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool     True if `asset_` is known to PRICE |

<a id="_isconfigurablenoncontractasset-address"></a>

### _isConfigurableNonContractAsset

Return whether an asset can have non-contract metadata configured in the cache

<i>

This is intended for admin-managed non-contract asset metadata registration paths.

</i>

<i>

Reverts if `_isKnownNonContractAsset(asset_)` reverts because PRICE dependencies are not
configured.

</i>

```solidity
function _isConfigurableNonContractAsset(address asset_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool     True if `asset_` is a non-contract asset known to PRICE |

<a id="_registerunitofaccountmetadataifmissing"></a>

### _registerUnitOfAccountMetadataIfMissing

Register the unit-of-account metadata in the cache if it has not been set yet

<i>

This is used only during dependency configuration to seed the initial unit-of-account
metadata without overwriting a later admin update on replayed `configureDependencies()`.

</i>

<i>

Reverts if `PRICE.unitOfAccount()` reverts because the PRICE module is not configured.

</i>

```solidity
function _registerUnitOfAccountMetadataIfMissing() internal;
```

<a id="_validatesymbol-string"></a>

### _validateSymbol

Validate a non-contract asset symbol before it is stored

<i>

Reverts if `symbol_` is empty or exceeds `_MAX_SYMBOL_LENGTH`.

</i>

```solidity
function _validateSymbol(string memory symbol_) internal pure;
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| symbol_ | `string` |             |

<a id="_stringtobytes32-string"></a>

### _stringToBytes32

Convert a &lt;=32 byte string into a bytes32 word for immutable storage

```solidity
function _stringToBytes32(string memory value_) internal pure returns (bytes32 result_);
```

**Parameters**

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| value_ | `string` |             |

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| result_ | `bytes32` |             |

<a id="_bytes32tostring-bytes32"></a>

### _bytes32ToString

Convert a zero-padded bytes32 word back into a string

```solidity
function _bytes32ToString(bytes32 value_) internal pure returns (string memory result_);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| value_ | `bytes32` |             |

**Returns**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| result_ | `string` |             |

<a id="_invalidateasset-address"></a>

### _invalidateAsset

Invalidate cached pairs involving `asset_` by advancing its epoch

<i>

Use this after changing or removing non-contract asset decimals so future reads treat
existing snapshots as uncached.

</i>

```solidity
function _invalidateAsset(address asset_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` | Asset identifier whose cached pairs should be invalidated |

<a id="_getpriceorunit-address"></a>

### _getPriceOrUnit

```solidity
function _getPriceOrUnit(
        address asset_
    ) internal view returns (uint256 price_, uint48 timestamp_);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |

**Returns**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| price_     | `uint256` |             |
| timestamp_ | `uint48`  |             |

<a id="_pairkey-address-address"></a>

### _pairKey

```solidity
function _pairKey(
        address asset_,
        address quote_
    ) internal pure returns (bytes32 key_, bool assetIsToken0_);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| asset_ | `address` |             |
| quote_ | `address` |             |

**Returns**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| key_           | `bytes32` |             |
| assetIsToken0_ | `bool`    |             |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the contract implements `interfaceId_` |
