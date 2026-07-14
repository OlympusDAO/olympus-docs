# ISubmodule

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/interfaces/ISubmodule.sol)

**Inherits:**
[IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:**
ISubmodule

forge-lint: disable-start(mixed-case-function)

Interface for Bophades submodules

Submodules are isolated components of a module that can be upgraded independently

## Functions

### PARENT

5 byte identifier for the parent module

```solidity
function PARENT() external pure returns (Keycode);
```

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `Keycode` | The keycode of the parent module |

### SUBKEYCODE

20 byte identifier for the submodule. First 5 bytes must match PARENT()

```solidity
function SUBKEYCODE() external pure returns (SubKeycode);
```

**Returns**

| Name     | Type         | Description                      |
| -------- | ------------ | -------------------------------- |
| `<none>` | `SubKeycode` | The subkeycode of this submodule |

### INIT

Initialization function for the submodule

This function is called when the submodule is installed or upgraded by the module

MUST BE GATED BY onlyParent. Used to encompass any initialization or upgrade logic

```solidity
function INIT() external;
```
