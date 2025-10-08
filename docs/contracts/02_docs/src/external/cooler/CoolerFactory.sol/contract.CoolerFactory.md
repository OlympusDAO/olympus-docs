# CoolerFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/cooler/CoolerFactory.sol)

The Cooler Factory creates new Cooler escrow contracts.

*This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.*

## State Variables

### coolerImplementation

Cooler reference implementation (deployed on creation to clone from).

```solidity
Cooler public immutable coolerImplementation;
```

### created

Mapping to validate deployed coolers.

```solidity
mapping(address => bool) public created;
```

### coolerFor

Mapping to prevent duplicate coolers.

```solidity
mapping(address => mapping(ERC20 => mapping(ERC20 => address))) private coolerFor;
```

### coolersFor

Mapping to query Coolers for Collateral-Debt pair.

```solidity
mapping(ERC20 => mapping(ERC20 => address[])) public coolersFor;
```

## Functions

### constructor

```solidity
constructor();
```

### generateCooler

creates a new Escrow contract for collateral and debt tokens.

```solidity
function generateCooler(ERC20 collateral_, ERC20 debt_) external returns (address cooler);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`collateral_`|`ERC20`|the token given as collateral.|
|`debt_`|`ERC20`|the token to be lent. Interest is denominated in debt tokens.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`cooler`|`address`|address of the contract.|

### onlyFromFactory

Ensure that the called is a Cooler.

```solidity
modifier onlyFromFactory();
```

### logRequestLoan

Emit a global event when a new loan request is created.

```solidity
function logRequestLoan(uint256 reqID_) external onlyFromFactory;
```

### logRescindRequest

Emit a global event when a loan request is rescinded.

```solidity
function logRescindRequest(uint256 reqID_) external onlyFromFactory;
```

### logClearRequest

Emit a global event when a loan request is fulfilled.

```solidity
function logClearRequest(uint256 reqID_, uint256 loanID_) external onlyFromFactory;
```

### logRepayLoan

Emit a global event when a loan is repaid.

```solidity
function logRepayLoan(uint256 loanID_, uint256 repayment_) external onlyFromFactory;
```

### logExtendLoan

Emit a global event when a loan is extended.

```solidity
function logExtendLoan(uint256 loanID_, uint8 times_) external onlyFromFactory;
```

### logDefaultLoan

Emit a global event when the collateral of defaulted loan is claimed.

```solidity
function logDefaultLoan(uint256 loanID_, uint256 collateral_) external onlyFromFactory;
```

### getCoolerFor

Getter function to get an existing cooler for a given user \\<\\> collateral \\<\\> debt combination.

```solidity
function getCoolerFor(address user_, address collateral_, address debt_) public view returns (address);
```

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
