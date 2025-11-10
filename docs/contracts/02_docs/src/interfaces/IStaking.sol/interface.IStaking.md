# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/interfaces/IStaking.sol)

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
