# ICCIPTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/ICCIPTokenPool.sol)

## Functions

<a id="getbridgedsupply"></a>

### getBridgedSupply

Returns the amount of OHM that has been bridged from mainnet

<i>

The implementing function should only return a value on mainnet

</i>

```solidity
function getBridgedSupply() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Errors

### TokenPool_InvalidToken

```solidity
error TokenPool_InvalidToken(address expected, address actual);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expected | `address` |  |
| actual | `address` |  |
