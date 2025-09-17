# IUniswapV2Pair

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/interfaces/Uniswap/IUniswapV2Pair.sol)

**Inherits:**
[IUniswapV2ERC20](/main/contracts/docs/src/interfaces/Uniswap/IUniswapV2ERC20.sol/interface.IUniswapV2ERC20)

## Functions

### token0

```solidity
function token0() external view returns (address);
```

### token1

```solidity
function token1() external view returns (address);
```

### swap

```solidity
function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data) external;
```

### getReserves

```solidity
function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
```

### mint

```solidity
function mint(address to) external returns (uint256 liquidity);
```

### sync

```solidity
function sync() external;
```
