# IERC3156FlashBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/interfaces/maker-dao/IERC3156FlashBorrower.sol)

## Functions

### onFlashLoan

*Receive a flash loan.*

```solidity
function onFlashLoan(address initiator, address token, uint256 amount, uint256 fee, bytes calldata data)
    external
    returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initiator`|`address`|The initiator of the loan.|
|`token`|`address`|The loan currency.|
|`amount`|`uint256`|The amount of tokens lent.|
|`fee`|`uint256`|The additional amount of tokens to repay.|
|`data`|`bytes`|Arbitrary data structure, intended to contain user-defined parameters.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"|
