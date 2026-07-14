# IPriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/interfaces/IPriceCache.sol)

**Title:**
IPriceCache

**Author:**
OlympusDAO

Interface for caching explicit asset/quote pair snapshots

## Functions

### decimals

Return the USD decimal scale used by cached pair legs

```solidity
function decimals() external view returns (uint8 decimals_);
```

**Returns**

| Name        | Type    | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| `decimals_` | `uint8` | USD decimal scale for cached assetPriceUsd/quotePriceUsd values |

### cachePrice

Cache an explicit asset/quote pair snapshot

```solidity
function cachePrice(address asset_, address quote_) external;
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset_` | `address` | Asset in requested orientation |
| `quote_` | `address` | Quote in requested orientation |

### assetDecimals

Return the amount decimal scale used for `asset_` quote conversion

```solidity
function assetDecimals(address asset_) external view returns (uint8 decimals_);
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

```solidity
function assetSymbol(address asset_) external view returns (string memory symbol_);
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

```solidity
function setNonContractAssetMetadata(address asset_, uint8 decimals_, string calldata symbol_) external;
```

**Parameters**

| Name        | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| `asset_`    | `address` | Non-contract asset identifier     |
| `decimals_` | `uint8`   | Amount decimal scale for `asset_` |
| `symbol_`   | `string`  | Display symbol for `asset_`       |

### removeNonContractAssetMetadata

Remove the configured metadata for a non-contract asset

```solidity
function removeNonContractAssetMetadata(address asset_) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

### cachePriceIfNecessary

Cache an explicit pair only when stale for maxAge\_

```solidity
function cachePriceIfNecessary(address asset_, address quote_, uint48 maxAge_) external;
```

**Parameters**

| Name      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `asset_`  | `address` | Asset in requested orientation             |
| `quote_`  | `address` | Quote in requested orientation             |
| `maxAge_` | `uint48`  | Maximum acceptable snapshot age in seconds |

### getCachedPrice

Get the last cached snapshot for a pair in requested orientation

Returns a zeroed snapshot for valid pairs when no snapshot exists in the current cache epoch

```solidity
function getCachedPrice(address asset_, address quote_) external view returns (CachedPrice memory cachedPrice);
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

```solidity
function isStale(address asset_, address quote_, uint48 maxAge_) external view returns (bool stale);
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

## Errors

### PriceCache_PolicyNotActive

Thrown when this policy is no longer active in Kernel

```solidity
error PriceCache_PolicyNotActive();
```

### PriceCache_UnsupportedModuleVersion

Thrown when a required module version is unsupported

```solidity
error PriceCache_UnsupportedModuleVersion(bytes5 keycode, uint8 major, uint8 minor);
```

**Parameters**

| Name      | Type     | Description          |
| --------- | -------- | -------------------- |
| `keycode` | `bytes5` | Module keycode       |
| `major`   | `uint8`  | Module major version |
| `minor`   | `uint8`  | Module minor version |

### PriceCache_UnsupportedModuleInterface

Thrown when a required module does not implement an interface

```solidity
error PriceCache_UnsupportedModuleInterface(bytes5 keycode, bytes4 interfaceId);
```

**Parameters**

| Name          | Type     | Description                                   |
| ------------- | -------- | --------------------------------------------- |
| `keycode`     | `bytes5` | Module keycode                                |
| `interfaceId` | `bytes4` | Interface identifier, as specified in ERC-165 |

### PriceCache_InvalidPair

Thrown when an asset/quote pair is invalid

```solidity
error PriceCache_InvalidPair(address asset_, address quote_);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `asset_` | `address` | Asset in requested orientation |
| `quote_` | `address` | Quote in requested orientation |

### PriceCache_NonContractAssetNotRegistered

Thrown when a non-contract asset is not registered in PRICE

```solidity
error PriceCache_NonContractAssetNotRegistered(address asset_);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

### PriceCache_NonContractAssetDecimalsNotRegistered

Thrown when a non-contract asset has no cache decimals configured

```solidity
error PriceCache_NonContractAssetDecimalsNotRegistered(address asset_);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

### PriceCache_NonContractAssetSymbolNotRegistered

Thrown when a non-contract asset has no cache symbol configured

```solidity
error PriceCache_NonContractAssetSymbolNotRegistered(address asset_);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `asset_` | `address` | Non-contract asset identifier |

### PriceCache_InvalidAsset

Thrown when the asset identifier is invalid for the requested cache operation

```solidity
error PriceCache_InvalidAsset(address asset_);
```

**Parameters**

| Name     | Type      | Description      |
| -------- | --------- | ---------------- |
| `asset_` | `address` | Asset identifier |

### PriceCache_InvalidAssetSymbol

Thrown when a non-contract asset symbol is invalid

```solidity
error PriceCache_InvalidAssetSymbol();
```

## Structs

### CachedPrice

Pair cache snapshot in requested orientation

```solidity
struct CachedPrice {
    uint256 assetPriceUsd;
    uint256 quotePriceUsd;
    uint48 updatedAt;
    uint80 roundId;
}
```

**Properties**

| Name            | Type      | Description                        |
| --------------- | --------- | ---------------------------------- |
| `assetPriceUsd` | `uint256` | Cached asset USD price             |
| `quotePriceUsd` | `uint256` | Cached quote USD price             |
| `updatedAt`     | `uint48`  | Timestamp of snapshot write        |
| `roundId`       | `uint80`  | Monotonic pair cache write counter |

### NonContractAssetMetadata

Stored metadata for a non-contract asset

```solidity
struct NonContractAssetMetadata {
    bool registered;
    uint8 decimals;
    string symbol;
}
```

**Properties**

| Name         | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `registered` | `bool`   | Whether metadata is configured for the asset |
| `decimals`   | `uint8`  | Amount decimal scale for the asset           |
| `symbol`     | `string` | Display symbol for the asset                 |

### PairSnapshot

Internal pair snapshot storage in canonical token order

```solidity
struct PairSnapshot {
    uint256 token0PriceUsd;
    uint256 token1PriceUsd;
    uint48 updatedAt;
    uint80 roundId;
    uint64 token0Epoch;
    uint64 token1Epoch;
}
```

**Properties**

| Name             | Type      | Description                                       |
| ---------------- | --------- | ------------------------------------------------- |
| `token0PriceUsd` | `uint256` | Cached USD price for the lower-sorted asset       |
| `token1PriceUsd` | `uint256` | Cached USD price for the higher-sorted asset      |
| `updatedAt`      | `uint48`  | Timestamp of snapshot write                       |
| `roundId`        | `uint80`  | Monotonic pair cache write counter                |
| `token0Epoch`    | `uint64`  | Asset invalidation epoch for token0 at cache time |
| `token1Epoch`    | `uint64`  | Asset invalidation epoch for token1 at cache time |
