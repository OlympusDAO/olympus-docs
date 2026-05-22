# IChainlinkOracle

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/interfaces/price/IChainlinkOracle.sol)

**Inherits:**
[AggregatorV2V3Interface](/main/contracts/docs/src/interfaces/AggregatorV2V3Interface.sol/interface.AggregatorV2V3Interface)

**Title:**
IChainlinkOracle

**Author:**
OlympusDAO

Interface for a Chainlink-compatible oracle

## Functions

### baseToken

The base token address

```solidity
function baseToken() external view returns (address baseToken_);
```

**Returns**

| Name         | Type      | Description            |
| ------------ | --------- | ---------------------- |
| `baseToken_` | `address` | The base token address |

### quoteToken

The quote token address

```solidity
function quoteToken() external view returns (address quoteToken_);
```

**Returns**

| Name          | Type      | Description             |
| ------------- | --------- | ----------------------- |
| `quoteToken_` | `address` | The quote token address |

### maxAge

The maximum allowed age for cached prices

```solidity
function maxAge() external view returns (uint48 maxAge_);
```

**Returns**

| Name      | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| `maxAge_` | `uint48` | The configured maximum cache age in seconds |

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

Returns whether the cached pair round should be considered stale.

```solidity
function isStale() external view returns (bool isStale_);
```

**Returns**

| Name       | Type   | Description                                                     |
| ---------- | ------ | --------------------------------------------------------------- |
| `isStale_` | `bool` | true if the direct pair cache is unset or older than `maxAge()` |

## Errors

### ChainlinkOracle_NotEnabled

Thrown when the oracle is not enabled

```solidity
error ChainlinkOracle_NotEnabled();
```

### ChainlinkOracle_NoDataPresent

Thrown when requested round data is not available

```solidity
error ChainlinkOracle_NoDataPresent();
```

### ChainlinkOracle_Stale

Thrown when the direct pair cache is older than maxAge

```solidity
error ChainlinkOracle_Stale(uint256 cachedTimestamp, uint256 latestPermissibleTimestamp);
```

**Parameters**

| Name                         | Type      | Description                                                     |
| ---------------------------- | --------- | --------------------------------------------------------------- |
| `cachedTimestamp`            | `uint256` | The cached timestamp used for the base/quote pair               |
| `latestPermissibleTimestamp` | `uint256` | The oldest permissible timestamp (`block.timestamp - maxAge()`) |
