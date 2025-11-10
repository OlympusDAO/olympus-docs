# ICCIPClient

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/bridge/ICCIPClient.sol)

*Copied from `Client.sol` in `chainlink-ccip-1.6.0`*

## Structs

### EVMTokenAmount

```solidity
struct EVMTokenAmount {
    address token;
    uint256 amount;
}
```

### Any2EVMMessage

```solidity
struct Any2EVMMessage {
    bytes32 messageId;
    uint64 sourceChainSelector;
    bytes sender;
    bytes data;
    EVMTokenAmount[] destTokenAmounts;
}
```
