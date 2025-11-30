# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/ROLES/OlympusRoles.sol)

Abstract contract to have the `onlyRole` modifier

Inheriting this automatically makes ROLES module a dependency

## State Variables

### ROLES

```solidity
ROLESv1 public ROLES
```

## Functions

### onlyRole

```solidity
modifier onlyRole(bytes32 role_) ;
```
