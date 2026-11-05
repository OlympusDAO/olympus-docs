# IHeart

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IHeart.sol)

<i>

Interface for the Heart policy as of v1.7

</i>

## Functions

<a id="beat"></a>

### beat

Beats the heart

Only callable when enough time has passed since last beat (determined by frequency variable)

This function is incentivized with a token reward (see rewardToken and reward variables).

<i>

Triggers price oracle update and market operations

</i>

```solidity
function beat() external;
```

<a id="resetbeat"></a>

### resetBeat

Unlocks the cycle if stuck on one side, eject function

Access restricted

```solidity
function resetBeat() external;
```

<a id="setdistributor-address"></a>

### setDistributor

Updates the Distributor contract address that the Heart calls on a beat

Access restricted

```solidity
function setDistributor(address distributor_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| distributor_ | `address` | The address of the new Distributor contract |

<a id="setrewardauctionparams-uint256-uint48"></a>

### setRewardAuctionParams

Sets the max reward amount, and auction duration for the beat function

Access restricted

```solidity
function setRewardAuctionParams(uint256 maxReward_, uint48 auctionDuration_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxReward_ | `uint256` | - New max reward amount, in units of the reward token |
| auctionDuration_ | `uint48` | - New auction duration, in seconds |

<a id="frequency"></a>

### frequency

Heart beat frequency, in seconds

```solidity
function frequency() external view returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="currentreward"></a>

### currentReward

Current reward amount based on linear auction

```solidity
function currentReward() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Events

### Beat

```solidity
event Beat(uint256 timestamp_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timestamp_ | `uint256` |  |

### RewardIssued

```solidity
event RewardIssued(address to_, uint256 rewardAmount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| rewardAmount_ | `uint256` |  |

### RewardUpdated

```solidity
event RewardUpdated(uint256 maxRewardAmount_, uint48 auctionDuration_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxRewardAmount_ | `uint256` |  |
| auctionDuration_ | `uint48` |  |

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
