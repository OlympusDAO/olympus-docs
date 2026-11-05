# Submodule

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Submodules.sol)

**Inherits:** [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [ISubmodule](/main/contracts/docs/src/interfaces/ISubmodule.sol/interface.ISubmodule)

Submodules are isolated components of a module that can be upgraded independently.

<i>

Submodules are installed and uninstalled directly on the module.

</i>

<i>

If a module is going to hold state that should be persisted across upgrades, then a submodule pattern may be a good fit.

</i>

## State Variables

### parent

The parent module for this submodule.

```solidity
Module public parent;
```

## Functions

<a id="constructor-module"></a>

### constructor

```solidity
constructor(Module parent_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parent_ | `Module` |  |

<a id="_onlyparent"></a>

### _onlyParent

```solidity
function _onlyParent() internal view;
```

<a id="onlyparent"></a>

### onlyParent

Modifier to restrict functions to be called only by parent module.

```solidity
modifier onlyParent();
```

<a id="parent"></a>

### PARENT

5 byte identifier for the parent module.

```solidity
function PARENT() public pure virtual returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

<a id="subkeycode"></a>

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT().

```solidity
function SUBKEYCODE() public pure virtual returns (SubKeycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode` |  |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure virtual override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface

```solidity
function supportsInterface(bytes4 interfaceId) public pure virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` | The interface identifier, as specified in ERC-165 |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool True if the contract supports interfaceId_ |

<a id="init"></a>

### INIT

Initialization function for the submodule

<i>

This function is called when the submodule is installed or upgraded by the module.

</i>

<i>

MUST BE GATED BY onlyParent. Used to encompass any initialization or upgrade logic.

</i>

```solidity
function INIT() external virtual onlyParent;
```

## Errors

### Submodule_OnlyParent

```solidity
error Submodule_OnlyParent(address caller_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` |  |

### Submodule_ModuleDoesNotExist

```solidity
error Submodule_ModuleDoesNotExist(Keycode keycode_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode_ | `Keycode` |  |

### Submodule_InvalidParent

```solidity
error Submodule_InvalidParent();
```
