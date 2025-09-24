# YieldDepositFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/deposits/YieldDepositFacility.sol)

**Inherits:**
[BaseDepositFacility](/main/contracts/docs/src/policies/deposits/BaseDepositFacility.sol/abstract.BaseDepositFacility), [IYieldDepositFacility](/main/contracts/docs/src/policies/interfaces/deposits/IYieldDepositFacility.sol/interface.IYieldDepositFacility), [IPeriodicTask](/main/contracts/docs/src/interfaces/IPeriodicTask.sol/interface.IPeriodicTask)

*NOTE: this contract is NOT ready for deployment, as it has some major design issues.*

## State Variables

### _yieldFee

The yield fee

```solidity
uint16 internal _yieldFee;
```

### positionLastYieldClaimTimestamp

Mapping between a position id and the timestamp of the last yield claim

*This is used to calculate the yield since the last claim. The initial value should be set at the time of minting.*

```solidity
mapping(uint256 positionId => uint48 lastYieldClaimTimestamp) public positionLastYieldClaimTimestamp;
```

### vaultRateSnapshots

Mapping between vault address and timestamp to snapshot data

*This is used to store periodic snapshots of conversion rates for each vault*

```solidity
mapping(IERC4626 => mapping(uint48 => uint256)) public vaultRateSnapshots;
```

### vaultSnapshotTimestamps

Mapping between vault address and linked list of snapshot timestamps

*This is used to efficiently find the most recent snapshot before a given timestamp*

```solidity
mapping(IERC4626 => TimestampLinkedList.List) public vaultSnapshotTimestamps;
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

### onlyYieldBearingAsset

```solidity
modifier onlyYieldBearingAsset(IERC20 asset_, uint8 periodMonths_);
```

### createPosition

Creates a position for a yield-bearing deposit

*This function reverts if:

- The contract is not enabled
- The asset token is not supported*

```solidity
function createPosition(CreatePositionParams calldata params_)
    external
    nonReentrant
    onlyEnabled
    onlyYieldBearingAsset(params_.asset, params_.periodMonths)
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
    nonReentrant
    onlyEnabled
    onlyYieldBearingAsset(asset_, periodMonths_)
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

### _previewClaimYield

```solidity
function _previewClaimYield(address account_, uint256 positionId_, address previousAsset_, uint8 previousPeriodMonths_)
    internal
    view
    returns (uint256 yieldMinusFee, uint256 yieldFee, uint48 newClaimTimestamp);
```

### previewClaimYield

Preview the amount of yield that would be claimed for the given positions

*Yield is calculated in the following manner:*

*- If before or at expiry: it will get the current vault rate*

*- If after expiry: it will get the last vault rate before or equal to the expiry timestamp*

*- The current value is calculated as: share quantity at previous claim * vault rate*

*- The yield is calculated as: current value - original deposit*

**

*Notes:*

*- For asset vaults that are not monotonically increasing in value, the yield received by different depositors may differ based on the time of claim.*

*- Claiming yield multiple times during a deposit period will likely result in a lower yield than claiming once at/after expiry.*

*- The actual amount of yield that can be claimed via `claimYield()` can differ by a few wei, due to rounding behaviour in ERC4626 vaults.*

**

*This function will revert if:*

*- The contract is not enabled*

*- The asset in the positions is not supported*

*- `account_` is not the owner of all of the positions*

*- Any of the positions have a different asset and deposit period combination*

*- The position was not created by this contract*

*- The asset does not have a vault configured*

*- There is no snapshot for the asset at the last yield claim timestamp*

```solidity
function previewClaimYield(address account_, uint256[] memory positionIds_)
    external
    view
    onlyEnabled
    returns (uint256 yieldMinusFee, IERC20 asset);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account_`|`address`|       The address to preview the yield for|
|`positionIds_`|`uint256[]`|   An array of position ids that will be claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yieldMinusFee`|`uint256`|yield           The amount of yield that would be claimed|
|`asset`|`IERC20`|          The address of the asset that will be received|

### claimYield

Claims the yield for the given positions

*See also [previewClaimYield](/main/contracts/docs/src/policies/deposits/YieldDepositFacility.sol/contract.YieldDepositFacility#previewclaimyield) for more details on the yield calculation.*

```solidity
function claimYield(uint256[] memory positionIds_) external onlyEnabled returns (uint256 yieldMinusFee);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`positionIds_`|`uint256[]`|   An array of position ids that will be claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yieldMinusFee`|`uint256`|yield           The amount of yield that was claimed|

### setYieldFee

Sets the percentage of yield that will be taken as a fee

*This function reverts if:

- The contract is not enabled
- The caller is not an admin
- The yield fee is greater than 100e2*

```solidity
function setYieldFee(uint16 yieldFee_) external onlyEnabled onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFee_`|`uint16`|      The percentage of yield that will be taken as a fee, in terms of 100e2|

### getYieldFee

Returns the percentage of yield that will be taken as a fee

```solidity
function getYieldFee() external view returns (uint16);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|yieldFee The percentage of yield that will be taken as a fee, in terms of 100e2|

### _split

```solidity
function _split(uint256 oldPositionId_, uint256 newPositionId_, uint256) internal virtual override;
```

### _getConversionRate

Get the conversion rate between a vault and underlying asset

```solidity
function _getConversionRate(IERC4626 vault_) internal view returns (uint256);
```

### _findLastSnapshotBefore

Find the most recent snapshot timestamp at or before the target timestamp

```solidity
function _findLastSnapshotBefore(IERC4626 vault_, uint48 target_) internal view returns (uint48);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault_`|`IERC4626`|The vault to search snapshots for|
|`target_`|`uint48`|The target timestamp|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The most recent snapshot timestamp <= target_, or 0 if none found|

### _takeSnapshot

Take a snapshot of the vault conversion rate for an asset

```solidity
function _takeSnapshot(IERC20 asset_, uint48 timestamp_) internal returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The asset to take a snapshot for|
|`timestamp_`|`uint48`|The timestamp for the snapshot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The conversion rate that was stored, or 0 if no vault configured|

### execute

Stores periodic snapshots of the conversion rate for all supported vaults

*This function is called by the Heart contract periodically*

*Uses the current block timestamp for the snapshot*

*No cleanup is performed as snapshots are needed for active deposits*

```solidity
function execute() external override onlyRole(HEART_ROLE);
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
