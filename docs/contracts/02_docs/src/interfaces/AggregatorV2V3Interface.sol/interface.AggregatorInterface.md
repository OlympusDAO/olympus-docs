# AggregatorInterface

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/AggregatorV2V3Interface.sol)

## Functions

<a id="latestanswer"></a>

### latestAnswer

```solidity
function latestAnswer() external view returns (int256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int256` |  |

<a id="latesttimestamp"></a>

### latestTimestamp

```solidity
function latestTimestamp() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="latestround"></a>

### latestRound

```solidity
function latestRound() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getanswer-uint256"></a>

### getAnswer

```solidity
function getAnswer(uint256 roundId) external view returns (int256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `int256` |  |

<a id="gettimestamp-uint256"></a>

### getTimestamp

```solidity
function getTimestamp(uint256 roundId) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Events

### AnswerUpdated

```solidity
event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| current | `int256` |  |
| roundId | `uint256` |  |
| updatedAt | `uint256` |  |

### NewRound

```solidity
event NewRound(uint256 indexed roundId, address indexed startedBy, uint256 startedAt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundId | `uint256` |  |
| startedBy | `address` |  |
| startedAt | `uint256` |  |
