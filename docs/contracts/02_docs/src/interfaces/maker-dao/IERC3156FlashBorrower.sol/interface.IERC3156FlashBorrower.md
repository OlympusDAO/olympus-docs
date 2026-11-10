# IERC3156FlashBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/maker-dao/IERC3156FlashBorrower.sol)

## Functions

<a id="onflashloan-address-address-uint256-uint256-bytes"></a>

### onFlashLoan

<i>

Receive a flash loan.

</i>

```solidity
function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| initiator | `address` | The initiator of the loan. |
| token | `address` | The loan currency. |
| amount | `uint256` | The amount of tokens lent. |
| fee | `uint256` | The additional amount of tokens to repay. |
| data | `bytes` | Arbitrary data structure, intended to contain user-defined parameters. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan" |
