# IDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/deposits/IDepositFacility.sol)

Interface for deposit facilities to coordinate with generic operators (e.g., redemption vaults)

## Functions

### authorizeOperator

Authorize an operator (e.g., a redemption vault) to handle actions through this facility

```solidity
function authorizeOperator(address operator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator to authorize|

### deauthorizeOperator

Deauthorize an operator

```solidity
function deauthorizeOperator(address operator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator to deauthorize|

### isAuthorizedOperator

Check if an operator is authorized

```solidity
function isAuthorizedOperator(address operator_) external view returns (bool isAuthorized);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|      The address of the operator to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`isAuthorized`|`bool`|   True if the operator is authorized|

### getOperators

Get the list of operators authorized to handle actions through this facility

```solidity
function getOperators() external view returns (address[] memory operators);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`operators`|`address[]`|  The list of operators|

### handleCommit

Allows an operator to commit funds. This will ensure that enough funds are available to honour the commitments.

```solidity
function handleCommit(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token committed|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount to commit|

### handleCommitCancel

Allows an operator to cancel committed funds.

```solidity
function handleCommitCancel(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token committed|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount to reduce the commitment by|

### handleCommitWithdraw

Allows an operator to withdraw committed funds. This will withdraw deposit tokens to the recipient.

```solidity
function handleCommitWithdraw(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address recipient_)
    external
    returns (uint256 actualAmount);
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
|`actualAmount`|`uint256`|   The amount of tokens transferred|

### handlePositionRedemption

Allows an operator to handle position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionRedemption(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`| The position ID to update|
|`amount_`|`uint256`|     The amount being redeemed from the position|

### handlePositionCancelRedemption

Allows an operator to handle the cancellation of position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionCancelRedemption(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionId_`|`uint256`| The position ID to update|
|`amount_`|`uint256`|     The redemption amount to be cancelled|

### handleBorrow

Allows an operator to borrow against this facility's committed funds.

```solidity
function handleBorrow(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address recipient_)
    external
    returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to borrow against|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount to borrow|
|`recipient_`|`address`|      The address to receive the borrowed tokens|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The amount of tokens borrowed|

### handleLoanRepay

Allows an operator to repay borrowed funds

```solidity
function handleLoanRepay(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address payer_)
    external
    returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token being repaid|
|`depositPeriod_`|`uint8`|  The deposit period in months|
|`amount_`|`uint256`|         The amount being repaid|
|`payer_`|`address`|          The address making the repayment|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The amount of tokens repaid|

### handleLoanDefault

Allows an operator to default on a loan

```solidity
function handleLoanDefault(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_, address payer_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|The deposit token being defaulted|
|`depositPeriod_`|`uint8`|The deposit period in months|
|`amount_`|`uint256`|The amount being defaulted|
|`payer_`|`address`|The address making the default|

### previewReclaim

Preview the amount of deposit token that would be reclaimed

*The implementing contract is expected to handle the following:

- Returning the total amount of deposit tokens that would be reclaimed*

```solidity
function previewReclaim(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_)
    external
    view
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

*The implementing contract is expected to handle the following:

- Burning the receipt tokens
- Transferring the deposit token to `recipient_`
- Emitting an event*

```solidity
function reclaim(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_) external returns (uint256 reclaimed);
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

### setAssetPeriodReclaimRate

Sets the reclaim rate for an asset period

```solidity
function setAssetPeriodReclaimRate(IERC20 asset_, uint8 depositPeriod_, uint16 reclaimRate_) external;
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

### split

Splits the specified amount of the position into a new position

```solidity
function split(uint256 positionId_, uint256 amount_, address to_, bool wrap_)
    external
    returns (uint256 newPositionId);
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
|`newPositionId`|`uint256`|  The ID of the newly created position|

### getAvailableDeposits

Get the available deposit balance for a specific token.
This excludes any committed funds.

```solidity
function getAvailableDeposits(IERC20 depositToken_) external view returns (uint256 balance);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|The deposit token to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|    The available deposit balance|

### getCommittedDeposits

Get the committed deposits for a specific token.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for all operators to use.

```solidity
function getCommittedDeposits(IERC20 depositToken_) external view returns (uint256 committed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`committed`|`uint256`|      The total committed deposits|

### getCommittedDeposits

Get the committed deposits for a specific token and operator.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for the specific operator to use.

```solidity
function getCommittedDeposits(IERC20 depositToken_, address operator_) external view returns (uint256 committed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositToken_`|`IERC20`|   The deposit token to query|
|`operator_`|`address`|       The operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`committed`|`uint256`|      The committed deposits for the operator|

## Events

### OperatorAuthorized

```solidity
event OperatorAuthorized(address indexed operator);
```

### OperatorDeauthorized

```solidity
event OperatorDeauthorized(address indexed operator);
```

### AssetCommitted

```solidity
event AssetCommitted(address indexed asset, address indexed operator, uint256 amount);
```

### AssetCommitCancelled

```solidity
event AssetCommitCancelled(address indexed asset, address indexed operator, uint256 amount);
```

### AssetCommitWithdrawn

```solidity
event AssetCommitWithdrawn(address indexed asset, address indexed operator, uint256 amount);
```

### Reclaimed

```solidity
event Reclaimed(
    address indexed user,
    address indexed depositToken,
    uint8 depositPeriod,
    uint256 reclaimedAmount,
    uint256 forfeitedAmount
);
```

### AssetPeriodReclaimRateSet

```solidity
event AssetPeriodReclaimRateSet(address indexed asset, uint8 depositPeriod, uint16 reclaimRate);
```

## Errors

### DepositFacility_ZeroAmount

```solidity
error DepositFacility_ZeroAmount();
```

### DepositFacility_InvalidAddress

```solidity
error DepositFacility_InvalidAddress(address operator);
```

### DepositFacility_UnauthorizedOperator

```solidity
error DepositFacility_UnauthorizedOperator(address operator);
```

### DepositFacility_InsufficientDeposits

```solidity
error DepositFacility_InsufficientDeposits(uint256 requested, uint256 available);
```

### DepositFacility_InsufficientCommitment

```solidity
error DepositFacility_InsufficientCommitment(address operator, uint256 requested, uint256 available);
```
