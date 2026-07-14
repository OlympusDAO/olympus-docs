# PriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/price/PriceCache.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IPriceCache](/main/contracts/docs/src/interfaces/IPriceCache.sol/interface.IPriceCache), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:**
PriceCache

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Permissionless pair cache policy for approved PRICE assets

## State Variables

### \_PRICE_KEYCODE

```solidity
bytes5 internal constant _PRICE_KEYCODE = "PRICE"
```

### \_ROLES_KEYCODE

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES"
```

### \_PRICE_ADMIN_ROLE

```solidity
bytes32 internal constant _PRICE_ADMIN_ROLE = "price_admin"
```

### \_MAX_SYMBOL_LENGTH

```solidity
uint256 internal constant _MAX_SYMBOL_LENGTH = 32
```

### PRICE

```solidity
IPRICEv2 public PRICE
```

### \_UNIT_OF_ACCOUNT_DECIMALS

```solidity
uint8 internal immutable _UNIT_OF_ACCOUNT_DECIMALS
```

### \_UNIT_OF_ACCOUNT_SYMBOL

```solidity
bytes32 internal immutable _UNIT_OF_ACCOUNT_SYMBOL
```

### \_cacheEpoch

```solidity
uint256 internal _cacheEpoch
```

### \_nonContractAssetMetadata

```solidity
mapping(address asset => IPriceCache.NonContractAssetMetadata metadata) internal _nonContractAssetMetadata
```

### \_assetEpoch

```solidity
mapping(address asset => uint64 epoch) internal _assetEpoch
```

### \_pairSnapshot

```solidity
mapping(uint256 epoch => mapping(bytes32 key => IPriceCache.PairSnapshot snapshot)) internal _pairSnapshot
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, uint8 unitOfAccountDecimals_, string memory unitOfAccountSymbol_) Policy(kernel_);
```

### configureDependencies

Define module dependencies for this policy.

Reverts if:

- The configured PRICE module version is unsupported
- The configured PRICE module does not implement IPRICEv2
- The configured ROLES module major version is unsupported

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name           | Type        | Description                             |
| -------------- | ----------- | --------------------------------------- |
| `dependencies` | `Keycode[]` | - Keycode array of module dependencies. |

### requestPermissions

Function called by kernel to set module function permissions.

Does not revert.

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name       | Type            | Description                                                           |
| ---------- | --------------- | --------------------------------------------------------------------- |
| `requests` | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

### VERSION

Returns the version of the contract

Does not revert.

```solidity
function VERSION() external pure override returns (uint8, uint8);
```

**Returns**

| Name     | Type    | Description                                                               |
| -------- | ------- | ------------------------------------------------------------------------- |
| `<none>` | `uint8` | major - Major version upgrade indicates breaking change to the interface. |
| `<none>` | `uint8` | minor - Minor version change retains backward-compatible interface.       |

### \_onlyPriceOrAdminRole

Reverts unless the caller has the `price_admin` or `admin` role.

Reverts with `PolicyAdmin.NotAuthorised()` if the caller lacks both roles.

```solidity
function _onlyPriceOrAdminRole() internal view;
```

### onlyPriceOrAdminRole

Modifier that reverts unless the caller has the `price_admin` or `admin` role.

```solidity
modifier onlyPriceOrAdminRole() ;
```

### onlyPolicyActive

Reverts if this policy is not active in the Kernel.

```solidity
modifier onlyPolicyActive() ;
```

### \_onlyPolicyActive

```solidity
function _onlyPolicyActive() internal view;
```

### decimals

Return the USD decimal scale used by cached pair legs

Reverts if dependencies are not configured and the PRICE module is unset.

```solidity
function decimals() external view override returns (uint8 decimals_);
```

**Returns**

| Name        | Type    | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| `decimals_` | `uint8` | USD decimal scale for cached assetPriceUsd/quotePriceUsd values |

### assetDecimals

Return the amount decimal scale used for `asset_` quote conversion

Reverts if:

- `asset_` is a non-contract asset that is not known to PRICE
- `asset_` is a non-contract asset without registered decimals

```solidity
function assetDecimals(address asset_) external view override returns (uint8 decimals_);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

**Returns**

| Name        | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| `decimals_` | `uint8` | Amount decimal scale for `asset_` |

### assetSymbol

Return the symbol used for naming and display of `asset_`

Reverts if:

- `asset_` is a non-contract asset that is not known to PRICE
- `asset_` is a non-contract asset without registered symbol metadata

