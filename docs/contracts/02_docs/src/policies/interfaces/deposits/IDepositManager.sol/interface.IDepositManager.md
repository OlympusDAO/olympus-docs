# IDepositManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/policies/interfaces/deposits/IDepositManager.sol)

**Inherits:**
[IAssetManager](/main/contracts/docs/src/bases/interfaces/IAssetManager.sol/interface.IAssetManager)

**Title:**
Deposit Manager

Defines an interface for a policy that manages deposits on behalf of other contracts. It is meant to be used by the facilities, and is not an end-user policy.
Key terms for the contract:

- Asset: an ERC20 asset that can be deposited into the contract
- Asset vault: an optional ERC4626 vault that assets are deposited into
- Asset period: the combination of an asset and deposit period

## Functions

### borrowingWithdraw

Borrows funds from deposits

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Validating borrowing limits and capacity
- Transferring the underlying asset from the contract to the recipient
- Updating borrowing state
- Checking solvency

```solidity
function borrowingWithdraw(BorrowingWithdrawParams calldata params_) external returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`BorrowingWithdrawParams`|        The parameters for the borrowing withdrawal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The quantity of underlying assets transferred to the recipient|

### borrowingRepay

Repays borrowed funds

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Transferring the underlying asset from the payer to the contract
- Updating borrowing state
- Checking solvency

```solidity
function borrowingRepay(BorrowingRepayParams calldata params_) external returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`BorrowingRepayParams`|        The parameters for the borrowing repayment|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The quantity of underlying assets received from the payer|

### borrowingDefault

Defaults on a borrowed amount

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Burning the receipt tokens from the payer for the default amount
- Updating borrowing state
- Updating liabilities

```solidity
function borrowingDefault(BorrowingDefaultParams calldata params_) external;
```

### getBorrowedAmount

Gets the current borrowed amount for an operator

```solidity
function getBorrowedAmount(IERC20 asset_, address operator_) external view returns (uint256 borrowed);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`borrowed`|`uint256`|       The current borrowed amount for the operator|

### getBorrowingCapacity

Gets the available borrowing capacity for an operator

```solidity
function getBorrowingCapacity(IERC20 asset_, address operator_) external view returns (uint256 capacity);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`capacity`|`uint256`|       The available borrowing capacity for the operator|

### deposit

Deposits the given amount of the underlying asset in exchange for a receipt token

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Transferring the underlying asset from the depositor to the contract
- Minting the receipt token to the depositor
- Updating the amount of deposited funds

```solidity
function deposit(DepositParams calldata params_) external returns (uint256 receiptTokenId, uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`DepositParams`|        The parameters for the deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenId`|`uint256`| The ID of the receipt token|
|`actualAmount`|`uint256`|   The quantity of receipt tokens minted to the depositor|

### maxClaimYield

Returns the maximum yield that can be claimed for an asset and operator pair

```solidity
function maxClaimYield(IERC20 asset_, address operator_) external view returns (uint256 yieldAssets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|       The address of the underlying asset|
|`operator_`|`address`|    The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yieldAssets`|`uint256`|  The amount of yield that can be claimed|

### claimYield

Claims the yield from the underlying asset
This does not burn receipt tokens, but should reduce the amount of shares the caller has in the vault.

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Transferring the underlying asset from the contract to the recipient
- Updating the amount of deposited funds
- Checking solvency

```solidity
function claimYield(IERC20 asset_, address recipient_, uint256 amount_) external returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|       The address of the underlying asset|
|`recipient_`|`address`|   The recipient of the claimed yield|
|`amount_`|`uint256`|      The amount to claim yield for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`| The quantity of underlying assets transferred to the recipient|

### withdraw

Withdraws the given amount of the underlying asset

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Burning the receipt token
- Transferring the underlying asset from the contract to the recipient
- Updating the amount of deposited funds

