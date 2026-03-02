# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/interfaces/IStaking.sol)

## Functions

### rebase

```solidity
function rebase() external returns (uint256);
```

### unstake

```solidity
function unstake(address to_, uint256 amount_, bool trigger_, bool rebasing_) external returns (uint256);
```

### setDistributor

```solidity
function setDistributor(address _distributor) external;
```

### secondsToNextEpoch

```solidity
function secondsToNextEpoch() external view returns (uint256);
```

### epoch

```solidity
function epoch() external view returns (uint256, uint256, uint256, uint256);
```

## Structs

### Epoch

```solidity
struct Epoch {
    uint256 length; // in seconds
    uint256 number; // since inception
    uint256 end; // timestamp
    uint256 distribute; // amount
}
```
