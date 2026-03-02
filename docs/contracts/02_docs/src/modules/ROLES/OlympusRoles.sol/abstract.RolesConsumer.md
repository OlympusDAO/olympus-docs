# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/modules/ROLES/OlympusRoles.sol)

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
