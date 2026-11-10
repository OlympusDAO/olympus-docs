# Module

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

**Inherits:** [KernelAdapter](/main/contracts/docs/src/Kernel.sol/abstract.KernelAdapter)

Base level extension of the kernel. Modules act as independent state components to be
interacted with and mutated through policies.

<i>

Modules are installed and uninstalled via the executor.

</i>

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) KernelAdapter(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

<a id="permissioned"></a>

### permissioned

Modifier to restrict which policies have access to module functions.

```solidity
modifier permissioned();
```

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure virtual returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure virtual returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="init"></a>

### INIT

Initialization function for the module

<i>

This function is called when the module is installed or upgraded by the kernel.

</i>

<i>

MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.

</i>

```solidity
function INIT() external virtual onlyKernel;
```

## Errors

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
