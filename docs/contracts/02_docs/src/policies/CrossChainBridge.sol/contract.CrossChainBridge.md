# CrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/CrossChainBridge.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ILayerZeroReceiver, ILayerZeroUserApplicationConfig

Message bridge for cross-chain OHM transfers.

Uses LayerZero as communication protocol.

Each chain needs to `setTrustedRemoteAddress` for each remote address
it intends to receive from.

## State Variables

### MINTR

```solidity
MINTRv1 public MINTR
```

### lzEndpoint

```solidity
ILayerZeroEndpoint public immutable lzEndpoint
```

### ohm

```solidity
ERC20 public ohm
```

### bridgeActive

Flag to determine if bridge is allowed to send messages or not

```solidity
bool public bridgeActive
```

### failedMessages

Storage for failed messages on receive.

chainID => source address => endpoint nonce

```solidity
mapping(uint16 => mapping(bytes => mapping(uint64 => bytes32))) public failedMessages
```

### trustedRemoteLookup

Trusted remote paths. Must be set by admin.

```solidity
mapping(uint16 => bytes) public trustedRemoteLookup
```

### precrime

LZ precrime address. Currently unused.

```solidity
address public precrime
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address endpoint_) Policy(kernel_);
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### sendOhm

Send OHM to an eligible chain

```solidity
function sendOhm(uint16 dstChainId_, address to_, uint256 amount_) external payable;
```

### _receiveMessage

Implementation of receiving an LZ message

Function must be public to be called by low-level call in lzReceive

```solidity
function _receiveMessage(uint16 srcChainId_, bytes memory, uint64, bytes memory payload_) internal;
```

### lzReceive

```solidity
function lzReceive(uint16 srcChainId_, bytes calldata srcAddress_, uint64 nonce_, bytes calldata payload_)
    public
    virtual
    override;
```

### receiveMessage

Implementation of receiving an LZ message

Function must be public to be called by low-level call in lzReceive

```solidity
function receiveMessage(uint16 srcChainId_, bytes memory srcAddress_, uint64 nonce_, bytes memory payload_) public;
```

### retryMessage

Retry a failed receive message

```solidity
function retryMessage(uint16 srcChainId_, bytes calldata srcAddress_, uint64 nonce_, bytes calldata payload_)
    public
    payable
    virtual;
```

### _sendMessage

Internal function for sending a message across chains.

Params defined in ILayerZeroEndpoint `send` function.

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

### estimateSendFee

Function to estimate how much gas is needed to send OHM

Should be called by frontend before making sendOhm call.

```solidity
function estimateSendFee(uint16 dstChainId_, address to_, uint256 amount_, bytes calldata adapterParams_)
    external
    view
    returns (uint256 nativeFee, uint256 zroFee);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`nativeFee`|`uint256`|- Native token amount to send to sendOhm|
|`zroFee`|`uint256`|- Fee paid in ZRO token. Unused.|

### setConfig

Generic config for LayerZero User Application

```solidity
function setConfig(uint16 version_, uint16 chainId_, uint256 configType_, bytes calldata config_)
    external
    override
    onlyRole("bridge_admin");
```

### setSendVersion

Set send version of endpoint to be used by LayerZero User Application

```solidity
function setSendVersion(uint16 version_) external override onlyRole("bridge_admin");
```

### setReceiveVersion

Set receive version of endpoint to be used by LayerZero User Application

```solidity
function setReceiveVersion(uint16 version_) external override onlyRole("bridge_admin");
```

### forceResumeReceive

Retries a received message. Used as last resort if retryPayload fails.

Unblocks queue and DESTROYS transaction forever. USE WITH CAUTION.

```solidity
function forceResumeReceive(uint16 srcChainId_, bytes calldata srcAddress_)
    external
    override
    onlyRole("bridge_admin");
```

### setTrustedRemote

Sets the trusted path for the cross-chain communication

path_ = abi.encodePacked(remoteAddress, localAddress)

```solidity
function setTrustedRemote(uint16 srcChainId_, bytes calldata path_) external onlyRole("bridge_admin");
```

### setTrustedRemoteAddress

Convenience function for setting trusted paths between EVM addresses

```solidity
function setTrustedRemoteAddress(uint16 remoteChainId_, bytes calldata remoteAddress_)
    external
    onlyRole("bridge_admin");
```

### setPrecrime

Sets precrime address

```solidity
function setPrecrime(address precrime_) external onlyRole("bridge_admin");
```

### setBridgeStatus

Activate or deactivate the bridge

```solidity
function setBridgeStatus(bool isActive_) external onlyRole("bridge_admin");
```

### getConfig

Gets endpoint config for this contract

```solidity
function getConfig(uint16 version_, uint16 chainId_, address, uint256 configType_)
    external
    view
    returns (bytes memory);
```

### getTrustedRemoteAddress

Get trusted remote for the given chain as an

```solidity
function getTrustedRemoteAddress(uint16 remoteChainId_) external view returns (bytes memory);
```

### isTrustedRemote

```solidity
function isTrustedRemote(uint16 srcChainId_, bytes calldata srcAddress_) external view returns (bool);
```

## Events

### BridgeTransferred

```solidity
event BridgeTransferred(address indexed sender_, uint256 amount_, uint16 indexed dstChain_);
```

### BridgeReceived

```solidity
event BridgeReceived(address indexed receiver_, uint256 amount_, uint16 indexed srcChain_);
```

### MessageFailed

```solidity
event MessageFailed(uint16 srcChainId_, bytes srcAddress_, uint64 nonce_, bytes payload_, bytes reason_);
```

### RetryMessageSuccess

```solidity
event RetryMessageSuccess(uint16 srcChainId_, bytes srcAddress_, uint64 nonce_, bytes32 payloadHash_);
```

### SetPrecrime

```solidity
event SetPrecrime(address precrime_);
```

### SetTrustedRemote

```solidity
event SetTrustedRemote(uint16 remoteChainId_, bytes path_);
```

### SetTrustedRemoteAddress

```solidity
event SetTrustedRemoteAddress(uint16 remoteChainId_, bytes remoteAddress_);
```

### SetMinDstGas

```solidity
event SetMinDstGas(uint16 dstChainId_, uint16 type_, uint256 _minDstGas);
```

### BridgeStatusSet

```solidity
event BridgeStatusSet(bool isActive_);
```

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
