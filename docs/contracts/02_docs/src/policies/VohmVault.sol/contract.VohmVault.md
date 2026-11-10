# VohmVault

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/VohmVault.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

Policy to mint and burn VOTES to arbitrary addresses

## Constants

### VESTING_PERIOD

```solidity
uint256 public constant VESTING_PERIOD = 1 hours;
```

## State Variables

### gOHM

```solidity
ERC20 public gOHM;
```

### VOTES

```solidity
VOTESv1 public VOTES;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="onlyvested"></a>

### onlyVested

```solidity
modifier onlyVested();
```

<a id="deposit-uint256"></a>

### deposit

```solidity
function deposit(uint256 assets_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets_ | `uint256` |  |

<a id="mint-uint256"></a>

### mint

```solidity
function mint(uint256 shares_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares_ | `uint256` |  |

<a id="withdraw-uint256"></a>

### withdraw

```solidity
function withdraw(uint256 assets_) public onlyVested;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets_ | `uint256` |  |

<a id="redeem-uint256"></a>

### redeem

```solidity
function redeem(uint256 shares_) public onlyVested;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares_ | `uint256` |  |
