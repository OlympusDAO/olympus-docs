# DepositManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/deposits/DepositManager.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IDepositManager](/main/contracts/docs/src/policies/interfaces/deposits/IDepositManager.sol/interface.IDepositManager), [BaseAssetManager](/main/contracts/docs/src/bases/BaseAssetManager.sol/abstract.BaseAssetManager)

**Title:**
Deposit Manager

forge-lint: disable-start(asm-keccak256, mixed-case-function)

This policy manages deposits and withdrawals for Olympus protocol contracts

Key Features:

- ERC6909 receipt tokens with optional ERC20 wrapping, using ReceiptTokenManager
- Operator isolation preventing cross-operator fund access
- Borrowing functionality
- Configurable reclaim rates for risk management

## State Variables

### ROLE_DEPOSIT_OPERATOR

The role that is allowed to deposit and withdraw funds

```solidity
bytes32 public constant ROLE_DEPOSIT_OPERATOR = "deposit_operator"
```

### _RECEIPT_TOKEN_MANAGER

The receipt token manager for creating receipt tokens

```solidity
ReceiptTokenManager internal immutable _RECEIPT_TOKEN_MANAGER
```

### _assetLiabilities

Maps asset liabilities key to the number of receipt tokens that have been minted

This is used to ensure that the receipt tokens are solvent
As with the BaseAssetManager, deposited asset tokens with different deposit periods are co-mingled.

```solidity
mapping(bytes32 key => uint256 receiptTokenSupply) internal _assetLiabilities
```

### _assetPeriods

Maps token ID to the asset period

```solidity
mapping(uint256 tokenId => AssetPeriod) internal _assetPeriods
```

### _ownedTokenIds

Set of token IDs that this DepositManager owns

```solidity
EnumerableSet.UintSet internal _ownedTokenIds
```

### ONE_HUNDRED_PERCENT

Constant equivalent to 100%

```solidity
uint16 public constant ONE_HUNDRED_PERCENT = 100e2
```

### _operatorToName

Maps operator address to its name

```solidity
mapping(address operator => bytes3 name) internal _operatorToName
```

### _operatorNames

A set of operator names

This contains unique values

```solidity
mapping(bytes3 name => bool isRegistered) internal _operatorNames
```

### _borrowedAmounts

Maps asset-operator key to current borrowed amounts

The key is the keccak256 of the asset address and the operator address

```solidity
mapping(bytes32 key => uint256 borrowedAmount) internal _borrowedAmounts
```

## Functions

### _onlyAssetPeriodExists

```solidity
function _onlyAssetPeriodExists(IERC20 asset_, uint8 depositPeriod_, address operator_) internal view;
```

### onlyAssetPeriodExists

Reverts if the asset period is not configured

```solidity
modifier onlyAssetPeriodExists(IERC20 asset_, uint8 depositPeriod_, address operator_) ;
```

### _onlyAssetPeriodEnabled

```solidity
function _onlyAssetPeriodEnabled(IERC20 asset_, uint8 depositPeriod_, address operator_) internal view;
```

### onlyAssetPeriodEnabled

Reverts if the asset period is not enabled

```solidity
modifier onlyAssetPeriodEnabled(IERC20 asset_, uint8 depositPeriod_, address operator_) ;
```

### constructor

```solidity
constructor(address kernel_, address tokenManager_) Policy(Kernel(kernel_));
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
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

### deposit

Deposits the given amount of the underlying asset in exchange for a receipt token

This function is only callable by addresses with the deposit operator role
The actions of the calling deposit operator are restricted to its own namespace, preventing the operator from accessing funds of other operators.
This function reverts if:

- The contract is not enabled
- The caller does not have the deposit operator role
- The asset/deposit period/operator combination is not enabled
- The deposit amount is below the minimum deposit requirement
- The deposit would exceed the asset's deposit cap for the operator
- The depositor has not approved the DepositManager to spend the asset tokens
- The depositor has insufficient asset token balance
- The asset is a fee-on-transfer token
- Zero shares would be received from the vault

```solidity
function deposit(DepositParams calldata params_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR)
    onlyAssetPeriodEnabled(params_.asset, params_.depositPeriod, msg.sender)
    returns (uint256 receiptTokenId, uint256 actualAmount);
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

