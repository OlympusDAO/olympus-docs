# IgOHM

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/interfaces/IgOHM.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

### mint

```solidity
function mint(address _to, uint256 _amount) external;
```

### burn

```solidity
function burn(address _from, uint256 _amount) external;
```

### index

```solidity
function index() external view returns (uint256);
```

### sOHM

```solidity
function sOHM() external view returns (address);
```

### balanceFrom

```solidity
function balanceFrom(uint256 _amount) external view returns (uint256);
```

### balanceTo

```solidity
function balanceTo(uint256 _amount) external view returns (uint256);
```

### migrate

```solidity
function migrate(address _staking, address _sOHM) external;
```

### getPriorVotes

```solidity
function getPriorVotes(address account, uint256 blockNumber) external view returns (uint256);
```

### totalSupply

```solidity
function totalSupply() external view override returns (uint256);
```
