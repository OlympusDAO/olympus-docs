# IDepositRedemptionVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/deposits/IDepositRedemptionVault.sol)

**Title:** IDepositRedemptionVault

Interface for a contract that can manage the redemption of receipt tokens for their deposit

## Functions

<a id="authorizefacility-address"></a>

### authorizeFacility

Authorize a facility

```solidity
function authorizeFacility(address facility_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| facility_ | `address` | The address of the facility to authorize |

<a id="deauthorizefacility-address"></a>

### deauthorizeFacility

Deauthorize a facility

```solidity
function deauthorizeFacility(address facility_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| facility_ | `address` | The address of the facility to deauthorize |

<a id="isauthorizedfacility-address"></a>

### isAuthorizedFacility

Check if a facility is authorized

```solidity
function isAuthorizedFacility(address facility_) external view returns (bool isAuthorized);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| facility_ | `address` | The address of the facility to check |

**Returns**

| Name         | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| isAuthorized | `bool` | True if the facility is authorized |

<a id="getauthorizedfacilities"></a>

### getAuthorizedFacilities

Get all authorized facilities

```solidity
function getAuthorizedFacilities() external view returns (address[] memory facilities);
```

**Returns**

| Name       | Type        | Description                            |
| ---------- | ----------- | -------------------------------------- |
| facilities | `address[]` | Array of authorized facility addresses |

<a id="getuserredemption-address-uint16"></a>

### getUserRedemption

Gets the details of a user's redemption

```solidity
function getUserRedemption(
        address user_,
        uint16 redemptionId_
    ) external view returns (UserRedemption memory redemption);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |
| redemptionId_ | `uint16` | The ID of the redemption |

**Returns**

| Name       | Type             | Description                   |
| ---------- | ---------------- | ----------------------------- |
| redemption | `UserRedemption` | The details of the redemption |

<a id="getuserredemptioncount-address"></a>

### getUserRedemptionCount

Gets the number of redemptions a user has started

```solidity
function getUserRedemptionCount(address user_) external view returns (uint16 count);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| count | `uint16` | The number of redemptions |

<a id="getuserredemptions-address"></a>

### getUserRedemptions

Gets all redemptions for a user

```solidity
function getUserRedemptions(address user_) external view returns (UserRedemption[] memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `UserRedemption[]` | redemptions The array of redemptions |

<a id="startredemption-ierc20-uint8-uint256-address"></a>

### startRedemption

Starts a redemption of a quantity of deposit tokens

```solidity
function startRedemption(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address facility_
    ) external returns (uint16 redemptionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The address of the deposit token |
| depositPeriod_ | `uint8` | The period of the deposit in months |
| amount_ | `uint256` | The amount of deposit tokens to redeem |
| facility_ | `address` | The facility to handle this redemption |

**Returns**

| Name         | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| redemptionId | `uint16` | The ID of the user redemption |

<a id="startredemption-uint256-uint256"></a>

### startRedemption

Starts a redemption based on a position ID, using the position's conversion expiry

```solidity
function startRedemption(
        uint256 positionId_,
        uint256 amount_
    ) external returns (uint16 redemptionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to redeem from |
| amount_ | `uint256` | The amount of deposit tokens to redeem |

**Returns**

| Name         | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| redemptionId | `uint16` | The ID of the user redemption |

<a id="cancelredemption-uint16-uint256"></a>

### cancelRedemption

Cancels a redemption of a quantity of deposit tokens

```solidity
function cancelRedemption(uint16 redemptionId_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| redemptionId_ | `uint16` | The ID of the user redemption |
| amount_ | `uint256` | The amount of deposit tokens to cancel |

<a id="finishredemption-uint16"></a>

### finishRedemption

Finishes a redemption of a quantity of deposit tokens

<i>

This function does not take an amount as an argument, because the amount is determined by the redemption

</i>

```solidity
function finishRedemption(uint16 redemptionId_) external returns (uint256 actualAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| redemptionId_ | `uint16` | The ID of the user redemption |

**Returns**

| Name         | Type      | Description                                              |
| ------------ | --------- | -------------------------------------------------------- |
| actualAmount | `uint256` | The quantity of deposit tokens transferred to the caller |

<a id="borrowagainstredemption-uint16"></a>

### borrowAgainstRedemption

Borrow the maximum amount against an active redemption

```solidity
function borrowAgainstRedemption(uint16 redemptionId_) external returns (uint256 actualAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| redemptionId_ | `uint16` | The ID of the redemption to borrow against |

**Returns**

| Name         | Type      | Description                                                    |
| ------------ | --------- | -------------------------------------------------------------- |
| actualAmount | `uint256` | The quantity of underlying assets transferred to the recipient |

<a id="previewborrowagainstredemption-address-uint16"></a>

### previewBorrowAgainstRedemption

Preview the maximum amount that can be borrowed against an active redemption

```solidity
function previewBorrowAgainstRedemption(
        address user_,
        uint16 redemptionId_
    ) external view returns (uint256 principal, uint256 interest, uint48 dueDate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |
| redemptionId_ | `uint16` | The ID of the redemption to borrow against |

**Returns**

| Name      | Type      | Description                               |
| --------- | --------- | ----------------------------------------- |
| principal | `uint256` | The principal amount that can be borrowed |
| interest  | `uint256` | The interest amount that will be charged  |
| dueDate   | `uint48`  | The due date of the loan                  |

<a id="repayloan-uint16-uint256-uint256"></a>

### repayLoan

Repay a loan

```solidity
function repayLoan(uint16 redemptionId_, uint256 amount_, uint256 maxSlippage_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| redemptionId_ | `uint16` | The ID of the redemption |
| amount_ | `uint256` | The amount to repay |
| maxSlippage_ | `uint256` | The maximum slippage allowed for the repayment |

<a id="previewextendloan-address-uint16-uint8"></a>

### previewExtendLoan

Preview the interest payable for extending a loan

```solidity
function previewExtendLoan(
        address user_,
        uint16 redemptionId_,
        uint8 months_
    ) external view returns (uint48 newDueDate, uint256 interestPayable);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |
| redemptionId_ | `uint16` | The ID of the redemption |
| months_ | `uint8` | The number of months to extend the loan |

**Returns**

| Name            | Type      | Description                         |
| --------------- | --------- | ----------------------------------- |
| newDueDate      | `uint48`  | The new due date                    |
| interestPayable | `uint256` | The interest payable upon extension |

<a id="extendloan-uint16-uint8"></a>

### extendLoan

Extend a loan's due date

```solidity
function extendLoan(uint16 redemptionId_, uint8 months_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| redemptionId_ | `uint16` | The ID of the redemption |
| months_ | `uint8` | The number of months to extend the loan |

<a id="claimdefaultedloan-address-uint16"></a>

### claimDefaultedLoan

Claim a defaulted loan and collect the reward

```solidity
function claimDefaultedLoan(address user_, uint16 redemptionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |
| redemptionId_ | `uint16` | The ID of the redemption |

<a id="getredemptionloan-address-uint16"></a>

### getRedemptionLoan

Get all loans for a redemption

```solidity
function getRedemptionLoan(
        address user_,
        uint16 redemptionId_
    ) external view returns (Loan memory loan);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_ | `address` | The address of the user |
| redemptionId_ | `uint16` | The ID of the redemption |

**Returns**

| Name | Type   | Description |
| ---- | ------ | ----------- |
| loan | `Loan` | The loan    |

<a id="setmaxborrowpercentage-ierc20-address-uint16"></a>

### setMaxBorrowPercentage

Set the maximum borrow percentage for an asset-facility combination

```solidity
function setMaxBorrowPercentage(IERC20 asset_, address facility_, uint16 percent_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the asset |
| facility_ | `address` | The address of the facility |
| percent_ | `uint16` | The maximum borrow percentage |

<a id="getmaxborrowpercentage-ierc20-address"></a>

### getMaxBorrowPercentage

Get the maximum borrow percentage for an asset-facility combination

```solidity
function getMaxBorrowPercentage(
        IERC20 asset_,
        address facility_
    ) external view returns (uint16 percent);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the asset |
| facility_ | `address` | The address of the facility |

**Returns**

| Name    | Type     | Description                                   |
| ------- | -------- | --------------------------------------------- |
| percent | `uint16` | The maximum borrow percentage (100e2 == 100%) |

<a id="setannualinterestrate-ierc20-address-uint16"></a>

### setAnnualInterestRate

Set the annual interest rate for an asset-facility combination

```solidity
function setAnnualInterestRate(IERC20 asset_, address facility_, uint16 rate_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the asset |
| facility_ | `address` | The address of the facility |
| rate_ | `uint16` | The annual interest rate (100e2 == 100%) |

<a id="getannualinterestrate-ierc20-address"></a>

### getAnnualInterestRate

Get the annual interest rate for an asset-facility combination

```solidity
function getAnnualInterestRate(
        IERC20 asset_,
        address facility_
    ) external view returns (uint16 rate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the asset |
| facility_ | `address` | The address of the facility |

**Returns**

| Name | Type     | Description                                 |
| ---- | -------- | ------------------------------------------- |
| rate | `uint16` | The annual interest rate, in terms of 100e2 |

<a id="setclaimdefaultrewardpercentage-uint16"></a>

### setClaimDefaultRewardPercentage

Set the reward percentage when a claiming a defaulted loan

```solidity
function setClaimDefaultRewardPercentage(uint16 percent_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| percent_ | `uint16` | The claim default reward percentage |

<a id="getclaimdefaultrewardpercentage"></a>

### getClaimDefaultRewardPercentage

Get the claim default reward percentage

```solidity
function getClaimDefaultRewardPercentage() external view returns (uint16 percent);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| percent | `uint16` | The claim default reward percentage, in terms of 100e2 |

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

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| user          | `address` |             |
| redemptionId  | `uint16`  |             |
| depositToken  | `address` |             |
| depositPeriod | `uint8`   |             |
| amount        | `uint256` |             |
| facility      | `address` |             |

### RedemptionFinished

```solidity
event RedemptionFinished(
        address indexed user,
        uint16 indexed redemptionId,
        address indexed depositToken,
        uint8 depositPeriod,
        uint256 amount
    );
```

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| user          | `address` |             |
| redemptionId  | `uint16`  |             |
| depositToken  | `address` |             |
| depositPeriod | `uint8`   |             |
| amount        | `uint256` |             |

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

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| user            | `address` |             |
| redemptionId    | `uint16`  |             |
| depositToken    | `address` |             |
| depositPeriod   | `uint8`   |             |
| amount          | `uint256` |             |
| remainingAmount | `uint256` |             |

### LoanCreated

```solidity
event LoanCreated(
        address indexed user,
        uint16 indexed redemptionId,
        uint256 amount,
        address facility
    );
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| amount       | `uint256` |             |
| facility     | `address` |             |

### LoanRepaid

```solidity
event LoanRepaid(
        address indexed user,
        uint16 indexed redemptionId,
        uint256 principal,
        uint256 interest
    );
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| principal    | `uint256` |             |
| interest     | `uint256` |             |

### LoanExtended

```solidity
event LoanExtended(address indexed user, uint16 indexed redemptionId, uint256 newDueDate);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| newDueDate   | `uint256` |             |

### LoanDefaulted

```solidity
event LoanDefaulted(
        address indexed user,
        uint16 indexed redemptionId,
        uint256 principal,
        uint256 interest,
        uint256 remainingCollateral
    );
```

**Parameters**

| Name                | Type      | Description |
| ------------------- | --------- | ----------- |
| user                | `address` |             |
| redemptionId        | `uint16`  |             |
| principal           | `uint256` |             |
| interest            | `uint256` |             |
| remainingCollateral | `uint256` |             |

### FacilityAuthorized

```solidity
event FacilityAuthorized(address indexed facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| facility | `address` |             |

### FacilityDeauthorized

```solidity
event FacilityDeauthorized(address indexed facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| facility | `address` |             |

### AnnualInterestRateSet

```solidity
event AnnualInterestRateSet(address indexed asset, address indexed facility, uint16 rate);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| facility | `address` |             |
| rate     | `uint16`  |             |

### MaxBorrowPercentageSet

```solidity
event MaxBorrowPercentageSet(address indexed asset, address indexed facility, uint16 percent);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| facility | `address` |             |
| percent  | `uint16`  |             |

### ClaimDefaultRewardPercentageSet

```solidity
event ClaimDefaultRewardPercentageSet(uint16 percent);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| percent | `uint16` |             |

## Errors

### RedemptionVault_InvalidDepositManager

```solidity
error RedemptionVault_InvalidDepositManager(address depositManager);
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| depositManager | `address` |             |

### RedemptionVault_ZeroAmount

```solidity
error RedemptionVault_ZeroAmount();
```

### RedemptionVault_InvalidRedemptionId

```solidity
error RedemptionVault_InvalidRedemptionId(address user, uint16 redemptionId);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |

### RedemptionVault_InvalidAmount

```solidity
error RedemptionVault_InvalidAmount(address user, uint16 redemptionId, uint256 amount);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| amount       | `uint256` |             |

### RedemptionVault_TooEarly

```solidity
error RedemptionVault_TooEarly(address user, uint16 redemptionId, uint48 redeemableAt);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| redeemableAt | `uint48`  |             |

### RedemptionVault_AlreadyRedeemed

```solidity
error RedemptionVault_AlreadyRedeemed(address user, uint16 redemptionId);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |

### RedemptionVault_ZeroAddress

```solidity
error RedemptionVault_ZeroAddress();
```

### RedemptionVault_OutOfBounds

```solidity
error RedemptionVault_OutOfBounds(uint16 rate);
```

**Parameters**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| rate | `uint16` |             |

### RedemptionVault_UnpaidLoan

```solidity
error RedemptionVault_UnpaidLoan(address user, uint16 redemptionId);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |

### RedemptionVault_InvalidFacility

```solidity
error RedemptionVault_InvalidFacility(address facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| facility | `address` |             |

### RedemptionVault_FacilityExists

```solidity
error RedemptionVault_FacilityExists(address facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| facility | `address` |             |

### RedemptionVault_FacilityNotRegistered

```solidity
error RedemptionVault_FacilityNotRegistered(address facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| facility | `address` |             |

### RedemptionVault_InterestRateNotSet

```solidity
error RedemptionVault_InterestRateNotSet(address asset, address facility);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| facility | `address` |             |

### RedemptionVault_LoanAmountExceeded

```solidity
error RedemptionVault_LoanAmountExceeded(address user, uint16 redemptionId, uint256 amount);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| amount       | `uint256` |             |

### RedemptionVault_LoanIncorrectState

```solidity
error RedemptionVault_LoanIncorrectState(address user, uint16 redemptionId);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |

### RedemptionVault_InvalidLoan

```solidity
error RedemptionVault_InvalidLoan(address user, uint16 redemptionId);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |

### RedemptionVault_MaxSlippageExceeded

```solidity
error RedemptionVault_MaxSlippageExceeded(
        address user,
        uint16 redemptionId,
        uint256 actualAmount,
        uint256 maxAmount
    );
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| user         | `address` |             |
| redemptionId | `uint16`  |             |
| actualAmount | `uint256` |             |
| maxAmount    | `uint256` |             |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken | `address` | The address of the deposit token |
| depositPeriod | `uint8` | The period of the deposit in months |
| redeemableAt | `uint48` | The timestamp at which the redemption can be finished |
| amount | `uint256` | The amount of deposit tokens to redeem |
| facility | `address` | The facility that handles this redemption |
| positionId | `uint256` | The position ID for position-based redemptions (type(uint256).max without a position) |

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

| Name | Type | Description |
| ---- | ---- | ----------- |
| initialPrincipal | `uint256` | The initial principal amount borrowed |
| principal | `uint256` | The principal owed |
| interest | `uint256` | The interest owed |
| dueDate | `uint48` | The timestamp when the loan is due |
| isDefaulted | `bool` | Whether the loan has defaulted |