```solidity
function assetSymbol(address asset_) external view override returns (string memory symbol_);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

**Returns**

| Name      | Type     | Description         |
| --------- | -------- | ------------------- |
| `symbol_` | `string` | Symbol for `asset_` |

### setNonContractAssetMetadata

Set the metadata for a registered non-contract asset

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- `asset_` is not a valid non-contract asset managed by PRICE
- `symbol_` is empty or exceeds the configured max length

```solidity
function setNonContractAssetMetadata(address asset_, uint8 decimals_, string calldata symbol_)
    external
    override
    onlyEnabled
    onlyPriceOrAdminRole;
```

**Parameters**

| Name        | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `asset_`    | `address` | Non-contract asset identifier     |
| `decimals_` | `uint8`   | Amount decimal scale for `asset_` |
| `symbol_`   | `string`  | Display symbol for `asset_`       |

### removeNonContractAssetMetadata

Remove the configured metadata for a non-contract asset

Reverts if:

- The policy is disabled
- The caller is neither `price_admin` nor `admin`
- `asset_` is the unit of account
- `asset_` does not have registered metadata

```solidity
function removeNonContractAssetMetadata(address asset_) external override onlyEnabled onlyPriceOrAdminRole;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

### cachePrice

Cache an explicit asset/quote pair snapshot

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- The pair is invalid (zero address or identical tokens)
- Either non-unit asset in the pair is not approved in PRICE
- PRICE cannot return a current USD price for either token

```solidity
function cachePrice(address asset_, address quote_) public override onlyPolicyActive onlyEnabled;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset_` | `address` | Asset in requested orientation |
| `quote_` | `address` | Quote in requested orientation |

### cachePriceIfNecessary

Cache an explicit pair only when stale for maxAge\_

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- Pair validation fails while evaluating staleness
- PRICE cannot serve required data when a recache is needed

```solidity
function cachePriceIfNecessary(address asset_, address quote_, uint48 maxAge_)
    external
    override
    onlyPolicyActive
    onlyEnabled;
```

**Parameters**

| Name      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `asset_`  | `address` | Asset in requested orientation             |
| `quote_`  | `address` | Quote in requested orientation             |
| `maxAge_` | `uint48`  | Maximum acceptable snapshot age in seconds |

### getCachedPrice

Get the last cached snapshot for a pair in requested orientation

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- The pair is invalid (zero address or identical tokens)
- Either non-unit asset in the pair is not approved in PRICE
- Pair decimals validation fails

Returns a fully zeroed `CachedPrice` when the stored snapshot was invalidated by a
later non-contract decimals update or removal for either asset in the pair.

```solidity
function getCachedPrice(address asset_, address quote_)
    public
    view
    override
    onlyPolicyActive
    onlyEnabled
    returns (CachedPrice memory cachedPrice);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset_` | `address` | Asset in requested orientation |
| `quote_` | `address` | Quote in requested orientation |

**Returns**

| Name          | Type          | Description                                                                 |
| ------------- | ------------- | --------------------------------------------------------------------------- |
| `cachedPrice` | `CachedPrice` | Last cached pair snapshot data; all fields are zero when no snapshot exists |

### isStale

Return whether pair snapshot is stale for maxAge\_

Reverts if:

- The policy is deactivated in Kernel
- The policy is disabled
- Pair validation fails in `getCachedPrice`

```solidity
function isStale(address asset_, address quote_, uint48 maxAge_)
    public
    view
    override
    onlyPolicyActive
    onlyEnabled
    returns (bool stale);
```

**Parameters**

| Name      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `asset_`  | `address` | Asset in requested orientation             |
| `quote_`  | `address` | Quote in requested orientation             |
| `maxAge_` | `uint48`  | Maximum acceptable snapshot age in seconds |

**Returns**

| Name    | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| `stale` | `bool` | True when no cache exists or cache is older than maxAge\_ |

### \_cachePrice

```solidity
function _cachePrice(address asset_, address quote_) internal;
```

### \_getCachedPrice

```solidity
function _getCachedPrice(address asset_, address quote_) internal view returns (CachedPrice memory cachedPrice);
```

### \_isStale

```solidity
function _isStale(address asset_, address quote_, uint48 maxAge_) internal view returns (bool stale);
```

### \_isUnitOfAccount

```solidity
function _isUnitOfAccount(address asset_) internal view returns (bool);
```

### \_validatePair

```solidity
function _validatePair(address asset_, address quote_) internal view;
```

### \_validatePairDecimals

