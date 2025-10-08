# VohmVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/VohmVault.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

Policy to mint and burn VOTES to arbitrary addresses

## State Variables

### gOHM

```solidity
ERC20 public gOHM;
```

### VESTING_PERIOD

```solidity
uint256 public constant VESTING_PERIOD = 1 hours;
```

### VOTES

```solidity
VOTESv1 public VOTES;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
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

### onlyVested

```solidity
modifier onlyVested();
```

### deposit

```solidity
function deposit(uint256 assets_) public;
```

### mint

```solidity
function mint(uint256 shares_) public;
```

### withdraw

```solidity
function withdraw(uint256 assets_) public onlyVested;
```

### redeem

```solidity
function redeem(uint256 shares_) public onlyVested;
```
