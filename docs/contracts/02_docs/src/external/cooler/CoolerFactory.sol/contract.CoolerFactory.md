# CoolerFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/cooler/CoolerFactory.sol)

**Title:** Cooler Loans Factory.

The Cooler Factory creates new Cooler escrow contracts.

<i>

This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.

</i>

## Constants

### coolerImplementation

Cooler reference implementation (deployed on creation to clone from).

```solidity
Cooler public immutable coolerImplementation;
```

## State Variables

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

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="generatecooler-erc20-erc20"></a>

### generateCooler

creates a new Escrow contract for collateral and debt tokens.

```solidity
function generateCooler(ERC20 collateral_, ERC20 debt_) external returns (address cooler);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateral_ | `ERC20` | the token given as collateral. |
| debt_ | `ERC20` | the token to be lent. Interest is denominated in debt tokens. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cooler | `address` | address of the contract. |

<a id="onlyfromfactory"></a>

### onlyFromFactory

Ensure that the called is a Cooler.

```solidity
modifier onlyFromFactory();
```

<a id="logrequestloan-uint256"></a>

### logRequestLoan

Emit a global event when a new loan request is created.

```solidity
function logRequestLoan(uint256 reqID_) external onlyFromFactory;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| reqID_ | `uint256` |             |

<a id="logrescindrequest-uint256"></a>

### logRescindRequest

Emit a global event when a loan request is rescinded.

```solidity
function logRescindRequest(uint256 reqID_) external onlyFromFactory;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| reqID_ | `uint256` |             |

<a id="logclearrequest-uint256-uint256"></a>

### logClearRequest

Emit a global event when a loan request is fulfilled.

```solidity
function logClearRequest(uint256 reqID_, uint256 loanID_) external onlyFromFactory;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| reqID_  | `uint256` |             |
| loanID_ | `uint256` |             |

<a id="logrepayloan-uint256-uint256"></a>

### logRepayLoan

Emit a global event when a loan is repaid.

```solidity
function logRepayLoan(uint256 loanID_, uint256 repayment_) external onlyFromFactory;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| loanID_    | `uint256` |             |
| repayment_ | `uint256` |             |

<a id="logextendloan-uint256-uint8"></a>

### logExtendLoan

Emit a global event when a loan is extended.

```solidity
function logExtendLoan(uint256 loanID_, uint8 times_) external onlyFromFactory;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| loanID_ | `uint256` |             |
| times_  | `uint8`   |             |

<a id="logdefaultloan-uint256-uint256"></a>

### logDefaultLoan

Emit a global event when the collateral of defaulted loan is claimed.

```solidity
function logDefaultLoan(uint256 loanID_, uint256 collateral_) external onlyFromFactory;
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| loanID_     | `uint256` |             |
| collateral_ | `uint256` |             |

<a id="getcoolerfor-address-address-address"></a>

### getCoolerFor

Getter function to get an existing cooler for a given user &lt;> collateral &lt;> debt combination.

```solidity
function getCoolerFor(
        address user_,
        address collateral_,
        address debt_
    ) public view returns (address);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| user_       | `address` |             |
| collateral_ | `address` |             |
| debt_       | `address` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

## Events

### RequestLoan

A global event when a new loan request is created.

```solidity
event RequestLoan(address indexed cooler, address collateral, address debt, uint256 reqID);
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| cooler     | `address` |             |
| collateral | `address` |             |
| debt       | `address` |             |
| reqID      | `uint256` |             |

### RescindRequest

A global event when a loan request is rescinded.

```solidity
event RescindRequest(address indexed cooler, uint256 reqID);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| cooler | `address` |             |
| reqID  | `uint256` |             |

### ClearRequest

A global event when a loan request is fulfilled.

```solidity
event ClearRequest(address indexed cooler, uint256 reqID, uint256 loanID);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| cooler | `address` |             |
| reqID  | `uint256` |             |
| loanID | `uint256` |             |

### RepayLoan

A global event when a loan is repaid.

```solidity
event RepayLoan(address indexed cooler, uint256 loanID, uint256 amount);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| cooler | `address` |             |
| loanID | `uint256` |             |
| amount | `uint256` |             |

### ExtendLoan

A global event when a loan is extended.

```solidity
event ExtendLoan(address indexed cooler, uint256 loanID, uint8 times);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| cooler | `address` |             |
| loanID | `uint256` |             |
| times  | `uint8`   |             |

### DefaultLoan

A global event when the collateral of defaulted loan is claimed.

```solidity
event DefaultLoan(address indexed cooler, uint256 loanID, uint256 amount);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| cooler | `address` |             |
| loanID | `uint256` |             |
| amount | `uint256` |             |

## Errors

### NotFromFactory

```solidity
error NotFromFactory();
```

### DecimalsNot18

```solidity
error DecimalsNot18();
```
