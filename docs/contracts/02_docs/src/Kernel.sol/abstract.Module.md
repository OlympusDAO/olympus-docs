# Module

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/Kernel.sol)

**Inherits:**
[KernelAdapter](/main/contracts/docs/src/Kernel.sol/abstract.KernelAdapter)

Base level extension of the kernel. Modules act as independent state components to be
interacted with and mutated through policies.

*Modules are installed and uninstalled via the executor.*

## Functions

### constructor

```solidity
constructor(Kernel kernel_) KernelAdapter(kernel_);
```

### permissioned

Modifier to restrict which policies have access to module functions.

```solidity
modifier permissioned();
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure virtual returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure virtual returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### INIT

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.*

*MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*

```solidity
function INIT() external virtual onlyKernel;
```

## Errors

### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_);
```
