# ChainlinkOracleCloneable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/price/ChainlinkOracleCloneable.sol)

**Inherits:** [IChainlinkOracle](/main/contracts/docs/src/policies/interfaces/price/IChainlinkOracle.sol/interface.IChainlinkOracle), [IOraclePriceCache](/main/contracts/docs/src/policies/interfaces/price/IOraclePriceCache.sol/interface.IOraclePriceCache), Clone

**Title:** ChainlinkOracleCloneable

**Author:** OlympusDAO

Oracle adapter that implements Chainlink's AggregatorV2V3Interface from cached base/quote pair snapshots

## Constants

### _VERSION

```solidity
uint8 internal constant _VERSION = 1;
```

## Functions

<a id="factory"></a>

### factory

The factory address

<i>

Does not revert.

</i>

```solidity
function factory() public pure returns (IOracleFactory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IOracleFactory` | The factory address stored in immutable args |

<a id="basetoken"></a>

### baseToken

The base token address

<i>

Does not revert.

</i>

```solidity
function baseToken() public pure override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | address The base token address stored in immutable args |

<a id="quotetoken"></a>

### quoteToken

The quote token address

<i>

Does not revert.

</i>

```solidity
function quoteToken() public pure override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | address The quote token address stored in immutable args |

<a id="_pricedecimals"></a>

### _priceDecimals

The cache decimal scale captured at creation time

<i>

This value is intentionally immutable per oracle instance.

</i>

```solidity
function _priceDecimals() internal pure returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | uint8 The cache decimal scale stored in immutable args |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` | uint48 The max age stored in immutable args |

<a id="name"></a>

### name

The name of the oracle

<i>

Does not revert.

</i>

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | string The name stored in immutable args |

<a id="_getenabledpricecache"></a>

### _getEnabledPriceCache

Returns the enabled price cache policy for this oracle.

<i>

Calls `factory().getOracleContext(address(this))` to read the oracle liveness
context and configured cache policy from the factory. Reverts with
`ChainlinkOracle_NotEnabled()` if the returned context is disabled or if the
factory does not provide a valid price cache address. Reverts from
`getOracleContext` bubble up, including when the factory policy is inactive or
this oracle was not created by the factory.

</i>

```solidity
function _getEnabledPriceCache() internal view returns (IPriceCache priceCache_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| priceCache_ | `IPriceCache` | The configured price cache policy, expected to be a non-zero address. |

<a id="decimals"></a>

### decimals

<i>

Does not revert.

</i>

```solidity
function decimals() external pure override returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | uint8   The number of decimals |

<a id="description"></a>

### description

<i>

Does not revert.

</i>

```solidity
function description() external pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` | string  The oracle name |

<a id="version"></a>

### version

<i>

Does not revert.

</i>

```solidity
function version() external pure override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The version number |

<a id="_latestrounddatainternal"></a>

### _latestRoundDataInternal

<i>

This function uses cached pair snapshots only (round-style semantics).
It does not fallback to live pricing when caches are stale and does not
enforce maxAge().

</i>

This function will revert if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The `IPriceCache.getCachedPrice()` call reverts because the cache policy is
deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

If callers encounter a revert due to feed state, they should cache prices then retry.

```solidity
function _latestRoundDataInternal()
        internal
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
```

**Returns**

| Name            | Type      | Description                                                              |
| --------------- | --------- | ------------------------------------------------------------------------ |
| roundId         | `uint80`  | The cached pair round ID                                                 |
| answer          | `int256`  | The price of 1 base token in quote tokens, scaled by 10^decimals()       |
| startedAt       | `uint256` | The timestamp when the round started (same as updatedAt)                 |
| updatedAt       | `uint256` | The timestamp when the round was updated (from the cached pair snapshot) |
| answeredInRound | `uint80`  | The round ID (same as roundId)                                           |

<a id="_isstalefromtimestamp-uint256-uint48"></a>

### _isStaleFromTimestamp

Checks whether a timestamp is stale for the configured freshness window.

<i>

Returns true when `timestamp_` is zero or when it is older than `maxAge_`.

</i>

```solidity
function _isStaleFromTimestamp(
        uint256 timestamp_,
        uint48 maxAge_
    ) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timestamp_ | `uint256` | Timestamp to evaluate. |
| maxAge_ | `uint48` | Maximum acceptable age, in seconds. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | isStale_  Whether the timestamp is zero or too old. |

<a id="_latestpermissibletimestamp-uint48"></a>

### _latestPermissibleTimestamp

Computes the oldest timestamp that is still acceptable for fresh round data.

<i>

Returns 0 when `block.timestamp &lt;= maxAge_`; otherwise returns
`block.timestamp - uint256(maxAge_)`.

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

<a id="_latestrounddatafreshinternal"></a>

### _latestRoundDataFreshInternal

Returns latest round data after enforcing `maxAge()` freshness.

<i>

Reverts with `ChainlinkOracle_Stale(updatedAt, latestPermissibleTimestamp)` when
the returned `updatedAt` is stale according to `_isStaleFromTimestamp(updatedAt, maxAge())`.

</i>

