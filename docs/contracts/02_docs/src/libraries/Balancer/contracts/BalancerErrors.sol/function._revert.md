# _revert

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/contracts/BalancerErrors.sol)

<a id="_revert-uint256"></a>

### _revert

<i>

Reverts with a revert reason containing `errorCode`. Only codes up to 999 are supported.
Uses the default 'BAL' prefix for the error code

</i>

```solidity
function _revert(uint256 errorCode) pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| errorCode | `uint256` |             |

<a id="_revert-uint256-bytes3"></a>

### _revert

<i>

Reverts with a revert reason containing `errorCode`. Only codes up to 999 are supported.

</i>

```solidity
function _revert(uint256 errorCode, bytes3 prefix) pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| errorCode | `uint256` |             |
| prefix    | `bytes3`  |             |
