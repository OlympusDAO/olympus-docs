# IDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/deposits/IDepositFacility.sol)

**Title:** IDepositFacility

Interface for deposit facilities to coordinate with generic operators (e.g., redemption vaults)

## Functions

<a id="authorizeoperator-address"></a>

### authorizeOperator

Authorize an operator (e.g., a redemption vault) to handle actions through this facility

```solidity
function authorizeOperator(address operator_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to authorize |

<a id="deauthorizeoperator-address"></a>

### deauthorizeOperator

Deauthorize an operator

```solidity
function deauthorizeOperator(address operator_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to deauthorize |

<a id="isauthorizedoperator-address"></a>

### isAuthorizedOperator

Check if an operator is authorized

```solidity
function isAuthorizedOperator(address operator_) external view returns (bool isAuthorized);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to check |

**Returns**

| Name         | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| isAuthorized | `bool` | True if the operator is authorized |

<a id="getoperators"></a>

### getOperators

Get the list of operators authorized to handle actions through this facility

```solidity
function getOperators() external view returns (address[] memory operators);
```

**Returns**

| Name      | Type        | Description           |
| --------- | ----------- | --------------------- |
| operators | `address[]` | The list of operators |

<a id="handlecommit-ierc20-uint8-uint256"></a>

### handleCommit

Allows an operator to commit funds. This will ensure that enough funds are available to honour the commitments.

```solidity
function handleCommit(IERC20 depositToken_, uint8 depositPeriod_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token committed |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to commit |

<a id="handlecommitcancel-ierc20-uint8-uint256"></a>

### handleCommitCancel

Allows an operator to cancel committed funds.

```solidity
function handleCommitCancel(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token committed |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to reduce the commitment by |

<a id="handlecommitwithdraw-ierc20-uint8-uint256-address"></a>

### handleCommitWithdraw

Allows an operator to withdraw committed funds. This will withdraw deposit tokens to the recipient.

```solidity
function handleCommitWithdraw(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address recipient_
    ) external returns (uint256 actualAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to withdraw |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to withdraw |
| recipient_ | `address` | The address to receive the deposit tokens |

**Returns**

| Name         | Type      | Description                      |
| ------------ | --------- | -------------------------------- |
| actualAmount | `uint256` | The amount of tokens transferred |

<a id="handlepositionredemption-uint256-uint256"></a>

### handlePositionRedemption

Allows an operator to handle position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionRedemption(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The position ID to update |
| amount_ | `uint256` | The amount being redeemed from the position |

<a id="handlepositioncancelredemption-uint256-uint256"></a>

### handlePositionCancelRedemption

Allows an operator to handle the cancellation of position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionCancelRedemption(uint256 positionId_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The position ID to update |
| amount_ | `uint256` | The redemption amount to be cancelled |

<a id="handleborrow-ierc20-uint8-uint256-address"></a>

### handleBorrow

Allows an operator to borrow against this facility's committed funds.

```solidity
function handleBorrow(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address recipient_
    ) external returns (uint256 actualAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to borrow against |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to borrow |
| recipient_ | `address` | The address to receive the borrowed tokens |

**Returns**

| Name         | Type      | Description                   |
| ------------ | --------- | ----------------------------- |
| actualAmount | `uint256` | The amount of tokens borrowed |

<a id="handleloanrepay-ierc20-uint8-uint256-uint256-address"></a>

### handleLoanRepay

Allows an operator to repay borrowed funds

```solidity
function handleLoanRepay(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        uint256 maxAmount_,
        address payer_
    ) external returns (uint256 actualAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token being repaid |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount of principal being repaid |
| maxAmount_ | `uint256` | The maximum amount of principal that can be repaid |
| payer_ | `address` | The address making the repayment |

**Returns**

| Name         | Type      | Description                 |
| ------------ | --------- | --------------------------- |
| actualAmount | `uint256` | The amount of tokens repaid |

<a id="handleloandefault-ierc20-uint8-uint256-address"></a>

### handleLoanDefault

Allows an operator to default on a loan

```solidity
function handleLoanDefault(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address payer_
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token being defaulted |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount being defaulted |
| payer_ | `address` | The address making the default |

<a id="previewreclaim-ierc20-uint8-uint256"></a>

### previewReclaim

Preview the amount of deposit token that would be reclaimed

<i>

The implementing contract is expected to handle the following:

- Returning the total amount of deposit tokens that would be reclaimed

</i>

```solidity
function previewReclaim(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) external view returns (uint256 reclaimed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The address of the deposit token |
| depositPeriod_ | `uint8` | The period of the deposit in months |
| amount_ | `uint256` | The amount of deposit tokens to reclaim |

**Returns**

| Name      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| reclaimed | `uint256` | The amount of deposit token returned to the caller |

<a id="reclaim-ierc20-uint8-uint256"></a>

### reclaim

Reclaims deposit tokens, after applying a discount
Deposit tokens can be reclaimed at any time.
The caller is not required to have a position in the facility.

<i>

The implementing contract is expected to handle the following:

- Burning the receipt tokens
- Transferring the deposit token to `recipient_`
- Emitting an event

</i>

```solidity
function reclaim(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) external returns (uint256 reclaimed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The address of the deposit token |
| depositPeriod_ | `uint8` | The period of the deposit in months |
| amount_ | `uint256` | The amount of deposit tokens to reclaim |

**Returns**

| Name      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| reclaimed | `uint256` | The amount of deposit token returned to the caller |

<a id="setassetperiodreclaimrate-ierc20-uint8-uint16"></a>

### setAssetPeriodReclaimRate

Sets the reclaim rate for an asset period

```solidity
function setAssetPeriodReclaimRate(
        IERC20 asset_,
        uint8 depositPeriod_,
        uint16 reclaimRate_
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the underlying asset |
| depositPeriod_ | `uint8` | The deposit period, in months |
| reclaimRate_ | `uint16` | The reclaim rate to set (in basis points, where 100e2 = 100%) |

<a id="getassetperiodreclaimrate-ierc20-uint8"></a>

### getAssetPeriodReclaimRate

Returns the reclaim rate for an asset period

```solidity
function getAssetPeriodReclaimRate(
        IERC20 asset_,
        uint8 depositPeriod_
    ) external view returns (uint16 reclaimRate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The address of the underlying asset |
| depositPeriod_ | `uint8` | The deposit period, in months |

**Returns**

| Name        | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| reclaimRate | `uint16` | The reclaim rate for the asset period |

<a id="split-uint256-uint256-address-bool"></a>

### split

Splits the specified amount of the position into a new position

```solidity
function split(
        uint256 positionId_,
        uint256 amount_,
        address to_,
        bool wrap_
    ) external returns (uint256 newPositionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to split |
| amount_ | `uint256` | The amount to split from the position |
| to_ | `address` | The address to receive the new position |
| wrap_ | `bool` | Whether to wrap the new position |

**Returns**

| Name          | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| newPositionId | `uint256` | The ID of the newly created position |

<a id="getavailabledeposits-ierc20"></a>

### getAvailableDeposits

Get the available deposit balance for a specific token.
This excludes any committed funds.

```solidity
function getAvailableDeposits(IERC20 depositToken_) external view returns (uint256 balance);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |

**Returns**

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| balance | `uint256` | The available deposit balance |

<a id="getcommitteddeposits-ierc20"></a>

### getCommittedDeposits

Get the committed deposits for a specific token.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for all operators to use.

```solidity
function getCommittedDeposits(IERC20 depositToken_) external view returns (uint256 committed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |

**Returns**

| Name      | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| committed | `uint256` | The total committed deposits |

<a id="getcommitteddeposits-ierc20-address"></a>

### getCommittedDeposits

Get the committed deposits for a specific token and operator.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for the specific operator to use.

```solidity
function getCommittedDeposits(
        IERC20 depositToken_,
        address operator_
    ) external view returns (uint256 committed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |
| operator_ | `address` | The operator |

**Returns**

| Name      | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| committed | `uint256` | The committed deposits for the operator |

## Events

### OperatorAuthorized

```solidity
event OperatorAuthorized(address indexed operator);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| operator | `address` |             |

### OperatorDeauthorized

```solidity
event OperatorDeauthorized(address indexed operator);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| operator | `address` |             |

### AssetCommitted

```solidity
event AssetCommitted(address indexed asset, address indexed operator, uint256 amount);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| operator | `address` |             |
| amount   | `uint256` |             |

### AssetCommitCancelled

```solidity
event AssetCommitCancelled(address indexed asset, address indexed operator, uint256 amount);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| operator | `address` |             |
| amount   | `uint256` |             |

### AssetCommitWithdrawn

```solidity
event AssetCommitWithdrawn(address indexed asset, address indexed operator, uint256 amount);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| asset    | `address` |             |
| operator | `address` |             |
| amount   | `uint256` |             |

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

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| user            | `address` |             |
| depositToken    | `address` |             |
| depositPeriod   | `uint8`   |             |
| reclaimedAmount | `uint256` |             |
| forfeitedAmount | `uint256` |             |

### AssetPeriodReclaimRateSet

```solidity
event AssetPeriodReclaimRateSet(address indexed asset, uint8 depositPeriod, uint16 reclaimRate);
```

**Parameters**

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| asset         | `address` |             |
| depositPeriod | `uint8`   |             |
| reclaimRate   | `uint16`  |             |

## Errors

### DepositFacility_ZeroAmount

```solidity
error DepositFacility_ZeroAmount();
```

### DepositFacility_InvalidAddress

```solidity
error DepositFacility_InvalidAddress(address operator);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| operator | `address` |             |

### DepositFacility_UnauthorizedOperator

```solidity
error DepositFacility_UnauthorizedOperator(address operator);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| operator | `address` |             |

### DepositFacility_InsufficientDeposits

```solidity
error DepositFacility_InsufficientDeposits(uint256 requested, uint256 available);
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| requested | `uint256` |             |
| available | `uint256` |             |

### DepositFacility_InsufficientCommitment

```solidity
error DepositFacility_InsufficientCommitment(
        address operator,
        uint256 requested,
        uint256 available
    );
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| operator  | `address` |             |
| requested | `uint256` |             |
| available | `uint256` |             |

### DepositFacility_InvalidReclaimRate

```solidity
error DepositFacility_InvalidReclaimRate(uint16 reclaimRate, uint16 maxReclaimRate);
```

**Parameters**

| Name           | Type     | Description |
| -------------- | -------- | ----------- |
| reclaimRate    | `uint16` |             |
| maxReclaimRate | `uint16` |             |