Validate that both legs in a pair have resolvable cache metadata

Reverts if `_assetDecimals(asset_)` or `_assetDecimals(quote_)` reverts.

```solidity
function _validatePairDecimals(address asset_, address quote_) internal view;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset_` | `address` | Asset in requested orientation |
| `quote_` | `address` | Quote in requested orientation |

### \_assetDecimals

Resolve the amount-decimal scale for an asset identifier

Contract assets source decimals from `IERC20.decimals()`. Non-contract assets must be
known to PRICE and have registered metadata in this cache.

Reverts if:

- `asset_` is a non-contract asset that is not registered in PRICE
- `asset_` is a registered non-contract asset without cache decimals
- `asset_` is a contract whose `decimals()` call reverts

```solidity
function _assetDecimals(address asset_) internal view returns (uint8 decimals_);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

**Returns**

| Name        | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| `decimals_` | `uint8` | Amount-decimal scale for `asset_` |

### \_assetSymbol

Resolve the symbol for an asset identifier

Contract assets source symbols from `IERC20.symbol()`. Non-contract assets must be
known to PRICE and have registered symbol metadata in this cache.

Reverts if:

- `asset_` is a non-contract asset that is not registered in PRICE
- `asset_` is a registered non-contract asset without cache symbol metadata
- `asset_` is a contract whose `symbol()` call reverts

```solidity
function _assetSymbol(address asset_) internal view returns (string memory symbol_);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

**Returns**

| Name      | Type     | Description         |
| --------- | -------- | ------------------- |
| `symbol_` | `string` | Symbol for `asset_` |

### \_isKnownNonContractAsset

Return whether a non-contract asset identifier is known to PRICE

Returns true for PRICE's configured unit of account. All other non-contract assets must
be explicitly registered in PRICE.

Reverts if `PRICE.unitOfAccount()` reverts because dependencies are not configured.

```solidity
function _isKnownNonContractAsset(address asset_) internal view returns (bool);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

**Returns**

| Name     | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `<none>` | `bool` | bool True if `asset_` is known to PRICE |

### \_isConfigurableNonContractAsset

Return whether an asset can have non-contract metadata configured in the cache

This is intended for admin-managed non-contract asset metadata registration paths.

Reverts if `_isKnownNonContractAsset(asset_)` reverts because PRICE dependencies are not
configured.

```solidity
function _isConfigurableNonContractAsset(address asset_) internal view returns (bool);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

**Returns**

| Name     | Type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| `<none>` | `bool` | bool True if `asset_` is a non-contract asset known to PRICE |

### \_registerUnitOfAccountMetadataIfMissing

Register the unit-of-account metadata in the cache if it has not been set yet

This is used only during dependency configuration to seed the initial unit-of-account
metadata without overwriting a later admin update on replayed `configureDependencies()`.

Reverts if `PRICE.unitOfAccount()` reverts because the PRICE module is not configured.

```solidity
function _registerUnitOfAccountMetadataIfMissing() internal;
```

### \_validateSymbol

Validate a non-contract asset symbol before it is stored

Reverts if `symbol_` is empty or exceeds `_MAX_SYMBOL_LENGTH`.

```solidity
function _validateSymbol(string memory symbol_) internal pure;
```

### \_stringToBytes32

Convert a <=32 byte string into a bytes32 word for immutable storage

```solidity
function _stringToBytes32(string memory value_) internal pure returns (bytes32 result_);
```

### \_bytes32ToString

Convert a zero-padded bytes32 word back into a string

```solidity
function _bytes32ToString(bytes32 value_) internal pure returns (string memory result_);
```

### \_invalidateAsset

Invalidate cached pairs involving `asset_` by advancing its epoch

Use this after changing or removing non-contract asset decimals so future reads treat
existing snapshots as uncached.

```solidity
function _invalidateAsset(address asset_) internal;
```

**Parameters**

| Name     | Type      | Description                                               |
| -------- | --------- | --------------------------------------------------------- |
| `asset_` | `address` | Asset identifier whose cached pairs should be invalidated |

### \_getPriceOrUnit

```solidity
function _getPriceOrUnit(address asset_) internal view returns (uint256 price_, uint48 timestamp_);
```

### \_pairKey

```solidity
function _pairKey(address asset_, address quote_) internal pure returns (bytes32 key_, bool assetIsToken0_);
```

### supportsInterface

Query if a contract implements an interface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name           | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `interfaceId_` | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name     | Type   | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| `<none>` | `bool` | bool True if the contract implements `interfaceId_` |
