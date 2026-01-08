# OlympusContractRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/modules/RGSTY/OlympusContractRegistry.sol)

**Inherits:**
[RGSTYv1](/main/contracts/docs/src/modules/RGSTY/RGSTY.v1.sol/abstract.RGSTYv1)

**Title:**
Olympus Contract Registry

This module is used to track the addresses of contracts.
It supports both immutable and mutable addresses.
Immutable addresses can be used to track commonly-used addresses (such as tokens), where the dependent contract needs an assurance that the address is immutable.
Mutable addresses can be used to track contracts that are expected to change over time, such as the latest version of a Policy.

## State Variables

### keycode

The keycode for the Olympus Contract Registry

```solidity
bytes5 public constant keycode = "RGSTY"
```

## Functions

### constructor

Constructor for the Olympus Contract Registry

This function will revert if:

- The provided kernel address is zero

```solidity
constructor(address kernel_) Module(Kernel(kernel_));
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`kernel_`|`address`|The address of the kernel|

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### registerImmutableContract

Register an immutable contract name and address

This function performs the following steps:

- Validates the parameters
- Registers the contract
- Updates the contract names
- Refreshes the dependent policies
The contract name can contain:
- Lowercase letters
- Numerals
This function will revert if:
- The caller is not permissioned
- The name is empty
- The name contains punctuation or uppercase letters
- The contract address is zero
- The contract name is already registered as an immutable address
- The contract name is already registered as a mutable address

```solidity
function registerImmutableContract(bytes5 name_, address contractAddress_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### registerContract

Register a new contract name and address

This function performs the following steps:

- Validates the parameters
- Updates the contract address
- Updates the contract names (if needed)
- Refreshes the dependent policies
The contract name can contain:
- Lowercase letters
- Numerals
This function will revert if:
- The caller is not permissioned
- The name is empty
- The name contains punctuation or uppercase letters
- The contract address is zero
- The contract name is already registered as an immutable address
- The contract name is already registered as a mutable address

```solidity
function registerContract(bytes5 name_, address contractAddress_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### updateContract

Update the address of an existing contract name

This function performs the following steps:

- Validates the parameters
- Updates the contract address
- Updates the contract names (if needed)
- Refreshes the dependent policies
This function will revert if:
- The caller is not permissioned
- The contract is not registered as a mutable address
- The contract address is zero

```solidity
function updateContract(bytes5 name_, address contractAddress_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### deregisterContract

Deregister an existing contract name

This function performs the following steps:

- Validates the parameters
- Removes the contract address
- Removes the contract name
- Refreshes the dependent policies
This function will revert if:
- The caller is not permissioned
- The contract is not registered as a mutable address

```solidity
function deregisterContract(bytes5 name_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|  The name of the contract|

### getImmutableContract

Get the address of a registered immutable contract

This function will revert if:

- The contract is not registered as an immutable address

```solidity
function getImmutableContract(bytes5 name_) external view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|  The name of the contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the contract|

### getImmutableContractNames

Get the names of all registered immutable contracts

Note that the order of the names in the array is not guaranteed to be consistent.

```solidity
function getImmutableContractNames() external view override returns (bytes5[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes5[]`|The names of all registered immutable contracts|

### getContract

Get the address of a registered mutable contract

This function will revert if:

- The contract is not registered

```solidity
function getContract(bytes5 name_) external view override returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|  The name of the contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the contract|

### getContractNames

Get the names of all registered mutable contracts

Note that the order of the names in the array is not guaranteed to be consistent.

```solidity
function getContractNames() external view override returns (bytes5[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes5[]`|The names of all registered mutable contracts|

### _validateContractName

Validates the contract name

This function will revert if:

- The name is empty
- Null characters are found in the start or middle of the name
- The name contains punctuation or uppercase letters

```solidity
function _validateContractName(bytes5 name_) internal pure;
```

### _removeContractName

Removes the name of a contract from the list of contract names.

```solidity
function _removeContractName(bytes5 name_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|The name of the contract|

### _refreshDependents

Refreshes the dependents of the module

```solidity
function _refreshDependents() internal;
```
