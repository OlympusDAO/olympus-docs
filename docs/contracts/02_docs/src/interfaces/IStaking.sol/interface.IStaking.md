# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/interfaces/IStaking.sol)

## Functions

### OHM

```solidity
function OHM() external view returns (address);
```

### sOHM

```solidity
function sOHM() external view returns (address);
```

### gOHM

```solidity
function gOHM() external view returns (address);
```

### index

```solidity
function index() external view returns (uint256);
```

### supplyInWarmup

```solidity
function supplyInWarmup() external view returns (uint256);
```

### rebase

```solidity
function rebase() external returns (uint256);
```

### stake

```solidity
function stake(address to_, uint256 amount_, bool rebasing_, bool claim_) external returns (uint256);
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
    uint256 length;
    uint256 number;
    uint256 end;
    uint256 distribute;
}
```
