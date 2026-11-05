# IERC7726Oracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/price/IERC7726Oracle.sol)

**Inherits:** [IPriceOracle](/main/contracts/docs/src/policies/interfaces/price/IPriceOracle.sol/interface.IPriceOracle)

**Title:** IERC7726Oracle

ERC7726 oracle interface extending Euler's common IPriceOracle.

## Functions

<a id="maxage"></a>

### maxAge

Get the maximum allowed age for cached prices.

```solidity
function maxAge() external view returns (uint48 maxAge_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxAge_ | `uint48` | The configured maximum cache age in seconds. |

<a id="isstale-address-address"></a>

### isStale

Returns whether the direct pair cache is stale for a given pair.

```solidity
function isStale(address base, address quote) external view returns (bool isStale_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base | `address` | The address of the base token |
| quote | `address` | The address of the quote token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isStale_ | `bool` |    Returns true if the pair cache is unset or older than maxAge. |

<a id="timestamp-address-address"></a>

### timestamp

Returns the cached timestamp used for a given base/quote pair.

```solidity
function timestamp(address base, address quote) external view returns (uint48 timestamp_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| base | `address` | The address of the base token |
| quote | `address` | The address of the quote token |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timestamp_ | `uint48` |  The cached UNIX timestamp (`uint48`) for this base/quote pair used to judge staleness. |

## Errors

### ERC7726Oracle_NotEnabled

Thrown when the oracle is not enabled in the factory

```solidity
error ERC7726Oracle_NotEnabled();
```

### ERC7726Oracle_Stale

Thrown when the direct pair cache is unset or stale

```solidity
error ERC7726Oracle_Stale(uint256 cachedTimestamp, uint256 latestPermissibleTimestamp);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cachedTimestamp | `uint256` | The cached timestamp used for the requested base/quote pair |
| latestPermissibleTimestamp | `uint256` | The oldest permissible timestamp (`block.timestamp - maxAge()`),<br/>floored to 0 when `block.timestamp &lt;= maxAge()`. A zero value is<br/>valid and means there is no lower timestamp bound yet. |
