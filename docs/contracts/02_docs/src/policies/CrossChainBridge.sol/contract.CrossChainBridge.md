# CrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/CrossChainBridge.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ILayerZeroReceiver, ILayerZeroUserApplicationConfig

Message bridge for cross-chain OHM transfers.

<i>

Uses LayerZero as communication protocol.

</i>

<i>

Each chain needs to `setTrustedRemoteAddress` for each remote address
it intends to receive from.

</i>

## Constants

### lzEndpoint

```solidity
ILayerZeroEndpoint public immutable lzEndpoint;
```

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR;
```

### ohm

```solidity
ERC20 public ohm;
```

### bridgeActive

Flag to determine if bridge is allowed to send messages or not

```solidity
bool public bridgeActive;
```

### failedMessages

Storage for failed messages on receive.

chainID => source address => endpoint nonce

```solidity
mapping(uint16 => mapping(bytes => mapping(uint64 => bytes32))) public failedMessages;
```

### trustedRemoteLookup

Trusted remote paths. Must be set by admin.

```solidity
mapping(uint16 => bytes) public trustedRemoteLookup;
```

### precrime

LZ precrime address. Currently unused.

```solidity
address public precrime;
```

## Functions

<a id="constructor-kernel-address"></a>

### constructor

```solidity
constructor(Kernel kernel_, address endpoint_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| endpoint_ | `address` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="sendohm-uint16-address-uint256"></a>

### sendOhm

Send OHM to an eligible chain

```solidity
function sendOhm(uint16 dstChainId_, address to_, uint256 amount_) external payable;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainId_ | `uint16` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |

<a id="_receivemessage-uint16-bytes-uint64-bytes"></a>

### _receiveMessage

Implementation of receiving an LZ message

<i>

Function must be public to be called by low-level call in lzReceive

</i>

```solidity
function _receiveMessage(
        uint16 srcChainId_,
        bytes memory,
        uint64,
        bytes memory payload_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| _ | `bytes` |  |
| _ | `uint64` |  |
| payload_ | `bytes` |  |

<a id="lzreceive-uint16-bytes-uint64-bytes"></a>

### lzReceive

```solidity
function lzReceive(
        uint16 srcChainId_,
        bytes calldata srcAddress_,
        uint64 nonce_,
        bytes calldata payload_
    ) public virtual override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |
| nonce_ | `uint64` |  |
| payload_ | `bytes` |  |

<a id="receivemessage-uint16-bytes-uint64-bytes"></a>

### receiveMessage

Implementation of receiving an LZ message

<i>

Function must be public to be called by low-level call in lzReceive

</i>

```solidity
function receiveMessage(
        uint16 srcChainId_,
        bytes memory srcAddress_,
        uint64 nonce_,
        bytes memory payload_
    ) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |
| nonce_ | `uint64` |  |
| payload_ | `bytes` |  |

<a id="retrymessage-uint16-bytes-uint64-bytes"></a>

### retryMessage

Retry a failed receive message

```solidity
function retryMessage(
        uint16 srcChainId_,
        bytes calldata srcAddress_,
        uint64 nonce_,
        bytes calldata payload_
    ) public payable virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |
| nonce_ | `uint64` |  |
| payload_ | `bytes` |  |

<a id="_sendmessage-uint16-bytes-address-payable-address-bytes-uint256"></a>

### _sendMessage

Internal function for sending a message across chains.

<i>

Params defined in ILayerZeroEndpoint `send` function.

</i>

```solidity
function _sendMessage(
        uint16 dstChainId_,
        bytes memory payload_,
        address payable refundAddress_,
        address zroPaymentAddress_,
        bytes memory adapterParams_,
        uint256 nativeFee_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainId_ | `uint16` |  |
| payload_ | `bytes` |  |
| refundAddress_ | `address payable` |  |
| zroPaymentAddress_ | `address` |  |
| adapterParams_ | `bytes` |  |
| nativeFee_ | `uint256` |  |

<a id="estimatesendfee-uint16-address-uint256-bytes"></a>

### estimateSendFee

Function to estimate how much gas is needed to send OHM

<i>

Should be called by frontend before making sendOhm call.

</i>

```solidity
function estimateSendFee(
        uint16 dstChainId_,
        address to_,
        uint256 amount_,
        bytes calldata adapterParams_
    ) external view returns (uint256 nativeFee, uint256 zroFee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainId_ | `uint16` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |
| adapterParams_ | `bytes` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| nativeFee | `uint256` | - Native token amount to send to sendOhm |
| zroFee | `uint256` | - Fee paid in ZRO token. Unused. |

<a id="setconfig-uint16-uint16-uint256-bytes"></a>

### setConfig

Generic config for LayerZero User Application

```solidity
function setConfig(
        uint16 version_,
        uint16 chainId_,
        uint256 configType_,
        bytes calldata config_
    ) external override onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| version_ | `uint16` |  |
| chainId_ | `uint16` |  |
| configType_ | `uint256` |  |
| config_ | `bytes` |  |

<a id="setsendversion-uint16"></a>

### setSendVersion

Set send version of endpoint to be used by LayerZero User Application

```solidity
function setSendVersion(uint16 version_) external override onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| version_ | `uint16` |  |

<a id="setreceiveversion-uint16"></a>

### setReceiveVersion

Set receive version of endpoint to be used by LayerZero User Application

```solidity
function setReceiveVersion(uint16 version_) external override onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| version_ | `uint16` |  |

<a id="forceresumereceive-uint16-bytes"></a>

### forceResumeReceive

Retries a received message. Used as last resort if retryPayload fails.

<i>

Unblocks queue and DESTROYS transaction forever. USE WITH CAUTION.

</i>

```solidity
function forceResumeReceive(
        uint16 srcChainId_,
        bytes calldata srcAddress_
    ) external override onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |

<a id="settrustedremote-uint16-bytes"></a>

### setTrustedRemote

Sets the trusted path for the cross-chain communication

<i>

path_ = abi.encodePacked(remoteAddress, localAddress)

</i>

```solidity
function setTrustedRemote(
        uint16 srcChainId_,
        bytes calldata path_
    ) external onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| path_ | `bytes` |  |

<a id="settrustedremoteaddress-uint16-bytes"></a>

### setTrustedRemoteAddress

Convenience function for setting trusted paths between EVM addresses

```solidity
function setTrustedRemoteAddress(
        uint16 remoteChainId_,
        bytes calldata remoteAddress_
    ) external onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainId_ | `uint16` |  |
| remoteAddress_ | `bytes` |  |

<a id="setprecrime-address"></a>

### setPrecrime

Sets precrime address

```solidity
function setPrecrime(address precrime_) external onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| precrime_ | `address` |  |

<a id="setbridgestatus-bool"></a>

### setBridgeStatus

Activate or deactivate the bridge

```solidity
function setBridgeStatus(bool isActive_) external onlyRole("bridge_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isActive_ | `bool` |  |

<a id="getconfig-uint16-uint16-address-uint256"></a>

### getConfig

Gets endpoint config for this contract

```solidity
function getConfig(
        uint16 version_,
        uint16 chainId_,
        address,
        uint256 configType_
    ) external view returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| version_ | `uint16` |  |
| chainId_ | `uint16` |  |
| _ | `address` |  |
| configType_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` |  |

<a id="gettrustedremoteaddress-uint16"></a>

### getTrustedRemoteAddress

Get trusted remote for the given chain as an

```solidity
function getTrustedRemoteAddress(uint16 remoteChainId_) external view returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainId_ | `uint16` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` |  |

<a id="istrustedremote-uint16-bytes"></a>

### isTrustedRemote

```solidity
function isTrustedRemote(
        uint16 srcChainId_,
        bytes calldata srcAddress_
    ) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

## Events

### BridgeTransferred

```solidity
event BridgeTransferred(address indexed sender_, uint256 amount_, uint16 indexed dstChain_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender_ | `address` |  |
| amount_ | `uint256` |  |
| dstChain_ | `uint16` |  |

### BridgeReceived

```solidity
event BridgeReceived(address indexed receiver_, uint256 amount_, uint16 indexed srcChain_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver_ | `address` |  |
| amount_ | `uint256` |  |
| srcChain_ | `uint16` |  |

### MessageFailed

```solidity
event MessageFailed(
        uint16 srcChainId_,
        bytes srcAddress_,
        uint64 nonce_,
        bytes payload_,
        bytes reason_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |
| nonce_ | `uint64` |  |
| payload_ | `bytes` |  |
| reason_ | `bytes` |  |

### RetryMessageSuccess

```solidity
event RetryMessageSuccess(
        uint16 srcChainId_,
        bytes srcAddress_,
        uint64 nonce_,
        bytes32 payloadHash_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcChainId_ | `uint16` |  |
| srcAddress_ | `bytes` |  |
| nonce_ | `uint64` |  |
| payloadHash_ | `bytes32` |  |

### SetPrecrime

```solidity
event SetPrecrime(address precrime_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| precrime_ | `address` |  |

### SetTrustedRemote

```solidity
event SetTrustedRemote(uint16 remoteChainId_, bytes path_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainId_ | `uint16` |  |
| path_ | `bytes` |  |

### SetTrustedRemoteAddress

```solidity
event SetTrustedRemoteAddress(uint16 remoteChainId_, bytes remoteAddress_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChainId_ | `uint16` |  |
| remoteAddress_ | `bytes` |  |

### SetMinDstGas

```solidity
event SetMinDstGas(uint16 dstChainId_, uint16 type_, uint256 _minDstGas);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainId_ | `uint16` |  |
| type_ | `uint16` |  |
| _minDstGas | `uint256` |  |

### BridgeStatusSet

```solidity
event BridgeStatusSet(bool isActive_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isActive_ | `bool` |  |

## Errors

### Bridge_InsufficientAmount

```solidity
error Bridge_InsufficientAmount();
```

### Bridge_InvalidCaller

```solidity
error Bridge_InvalidCaller();
```

### Bridge_InvalidMessageSource

```solidity
error Bridge_InvalidMessageSource();
```

### Bridge_NoStoredMessage

```solidity
error Bridge_NoStoredMessage();
```

### Bridge_InvalidPayload

```solidity
error Bridge_InvalidPayload();
```

### Bridge_DestinationNotTrusted

```solidity
error Bridge_DestinationNotTrusted();
```

### Bridge_NoTrustedPath

```solidity
error Bridge_NoTrustedPath();
```

### Bridge_Deactivated

```solidity
error Bridge_Deactivated();
```

### Bridge_TrustedRemoteUninitialized

```solidity
error Bridge_TrustedRemoteUninitialized();
```
