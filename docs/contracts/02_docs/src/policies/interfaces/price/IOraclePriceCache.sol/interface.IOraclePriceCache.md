# IOraclePriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/interfaces/price/IOraclePriceCache.sol)

**Title:**
IOraclePriceCache

**Author:**
OlympusDAO

Interface for pair oracle contracts that can trigger caching for their configured pair

Use this for pair oracles where the cached pair is embedded in oracle configuration,
so callers do not pass pair arguments.

## Functions

### cachePrice

Triggers a cache update for the oracle's configured pair

```solidity
function cachePrice() external;
```

### cachePriceIfNecessary

Triggers a cache update only when the oracle's configured pair cache is stale

```solidity
function cachePriceIfNecessary() external;
```
