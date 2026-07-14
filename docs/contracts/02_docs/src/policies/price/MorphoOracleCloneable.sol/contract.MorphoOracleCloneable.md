# MorphoOracleCloneable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/price/MorphoOracleCloneable.sol)

**Inherits:**
[IMorphoOracle](/main/contracts/docs/src/policies/interfaces/price/IMorphoOracle.sol/interface.IMorphoOracle), [IOraclePriceCache](/main/contracts/docs/src/policies/interfaces/price/IOraclePriceCache.sol/interface.IOraclePriceCache), Clone

**Title:**
MorphoOracleCloneable

**Author:**
OlympusDAO

forge-lint: disable-start(mixed-case-function,mixed-case-variable)

Oracle adapter that implements Morpho's IOracle interface from cached collateral/loan pair snapshots

Returns the price of 1 collateral token quoted in loan tokens, scaled by 1e36 as required by Morpho's IOracle interface.
The price precision is 36 + loan_token_decimals - collateral_token_decimals.
This contract is deployed as a clone with immutable args.

## State Variables

### \_MORPHO_DECIMALS

```solidity
uint8 internal constant _MORPHO_DECIMALS = 36
```

## Functions

### factory

The factory address

Does not revert.

```solidity
function factory() public pure returns (IOracleFactory);
```

**Returns**

| Name     | Type             | Description                                  |
| -------- | ---------------- | -------------------------------------------- |
| `<none>` | `IOracleFactory` | The factory address stored in immutable args |

### collateralToken

The collateral token address

Does not revert.

```solidity
function collateralToken() public pure returns (address);
```

**Returns**

| Name     | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| `<none>` | `address` | address The collateral token address stored in immutable args |

### loanToken

The loan token address

Does not revert.

```solidity
function loanToken() public pure returns (address);
```

**Returns**

| Name     | Type      | Description                                             |
| -------- | --------- | ------------------------------------------------------- |
| `<none>` | `address` | address The loan token address stored in immutable args |

### scaleFactor

The scale factor for the oracle

Uses the current asset decimals reported by the factory's active price cache.
For non-contract assets, decimals are PriceCache metadata rather than token
metadata, so this value can change when `PriceCache.setNonContractAssetMetadata()`
updates decimals. Call `PriceCache.assetDecimals()` to confirm the active NCA scale.

```solidity
function scaleFactor() public view returns (uint256);
```

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `uint256` | uint256 The current scale factor |

### maxAge

The maximum allowed age for cached prices

Does not revert.

```solidity
function maxAge() public pure override returns (uint48);
```

**Returns**

| Name     | Type     | Description                                 |
| -------- | -------- | ------------------------------------------- |
| `<none>` | `uint48` | uint48 The max age stored in immutable args |

### name

The name of the oracle

Does not revert.

```solidity
function name() public pure returns (string memory);
```

**Returns**

| Name     | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `<none>` | `string` | string The name stored in immutable args |

### \_getEnabledPriceCache

Returns the enabled price cache policy for this oracle.

Calls `factory().getOracleContext(address(this))` to read the enabled state and
price cache address for the current contract. Reverts with `MorphoOracle_NotEnabled()`
when the returned enabled flag is false. Assumes the factory returns a valid
`IPriceCache` address.

```solidity
function _getEnabledPriceCache() internal view returns (IPriceCache priceCache_);
```

**Returns**

| Name          | Type          | Description                                     |
| ------------- | ------------- | ----------------------------------------------- |
| `priceCache_` | `IPriceCache` | The enabled price cache policy for this oracle. |

### price

Returns the price of 1 collateral token quoted in loan tokens, scaled by 1e36

This function uses cached pair snapshots only.

The Morpho scale factor is recomputed from the active price cache's current
collateral and loan decimals. If either asset is a non-contract asset, decimals
are PriceCache metadata rather than token metadata and can change when
`PriceCache.setNonContractAssetMetadata()` updates decimals. Call
`PriceCache.assetDecimals()` to confirm the active NCA scale.
This function will revert if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The `IPriceCache.getCachedPrice()` call reverts because the cache policy is
  deactivated in Kernel or the cache contract is disabled
