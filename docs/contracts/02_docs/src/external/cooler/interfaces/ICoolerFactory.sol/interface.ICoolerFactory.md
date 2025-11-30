# ICoolerFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/external/cooler/interfaces/ICoolerFactory.sol)

## Functions

### generateCooler

Generate a new cooler.

```solidity
function generateCooler(IERC20 collateral_, IERC20 debt_) external returns (address cooler);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateral_`|`IERC20`|The collateral token.|
|`debt_`|`IERC20`|      The debt token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cooler`|`address`|     The address of the new cooler.|

### getCoolerFor

Get the cooler for a given user \\<\\> collateral \\<\\> debt combination.

```solidity
function getCoolerFor(address user_, address collateral_, address debt_) external view returns (address cooler);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|      The user address.|
|`collateral_`|`address`|The collateral token.|
|`debt_`|`address`|      The debt token.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cooler`|`address`|     The address of the cooler.|

### created

Check if a cooler was created by the factory.

```solidity
function created(address cooler_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`address`|The cooler address.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool    Whether the cooler was created by the factory.|

## Events

### RequestLoan

A global event when a new loan request is created.

```solidity
event RequestLoan(address indexed cooler, address collateral, address debt, uint256 reqID);
```

### RescindRequest

A global event when a loan request is rescinded.

```solidity
event RescindRequest(address indexed cooler, uint256 reqID);
```

### ClearRequest

A global event when a loan request is fulfilled.

```solidity
event ClearRequest(address indexed cooler, uint256 reqID, uint256 loanID);
```

### RepayLoan

A global event when a loan is repaid.

```solidity
event RepayLoan(address indexed cooler, uint256 loanID, uint256 amount);
```

### ExtendLoan

A global event when a loan is extended.

```solidity
event ExtendLoan(address indexed cooler, uint256 loanID, uint8 times);
```

### DefaultLoan

A global event when the collateral of defaulted loan is claimed.

```solidity
event DefaultLoan(address indexed cooler, uint256 loanID, uint256 amount);
```

## Errors

### NotFromFactory

```solidity
error NotFromFactory();
```

### DecimalsNot18

```solidity
error DecimalsNot18();
```
