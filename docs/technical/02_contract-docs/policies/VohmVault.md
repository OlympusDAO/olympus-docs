# VohmVault





Policy to mint and burn VOTES to arbitrary addresses



## Methods

### VESTING_PERIOD

```solidity
function VESTING_PERIOD() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### VOTES

```solidity
function VOTES() external view returns (contract VOTESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract VOTESv1 | undefined |

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

### deposit

```solidity
function deposit(uint256 assets_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets_ | uint256 | undefined |

### gOHM

```solidity
function gOHM() external view returns (contract ERC20)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

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

### mint

```solidity
function mint(uint256 shares_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| shares_ | uint256 | undefined |

### redeem

```solidity
function redeem(uint256 shares_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| shares_ | uint256 | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] permissions)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| permissions | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### withdraw

```solidity
function withdraw(uint256 assets_) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| assets_ | uint256 | undefined |




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

### VohmVault_NotVested

```solidity
error VohmVault_NotVested()
```







