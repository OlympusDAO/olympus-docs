# Policy

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/Kernel.sol)

**Inherits:**
[KernelAdapter](/main/contracts/docs/src/Kernel.sol/abstract.KernelAdapter)

Policies are application logic and external interface for the kernel and installed modules.

*Policies are activated and deactivated in the kernel by the executor.*

*Module dependencies and function permissions must be defined in appropriate functions.*

## Functions

### constructor

```solidity
constructor(Kernel kernel_) KernelAdapter(kernel_);
```

### isActive

Easily accessible indicator for if a policy is activated or not.

```solidity
function isActive() external view returns (bool);
```

### getModuleAddress

Function to grab module address from a given keycode.

```solidity
function getModuleAddress(Keycode keycode_) internal view returns (address);
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external virtual returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view virtual returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

## Errors

### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_);
```

### Policy_WrongModuleVersion

```solidity
error Policy_WrongModuleVersion(bytes expected_);
```
