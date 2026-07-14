# ICCIPTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/policies/interfaces/ICCIPTokenPool.sol)

## Functions

### getBridgedSupply

Returns the amount of OHM that has been bridged from mainnet

The implementing function should only return a value on mainnet

```solidity
function getBridgedSupply() external view returns (uint256);
```

## Errors

### TokenPool_InvalidToken

```solidity
error TokenPool_InvalidToken(address expected, address actual);
```
