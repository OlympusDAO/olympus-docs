# PolicyAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/utils/PolicyAdmin.sol)

**Inherits:**
[RolesConsumer](/main/technical/contract-docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Functions

### onlyEmergencyOrAdminRole

Modifier that reverts if the caller does not have the emergency or admin role

```solidity
modifier onlyEmergencyOrAdminRole();
```

### onlyAdminRole

Modifier that reverts if the caller does not have the admin role

```solidity
modifier onlyAdminRole();
```

### onlyEmergencyRole

Modifier that reverts if the caller does not have the emergency role

```solidity
modifier onlyEmergencyRole();
```

### _isAdmin

Check if an account has the admin role

```solidity
function _isAdmin(address account_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true if the account has the admin role, false otherwise|

### _isEmergency

Check if an account has the emergency role

```solidity
function _isEmergency(address account_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true if the account has the emergency role, false otherwise|

## Errors

### NotAuthorised

```solidity
error NotAuthorised();
```
