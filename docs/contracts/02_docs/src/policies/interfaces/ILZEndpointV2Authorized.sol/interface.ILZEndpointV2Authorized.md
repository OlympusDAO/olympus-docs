# ILZEndpointV2Authorized

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/ILZEndpointV2Authorized.sol)

**Title:** ILZEndpointV2Authorized

Subset of LayerZero EndpointV2 operations protected by
EndpointV2._assertAuthorized (msg.sender must be the OApp itself
or its registered delegate). Covers MessageLibManager configuration
(libraries, ULN/Executor config) and MessagingChannel inbound
control (skip / nilify / burn / clear).

<i>

Implementations are the OApp's delegate from the Endpoint's perspective
and call into EndpointV2 on their own behalf. Access control on the
external entrypoints is the implementation's responsibility.

</i>

## Functions

<a id="setsendlibrary-uint32-address"></a>

### setSendLibrary

Pins send library for a destination EID.

```solidity
function setSendLibrary(uint32 eid_, address lib_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The destination endpoint ID. |
| lib_ | `address` | The send library address to pin. |

<a id="setreceivelibrary-uint32-address-uint256"></a>

### setReceiveLibrary

Pins receive library for a source EID.

```solidity
function setReceiveLibrary(uint32 eid_, address lib_, uint256 gracePeriod_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The source endpoint ID. |
| lib_ | `address` | The receive library address to pin. |
| gracePeriod_ | `uint256` | Grace period for migration (0 for immediate). |

<a id="setreceivelibrarytimeout-uint32-address-uint256"></a>

### setReceiveLibraryTimeout

Sets receive library timeout for migration.

```solidity
function setReceiveLibraryTimeout(uint32 eid_, address lib_, uint256 expiry_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The source endpoint ID. |
| lib_ | `address` | The library address. |
| expiry_ | `uint256` | The expiry timestamp. |

<a id="setendpointconfig-address-setconfigparam"></a>

### setEndpointConfig

Sets ULN/Executor config on a message library.

```solidity
function setEndpointConfig(address lib_, SetConfigParam[] calldata params_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lib_ | `address` | The message library address. |
| params_ | `SetConfigParam[]` | Array of config parameters per EID. |

<a id="skip-uint32-bytes32-uint64"></a>

### skip

Skips a nonce for a source path.

```solidity
function skip(uint32 srcEid_, bytes32 sender_, uint64 nonce_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce to skip. |

<a id="nilify-uint32-bytes32-uint64-bytes32"></a>

### nilify

Nilifies a payload for a source path.

```solidity
function nilify(uint32 srcEid_, bytes32 sender_, uint64 nonce_, bytes32 payloadHash_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce of the message. |
| payloadHash_ | `bytes32` | The hash of the payload to nilify. |

<a id="burn-uint32-bytes32-uint64-bytes32"></a>

### burn

Burns a payload for a source path.

```solidity
function burn(uint32 srcEid_, bytes32 sender_, uint64 nonce_, bytes32 payloadHash_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce of the message. |
| payloadHash_ | `bytes32` | The hash of the payload to burn. |

<a id="clear-origin-bytes32-bytes"></a>

### clear

Clears a verified but unexecuted inbound message.

```solidity
function clear(Origin calldata origin_, bytes32 guid_, bytes calldata message_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| origin_ | `Origin` | The origin of the message. |
| guid_ | `bytes32` | The GUID of the message. |
| message_ | `bytes` | The message bytes. |
