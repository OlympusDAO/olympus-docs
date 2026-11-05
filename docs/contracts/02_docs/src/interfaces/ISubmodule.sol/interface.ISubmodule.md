# ISubmodule

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/ISubmodule.sol)

**Inherits:** [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** ISubmodule

Interface for Bophades submodules

<i>

Submodules are isolated components of a module that can be upgraded independently

</i>

## Functions

<a id="parent"></a>

### PARENT

5 byte identifier for the parent module

```solidity
function PARENT() external pure returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` | The keycode of the parent module |

<a id="subkeycode"></a>

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT()

```solidity
function SUBKEYCODE() external pure returns (SubKeycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode` | The subkeycode of this submodule |

<a id="init"></a>

### INIT

Initialization function for the submodule

<i>

This function is called when the submodule is installed or upgraded by the module

</i>

<i>

MUST BE GATED BY onlyParent. Used to encompass any initialization or upgrade logic

</i>

```solidity
function INIT() external;
```
