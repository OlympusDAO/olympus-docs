# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/ROLES/OlympusRoles.sol)

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
