# BaseDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/deposits/BaseDepositFacility.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IDepositFacility](/main/contracts/docs/src/policies/interfaces/deposits/IDepositFacility.sol/interface.IDepositFacility), ReentrancyGuard

**Title:** Base Deposit Facility

Abstract base contract for deposit facilities with shared functionality

## Constants

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

## State Variables

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
mapping(bytes32 assetOperatorKey => uint256 committedDeposits)
        private _assetOperatorCommittedDeposits;
```

### TRSRY

The TRSRY module

<i>

Must be populated by the inheriting contract in `configureDependencies()`

</i>

```solidity
TRSRYv1 public TRSRY;
```

### DEPOS

The DEPOS module.

<i>

Must be populated by the inheriting contract in `configureDependencies()`

</i>

```solidity
DEPOSv1 public DEPOS;
```

### _assetPeriodReclaimRates

Maps asset-period key to reclaim rate

<i>

The key is the keccak256 of the asset address and the deposit period

</i>

```solidity
mapping(bytes32 key => uint16 reclaimRate) private _assetPeriodReclaimRates;
```

## Functions

<a id="_onlyauthorizedoperator"></a>

### _onlyAuthorizedOperator

```solidity
function _onlyAuthorizedOperator() internal view;
```

<a id="onlyauthorizedoperator"></a>

### onlyAuthorizedOperator

Reverts if the caller is not an authorized operator

```solidity
modifier onlyAuthorizedOperator();
```

<a id="constructor-address-address"></a>

### constructor

```solidity
constructor(address kernel_, address depositManager_) Policy(Kernel(kernel_));
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` |  |
| depositManager_ | `address` |  |

<a id="authorizeoperator-address"></a>

### authorizeOperator

Authorize an operator (e.g., a redemption vault) to handle actions through this facility

```solidity
function authorizeOperator(address operator_) external onlyEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to authorize |

<a id="deauthorizeoperator-address"></a>

### deauthorizeOperator

Deauthorize an operator

```solidity
function deauthorizeOperator(address operator_) external onlyEnabled onlyEmergencyOrAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to deauthorize |

<a id="isauthorizedoperator-address"></a>

### isAuthorizedOperator

Check if an operator is authorized

```solidity
function isAuthorizedOperator(address operator_) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator_ | `address` | The address of the operator to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | True if the operator is authorized |

<a id="getoperators"></a>

### getOperators

Get the list of operators authorized to handle actions through this facility

```solidity
function getOperators() external view returns (address[] memory operators);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| operators | `address[]` | The list of operators |

<a id="_getcommitteddepositskey-ierc20-address"></a>

### _getCommittedDepositsKey

```solidity
function _getCommittedDepositsKey(
        IERC20 depositToken_,
        address operator_
    ) internal pure returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` |  |
| operator_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

<a id="_getassetperiodkey-ierc20-uint8"></a>

### _getAssetPeriodKey

Helper function to generate the key for asset period reclaim rates

```solidity
function _getAssetPeriodKey(
        IERC20 asset_,
        uint8 depositPeriod_
    ) internal pure returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `IERC20` | The asset address |
| depositPeriod_ | `uint8` | The deposit period in months |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The keccak256 hash of the asset and deposit period |

<a id="handlecommit-ierc20-uint8-uint256"></a>

### handleCommit

Allows an operator to commit funds. This will ensure that enough funds are available to honour the commitments.

<i>

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The deposit token or period are not supported for this facility in the DepositManager
- There are not enough available deposits in the DepositManager

</i>

