# Cooler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/cooler/Cooler.sol)

**Inherits:**
Clone

A Cooler is a smart contract escrow that facilitates fixed-duration, peer-to-peer
loans for a user-defined debt-collateral pair.

*This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.*

## State Variables

### DECIMALS_INTEREST

```solidity
uint256 private constant DECIMALS_INTEREST = 1e18;
```

### requests

Arrays stores all the loan requests.

```solidity
Request[] public requests;
```

### loans

Arrays stores all the granted loans.

```solidity
Loan[] public loans;
```

### approvals

Facilitates transfer of lender ownership to new addresses

```solidity
mapping(uint256 => address) public approvals;
```

## Functions

### owner

This address owns the collateral in escrow.

```solidity
function owner() public pure returns (address _owner);
```

### collateral

This token is borrowed against.

```solidity
function collateral() public pure returns (ERC20 _collateral);
```

### debt

This token is lent.

```solidity
function debt() public pure returns (ERC20 _debt);
```

### factory

This contract created the Cooler

```solidity
function factory() public pure returns (CoolerFactory _factory);
```

### requestLoan

Request a loan with given parameters.
Collateral is taken at time of request.

```solidity
function requestLoan(uint256 amount_, uint256 interest_, uint256 loanToCollateral_, uint256 duration_)
    external
    returns (uint256 reqID);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|of debt tokens to borrow.|
|`interest_`|`uint256`|to pay (annualized % of 'amount_'). Expressed in DECIMALS_INTEREST.|
|`loanToCollateral_`|`uint256`|debt tokens per collateral token pledged. Expressed in 10**collateral().decimals().|
|`duration_`|`uint256`|of loan tenure in seconds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reqID`|`uint256`|of the created request. Equivalent to the index of request in requests[].|

### rescindRequest

Cancel a loan request and get the collateral back.

```solidity
function rescindRequest(uint256 reqID_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reqID_`|`uint256`|index of request in requests[].|

### repayLoan

Repay a loan to get the collateral back.

*Despite a malicious lender could reenter with the callback, the
usage of `msg.sender` prevents any economical benefit to the
attacker, since they would be repaying the loan themselves.*

```solidity
function repayLoan(uint256 loanID_, uint256 repayment_) external returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|
|`repayment_`|`uint256`|debt tokens to be repaid.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|collateral given back to the borrower.|

### delegateVoting

Delegate voting power on collateral.

```solidity
function delegateVoting(address to_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|address to delegate.|

### clearRequest

Fill a requested loan as a lender.

```solidity
function clearRequest(uint256 reqID_, address recipient_, bool isCallback_) external returns (uint256 loanID);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reqID_`|`uint256`|index of request in requests[].|
|`recipient_`|`address`|address to repay the loan to.|
|`isCallback_`|`bool`|true if the lender implements the CoolerCallback abstract. False otherwise.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`loanID`|`uint256`|of the granted loan. Equivalent to the index of loan in loans[].|

### extendLoanTerms

Allow lender to extend a loan for the borrower. Doesn't require
borrower permission because it doesn't have a negative impact for them.

*Since this function solely impacts the expiration day, the lender
should ensure that extension interest payments are done beforehand.*

```solidity
function extendLoanTerms(uint256 loanID_, uint8 times_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|
|`times_`|`uint8`|that the fixed-term loan duration is extended.|

### claimDefaulted

Claim collateral upon loan default.

```solidity
function claimDefaulted(uint256 loanID_) external returns (uint256, uint256, uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|defaulted debt by the borrower, collateral kept by the lender, elapsed time since expiry.|
|`<none>`|`uint256`||
|`<none>`|`uint256`||
|`<none>`|`uint256`||

### approveTransfer

Approve transfer of loan ownership rights to a new address.

```solidity
function approveTransfer(address to_, uint256 loanID_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|address to be approved.|
|`loanID_`|`uint256`|index of loan in loans[].|

### transferOwnership

Execute loan ownership transfer. Must be previously approved by the lender.

```solidity
function transferOwnership(uint256 loanID_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|

### setRepaymentAddress

Allow lender to set repayment recipient of a given loan.

```solidity
function setRepaymentAddress(uint256 loanID_, address recipient_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|of lender's loan.|
|`recipient_`|`address`|reciever of repayments|

### collateralFor

Compute collateral needed for a desired loan amount at given loan to collateral ratio.

```solidity
function collateralFor(uint256 principal_, uint256 loanToCollateral_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`principal_`|`uint256`|amount of debt tokens.|
|`loanToCollateral_`|`uint256`|ratio for loan. Expressed in 10**collateral().decimals().|

### interestFor

Compute interest cost on amount for duration at given annualized rate.

```solidity
function interestFor(uint256 principal_, uint256 rate_, uint256 duration_) public pure returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`principal_`|`uint256`|amount of debt tokens.|
|`rate_`|`uint256`|of interest (annualized).|
|`duration_`|`uint256`|of the loan in seconds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Interest in debt token terms.|

### hasExpired

Check if given loan has expired.

```solidity
function hasExpired(uint256 loanID_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Expiration status.|

### isActive

Check if a given request is active.

```solidity
function isActive(uint256 reqID_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reqID_`|`uint256`|index of request in requests[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|Active status.|

### getRequest

Getter for Request data as a struct.

```solidity
function getRequest(uint256 reqID_) external view returns (Request memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reqID_`|`uint256`|index of request in requests[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Request`|Request struct.|

### getLoan

Getter for Loan data as a struct.

```solidity
function getLoan(uint256 loanID_) external view returns (Loan memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Loan`|Loan struct.|

## Errors

### OnlyApproved

```solidity
error OnlyApproved();
```

### Deactivated

```solidity
error Deactivated();
```

### Default

```solidity
error Default();
```

### NotExpired

```solidity
error NotExpired();
```

### NotCoolerCallback

```solidity
error NotCoolerCallback();
```

## Structs

### Request

A loan begins with a borrow request.

```solidity
struct Request {
    uint256 amount;
    uint256 interest;
    uint256 loanToCollateral;
    uint256 duration;
    bool active;
    address requester;
}
```

### Loan

A request is converted to a loan when a lender clears it.

```solidity
struct Loan {
    Request request;
    uint256 principal;
    uint256 interestDue;
    uint256 collateral;
    uint256 expiry;
    address lender;
    address recipient;
    bool callback;
}
```
