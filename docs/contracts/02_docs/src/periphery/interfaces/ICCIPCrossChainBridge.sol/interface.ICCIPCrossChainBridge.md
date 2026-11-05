# ICCIPCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/interfaces/ICCIPCrossChainBridge.sol)

## Functions

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
| fee_ | `uint256` |                The fee for sending OHM to the specified destination chain |

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
| fee_ | `uint256` |                The fee for sending OHM to the specified destination EVM chain |

<a id="sendtosvm-uint64-bytes32-uint256"></a>

### sendToSVM

Sends OHM to the specified destination SVM chain

<i>

This can be used to send to an address on any chain supported by CCIP

</i>

```solidity
function sendToSVM(
        uint64 dstChainSelector_,
        bytes32 to_,
        uint256 amount_
    ) external payable returns (bytes32 messageId);
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
| messageId | `bytes32` |           The message ID of the sent message |

<a id="sendtoevm-uint64-address-uint256"></a>

### sendToEVM

Sends OHM to the specified destination EVM chain

<i>

This can be used to send to an address on any EVM chain supported by CCIP

</i>

```solidity
function sendToEVM(
        uint64 dstChainSelector_,
        address to_,
        uint256 amount_
    ) external payable returns (bytes32 messageId);
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
| messageId | `bytes32` |           The message ID of the sent message |

<a id="getfailedmessage-bytes32"></a>

### getFailedMessage

Gets the failed message for the specified message ID

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

<a id="retryfailedmessage-bytes32"></a>

### retryFailedMessage

Retries a failed message

```solidity
function retryFailedMessage(bytes32 messageId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId_ | `bytes32` | The message ID |

<a id="withdraw-address"></a>

### withdraw

Allows the owner to withdraw the native token from the contract

<i>

This is needed as senders may provide more native token than needed to cover fees

</i>

```solidity
function withdraw(address recipient_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient_ | `address` | The recipient of the native token |

<a id="settrustedremoteevm-uint64-address"></a>

### setTrustedRemoteEVM

Sets the trusted remote for the specified destination EVM chain

<i>

This is needed to send/receive messages to/from the specified destination EVM chain

</i>

```solidity
function setTrustedRemoteEVM(uint64 dstChainSelector_, address to_) external;
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
function unsetTrustedRemoteEVM(uint64 dstChainSelector_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

<a id="gettrustedremoteevm-uint64"></a>

### getTrustedRemoteEVM

Gets the trusted remote for the specified destination EVM chain

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
function setTrustedRemoteSVM(uint64 dstChainSelector_, bytes32 to_) external;
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
function unsetTrustedRemoteSVM(uint64 dstChainSelector_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector_ | `uint64` | The destination chain selector |

<a id="gettrustedremotesvm-uint64"></a>

### getTrustedRemoteSVM

Gets the trusted remote for the specified destination SVM chain

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
function setGasLimit(uint64 dstChainSelector_, uint32 gasLimit_) external;
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

## Events

### Bridged

```solidity
event Bridged(
        bytes32 messageId,
        uint64 destinationChainSelector,
        address indexed sender,
        uint256 amount,
        uint256 fees
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |
| destinationChainSelector | `uint64` |  |
| sender | `address` |  |
| amount | `uint256` |  |
| fees | `uint256` |  |

### Received

```solidity
event Received(
        bytes32 messageId,
        uint64 sourceChainSelector,
        address indexed sender,
        uint256 amount
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |
| sourceChainSelector | `uint64` |  |
| sender | `address` |  |
| amount | `uint256` |  |

### Withdrawn

```solidity
event Withdrawn(address indexed recipient, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| recipient | `address` |  |
| amount | `uint256` |  |

### TrustedRemoteEVMSet

```solidity
event TrustedRemoteEVMSet(uint64 indexed dstChainSelector, address indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector | `uint64` |  |
| to | `address` |  |

### TrustedRemoteEVMUnset

```solidity
event TrustedRemoteEVMUnset(uint64 indexed dstChainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector | `uint64` |  |

### TrustedRemoteSVMSet

```solidity
event TrustedRemoteSVMSet(uint64 indexed dstChainSelector, bytes32 indexed to);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector | `uint64` |  |
| to | `bytes32` |  |

### TrustedRemoteSVMUnset

```solidity
event TrustedRemoteSVMUnset(uint64 indexed dstChainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector | `uint64` |  |

### GasLimitSet

```solidity
event GasLimitSet(uint64 indexed dstChainSelector, uint32 gasLimit);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstChainSelector | `uint64` |  |
| gasLimit | `uint32` |  |

### MessageFailed

```solidity
event MessageFailed(bytes32 messageId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |

### RetryMessageSuccess

```solidity
event RetryMessageSuccess(bytes32 messageId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |

## Errors

### Bridge_InvalidAddress

```solidity
error Bridge_InvalidAddress(string param);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| param | `string` |  |

### Bridge_ZeroAmount

```solidity
error Bridge_ZeroAmount();
```

### Bridge_InsufficientAmount

```solidity
error Bridge_InsufficientAmount(uint256 expected, uint256 actual);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expected | `uint256` |  |
| actual | `uint256` |  |

### Bridge_InsufficientNativeToken

```solidity
error Bridge_InsufficientNativeToken(uint256 expected, uint256 actual);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expected | `uint256` |  |
| actual | `uint256` |  |

### Bridge_TransferFailed

```solidity
error Bridge_TransferFailed(address caller, address recipient, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | `address` |  |
| recipient | `address` |  |
| amount | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |

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

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteAddress | `address` |  |
| isSet | `bool` |  |

### TrustedRemoteSVM

```solidity
struct TrustedRemoteSVM {
        bytes32 remoteAddress;
        bool isSet;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteAddress | `bytes32` |  |
| isSet | `bool` |  |
