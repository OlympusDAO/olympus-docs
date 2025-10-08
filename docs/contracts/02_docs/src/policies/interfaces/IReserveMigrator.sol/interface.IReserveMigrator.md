# IReserveMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/interfaces/IReserveMigrator.sol)

## Functions

### migrate

migrate reserves and wrapped reserves in the treasury to the new reserve token

*this function is restricted to the heart role to avoid complications with opportunistic conversions*

*if no migration is required or it is deactivated, the function does nothing*

```solidity
function migrate() external;
```

## Events

### MigratedReserves

```solidity
event MigratedReserves(address indexed from, address indexed to, uint256 amount);
```

### Activated

```solidity
event Activated();
```

### Deactivated

```solidity
event Deactivated();
```

## Errors

### ReserveMigrator_InvalidParams

```solidity
error ReserveMigrator_InvalidParams();
```

### ReserveMigrator_BadMigration

```solidity
error ReserveMigrator_BadMigration();
```
