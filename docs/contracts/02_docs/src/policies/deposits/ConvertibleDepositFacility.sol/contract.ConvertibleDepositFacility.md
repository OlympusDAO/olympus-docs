# ConvertibleDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/deposits/ConvertibleDepositFacility.sol)

**Inherits:**
[BaseDepositFacility](/main/contracts/docs/src/policies/deposits/BaseDepositFacility.sol/abstract.BaseDepositFacility), [IConvertibleDepositFacility](/main/contracts/docs/src/policies/interfaces/deposits/IConvertibleDepositFacility.sol/interface.IConvertibleDepositFacility), [IPeriodicTask](/main/contracts/docs/src/interfaces/IPeriodicTask.sol/interface.IPeriodicTask)

Implementation of the {IConvertibleDepositFacility} interface
It is a general-purpose contract that can be used to create, mint, convert, redeem, and reclaim receipt tokens

## State Variables

### ROLE_AUCTIONEER

```solidity
bytes32 public constant ROLE_AUCTIONEER = "cd_auctioneer";
```

### MINTR

The MINTR module.

```solidity
MINTRv1 public MINTR;
```

### _OHM_SCALE

```solidity
uint256 internal constant _OHM_SCALE = 1e9;
```

## Functions

### constructor

```solidity
constructor(address kernel_, address depositManager_) BaseDepositFacility(kernel_, depositManager_);
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

### createPosition

Creates a convertible deposit position

*This function reverts if:

- The caller does not have the ROLE_AUCTIONEER role
- The contract is not enabled
- The asset and period are not supported*

```solidity
function createPosition(CreatePositionParams calldata params_)
    external
    onlyRole(ROLE_AUCTIONEER)
    nonReentrant
    onlyEnabled
    returns (uint256 positionId, uint256 receiptTokenId, uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`CreatePositionParams`|            The parameters for the position creation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`positionId`|`uint256`|         The ID of the new position|
|`receiptTokenId`|`uint256`||
|`actualAmount`|`uint256`||

### deposit

Deposits the given amount of the underlying asset in exchange for a receipt token. This function can be used to mint additional receipt tokens on a 1:1 basis, without creating a new position.

```solidity
function deposit(IERC20 asset_, uint8 periodMonths_, uint256 amount_, bool wrapReceipt_)
    external
    nonReentrant
    onlyEnabled
    returns (uint256 receiptTokenId, uint256 actualAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|             The address of the asset|
|`periodMonths_`|`uint8`|      The period of the deposit|
|`amount_`|`uint256`|            The amount of asset to deposit|
|`wrapReceipt_`|`bool`|       Whether the receipt token should be wrapped|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenId`|`uint256`|     The ID of the receipt token|
|`actualAmount`|`uint256`|       The quantity of receipt tokens minted to the depositor|

### _previewConvert

Determines the conversion output

```solidity
function _previewConvert(
    address depositor_,
    uint256 positionId_,
    uint256 amount_,
    address previousAsset_,
    uint8 previousPeriodMonths_
) internal view returns (uint256 convertedTokenOut, address currentAsset, uint8 currentPeriodMonths);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositor_`|`address`|           The depositor of the position|
|`positionId_`|`uint256`|          The ID of the position|
|`amount_`|`uint256`|              The amount of receipt tokens to convert|
|`previousAsset_`|`address`|       Used to validate that the asset is the same across positions (zero if the first position)|
|`previousPeriodMonths_`|`uint8`|Used to validate that the period is the same across positions (0 if the first position)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`convertedTokenOut`|`uint256`|    The amount of converted tokens|
|`currentAsset`|`address`|         The asset of the current position|
|`currentPeriodMonths`|`uint8`|  The period of the current position|

### previewConvert

Preview the amount of receipt tokens and OHM that would be converted

*This function reverts if:

- The contract is not enabled
- The length of the positionIds_array does not match the length of the amounts_ array
- depositor_ is not the owner of all of the positions
- Any position is not valid
- Any position is not a supported asset
- Any position has a different asset or deposit period
- Any position has reached the conversion expiry
- Any conversion amount is greater than the remaining deposit
- The amount of deposits to convert is 0
- The converted amount is 0*

```solidity
function previewConvert(address depositor_, uint256[] memory positionIds_, uint256[] memory amounts_)
    external
    view
    onlyEnabled
    returns (uint256 receiptTokenIn, uint256 convertedTokenOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`depositor_`|`address`||
|`positionIds_`|`uint256[]`|       An array of position ids that will be converted|
|`amounts_`|`uint256[]`|           An array of amounts of receipt tokens to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenIn`|`uint256`|     The total amount of receipt tokens converted|
|`convertedTokenOut`|`uint256`|  The amount of OHM minted during conversion|

### convert

Converts receipt tokens to OHM before conversion expiry

*This function reverts if:

- The contract is not enabled
- No positions are provided
- The length of the positionIds_array does not match the length of the amounts_ array
- The caller is not the owner of all of the positions
- Any position is not valid
- Any position is not a supported asset
- Any position has a different asset or deposit period
- Any position has reached the conversion expiry
- Any position has a conversion amount greater than the remaining deposit
- The amount of deposits to convert is 0
- The converted amount is 0*

```solidity
function convert(uint256[] memory positionIds_, uint256[] memory amounts_, bool wrappedReceipt_)
    external
    nonReentrant
    onlyEnabled
    returns (uint256 receiptTokenIn, uint256 convertedTokenOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIds_`|`uint256[]`|       An array of position ids that will be converted|
|`amounts_`|`uint256[]`|           An array of amounts of receipt tokens to convert|
|`wrappedReceipt_`|`bool`|    Whether the receipt tokens to use are wrapped as ERC20s|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenIn`|`uint256`|     The total amount of receipt tokens converted|
|`convertedTokenOut`|`uint256`|  The amount of OHM minted during conversion|

### previewClaimYield

Preview the amount of yield that would be claimed for the given asset

*This returns the value from DepositManager.maxClaimYield(), which is a theoretical value.*

```solidity
function previewClaimYield(IERC20 asset_) public view returns (uint256 yieldAssets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yieldAssets`|`uint256`|assets          The amount of assets that would be claimed|

### claimYield

Claim the yield accrued for the given asset

```solidity
function claimYield(IERC20 asset_) public returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|assets          The amount of assets that were claimed|

### claimYield

Claim the yield accrued for the given asset

*This function mainly serves as a backup for claiming protocol yield, in case the max yield cannot be claimed.*

```solidity
function claimYield(IERC20 asset_, uint256 amount_) public returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|
|`amount_`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|assets          The amount of assets that were claimed|

### claimAllYield

Claim the yield accrued for all assets and deposit periods

```solidity
function claimAllYield() external;
```

### convertedToken

The address of the token that is converted to by the facility

```solidity
function convertedToken() external view returns (address);
```

### execute

Executes the periodic task

*Guidelines for implementing functions:*

```solidity
function execute() external onlyRole(HEART_ROLE);
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(BaseDepositFacility, IPeriodicTask)
    returns (bool);
```
