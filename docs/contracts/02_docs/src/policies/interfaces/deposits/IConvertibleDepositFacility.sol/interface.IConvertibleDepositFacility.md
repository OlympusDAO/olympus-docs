# IConvertibleDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/interfaces/deposits/IConvertibleDepositFacility.sol)

**Title:**
IConvertibleDepositFacility

Interface for a contract that can perform functions related to convertible deposit (CD) tokens

## Functions

### createPosition

Creates a convertible deposit position

The implementing contract is expected to handle the following:

- Validating that the asset is supported
- Validating that the caller has the correct role
- Depositing the asset
- Minting the receipt token
- Creating a new position in the DEPOS module
- Emitting an event

```solidity
function createPosition(CreatePositionParams calldata params_)
    external
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

### convert

Converts receipt tokens to OHM before conversion expiry

The implementing contract is expected to handle the following:

- Validating that the caller is the owner of all of the positions
- Validating that the token in the position is a supported receipt token
- Validating that all of the positions are valid
- Validating that the conversion expiry for all of the positions has not passed
- Burning the receipt tokens
- Minting OHM to `account_`
- Transferring the deposit token to the treasury
- Emitting an event

```solidity
function convert(uint256[] memory positionIds_, uint256[] memory amounts_, bool wrappedReceipt_)
    external
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

### previewConvert

Preview the amount of receipt tokens and OHM that would be converted

The implementing contract is expected to handle the following:

- Validating that `account_` is the owner of all of the positions
- Validating that token in the position is a supported receipt token
- Validating that all of the positions are valid
- Validating that the conversion expiry for all of the positions has not passed
- Returning the total amount of receipt tokens and OHM that would be converted

```solidity
function previewConvert(address account_, uint256[] memory positionIds_, uint256[] memory amounts_)
    external
    view
    returns (uint256 receiptTokenIn, uint256 convertedTokenOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|           The address to preview the conversion for|
|`positionIds_`|`uint256[]`|       An array of position ids that will be converted|
|`amounts_`|`uint256[]`|           An array of amounts of receipt tokens to convert|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`receiptTokenIn`|`uint256`|     The total amount of receipt tokens converted|
|`convertedTokenOut`|`uint256`|  The amount of OHM minted during conversion|

### previewClaimYield

Preview the amount of yield that would be claimed for the given asset

```solidity
function previewClaimYield(IERC20 asset_) external view returns (uint256 assets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|         The amount of assets that would be claimed|

### claimYield

Claim the yield accrued for the given asset

```solidity
function claimYield(IERC20 asset_) external returns (uint256 assets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|         The amount of assets that were claimed|

### claimYield

Claim the yield accrued for the given asset

```solidity
function claimYield(IERC20 asset_, uint256 amount_) external returns (uint256 assets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The address of the asset|
|`amount_`|`uint256`|        The amount to claim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|         The amount of assets that were claimed|

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

## Events

### CreatedDeposit

```solidity
event CreatedDeposit(
    address indexed asset,
    address indexed depositor,
    uint256 indexed positionId,
    uint8 periodMonths,
    uint256 depositAmount
);
```

### ConvertedDeposit

```solidity
event ConvertedDeposit(
    address indexed asset,
    address indexed depositor,
    uint8 periodMonths,
    uint256 depositAmount,
    uint256 convertedAmount
);
```

### ClaimedYield

```solidity
event ClaimedYield(address indexed asset, uint256 amount);
```

### ClaimAllYieldFailed

```solidity
event ClaimAllYieldFailed();
```

## Errors

### CDF_InvalidArgs

```solidity
error CDF_InvalidArgs(string reason_);
```

### CDF_NotOwner

```solidity
error CDF_NotOwner(uint256 positionId_);
```

### CDF_PositionExpired

```solidity
error CDF_PositionExpired(uint256 positionId_);
```

### CDF_InvalidAmount

```solidity
error CDF_InvalidAmount(uint256 positionId_, uint256 amount_);
```

### CDF_InvalidToken

```solidity
error CDF_InvalidToken(uint256 positionId_, address token_, uint8 periodMonths_);
```

### CDF_Unsupported

```solidity
error CDF_Unsupported(uint256 positionId_);
```

## Structs

### CreatePositionParams

Parameters for the [createPosition](/main/contracts/docs/src/policies/interfaces/deposits/IConvertibleDepositFacility.sol/interface.IConvertibleDepositFacility#createposition) function

```solidity
struct CreatePositionParams {
    IERC20 asset;
    uint8 periodMonths;
    address depositor;
    uint256 amount;
    uint256 conversionPrice;
    bool wrapPosition;
    bool wrapReceipt;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|            The address of the asset|
|`periodMonths`|`uint8`|     The period of the deposit|
|`depositor`|`address`|        The address to create the position for|
|`amount`|`uint256`|           The amount of asset to deposit|
|`conversionPrice`|`uint256`|  The amount of asset tokens required to receive 1 OHM (scale: asset token decimals)|
|`wrapPosition`|`bool`|     Whether the position should be wrapped|
|`wrapReceipt`|`bool`|      Whether the receipt token should be wrapped|
