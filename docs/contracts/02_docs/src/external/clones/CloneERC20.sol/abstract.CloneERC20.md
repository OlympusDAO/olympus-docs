# CloneERC20

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/external/clones/CloneERC20.sol)

**Inherits:**
Clone, [IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

**Authors:**
Solmate (<https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol>), Modified from Uniswap (<https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol>)

Modern and gas efficient ERC20 implementation.

Do not manually set balances without updating totalSupply, as the sum of all user balances must not exceed it.

## State Variables

### totalSupply

```solidity
uint256 public totalSupply
```

### balanceOf

```solidity
mapping(address => uint256) public balanceOf
```

### allowance

```solidity
mapping(address => mapping(address => uint256)) public allowance
```

## Functions

### name

```solidity
function name() external pure returns (string memory);
```

### symbol

```solidity
function symbol() external pure returns (string memory);
```

### decimals

```solidity
function decimals() external pure returns (uint8);
```

### approve

```solidity
function approve(address spender, uint256 amount) public virtual returns (bool);
```

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 amount) public virtual returns (bool);
```

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 amount) public virtual returns (bool);
```

### transfer

```solidity
function transfer(address to, uint256 amount) public virtual returns (bool);
```

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool);
```

### _mint

```solidity
function _mint(address to, uint256 amount) internal virtual;
```

### _burn

```solidity
function _burn(address from, uint256 amount) internal virtual;
```
