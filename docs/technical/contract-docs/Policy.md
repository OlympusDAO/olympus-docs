# Policy





Policies are application logic and external interface for the kernel and installed modules.

*Policies are activated and deactivated in the kernel by the executor.Module dependencies and function permissions must be defined in appropriate functions.*

## Methods

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

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] requests)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| requests | Permissions[] | - Array of keycodes and function selectors for requested permissions. |




## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |


