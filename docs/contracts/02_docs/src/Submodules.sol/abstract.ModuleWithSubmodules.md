# ModuleWithSubmodules

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Submodules.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Base level extension of the kernel. Modules act as independent state components to be
interacted with and mutated through policies.

<i>

Modules are installed and uninstalled via the executor.

</i>

## State Variables

### submodules

Array of all submodules currently installed.

```solidity
SubKeycode[] public submodules;
```

### getSubmoduleForKeycode

Mapping of SubKeycode to Submodule address.

```solidity
mapping(SubKeycode => Submodule) public getSubmoduleForKeycode;
```

## Functions

<a id="installsubmodule-submodule"></a>

### installSubmodule

Install a new submodule

<i>

This function will revert if:

- The new submodule is not a contract
- The new submodule does not have the same keycode prefix as this module
- The new submodule has the same keycode as an existing submodule
- The caller is not permissioned

</i>

```solidity
function installSubmodule(Submodule newSubmodule_) external permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newSubmodule_ | `Submodule` | The new submodule to install |

<a id="upgradesubmodule-submodule"></a>

### upgradeSubmodule

Upgrades an existing submodule

<i>

This function will revert if:

- The new submodule is not a contract
- The new submodule does not have the same keycode prefix as this module
- The new submodule is the zero address
- The new submodule has the same address as an existing submodule
- The caller is not permissioned

</i>

```solidity
function upgradeSubmodule(Submodule newSubmodule_) external permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newSubmodule_ | `Submodule` | The new submodule to install |

<a id="execonsubmodule-subkeycode-bytes"></a>

### execOnSubmodule

Perform an action on a submodule

<i>

There is no need to check if the `subKeycode_` belongs to this module,

</i>

<i>

because `installSubmodule()` and `upgradeSubmodule()` (via `_validateSubmodule()`)

</i>

<i>

ensure that the submodule has the same keycode as this module.

</i>

<i>

This function will revert if:

- The submodule is not installed
- The caller is not permissioned
- The call to the submodule reverts

</i>

```solidity
function execOnSubmodule(
        SubKeycode subKeycode_,
        bytes memory callData_
    ) external permissioned returns (bytes memory);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` | The SubKeycode of the submodule to call |
| callData_ | `bytes` | The calldata to send to the submodule |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` | returnData_   The return data from the submodule call |

<a id="getsubmodules"></a>

### getSubmodules

```solidity
function getSubmodules() external view returns (SubKeycode[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode[]` |  |

<a id="_submoduleisinstalled-subkeycode"></a>

### _submoduleIsInstalled

```solidity
function _submoduleIsInstalled(SubKeycode subKeycode_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_getsubmoduleifinstalled-subkeycode"></a>

### _getSubmoduleIfInstalled

```solidity
function _getSubmoduleIfInstalled(SubKeycode subKeycode_) internal view returns (Submodule);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Submodule` |  |

<a id="_validatesubmodule-submodule"></a>

### _validateSubmodule

```solidity
function _validateSubmodule(Submodule newSubmodule_) internal view returns (SubKeycode);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newSubmodule_ | `Submodule` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `SubKeycode` |  |

## Errors

### Module_InvalidSubmodule

```solidity
error Module_InvalidSubmodule();
```

### Module_InvalidSubmoduleUpgrade

```solidity
error Module_InvalidSubmoduleUpgrade(SubKeycode subKeycode_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` |  |

### Module_SubmoduleAlreadyInstalled

```solidity
error Module_SubmoduleAlreadyInstalled(SubKeycode subKeycode_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` |  |

### Module_SubmoduleNotInstalled

```solidity
error Module_SubmoduleNotInstalled(SubKeycode subKeycode_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| subKeycode_ | `SubKeycode` |  |

### Module_SubmoduleExecutionReverted

```solidity
error Module_SubmoduleExecutionReverted(bytes error_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| error_ | `bytes` |  |

### Module_SubmoduleInterfaceNotImplemented

```solidity
error Module_SubmoduleInterfaceNotImplemented(address submodule_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| submodule_ | `address` |  |
