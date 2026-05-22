# function \_require

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/Balancer/contracts/BalancerErrors.sol)

### \_require(bool, uint256)

Reverts if `condition` is false, with a revert reason containing `errorCode`. Only codes up to 999 are
supported.
Uses the default 'BAL' prefix for the error code

```solidity
function _require(bool condition, uint256 errorCode) pure;
```

### \_require(bool, uint256, bytes3)

Reverts if `condition` is false, with a revert reason containing `errorCode`. Only codes up to 999 are
supported.

```solidity
function _require(bool condition, uint256 errorCode, bytes3 prefix) pure;
```
