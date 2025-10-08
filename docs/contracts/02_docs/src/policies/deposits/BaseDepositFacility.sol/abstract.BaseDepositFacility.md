# BaseDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/deposits/BaseDepositFacility.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IDepositFacility](/main/contracts/docs/src/policies/interfaces/deposits/IDepositFacility.sol/interface.IDepositFacility), ReentrancyGuard

Abstract base contract for deposit facilities with shared functionality

## State Variables

### ONE_HUNDRED_PERCENT

The number representing 100%

```solidity
uint16 public constant ONE_HUNDRED_PERCENT = 100e2;
```

### DEPOSIT_MANAGER

The deposit manager

```solidity
IDepositManager public immutable DEPOSIT_MANAGER;
```

### _authorizedOperators

Set of authorized operators

```solidity
EnumerableSet.AddressSet private _authorizedOperators;
```

### _assetCommittedDeposits

The amount of assets committed, excluding the assets that have been lent out

```solidity
mapping(IERC20 asset => uint256 committedDeposits) private _assetCommittedDeposits;
```

### _assetOperatorCommittedDeposits

The amount of assets committed per operator, excluding the assets that have been lent out

```solidity
mapping(bytes32 assetOperatorKey => uint256 committedDeposits) private _assetOperatorCommittedDeposits;
```

### TRSRY

The TRSRY module

*Must be populated by the inheriting contract in `configureDependencies()`*

```solidity
TRSRYv1 public TRSRY;
```

### DEPOS

The DEPOS module.

*Must be populated by the inheriting contract in `configureDependencies()`*

```solidity
DEPOSv1 public DEPOS;
```

### _assetPeriodReclaimRates

Maps asset-period key to reclaim rate

*The key is the keccak256 of the asset address and the deposit period*

```solidity
mapping(bytes32 key => uint16 reclaimRate) private _assetPeriodReclaimRates;
```

## Functions

### onlyAuthorizedOperator

Reverts if the caller is not an authorized operator

```solidity
modifier onlyAuthorizedOperator();
```

### constructor

```solidity
constructor(address kernel_, address depositManager_) Policy(Kernel(kernel_));
```

### authorizeOperator

Authorize an operator (e.g., a redemption vault) to handle actions through this facility

```solidity
function authorizeOperator(address operator_) external onlyEnabled onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator to authorize|

### deauthorizeOperator

Deauthorize an operator

```solidity
function deauthorizeOperator(address operator_) external onlyEnabled onlyEmergencyOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator to deauthorize|

### isAuthorizedOperator

Check if an operator is authorized

```solidity
function isAuthorizedOperator(address operator_) external view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|      The address of the operator to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isAuthorized    True if the operator is authorized|

### getOperators

Get the list of operators authorized to handle actions through this facility

```solidity
function getOperators() external view returns (address[] memory operators);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`operators`|`address[]`|  The list of operators|

### _getCommittedDepositsKey

```solidity
function _getCommittedDepositsKey(IERC20 depositToken_, address operator_) internal pure returns (bytes32);
```

### _getAssetPeriodKey

Helper function to generate the key for asset period reclaim rates