- The collateral/loan pair is invalid for the configured cache policy
- Either the collateral or loan token cached price is zero
- The cached timestamp is stale
  If callers encounter a feed-state revert, they should cache prices then retry.
  A caller can alternatively call `isStale()`, call `cachePrice()` (if the result is true), and then this function.

```solidity
function price() external view override returns (uint256);
```

### \_scaleFactor

Calculates the current Morpho scale factor from the active price cache

Morpho expects prices scaled by 1e36, adjusted for collateral and loan token
decimals: `10 ** (36 + loanDecimals - collateralDecimals)`.
For non-contract assets, decimals are PriceCache metadata and can change when
`PriceCache.setNonContractAssetMetadata()` updates them, so the scale factor is
recalculated instead of read from immutable args.
Reverts if the exponent is negative or greater than 77, since `10 ** 78` exceeds
`uint256`.

```solidity
function _scaleFactor(IPriceCache priceCache_) internal view returns (uint256 scaleFactor_);
```

**Parameters**

| Name          | Type          | Description                                                |
| ------------- | ------------- | ---------------------------------------------------------- |
| `priceCache_` | `IPriceCache` | The price cache used to resolve the current asset decimals |

**Returns**

| Name           | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| `scaleFactor_` | `uint256` | The current Morpho scale factor |

### \_isStaleFromTimestamp

```solidity
function _isStaleFromTimestamp(uint48 timestamp_, uint48 maxAge_) internal view returns (bool);
```

### \_latestPermissibleTimestamp

```solidity
function _latestPermissibleTimestamp(uint48 maxAge_) internal view returns (uint256);
```

### isStale

Returns whether the cached feed state is stale.

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The `IPriceCache.isStale()` call reverts because the cache policy is
  deactivated in Kernel or the cache contract is disabled
- The configured pair is invalid for the active cache policy

```solidity
function isStale() external view override returns (bool);
```

**Returns**

| Name     | Type   | Description                                                             |
| -------- | ------ | ----------------------------------------------------------------------- |
| `<none>` | `bool` | isStale\_ Returns true if the pair cache is unset or older than maxAge. |

### timestamp

Returns the cached timestamp for the collateral/loan pair.

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The configured pair is invalid for the active cache policy

```solidity
function timestamp() external view override returns (uint48);
```

**Returns**

| Name     | Type     | Description                                            |
| -------- | -------- | ------------------------------------------------------ |
| `<none>` | `uint48` | timestamp\_ Returns the timestamp of the cached prices |

### cachePrice

Triggers a cache update for the oracle's configured pair

Unconditionally asks the factory to cache the configured pair.
The factory validates caller/oracle/factory enabled state.
Reverts if:

- The factory is disabled
- The caller is not a deployed oracle from this factory
- The caller oracle is disabled
- The configured pair is invalid in the active cache policy
- The active cache policy reverts while evaluating staleness or caching

```solidity
function cachePrice() external override;
```

### cachePriceIfNecessary

Triggers a cache update only when the oracle's configured pair cache is stale

Defers staleness checks to the factory using this oracle's configured maxAge.
Reverts if:

- The factory is disabled
- The caller is not a deployed oracle from this factory
- The caller oracle is disabled
- The configured pair is invalid in the active cache policy
- The active cache policy reverts while evaluating staleness or caching

```solidity
function cachePriceIfNecessary() external override;
```

### supportsInterface

Query if a contract implements an interface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public pure returns (bool);
```

**Parameters**

| Name           | Type     | Description                                       |
| -------------- | -------- | ------------------------------------------------- |
| `interfaceId_` | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name     | Type   | Description                                                            |
| -------- | ------ | ---------------------------------------------------------------------- |
| `<none>` | `bool` | bool true if the contract implements interfaceId\_ and false otherwise |
