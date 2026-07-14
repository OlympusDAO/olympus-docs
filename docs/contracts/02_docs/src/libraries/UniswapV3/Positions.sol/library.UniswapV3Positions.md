# UniswapV3Positions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/libraries/UniswapV3/Positions.sol)

**Title:**
UniswapV3Positions

**Author:**
0xJem

Helper functions for Uniswap V3 positions

## Functions

### getPositionAmounts

Gets the amount of token0 and token1 that would be received if the position was closed

```solidity
function getPositionAmounts(IUniswapV3Pool pool_, int24 tickLower_, int24 tickUpper_, address owner_)
    public
    view
    returns (uint256, uint256);
```

**Parameters**

| Name         | Type             | Description                        |
| ------------ | ---------------- | ---------------------------------- |
| `pool_`      | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| `tickLower_` | `int24`          | The lower tick of the position     |
| `tickUpper_` | `int24`          | The upper tick of the position     |
| `owner_`     | `address`        | The owner of the position          |

**Returns**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `<none>` | `uint256` | uint256 The amount of token0 |
| `<none>` | `uint256` | uint256 The amount of token1 |

### getPositionTokensOwed

Gets the tokens owed (collected but unwithdrawn) for the position

```solidity
function getPositionTokensOwed(IUniswapV3Pool pool_, int24 tickLower_, int24 tickUpper_, address owner_)
    public
    view
    returns (uint128, uint128);
```

**Parameters**

| Name         | Type             | Description                        |
| ------------ | ---------------- | ---------------------------------- |
| `pool_`      | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| `tickLower_` | `int24`          | The lower tick of the position     |
| `tickUpper_` | `int24`          | The upper tick of the position     |
| `owner_`     | `address`        | The owner of the position          |

**Returns**

| Name     | Type      | Description                              |
| -------- | --------- | ---------------------------------------- |
| `<none>` | `uint128` | uint128 The amount of token0 tokens owed |
| `<none>` | `uint128` | uint128 The amount of token1 tokens owed |

### getPositionLiquidity

Gets the amount of liquidity in the position

```solidity
function getPositionLiquidity(IUniswapV3Pool pool_, int24 tickLower_, int24 tickUpper_, address owner_)
    public
    view
    returns (uint128);
```

**Parameters**

| Name         | Type             | Description                        |
| ------------ | ---------------- | ---------------------------------- |
| `pool_`      | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| `tickLower_` | `int24`          | The lower tick of the position     |
| `tickUpper_` | `int24`          | The upper tick of the position     |
| `owner_`     | `address`        | The owner of the position          |

**Returns**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `<none>` | `uint128` | uint128 The amount of liquidity |

### positionHasLiquidity

Checks if the position has liquidity

```solidity
function positionHasLiquidity(IUniswapV3Pool pool_, int24 tickLower_, int24 tickUpper_, address owner_)
    public
    view
    returns (bool);
```

**Parameters**

| Name         | Type             | Description                        |
| ------------ | ---------------- | ---------------------------------- |
| `pool_`      | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| `tickLower_` | `int24`          | The lower tick of the position     |
| `tickUpper_` | `int24`          | The upper tick of the position     |
| `owner_`     | `address`        | The owner of the position          |

**Returns**

| Name     | Type   | Description                             |
| -------- | ------ | --------------------------------------- |
| `<none>` | `bool` | bool True if the position has liquidity |
