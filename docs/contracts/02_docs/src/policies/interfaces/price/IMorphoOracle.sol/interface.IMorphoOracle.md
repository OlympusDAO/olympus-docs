# IMorphoOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/interfaces/price/IMorphoOracle.sol)

**Inherits:**
[IOracle](/main/contracts/docs/src/interfaces/morpho/IOracle.sol/interface.IOracle)

**Title:**
IMorphoOracle

**Author:**
OlympusDAO

Interface for a Morpho oracle

## Functions

### collateralToken

The collateral token address

```solidity
function collateralToken() external view returns (address collateralToken_);
```

**Returns**

| Name               | Type      | Description                  |
| ------------------ | --------- | ---------------------------- |
| `collateralToken_` | `address` | The collateral token address |

### loanToken

The loan token address

```solidity
function loanToken() external view returns (address loantoken_);
```

**Returns**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `loantoken_` | `address` | The loan token address |

### maxAge

The maximum allowed age for cached prices

```solidity
function maxAge() external view returns (uint48 maxAge_);
```

**Returns**

| Name      | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| `maxAge_` | `uint48` | The configured maximum cache age in seconds |

### scaleFactor

The current scale factor for the oracle

Uses the active price cache's current asset decimals. For non-contract assets,
decimals are PriceCache metadata rather than token metadata, so this value can
change when `PriceCache.setNonContractAssetMetadata()` updates decimals. Call
`PriceCache.assetDecimals()` to confirm the active NCA scale.

```solidity
function scaleFactor() external view returns (uint256 scaleFactor_);
```

**Returns**

| Name           | Type      | Description      |
| -------------- | --------- | ---------------- |
| `scaleFactor_` | `uint256` | The scale factor |

### name

The name of the oracle

```solidity
function name() external view returns (string memory name_);
```

**Returns**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `name_` | `string` | The name    |

### isStale

Returns whether the cached feed state is stale.

```solidity
function isStale() external view returns (bool isStale_);
```

**Returns**

| Name       | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| `isStale_` | `bool` | Returns true if the pair cache is unset or older than maxAge. |

### timestamp

Returns the cached timestamp for the collateral/loan pair.

```solidity
function timestamp() external view returns (uint48 timestamp_);
```

**Returns**

| Name         | Type     | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `timestamp_` | `uint48` | Returns the timestamp of the cached prices |

## Errors

### MorphoOracle_NotEnabled

Thrown when the oracle is not enabled

```solidity
error MorphoOracle_NotEnabled();
```

### MorphoOracle_InvalidPrice

Thrown when the cached direct-pair USD legs are invalid

```solidity
error MorphoOracle_InvalidPrice();
```

### MorphoOracle_TokenDecimalsOutOfBounds

Thrown when token decimals result in an invalid scale factor

```solidity
error MorphoOracle_TokenDecimalsOutOfBounds(
    address collateralToken, address loanToken, uint8 collateralDecimals, uint8 loanDecimals
);
```

**Parameters**

| Name                 | Type      | Description                                                      |
| -------------------- | --------- | ---------------------------------------------------------------- |
| `collateralToken`    | `address` | The collateral token address                                     |
| `loanToken`          | `address` | The loan token address                                           |
| `collateralDecimals` | `uint8`   | The collateral token decimals reported by the active price cache |
| `loanDecimals`       | `uint8`   | The loan token decimals reported by the active price cache       |

### MorphoOracle_Stale

Thrown when the direct pair cache timestamp is stale

```solidity
error MorphoOracle_Stale(uint256 cachedTimestamp, uint256 latestPermissibleTimestamp);
```

**Parameters**

| Name                         | Type      | Description                                                     |
| ---------------------------- | --------- | --------------------------------------------------------------- |
| `cachedTimestamp`            | `uint256` | The cached timestamp used for the collateral/loan pair          |
| `latestPermissibleTimestamp` | `uint256` | The oldest permissible timestamp (`block.timestamp - maxAge()`) |
