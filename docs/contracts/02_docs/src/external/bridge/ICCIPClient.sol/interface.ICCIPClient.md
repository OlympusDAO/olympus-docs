# ICCIPClient

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPClient.sol)

<i>

Copied from `Client.sol` in `chainlink-ccip-1.6.0`

</i>

## Structs

### EVMTokenAmount

```solidity
struct EVMTokenAmount {
        address token; // token address on the local chain.
        uint256 amount; // Amount of tokens.
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` |  |
| amount | `uint256` |  |

### Any2EVMMessage

```solidity
struct Any2EVMMessage {
        bytes32 messageId; // MessageId corresponding to ccipSend on source.
        uint64 sourceChainSelector; // Source chain selector.
        bytes sender; // abi.decode(sender) if coming from an EVM chain.
        bytes data; // payload sent in original message.
        EVMTokenAmount[] destTokenAmounts; // Tokens and their amounts in their destination chain representation.
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageId | `bytes32` |  |
| sourceChainSelector | `uint64` |  |
| sender | `bytes` |  |
| data | `bytes` |  |
| destTokenAmounts | `EVMTokenAmount[]` |  |
