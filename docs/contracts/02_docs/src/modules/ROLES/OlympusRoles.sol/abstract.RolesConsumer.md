# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/modules/ROLES/OlympusRoles.sol)

Abstract contract to have the `onlyRole` modifier

*Inheriting this automatically makes ROLES module a dependency*

## State Variables

### ROLES

```solidity
ROLESv1 public ROLES;
```

## Functions

### onlyRole

```solidity
modifier onlyRole(bytes32 role_);
```
