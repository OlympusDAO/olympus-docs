# PeripheryEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/PeripheryEnabler.sol)

**Inherits:** [IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

**Title:** PeripheryEnabler

Abstract contract that implements the `IEnabler` interface

<i>

This contract is designed to be used as a base contract for periphery contracts that need to be enabled and disabled.
It additionally is not opionated about whether a caller is permitted to enable/disable the contract, and delegates it to a virtual function.
It is a periphery contract, as it does not require any privileged access to the Olympus protocol.

</i>

## State Variables

### isEnabled

Whether the contract is enabled

```solidity
bool public isEnabled;
```

## Functions

<a id="_onlyenabled"></a>

### _onlyEnabled

```solidity
function _onlyEnabled() internal view;
```

<a id="onlyenabled"></a>

### onlyEnabled

```solidity
modifier onlyEnabled();
```

<a id="_onlydisabled"></a>

### _onlyDisabled

```solidity
function _onlyDisabled() internal view;
```

<a id="onlydisabled"></a>

### onlyDisabled

```solidity
modifier onlyDisabled();
```

<a id="_onlyowner"></a>

### _onlyOwner

Implementation-specific validation of ownership

<i>

Implementing contracts should override this function to perform the appropriate validation and revert if the caller is not permitted to enable/disable the contract.

</i>

```solidity
function _onlyOwner() internal view virtual;
```

<a id="_enable-bytes"></a>

### _enable

Implementation-specific enable function

<i>

This function is called by the `enable()` function

</i>

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

```solidity
function _enable(bytes calldata enableData_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enableData_ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="enable-bytes"></a>

### enable

Enables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function enable(bytes calldata enableData_) external onlyDisabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enableData_ | `bytes` | Optional data to pass to a custom enable function |

<a id="_disable-bytes"></a>

### _disable

Implementation-specific disable function

<i>

This function is called by the `disable()` function

</i>

The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable

```solidity
function _disable(bytes calldata disableData_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| disableData_ | `bytes` | Custom data that can be used by the implementation. The format of this data is<br/>left to the discretion of the implementation. |

<a id="disable-bytes"></a>

### disable

Disables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function disable(bytes calldata disableData_) external onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| disableData_ | `bytes` | Optional data to pass to a custom disable function |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
