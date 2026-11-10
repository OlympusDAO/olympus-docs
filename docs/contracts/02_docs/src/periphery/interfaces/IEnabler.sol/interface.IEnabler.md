# IEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/interfaces/IEnabler.sol)

**Title:** IEnabler

Interface for contracts that can be enabled and disabled

<i>

This is designed for usage by periphery contracts that cannot inherit from `PolicyEnabler`. Authorization is deliberately left open to the implementing contract.

</i>

## Functions

<a id="isenabled"></a>

### isEnabled

Returns true if the contract is enabled

```solidity
function isEnabled() external view returns (bool enabled);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | True if the contract is enabled, false otherwise |

<a id="enable-bytes"></a>

### enable

Enables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function enable(bytes calldata enableData_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enableData_ | `bytes` | Optional data to pass to a custom enable function |

<a id="disable-bytes"></a>

### disable

Disables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function disable(bytes calldata disableData_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| disableData_ | `bytes` | Optional data to pass to a custom disable function |

## Events

### Enabled

Emitted when the contract is enabled

```solidity
event Enabled();
```

### Disabled

Emitted when the contract is disabled

```solidity
event Disabled();
```

## Errors

### NotEnabled

Thrown when the contract is not enabled

```solidity
error NotEnabled();
```

### NotDisabled

Thrown when the contract is not disabled

```solidity
error NotDisabled();
```
