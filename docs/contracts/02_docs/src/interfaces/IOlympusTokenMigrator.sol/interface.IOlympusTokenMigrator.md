# IOlympusTokenMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/interfaces/IOlympusTokenMigrator.sol)

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
