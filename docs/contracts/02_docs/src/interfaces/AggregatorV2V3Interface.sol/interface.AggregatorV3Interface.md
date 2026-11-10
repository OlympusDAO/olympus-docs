# AggregatorV3Interface

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/AggregatorV2V3Interface.sol)

## Functions

<a id="decimals"></a>

### decimals

```solidity
function decimals() external view returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

<a id="description"></a>

### description

```solidity
function description() external view returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="version"></a>

### version

```solidity
function version() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getrounddata-uint80"></a>

### getRoundData

```solidity
function getRoundData(
        uint80 _roundId
    )
        external
        view
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
| _roundId | `uint80` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId | `uint80` |  |
| answer | `int256` |  |
| startedAt | `uint256` |  |
| updatedAt | `uint256` |  |
| answeredInRound | `uint80` |  |

<a id="latestrounddata"></a>

### latestRoundData

```solidity
function latestRoundData()
        external
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

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId | `uint80` |  |
| answer | `int256` |  |
| startedAt | `uint256` |  |
| updatedAt | `uint256` |  |
| answeredInRound | `uint80` |  |
