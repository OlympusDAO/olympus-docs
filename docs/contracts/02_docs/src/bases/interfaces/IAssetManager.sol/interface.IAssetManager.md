# IAssetManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/bases/interfaces/IAssetManager.sol)

This interface defines the functions for custodying assets.
A depositor can deposit assets into a vault, and withdraw them later.
An operator is the contract that acts on behalf of the depositor. Only operators can interact with the contract. The deposits facilitated by an operator are siloed from other operators.

## Functions

### getOperatorAssets

Get the number of assets deposited for an asset and operator

```solidity
function getOperatorAssets(IERC20 asset_, address operator_)
    external
    view
    returns (uint256 shares, uint256 sharesInAssets);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The asset to get the deposited shares for|
|`operator_`|`address`|      The operator to get the deposited shares for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|         The number of shares deposited|
|`sharesInAssets`|`uint256`| The number of shares deposited (in terms of assets)|

### getAssetConfiguration

Get the configuration for an asset

```solidity
function getAssetConfiguration(IERC20 asset_) external view returns (AssetConfiguration memory configuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The asset to get the configuration for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`configuration`|`AssetConfiguration`|  The configuration for the asset|

### getConfiguredAssets

Get the assets that are configured

```solidity
function getConfiguredAssets() external view returns (IERC20[] memory assets);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`IERC20[]`| The assets that are configured|

## Events

### AssetConfigured

```solidity
event AssetConfigured(address indexed asset, address indexed vault);
```

### AssetDepositCapSet

Emitted when an asset's deposit cap is updated

```solidity
event AssetDepositCapSet(address indexed asset, uint256 depositCap);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|     The ERC20 asset|
|`depositCap`|`uint256`|The new deposit cap amount (in asset units)|

### AssetMinimumDepositSet

Emitted when an asset's minimum single-deposit amount is updated

```solidity
event AssetMinimumDepositSet(address indexed asset, uint256 minimumDeposit);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|          The ERC20 asset|
|`minimumDeposit`|`uint256`| The new minimum deposit amount (in asset units)|

### AssetDeposited

```solidity
event AssetDeposited(
    address indexed asset, address indexed depositor, address indexed operator, uint256 amount, uint256 shares
);
```

### AssetWithdrawn

```solidity
event AssetWithdrawn(
    address indexed asset, address indexed withdrawer, address indexed operator, uint256 amount, uint256 shares
);
```

## Errors

### AssetManager_NotConfigured

```solidity
error AssetManager_NotConfigured();
```

### AssetManager_InvalidAsset

```solidity
error AssetManager_InvalidAsset();
```

### AssetManager_AssetAlreadyConfigured

```solidity
error AssetManager_AssetAlreadyConfigured();
```

### AssetManager_VaultAssetMismatch

```solidity
error AssetManager_VaultAssetMismatch();
```

### AssetManager_ZeroAmount

```solidity
error AssetManager_ZeroAmount();
```

### AssetManager_DepositCapExceeded

```solidity
error AssetManager_DepositCapExceeded(address asset, uint256 existingDepositAmount, uint256 depositCap);
```

### AssetManager_MinimumDepositNotMet

```solidity
error AssetManager_MinimumDepositNotMet(address asset, uint256 depositAmount, uint256 minimumDeposit);
```

### AssetManager_MinimumDepositExceedsDepositCap

```solidity
error AssetManager_MinimumDepositExceedsDepositCap(address asset, uint256 minimumDeposit, uint256 depositCap);
```

## Structs

### AssetConfiguration

Configuration for an asset

```solidity
struct AssetConfiguration {
    bool isConfigured;
    uint256 depositCap;
    uint256 minimumDeposit;
    address vault;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`isConfigured`|`bool`|  Whether the asset is configured|
|`depositCap`|`uint256`|    The maximum amount of assets that can be deposited. Set to 0 to disable deposits.|
|`minimumDeposit`|`uint256`|The minimum amount of assets that can be deposited in a single transaction (set to 0 to disable the check)|
|`vault`|`address`|         The ERC4626 vault that the asset is deposited into|
