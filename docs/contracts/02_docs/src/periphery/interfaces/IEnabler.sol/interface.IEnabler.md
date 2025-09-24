# IEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/periphery/interfaces/IEnabler.sol)

Interface for contracts that can be enabled and disabled

*This is designed for usage by periphery contracts that cannot inherit from `PolicyEnabler`. Authorization is deliberately left open to the implementing contract.*

## Functions

### isEnabled

Returns true if the contract is enabled

```solidity
function isEnabled() external view returns (bool enabled);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`enabled`|`bool`|True if the contract is enabled, false otherwise|

### enable

Enables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function enable(bytes calldata enableData_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`| Optional data to pass to a custom enable function|

### disable

Disables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function disable(bytes calldata disableData_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`disableData_`|`bytes`|Optional data to pass to a custom disable function|

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
