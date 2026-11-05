# PolicyAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/PolicyAdmin.sol)

**Inherits:** [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Functions

<a id="onlyemergencyoradminrole"></a>

### onlyEmergencyOrAdminRole

Modifier that reverts if the caller does not have the emergency or admin role

```solidity
modifier onlyEmergencyOrAdminRole();
```

<a id="onlymanageroradminrole"></a>

### onlyManagerOrAdminRole

Modifier that reverts if the caller does not have the manager or admin role

```solidity
modifier onlyManagerOrAdminRole();
```

<a id="onlyadminrole"></a>

### onlyAdminRole

Modifier that reverts if the caller does not have the admin role

```solidity
modifier onlyAdminRole();
```

<a id="onlyemergencyrole"></a>

### onlyEmergencyRole

Modifier that reverts if the caller does not have the emergency role

```solidity
modifier onlyEmergencyRole();
```

<a id="onlymanagerrole"></a>

### onlyManagerRole

Modifier that reverts if the caller does not have the manager role

```solidity
modifier onlyManagerRole();
```

<a id="_isadmin-address"></a>

### _isAdmin

Check if an account has the admin role

```solidity
function _isAdmin(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | true if the account has the admin role, false otherwise |

<a id="_isemergency-address"></a>

### _isEmergency

Check if an account has the emergency role

```solidity
function _isEmergency(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | true if the account has the emergency role, false otherwise |

<a id="_ismanager-address"></a>

### _isManager

Check if an account has the manager role

```solidity
function _isManager(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | true if the account has the manager role, false otherwise |

## Errors

### NotAuthorised

```solidity
error NotAuthorised();
```
