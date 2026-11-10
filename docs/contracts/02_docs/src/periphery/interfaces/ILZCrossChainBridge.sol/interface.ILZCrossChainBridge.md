# ILZCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/interfaces/ILZCrossChainBridge.sol)

**Title:** ILZCrossChainBridge

Interface for the LZ Cross-Chain Bridge facilitator, the user-facing entry point
for sending OHM to other chains via LayerZero V2.

<i>

It is a periphery contract, as it does not require any privileged access to the
Olympus protocol. It transfers OHM from the user to the gateway, which handles
burning and sending.

</i>

## Functions

<a id="sendohm-uint32-address-uint256"></a>

### sendOhm

Sends OHM to a destination chain via the gateway.

<i>

The user must approve this contract for the OHM amount before calling.
OHM is transferred from the user to the gateway, then the gateway burns and
sends via LayerZero. The caller must send the native token with the call to
cover the LayerZero messaging fee; excess is refunded to msg.sender.
Use estimateSendFee() to determine the required fee.

</i>

```solidity
function sendOhm(uint32 dstEid_, address to_, uint256 amount_) external payable;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |

<a id="setgateway-address"></a>

### setGateway

Sets the gateway address.

<i>

Only callable by the address pinned in `configurator`, which is expected to be
an `LZBridgeAndDelegateConfig` instance (the timelock policy).

</i>

```solidity
function setGateway(address gateway_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway_ | `address` | The new gateway address. |

<a id="setreenabler-address"></a>

### setReEnabler

Sets the address authorized to call `reEnable()`.

<i>

Only callable by the address pinned in `configurator`, which is expected to be
an `LZBridgeAndDelegateConfig` instance (the timelock policy). The zero address
is permitted and effectively disables the `reEnable()` entry point until a
non-zero address is set.

</i>

```solidity
function setReEnabler(address reEnabler_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reEnabler_ | `address` | The new re-enabler address, or `address(0)` to clear. |

<a id="setconfigurator-address"></a>

### setConfigurator

Sets the configurator address.

<i>

Bootstrap: when `configurator` is the zero address, only the owner may set the
first non-zero configurator. After bootstrap, rotation is only allowed by the
current configurator. The configurator is expected to be an
`LZBridgeAndDelegateConfig` instance (the timelock policy).

</i>

In both cases the new configurator must implement `ILZBridgeAndDelegateConfig`
via ERC-165 to prevent the bridge from being bricked by an incompatible address.

```solidity
function setConfigurator(address newConfigurator_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConfigurator_ | `address` | The new configurator address. |

<a id="validatesetgateway-address"></a>

### validateSetGateway

Validates the payload that would be passed to `setGateway`.

<i>

Mirrors the input invariants enforced by `setGateway` so that callers (for
instance, a timelock policy) can fail early at queue time rather than at
execution time.

</i>

```solidity
function validateSetGateway(address gateway_) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway_ | `address` | The candidate gateway address. |

<a id="validatesetconfigurator-address"></a>

### validateSetConfigurator

Validates the payload that would be passed to `setConfigurator`.

<i>

Mirrors the payload invariants enforced by `setConfigurator`: the zero-address
check and the ERC-165 `ILZBridgeAndDelegateConfig` guard.

</i>

```solidity
function validateSetConfigurator(address newConfigurator_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConfigurator_ | `address` | The candidate configurator address. |

<a id="gateway"></a>

### gateway

Returns the LZBridgeGateway address.

```solidity
function gateway() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="reenabler"></a>

### reEnabler

Returns the address authorized to call `reEnable()`.

<i>

Returns `address(0)` when no re-enabler has been configured.

</i>

```solidity
function reEnabler() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="configurator"></a>

### configurator

Returns the configurator address (an `LZBridgeAndDelegateConfig` instance).

<i>

Returns `address(0)` before the owner has performed the bootstrap call.

</i>

```solidity
function configurator() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="ohm"></a>

### OHM

Returns the OHM token address.

```solidity
function OHM() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="estimatesendfee-uint32-address-uint256"></a>

### estimateSendFee

Estimates the fee for sending OHM to a destination chain.

```solidity
function estimateSendFee(
        uint32 dstEid_,
        address to_,
        uint256 amount_
    ) external view returns (MessagingFee memory fee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | `MessagingFee` | The estimated messaging fee (native + lzToken (unused)). |

<a id="sendable-uint32"></a>

### sendable

Returns the current outbound capacity for a destination endpoint, with the
in-flight amount decayed against the current timestamp.

```solidity
function sendable(uint32 dstEid_) external view returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed outbound in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be sent to the destination before the<br/>outbound rate limit is exceeded. |

<a id="receivable-uint32"></a>

### receivable

Returns the current inbound capacity for a source endpoint, with the
in-flight amount decayed against the current timestamp.

```solidity
function receivable(uint32 srcEid_) external view returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The LayerZero source endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed inbound in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be received from the source before<br/>the inbound rate limit is exceeded. |

## Events

### Bridged

Emitted when OHM is sent to another chain.

```solidity
event Bridged(
        address indexed sender,
        uint256 amount,
        uint32 indexed dstEid,
        uint256 nativeFee,
        uint256 msgValue
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The address that initiated the bridge transfer. |
| amount | `uint256` | The amount of OHM bridged. |
| dstEid | `uint32` | The LayerZero destination endpoint ID. |
| nativeFee | `uint256` | The native token fee actually charged by LayerZero, read from<br/>`MessagingReceipt`. May be less than `msgValue` when the caller overpays;<br/>the excess is refunded to the sender by the LayerZero endpoint. |
| msgValue | `uint256` | The native value the caller supplied with the transaction. |

### GatewaySet

Emitted when the gateway address is updated.

```solidity
event GatewaySet(address indexed gateway);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway | `address` | The new gateway address. |

### ReEnablerSet

Emitted when the re-enabler address is updated.

<i>

Setting the re-enabler to the zero address effectively disables the
`reEnable()` entry point until a non-zero address is configured again.

</i>

```solidity
event ReEnablerSet(address indexed reEnabler);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reEnabler | `address` | The new re-enabler address, or `address(0)` to clear. |

### ConfiguratorSet

Emitted when the configurator address is updated.

```solidity
event ConfiguratorSet(address indexed configurator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configurator | `address` | The new configurator address. |

## Errors

### LZCrossChainBridge_InvalidAddress

Thrown when an address argument is the zero address.

```solidity
error LZCrossChainBridge_InvalidAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the invalid parameter. |

### LZCrossChainBridge_InsufficientAmount

Thrown when the send amount is zero.

```solidity
error LZCrossChainBridge_InsufficientAmount();
```

### LZCrossChainBridge_InvalidConfigurator

Thrown when `setConfigurator` is supplied a contract that does not implement the
`ILZBridgeAndDelegateConfig` interface via ERC-165.

```solidity
error LZCrossChainBridge_InvalidConfigurator(address newConfigurator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConfigurator | `address` | The unsupported new configurator address. |
