# IHeart

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/interfaces/IHeart.sol)

Interface for the Heart policy as of v1.7

## Functions

### beat

Beats the heart

Only callable when enough time has passed since last beat (determined by frequency variable)

This function is incentivized with a token reward (see rewardToken and reward variables).

Triggers price oracle update and market operations

```solidity
function beat() external;
```

### resetBeat

Unlocks the cycle if stuck on one side, eject function

Access restricted

```solidity
function resetBeat() external;
```

### setDistributor

Updates the Distributor contract address that the Heart calls on a beat

Access restricted

```solidity
function setDistributor(address distributor_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`distributor_`|`address`|The address of the new Distributor contract|

### setRewardAuctionParams

Sets the max reward amount, and auction duration for the beat function

Access restricted

```solidity
function setRewardAuctionParams(uint256 maxReward_, uint48 auctionDuration_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`maxReward_`|`uint256`|- New max reward amount, in units of the reward token|
|`auctionDuration_`|`uint48`|- New auction duration, in seconds|

### frequency

Heart beat frequency, in seconds

```solidity
function frequency() external view returns (uint48);
```

### currentReward

Current reward amount based on linear auction

```solidity
function currentReward() external view returns (uint256);
```

## Events

### Beat

```solidity
event Beat(uint256 timestamp_);
```

### RewardIssued

```solidity
event RewardIssued(address to_, uint256 rewardAmount_);
```

### RewardUpdated

```solidity
event RewardUpdated(uint256 maxRewardAmount_, uint48 auctionDuration_);
```

## Errors

### Heart_OutOfCycle

```solidity
error Heart_OutOfCycle();
```

### Heart_BeatStopped

```solidity
error Heart_BeatStopped();
```

### Heart_InvalidParams

```solidity
error Heart_InvalidParams();
```

### Heart_BeatAvailable

```solidity
error Heart_BeatAvailable();
```

### Heart_InvalidFrequency

```solidity
error Heart_InvalidFrequency();
```
