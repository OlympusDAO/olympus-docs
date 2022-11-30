# TreasuryCustodian









## Methods

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

### decreaseDebt

```solidity
function decreaseDebt(contract ERC20 token_, address debtor_, uint256 amount_) external nonpayable
```

Allow authorized addresses to decrease debt in special cases



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | undefined |
| debtor_ | address | undefined |
| amount_ | uint256 | undefined |

### grantDebtorApproval

```solidity
function grantDebtorApproval(address for_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Allow an address to incur `amount_` of debt from the treasury



#### Parameters

| Name | Type | Description |
|---|---|---|
| for_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### grantWithdrawerApproval

```solidity
function grantWithdrawerApproval(address for_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Allow an address to withdraw `amount_` from the treasury



#### Parameters

| Name | Type | Description |
|---|---|---|
| for_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### increaseDebt

```solidity
function increaseDebt(contract ERC20 token_, address debtor_, uint256 amount_) external nonpayable
```

Allow authorized addresses to increase debt in special cases



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | undefined |
| debtor_ | address | undefined |
| amount_ | uint256 | undefined |

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

### reduceDebtorApproval

```solidity
function reduceDebtorApproval(address for_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Lower an address&#39;s debtor approval



#### Parameters

| Name | Type | Description |
|---|---|---|
| for_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### reduceWithdrawerApproval

```solidity
function reduceWithdrawerApproval(address for_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Lower an address&#39;s withdrawer approval



#### Parameters

| Name | Type | Description |
|---|---|---|
| for_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] requests)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| requests | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### revokePolicyApprovals

```solidity
function revokePolicyApprovals(address policy_, contract ERC20[] tokens_) external nonpayable
```

Anyone can call to revoke a deactivated policy&#39;s approvals.



#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |
| tokens_ | contract ERC20[] | undefined |

### withdrawReservesTo

```solidity
function withdrawReservesTo(address to_, contract ERC20 token_, uint256 amount_) external nonpayable
```

Custodian can withdraw reserves to an address.

*Used for withdrawing assets to a MS or other address in special cases.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to_ | address | undefined |
| token_ | contract ERC20 | undefined |
| amount_ | uint256 | undefined |



## Events

### ApprovalRevoked

```solidity
event ApprovalRevoked(address indexed policy_, contract ERC20[] tokens_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| tokens_  | contract ERC20[] | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### PolicyStillActive

```solidity
error PolicyStillActive()
```






### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| keycode_ | Keycode | undefined |


