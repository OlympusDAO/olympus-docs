# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/modules/ROLES/OlympusRoles.sol)

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
