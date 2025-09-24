# ICCIPTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/ICCIPTokenPool.sol)

## Functions

### getBridgedSupply

Returns the amount of OHM that has been bridged from mainnet

*The implementing function should only return a value on mainnet*

```solidity
function getBridgedSupply() external view returns (uint256);
```

## Errors

### TokenPool_InvalidToken

```solidity
error TokenPool_InvalidToken(address expected, address actual);
```
