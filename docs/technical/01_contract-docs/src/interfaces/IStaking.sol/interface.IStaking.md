# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/interfaces/IStaking.sol)

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
    uint256 length;
    uint256 number;
    uint256 end;
    uint256 distribute;
}
```
