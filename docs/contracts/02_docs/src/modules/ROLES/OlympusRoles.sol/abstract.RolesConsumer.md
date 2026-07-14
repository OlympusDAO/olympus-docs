# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/ROLES/OlympusRoles.sol)

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
