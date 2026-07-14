# PRICEv2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/PRICE.v2.sol)

**Inherits:**
[ModuleWithSubmodules](/main/contracts/docs/src/Submodules.sol/abstract.ModuleWithSubmodules), [IPRICEv2](/main/contracts/docs/src/modules/PRICE/IPRICE.v2.sol/interface.IPRICEv2), IERC165

**Author:**
Oighty

SPDX-License-Identifier: AGPL-3.0
forge-lint: disable-start(mixed-case-function)

Abstract Bophades module for price resolution

## State Variables

### \_UNIT_OF_ACCOUNT

```solidity
address internal constant _UNIT_OF_ACCOUNT = address(840)
```

### \_observationFrequency

The frequency of price observations (in seconds)

```solidity
uint48 internal _observationFrequency
```

### \_decimals

The number of decimals to used in output values

```solidity
uint8 internal _decimals
```

### assets

The addresses of tracked assets

```solidity
address[] public assets
```

### \_assetData

Maps asset addresses to configuration data

```solidity
mapping(address => Asset) internal _assetData
```

### isNonContractAsset

Tracks registered non-contract assets

```solidity
mapping(address => bool) public isNonContractAsset
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

### observationFrequency

The frequency of price observations (in seconds)

```solidity
function observationFrequency() external view virtual override returns (uint48);
```

### decimals

The number of decimals to used in output values

```solidity
function decimals() external view virtual override returns (uint8);
```

### unitOfAccount

The reserved unit-of-account key

```solidity
function unitOfAccount() external pure virtual override returns (address);
```

### \_validateAssetIsManageable

Reverts unless `asset_` is a contract or a registered non-contract asset

Will revert if:

- `asset_` is a non-contract address that is not registered

```solidity
function _validateAssetIsManageable(address asset_) internal view;
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual returns (bool);
```