The actions of the calling deposit operator are restricted to its own namespace, preventing the operator from accessing funds of other operators.
Note that the returned value is a theoretical maximum. The theoretical value may not be accurate or possible due to rounding and other behaviours in an ERC4626 vault.

```solidity
function maxClaimYield(IERC20 asset_, address operator_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|       The address of the underlying asset|
|`operator_`|`address`|    The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|yieldAssets   The amount of yield that can be claimed|

### claimYield

Claims the yield from the underlying asset
This does not burn receipt tokens, but should reduce the amount of shares the caller has in the vault.

Notes:

- This function is only callable by addresses with the deposit operator role
- The actions of the calling deposit operator are restricted to its own namespace, preventing the operator from accessing funds of other operators.
- Given a low enough amount, the actual amount withdrawn may be 0. This function will not revert in such a case.
This function reverts if:
- The contract is not enabled
- The caller does not have the deposit operator role
- The asset is not configured in BaseAssetManager
- The operator becomes insolvent after the withdrawal (assets + borrowed < liabilities)

```solidity
function claimYield(IERC20 asset_, address recipient_, uint256 amount_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR)
    onlyConfiguredAsset(asset_)
    returns (uint256 actualAmount);
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

Notes:

- This function is only callable by addresses with the deposit operator role
- The actions of the calling deposit operator are restricted to its own namespace, preventing the operator from accessing funds of other operators.
- Given a low enough amount, the actual amount withdrawn may be 0. This function will not revert in such a case.
This function will revert if:
- The contract is not enabled
- The caller does not have the deposit operator role
- The recipient is the zero address
- The asset/deposit period/operator combination is not configured
- The depositor has insufficient receipt token balance
- For wrapped tokens: depositor has not approved ReceiptTokenManager to spend the wrapped ERC20 token
- For unwrapped tokens: depositor has not approved the caller to spend ERC6909 tokens
- The operator becomes insolvent after the withdrawal (assets + borrowed < liabilities)

```solidity
function withdraw(WithdrawParams calldata params_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR)
    returns (uint256 actualAmount);
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
function getOperatorLiabilities(IERC20 asset_, address operator_) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`operator_`|`address`|      The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|liabilities     The quantity of assets that the contract is custodying for the operator's depositors|

### _getAssetLiabilitiesKey

Get the key for the asset liabilities mapping

The key is the keccak256 of the asset address and the operator address

```solidity
function _getAssetLiabilitiesKey(IERC20 asset_, address operator_) internal pure returns (bytes32);
```

### _validateOperatorSolvency

Validates that an operator remains solvent after a withdrawal

This function ensures that operator assets + borrowed amount >= operator liabilities
This is the core solvency constraint for the DepositManager
Notes:

- The solvency checks assume that the value of each vault share is increasing, and will not reduce.
- In a situation where the assets per share reduces below 1 (at the appropriate decimal scale), the solvency check will fail.

```solidity
function _validateOperatorSolvency(IERC20 asset_, address operator_) internal view;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The asset to validate solvency for|
|`operator_`|`address`|The operator to validate solvency for|

### setOperatorName

Sets the name of an operator. This is included in the name and symbol of receipt tokens.

Note that once set, an operator name cannot be changed.
This function reverts if:

- The contract is not enabled
- The caller does not have the admin or manager role
- The operator's name is already set
- The name is already in use by another operator
- The operator name is empty
- The operator name is not exactly 3 characters long
- The operator name contains characters that are not a-z or 0-9

```solidity
function setOperatorName(address operator_, string calldata name_) external onlyEnabled onlyManagerOrAdminRole;
```

### getOperatorName

Returns the name of an operator

