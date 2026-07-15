# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/modules/ROLES/OlympusRoles.sol)

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
