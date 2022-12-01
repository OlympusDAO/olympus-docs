# Emergency









## Methods

### MINTR

```solidity
function MINTR() external view returns (contract MINTRv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract MINTRv1 | undefined |

### ROLES

```solidity
function ROLES() external view returns (contract ROLESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ROLESv1 | undefined |

### TRSRY

```solidity
function TRSRY() external view returns (contract TRSRYv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract TRSRYv1 | undefined |

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

### restart

```solidity
function restart() external nonpayable
```

Restart treasury withdrawals and minting after shutdown




### restartMinting

```solidity
function restartMinting() external nonpayable
```

Restart minting after shutdown




### restartWithdrawals

```solidity
function restartWithdrawals() external nonpayable
```

Restart treasury withdrawals after shutdown




### shutdown

```solidity
function shutdown() external nonpayable
```

Emergency shutdown of treasury withdrawals and minting




### shutdownMinting

```solidity
function shutdownMinting() external nonpayable
```

Emergency shutdown of minting




### shutdownWithdrawals

```solidity
function shutdownWithdrawals() external nonpayable
```

Emergency shutdown of treasury withdrawals






## Events

### Status

```solidity
event Status(bool treasury_, bool minter_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| treasury_  | bool | undefined |
| minter_  | bool | undefined |



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


