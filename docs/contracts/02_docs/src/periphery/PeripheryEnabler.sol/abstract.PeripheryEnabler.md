# PeripheryEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/periphery/PeripheryEnabler.sol)

**Inherits:**
[IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

Abstract contract that implements the `IEnabler` interface

*This contract is designed to be used as a base contract for periphery contracts that need to be enabled and disabled.
It additionally is not opionated about whether a caller is permitted to enable/disable the contract, and delegates it to a virtual function.
It is a periphery contract, as it does not require any privileged access to the Olympus protocol.*

## State Variables

### isEnabled

Whether the contract is enabled

```solidity
bool public isEnabled;
```

## Functions

### _onlyEnabled

```solidity
function _onlyEnabled() internal view;
```

### onlyEnabled

```solidity
modifier onlyEnabled();
```

### _onlyDisabled

```solidity
function _onlyDisabled() internal view;
```

### onlyDisabled

```solidity
modifier onlyDisabled();
```

### _onlyOwner

Implementation-specific validation of ownership

*Implementing contracts should override this function to perform the appropriate validation and revert if the caller is not permitted to enable/disable the contract.*

```solidity
function _onlyOwner() internal view virtual;
```

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

### enable

Enables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function enable(bytes calldata enableData_) external onlyDisabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`enableData_`|`bytes`| Optional data to pass to a custom enable function|

### _disable

Implementation-specific disable function

*This function is called by the `disable()` function
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

### disable

Disables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function disable(bytes calldata disableData_) external onlyEnabled;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`disableData_`|`bytes`|Optional data to pass to a custom disable function|

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool);
```
