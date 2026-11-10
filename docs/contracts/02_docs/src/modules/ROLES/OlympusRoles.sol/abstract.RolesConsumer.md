# RolesConsumer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/ROLES/OlympusRoles.sol)

Abstract contract to have the `onlyRole` modifier

<i>

Inheriting this automatically makes ROLES module a dependency

</i>

## State Variables

### ROLES

```solidity
ROLESv1 public ROLES;
```

## Functions

<a id="onlyrole-bytes32"></a>

### onlyRole

```solidity
modifier onlyRole(bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
