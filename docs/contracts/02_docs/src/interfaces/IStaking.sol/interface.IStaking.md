# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/interfaces/IStaking.sol)

## Functions

### rebase

```solidity
function rebase() external returns (uint256);
```

### unstake

```solidity
function unstake(address, uint256, bool _trigger, bool) external returns (uint256);
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
