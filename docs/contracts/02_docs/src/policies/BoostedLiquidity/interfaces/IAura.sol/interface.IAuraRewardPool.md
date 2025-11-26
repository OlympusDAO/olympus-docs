# IAuraRewardPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/BoostedLiquidity/interfaces/IAura.sol)

## Functions

### balanceOf

```solidity
function balanceOf(address account_) external view returns (uint256);
```

### earned

```solidity
function earned(address account_) external view returns (uint256);
```

### rewardRate

```solidity
function rewardRate() external view returns (uint256);
```

### rewardToken

```solidity
function rewardToken() external view returns (address);
```

### extraRewardsLength

```solidity
function extraRewardsLength() external view returns (uint256);
```

### extraRewards

```solidity
function extraRewards(uint256 index) external view returns (address);
```

### deposit

```solidity
function deposit(uint256 assets_, address receiver_) external;
```

### getReward

```solidity
function getReward(address account_, bool claimExtras_) external;
```

### withdrawAndUnwrap

```solidity
function withdrawAndUnwrap(uint256 amount_, bool claim_) external returns (bool);
```
