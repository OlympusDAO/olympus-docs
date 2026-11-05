# ILZEndpointDelegate

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/ILZEndpointDelegate.sol)

**Title:** ILZEndpointDelegate

The external interface of an LZ Bridge endpoint delegate policy that acts as
a LayerZero V2 endpoint delegate for a specific LZBridgeGateway, exposing the
OApp-authorized endpoint surface via ILZEndpointV2Authorized.

<i>

Implementations are designed to be assigned as the endpoint delegate of the gateway
so the LayerZero endpoint accepts the calls forwarded by this policy with the gateway
as the OApp argument.

</i>

## Functions

<a id="lz_endpoint"></a>

### LZ_ENDPOINT

The LayerZero V2 endpoint address this delegate proxies to.

```solidity
function LZ_ENDPOINT() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="gateway"></a>

### GATEWAY

The address of the LZBridgeGateway this delegate acts on behalf of.

```solidity
function GATEWAY() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |
