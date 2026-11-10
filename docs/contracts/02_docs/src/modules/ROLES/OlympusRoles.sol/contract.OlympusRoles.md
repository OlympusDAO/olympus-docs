# OlympusRoles

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/ROLES/OlympusRoles.sol)

**Inherits:** [ROLESv1](/main/contracts/docs/src/modules/ROLES/ROLES.v1.sol/abstract.ROLESv1)

Module that holds multisig roles needed by various policies.

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="saverole-bytes32-address"></a>

### saveRole

Function to grant policy-defined roles to some address. Can only be called by admin.

```solidity
function saveRole(bytes32 role_, address addr_) external override permissioned;
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
function removeRole(bytes32 role_, address addr_) external override permissioned;
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
function requireRole(bytes32 role_, address caller_) external view override;
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
function ensureValidRole(bytes32 role_) public pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role_ | `bytes32` |  |
