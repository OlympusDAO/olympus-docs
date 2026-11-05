# IERC7726OraclePriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/price/IERC7726OraclePriceCache.sol)

**Title:** IERC7726OraclePriceCache

**Author:** OlympusDAO

Pair-level cache interface for oracle clones

<i>

Use this interface for clone contracts that expose cache helpers for arbitrary
base/quote pairs while applying their own configured max-age policy internally.

</i>

## Functions

<a id="cacheprice-address-address"></a>

### cachePrice

Updates the cached direct pair unconditionally

```solidity
function cachePrice(address base_, address quote_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset address |
| quote_ | `address` | The quote asset address |

<a id="cachepriceifnecessary-address-address"></a>

### cachePriceIfNecessary

Updates the cached direct pair only if stale or unset

```solidity
function cachePriceIfNecessary(address base_, address quote_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset address |
| quote_ | `address` | The quote asset address |
