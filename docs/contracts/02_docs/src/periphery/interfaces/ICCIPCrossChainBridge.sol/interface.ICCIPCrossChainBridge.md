# ICCIPCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/periphery/interfaces/ICCIPCrossChainBridge.sol)

## Functions

### getFeeSVM

Gets the fee for sending OHM to the specified destination SVM chain

This can be used to send to an address on any chain supported by CCIP

```solidity
function getFeeSVM(uint64 dstChainSelector_, bytes32 to_, uint256 amount_) external view returns (uint256 fee_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`bytes32`|                 The destination address|
|`amount_`|`uint256`|             The amount of OHM to send|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fee_`|`uint256`|               The fee for sending OHM to the specified destination chain|

### getFeeEVM

Gets the fee for sending OHM to the specified destination EVM chain

This can be used to send to an address on any EVM chain supported by CCIP

```solidity
function getFeeEVM(uint64 dstChainSelector_, address to_, uint256 amount_) external view returns (uint256 fee_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`address`|                 The destination address|
|`amount_`|`uint256`|             The amount of OHM to send|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`fee_`|`uint256`|               The fee for sending OHM to the specified destination EVM chain|

### sendToSVM

Sends OHM to the specified destination SVM chain

This can be used to send to an address on any chain supported by CCIP

```solidity
function sendToSVM(uint64 dstChainSelector_, bytes32 to_, uint256 amount_)
    external
    payable
    returns (bytes32 messageId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`bytes32`|                 The destination address|
|`amount_`|`uint256`|             The amount of OHM to send|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|          The message ID of the sent message|

### sendToEVM

Sends OHM to the specified destination EVM chain

This can be used to send to an address on any EVM chain supported by CCIP

```solidity
function sendToEVM(uint64 dstChainSelector_, address to_, uint256 amount_)
    external
    payable
    returns (bytes32 messageId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`address`|                 The destination address|
|`amount_`|`uint256`|             The amount of OHM to send|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|          The message ID of the sent message|

### getFailedMessage

Gets the failed message for the specified message ID

```solidity
function getFailedMessage(bytes32 messageId_) external view returns (ICCIPClient.Any2EVMMessage memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId_`|`bytes32`|The message ID|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ICCIPClient.Any2EVMMessage`|message_ The failed message|

### retryFailedMessage

Retries a failed message

```solidity
function retryFailedMessage(bytes32 messageId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId_`|`bytes32`|The message ID|

### withdraw

Allows the owner to withdraw the native token from the contract

This is needed as senders may provide more native token than needed to cover fees

```solidity
function withdraw(address recipient_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient_`|`address`| The recipient of the native token|

### setTrustedRemoteEVM

Sets the trusted remote for the specified destination EVM chain

This is needed to send/receive messages to/from the specified destination EVM chain

```solidity
function setTrustedRemoteEVM(uint64 dstChainSelector_, address to_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`address`|                 The destination address|

### unsetTrustedRemoteEVM

Unsets the trusted remote for the specified destination EVM chain

This is needed to stop sending/receiving messages to/from the specified destination EVM chain

```solidity
function unsetTrustedRemoteEVM(uint64 dstChainSelector_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

### getTrustedRemoteEVM

Gets the trusted remote for the specified destination EVM chain

```solidity
function getTrustedRemoteEVM(uint64 dstChainSelector_) external view returns (TrustedRemoteEVM memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`TrustedRemoteEVM`|to_                The destination address|

### setTrustedRemoteSVM

Sets the trusted remote for the specified destination SVM chain

This is needed to send/receive messages to/from the specified destination SVM chain

```solidity
function setTrustedRemoteSVM(uint64 dstChainSelector_, bytes32 to_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`bytes32`|                 The destination address|

### unsetTrustedRemoteSVM

Unsets the trusted remote for the specified destination SVM chain

This is needed to stop sending/receiving messages to/from the specified destination SVM chain

```solidity
function unsetTrustedRemoteSVM(uint64 dstChainSelector_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

### getTrustedRemoteSVM

Gets the trusted remote for the specified destination SVM chain

```solidity
function getTrustedRemoteSVM(uint64 dstChainSelector_) external view returns (TrustedRemoteSVM memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`TrustedRemoteSVM`|to_                The destination address|

### setGasLimit

Sets the gas limit for the specified destination chain

```solidity
function setGasLimit(uint64 dstChainSelector_, uint32 gasLimit_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`gasLimit_`|`uint32`|           The gas limit|

### getGasLimit

Gets the gas limit for the specified destination chain

```solidity
function getGasLimit(uint64 dstChainSelector_) external view returns (uint32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|gasLimit_           The gas limit, or 0 if not set|

### getCCIPRouter

Gets the CCIP router address

```solidity
function getCCIPRouter() external view returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|ccipRouter_ The CCIP router address|

## Events

### Bridged

```solidity
event Bridged(
    bytes32 messageId, uint64 destinationChainSelector, address indexed sender, uint256 amount, uint256 fees
);
```

### Received

```solidity
event Received(bytes32 messageId, uint64 sourceChainSelector, address indexed sender, uint256 amount);
```

### Withdrawn

```solidity
event Withdrawn(address indexed recipient, uint256 amount);
```

### TrustedRemoteEVMSet

```solidity
event TrustedRemoteEVMSet(uint64 indexed dstChainSelector, address indexed to);
```

### TrustedRemoteEVMUnset

```solidity
event TrustedRemoteEVMUnset(uint64 indexed dstChainSelector);
```

### TrustedRemoteSVMSet

```solidity
event TrustedRemoteSVMSet(uint64 indexed dstChainSelector, bytes32 indexed to);
```

### TrustedRemoteSVMUnset

```solidity
event TrustedRemoteSVMUnset(uint64 indexed dstChainSelector);
```

### GasLimitSet

```solidity
event GasLimitSet(uint64 indexed dstChainSelector, uint32 gasLimit);
```

### MessageFailed

```solidity
event MessageFailed(bytes32 messageId);
```

### RetryMessageSuccess

```solidity
event RetryMessageSuccess(bytes32 messageId);
```

## Errors

### Bridge_InvalidAddress

```solidity
error Bridge_InvalidAddress(string param);
```

### Bridge_ZeroAmount

```solidity
error Bridge_ZeroAmount();
```

### Bridge_InsufficientAmount

```solidity
error Bridge_InsufficientAmount(uint256 expected, uint256 actual);
```

### Bridge_InsufficientNativeToken

```solidity
error Bridge_InsufficientNativeToken(uint256 expected, uint256 actual);
```

### Bridge_TransferFailed

```solidity
error Bridge_TransferFailed(address caller, address recipient, uint256 amount);
```

### Bridge_DestinationNotTrusted

```solidity
error Bridge_DestinationNotTrusted();
```

### Bridge_SourceNotTrusted

```solidity
error Bridge_SourceNotTrusted();
```

### Bridge_InvalidCaller

```solidity
error Bridge_InvalidCaller();
```

### Bridge_FailedMessageNotFound

```solidity
error Bridge_FailedMessageNotFound(bytes32 messageId);
```

### Bridge_InvalidPayloadTokensLength

```solidity
error Bridge_InvalidPayloadTokensLength();
```

### Bridge_InvalidPayloadToken

```solidity
error Bridge_InvalidPayloadToken();
```

### Bridge_TrustedRemoteNotSet

```solidity
error Bridge_TrustedRemoteNotSet();
```

## Structs

### TrustedRemoteEVM

```solidity
struct TrustedRemoteEVM {
    address remoteAddress;
    bool isSet;
}
```

### TrustedRemoteSVM

```solidity
struct TrustedRemoteSVM {
    bytes32 remoteAddress;
    bool isSet;
}
```
