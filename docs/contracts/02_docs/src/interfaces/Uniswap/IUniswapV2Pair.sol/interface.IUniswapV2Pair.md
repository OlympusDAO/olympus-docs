# IUniswapV2Pair

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/Uniswap/IUniswapV2Pair.sol)

**Inherits:** [IUniswapV2ERC20](/main/contracts/docs/src/interfaces/Uniswap/IUniswapV2ERC20.sol/interface.IUniswapV2ERC20)

## Functions

<a id="token0"></a>

### token0

```solidity
function token0() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="token1"></a>

### token1

```solidity
function token1() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="swap-uint256-uint256-address-bytes"></a>

### swap

```solidity
function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data) external;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| amount0Out | `uint256` |             |
| amount1Out | `uint256` |             |
| to         | `address` |             |
| data       | `bytes`   |             |

<a id="getreserves"></a>

### getReserves

```solidity
function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
```

**Returns**

| Name               | Type      | Description |
| ------------------ | --------- | ----------- |
| reserve0           | `uint112` |             |
| reserve1           | `uint112` |             |
| blockTimestampLast | `uint32`  |             |

<a id="mint-address"></a>

### mint

```solidity
function mint(address to) external returns (uint256 liquidity);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| to   | `address` |             |

**Returns**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| liquidity | `uint256` |             |

<a id="sync"></a>

### sync

```solidity
function sync() external;
```
