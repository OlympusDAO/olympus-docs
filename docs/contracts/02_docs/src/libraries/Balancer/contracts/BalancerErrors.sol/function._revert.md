# function \_revert

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/libraries/Balancer/contracts/BalancerErrors.sol)

### \_revert(uint256)

Reverts with a revert reason containing `errorCode`. Only codes up to 999 are supported.
Uses the default 'BAL' prefix for the error code

```solidity
function _revert(uint256 errorCode) pure;
```

### \_revert(uint256, bytes3)

Reverts with a revert reason containing `errorCode`. Only codes up to 999 are supported.

```solidity
function _revert(uint256 errorCode, bytes3 prefix) pure;
```
