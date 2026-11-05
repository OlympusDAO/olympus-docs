# IOraclePriceCache

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/price/IOraclePriceCache.sol)

**Title:** IOraclePriceCache

**Author:** OlympusDAO

Interface for pair oracle contracts that can trigger caching for their configured pair

<i>

Use this for pair oracles where the cached pair is embedded in oracle configuration,
so callers do not pass pair arguments.

</i>

## Functions

<a id="cacheprice"></a>

### cachePrice

Triggers a cache update for the oracle's configured pair

```solidity
function cachePrice() external;
```

<a id="cachepriceifnecessary"></a>

### cachePriceIfNecessary

Triggers a cache update only when the oracle's configured pair cache is stale

```solidity
function cachePriceIfNecessary() external;
```
