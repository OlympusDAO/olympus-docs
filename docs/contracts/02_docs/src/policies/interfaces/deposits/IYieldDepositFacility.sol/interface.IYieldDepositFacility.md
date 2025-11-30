# IYieldDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/deposits/IYieldDepositFacility.sol)

Interface for the Yield Facility that can be used to mint yield-bearing deposits

## Functions

### createPosition

Creates a position for a yield-bearing deposit

*The implementing contract is expected to handle the following:

- Validating that the asset is supported
- Depositing the asset into the deposit manager and minting the receipt token
- Creating a new position in the DEPOS module*

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
|`receiptTokenId`|`uint256`|     The ID of the receipt token|
|`actualAmount`|`uint256`|       The quantity of receipt tokens minted to the depositor|

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

### previewClaimYield

Preview the amount of yield that would be claimed for the given positions

*The implementing contract is expected to handle the following:

- Validating that `account_` is the owner of all of the positions
- Validating that token in the position is a supported receipt token
- Validating that all of the positions are valid
- Returning the total amount of yield that would be claimed*

```solidity
function previewClaimYield(address account_, uint256[] memory positionIds_)
    external
    view
    returns (uint256 yield, IERC20 asset);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|       The address to preview the yield for|
|`positionIds_`|`uint256[]`|   An array of position ids that will be claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yield`|`uint256`|          The amount of yield that would be claimed|
|`asset`|`IERC20`|          The address of the asset that will be received|

### claimYield

Claims the yield for the given positions

*The implementing contract is expected to handle the following:

- Validating that the caller is the owner of all of the positions
- Validating that token in the position is a supported receipt token
- Validating that all of the positions are valid
- Transferring the yield to the caller
- Emitting an event*

```solidity
function claimYield(uint256[] memory positionIds_) external returns (uint256 yield);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIds_`|`uint256[]`|   An array of position ids that will be claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yield`|`uint256`|          The amount of yield that was claimed|

### setYieldFee

Sets the percentage of yield that will be taken as a fee

*The implementing contract is expected to handle the following:

- Validating that the caller has the correct role
- Setting the yield fee*

```solidity
function setYieldFee(uint16 yieldFee_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFee_`|`uint16`|      The percentage of yield that will be taken as a fee, in terms of 100e2|

### getYieldFee

Returns the percentage of yield that will be taken as a fee

```solidity
function getYieldFee() external view returns (uint16 yieldFee);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yieldFee`|`uint16`|The percentage of yield that will be taken as a fee, in terms of 100e2|

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

### ClaimedYield

```solidity
event ClaimedYield(address indexed asset, address indexed depositor, uint256 yield);
```

### YieldFeeSet

```solidity
event YieldFeeSet(uint16 yieldFee);
```

### RateSnapshotTaken

```solidity
event RateSnapshotTaken(address indexed vault, uint48 timestamp, uint256 rate);
```

## Errors

### YDF_InvalidArgs

```solidity
error YDF_InvalidArgs(string reason_);
```

### YDF_NotOwner

```solidity
error YDF_NotOwner(uint256 positionId_);
```

### YDF_InvalidToken

```solidity
error YDF_InvalidToken(address token_, uint8 periodMonths_);
```

### YDF_Unsupported

```solidity
error YDF_Unsupported(uint256 positionId_);
```

### YDF_NoRateSnapshot

```solidity
error YDF_NoRateSnapshot(address vault_, uint48 timestamp_);
```

## Structs

### CreatePositionParams

Parameters for the [createPosition](/main/contracts/docs/src/policies/interfaces/deposits/IYieldDepositFacility.sol/interface.IYieldDepositFacility#createposition) function

```solidity
struct CreatePositionParams {
    IERC20 asset;
    uint8 periodMonths;
    uint256 amount;
    bool wrapPosition;
    bool wrapReceipt;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|            The address of the asset|
|`periodMonths`|`uint8`|     The period of the deposit|
|`amount`|`uint256`|           The amount of asset to deposit|
|`wrapPosition`|`bool`|     Whether the position should be wrapped|
|`wrapReceipt`|`bool`|      Whether the receipt token should be wrapped|
