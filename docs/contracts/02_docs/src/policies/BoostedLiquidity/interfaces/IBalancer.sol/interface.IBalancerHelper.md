# IBalancerHelper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

<a id="queryjoin-bytes32-address-address-joinpoolrequest"></a>

### queryJoin

```solidity
function queryJoin(
        bytes32 poolId,
        address sender,
        address recipient,
        JoinPoolRequest memory request
    ) external returns (uint256 bptOut, uint256[] memory amountsIn);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId | `bytes32` |  |
| sender | `address` |  |
| recipient | `address` |  |
| request | `JoinPoolRequest` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bptOut | `uint256` |  |
| amountsIn | `uint256[]` |  |

<a id="queryexit-bytes32-address-address-exitpoolrequest"></a>

### queryExit

```solidity
function queryExit(
        bytes32 poolId,
        address sender,
        address recipient,
        ExitPoolRequest memory request
    ) external returns (uint256 bptIn, uint256[] memory amountsOut);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId | `bytes32` |  |
| sender | `address` |  |
| recipient | `address` |  |
| request | `ExitPoolRequest` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bptIn | `uint256` |  |
| amountsOut | `uint256[]` |  |
