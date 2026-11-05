# PRICEv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/PRICE.v2.sol)

**Inherits:** [ModuleWithSubmodules](/main/contracts/docs/src/Submodules.sol/abstract.ModuleWithSubmodules), [IPRICEv2](/main/contracts/docs/src/modules/PRICE/IPRICE.v2.sol/interface.IPRICEv2), IERC165

**Author:** Oighty

Abstract Bophades module for price resolution

## Constants

### _UNIT_OF_ACCOUNT

```solidity
address internal constant _UNIT_OF_ACCOUNT = address(840);
```

## State Variables

### _observationFrequency

The frequency of price observations (in seconds)

```solidity
uint48 internal _observationFrequency;
```

### _decimals

The number of decimals to used in output values

```solidity
uint8 internal _decimals;
```

### assets

The addresses of tracked assets

```solidity
address[] public assets;
```

### _assetData

Maps asset addresses to configuration data

```solidity
mapping(address => Asset) internal _assetData;
```

### isNonContractAsset

Tracks registered non-contract assets

```solidity
mapping(address => bool) public isNonContractAsset;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="observationfrequency"></a>

### observationFrequency

The frequency of price observations (in seconds)

```solidity
function observationFrequency() external view virtual override returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="decimals"></a>

### decimals

The number of decimals to used in output values

```solidity
function decimals() external view virtual override returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

<a id="unitofaccount"></a>

### unitOfAccount

The reserved unit-of-account key

```solidity
function unitOfAccount() external pure virtual override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="_validateassetismanageable-address"></a>

### _validateAssetIsManageable

Reverts unless `asset_` is a contract or a registered non-contract asset

<i>

Will revert if:

- `asset_` is a non-contract address that is not registered

</i>

```solidity
function _validateAssetIsManageable(address asset_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | `address` |  |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
