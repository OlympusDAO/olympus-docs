# ModuleWithSubmodules

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/Submodules.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Base level extension of the kernel. Modules act as independent state components to be
interacted with and mutated through policies.

Modules are installed and uninstalled via the executor.

## State Variables

### submodules

Array of all submodules currently installed.

```solidity
SubKeycode[] public submodules
```

### getSubmoduleForKeycode

Mapping of SubKeycode to Submodule address.

```solidity
mapping(SubKeycode => Submodule) public getSubmoduleForKeycode
```

## Functions

### installSubmodule

Install a new submodule

This function will revert if:

- The new submodule is not a contract

- The new submodule does not have the same keycode prefix as this module

- The new submodule has the same keycode as an existing submodule

- The caller is not permissioned

```solidity
function installSubmodule(Submodule newSubmodule_) external permissioned;
```

**Parameters**

| Name            | Type        | Description                  |
| --------------- | ----------- | ---------------------------- |
| `newSubmodule_` | `Submodule` | The new submodule to install |

### upgradeSubmodule

Upgrades an existing submodule

This function will revert if:

- The new submodule is not a contract

- The new submodule does not have the same keycode prefix as this module

- The new submodule is the zero address

- The new submodule has the same address as an existing submodule

- The caller is not permissioned

```solidity
function upgradeSubmodule(Submodule newSubmodule_) external permissioned;
```

**Parameters**

| Name            | Type        | Description                  |
| --------------- | ----------- | ---------------------------- |
| `newSubmodule_` | `Submodule` | The new submodule to install |

### execOnSubmodule

Perform an action on a submodule

There is no need to check if the `subKeycode_` belongs to this module,

because `installSubmodule()` and `upgradeSubmodule()` (via `_validateSubmodule()`)

ensure that the submodule has the same keycode as this module.

This function will revert if:

- The submodule is not installed

- The caller is not permissioned

- The call to the submodule reverts

```solidity
function execOnSubmodule(SubKeycode subKeycode_, bytes memory callData_)
    external
    permissioned
    returns (bytes memory);
```

**Parameters**

| Name          | Type         | Description                             |
| ------------- | ------------ | --------------------------------------- |
| `subKeycode_` | `SubKeycode` | The SubKeycode of the submodule to call |
| `callData_`   | `bytes`      | The calldata to send to the submodule   |

**Returns**

| Name     | Type    | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| `<none>` | `bytes` | returnData\_ The return data from the submodule call |

### getSubmodules

```solidity
function getSubmodules() external view returns (SubKeycode[] memory);
```

### \_submoduleIsInstalled

```solidity
function _submoduleIsInstalled(SubKeycode subKeycode_) internal view returns (bool);
```

### \_getSubmoduleIfInstalled

```solidity
function _getSubmoduleIfInstalled(SubKeycode subKeycode_) internal view returns (Submodule);
```

### \_validateSubmodule

```solidity
function _validateSubmodule(Submodule newSubmodule_) internal view returns (SubKeycode);
```

## Errors

### Module_InvalidSubmodule

```solidity
error Module_InvalidSubmodule();
```

### Module_InvalidSubmoduleUpgrade

```solidity
error Module_InvalidSubmoduleUpgrade(SubKeycode subKeycode_);
```

### Module_SubmoduleAlreadyInstalled

```solidity
error Module_SubmoduleAlreadyInstalled(SubKeycode subKeycode_);
```

### Module_SubmoduleNotInstalled

```solidity
error Module_SubmoduleNotInstalled(SubKeycode subKeycode_);
```

### Module_SubmoduleExecutionReverted

```solidity
error Module_SubmoduleExecutionReverted(bytes error_);
```

### Module_SubmoduleInterfaceNotImplemented

```solidity
error Module_SubmoduleInterfaceNotImplemented(address submodule_);
```