```solidity
function getOperatorName(address operator_) public view returns (string memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`operator_`|`address`|  The address of the operator|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|name        The name of the operator or an empty string|

### isAssetPeriod

Returns whether a deposit asset, period and operator combination are configured

A asset period that is disabled will not accept further deposits

```solidity
function isAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    public
    view
    override
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

### addAsset

Adds a new asset

This function reverts if:

- The contract is not enabled
- The caller does not have the admin or manager role
- asset_ is the zero address
- minimumDeposit_> depositCap_
Notes:
- A limitation of the current implementation is that the vault is assumed to be monotonically-increasing in value.
- The pairing of the asset and vault is immutable, to prevent a governance attack on user deposits.

```solidity
function addAsset(IERC20 asset_, IERC4626 vault_, uint256 depositCap_, uint256 minimumDeposit_)
    external
    onlyEnabled
    onlyManagerOrAdminRole;
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

This function reverts if:

- The contract is not enabled
- The caller does not have the admin or manager role
- asset_ is not configured
- The existing minimum deposit > depositCap_

```solidity
function setAssetDepositCap(IERC20 asset_, uint256 depositCap_) external onlyEnabled onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositCap_`|`uint256`|    The deposit cap to set for the asset|

### setAssetMinimumDeposit

Sets the minimum deposit for an asset

This function reverts if:

- The contract is not enabled
- The caller does not have the admin or manager role
- asset_ is not configured
- minimumDeposit_ > the existing deposit cap

```solidity
function setAssetMinimumDeposit(IERC20 asset_, uint256 minimumDeposit_)
    external
    onlyEnabled
    onlyManagerOrAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|          The address of the underlying asset|
|`minimumDeposit_`|`uint256`| The minimum deposit to set for the asset|

### addAssetPeriod

Adds a new asset period

This function is only callable by the manager or admin role
This function reverts if:

- The contract is not enabled
- The caller does not have the manager or admin role
- The asset has not been added via addAsset()
- The operator is the zero address
- The deposit period is 0
- The asset/deposit period/operator combination is already configured
- The operator name has not been set
- Receipt token creation fails (invalid parameters in ReceiptTokenManager)

