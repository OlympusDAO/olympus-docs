# UniswapV3Positions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/UniswapV3/Positions.sol)

**Title:** UniswapV3Positions

**Author:** 0xJem

Helper functions for Uniswap V3 positions

## Functions

<a id="getpositionamounts-iuniswapv3pool-int24-int24-address"></a>

### getPositionAmounts

Gets the amount of token0 and token1 that would be received if the position was closed

```solidity
function getPositionAmounts(
        IUniswapV3Pool pool_,
        int24 tickLower_,
        int24 tickUpper_,
        address owner_
    ) public view returns (uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| tickLower_ | `int24` | The lower tick of the position |
| tickUpper_ | `int24` | The upper tick of the position |
| owner_ | `address` | The owner of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256     The amount of token0 |
| &lt;none&gt; | `uint256` | uint256     The amount of token1 |

<a id="getpositiontokensowed-iuniswapv3pool-int24-int24-address"></a>

### getPositionTokensOwed

Gets the tokens owed (collected but unwithdrawn) for the position

```solidity
function getPositionTokensOwed(
        IUniswapV3Pool pool_,
        int24 tickLower_,
        int24 tickUpper_,
        address owner_
    ) public view returns (uint128, uint128);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| tickLower_ | `int24` | The lower tick of the position |
| tickUpper_ | `int24` | The upper tick of the position |
| owner_ | `address` | The owner of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint128` | uint128     The amount of token0 tokens owed |
| &lt;none&gt; | `uint128` | uint128     The amount of token1 tokens owed |

<a id="getpositionliquidity-iuniswapv3pool-int24-int24-address"></a>

### getPositionLiquidity

Gets the amount of liquidity in the position

```solidity
function getPositionLiquidity(
        IUniswapV3Pool pool_,
        int24 tickLower_,
        int24 tickUpper_,
        address owner_
    ) public view returns (uint128);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| tickLower_ | `int24` | The lower tick of the position |
| tickUpper_ | `int24` | The upper tick of the position |
| owner_ | `address` | The owner of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint128` | uint128     The amount of liquidity |

<a id="positionhasliquidity-iuniswapv3pool-int24-int24-address"></a>

### positionHasLiquidity

Checks if the position has liquidity

```solidity
function positionHasLiquidity(
        IUniswapV3Pool pool_,
        int24 tickLower_,
        int24 tickUpper_,
        address owner_
    ) public view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `IUniswapV3Pool` | The address of the Uniswap V3 pool |
| tickLower_ | `int24` | The lower tick of the position |
| tickUpper_ | `int24` | The upper tick of the position |
| owner_ | `address` | The owner of the position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool        True if the position has liquidity |
