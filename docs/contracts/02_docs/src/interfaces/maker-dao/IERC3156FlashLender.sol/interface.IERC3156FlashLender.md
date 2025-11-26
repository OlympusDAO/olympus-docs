# IERC3156FlashLender

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/interfaces/maker-dao/IERC3156FlashLender.sol)

## Functions

### maxFlashLoan

The amount of currency available to be lent.

```solidity
function maxFlashLoan(address token) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The loan currency.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of `token` that can be borrowed.|

### flashFee

The fee to be charged for a given loan.

```solidity
function flashFee(address token, uint256 amount) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The loan currency.|
|`amount`|`uint256`|The amount of tokens lent.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of `token` to be charged for the loan, on top of the returned principal.|

### flashLoan

Initiate a flash loan.

```solidity
function flashLoan(IERC3156FlashBorrower receiver, address token, uint256 amount, bytes calldata data)
    external
    returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`IERC3156FlashBorrower`|The receiver of the tokens in the loan, and the receiver of the callback.|
|`token`|`address`|The loan currency.|
|`amount`|`uint256`|The amount of tokens lent.|
|`data`|`bytes`|Arbitrary data structure, intended to contain user-defined parameters.|