```solidity
function handleCommit(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator;
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

<i>

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator

</i>

```solidity
function handleCommitCancel(
        IERC20 depositToken_,
        uint8,
        uint256 amount_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token committed |
| _ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to reduce the commitment by |

<a id="handlecommitwithdraw-ierc20-uint8-uint256-address"></a>

### handleCommitWithdraw

Allows an operator to withdraw committed funds. This will withdraw deposit tokens to the recipient.

<i>

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator

</i>

```solidity
function handleCommitWithdraw(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address recipient_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to withdraw |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to withdraw |
| recipient_ | `address` | The address to receive the deposit tokens |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of tokens transferred |

<a id="handleborrow-ierc20-uint8-uint256-address"></a>

### handleBorrow

Allows an operator to borrow against this facility's committed funds.

<i>

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator
- The amount is greater than the committed deposits for the operator
- The amount withdrawn from the vault would be zero

</i>

```solidity
function handleBorrow(
        IERC20 depositToken_,
        uint8,
        uint256 amount_,
        address recipient_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to borrow against |
| _ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount to borrow |
| recipient_ | `address` | The address to receive the borrowed tokens |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of tokens borrowed |

<a id="handleloanrepay-ierc20-uint8-uint256-uint256-address"></a>

### handleLoanRepay

<i>

This function performs the following:

- Updates the committed deposits

</i>

Notes:

- This function is only callable by authorized operators
- This function does not check for over-payment. It is expected to be handled by the calling contract.

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator

```solidity
function handleLoanRepay(
        IERC20 depositToken_,
        uint8,
        uint256 amount_,
        uint256 maxAmount_,
        address payer_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token being repaid |
| _ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount of principal being repaid |
| maxAmount_ | `uint256` | The maximum amount of principal that can be repaid |
| payer_ | `address` | The address making the repayment |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of tokens repaid |

<a id="handleloandefault-ierc20-uint8-uint256-address"></a>

### handleLoanDefault

Allows an operator to default on a loan

<i>

This function will revert if:

- This contract is not enabled
- The caller is not an authorized operator

</i>

```solidity
function handleLoanDefault(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_,
        address payer_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token being defaulted |
| depositPeriod_ | `uint8` | The deposit period in months |
| amount_ | `uint256` | The amount being defaulted |
| payer_ | `address` | The address making the default |

<a id="handlepositionredemption-uint256-uint256"></a>

### handlePositionRedemption

Allows an operator to handle position-based redemptions by updating the position's remainingDeposit

```solidity
function handlePositionRedemption(
        uint256 positionId_,
        uint256 amount_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator;
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
function handlePositionCancelRedemption(
        uint256 positionId_,
        uint256 amount_
    ) external nonReentrant onlyEnabled onlyAuthorizedOperator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The position ID to update |
| amount_ | `uint256` | The redemption amount to be cancelled |

<a id="getavailabledeposits-ierc20"></a>

### getAvailableDeposits

Get the available deposit balance for a specific token.
This excludes any committed funds.

```solidity
function getAvailableDeposits(IERC20 depositToken_) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The available deposit balance |

<a id="getcommitteddeposits-ierc20-address"></a>

### getCommittedDeposits

Get the committed deposits for a specific token and operator.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for the specific operator to use.

<i>

The amount is calculated as:

- The amount of deposits that have been committed (via `handleCommit()`) for the deposit token and operator
- Minus: the amount of loan principal currently outstanding for the operator

</i>

```solidity
function getCommittedDeposits(
        IERC20 depositToken_,
        address operator_
    ) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |
| operator_ | `address` | The operator |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The committed deposits for the operator |

<a id="getcommitteddeposits-ierc20"></a>

### getCommittedDeposits

Get the committed deposits for a specific token.
The committed deposits value represents the amount of the deposit token
that this contract ensures will be available for all operators to use.

<i>

The amount returned is calculated as:

- The amount of deposits that have been committed (via `handleCommit()`) for the deposit token
- Minus: the amount of loan principal currently outstanding

</i>

```solidity
function getCommittedDeposits(IERC20 depositToken_) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The deposit token to query |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The total committed deposits |

<a id="_validateavailabledeposits-ierc20-uint256"></a>

### _validateAvailableDeposits

```solidity
function _validateAvailableDeposits(IERC20 depositToken_, uint256 amount_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` |  |
| amount_ | `uint256` |  |

<a id="_previewreclaim-ierc20-uint8-uint256"></a>

### _previewReclaim

```solidity
function _previewReclaim(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) internal view returns (uint256 reclaimed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` |  |
| depositPeriod_ | `uint8` |  |
| amount_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reclaimed | `uint256` |  |

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
    ) public view onlyEnabled returns (uint256 reclaimed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The address of the deposit token |
| depositPeriod_ | `uint8` | The period of the deposit in months |
| amount_ | `uint256` | The amount of deposit tokens to reclaim |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reclaimed | `uint256` | The amount of deposit token returned to the caller |

<a id="reclaim-ierc20-uint8-uint256"></a>

### reclaim

Reclaims deposit tokens, after applying a discount
Deposit tokens can be reclaimed at any time.
The caller is not required to have a position in the facility.

<i>

This function reverts if:

- The contract is not active
- Deposits are not enabled for the asset/period
- The depositor has not approved the DepositManager to spend the receipt token
- The depositor has an insufficient balance of the receipt token

</i>

```solidity
function reclaim(
        IERC20 depositToken_,
        uint8 depositPeriod_,
        uint256 amount_
    ) external nonReentrant onlyEnabled returns (uint256 reclaimed);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| depositToken_ | `IERC20` | The address of the deposit token |
| depositPeriod_ | `uint8` | The period of the deposit in months |
| amount_ | `uint256` | The amount of deposit tokens to reclaim |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reclaimed | `uint256` | The amount of deposit token returned to the caller |

<a id="split-uint256-uint256-address-bool"></a>

### split

Splits the specified amount of the position into a new position

<i>

This function reverts if:

- The position does not exist
- The position was not created by this facility
- The caller is not the owner of the position

</i>

```solidity
function split(
        uint256 positionId_,
        uint256 amount_,
        address to_,
        bool wrap_
    ) external nonReentrant onlyEnabled returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| positionId_ | `uint256` | The ID of the position to split |
| amount_ | `uint256` | The amount to split from the position |
| to_ | `address` | The address to receive the new position |
| wrap_ | `bool` | Whether to wrap the new position |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The ID of the newly created position |

<a id="_split-uint256-uint256"></a>

### _split

Internal function to handle the splitting of a position

<i>

Inheriting contracts can implement this function to perform custom actions when a position is split. This function is called before the position is split in the underlying DEPOS module.

</i>

```solidity
function _split(uint256 oldPositionId_, uint256 amount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| oldPositionId_ | `uint256` |  |
| amount_ | `uint256` |  |

<a id="setassetperiodreclaimrate-ierc20-uint8-uint16"></a>

### setAssetPeriodReclaimRate

Sets the reclaim rate for an asset period

<i>

This function reverts if:

- The contract is not enabled
- The caller does not have the manager or admin role
- The reclaim rate exceeds 100%

</i>

```solidity
function setAssetPeriodReclaimRate(
        IERC20 asset_,
        uint8 depositPeriod_,
        uint16 reclaimRate_
    ) external onlyEnabled onlyManagerOrAdminRole;
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

| Name | Type | Description |
| ---- | ---- | ----------- |
| reclaimRate | `uint16` |   The reclaim rate for the asset period |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
