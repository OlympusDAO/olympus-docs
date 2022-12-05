# OlympusHeart



> Olympus Heart

Olympus Heart (Policy) Contract

*The Olympus Heart contract provides keeper rewards to call the heart beat function which fuels         Olympus market operations. The Heart orchestrates state updates in the correct order to ensure         market operations use up to date information.*

## Methods

### ROLES

```solidity
function ROLES() external view returns (contract ROLESv1)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ROLESv1 | undefined |

### activate

```solidity
function activate() external nonpayable
```

Turns the heart on and resets the beatAccess restricted

*This function is used to restart the heart after a pause*


### active

```solidity
function active() external view returns (bool)
```

Status of the Heart, false = stopped, true = beating




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### beat

```solidity
function beat() external nonpayable
```

Beats the heartOnly callable when enough time has passed since last beat (determined by frequency variable)This function is incentivized with a token reward (see rewardToken and reward variables).

*Triggers price oracle update and market operations*


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

### deactivate

```solidity
function deactivate() external nonpayable
```

Turns the heart offAccess restricted

*Emergency stop function for the heart*


### frequency

```solidity
function frequency() external view returns (uint256)
```

Heart beat frequency, in seconds




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

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

### lastBeat

```solidity
function lastBeat() external view returns (uint256)
```

Timestamp of the last beat (UTC, in seconds)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### requestPermissions

```solidity
function requestPermissions() external view returns (struct Permissions[] permissions)
```

Function called by kernel to set module function permissions.




#### Returns

| Name | Type | Description |
|---|---|---|
| permissions | Permissions[] | - Array of keycodes and function selectors for requested permissions. |

### resetBeat

```solidity
function resetBeat() external nonpayable
```

Unlocks the cycle if stuck on one side, eject functionAccess restricted




### reward

```solidity
function reward() external view returns (uint256)
```

Reward for beating the Heart (in reward token decimals)




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### rewardToken

```solidity
function rewardToken() external view returns (contract ERC20)
```

Reward token address that users are sent for beating the Heart




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ERC20 | undefined |

### setRewardTokenAndAmount

```solidity
function setRewardTokenAndAmount(contract ERC20 token_, uint256 reward_) external nonpayable
```

Sets the reward token and amount for the beat functionAccess restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | - New reward token address |
| reward_ | uint256 | - New reward amount, in units of the reward token |

### withdrawUnspentRewards

```solidity
function withdrawUnspentRewards(contract ERC20 token_) external nonpayable
```

Withdraws unspent balance of provided token to senderAccess restricted



#### Parameters

| Name | Type | Description |
|---|---|---|
| token_ | contract ERC20 | undefined |



## Events

### Beat

```solidity
event Beat(uint256 timestamp_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| timestamp_  | uint256 | undefined |

### RewardIssued

```solidity
event RewardIssued(address to_, uint256 rewardAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| to_  | address | undefined |
| rewardAmount_  | uint256 | undefined |

### RewardUpdated

```solidity
event RewardUpdated(contract ERC20 token_, uint256 rewardAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token_  | contract ERC20 | undefined |
| rewardAmount_  | uint256 | undefined |



## Errors

### Heart_BeatAvailable

```solidity
error Heart_BeatAvailable()
```






### Heart_BeatStopped

```solidity
error Heart_BeatStopped()
```






### Heart_InvalidParams

```solidity
error Heart_InvalidParams()
```






### Heart_OutOfCycle

```solidity
error Heart_OutOfCycle()
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


