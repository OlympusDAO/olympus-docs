# IDepositRedemptionVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/interfaces/deposits/IDepositRedemptionVault.sol)

Interface for a contract that can manage the redemption of receipt tokens for their deposit

## Functions

### authorizeFacility

Authorize a facility

```solidity
function authorizeFacility(address facility_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|   The address of the facility to authorize|

### deauthorizeFacility

Deauthorize a facility

```solidity
function deauthorizeFacility(address facility_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|   The address of the facility to deauthorize|

### isAuthorizedFacility

Check if a facility is authorized

```solidity
function isAuthorizedFacility(address facility_) external view returns (bool isAuthorized);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|       The address of the facility to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isAuthorized`|`bool`|   True if the facility is authorized|

### getAuthorizedFacilities

Get all authorized facilities

```solidity
function getAuthorizedFacilities() external view returns (address[] memory facilities);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`facilities`|`address[]`| Array of authorized facility addresses|

### getUserRedemption

Gets the details of a user's redemption

```solidity
function getUserRedemption(address user_, uint16 redemptionId_)
    external
    view
    returns (UserRedemption memory redemption);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`redemption`|`UserRedemption`|      The details of the redemption|

### getUserRedemptionCount

Gets the number of redemptions a user has started

```solidity
function getUserRedemptionCount(address user_) external view returns (uint16 count);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|The address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`count`|`uint16`|The number of redemptions|

### getUserRedemptions

Gets all redemptions for a user

```solidity
function getUserRedemptions(address user_) external view returns (UserRedemption[] memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|The address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`UserRedemption[]`|redemptions The array of redemptions|

### startRedemption

Starts a redemption of a quantity of deposit tokens

```solidity
function startRedemption(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address facility_)
    external
    returns (uint16 redemptionId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|  The address of the deposit token|
|`depositPeriod_`|`uint8`| The period of the deposit in months|
|`amount_`|`uint256`|        The amount of deposit tokens to redeem|
|`facility_`|`address`|      The facility to handle this redemption|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId`|`uint16`|   The ID of the user redemption|

### startRedemption

Starts a redemption based on a position ID, using the position's conversion expiry

```solidity
function startRedemption(uint256 positionId_, uint256 amount_) external returns (uint16 redemptionId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|    The ID of the position to redeem from|
|`amount_`|`uint256`|        The amount of deposit tokens to redeem|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId`|`uint16`|   The ID of the user redemption|

### cancelRedemption

Cancels a redemption of a quantity of deposit tokens

```solidity
function cancelRedemption(uint16 redemptionId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|The ID of the user redemption|
|`amount_`|`uint256`|      The amount of deposit tokens to cancel|

### finishRedemption

Finishes a redemption of a quantity of deposit tokens

*This function does not take an amount as an argument, because the amount is determined by the redemption*

```solidity
function finishRedemption(uint16 redemptionId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|  The ID of the user redemption|

### borrowAgainstRedemption

Borrow the maximum amount against an active redemption

```solidity
function borrowAgainstRedemption(uint16 redemptionId_) external returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption to borrow against|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The quantity of underlying assets transferred to the recipient|

### previewBorrowAgainstRedemption

Preview the maximum amount that can be borrowed against an active redemption

```solidity
function previewBorrowAgainstRedemption(address user_, uint16 redemptionId_)
    external
    view
    returns (uint256 principal, uint256 interest, uint48 dueDate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption to borrow against|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`principal`|`uint256`|      The principal amount that can be borrowed|
|`interest`|`uint256`|       The interest amount that will be charged|
|`dueDate`|`uint48`|        The due date of the loan|

### repayLoan

Repay a loan

```solidity
function repayLoan(uint16 redemptionId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption|
|`amount_`|`uint256`|         The amount to repay|

### previewExtendLoan

Preview the interest payable for extending a loan

```solidity
function previewExtendLoan(address user_, uint16 redemptionId_, uint8 months_)
    external
    view
    returns (uint48 newDueDate, uint256 interestPayable);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|
|`months_`|`uint8`|         The number of months to extend the loan|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`newDueDate`|`uint48`|     The new due date|
|`interestPayable`|`uint256`|The interest payable upon extension|

### extendLoan

Extend a loan's due date

```solidity
function extendLoan(uint16 redemptionId_, uint8 months_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption|
|`months_`|`uint8`|         The number of months to extend the loan|

### claimDefaultedLoan

Claim a defaulted loan and collect the reward

```solidity
function claimDefaultedLoan(address user_, uint16 redemptionId_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|

### getRedemptionLoan

Get all loans for a redemption

```solidity
function getRedemptionLoan(address user_, uint16 redemptionId_) external view returns (Loan memory loan);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`loan`|`Loan`|           The loan|

### setMaxBorrowPercentage

Set the maximum borrow percentage for an asset-facility combination

```solidity
function setMaxBorrowPercentage(IERC20 asset_, address facility_, uint16 percent_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|
|`percent_`|`uint16`| The maximum borrow percentage|

### getMaxBorrowPercentage

Get the maximum borrow percentage for an asset-facility combination

```solidity
function getMaxBorrowPercentage(IERC20 asset_, address facility_) external view returns (uint16 percent);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`percent`|`uint16`| The maximum borrow percentage (100e2 == 100%)|

### setAnnualInterestRate

Set the annual interest rate for an asset-facility combination

```solidity
function setAnnualInterestRate(IERC20 asset_, address facility_, uint16 rate_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|
|`rate_`|`uint16`|    The annual interest rate (100e2 == 100%)|

### getAnnualInterestRate

Get the annual interest rate for an asset-facility combination

```solidity
function getAnnualInterestRate(IERC20 asset_, address facility_) external view returns (uint16 rate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rate`|`uint16`|    The annual interest rate, in terms of 100e2|

### setClaimDefaultRewardPercentage

Set the reward percentage when a claiming a defaulted loan

```solidity
function setClaimDefaultRewardPercentage(uint16 percent_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`percent_`|`uint16`| The claim default reward percentage|

### getClaimDefaultRewardPercentage

Get the claim default reward percentage

```solidity
function getClaimDefaultRewardPercentage() external view returns (uint16 percent);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`percent`|`uint16`|The claim default reward percentage, in terms of 100e2|

## Events

### RedemptionStarted

```solidity
event RedemptionStarted(
    address indexed user,
    uint16 indexed redemptionId,
    address indexed depositToken,
    uint8 depositPeriod,
    uint256 amount,
    address facility
);
```

### RedemptionFinished

```solidity
event RedemptionFinished(
    address indexed user, uint16 indexed redemptionId, address indexed depositToken, uint8 depositPeriod, uint256 amount
);
```

### RedemptionCancelled

```solidity
event RedemptionCancelled(
    address indexed user,
    uint16 indexed redemptionId,
    address indexed depositToken,
    uint8 depositPeriod,
    uint256 amount,
    uint256 remainingAmount
);
```

### LoanCreated

```solidity
event LoanCreated(address indexed user, uint16 indexed redemptionId, uint256 amount, address facility);
```

### LoanRepaid

```solidity
event LoanRepaid(address indexed user, uint16 indexed redemptionId, uint256 principal, uint256 interest);
```

### LoanExtended

```solidity
event LoanExtended(address indexed user, uint16 indexed redemptionId, uint256 newDueDate);
```

### LoanDefaulted

```solidity
event LoanDefaulted(
    address indexed user, uint16 indexed redemptionId, uint256 principal, uint256 interest, uint256 remainingCollateral
);
```

### FacilityAuthorized

```solidity
event FacilityAuthorized(address indexed facility);
```

### FacilityDeauthorized

```solidity
event FacilityDeauthorized(address indexed facility);
```

### AnnualInterestRateSet

```solidity
event AnnualInterestRateSet(address indexed asset, address indexed facility, uint16 rate);
```

### MaxBorrowPercentageSet

```solidity
event MaxBorrowPercentageSet(address indexed asset, address indexed facility, uint16 percent);
```

### ClaimDefaultRewardPercentageSet

```solidity
event ClaimDefaultRewardPercentageSet(uint16 percent);
```

## Errors

### RedemptionVault_InvalidDepositManager

```solidity
error RedemptionVault_InvalidDepositManager(address depositManager);
```

### RedemptionVault_ZeroAmount

```solidity
error RedemptionVault_ZeroAmount();
```

### RedemptionVault_InvalidRedemptionId

```solidity
error RedemptionVault_InvalidRedemptionId(address user, uint16 redemptionId);
```

### RedemptionVault_InvalidAmount

```solidity
error RedemptionVault_InvalidAmount(address user, uint16 redemptionId, uint256 amount);
```

### RedemptionVault_TooEarly

```solidity
error RedemptionVault_TooEarly(address user, uint16 redemptionId, uint48 redeemableAt);
```

### RedemptionVault_AlreadyRedeemed

```solidity
error RedemptionVault_AlreadyRedeemed(address user, uint16 redemptionId);
```

### RedemptionVault_ZeroAddress

```solidity
error RedemptionVault_ZeroAddress();
```

### RedemptionVault_OutOfBounds

```solidity
error RedemptionVault_OutOfBounds(uint16 rate);
```

### RedemptionVault_UnpaidLoan

```solidity
error RedemptionVault_UnpaidLoan(address user, uint16 redemptionId);
```

### RedemptionVault_InvalidFacility

```solidity
error RedemptionVault_InvalidFacility(address facility);
```

### RedemptionVault_FacilityExists

```solidity
error RedemptionVault_FacilityExists(address facility);
```

### RedemptionVault_FacilityNotRegistered

```solidity
error RedemptionVault_FacilityNotRegistered(address facility);
```

### RedemptionVault_InterestRateNotSet

```solidity
error RedemptionVault_InterestRateNotSet(address asset, address facility);
```

### RedemptionVault_MaxBorrowPercentageNotSet

```solidity
error RedemptionVault_MaxBorrowPercentageNotSet(address asset, address facility);
```

### RedemptionVault_LoanAmountExceeded

```solidity
error RedemptionVault_LoanAmountExceeded(address user, uint16 redemptionId, uint256 amount);
```

### RedemptionVault_LoanIncorrectState

```solidity
error RedemptionVault_LoanIncorrectState(address user, uint16 redemptionId);
```

### RedemptionVault_InvalidLoan

```solidity
error RedemptionVault_InvalidLoan(address user, uint16 redemptionId);
```

## Structs

### UserRedemption

Data structure for a redemption of a receipt token

```solidity
struct UserRedemption {
    address depositToken;
    uint8 depositPeriod;
    uint48 redeemableAt;
    uint256 amount;
    address facility;
    uint256 positionId;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`depositToken`|`address`|   The address of the deposit token|
|`depositPeriod`|`uint8`|  The period of the deposit in months|
|`redeemableAt`|`uint48`|   The timestamp at which the redemption can be finished|
|`amount`|`uint256`|         The amount of deposit tokens to redeem|
|`facility`|`address`|       The facility that handles this redemption|
|`positionId`|`uint256`|     The position ID for position-based redemptions (type(uint256).max without a position)|

### Loan

Data structure for a loan against a redemption

```solidity
struct Loan {
    uint256 initialPrincipal;
    uint256 principal;
    uint256 interest;
    uint48 dueDate;
    bool isDefaulted;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`initialPrincipal`|`uint256`|   The initial principal amount borrowed|
|`principal`|`uint256`|          The principal owed|
|`interest`|`uint256`|           The interest owed|
|`dueDate`|`uint48`|            The timestamp when the loan is due|
|`isDefaulted`|`bool`|        Whether the loan has defaulted|
