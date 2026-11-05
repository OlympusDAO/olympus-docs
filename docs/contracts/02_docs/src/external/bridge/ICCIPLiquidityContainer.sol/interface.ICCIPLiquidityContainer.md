# ICCIPLiquidityContainer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPLiquidityContainer.sol)

**Title:** ICCIPLiquidityContainer

The liquidity container interface of Chainlink CCIP lock/release token pools.

<i>

The functions match `ILiquidityContainer` of Chainlink CCIP 1.6.0, so
`type(ICCIPLiquidityContainer).interfaceId` equals the identifier that a lock/release
pool advertises through ERC165. Both functions are restricted to the pool's rebalancer.

</i>

## Functions

<a id="provideliquidity-uint256"></a>

### provideLiquidity

Transfers `amount` of the pool token from the caller into the container. The
caller must have approved the container beforehand.

```solidity
function provideLiquidity(uint256 amount) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount to provide. |

<a id="withdrawliquidity-uint256"></a>

### withdrawLiquidity

Transfers `amount` of the pool token from the container to the caller.

```solidity
function withdrawLiquidity(uint256 amount) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount to withdraw. |

## Events

### LiquidityAdded

Emitted when liquidity is provided to the container.

```solidity
event LiquidityAdded(address indexed provider, uint256 indexed amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| provider | `address` | The address that provided the liquidity. |
| amount | `uint256` | The amount provided. |

### LiquidityRemoved

Emitted when liquidity is withdrawn from the container.

```solidity
event LiquidityRemoved(address indexed provider, uint256 indexed amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| provider | `address` | The address that received the liquidity. |
| amount | `uint256` | The amount withdrawn. |
