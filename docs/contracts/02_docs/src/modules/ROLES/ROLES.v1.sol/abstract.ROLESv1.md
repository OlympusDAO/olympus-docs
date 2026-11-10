# ROLESv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/ROLES/ROLES.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

## State Variables

### hasRole

Mapping for if an address has a policy-defined role.

```solidity
mapping(address => mapping(bytes32 => bool)) public hasRole;
```

## Functions

<a id="saverole-bytes32-address"></a>

### saveRole

Function to grant policy-defined roles to some address. Can only be called by admin.

```solidity
function saveRole(bytes32 role_, address addr_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
| addr_ | `address` |  |

<a id="removerole-bytes32-address"></a>

### removeRole

Function to revoke policy-defined roles from some address. Can only be called by admin.

```solidity
function removeRole(bytes32 role_, address addr_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
| addr_ | `address` |  |

<a id="requirerole-bytes32-address"></a>

### requireRole

"Modifier" to restrict policy function access to certain addresses with a role.

<i>

Roles are defined in the policy and granted by the ROLES admin.

</i>

```solidity
function requireRole(bytes32 role_, address caller_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
| caller_ | `address` |  |

<a id="ensurevalidrole-bytes32"></a>

### ensureValidRole

Function that checks if role is valid (all lower case)

```solidity
function ensureValidRole(bytes32 role_) external pure virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |

## Events

### RoleGranted

```solidity
event RoleGranted(bytes32 indexed role_, address indexed addr_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
| addr_ | `address` |  |

### RoleRevoked

```solidity
event RoleRevoked(bytes32 indexed role_, address indexed addr_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
| addr_ | `address` |  |

## Errors

### ROLES_InvalidRole

```solidity
error ROLES_InvalidRole(bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |

### ROLES_RequireRole

```solidity
error ROLES_RequireRole(bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |

### ROLES_AddressAlreadyHasRole

```solidity
error ROLES_AddressAlreadyHasRole(address addr_, bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addr_ | `address` |  |
| role_ | `bytes32` |  |

### ROLES_AddressDoesNotHaveRole

```solidity
error ROLES_AddressDoesNotHaveRole(address addr_, bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addr_ | `address` |  |
| role_ | `bytes32` |  |

### ROLES_RoleDoesNotExist

```solidity
error ROLES_RoleDoesNotExist(bytes32 role_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
