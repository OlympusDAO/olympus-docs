# CCIPCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/periphery/bridge/CCIPCrossChainBridge.sol)

**Inherits:**
CCIPReceiver, [PeripheryEnabler](/main/contracts/docs/src/periphery/PeripheryEnabler.sol/abstract.PeripheryEnabler), Owned, [ICCIPCrossChainBridge](/main/contracts/docs/src/periphery/interfaces/ICCIPCrossChainBridge.sol/interface.ICCIPCrossChainBridge)

Sends and receives OHM between chains using Chainlink CCIP
It is a periphery contract, as it does not require any privileged access to the Olympus protocol.
The contract is designed to be an intermediary when receiving OHM, so that failed messages can be retried.

## State Variables

### OHM

```solidity
IERC20 public immutable OHM;
```

### _trustedRemoteEVM

Mapping of EVM chain selectors to trusted bridge contracts

*When sending, this is used to determine the initial recipient of a bridging message.
When receiving, this is used to validate the sender of the message.
As the zero address can be a trusted remote, the `isSet` flag is used to determine if the trusted remote is set.*

```solidity
mapping(uint64 => TrustedRemoteEVM) internal _trustedRemoteEVM;
```

### _trustedRemoteSVM

Mapping of SVM chain selectors to trusted recipients

*When sending, this is used to determine the initial recipient of a bridging message.
When receiving, this is used to validate the sender of the message.
As the zero address can be a trusted remote, the `isSet` flag is used to determine if the trusted remote is set.*

```solidity
mapping(uint64 => TrustedRemoteSVM) internal _trustedRemoteSVM;
```

### _failedMessages

Mapping of message IDs to failed messages

*When a message fails to receive, it is stored here to allow for retries.*

```solidity
mapping(bytes32 => Client.Any2EVMMessage) internal _failedMessages;
```

### _gasLimits

Mapping of destination chain selectors to gas limits

*When sending, this is used to determine the gas limit for the message.*

```solidity
mapping(uint64 => uint32) internal _gasLimits;
```

## Functions

### constructor

```solidity
constructor(address ohm_, address ccipRouter_, address owner_) Owned(owner_) CCIPReceiver(ccipRouter_);
```

### _buildCCIPMessage

```solidity
function _buildCCIPMessage(bytes memory to_, uint256 amount_, bytes memory data_, bytes memory extraArgs_)
    internal
    view
    returns (Client.EVM2AnyMessage memory);
```

### _getSVMExtraArgs

```solidity
function _getSVMExtraArgs(uint64 dstChainSelector_, bytes32 to_) internal view returns (bytes memory);
```

### _getEVMExtraArgs

```solidity
function _getEVMExtraArgs(uint64 dstChainSelector_) internal view returns (bytes memory);
```

### _getEVMData

```solidity
function _getEVMData(uint64 dstChainSelector_, address to_)
    internal
    view
    returns (bytes memory recipient, bytes memory data, bytes memory extraArgs);
```

### _getSVMData

```solidity
function _getSVMData(uint64 dstChainSelector_, bytes32 to_)
    internal
    view
    returns (bytes memory recipient, bytes memory data, bytes memory extraArgs);
```

### getFeeSVM

Gets the fee for sending OHM to the specified destination SVM chain

*This can be used to send to an address on any chain supported by CCIP*

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

*This can be used to send to an address on any EVM chain supported by CCIP*

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

### _sendOhm

```solidity
function _sendOhm(
    uint64 dstChainSelector_,
    bytes memory to_,
    uint256 amount_,
    bytes memory data_,
    bytes memory extraArgs_
) internal returns (bytes32);
```

### sendToSVM

Sends OHM to the specified destination SVM chain

*Unless specified for the chain through `setGasLimit()`, the gas limit will be 0*

