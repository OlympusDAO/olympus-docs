# BaseAssetManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/bases/BaseAssetManager.sol)

**Inherits:**
[IAssetManager](/main/contracts/docs/src/bases/interfaces/IAssetManager.sol/interface.IAssetManager)

**Title:**
BaseAssetManager

This is a base contract for managing asset deposits and withdrawals. It is designed to be inherited by another contract.
This contract supports multiple assets, and can store them idle or in an ERC4626 vault (specified at the time of configuration). Once an approach is specified, it cannot be changed. This is to avoid the threat of a governance attack that shifts the deposited funds to a different vault in order to steal them.
Future versions of the contract could add support for more complex strategies and/or strategy migration, while addressing the concern of funds theft.

## State Variables

### _configuredAssets

Array of configured assets

```solidity
IERC20[] internal _configuredAssets
```

### _assetConfigurations

Mapping of assets to a configuration

```solidity
mapping(IERC20 asset => AssetConfiguration) internal _assetConfigurations
```

### _operatorShares

Mapping of assets and operators to the number of shares they have deposited

```solidity
mapping(bytes32 operatorKey => uint256 shares) internal _operatorShares
```

## Functions

### _depositAsset

Deposit assets into the configured vault

This function will pull the assets from the depositor and deposit them into the vault. If the vault is the zero address, the assets will be kept idle.
To avoid susceptibility to ERC777 re-entrancy, this function should be called before any state changes.
When an ERC4626 vault is configured for an asset, the amount of assets that can be withdrawn may be 1 less than what was originally deposited. To be conservative, this function returns the actual amount.
This function will revert if:

- The vault is not approved
- It is unable to pull the assets from the depositor
- The minimum deposit requirement is not met
- Adding the deposit would exceed the deposit cap
- Zero shares would be received from the vault

```solidity
function _depositAsset(IERC20 asset_, address depositor_, uint256 amount_, bool enforceDepositChecks_)
    internal
    onlyConfiguredAsset(asset_)
    returns (uint256 actualAmount, uint256 shares);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|                 The asset to deposit|
|`depositor_`|`address`|             The depositor|
|`amount_`|`uint256`|                The amount of assets to deposit|
|`enforceDepositChecks_`|`bool`|  Whether to enforce the minimum deposit requirement and deposit cap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`actualAmount`|`uint256`|   The actual amount of assets redeemable by the shares|
|`shares`|`uint256`|         The number of shares received|

### _withdrawAsset

Withdraw assets from the configured vault

This function will withdraw the assets from the vault and send them to the depositor. If the vault is the zero address, the assets will be kept idle.
This function will revert if:

- The vault is not approved

```solidity
function _withdrawAsset(IERC20 asset_, address depositor_, uint256 amount_)
    internal
    onlyConfiguredAsset(asset_)
    returns (uint256 shares, uint256 assetAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|     The asset to withdraw|
|`depositor_`|`address`| The depositor|
|`amount_`|`uint256`|    The amount of assets to withdraw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|     The number of shares withdrawn (can be 0)|
|`assetAmount`|`uint256`|The amount of assets withdrawn (can be 0)|

### getOperatorAssets

Get the number of assets deposited for an asset and operator

```solidity
function getOperatorAssets(IERC20 asset_, address operator_)
    public
    view
    override
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

### _getOperatorKey

Get the key for the operator shares

```solidity
function _getOperatorKey(IERC20 asset_, address operator_) internal pure returns (bytes32);
```

### _addAsset

Configure an asset to be deposited into a vault

This function will configure an asset to be deposited into a vault. If the vault is the zero address, the assets will be kept idle.
Note that the asset can only be configured once. This is to prevent the assets from being moved between vaults and exposing the deposited assets to the risk of theft.
This function will revert if:

- The asset is already configured
- The vault asset does not match the asset
- The minimum deposit exceeds the deposit cap

```solidity
function _addAsset(IERC20 asset_, IERC4626 vault_, uint256 depositCap_, uint256 minimumDeposit_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The asset to configure|
|`vault_`|`IERC4626`|         The vault to use|
|`depositCap_`|`uint256`|    The deposit cap of the asset|
|`minimumDeposit_`|`uint256`|The minimum deposit amount for the asset|

### _setAssetDepositCap

Set the deposit cap for an asset

This function will set the deposit cap for an asset.
This function will revert if:

- The asset is not configured
- The deposit cap is less than the minimum deposit

```solidity
function _setAssetDepositCap(IERC20 asset_, uint256 depositCap_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|         The asset to set the deposit cap for|
|`depositCap_`|`uint256`|    The deposit cap to set for the asset|

### _setAssetMinimumDeposit

Set the minimum deposit for an asset

This function will set the minimum deposit for an asset.
The minimum deposit prevents insolvency issues that can occur when small deposits
accrue large amounts of yield. When claiming yield on such deposits, all vault shares
may be burned while liabilities remain, causing the DepositManager_Insolvent error
and blocking subsequent yield claims.
This function will revert if:

- The asset is not configured
- The minimum deposit exceeds the deposit cap

```solidity
function _setAssetMinimumDeposit(IERC20 asset_, uint256 minimumDeposit_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|          The asset to set the minimum deposit for|
|`minimumDeposit_`|`uint256`| The minimum deposit to set for the asset|

### _isConfiguredAsset

```solidity
function _isConfiguredAsset(IERC20 asset_) internal view returns (bool);
```

### _onlyConfiguredAsset

```solidity
function _onlyConfiguredAsset(IERC20 asset_) internal view;
```

### onlyConfiguredAsset

```solidity
modifier onlyConfiguredAsset(IERC20 asset_) ;
```

### getAssetConfiguration

Get the configuration for an asset

```solidity
function getAssetConfiguration(IERC20 asset_)
    public
    view
    override
    returns (AssetConfiguration memory configuration);
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
function getConfiguredAssets() public view override returns (IERC20[] memory assets);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`IERC20[]`| The assets that are configured|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool);
```
