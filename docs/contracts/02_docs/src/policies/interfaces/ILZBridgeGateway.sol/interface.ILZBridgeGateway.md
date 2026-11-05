# ILZBridgeGateway

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/ILZBridgeGateway.sol)

**Inherits:** [IOffsettingRateLimiter](/main/contracts/docs/src/bases/interfaces/IOffsettingRateLimiter.sol/interface.IOffsettingRateLimiter)

**Title:** ILZBridgeGateway

Interface for the LZ Bridge Gateway infrastructure policy (LayerZero V2).

<i>

Handles LayerZero endpoint communication, OHM mint/burn via MINTR, peer management,
enforced options, bidirectional rate limiting, and bridged supply tracking.

</i>

## Functions

<a id="burnandsend-uint32-address-uint256-address-payable-bytes"></a>

### burnAndSend

Burns OHM held by the gateway and sends a bridge message to a destination chain.

<i>

Only callable by an address with the `bridge_facilitator` role. The caller must
transfer OHM to the gateway before calling this function. The gateway burns the OHM
via MINTR and sends a LayerZero V2 message.

</i>

On canonical chains, increments bridgedSupply.

```solidity
function burnAndSend(
        uint32 dstEid_,
        address to_,
        uint256 amount_,
        address payable refundAddress_,
        bytes calldata extraOptions_
    ) external payable returns (MessagingReceipt memory receipt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to burn and send. |
| refundAddress_ | `address payable` | The address to receive excess native token refund. |
| extraOptions_ | `bytes` | Additional Type 3 options to combine with enforced options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receipt | `MessagingReceipt` | The LayerZero messaging receipt. `receipt.fee.nativeFee` is the<br/>actual native amount charged by the endpoint (may be less than msg.value;<br/>excess is refunded to `refundAddress_`). |

<a id="estimatesendfee-uint32-address-uint256-bytes"></a>

### estimateSendFee

Estimates the fee for sending OHM to a destination chain.

```solidity
function estimateSendFee(
        uint32 dstEid_,
        address to_,
        uint256 amount_,
        bytes calldata extraOptions_
    ) external view returns (MessagingFee memory fee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |
| extraOptions_ | `bytes` | Additional Type 3 options to combine with enforced options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | `MessagingFee` | The estimated messaging fee (native + lzToken). |

<a id="setpeer-uint32-bytes32"></a>

### setPeer

Sets the peer gateway address for a remote endpoint ID (destination).

<i>

Only callable by the admin role. Pass `bytes32(0)` to clear.

</i>

```solidity
function setPeer(uint32 eid_, bytes32 peer_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The remote endpoint ID. |
| peer_ | `bytes32` | The peer (remote gateway) address (bytes32 or `bytes32(0)` to clear). |

<a id="setisreceiveenabled-bool"></a>

### setIsReceiveEnabled

Sets whether the gateway can process inbound LayerZero messages.

<i>

Only callable by the emergency or admin role.

</i>

```solidity
function setIsReceiveEnabled(bool isReceiveEnabled_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isReceiveEnabled_ | `bool` | The desired state of the flag. |

<a id="setdelegate-address"></a>

### setDelegate

Sets the delegate on the LayerZero endpoint.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).

</i>

The delegate is authorized to configure anything on the LayerZero endpoint
on behalf of this contract (e.g. send/receive libraries, DVN config).
`delegate_` must be nonzero: the delegate cannot be cleared, only replaced
with another nonzero address.

```solidity
function setDelegate(address delegate_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate_ | `address` | The new delegate address; must be nonzero. |

<a id="initializebridgedsupply-uint256"></a>

### initializeBridgedSupply

One-shot bootstrap of the bridged supply on the canonical chain.

<i>

Only callable by the `bridge_admin` or `admin` role and only on canonical chains.

</i>

```solidity
function initializeBridgedSupply(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The initial bridged supply to write. |

<a id="increasebridgedsupply-uint256"></a>

### increaseBridgedSupply

Increases the bridged supply by the given amount and syncs the MINTR mint approval.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).
Only available on canonical chains.
Used for error-recovery (e.g. supply underflow caused by misrouted messages).
Delta-based to avoid race conditions with concurrent bridge messages.

</i>

```solidity
function increaseBridgedSupply(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount to increase bridged supply by. |

<a id="decreasebridgedsupply-uint256"></a>

### decreaseBridgedSupply

Decreases the bridged supply by the given amount and syncs the MINTR mint approval.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).
Only available on canonical chains.
Used for error-recovery (e.g. correcting supply after undeliverable messages).
Delta-based to avoid race conditions with concurrent bridge messages.

</i>

```solidity
function decreaseBridgedSupply(uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The amount to decrease bridged supply by. |

<a id="setenforcedoptions-enforcedoptionparam"></a>

### setEnforcedOptions

Sets enforced options for specific endpoint and message type combinations.

<i>

Only callable by the admin role. Each option must be Type 3.

</i>

```solidity
function setEnforcedOptions(EnforcedOptionParam[] calldata enforcedOptions_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enforcedOptions_ | `EnforcedOptionParam[]` | Array of enforced option parameters. |

<a id="setoutratelimits-ratelimitconfig"></a>

### setOutRateLimits

Configures outbound rate limits for one or more destination endpoints.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).

</i>

```solidity
function setOutRateLimits(RateLimitConfig[] calldata configs_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The outbound rate limit configurations to apply. |

<a id="setinratelimits-ratelimitconfig"></a>

### setInRateLimits

Configures inbound rate limits for one or more source endpoints.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).

</i>

```solidity
function setInRateLimits(RateLimitConfig[] calldata configs_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The inbound rate limit configurations to apply. |

<a id="clearoutboundinflight-uint32"></a>

### clearOutboundInFlight

Clears the outbound in-flight amount for one or more destination endpoints.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).

</i>

```solidity
function clearOutboundInFlight(uint32[] calldata eids_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The endpoint identifiers whose outbound in-flight amount should be cleared. |

<a id="clearinboundinflight-uint32"></a>

### clearInboundInFlight

Clears the inbound in-flight amount for one or more source endpoints.

<i>

Only callable by the `bridge_configurator` role, which is expected to be
granted exclusively to `LZBridgeAndDelegateConfig` (the timelock policy).

</i>

```solidity
function clearInboundInFlight(uint32[] calldata eids_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The endpoint identifiers whose inbound in-flight amount should be cleared. |

<a id="validatesetdelegate-address"></a>

### validateSetDelegate

Validates the payload that would be passed to `setDelegate`.

<i>

Mirrors the input invariants enforced by `setDelegate` so that callers (for
instance, a timelock policy) can fail early at queue time rather than at
execution time.

</i>

```solidity
function validateSetDelegate(address delegate_) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate_ | `address` | The candidate delegate address. |

<a id="validateincreasebridgedsupply-uint256"></a>

### validateIncreaseBridgedSupply

Validates the payload that would be passed to `increaseBridgedSupply`.

<i>

Mirrors the input invariants enforced by `increaseBridgedSupply` so that
callers (for instance, a timelock policy) can fail early at queue time rather
than at execution time.

</i>

```solidity
function validateIncreaseBridgedSupply(uint256 amount_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The candidate increase amount. |

<a id="validatedecreasebridgedsupply-uint256"></a>

### validateDecreaseBridgedSupply

Validates the payload that would be passed to `decreaseBridgedSupply`.

<i>

Mirrors the input invariants enforced by `decreaseBridgedSupply` so that
callers (for instance, a timelock policy) can fail early at queue time rather
than at execution time.

</i>

```solidity
function validateDecreaseBridgedSupply(uint256 amount_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` | The candidate decrease amount. |

<a id="lz_endpoint"></a>

### LZ_ENDPOINT

The LayerZero V2 endpoint address.

```solidity
function LZ_ENDPOINT() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="ohm"></a>

### ohm

Returns the OHM token address.

```solidity
function ohm() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="bridgedsupply"></a>

### bridgedSupply

Returns the current bridged supply (canonical only).

```solidity
function bridgedSupply() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="bridgedsupplyinitialized"></a>

### bridgedSupplyInitialized

Returns whether the one-shot `initializeBridgedSupply` has already succeeded.

```solidity
function bridgedSupplyInitialized() external view returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="peers-uint32"></a>

### peers

Returns the peer for a given endpoint ID.

```solidity
function peers(uint32 eid) external view returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The remote endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The peer address (as bytes32). |

<a id="enforcedoptions-uint32-uint16"></a>

### enforcedOptions

Returns the enforced options for a given endpoint and message type.

```solidity
function enforcedOptions(uint32 eid, uint16 msgType) external view returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The endpoint ID. |
| msgType | `uint16` | The message type. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | The enforced options bytes. |

<a id="combineoptions-uint32-uint16-bytes"></a>

### combineOptions

Combines enforced options with caller-provided extra options.

```solidity
function combineOptions(
        uint32 eid_,
        uint16 msgType_,
        bytes calldata extraOptions_
    ) external view returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The endpoint ID. |
| msgType_ | `uint16` | The message type. |
| extraOptions_ | `bytes` | Caller-provided options. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | The combined options bytes. |

<a id="isreceiveenabled"></a>

### isReceiveEnabled

Whether lzReceive() can process incoming messages.

<i>

Automatically set to true by enable() and false by disable().
Can be manually set via setIsReceiveEnabled() to allow receiving
while the gateway is otherwise disabled (e.g., during gateway replacements).

</i>

```solidity
function isReceiveEnabled() external view returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="is_canonical"></a>

### IS_CANONICAL

Returns whether this is the canonical (mainnet) chain.

```solidity
function IS_CANONICAL() external view returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="msg_bridge_ohm"></a>

### MSG_BRIDGE_OHM

Returns the message type identifier for OHM bridge transfers.

```solidity
function MSG_BRIDGE_OHM() external view returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

## Events

### Sent

Emitted when OHM is burned and sent to another chain.

```solidity
event Sent(address indexed sender, uint256 amount, uint32 indexed dstEid, bytes32 guid);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | `address` | The address that initiated the send. |
| amount | `uint256` | The amount of OHM sent. |
| dstEid | `uint32` | The destination endpoint ID. |
| guid | `bytes32` | The LayerZero message GUID. |

### Received

Emitted when OHM is received and minted from another chain.

```solidity
event Received(address indexed receiver, uint256 amount, uint32 indexed srcEid, bytes32 guid);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver | `address` | The address that received the minted OHM. |
| amount | `uint256` | The amount of OHM minted. |
| srcEid | `uint32` | The LayerZero source endpoint ID. |
| guid | `bytes32` | The LayerZero message GUID. |

### PeerSet

Emitted when a peer is set for a destination endpoint.

```solidity
event PeerSet(uint32 eid, bytes32 peer);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The endpoint ID. |
| peer | `bytes32` | The peer address (bytes32). |

### DelegateSet

Emitted when the delegate is set on the endpoint.

```solidity
event DelegateSet(address indexed delegate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegate | `address` | The new delegate address. |

### BridgedSupplyInitialized

Emitted when the bridged supply is initialized via the one-shot bootstrap path.

```solidity
event BridgedSupplyInitialized(uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The initial bridged supply written to the gateway. |

### BridgedSupplyForciblyIncreased

Emitted when bridged supply is forcibly increased by an admin.

```solidity
event BridgedSupplyForciblyIncreased(uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount added. |

### BridgedSupplyForciblyDecreased

Emitted when bridged supply is forcibly decreased by an admin.

```solidity
event BridgedSupplyForciblyDecreased(uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount subtracted. |

### BridgedSupplyIncreased

Emitted when bridged supply increases (outbound transfer on canonical chain).

```solidity
event BridgedSupplyIncreased(uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount added. |

### BridgedSupplyDecreased

Emitted when bridged supply decreases (inbound transfer on canonical chain).

```solidity
event BridgedSupplyDecreased(uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` | The amount subtracted. |

### EnforcedOptionsSet

Emitted when enforced options are set.

```solidity
event EnforcedOptionsSet(EnforcedOptionParam[] enforcedOptions);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enforcedOptions | `EnforcedOptionParam[]` | The enforced option parameters. |

### IsReceiveEnabledSet

Emitted when the isReceiveEnabled flag is changed.

```solidity
event IsReceiveEnabledSet(bool isReceiveEnabled);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isReceiveEnabled | `bool` | The new value. |

## Errors

### LZBridgeGateway_InvalidAddress

Thrown when an address argument is the zero address.

```solidity
error LZBridgeGateway_InvalidAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the invalid parameter. |

### LZBridgeGateway_OnlyEndpoint

Thrown when msg.sender is not the LayerZero endpoint.

```solidity
error LZBridgeGateway_OnlyEndpoint();
```

### LZBridgeGateway_OnlyPeer

Thrown when a message originates from a non-peer source.

```solidity
error LZBridgeGateway_OnlyPeer(uint32 eid, bytes32 sender);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The source endpoint ID. |
| sender | `bytes32` | The sender bytes32 address. |

### LZBridgeGateway_NoPeer

Thrown when no peer is configured for a destination endpoint.

```solidity
error LZBridgeGateway_NoPeer(uint32 eid);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The endpoint ID. |

### LZBridgeGateway_InvalidMessageType

Thrown when a received message has an unknown message type.

```solidity
error LZBridgeGateway_InvalidMessageType(uint8 msgType);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| msgType | `uint8` | The unknown message type. |

### LZBridgeGateway_InvalidPayload

Thrown when a received message payload has an invalid length.

```solidity
error LZBridgeGateway_InvalidPayload();
```

### LZBridgeGateway_BridgedSupplyUnderflow

Thrown when the bridged supply would underflow on receive.

```solidity
error LZBridgeGateway_BridgedSupplyUnderflow(uint256 bridgedSupply, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgedSupply | `uint256` | The current bridged supply. |
| amount | `uint256` | The amount being received. |

### LZBridgeGateway_NotCanonical

Thrown when a canonical-only function is called on a non-canonical chain.

```solidity
error LZBridgeGateway_NotCanonical();
```

### LZBridgeGateway_InvalidOptions

Thrown when options are invalid (not Type 3 or malformed).

```solidity
error LZBridgeGateway_InvalidOptions(bytes options);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| options | `bytes` | The invalid options bytes. |

### LZBridgeGateway_ReceiveNotEnabled

Thrown when lzReceive is called while receiving is disabled.

```solidity
error LZBridgeGateway_ReceiveNotEnabled();
```

### LZBridgeGateway_ReceiveAlreadyInDesiredState

Thrown when setIsReceiveEnabled is called with the current value.

```solidity
error LZBridgeGateway_ReceiveAlreadyInDesiredState();
```

### LZBridgeGateway_BridgedSupplyAlreadyInitialized

Thrown when `initializeBridgedSupply` is called after it has already succeeded.

```solidity
error LZBridgeGateway_BridgedSupplyAlreadyInitialized();
```

### LZBridgeGateway_BridgedSupplyAlreadyNonZero

Thrown when `initializeBridgedSupply` is called while `bridgedSupply` is non-zero.

```solidity
error LZBridgeGateway_BridgedSupplyAlreadyNonZero(uint256 bridgedSupply);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bridgedSupply | `uint256` | The current bridged supply. |

### LZBridgeGateway_ZeroAmount

Thrown when an amount argument is zero. Used by `initializeBridgedSupply`,
`increaseBridgedSupply`, and `decreaseBridgedSupply`.

```solidity
error LZBridgeGateway_ZeroAmount();
```
