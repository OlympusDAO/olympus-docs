# PolicyAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/utils/PolicyAdmin.sol)

**Inherits:**
[RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Functions

### onlyEmergencyOrAdminRole

Modifier that reverts if the caller does not have the emergency or admin role

```solidity
modifier onlyEmergencyOrAdminRole();
```

### onlyManagerOrAdminRole

Modifier that reverts if the caller does not have the manager or admin role

```solidity
modifier onlyManagerOrAdminRole();
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

### onlyManagerRole

Modifier that reverts if the caller does not have the manager role

```solidity
modifier onlyManagerRole();
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

### _isManager

Check if an account has the manager role

```solidity
function _isManager(address account_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|The account to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true if the account has the manager role, false otherwise|

## Errors

### NotAuthorised

```solidity
error NotAuthorised();
```
