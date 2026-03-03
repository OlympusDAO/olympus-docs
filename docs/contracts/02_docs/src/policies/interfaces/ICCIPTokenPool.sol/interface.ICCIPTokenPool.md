# ICCIPTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/policies/interfaces/ICCIPTokenPool.sol)

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
