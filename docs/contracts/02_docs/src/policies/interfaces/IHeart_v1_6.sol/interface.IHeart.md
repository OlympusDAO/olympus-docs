# IHeart

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/interfaces/IHeart_v1_6.sol)

Interface for the Heart policy as of v1.6

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

### activate

Turns the heart on and resets the beat

Access restricted

This function is used to restart the heart after a pause

```solidity
function activate() external;
```

### deactivate

Turns the heart off

Access restricted

Emergency stop function for the heart

```solidity
function deactivate() external;
```

### setOperator

Updates the Operator contract address that the Heart calls on a beat

Access restricted

```solidity
function setOperator(address operator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|The address of the new Operator contract|

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

### setYieldRepo

Updates the YieldRepo contract address that the Heart calls on a beat

Access restricted

```solidity
function setYieldRepo(address yieldRepo_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldRepo_`|`address`|The address of the new YieldRepo contract|

### setReserveMigrator

Updates the ReserveMigrator contract address that the Heart calls on a beat

Access restricted

```solidity
function setReserveMigrator(address reserveMigrator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reserveMigrator_`|`address`|The address of the new ReserveMigrator contract|

### setEmissionManager

Updates the EmissionManager contract address that the Heart calls on a beat

Access restricted

```solidity
function setEmissionManager(address emissionManager_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`emissionManager_`|`address`|The address of the new EmissionManager contract|

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

### active

Whether the contract is active

```solidity
function active() external view returns (bool);
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
