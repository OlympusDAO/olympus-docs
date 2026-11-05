# Policy

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

**Inherits:** [KernelAdapter](/main/contracts/docs/src/Kernel.sol/abstract.KernelAdapter)

Policies are application logic and external interface for the kernel and installed modules.

<i>

Policies are activated and deactivated in the kernel by the executor.

</i>

<i>

Module dependencies and function permissions must be defined in appropriate functions.

</i>

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) KernelAdapter(kernel_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |

<a id="isactive"></a>

### isActive

Easily accessible indicator for if a policy is activated or not.

```solidity
function isActive() external view returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="getmoduleaddress-keycode"></a>

### getModuleAddress

Function to grab module address from a given keycode.

```solidity
function getModuleAddress(Keycode keycode_) internal view returns (address);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| keycode_ | `Keycode` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external virtual returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view virtual returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

## Errors

### Policy_ModuleDoesNotExist

```solidity
error Policy_ModuleDoesNotExist(Keycode keycode_);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| keycode_ | `Keycode` |             |

### Policy_WrongModuleVersion

```solidity
error Policy_WrongModuleVersion(bytes expected_);
```

**Parameters**

| Name      | Type    | Description |
| --------- | ------- | ----------- |
| expected_ | `bytes` |             |