```solidity
function sendToSVM(uint64 dstChainSelector_, bytes32 to_, uint256 amount_)
    external
    payable
    onlyEnabled
    returns (bytes32);
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
|`<none>`|`bytes32`|messageId           The message ID of the sent message|

### sendToEVM

Sends OHM to the specified destination EVM chain

*Unless specified for the chain through `setGasLimit()`, the gas limit will be 0*

```solidity
function sendToEVM(uint64 dstChainSelector_, address to_, uint256 amount_)
    external
    payable
    onlyEnabled
    returns (bytes32);
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
|`<none>`|`bytes32`|messageId           The message ID of the sent message|

### withdraw

Allows the owner to withdraw the native token from the contract

*This is needed as senders may provide more native token than needed to cover fees*

```solidity
function withdraw(address recipient_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`recipient_`|`address`| The recipient of the native token|

### _ccipReceive

Override this function in your implementation.

*This function is designed to not revert, and instead will capture any errors in order to mark the message as failed. The message can be retried using the `retryFailedMessage()` function.*

```solidity
function _ccipReceive(Client.Any2EVMMessage memory message_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`message_`|`Client.Any2EVMMessage`||

### _receiveMessage

Actual handler for receiving CCIP messages

*Does NOT support receiving messages from SVM, since they will not go through this contract*

```solidity
function _receiveMessage(Client.Any2EVMMessage memory message_) internal;
```

### receiveMessage

Receives a message from the CCIP router

*This function can only be called by the contract*

```solidity
function receiveMessage(Client.Any2EVMMessage calldata message_) external;
```

### retryFailedMessage

Retries a failed message

*This function will revert if:

- The message is not in the failedMessages mapping
- The message sender is not a trusted remote
- The message tokens array is not of length 1
- The message token is not OHM
- The message data is not a valid EVM address*

```solidity
function retryFailedMessage(bytes32 messageId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`messageId_`|`bytes32`|The message ID|

### getFailedMessage

Gets the failed message for the specified message ID

*This function re-creates the Client.Any2EVMMessage struct in order to return the correct type. This is done to avoid requiring the caller to import the `Client` library.*

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

### setTrustedRemoteEVM

Sets the trusted remote for the specified destination EVM chain

*This is needed to send/receive messages to/from the specified destination EVM chain*

```solidity
function setTrustedRemoteEVM(uint64 dstChainSelector_, address to_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`address`|                 The destination address|

### unsetTrustedRemoteEVM

Unsets the trusted remote for the specified destination EVM chain

*This is needed to stop sending/receiving messages to/from the specified destination EVM chain*

```solidity
function unsetTrustedRemoteEVM(uint64 dstChainSelector_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

### getTrustedRemoteEVM

Gets the trusted remote for the specified destination EVM chain

*This function will revert if the trusted remote is not set*

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

*This is needed to send/receive messages to/from the specified destination SVM chain*

```solidity
function setTrustedRemoteSVM(uint64 dstChainSelector_, bytes32 to_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|
|`to_`|`bytes32`|                 The destination address|

### unsetTrustedRemoteSVM

Unsets the trusted remote for the specified destination SVM chain

*This is needed to stop sending/receiving messages to/from the specified destination SVM chain*

```solidity
function unsetTrustedRemoteSVM(uint64 dstChainSelector_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`dstChainSelector_`|`uint64`|   The destination chain selector|

### getTrustedRemoteSVM

Gets the trusted remote for the specified destination SVM chain

*This function will revert if the trusted remote is not set*

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
function setGasLimit(uint64 dstChainSelector_, uint32 gasLimit_) external onlyOwner;
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

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_)
    public
    view
    virtual
    override(CCIPReceiver, PeripheryEnabler)
    returns (bool);
```

### _enable

Implementation-specific enable function

*This function is called by the `enable()` function
The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable*

```solidity
function _enable(bytes calldata) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

### _disable

Implementation-specific disable function

*This function is called by the `disable()` function
The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable*

```solidity
function _disable(bytes calldata) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

### _onlyOwner

Implementation-specific validation of ownership

*Implementing contracts should override this function to perform the appropriate validation and revert if the caller is not permitted to enable/disable the contract.*

```solidity
function _onlyOwner() internal view override;
```
