# AggregatorV3Interface

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/interfaces/AggregatorV2V3Interface.sol)

## Functions

### decimals

```solidity
function decimals() external view returns (uint8);
```

### description

```solidity
function description() external view returns (string memory);
```

### version

```solidity
function version() external view returns (uint256);
```

### getRoundData

```solidity
function getRoundData(uint80 _roundId)
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
```

### latestRoundData

```solidity
function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
```
