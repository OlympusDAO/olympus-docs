# IOlympusTokenMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/interfaces/IOlympusTokenMigrator.sol)

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