```solidity
function _getAssetPeriodKey(IERC20 asset_, uint8 depositPeriod_) internal pure returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The asset address|
|`depositPeriod_`|`uint8`|The deposit period in months|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The keccak256 hash of the asset and deposit period|

### handleCommit

Allows an operator to commit funds. This will ensure that enough funds are available to honour the commitments.

*This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The deposit token or period are not supported for this facility in the DepositManager
- There are not enough available deposits in the DepositManager*

```solidity
function handleCommit(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token committed|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount to commit|

### handleCommitCancel

Allows an operator to cancel committed funds.

*This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator*

```solidity
function handleCommitCancel(IERC20 depositToken_, uint8, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token committed|
|`<none>`|`uint8`||
|`amount_`|`uint256`|         The amount to reduce the commitment by|

### handleCommitWithdraw

Allows an operator to withdraw committed funds. This will withdraw deposit tokens to the recipient.

*This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator*

```solidity
function handleCommitWithdraw(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address recipient_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to withdraw|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount to withdraw|
|`recipient_`|`address`|      The address to receive the deposit tokens|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|actualAmount    The amount of tokens transferred|

### handleBorrow

Allows an operator to borrow against this facility's committed funds.

*This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator*

```solidity
function handleBorrow(IERC20 depositToken_, uint8, uint256 amount_, address recipient_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to borrow against|
|`<none>`|`uint8`||
|`amount_`|`uint256`|         The amount to borrow|
|`recipient_`|`address`|      The address to receive the borrowed tokens|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|actualAmount    The amount of tokens borrowed|

### handleLoanRepay

Allows an operator to repay borrowed funds

*This function performs the following:

- Updates the committed deposits
This function will revert if:
- This contract is not enabled
- The caller is not an authorized operator*

```solidity
function handleLoanRepay(IERC20 depositToken_, uint8, uint256 amount_, address payer_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token being repaid|
|`<none>`|`uint8`||
|`amount_`|`uint256`|         The amount being repaid|
|`payer_`|`address`|          The address making the repayment|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|actualAmount    The amount of tokens repaid|

### handleLoanDefault

Allows an operator to default on a loan

*This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator*

```solidity
function handleLoanDefault(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address payer_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|The deposit token being defaulted|
|`depositPeriod_`|`uint8`|The deposit period in months|
|`amount_`|`uint256`|The amount being defaulted|
|`payer_`|`address`|The address making the default|

### handlePositionRedemption

Allows an operator to handle position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionRedemption(uint256 positionId_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`| The position ID to update|
|`amount_`|`uint256`|     The amount being redeemed from the position|

### handlePositionCancelRedemption

Allows an operator to handle the cancellation of position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionCancelRedemption(uint256 positionId_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    onlyAuthorizedOperator;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`| The position ID to update|
|`amount_`|`uint256`|     The redemption amount to be cancelled|

### getAvailableDeposits

Get the available deposit balance for a specific token.
This excludes any committed funds.

```solidity
function getAvailableDeposits(IERC20 depositToken_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|The deposit token to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|balance     The available deposit balance|

### getCommittedDeposits

Get the committed deposits for a specific token.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for all operators to use.

*The amount is calculated as:

- The amount of deposits that have been committed (via `handleCommit()`) for the deposit token and operator
- Minus: the amount of loan principal currently outstanding for the operator*

```solidity
function getCommittedDeposits(IERC20 depositToken_, address operator_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to query|
|`operator_`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|committed       The total committed deposits|

### getCommittedDeposits

Get the committed deposits for a specific token.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for all operators to use.

*The amount returned is calculated as:

- The amount of deposits that have been committed (via `handleCommit()`) for the deposit token
- Minus: the amount of loan principal currently outstanding*

```solidity
function getCommittedDeposits(IERC20 depositToken_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|committed       The total committed deposits|

### _validateAvailableDeposits

```solidity
function _validateAvailableDeposits(IERC20 depositToken_, uint256 amount_) internal view;
```

### _previewReclaim

```solidity
function _previewReclaim(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_)
    internal
    view
    returns (uint256 reclaimed);
```

### previewReclaim

Preview the amount of deposit token that would be reclaimed

*The implementing contract is expected to handle the following:

- Returning the total amount of deposit tokens that would be reclaimed*

```solidity
function previewReclaim(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_)
    public
    view
    onlyEnabled
    returns (uint256 reclaimed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|  The address of the deposit token|
|`depositPeriod_`|`uint8`| The period of the deposit in months|
|`amount_`|`uint256`|        The amount of deposit tokens to reclaim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimed`|`uint256`|      The amount of deposit token returned to the caller|

### reclaim

Reclaims deposit tokens, after applying a discount
Deposit tokens can be reclaimed at any time.
The caller is not required to have a position in the facility.

*This function reverts if:

- The contract is not active
- Deposits are not enabled for the asset/period
- The depositor has not approved the DepositManager to spend the receipt token
- The depositor has an insufficient balance of the receipt token*

```solidity
function reclaim(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_)
    external
    nonReentrant
    onlyEnabled
    returns (uint256 reclaimed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|  The address of the deposit token|
|`depositPeriod_`|`uint8`| The period of the deposit in months|
|`amount_`|`uint256`|        The amount of deposit tokens to reclaim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimed`|`uint256`|      The amount of deposit token returned to the caller|

### split

Splits the specified amount of the position into a new position

*This function reverts if:

- The position does not exist
- The position was not created by this facility
- The caller is not the owner of the position*

```solidity
function split(uint256 positionId_, uint256 amount_, address to_, bool wrap_)
    external
    nonReentrant
    onlyEnabled
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`|    The ID of the position to split|
|`amount_`|`uint256`|        The amount to split from the position|
|`to_`|`address`|            The address to receive the new position|
|`wrap_`|`bool`|          Whether to wrap the new position|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|newPositionId   The ID of the newly created position|

### _split

Internal function to handle the splitting of a position

*Inheriting contracts can implement this function to perform custom actions when a position is split. This function is called after the position is split, so beware of reentrancy.*

```solidity
function _split(uint256 oldPositionId_, uint256 newPositionId_, uint256 amount_) internal virtual;
```

### setAssetPeriodReclaimRate

Sets the reclaim rate for an asset period

*This function reverts if:

- The contract is not enabled
- The caller does not have the manager or admin role
- The reclaim rate exceeds 100%*

```solidity
function setAssetPeriodReclaimRate(IERC20 asset_, uint8 depositPeriod_, uint16 reclaimRate_)
    external
    onlyEnabled
    onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|        The address of the underlying asset|
|`depositPeriod_`|`uint8`|The deposit period, in months|
|`reclaimRate_`|`uint16`|  The reclaim rate to set (in basis points, where 100e2 = 100%)|

### getAssetPeriodReclaimRate

Returns the reclaim rate for an asset period

```solidity
function getAssetPeriodReclaimRate(IERC20 asset_, uint8 depositPeriod_) external view returns (uint16 reclaimRate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|        The address of the underlying asset|
|`depositPeriod_`|`uint8`|The deposit period, in months|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reclaimRate`|`uint16`|  The reclaim rate for the asset period|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```
