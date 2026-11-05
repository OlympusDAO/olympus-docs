# PolicyAdminOptimized

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/PolicyAdminOptimized.sol)

**Inherits:** [IPolicyAdmin](/main/contracts/docs/src/policies/interfaces/utils/IPolicyAdmin.sol/interface.IPolicyAdmin), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

**Title:** PolicyAdminOptimized

A mix-in that gates functions by the admin, emergency, and manager roles,
resolving role membership through the `ROLES` module.

<i>

A bytecode-optimized copy of `PolicyAdmin` with identical behaviour.

</i>

## Functions

<a id="onlyemergencyoradminrole"></a>

### onlyEmergencyOrAdminRole

Reverts if the caller does not have the emergency or admin role.

```solidity
modifier onlyEmergencyOrAdminRole();
```

<a id="onlymanageroradminrole"></a>

### onlyManagerOrAdminRole

Reverts if the caller does not have the manager or admin role.

```solidity
modifier onlyManagerOrAdminRole();
```

<a id="onlyadminrole"></a>

### onlyAdminRole

Reverts if the caller does not have the admin role.

```solidity
modifier onlyAdminRole();
```

<a id="onlyemergencyrole"></a>

### onlyEmergencyRole

Reverts if the caller does not have the emergency role.

```solidity
modifier onlyEmergencyRole();
```

<a id="onlymanagerrole"></a>

### onlyManagerRole

Reverts if the caller does not have the manager role.

```solidity
modifier onlyManagerRole();
```

<a id="_isadmin-address"></a>

### _isAdmin

Returns whether `account_` holds the admin role.

```solidity
function _isAdmin(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account whose role membership is being checked. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool True if `account_` holds the admin role, false otherwise. |

<a id="_isemergency-address"></a>

### _isEmergency

Returns whether `account_` holds the emergency role.

```solidity
function _isEmergency(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account whose role membership is being checked. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool True if `account_` holds the emergency role, false otherwise. |

<a id="_ismanager-address"></a>

### _isManager

Returns whether `account_` holds the manager role.

```solidity
function _isManager(address account_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The account whose role membership is being checked. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool True if `account_` holds the manager role, false otherwise. |

<a id="_hasrole-address-bytes32"></a>

### _hasRole

Returns whether `account_` holds `role_` on the `ROLES` module.

```solidity
function _hasRole(address account_, bytes32 role_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The address whose role membership is being checked. |
| role_ | `bytes32` | The role identifier to test. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool True if `account_` holds `role_`, false otherwise. |

<a id="_requirerole-address-bytes32"></a>

### _requireRole

Reverts if `account_` does not hold `role_` on the `ROLES` module.

<i>

Reverts with `ROLESv1.ROLES_RequireRole` if `account_` does not hold `role_`.

</i>

```solidity
function _requireRole(address account_, bytes32 role_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` | The address whose role membership is being checked. |
| role_ | `bytes32` | The role identifier that `account_` must hold. |

<a id="_requireauthorized-bool"></a>

### _requireAuthorized

Reverts when an authorization check has failed.

<i>

Reverts with `NotAuthorised` when `unauthorized_` is true.

</i>

```solidity
function _requireAuthorized(bool unauthorized_) internal pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| unauthorized_ | `bool` | True if the caller is not authorized, false otherwise. |
