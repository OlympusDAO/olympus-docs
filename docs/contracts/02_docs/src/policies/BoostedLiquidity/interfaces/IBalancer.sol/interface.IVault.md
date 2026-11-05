# IVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IBalancer.sol)

## Functions

<a id="joinpool-bytes32-address-address-joinpoolrequest"></a>

### joinPool

```solidity
function joinPool(
        bytes32 poolId,
        address sender,
        address recipient,
        JoinPoolRequest memory request
    ) external payable;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId | `bytes32` |  |
| sender | `address` |  |
| recipient | `address` |  |
| request | `JoinPoolRequest` |  |

<a id="exitpool-bytes32-address-address-payable-exitpoolrequest"></a>

### exitPool

```solidity
function exitPool(
        bytes32 poolId,
        address sender,
        address payable recipient,
        ExitPoolRequest memory request
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId | `bytes32` |  |
| sender | `address` |  |
| recipient | `address payable` |  |
| request | `ExitPoolRequest` |  |

<a id="getpooltokens-bytes32"></a>

### getPoolTokens

```solidity
function getPoolTokens(
        bytes32 poolId
    ) external view returns (address[] memory, uint256[] memory, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| poolId | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` |  |
| &lt;none&gt; | `uint256[]` |  |
| &lt;none&gt; | `uint256` |  |
