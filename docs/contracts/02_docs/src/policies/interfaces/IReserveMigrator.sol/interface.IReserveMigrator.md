# IReserveMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/interfaces/IReserveMigrator.sol)

## Functions

### migrate

migrate reserves and wrapped reserves in the treasury to the new reserve token

this function is restricted to the heart role to avoid complications with opportunistic conversions

if no migration is required or it is deactivated, the function does nothing

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
