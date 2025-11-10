# ICooler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/cooler/interfaces/ICooler.sol)

## Functions

### owner

This address owns the collateral in escrow.

```solidity
function owner() external view returns (address);
```

### collateral

This token is borrowed against.

```solidity
function collateral() external view returns (IERC20);
```

### debt

This token is lent.

```solidity
function debt() external view returns (IERC20);
```

### factory

This contract created the Cooler

```solidity
function factory() external view returns (ICoolerFactory);
```

### requestLoan

Request a loan with given parameters.
Collateral is taken at time of request.

```solidity
function requestLoan(uint256 amount_, uint256 interest_, uint256 loanToCollateral_, uint256 duration_)
    external
    returns (uint256 requestId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|            of debt tokens to borrow.|
|`interest_`|`uint256`|          to pay (annualized % of 'amount_'). Expressed in DECIMALS_INTEREST.|
|`loanToCollateral_`|`uint256`|  debt tokens per collateral token pledged. Expressed in 10**collateral().decimals().|
|`duration_`|`uint256`|          of loan tenure in seconds.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requestId`|`uint256`|          of the created request. Equivalent to the index of request in requests[].|

### rescindRequest

Cancel a loan request and get the collateral back.

```solidity
function rescindRequest(uint256 requestId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`requestId_`|`uint256`| index of request in requests[].|

### repayLoan

Repay a loan to get the collateral back.

*Despite a malicious lender could reenter with the callback, the
usage of `msg.sender` prevents any economical benefit to the
attacker, since they would be repaying the loan themselves.*

```solidity
function repayLoan(uint256 loanId_, uint256 repayment_) external returns (uint256 collateral);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanId_`|`uint256`|index of loan in loans[].|
|`repayment_`|`uint256`|debt tokens to be repaid.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collateral`|`uint256`|given back to the borrower.|

### clearRequest

Fill a requested loan as a lender.

```solidity
function clearRequest(uint256 reqID_, address recipient_, bool isCallback_) external returns (uint256 loanId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`reqID_`|`uint256`|     index of request in requests[].|
|`recipient_`|`address`| address to repay the loan to.|
|`isCallback_`|`bool`|true if the lender implements the CoolerCallback abstract. False otherwise.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`loanId`|`uint256`|     of the granted loan. Equivalent to the index of loan in loans[].|

### extendLoanTerms

Allow lender to extend a loan for the borrower. Doesn't require
borrower permission because it doesn't have a negative impact for them.

*Since this function solely impacts the expiration day, the lender
should ensure that extension interest payments are done beforehand.*

```solidity
function extendLoanTerms(uint256 loanId_, uint8 times_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanId_`|`uint256`|index of loan in loans[].|
|`times_`|`uint8`|that the fixed-term loan duration is extended.|

### claimDefaulted

Claim collateral upon loan default.

```solidity
function claimDefaulted(uint256 loanID_)
    external
    returns (uint256 principal, uint256 interestDue, uint256 collateral, uint256 elapsed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`loanID_`|`uint256`|index of loan in loans[].|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`principal`|`uint256`|defaulted debt by the borrower.|
|`interestDue`|`uint256`|collateral kept by the lender.|
|`collateral`|`uint256`|elapsed time since expiry.|
|`elapsed`|`uint256`|elapsed time since expiry.|

### collateralFor

Compute collateral needed for a desired loan amount at given loan to collateral ratio.

```solidity
function collateralFor(uint256 principal_, uint256 loanToCollateral_) external view returns (uint256 collateral);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`principal_`|`uint256`|         amount of debt tokens.|
|`loanToCollateral_`|`uint256`|  ratio for loan. Expressed in 10**collateral().decimals().|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collateral`|`uint256`|        amount of collateral tokens required for the loan.|

### interestFor

Compute interest cost on amount for duration at given annualized rate.

```solidity
function interestFor(uint256 principal_, uint256 rate_, uint256 duration_) external view returns (uint256 interest);
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
|`interest`|`uint256`|in debt token terms.|

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
