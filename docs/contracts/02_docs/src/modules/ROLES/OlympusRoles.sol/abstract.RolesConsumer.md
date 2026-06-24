# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/modules/ROLES/OlympusRoles.sol)

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
