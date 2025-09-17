# ICCIPClient

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/bridge/ICCIPClient.sol)

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
