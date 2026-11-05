# IEndpointV2State

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/layerzero/IEndpointV2State.sol)

**Title:** IEndpointV2State

Minimal interface for accessing EndpointV2 public state that is not
exposed through ILayerZeroEndpointV2.

## Functions

<a id="delegates-address"></a>

### delegates

Returns the delegate address for a given OApp.

```solidity
function delegates(address oapp) external view returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oapp | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |
