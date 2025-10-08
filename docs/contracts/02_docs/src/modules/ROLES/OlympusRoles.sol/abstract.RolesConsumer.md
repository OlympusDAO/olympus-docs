# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/modules/ROLES/OlympusRoles.sol)

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