```solidity
function _latestRoundDataFreshInternal()
        internal
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
```

**Returns**

| Name            | Type      | Description                                         |
| --------------- | --------- | --------------------------------------------------- |
| roundId         | `uint80`  | Latest round identifier.                            |
| answer          | `int256`  | Latest answer.                                      |
| startedAt       | `uint256` | Timestamp when the latest round started.            |
| updatedAt       | `uint256` | Timestamp when the latest round answer was updated. |
| answeredInRound | `uint80`  | Round identifier in which the answer was computed.  |

<a id="latestrounddata"></a>

### latestRoundData

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The cached pair observation is stale (`updatedAt + maxAge() &lt; block.timestamp`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

</i>

```solidity
function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
```

**Returns**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| roundId         | `uint80`  |             |
| answer          | `int256`  |             |
| startedAt       | `uint256` |             |
| updatedAt       | `uint256` |             |
| answeredInRound | `uint80`  |             |

<a id="isstale"></a>

### isStale

Returns whether the cached pair round should be considered stale.

<i>

Chainlink-style round readers may consume stale rounds. This flag allows
consumers to detect stale or missing cached state before reading.
Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The `IPriceCache.isStale()` call reverts because the cache policy is
deactivated in Kernel or the cache contract is disabled
- The configured pair is invalid for the active cache policy

</i>

```solidity
function isStale() external view override returns (bool);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | true if the direct pair cache is unset or older than `maxAge()` |

<a id="getrounddata-uint80"></a>

### getRoundData

<i>

Only supports the latest round. For any other round ID, reverts with ChainlinkOracle_NoDataPresent().

</i>

This function will revert if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

This function does not revert when the latest cached round is stale.

```solidity
function getRoundData(
        uint80 roundId_
    )
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId_ | `uint80` | The round ID to query |

**Returns**

| Name            | Type      | Description                                                        |
| --------------- | --------- | ------------------------------------------------------------------ |
| roundId         | `uint80`  | The round ID                                                       |
| answer          | `int256`  | The price of 1 base token in quote tokens, scaled by 10^decimals() |
| startedAt       | `uint256` | The timestamp when the round started                               |
| updatedAt       | `uint256` | The timestamp when the round was updated                           |
| answeredInRound | `uint80`  | The round ID                                                       |

<a id="latestanswer"></a>

### latestAnswer

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The cached pair observation is stale (`updatedAt + maxAge() &lt; block.timestamp`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

</i>

```solidity
function latestAnswer() external view override returns (int256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int256` | int256  The latest price |

<a id="latesttimestamp"></a>

### latestTimestamp

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

</i>

This function does not revert when the latest cached round is stale.

```solidity
function latestTimestamp() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The latest timestamp |

<a id="latestround"></a>

### latestRound

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)

</i>

This function does not revert when the latest cached round is stale.

```solidity
function latestRound() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The latest round ID |

<a id="getanswer-uint256"></a>

### getAnswer

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)
- `roundId_` is not the latest round ID

</i>

This function does not revert when the latest cached round is stale.

```solidity
function getAnswer(uint256 roundId_) external view override returns (int256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId_ | `uint256` | The round ID to query |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int256` | int256  The answer for the given round ID |

<a id="gettimestamp-uint256"></a>

### getTimestamp

<i>

Reverts if:

- The oracle is not enabled in the factory context
- The factory policy is deactivated in Kernel (checked via factory.getOracleContext())
- The cache policy is deactivated in Kernel or the cache contract is disabled
- The base/quote pair is invalid for the configured cache policy
- Either cached USD leg is zero
- No cached pair observation is present (`updatedAt == 0`)
- The computed pair price rounds down to zero (`price == 0` after `FullMath.mulDiv(...)`)
- The computed pair price cannot be cast to int256 (`answer = SafeCast.toInt256(price)`)
- `roundId_` is not the latest round ID

</i>

This function does not revert when the latest cached round is stale.

```solidity
function getTimestamp(uint256 roundId_) external view override returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId_ | `uint256` | The round ID to query |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The timestamp for the given round ID |

<a id="cacheprice"></a>

### cachePrice

Triggers a cache update for the oracle's configured pair

<i>

Unconditionally asks the factory to cache the configured pair.
Reverts if:

- The factory policy is deactivated in Kernel
- The factory is disabled
- This contract is not a deployed oracle from the factory
- This contract is not enabled in the factory
- The configured pair is invalid in the active cache policy

</i>

```solidity
function cachePrice() external override;
```

<a id="cachepriceifnecessary"></a>

### cachePriceIfNecessary

Triggers a cache update only when the oracle's configured pair cache is stale

<i>

Defers staleness checks to the factory using this oracle's configured maxAge.
Reverts if:

- The factory policy is deactivated in Kernel
- The factory is disabled
- This contract is not a deployed oracle from the factory
- This contract is not enabled in the factory
- The configured pair is invalid in the active cache policy

</i>

```solidity
function cachePriceIfNecessary() external override;
```

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
| &lt;none&gt; | `bool` | bool            true if the contract implements interfaceId_ and false otherwise |