```solidity
function addAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    onlyEnabled
    onlyManagerOrAdminRole
    onlyConfiguredAsset(asset_)
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

### enableAssetPeriod

Enables an asset period, which allows new deposits

This function is only callable by the manager or admin role
This function reverts if:

- The contract is not enabled
- The caller does not have the manager or admin role
- The asset/deposit period/operator combination does not exist
- The asset period is already enabled

```solidity
function enableAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    onlyEnabled
    onlyManagerOrAdminRole
    onlyAssetPeriodExists(asset_, depositPeriod_, operator_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

### disableAssetPeriod

Disables an asset period, which prevents new deposits

This function is only callable by the manager or admin role
This function reverts if:

- The contract is not enabled
- The caller does not have the manager or admin role
- The asset/deposit period/operator combination does not exist
- The asset period is already disabled

```solidity
function disableAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    onlyEnabled
    onlyManagerOrAdminRole
    onlyAssetPeriodExists(asset_, depositPeriod_, operator_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the underlying asset|
|`depositPeriod_`|`uint8`| The deposit period, in months|
|`operator_`|`address`|      The address of the operator|

### getAssetPeriods

Gets all configured asset periods

```solidity
function getAssetPeriods() external view override returns (AssetPeriod[] memory assetPeriods);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assetPeriods`|`AssetPeriod[]`|   Array of configured asset periods|

### getAssetPeriod

Returns the asset period from a receipt token ID

```solidity
function getAssetPeriod(uint256 tokenId_) public view override returns (AssetPeriod memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenId_`|`uint256`|       The ID of the receipt token|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`AssetPeriod`|configuration   The asset period|

### getAssetPeriod

Returns the asset period for an asset, period and operator

```solidity
function getAssetPeriod(IERC20 asset_, uint8 depositPeriod_, address operator_)
    public
    view
    override
    returns (AssetPeriod memory);
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
|`<none>`|`AssetPeriod`|configuration   The asset period|

### borrowingWithdraw

Borrows funds from deposits

Notes:

- This function is only callable by addresses with the deposit operator role
- Given a low enough amount, the actual amount withdrawn may be 0. This function will not revert in such a case.
This function reverts if:
- The contract is not enabled
- The caller does not have the deposit operator role
- The recipient is the zero address
- The asset has not been added via addAsset()
- The amount exceeds the operator's available borrowing capacity
- The operator becomes insolvent after the withdrawal (assets + borrowed < liabilities)

```solidity
function borrowingWithdraw(BorrowingWithdrawParams calldata params_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR)
    returns (uint256 actualAmount);
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

Notes:

- This function is only callable by addresses with the deposit operator role
- This function does not check for over-payment. It is expected to be handled by the calling contract.
- If the actual amount repaid is greater than the maximum amount provided, updates to the state variables are capped at the maximum amount.
This function reverts if:
- The contract is not enabled
- The caller does not have the deposit operator role
- The asset has not been added via addAsset()
- The payer has not approved DepositManager to spend the asset tokens
- The payer has insufficient asset token balance
- The asset is a fee-on-transfer token
- Zero shares would be deposited into the vault
- The operator becomes insolvent after the repayment (assets + borrowed < liabilities)

```solidity
function borrowingRepay(BorrowingRepayParams calldata params_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR)
    returns (uint256 actualAmount);
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

This function is only callable by addresses with the deposit operator role
This function reverts if:

- The contract is not enabled
- The caller does not have the deposit operator role
- The asset has not been added via addAsset()
- The amount exceeds the current borrowed amount for the operator
- The payer has insufficient receipt token balance
- The payer has not approved the caller to spend ERC6909 tokens
- The operator becomes insolvent after the default (assets + borrowed < liabilities)

```solidity
function borrowingDefault(BorrowingDefaultParams calldata params_)
    external
    onlyEnabled
    onlyRole(ROLE_DEPOSIT_OPERATOR);
```

### getBorrowedAmount

Gets the current borrowed amount for an operator

```solidity
function getBorrowedAmount(IERC20 asset_, address operator_) public view returns (uint256 borrowed);
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
function getBorrowingCapacity(IERC20 asset_, address operator_) public view returns (uint256 capacity);
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

### _setReceiptTokenData

```solidity
function _setReceiptTokenData(IERC20 asset_, uint8 depositPeriod_, address operator_)
    internal
    returns (uint256 tokenId);
```

### getReceiptTokenId

Returns the ID of the receipt token for an asset period and operator

The ID returned is not a guarantee that the asset period is configured or enabled. {isAssetPeriod} should be used for that purpose.

```solidity
function getReceiptTokenId(IERC20 asset_, uint8 depositPeriod_, address operator_)
    public
    view
    override
    returns (uint256);
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
|`<none>`|`uint256`|receiptTokenId  The ID of the receipt token|

### getReceiptTokenManager

Gets the receipt token manager

```solidity
function getReceiptTokenManager() external view override returns (IReceiptTokenManager);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IReceiptTokenManager`|manager The receipt token manager contract|

### getReceiptTokenIds

Gets all receipt token IDs owned by this contract

```solidity
function getReceiptTokenIds() external view override returns (uint256[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|tokenIds Array of receipt token IDs|

### getReceiptToken

Convenience function that returns both receipt token ID and wrapped token address

```solidity
function getReceiptToken(IERC20 asset_, uint8 depositPeriod_, address operator_)
    external
    view
    override
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

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(BaseAssetManager, PolicyEnabler)
    returns (bool);
```

### rescue

Rescue any ERC20 token sent to this contract and send it to the TRSRY

This function reverts if:

- The caller does not have the admin role
- token_ is a managed asset or vault
- token_ is the zero address

```solidity
function rescue(address token_) external onlyEnabled onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token_`|`address`|The address of the ERC20 token to rescue|
