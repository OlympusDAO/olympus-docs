# IOlympusTokenMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/interfaces/IOlympusTokenMigrator.sol)

## Functions

### migrate

```solidity
function migrate(uint256 _amount, TYPE _from, TYPE _to) external;
```

### oldSupply

```solidity
function oldSupply() external view returns (uint256);
```

## Enums

### TYPE

```solidity
enum TYPE {
    UNSTAKED,
    STAKED,
    WRAPPED
}
```
