# IReserveMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IReserveMigrator.sol)

## Functions

<a id="migrate"></a>

### migrate

migrate reserves and wrapped reserves in the treasury to the new reserve token

<i>

this function is restricted to the heart role to avoid complications with opportunistic conversions

</i>

<i>

if no migration is required or it is deactivated, the function does nothing

</i>

```solidity
function migrate() external;
```

## Events

### MigratedReserves

```solidity
event MigratedReserves(address indexed from, address indexed to, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` |  |
| to | `address` |  |
| amount | `uint256` |  |

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
