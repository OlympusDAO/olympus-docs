# UniswapV3PoolLibrary

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/libraries/UniswapV3/PoolLibrary.sol)

**Title:**
UniswapV3PoolLibrary

**Author:**
0xJem

Library for common functions on Uniswap V3 pool contracts

## State Variables

### SLIPPAGE_SCALE

```solidity
uint16 public constant SLIPPAGE_SCALE = 10_000
```

## Functions

### isValidPool

Determines if `pool_` is a valid Uniswap V3 pool

```solidity
function isValidPool(address pool_) public view returns (bool);
```

**Parameters**

| Name    | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `pool_` | `address` | The address of the Uniswap V3 pool |

**Returns**

| Name     | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| `<none>` | `bool` | bool True if `pool_` is a valid Uniswap V3 pool, otherwise false |

### getPoolTokens

Gets the tokens for the given Uniswap V3 pool

```solidity
function getPoolTokens(address pool_) public view returns (address, address);
```

**Parameters**

| Name    | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `pool_` | `address` | The address of the Uniswap V3 pool |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | address The address of token0 |
| `<none>` | `address` | address The address of token1 |

### getPoolTokenAmounts

Gets the ordered token amounts for the given Uniswap V3 pool

```solidity
function getPoolTokenAmounts(address pool_, address tokenA_, uint256 amountA_, uint256 amountB_)
    public
    view
    returns (address token0Address, address token1Address, uint256 token0Amount, uint256 token1Amount);
```

**Parameters**

| Name       | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| `pool_`    | `address` | The address of the Uniswap V3 pool |
| `tokenA_`  | `address` | The address of the token to swap   |
| `amountA_` | `uint256` | The amount of tokenA\_ to swap     |
| `amountB_` | `uint256` | The amount of tokenB\_ to swap     |

**Returns**

| Name            | Type      | Description           |
| --------------- | --------- | --------------------- |
| `token0Address` | `address` | The address of token0 |
| `token1Address` | `address` | The address of token1 |
| `token0Amount`  | `uint256` | The amount of token0  |
| `token1Amount`  | `uint256` | The amount of token1  |

### getAmountMin

Convenience method to calculate the minimum amount of tokens to receive

This is calculated as `amount_ * (1 - slippageTolerance)`

```solidity
function getAmountMin(uint256 amount_, uint16 slippageBps_) public pure returns (uint256);
```

**Parameters**

| Name           | Type      | Description                                                        |
| -------------- | --------- | ------------------------------------------------------------------ |
| `amount_`      | `uint256` | The amount of tokens to calculate the minimum for                  |
| `slippageBps_` | `uint16`  | The maximum percentage slippage allowed in basis points (100 = 1%) |

**Returns**

| Name     | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| `<none>` | `uint256` | uint256 The minimum amount of tokens to receive |

## Errors

### InvalidSlippage

Emitted if the given slippage is invalid

```solidity
error InvalidSlippage(uint16 slippage_, uint16 maxSlippage_);
```

**Parameters**

| Name           | Type     | Description                    |
| -------------- | -------- | ------------------------------ |
| `slippage_`    | `uint16` | The invalid slippage           |
| `maxSlippage_` | `uint16` | The maximum value for slippage |

### InvalidParams

```solidity
error InvalidParams();
```
