# RolesAdmin





The RolesAdmin Policy grants and revokes Roles in the ROLES module.



## Methods

### ROLES

```solidity
function ROLES() external view returns (contract ROLESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ROLESv1 | undefined |

### admin

```solidity
function admin() external view returns (address)
```

Special role that is responsible for assigning policy-defined roles to addresses.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### configureDependencies

```solidity
function configureDependencies() external nonpayable returns (Keycode[] dependencies)
```

Define module dependencies for this policy.




#### Returns

| Name | Type | Description |
|---|---|---|
| dependencies | Keycode[] | - Keycode array of module dependencies. |

### grantRole

```solidity
function grantRole(bytes32 role_, address wallet_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |
| wallet_ | address | undefined |

### isActive

```solidity
function isActive() external view returns (bool)
```

Easily accessible indicator for if a policy is activated or not.




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

### newAdmin

```solidity
function newAdmin() external view returns (address)
```

Proposed new admin. Address must call `pullRolesAdmin` to become the new roles admin.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### pullNewAdmin

```solidity
function pullNewAdmin() external nonpayable
```






### pushNewAdmin

```solidity
function pushNewAdmin(address newAdmin_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newAdmin_ | address | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] requests)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| requests | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### revokeRole

```solidity
function revokeRole(bytes32 role_, address wallet_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| role_ | bytes32 | undefined |
| wallet_ | address | undefined |



## Events

### NewAdminPulled

```solidity
event NewAdminPulled(address indexed newAdmin_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newAdmin_ `indexed` | address | undefined |

### NewAdminPushed

```solidity
event NewAdminPushed(address indexed newAdmin_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| newAdmin_ `indexed` | address | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### OnlyAdmin

```solidity
error OnlyAdmin()
```






### OnlyNewAdmin

```solidity
error OnlyNewAdmin()
```






### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |


