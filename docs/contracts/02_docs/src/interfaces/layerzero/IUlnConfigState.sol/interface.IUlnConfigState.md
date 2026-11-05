# IUlnConfigState

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/layerzero/IUlnConfigState.sol)

**Title:** IUlnConfigState

Minimal view interface for accessing the raw (OApp-level, unresolved) UlnConfig
stored on a LayerZero V2 Send/Receive ULN library.

<i>

Used to distinguish "inherit default" (`optionalDVNCount == 0`) from
"explicit NIL / no optional DVNs" (`optionalDVNCount == type(uint8).max`), which
look identical after the default-resolution performed by `getUlnConfig` (and by
`ILayerZeroEndpointV2.getConfig`).

</i>

## Functions

<a id="getappulnconfig-address-uint32"></a>

### getAppUlnConfig

Returns the raw UlnConfig stored for the given OApp and remote EID
(without applying the LayerZero default-config fallback).

```solidity
function getAppUlnConfig(
        address _oapp,
        uint32 _remoteEid
    ) external view returns (UlnConfig memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _oapp | `address` | The OApp address. |
| _remoteEid | `uint32` | The remote endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `UlnConfig` |  |
