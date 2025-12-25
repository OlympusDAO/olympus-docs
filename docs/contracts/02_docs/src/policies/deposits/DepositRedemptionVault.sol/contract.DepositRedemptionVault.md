# DepositRedemptionVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/deposits/DepositRedemptionVault.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [IDepositRedemptionVault](/main/contracts/docs/src/policies/interfaces/deposits/IDepositRedemptionVault.sol/interface.IDepositRedemptionVault), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), ReentrancyGuard

**Title:**
DepositRedemptionVault

forge-lint: disable-start(asm-keccak256, mixed-case-variable)

A contract that manages the redemption of receipt tokens with facility coordination and borrowing

## State Variables

### ONE_HUNDRED_PERCENT

The number representing 100%

```solidity
uint16 public constant ONE_HUNDRED_PERCENT = 100e2
```

### _MONTHS_IN_YEAR

The number of months in a year

```solidity
uint8 internal constant _MONTHS_IN_YEAR = 12
```

### _ONE_MONTH

Constant for one month

```solidity
uint48 internal constant _ONE_MONTH = 30 days
```

### _NO_POSITION

Used to denote no position ID

```solidity
uint256 internal constant _NO_POSITION = type(uint256).max
```

### _assetFacilityMaxBorrowPercentages

Per-asset-facility max borrow percentage (in 100e2, e.g. 8500 = 85%)

```solidity
mapping(bytes32 => uint16) internal _assetFacilityMaxBorrowPercentages
```

### _assetFacilityAnnualInterestRates

Per-asset-facility interest rate (annual, in 100e2, e.g. 500 = 5%)

```solidity
mapping(bytes32 => uint16) internal _assetFacilityAnnualInterestRates
```

### _claimDefaultRewardPercentage

Keeper reward percentage (in 100e2, e.g. 500 = 5%)

```solidity
uint16 internal _claimDefaultRewardPercentage
```

### DEPOSIT_MANAGER

The address of the token manager

```solidity
IDepositManager public immutable DEPOSIT_MANAGER
```

### TRSRY

The TRSRY module.

```solidity
TRSRYv1 public TRSRY
```

### DEPOS

The DEPOS module.

```solidity
DEPOSv1 public DEPOS
```

### _userRedemptionCount

The number of redemptions per user

```solidity
mapping(address => uint16) internal _userRedemptionCount
```

### _userRedemptions

The redemption for each user and redemption ID

Use `_getUserRedemptionKey()` to calculate the key for the mapping.
A complex key is used to save gas compared to a nested mapping.

```solidity
mapping(bytes32 => UserRedemption) internal _userRedemptions
```

### _authorizedFacilities

Registered facilities

```solidity
EnumerableSet.AddressSet internal _authorizedFacilities
```

### _redemptionLoan

Loan for each redemption

Use `_getUserRedemptionKey()` to calculate the key for the mapping.
A complex key is used to save gas compared to a nested mapping.

```solidity
mapping(bytes32 => Loan) internal _redemptionLoan
```

## Functions

### constructor

```solidity
constructor(address kernel_, address depositManager_) Policy(Kernel(kernel_));
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external pure override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### authorizeFacility

Authorize a facility

```solidity
function authorizeFacility(address facility_) external onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|   The address of the facility to authorize|

### deauthorizeFacility

Deauthorize a facility

