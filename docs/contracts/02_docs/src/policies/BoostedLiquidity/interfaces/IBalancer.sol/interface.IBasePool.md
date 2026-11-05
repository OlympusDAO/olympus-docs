# IBasePool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

<a id="getpoolid"></a>

### getPoolId

```solidity
function getPoolId() external view returns (bytes32);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

<a id="balanceof-address"></a>

### balanceOf

```solidity
function balanceOf(address user_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="totalsupply"></a>

### totalSupply

```solidity
function totalSupply() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="approve-address-uint256"></a>

### approve

```solidity
function approve(address spender_, uint256 amount_) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender_ | `address` |  |
| amount_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
