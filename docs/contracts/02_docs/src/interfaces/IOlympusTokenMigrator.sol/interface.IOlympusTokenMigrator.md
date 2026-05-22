# IOlympusTokenMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/interfaces/IOlympusTokenMigrator.sol)

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
