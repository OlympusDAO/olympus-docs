# IERC7726OraclePriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/interfaces/price/IERC7726OraclePriceCache.sol)

**Title:**
IERC7726OraclePriceCache

**Author:**
OlympusDAO

Pair-level cache interface for oracle clones

Use this interface for clone contracts that expose cache helpers for arbitrary
base/quote pairs while applying their own configured max-age policy internally.

## Functions

### cachePrice

Updates the cached direct pair unconditionally

```solidity
function cachePrice(address base_, address quote_) external;
```

**Parameters**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `base_`  | `address` | The base asset address  |
| `quote_` | `address` | The quote asset address |

### cachePriceIfNecessary

Updates the cached direct pair only if stale or unset

```solidity
function cachePriceIfNecessary(address base_, address quote_) external;
```

**Parameters**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `base_`  | `address` | The base asset address  |
| `quote_` | `address` | The quote asset address |
