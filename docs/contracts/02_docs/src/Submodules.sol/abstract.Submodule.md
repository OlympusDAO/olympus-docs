# Submodule

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/Submodules.sol)

**Inherits:**
[IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [ISubmodule](/main/contracts/docs/src/interfaces/ISubmodule.sol/interface.ISubmodule)

Submodules are isolated components of a module that can be upgraded independently.

Submodules are installed and uninstalled directly on the module.

If a module is going to hold state that should be persisted across upgrades, then a submodule pattern may be a good fit.

## State Variables

### parent

The parent module for this submodule.

```solidity
Module public parent
```

## Functions

### constructor

```solidity
constructor(Module parent_) ;
```

### \_onlyParent

```solidity
function _onlyParent() internal view;
```

### onlyParent

Modifier to restrict functions to be called only by parent module.

```solidity
modifier onlyParent() ;
```

### PARENT

5 byte identifier for the parent module.

```solidity
function PARENT() public pure virtual returns (Keycode);
```

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure virtual returns (SubKeycode);
```

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure virtual override returns (uint8 major, uint8 minor);
```

**Returns**

| Name    | Type    | Description                                                         |
| ------- | ------- | ------------------------------------------------------------------- |
| `major` | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| `minor` | `uint8` | - Minor version change retains backward-compatible interface.       |

### supportsInterface

Query if a contract implements an interface

```solidity
function supportsInterface(bytes4 interfaceId) public pure virtual returns (bool);
```

**Parameters**

| Name          | Type     | Description                                       |
| ------------- | -------- | ------------------------------------------------- |
| `interfaceId` | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name     | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `<none>` | `bool` | bool True if the contract supports interfaceId\_ |

### INIT

Initialization function for the submodule

This function is called when the submodule is installed or upgraded by the module.

MUST BE GATED BY onlyParent. Used to encompass any initialization or upgrade logic.

```solidity
function INIT() external virtual onlyParent;
```

## Errors

### Submodule_OnlyParent

```solidity
error Submodule_OnlyParent(address caller_);
```

### Submodule_ModuleDoesNotExist

```solidity
error Submodule_ModuleDoesNotExist(Keycode keycode_);
```

### Submodule_InvalidParent

```solidity
error Submodule_InvalidParent();
```
