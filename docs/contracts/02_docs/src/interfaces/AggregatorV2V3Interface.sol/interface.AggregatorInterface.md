# AggregatorInterface

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/interfaces/AggregatorV2V3Interface.sol)

## Functions

### latestAnswer

```solidity
function latestAnswer() external view returns (int256);
```

### latestTimestamp

```solidity
function latestTimestamp() external view returns (uint256);
```

### latestRound

```solidity
function latestRound() external view returns (uint256);
```

### getAnswer

```solidity
function getAnswer(uint256 roundId) external view returns (int256);
```

### getTimestamp

```solidity
function getTimestamp(uint256 roundId) external view returns (uint256);
```

## Events

### AnswerUpdated

```solidity
event AnswerUpdated(int256 indexed current, uint256 indexed roundId, uint256 updatedAt);
```

### NewRound

```solidity
event NewRound(uint256 indexed roundId, address indexed startedBy, uint256 startedAt);
```
