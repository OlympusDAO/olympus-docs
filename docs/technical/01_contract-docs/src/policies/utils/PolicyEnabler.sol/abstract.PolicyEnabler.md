# PolicyEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/utils/PolicyEnabler.sol)

**Inherits:**
[PolicyAdmin](/main/technical/contract-docs/src/policies/utils/PolicyAdmin.sol/abstract.PolicyAdmin)

This contract is designed to be inherited by contracts that need to be enabled or disabled. It replaces the inconsistent usage of `active` and `locallyActive` state variables across the codebase.

*A contract that inherits from this contract should use the `onlyEnabled` and `onlyDisabled` modifiers to gate access to certain functions.
Inheriting contracts must do the following:

- In `configureDependencies()`, assign the module address to the `ROLES` state variable, e.g. `ROLES = ROLESv1(getModuleAddress(toKeycode("ROLES")));`
The following are optional:
- Override the `_enable()` and `_disable()` functions if custom logic and/or parameters are needed for the enable/disable functions.
- For example, `enable()` could be called with initialisation data that is decoded, validated and assigned in `_enable()`.*

## State Variables

### isEnabled

Whether the policy functionality is enabled

```solidity
bool public isEnabled;
```

## Functions

### onlyEnabled

Modifier that reverts if the policy is not enabled

```solidity
modifier onlyEnabled();
```

### onlyDisabled

Modifier that reverts if the policy is enabled

```solidity
modifier onlyDisabled();
```

### enable

Enable the contract

*This function performs the following steps:

1. Validates that the caller has the admin role
2. Validates that the contract is disabled
3. Calls the implementation-specific `_enable()` function
4. Changes the state of the contract to enabled
5. Emits the `Enabled` event*

```solidity
function enable(bytes calldata enableData_) public onlyAdminRole onlyDisabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`|The data to pass to the implementation-specific `_enable()` function|

### _enable

Implementation-specific enable function

*This function is called by the `enable()` function
The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable*

```solidity
function _enable(bytes calldata enableData_) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`|Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation.|

### disable

Disable the contract

*This function performs the following steps:

1. Validates that the caller has the admin or emergency role
2. Validates that the contract is enabled
3. Calls the implementation-specific `_disable()` function
4. Changes the state of the contract to disabled
5. Emits the `Disabled` event*

```solidity
function disable(bytes calldata disableData_) public onlyEmergencyOrAdminRole onlyEnabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`disableData_`|`bytes`|The data to pass to the implementation-specific `_disable()` function|

### _disable

Implementation-specific disable function

*This function is called by the `disable()` function.
The implementing contract can override this function and perform the following:

1. Validate any parameters (if needed) or revert
2. Validate state (if needed) or revert
3. Perform any necessary actions, apart from modifying the `isEnabled` state variable*

```solidity
function _disable(bytes calldata disableData_) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`disableData_`|`bytes`|Custom data that can be used by the implementation. The format of this data is left to the discretion of the implementation.|

## Events

### Disabled

```solidity
event Disabled();
```

### Enabled

```solidity
event Enabled();
```

## Errors

### NotDisabled

```solidity
error NotDisabled();
```

### NotEnabled

```solidity
error NotEnabled();
```
