# IsOHM

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/interfaces/IsOHM.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

### setIndex

```solidity
function setIndex(uint256 _index) external;
```

### setgOHM

```solidity
function setgOHM(address _gOHM) external;
```

### initialize

```solidity
function initialize(address _stakingContract, address _treasury) external;
```

### index

```solidity
function index() external view returns (uint256);
```

### gOHM

```solidity
function gOHM() external view returns (address);
```

### stakingContract

```solidity
function stakingContract() external view returns (address);
```

### treasury

```solidity
function treasury() external view returns (address);
```

### circulatingSupply

```solidity
function circulatingSupply() external view returns (uint256);
```

### gonsForBalance

```solidity
function gonsForBalance(uint256 amount) external view returns (uint256);
```

### balanceForGons

```solidity
function balanceForGons(uint256 gons) external view returns (uint256);
```
