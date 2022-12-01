# Distributor









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

Modules




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract TRSRYv1 | undefined |

### addPool

```solidity
function addPool(uint256 index_, address pool_) external nonpayable
```

Adds a liquidity pool to the list of pools to be minted into



#### Parameters

| Name | Type | Description |
|---|---|---|
| index_ | uint256 | The index in the pools array to add the liquidity pool to. |
| pool_ | address | The address of the liquidity pool to add. |

### bounty

```solidity
function bounty() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

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

### distribute

```solidity
function distribute() external nonpayable
```

Send the epoch&#39;s reward to the staking contract, and mint rewards to Uniswap V2 pools.         This removes opportunity cost for liquidity providers by sending rebase rewards         directly into the liquidity pool.         NOTE: This does not add additional emissions (user could be staked instead and get the         same tokens).




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

### nextRewardFor

```solidity
function nextRewardFor(address who_) external view returns (uint256)
```

Returns the next reward for the given address based on their OHM balance.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who_ | address | The address to get the next reward for. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256 The next reward for the given address. |

### pools

```solidity
function pools(uint256) external view returns (address)
```

Policy state



#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### removePool

```solidity
function removePool(uint256 index_, address pool_) external nonpayable
```

Removes a liquidity pool from the list of pools to be minted into

*This function is only available to an authorized user.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| index_ | uint256 | The index in the pools array of the liquidity pool to remove. |
| pool_ | address | The address of the liquidity pool to remove. |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] permissions)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| permissions | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### retrieveBounty

```solidity
function retrieveBounty() external nonpayable returns (uint256)
```

Mints the bounty (if &gt; 0) to the staking contract for distribution.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | uint256 The amount of OHM minted as a bounty. |

### rewardRate

```solidity
function rewardRate() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### setBounty

```solidity
function setBounty(uint256 bounty_) external nonpayable
```

Adjusts the bounty

*This function is only available to an authorized user.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| bounty_ | uint256 | The new bounty amount in OHM (9 decimals). |

### setPools

```solidity
function setPools(address[] pools_) external nonpayable
```

Sets the Uniswap V2 pools to be minted into

*This function is only available to an authorized user.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| pools_ | address[] | The array of Uniswap V2 pools. |

### setRewardRate

```solidity
function setRewardRate(uint256 newRewardRate_) external nonpayable
```

Sets the new OHM reward rate to mint and distribute per epoch



#### Parameters

| Name | Type | Description |
|---|---|---|
| newRewardRate_ | uint256 | The new rate to set (9 decimals, i.e. 10_000_000 / 1_000_000_000 = 1%) |

### triggerRebase

```solidity
function triggerRebase() external nonpayable
```

Trigger rebases via distributor. There is an error in Staking&#39;s `stake` function         which pulls forward part of the rebase for the next epoch. This path triggers a         rebase by calling `unstake` (which does not have the issue). The patch also         restricts `distribute` to only be able to be called from a tx originating in this         function.







## Errors

### Distributor_AdjustmentLimit

```solidity
error Distributor_AdjustmentLimit()
```






### Distributor_AdjustmentUnderflow

```solidity
error Distributor_AdjustmentUnderflow()
```






### Distributor_InvalidConstruction

```solidity
error Distributor_InvalidConstruction()
```






### Distributor_NoRebaseOccurred

```solidity
error Distributor_NoRebaseOccurred()
```






### Distributor_NotPermissioned

```solidity
error Distributor_NotPermissioned()
```






### Distributor_NotUnlocked

```solidity
error Distributor_NotUnlocked()
```






### Distributor_OnlyStaking

```solidity
error Distributor_OnlyStaking()
```






### Distributor_SanityCheck

```solidity
error Distributor_SanityCheck()
```






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


