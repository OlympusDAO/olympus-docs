# CCIPCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/bridge/CCIPCrossChainBridge.sol)

**Inherits:** CCIPReceiver, [PeripheryEnabler](/main/contracts/docs/src/periphery/PeripheryEnabler.sol/abstract.PeripheryEnabler), Owned, [ICCIPCrossChainBridge](/main/contracts/docs/src/periphery/interfaces/ICCIPCrossChainBridge.sol/interface.ICCIPCrossChainBridge)

**Title:** CCIPCrossChainBridge

Sends and receives OHM between chains using Chainlink CCIP
It is a periphery contract, as it does not require any privileged access to the Olympus protocol.

The contract is designed to be an intermediary when receiving OHM, so that failed messages can be retried.

## Constants

### OHM

```solidity
IERC20 public immutable OHM;
```

## State Variables

### _trustedRemoteEVM

Mapping of EVM chain selectors to trusted bridge contracts

<i>

When sending, this is used to determine the initial recipient of a bridging message.
When receiving, this is used to validate the sender of the message.
As the zero address can be a trusted remote, the `isSet` flag is used to determine if the trusted remote is set.

</i>

```solidity
mapping(uint64 => TrustedRemoteEVM) internal _trustedRemoteEVM;
```

### _trustedRemoteSVM

Mapping of SVM chain selectors to trusted recipients

<i>

When sending, this is used to determine the initial recipient of a bridging message.
When receiving, this is used to validate the sender of the message.
As the zero address can be a trusted remote, the `isSet` flag is used to determine if the trusted remote is set.

</i>

```solidity
mapping(uint64 => TrustedRemoteSVM) internal _trustedRemoteSVM;
```

### _failedMessages

Mapping of message IDs to failed messages

<i>

When a message fails to receive, it is stored here to allow for retries.

</i>

```solidity
mapping(bytes32 => Client.Any2EVMMessage) internal _failedMessages;
```

### _gasLimits

Mapping of destination chain selectors to gas limits

<i>

When sending, this is used to determine the gas limit for the message.

</i>

```solidity
mapping(uint64 => uint32) internal _gasLimits;
```

## Functions

<a id="constructor-address-address-address"></a>

### constructor

```solidity
constructor(
        address ohm_,
        address ccipRouter_,
        address owner_
    ) Owned(owner_) CCIPReceiver(ccipRouter_);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| ohm_        | `address` |             |
| ccipRouter_ | `address` |             |
| owner_      | `address` |             |

<a id="_buildccipmessage-bytes-uint256-bytes-bytes"></a>

### _buildCCIPMessage

```solidity
function _buildCCIPMessage(
        bytes memory to_,
        uint256 amount_,
        bytes memory data_,
        bytes memory extraArgs_
    ) internal view returns (Client.EVM2AnyMessage memory);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| to_        | `bytes`   |             |
| amount_    | `uint256` |             |
| data_      | `bytes`   |             |
| extraArgs_ | `bytes`   |             |

**Returns**

| Name         | Type                    | Description |
| ------------ | ----------------------- | ----------- |
| &lt;none&gt; | `Client.EVM2AnyMessage` |             |

<a id="_getsvmextraargs-uint64-bytes32"></a>

### _getSVMExtraArgs

```solidity
function _getSVMExtraArgs(
        uint64 dstChainSelector_,
        bytes32 to_
    ) internal view returns (bytes memory);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| dstChainSelector_ | `uint64`  |             |
| to_               | `bytes32` |             |

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `bytes` |             |

<a id="_getevmextraargs-uint64"></a>

### _getEVMExtraArgs

```solidity
function _getEVMExtraArgs(uint64 dstChainSelector_) internal view returns (bytes memory);
```

**Parameters**

| Name              | Type     | Description |
| ----------------- | -------- | ----------- |
| dstChainSelector_ | `uint64` |             |

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `bytes` |             |

<a id="_getevmdata-uint64-address"></a>

### _getEVMData

```solidity
function _getEVMData(
        uint64 dstChainSelector_,
        address to_
    ) internal view returns (bytes memory recipient, bytes memory data, bytes memory extraArgs);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| dstChainSelector_ | `uint64`  |             |
| to_               | `address` |             |

**Returns**

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| recipient | `bytes` |             |
| data      | `bytes` |             |
| extraArgs | `bytes` |             |

<a id="_getsvmdata-uint64-bytes32"></a>

### _getSVMData

