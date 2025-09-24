# RGSTYv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/modules/RGSTY/RGSTY.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Interface for a module that can track the addresses of contracts

## State Variables

### _immutableContractNames

Stores the names of the registered immutable contracts

```solidity
bytes5[] internal _immutableContractNames;
```

### _contractNames

Stores the names of the registered contracts

```solidity
bytes5[] internal _contractNames;
```

### _immutableContracts

Mapping to store the immutable address of a contract

*The address of an immutable contract can be retrieved by `getImmutableContract()`, and the names of all immutable contracts can be retrieved by `getImmutableContractNames()`.*

```solidity
mapping(bytes5 => address) internal _immutableContracts;
```

### _contracts

Mapping to store the address of a contract

*The address of a registered contract can be retrieved by `getContract()`, and the names of all registered contracts can be retrieved by `getContractNames()`.*

```solidity
mapping(bytes5 => address) internal _contracts;
```

## Functions

### registerImmutableContract

Register an immutable contract name and address

*This function should be permissioned to prevent arbitrary contracts from being registered.*

```solidity
function registerImmutableContract(bytes5 name_, address contractAddress_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### registerContract

Register a new contract name and address

*This function should be permissioned to prevent arbitrary contracts from being registered.*

```solidity
function registerContract(bytes5 name_, address contractAddress_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### updateContract

Update the address of an existing contract name

*This function should be permissioned to prevent arbitrary contracts from being updated.*

```solidity
function updateContract(bytes5 name_, address contractAddress_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|              The name of the contract|
|`contractAddress_`|`address`|   The address of the contract|

### deregisterContract

Deregister an existing contract name

*This function should be permissioned to prevent arbitrary contracts from being deregistered.*

```solidity
function deregisterContract(bytes5 name_) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|  The name of the contract|

### getImmutableContract

Get the address of a registered immutable contract

```solidity
function getImmutableContract(bytes5 name_) external view virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`bytes5`|  The name of the contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the contract|

### getContract

Get the address of a registered mutable contract

```solidity
function getContract(bytes5 name_) external view virtual returns (address);
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

```solidity
function getImmutableContractNames() external view virtual returns (bytes5[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes5[]`|The names of all registered immutable contracts|

### getContractNames

Get the names of all registered mutable contracts

```solidity
function getContractNames() external view virtual returns (bytes5[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes5[]`|The names of all registered mutable contracts|

## Events

### ContractRegistered

Emitted when a contract is registered

```solidity
event ContractRegistered(bytes5 indexed name, address indexed contractAddress, bool isImmutable);
```

### ContractUpdated

Emitted when a contract is updated

```solidity
event ContractUpdated(bytes5 indexed name, address indexed contractAddress);
```

### ContractDeregistered

Emitted when a contract is deregistered

```solidity
event ContractDeregistered(bytes5 indexed name);
```

## Errors

### Params_InvalidName

The provided name is invalid

```solidity
error Params_InvalidName();
```

### Params_InvalidAddress

The provided address is invalid

```solidity
error Params_InvalidAddress();
```

### Params_ContractAlreadyRegistered

The provided contract name is already registered

```solidity
error Params_ContractAlreadyRegistered();
```

### Params_ContractNotRegistered

The provided contract name is not registered

```solidity
error Params_ContractNotRegistered();
```
