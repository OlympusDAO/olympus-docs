# RolesAdmin

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/RolesAdmin.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

The RolesAdmin Policy grants and revokes Roles in the ROLES module.

## State Variables

### admin

Special role that is responsible for assigning policy-defined roles to addresses.

```solidity
address public admin;
```

### newAdmin

Proposed new admin. Address must call `pullRolesAdmin` to become the new roles admin.

```solidity
address public newAdmin;
```

### ROLES

```solidity
ROLESv1 public ROLES;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel _kernel) Policy(_kernel);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| _kernel | `Kernel` |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="onlyadmin"></a>

### onlyAdmin

```solidity
modifier onlyAdmin();
```

<a id="grantrole-bytes32-address"></a>

### grantRole

```solidity
function grantRole(bytes32 role_, address wallet_) external onlyAdmin;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| role_   | `bytes32` |             |
| wallet_ | `address` |             |

<a id="revokerole-bytes32-address"></a>

### revokeRole

```solidity
function revokeRole(bytes32 role_, address wallet_) external onlyAdmin;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| role_   | `bytes32` |             |
| wallet_ | `address` |             |

<a id="pushnewadmin-address"></a>

### pushNewAdmin

```solidity
function pushNewAdmin(address newAdmin_) external onlyAdmin;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| newAdmin_ | `address` |             |

<a id="pullnewadmin"></a>

### pullNewAdmin

```solidity
function pullNewAdmin() external;
```

## Events

### NewAdminPushed

```solidity
event NewAdminPushed(address indexed newAdmin_);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| newAdmin_ | `address` |             |

### NewAdminPulled

```solidity
event NewAdminPulled(address indexed newAdmin_);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| newAdmin_ | `address` |             |

## Errors

### Roles_OnlyAdmin

```solidity
error Roles_OnlyAdmin();
```

### Roles_OnlyNewAdmin

```solidity
error Roles_OnlyNewAdmin();
```
