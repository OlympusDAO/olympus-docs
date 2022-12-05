# ROLESv1









## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### ensureValidRole

```solidity
function ensureValidRole(bytes32 role_) external pure
```

Function that checks if role is valid (all lower case)



#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |

### hasRole

```solidity
function hasRole(address, bytes32) external view returns (bool)
```

Mapping for if an address has a policy-defined role.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### removeRole

```solidity
function removeRole(bytes32 role_, address addr_) external nonpayable
```

Function to revoke policy-defined roles from some address. Can only be called by admin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |
| addr_ | address | undefined |

### requireRole

```solidity
function requireRole(bytes32 role_, address caller_) external nonpayable
```

&quot;Modifier&quot; to restrict policy function access to certain addresses with a role.

*Roles are defined in the policy and granted by the ROLES admin.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |
| caller_ | address | undefined |

### saveRole

```solidity
function saveRole(bytes32 role_, address addr_) external nonpayable
```

Function to grant policy-defined roles to some address. Can only be called by admin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |
| addr_ | address | undefined |



## Events

### RoleGranted

```solidity
event RoleGranted(bytes32 indexed role_, address indexed addr_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ `indexed` | bytes32 | undefined |
| addr_ `indexed` | address | undefined |

### RoleRevoked

```solidity
event RoleRevoked(bytes32 indexed role_, address indexed addr_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ `indexed` | bytes32 | undefined |
| addr_ `indexed` | address | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |

### ROLES_AddressAlreadyHasRole

```solidity
error ROLES_AddressAlreadyHasRole(address addr_, bytes32 role_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| addr_ | address | undefined |
| role_ | bytes32 | undefined |

### ROLES_AddressDoesNotHaveRole

```solidity
error ROLES_AddressDoesNotHaveRole(address addr_, bytes32 role_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| addr_ | address | undefined |
| role_ | bytes32 | undefined |

### ROLES_InvalidRole

```solidity
error ROLES_InvalidRole(bytes32 role_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |

### ROLES_RequireRole

```solidity
error ROLES_RequireRole(bytes32 role_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |

### ROLES_RoleDoesNotExist

```solidity
error ROLES_RoleDoesNotExist(bytes32 role_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |


