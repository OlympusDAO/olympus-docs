# function \_revert

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/Balancer/contracts/BalancerErrors.sol)

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
