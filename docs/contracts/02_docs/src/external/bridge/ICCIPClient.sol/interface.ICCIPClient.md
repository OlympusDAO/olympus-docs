# ICCIPClient

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/external/bridge/ICCIPClient.sol)

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
