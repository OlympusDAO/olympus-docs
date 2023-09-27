# IHeart









## Methods

### activate

```solidity
function activate() external nonpayable
```

Turns the heart on and resets the beatAccess restricted

*This function is used to restart the heart after a pause*


### beat

```solidity
function beat() external nonpayable
```

Beats the heartOnly callable when enough time has passed since last beat (determined by frequency variable)This function is incentivized with a token reward (see rewardToken and reward variables).

*Triggers price oracle update and market operations*


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

### resetBeat

```solidity
function resetBeat() external nonpayable
```

Unlocks the cycle if stuck on one side, eject functionAccess restricted




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







