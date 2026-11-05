# ERC7726OracleCloneable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/ERC7726OracleCloneable.sol)

**Inherits:** [IERC7726Oracle](/main/contracts/docs/src/policies/interfaces/price/IERC7726Oracle.sol/interface.IERC7726Oracle), [IERC7726OraclePriceCache](/main/contracts/docs/src/policies/interfaces/price/IERC7726OraclePriceCache.sol/interface.IERC7726OraclePriceCache), Clone

**Title:** ERC7726OracleCloneable

**Author:** OlympusDAO

Cloneable ERC7726 oracle that quotes any base/quote pair from cached pair snapshots

## Functions

<a id="factory"></a>

### factory

The factory address

<i>

Does not revert.

</i>

```solidity
function factory() public pure returns (IERC7726OracleFactory);
```

**Returns**

| Name         | Type                    | Description |
| ------------ | ----------------------- | ----------- |
| &lt;none&gt; | `IERC7726OracleFactory` |             |

<a id="maxage"></a>

### maxAge

The maximum allowed age for cached prices

<i>

Does not revert.

</i>

```solidity
function maxAge() public pure override returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="name"></a>

### name

Get the name of the oracle.

<i>

Does not revert.

</i>

```solidity
function name() external pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | The name of the oracle. |

<a id="_getenabledpricecache"></a>

### _getEnabledPriceCache

Returns the enabled price cache policy for this oracle.

<i>

Calls `factory().getOracleContext(address(this))` to read the enabled state and
price cache address for the current contract. Reverts with `ERC7726Oracle_NotEnabled()`
when the returned enabled flag is false. Assumes the factory returns a valid
`IPriceCache` address.

</i>

```solidity
function _getEnabledPriceCache() internal view returns (IPriceCache priceCache_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| priceCache_ | `IPriceCache` | The enabled price cache policy for this oracle. |

<a id="getquote-uint256-address-address"></a>

### getQuote

<i>

Uses cached pair snapshots only.

</i>

Reverts if:

- The oracle is disabled in the factory or the factory is deactivated in Kernel
- The `IPriceCache.getCachedPrice()` call reverts because the cache policy is
deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- The shared cached timestamp is stale
- Base/quote cached prices are zero
- The price cache cannot resolve amount decimals for either asset

If callers encounter a feed-state revert, they should cache prices then retry.
A caller can alternatively call `isStale()`, call `cachePrice()` (if the result is true), and then this function.

```solidity
function getQuote(
        uint256 inAmount,
        address base,
        address quote
    ) external view override returns (uint256 outAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inAmount | `uint256` | The amount of `base` to convert. |
| base | `address` | The token that is being priced. |
| quote | `address` | The token that is the unit of account. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| outAmount | `uint256` | The amount of `quote` that is equivalent to `inAmount` of `base`. |

<a id="_getquoteinternal-uint256-address-address"></a>

### _getQuoteInternal

```solidity
function _getQuoteInternal(
        uint256 inAmount_,
        address base_,
        address quote_
    ) internal view returns (uint256 outAmount_);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| inAmount_ | `uint256` |             |
| base_     | `address` |             |
| quote_    | `address` |             |

**Returns**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| outAmount_ | `uint256` |             |

<a id="getquotes-uint256-address-address"></a>

### getQuotes

Two-sided price: How much quote token you would get/spend for selling/buying inAmount of base token.

<i>

Returns symmetric bid/ask using the same quote value.
Reverts if:

- The oracle is disabled in the factory or the factory is deactivated in Kernel
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- The shared cached timestamp is stale
- Base/quote cached prices are zero
- The price cache cannot resolve amount decimals for either asset

</i>

```solidity
function getQuotes(
        uint256 inAmount,
        address base,
        address quote
    ) external view override returns (uint256 bidOutAmount, uint256 askOutAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inAmount | `uint256` | The amount of `base` to convert. |
| base | `address` | The token that is being priced. |
| quote | `address` | The token that is the unit of account. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bidOutAmount | `uint256` | The amount of `quote` you would get for selling `inAmount` of `base`. |
| askOutAmount | `uint256` | The amount of `quote` you would spend for buying `inAmount` of `base`. |

<a id="cacheprice-address-address"></a>

### cachePrice

Updates the cached direct pair unconditionally

<i>

Reverts if:

- The factory is disabled
- This contract is not a deployed oracle from the factory
- This contract is not enabled in the factory
- The active price cache rejects the pair

</i>

```solidity
function cachePrice(address base_, address quote_) external override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset address |
| quote_ | `address` | The quote asset address |

<a id="cachepriceifnecessary-address-address"></a>

### cachePriceIfNecessary

Updates the cached direct pair only if stale or unset

<i>

Reverts if:

- The factory is disabled
- This contract is not a deployed oracle from the factory
- This contract is not enabled in the factory
- The active price cache rejects the pair
- The active price cache reverts while evaluating staleness or caching

</i>

```solidity
function cachePriceIfNecessary(address base_, address quote_) external override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base_ | `address` | The base asset address |
| quote_ | `address` | The quote asset address |

<a id="_isstalefromtimestamp-uint48-uint48"></a>

### _isStaleFromTimestamp

```solidity
function _isStaleFromTimestamp(uint48 timestamp_, uint48 maxAge_) internal view returns (bool);
```

**Parameters**

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| timestamp_ | `uint48` |             |
| maxAge_    | `uint48` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_latestpermissibletimestamp-uint48"></a>

### _latestPermissibleTimestamp

Computes the oldest timestamp that is still permissible for freshness checks.

<i>

Returns 0 when `block.timestamp &lt;= maxAge_`; otherwise returns
`block.timestamp - uint256(maxAge_)`.

</i>

<i>

Does not revert.

</i>

<i>

A zero return value means every non-zero timestamp is permissible at the current
block timestamp. Callers can use this value in stale revert payloads to report the
lower freshness bound without implying that timestamp 0 is valid cached data.

</i>

```solidity
function _latestPermissibleTimestamp(uint48 maxAge_) internal view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxAge_ | `uint48` | Maximum acceptable age, in seconds. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | latestPermissible_ Oldest acceptable timestamp, or 0 if no positive lower bound exists. |

<a id="isstale-address-address"></a>

### isStale

Returns whether the direct pair cache is stale for a given pair.

<i>

Reverts if:

- The oracle is disabled in the factory or the factory is deactivated in Kernel
- The `IPriceCache.isStale()` call reverts because the cache policy is
deactivated in Kernel or the cache contract is disabled
- The active cache policy rejects `(base, quote)`

</i>

```solidity
function isStale(address base, address quote) external view override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base | `address` | The address of the base token |
| quote | `address` | The address of the quote token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | Returns true if the pair cache is unset or older than maxAge. |

<a id="timestamp-address-address"></a>

### timestamp

Returns the cached timestamp used for a given base/quote pair.

<i>

Returns 0 if the pair price has not been cached.
Reverts if:

- The oracle is disabled in the factory or the factory is deactivated in Kernel
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The active cache policy rejects `(base, quote)`

</i>

```solidity
function timestamp(address base, address quote) external view override returns (uint48);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base | `address` | The address of the base token |
| quote | `address` | The address of the quote token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` | The cached UNIX timestamp (`uint48`) for this base/quote pair used to judge staleness. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the contract implements `interfaceId_` |