```solidity
function deauthorizeFacility(address facility_) external onlyEmergencyOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|   The address of the facility to deauthorize|

### isAuthorizedFacility

Check if a facility is authorized

```solidity
function isAuthorizedFacility(address facility_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`facility_`|`address`|       The address of the facility to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isAuthorized    True if the facility is authorized|

### getAuthorizedFacilities

Get all authorized facilities

```solidity
function getAuthorizedFacilities() external view returns (address[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|facilities  Array of authorized facility addresses|

### _pullReceiptToken

Pull the receipt tokens from the caller

```solidity
function _pullReceiptToken(IERC20 depositToken_, uint8 depositPeriod_, address facility_, uint256 amount_)
    internal;
```

### _getUserRedemptionKey

```solidity
function _getUserRedemptionKey(address user_, uint16 redemptionId_) internal pure returns (bytes32);
```

### _getAssetFacilityKey

Generate a key for the asset-facility parameter mappings

```solidity
function _getAssetFacilityKey(address asset_, address facility_) internal pure returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`address`|The asset address|
|`facility_`|`address`|The facility address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The key for the mapping|

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

### getUserRedemptions

Gets all redemptions for a user

Notes:

- This function is gas-intensive for users with many redemptions.
- The index of an element in the returned array is the redemption ID.
- Redemptions with an amount of 0 (fully redeemed) are included in the array.

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

### _onlyValidRedemptionId

```solidity
function _onlyValidRedemptionId(address user_, uint16 redemptionId_) internal view;
```

### onlyValidRedemptionId

```solidity
modifier onlyValidRedemptionId(address user_, uint16 redemptionId_) ;
```

### _validateFacility

```solidity
function _validateFacility(address facility_) internal view;
```

### onlyValidFacility

```solidity
modifier onlyValidFacility(address facility_) ;
```

### startRedemption

Starts a redemption of a quantity of deposit tokens

This function expects receipt tokens to be unwrapped (i.e. native ERC6909 tokens)
This function reverts if:

- The contract is disabled
- The amount is 0
- The provided facility is not authorized

```solidity
function startRedemption(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address facility_)
    external
    nonReentrant
    onlyEnabled
    onlyValidFacility(facility_)
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

This function expects receipt tokens to be unwrapped (i.e. native ERC6909 tokens)
This function reverts if:

- The contract is disabled
- The amount is 0
- The caller is not the owner of the position
- The amount is greater than the remainingDeposit of the position
- The facility that created the position is not authorized

```solidity
function startRedemption(uint256 positionId_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    returns (uint16 redemptionId);
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

This function reverts if:

- The contract is disabled
- The caller is not the owner of the redemption ID
- The facility in the redemption record is not authorized
- The amount is 0
- The amount is greater than the redemption amount
- There is an unpaid loan

```solidity
function cancelRedemption(uint16 redemptionId_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(msg.sender, redemptionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|The ID of the user redemption|
|`amount_`|`uint256`|      The amount of deposit tokens to cancel|

### finishRedemption

Finishes a redemption of a quantity of deposit tokens

This function reverts if:

- The contract is disabled
- The caller is not the owner of the redemption ID
- The facility in the redemption record is not authorized
- The redemption amount is 0
- It is too early for redemption
- There is an unpaid loan

```solidity
function finishRedemption(uint16 redemptionId_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(msg.sender, redemptionId_)
    returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|  The ID of the user redemption|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The quantity of deposit tokens transferred to the caller|

### _calculateInterest

```solidity
function _calculateInterest(uint256 principal_, uint256 interestRate_, uint256 depositPeriod_)
    internal
    pure
    returns (uint256);
```

### _previewBorrowAgainstRedemption

```solidity
function _previewBorrowAgainstRedemption(address user_, uint16 redemptionId_)
    internal
    view
    returns (uint256, uint256, uint48);
```

### previewBorrowAgainstRedemption

Preview the maximum amount that can be borrowed against an active redemption

Notes:

- The calculated amount may differ from the actual amount borrowed (using `borrowAgainstRedemption()`) by a few wei, due to rounding behaviour in ERC4626 vaults.

```solidity
function previewBorrowAgainstRedemption(address user_, uint16 redemptionId_)
    external
    view
    returns (uint256, uint256, uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption to borrow against|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|principal       The principal amount that can be borrowed|
|`<none>`|`uint256`|interest        The interest amount that will be charged|
|`<none>`|`uint48`|dueDate         The due date of the loan|

### borrowAgainstRedemption

Borrow the maximum amount against an active redemption

Borrows the maximum possible amount against an existing redemption.
The loan will be for a fixed-term. The interest is calculated on the
basis of that term, and the full amount will be payable in order to
close the loan.
This function will revert if:

- The contract is not enabled
- The redemption ID is invalid
- The facility is not authorized
- The amount is 0
- The interest rate is not set

```solidity
function borrowAgainstRedemption(uint16 redemptionId_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(msg.sender, redemptionId_)
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption to borrow against|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|actualAmount    The quantity of underlying assets transferred to the recipient|

### repayLoan

Repay a loan

This function will repay the outstanding loan amount.
Interest is paid back first, followed by principal.
To prevent irrecoverable overpayments, the maximum slippage is used to validate that a repayment is within bounds of the remaining loan principal.
This function will revert if:

- The contract is not enabled
- The redemption ID is invalid
- The redemption has no loan
- The amount is 0
- The loan is expired, defaulted or fully repaid

```solidity
function repayLoan(uint16 redemptionId_, uint256 amount_, uint256 maxSlippage_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(msg.sender, redemptionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption|
|`amount_`|`uint256`|         The amount to repay|
|`maxSlippage_`|`uint256`|    The maximum slippage allowed for the repayment|

### _previewExtendLoan

```solidity
function _previewExtendLoan(
    address asset_,
    address facility_,
    uint256 principal_,
    uint48 dueDate_,
    uint8 extensionMonths_
) internal view returns (uint48, uint256);
```

### previewExtendLoan

Preview the interest payable for extending a loan

This function will revert if:

- The redemption ID is invalid
- The loan is invalid
- The loan is expired, defaulted or fully repaid
- The months is 0

```solidity
function previewExtendLoan(address user_, uint16 redemptionId_, uint8 months_)
    external
    view
    onlyValidRedemptionId(user_, redemptionId_)
    returns (uint48, uint256);
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
|`<none>`|`uint48`|newDueDate      The new due date|
|`<none>`|`uint256`|interestPayable The interest payable upon extension|

### extendLoan

Extend a loan's due date

This function will revert if:

- The contract is not enabled
- The redemption ID is invalid
- The loan is invalid
- The loan is expired, defaulted or fully repaid
- The months is 0

```solidity
function extendLoan(uint16 redemptionId_, uint8 months_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(msg.sender, redemptionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`redemptionId_`|`uint16`|   The ID of the redemption|
|`months_`|`uint8`|         The number of months to extend the loan|

### claimDefaultedLoan

Claim a defaulted loan and collect the reward

This function will revert if:

- The contract is not enabled
- The redemption ID is invalid
- The loan is invalid
- The loan is not expired
- The loan is already defaulted

```solidity
function claimDefaultedLoan(address user_, uint16 redemptionId_)
    external
    nonReentrant
    onlyEnabled
    onlyValidRedemptionId(user_, redemptionId_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|

### getRedemptionLoan

Get all loans for a redemption

```solidity
function getRedemptionLoan(address user_, uint16 redemptionId_) external view returns (Loan memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|           The address of the user|
|`redemptionId_`|`uint16`|   The ID of the redemption|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Loan`|loan            The loan|

### setMaxBorrowPercentage

Set the maximum borrow percentage for an asset-facility combination

Notes:

- When setting the max borrow percentage, keep in mind the annual interest rate and claim default reward percentage, as the three configuration values can create incentives for borrowers to not repay their loans (e.g. claim default on their own loan)
- This function allows setting the value even if the asset or facility are not registered
This function reverts if:
- The contract is not enabled
- The caller does not have the admin or manager role
- asset_ is the zero address
- facility_ is the zero address
- percent_ is out of range

```solidity
function setMaxBorrowPercentage(IERC20 asset_, address facility_, uint16 percent_)
    external
    onlyEnabled
    onlyManagerOrAdminRole;
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
function getMaxBorrowPercentage(IERC20 asset_, address facility_) external view returns (uint16);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|percent  The maximum borrow percentage (100e2 == 100%)|

### setAnnualInterestRate

Set the annual interest rate for an asset-facility combination

Notes:

- When setting the annual interest rate, keep in mind the max borrow percentage and claim default reward percentage, as the three configuration values can create incentives for borrowers to not repay their loans (e.g. claim default on their own loan)
- This function allows setting the value even if the asset or facility are not registered
This function reverts if:
- The contract is not enabled
- The caller does not have the admin or manager role
- asset_ is the zero address
- facility_ is the zero address
- percent_ is out of range

```solidity
function setAnnualInterestRate(IERC20 asset_, address facility_, uint16 rate_)
    external
    onlyEnabled
    onlyManagerOrAdminRole;
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
function getAnnualInterestRate(IERC20 asset_, address facility_) external view returns (uint16);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|   The address of the asset|
|`facility_`|`address`|The address of the facility|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|rate     The annual interest rate, in terms of 100e2|

### setClaimDefaultRewardPercentage

Set the reward percentage when a claiming a defaulted loan

Notes:

- When setting the claim default reward percentage, keep in mind the annual interest rate and max borrow percentage, as the three configuration values can create incentives for borrowers to not repay their loans (e.g. claim default on their own loan)

```solidity
function setClaimDefaultRewardPercentage(uint16 percent_) external onlyEnabled onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`percent_`|`uint16`| The claim default reward percentage|

### getClaimDefaultRewardPercentage

Get the claim default reward percentage

```solidity
function getClaimDefaultRewardPercentage() external view returns (uint16);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|percent The claim default reward percentage, in terms of 100e2|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
