# ICCIPLockReleaseTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPLockReleaseTokenPool.sol)

**Inherits:** [ICCIPLiquidityContainer](/main/contracts/docs/src/external/bridge/ICCIPLiquidityContainer.sol/interface.ICCIPLiquidityContainer)

**Title:** ICCIPLockReleaseTokenPool

The liquidity surface of a Chainlink CCIP `LockReleaseTokenPool` (version 1.5.1).

<i>

The pool keeps no internal liquidity accounting: it releases from and reports its token
balance. `withdrawLiquidity` and `provideLiquidity` are restricted to the rebalancer, and
`provideLiquidity` additionally requires the pool to have been deployed with liquidity
acceptance enabled.

</i>

## Functions

<a id="getrebalancer"></a>

### getRebalancer

Returns the rebalancer, or the zero address if none is set.

```solidity
function getRebalancer() external view returns (address rebalancer);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer | `address` | The rebalancer. |

<a id="setrebalancer-address"></a>

### setRebalancer

Sets the rebalancer. Restricted to the pool owner. The zero address clears the
rebalancer. No event is emitted by the pool.

```solidity
function setRebalancer(address rebalancer) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer | `address` | The rebalancer address. |

<a id="canacceptliquidity"></a>

### canAcceptLiquidity

Returns whether the pool accepts liquidity through `provideLiquidity`. The flag
is fixed at pool construction.

```solidity
function canAcceptLiquidity() external view returns (bool accepts);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accepts | `bool` | True if the pool accepts liquidity. |

<a id="transferliquidity-address-uint256"></a>

### transferLiquidity

Pulls liquidity from another lock/release pool into this pool by calling
`withdrawLiquidity` on it. Restricted to the pool owner. This pool must be the
rebalancer of `from`.

```solidity
function transferLiquidity(address from, uint256 amount) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` | The pool to pull liquidity from. |
| amount | `uint256` | The amount to transfer. |

## Events

### LiquidityTransferred

Emitted when liquidity is pulled from another pool into this pool.

```solidity
event LiquidityTransferred(address indexed from, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` | The pool the liquidity was pulled from. |
| amount | `uint256` | The amount transferred. |

## Errors

### InsufficientLiquidity

Thrown when a withdrawal exceeds the pool balance.

```solidity
error InsufficientLiquidity();
```

### LiquidityNotAccepted

Thrown when liquidity is provided to a pool deployed without liquidity acceptance.

```solidity
error LiquidityNotAccepted();
```