```solidity
function withdraw(WithdrawParams calldata params_) external returns (uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`WithdrawParams`|        The parameters for the withdrawal|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The quantity of underlying assets transferred to the recipient|

### getOperatorLiabilities

Returns the liabilities for an asset and operator pair

```solidity
function getOperatorLiabilities(IERC20 asset_, address operator_) external view returns (uint256 liabilities);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`liabilities`|`uint256`|    The quantity of assets that the contract is custodying for the operator's depositors|

### setOperatorName

Sets the name of an operator. This is included in the name and symbol of receipt tokens.

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Setting the operator name
- Emitting an event

```solidity
function setOperatorName(address operator_, string calldata name_) external;
```

### getOperatorName

Returns the name of an operator

```solidity
function getOperatorName(address operator_) external view returns (string memory name);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`name`|`string`|       The name of the operator or an empty string|

### addAsset

Adds a new asset

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Configuring the asset
- Emitting an event

```solidity
function addAsset(IERC20 asset_, IERC4626 vault_, uint256 depositCap_, uint256 minimumDeposit_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`vault_`|`IERC4626`|         The address of the ERC4626 vault to deposit the asset into (or the zero address)|
|`depositCap_`|`uint256`|    The deposit cap of the asset|
|`minimumDeposit_`|`uint256`|The minimum deposit amount for the asset|

### setAssetDepositCap

Sets the deposit cap for an asset

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Setting the deposit cap for the asset
- Emitting an event

```solidity
function setAssetDepositCap(IERC20 asset_, uint256 depositCap_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositCap_`|`uint256`|    The deposit cap to set for the asset|

### setAssetMinimumDeposit

Sets the minimum deposit for an asset

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Setting the minimum deposit for the asset
- Emitting an event

```solidity
function setAssetMinimumDeposit(IERC20 asset_, uint256 minimumDeposit_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|          The address of the underlying asset|
|`minimumDeposit_`|`uint256`| The minimum deposit to set for the asset|

### addAssetPeriod

Adds a new asset period

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Creating a new receipt token
- Emitting an event

```solidity
function addAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    returns (uint256 receiptTokenId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenId`|`uint256`| The ID of the new receipt token|

### disableAssetPeriod

Disables an asset period, which prevents new deposits

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Disabling the asset period
- Emitting an event

```solidity
function disableAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

### enableAssetPeriod

Enables an asset period, which allows new deposits

The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Enabling the asset period
- Emitting an event

```solidity
function enableAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

### getAssetPeriod

Returns the asset period for an asset, period and operator

```solidity
function getAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    view
    returns (AssetPeriod memory configuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`AssetPeriod`|  The asset period|

### getAssetPeriod

Returns the asset period from a receipt token ID

```solidity
function getAssetPeriod(uint256 tokenId_) external view returns (AssetPeriod memory configuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`AssetPeriod`|  The asset period|

### isAssetPeriod

Returns whether a deposit asset, period and operator combination are configured

A asset period that is disabled will not accept further deposits

```solidity
function isAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    view
    returns (AssetPeriodStatus memory status);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`status`|`AssetPeriodStatus`|         The status of the asset period|

### getAssetPeriods

Gets all configured asset periods

```solidity
function getAssetPeriods() external view returns (AssetPeriod[] memory assetPeriods);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assetPeriods`|`AssetPeriod[]`|   Array of configured asset periods|

### getReceiptTokenId

Returns the ID of the receipt token for an asset period and operator

The ID returned is not a guarantee that the asset period is configured or enabled. [isAssetPeriod](/main/contracts/docs/src/policies/interfaces/deposits/IDepositManager.sol/interface.IDepositManager#isassetperiod) should be used for that purpose.

```solidity
function getReceiptTokenId(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    view
    returns (uint256 receiptTokenId);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenId`|`uint256`| The ID of the receipt token|

### getReceiptToken

Convenience function that returns both receipt token ID and wrapped token address

```solidity
function getReceiptToken(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    view
    returns (uint256 tokenId, address wrappedToken);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The asset contract|
|`depositPeriod_`|`uint8`| The deposit period in months|
|`operator_`|`address`|      The operator address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenId`|`uint256`|        The receipt token ID|
|`wrappedToken`|`address`|   The address of the wrapped ERC20 token (0x0 if not created yet)|

### getReceiptTokenManager

Gets the receipt token manager

```solidity
function getReceiptTokenManager() external view returns (IReceiptTokenManager manager);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`manager`|`IReceiptTokenManager`|The receipt token manager contract|

### getReceiptTokenIds

Gets all receipt token IDs owned by this contract

```solidity
function getReceiptTokenIds() external view returns (uint256[] memory tokenIds);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`tokenIds`|`uint256[]`|Array of receipt token IDs|

## Events

### OperatorYieldClaimed

```solidity
event OperatorYieldClaimed(
    address indexed asset, address indexed depositor, address indexed operator, uint256 amount
);
```

### OperatorNameSet

```solidity
event OperatorNameSet(address indexed operator, string name);
```

### AssetPeriodConfigured

```solidity
event AssetPeriodConfigured(
    uint256 indexed receiptTokenId, address indexed asset, address indexed operator, uint8 depositPeriod
);
```

### AssetPeriodEnabled

```solidity
event AssetPeriodEnabled(
    uint256 indexed receiptTokenId, address indexed asset, address indexed operator, uint8 depositPeriod
);
```

### AssetPeriodDisabled

```solidity
event AssetPeriodDisabled(
    uint256 indexed receiptTokenId, address indexed asset, address indexed operator, uint8 depositPeriod
);
```

### TokenRescued

```solidity
event TokenRescued(address indexed token, uint256 amount);
```

### BorrowingWithdrawal

```solidity
event BorrowingWithdrawal(
    address indexed asset, address indexed operator, address indexed recipient, uint256 amount
);
```

### BorrowingRepayment

```solidity
event BorrowingRepayment(address indexed asset, address indexed operator, address indexed payer, uint256 amount);
```

### BorrowingDefault

```solidity
event BorrowingDefault(address indexed asset, address indexed operator, address indexed payer, uint256 amount);
```

## Errors

### DepositManager_InvalidParams

```solidity
error DepositManager_InvalidParams(string reason);
```

### DepositManager_Insolvent

Error if the action would leave the contract insolvent (liabilities > assets + borrowed)

```solidity
error DepositManager_Insolvent(
    address asset, uint256 requiredAssets, uint256 depositedSharesInAssets, uint256 borrowedAmount
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|                   The address of the underlying asset|
|`requiredAssets`|`uint256`|          The quantity of asset liabilities|
|`depositedSharesInAssets`|`uint256`| The quantity of assets that the deposited shares represent|
|`borrowedAmount`|`uint256`|          The quantity of assets that are currently borrowed|

### DepositManager_ZeroAddress

```solidity
error DepositManager_ZeroAddress();
```

### DepositManager_OutOfBounds

```solidity
error DepositManager_OutOfBounds();
```

### DepositManager_CannotRescueAsset

```solidity
error DepositManager_CannotRescueAsset(address token);
```

### DepositManager_OperatorNameNotSet

```solidity
error DepositManager_OperatorNameNotSet(address operator);
```

### DepositManager_OperatorNameSet

```solidity
error DepositManager_OperatorNameSet(address operator);
```

### DepositManager_OperatorNameInvalid

```solidity
error DepositManager_OperatorNameInvalid();
```

### DepositManager_OperatorNameInUse

```solidity
error DepositManager_OperatorNameInUse(string name);
```

### DepositManager_InvalidAssetPeriod

```solidity
error DepositManager_InvalidAssetPeriod(address asset, uint8 depositPeriod, address operator);
```

### DepositManager_AssetPeriodExists

```solidity
error DepositManager_AssetPeriodExists(address asset, uint8 depositPeriod, address operator);
```

### DepositManager_AssetPeriodEnabled

```solidity
error DepositManager_AssetPeriodEnabled(address asset, uint8 depositPeriod, address operator);
```

### DepositManager_AssetPeriodDisabled

```solidity
error DepositManager_AssetPeriodDisabled(address asset, uint8 depositPeriod, address operator);
```

### DepositManager_BorrowingLimitExceeded

```solidity
error DepositManager_BorrowingLimitExceeded(address asset, address operator, uint256 requested, uint256 available);
```

### DepositManager_BorrowedAmountExceeded

```solidity
error DepositManager_BorrowedAmountExceeded(address asset, address operator, uint256 amount, uint256 borrowed);
```

## Structs

### DepositParams

Parameters for the [deposit](/main/contracts/docs/src/policies/interfaces/deposits/IDepositManager.sol/interface.IDepositManager#deposit) function

```solidity
struct DepositParams {
    IERC20 asset;
    uint8 depositPeriod;
    address depositor;
    uint256 amount;
    bool shouldWrap;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|          The underlying ERC20 asset|
|`depositPeriod`|`uint8`|  The deposit period, in months|
|`depositor`|`address`|      The depositor|
|`amount`|`uint256`|         The amount to deposit|
|`shouldWrap`|`bool`|     Whether the receipt token should be wrapped|

### WithdrawParams

Parameters for the [withdraw](/main/contracts/docs/src/policies/interfaces/deposits/IDepositManager.sol/interface.IDepositManager#withdraw) function

```solidity
struct WithdrawParams {
    IERC20 asset;
    uint8 depositPeriod;
    address depositor;
    address recipient;
    uint256 amount;
    bool isWrapped;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|           The underlying ERC20 asset|
|`depositPeriod`|`uint8`|   The deposit period, in months|
|`depositor`|`address`|       The depositor that is holding the receipt tokens|
|`recipient`|`address`|       The recipient of the withdrawn asset|
|`amount`|`uint256`|          The amount to withdraw|
|`isWrapped`|`bool`|       Whether the receipt token is wrapped|

### AssetPeriod

An asset period configuration, representing an asset and period combination

```solidity
struct AssetPeriod {
    bool isEnabled;
    uint8 depositPeriod;
    address asset;
    address operator;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`isEnabled`|`bool`|      Whether the asset period is enabled for new deposits|
|`depositPeriod`|`uint8`|  The deposit period, in months|
|`asset`|`address`|          The underlying ERC20 asset|
|`operator`|`address`|       The operator that can issue this receipt token|

### AssetPeriodStatus

Status of an asset period

```solidity
struct AssetPeriodStatus {
    bool isConfigured;
    bool isEnabled;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`isConfigured`|`bool`|   Whether the asset period is configured|
|`isEnabled`|`bool`|      Whether the asset period is enabled for new deposits|

### BorrowingWithdrawParams

Parameters for borrowing withdrawal operations

```solidity
struct BorrowingWithdrawParams {
    IERC20 asset;
    address recipient;
    uint256 amount;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|          The underlying ERC20 asset|
|`recipient`|`address`|      The recipient of the borrowed funds|
|`amount`|`uint256`|         The amount to borrow|

### BorrowingRepayParams

Parameters for borrowing repayment operations

```solidity
struct BorrowingRepayParams {
    IERC20 asset;
    address payer;
    uint256 amount;
    uint256 maxAmount;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|       The underlying ERC20 asset|
|`payer`|`address`|       The address making the repayment|
|`amount`|`uint256`|      The amount of principal to repay|
|`maxAmount`|`uint256`|   The maximum amount that can be repaid|

### BorrowingDefaultParams

Parameters for borrowing default operations

```solidity
struct BorrowingDefaultParams {
    IERC20 asset;
    uint8 depositPeriod;
    address payer;
    uint256 amount;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|          The underlying ERC20 asset|
|`depositPeriod`|`uint8`|  The deposit period, in months|
|`payer`|`address`|          The address making the default|
|`amount`|`uint256`|         The amount to default|