```solidity
function _getSVMData(
        uint64 dstChainSelector_,
        bytes32 to_
    ) internal view returns (bytes memory recipient, bytes memory data, bytes memory extraArgs);
```

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| dstChainSelector_ | `uint64`  |             |
| to_               | `bytes32` |             |

**Returns**

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| recipient | `bytes` |             |
| data      | `bytes` |             |
| extraArgs | `bytes` |             |

<a id="getfeesvm-uint64-bytes32-uint256"></a>

### getFeeSVM

Gets the fee for sending OHM to the specified destination SVM chain

<i>

This can be used to send to an address on any chain supported by CCIP

</i>

```solidity
function getFeeSVM(
        uint64 dstChainSelector_,
        bytes32 to_,
        uint256 amount_
    ) external view returns (uint256 fee_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `bytes32` | The destination address |
| amount_ | `uint256` | The amount of OHM to send |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee_ | `uint256` | The fee for sending OHM to the specified destination chain |

<a id="getfeeevm-uint64-address-uint256"></a>

### getFeeEVM

Gets the fee for sending OHM to the specified destination EVM chain

<i>

This can be used to send to an address on any EVM chain supported by CCIP

</i>

```solidity
function getFeeEVM(
        uint64 dstChainSelector_,
        address to_,
        uint256 amount_
    ) external view returns (uint256 fee_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `address` | The destination address |
| amount_ | `uint256` | The amount of OHM to send |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee_ | `uint256` | The fee for sending OHM to the specified destination EVM chain |

<a id="_sendohm-uint64-bytes-uint256-bytes-bytes"></a>

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

**Parameters**

| Name              | Type      | Description |
| ----------------- | --------- | ----------- |
| dstChainSelector_ | `uint64`  |             |
| to_               | `bytes`   |             |
| amount_           | `uint256` |             |
| data_             | `bytes`   |             |
| extraArgs_        | `bytes`   |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `bytes32` |             |

<a id="sendtosvm-uint64-bytes32-uint256"></a>

### sendToSVM

Sends OHM to the specified destination SVM chain

<i>

Unless specified for the chain through `setGasLimit()`, the gas limit will be 0

</i>

```solidity
function sendToSVM(
        uint64 dstChainSelector_,
        bytes32 to_,
        uint256 amount_
    ) external payable onlyEnabled returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `bytes32` | The destination address |
| amount_ | `uint256` | The amount of OHM to send |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The message ID of the sent message |

<a id="sendtoevm-uint64-address-uint256"></a>

### sendToEVM

Sends OHM to the specified destination EVM chain

<i>

Unless specified for the chain through `setGasLimit()`, the gas limit will be 0

</i>

```solidity
function sendToEVM(
        uint64 dstChainSelector_,
        address to_,
        uint256 amount_
    ) external payable onlyEnabled returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `address` | The destination address |
| amount_ | `uint256` | The amount of OHM to send |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The message ID of the sent message |

<a id="withdraw-address"></a>

### withdraw

Allows the owner to withdraw the native token from the contract

<i>

This is needed as senders may provide more native token than needed to cover fees

</i>

```solidity
function withdraw(address recipient_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient_ | `address` | The recipient of the native token |

<a id="_ccipreceive-client-any2evmmessage"></a>

### _ccipReceive

Override this function in your implementation.

<i>

This function is designed to not revert, and instead will capture any errors in order to mark the message as failed. The message can be retried using the `retryFailedMessage()` function.

</i>

```solidity
function _ccipReceive(Client.Any2EVMMessage memory message_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| message_ | `Client.Any2EVMMessage` | Any2EVMMessage. |

<a id="_receivemessage-client-any2evmmessage"></a>

### _receiveMessage

Actual handler for receiving CCIP messages

<i>

Does NOT support receiving messages from SVM, since they will not go through this contract

</i>

```solidity
function _receiveMessage(Client.Any2EVMMessage memory message_) internal;
```

**Parameters**

| Name     | Type                    | Description |
| -------- | ----------------------- | ----------- |
| message_ | `Client.Any2EVMMessage` |             |

<a id="receivemessage-client-any2evmmessage"></a>

### receiveMessage

Receives a message from the CCIP router

<i>

This function can only be called by the contract

</i>

```solidity
function receiveMessage(Client.Any2EVMMessage calldata message_) external;
```

**Parameters**

| Name     | Type                    | Description |
| -------- | ----------------------- | ----------- |
| message_ | `Client.Any2EVMMessage` |             |

<a id="retryfailedmessage-bytes32"></a>

### retryFailedMessage

Retries a failed message

<i>

This function will revert if:

- The message is not in the failedMessages mapping
- The message sender is not a trusted remote
- The message tokens array is not of length 1
- The message token is not OHM
- The message data is not a valid EVM address

</i>

```solidity
function retryFailedMessage(bytes32 messageId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId_ | `bytes32` | The message ID |

<a id="getfailedmessage-bytes32"></a>

### getFailedMessage

Gets the failed message for the specified message ID

<i>

This function re-creates the Client.Any2EVMMessage struct in order to return the correct type. This is done to avoid requiring the caller to import the `Client` library.

</i>

```solidity
function getFailedMessage(
        bytes32 messageId_
    ) external view returns (ICCIPClient.Any2EVMMessage memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId_ | `bytes32` | The message ID |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `ICCIPClient.Any2EVMMessage` | message_ The failed message |

<a id="settrustedremoteevm-uint64-address"></a>

### setTrustedRemoteEVM

Sets the trusted remote for the specified destination EVM chain

<i>

This is needed to send/receive messages to/from the specified destination EVM chain

</i>

```solidity
function setTrustedRemoteEVM(uint64 dstChainSelector_, address to_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `address` | The destination address |

<a id="unsettrustedremoteevm-uint64"></a>

### unsetTrustedRemoteEVM

Unsets the trusted remote for the specified destination EVM chain

<i>

This is needed to stop sending/receiving messages to/from the specified destination EVM chain

</i>

```solidity
function unsetTrustedRemoteEVM(uint64 dstChainSelector_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

<a id="gettrustedremoteevm-uint64"></a>

### getTrustedRemoteEVM

Gets the trusted remote for the specified destination EVM chain

<i>

This function will revert if the trusted remote is not set

</i>

```solidity
function getTrustedRemoteEVM(
        uint64 dstChainSelector_
    ) external view returns (TrustedRemoteEVM memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `TrustedRemoteEVM` | to_                The destination address |

<a id="settrustedremotesvm-uint64-bytes32"></a>

### setTrustedRemoteSVM

Sets the trusted remote for the specified destination SVM chain

<i>

This is needed to send/receive messages to/from the specified destination SVM chain

</i>

```solidity
function setTrustedRemoteSVM(uint64 dstChainSelector_, bytes32 to_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| to_ | `bytes32` | The destination address |

<a id="unsettrustedremotesvm-uint64"></a>

### unsetTrustedRemoteSVM

Unsets the trusted remote for the specified destination SVM chain

<i>

This is needed to stop sending/receiving messages to/from the specified destination SVM chain

</i>

```solidity
function unsetTrustedRemoteSVM(uint64 dstChainSelector_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

<a id="gettrustedremotesvm-uint64"></a>

### getTrustedRemoteSVM

Gets the trusted remote for the specified destination SVM chain

<i>

This function will revert if the trusted remote is not set

</i>

```solidity
function getTrustedRemoteSVM(
        uint64 dstChainSelector_
    ) external view returns (TrustedRemoteSVM memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `TrustedRemoteSVM` | to_                The destination address |

<a id="setgaslimit-uint64-uint32"></a>

### setGasLimit

Sets the gas limit for the specified destination chain

```solidity
function setGasLimit(uint64 dstChainSelector_, uint32 gasLimit_) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |
| gasLimit_ | `uint32` | The gas limit |

<a id="getgaslimit-uint64"></a>

### getGasLimit

Gets the gas limit for the specified destination chain

```solidity
function getGasLimit(uint64 dstChainSelector_) external view returns (uint32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint32` | gasLimit_           The gas limit, or 0 if not set |

<a id="getcciprouter"></a>

### getCCIPRouter

Gets the CCIP router address

```solidity
function getCCIPRouter() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | ccipRouter_ The CCIP router address |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(CCIPReceiver, PeripheryEnabler) returns (bool);
```

**Parameters**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| interfaceId_ | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_enable-bytes"></a>

### _enable

Implementation-specific enable function

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert

2. Validate state (if needed) or revert

3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

<i>

This function is called by the `enable()` function

</i>

```solidity
function _enable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="_disable-bytes"></a>

### _disable

Implementation-specific disable function

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert

2. Validate state (if needed) or revert

3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

<i>

This function is called by the `disable()` function

</i>

```solidity
function _disable(bytes calldata) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="_onlyowner"></a>

### _onlyOwner

Implementation-specific validation of ownership

<i>

Implementing contracts should override this function to perform the appropriate validation and revert if the caller is not permitted to enable/disable the contract.

</i>

```solidity
function _onlyOwner() internal view override;
```
