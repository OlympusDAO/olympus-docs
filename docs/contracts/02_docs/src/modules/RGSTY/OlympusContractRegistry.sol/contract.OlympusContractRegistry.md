# OlympusContractRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/RGSTY/OlympusContractRegistry.sol)

**Inherits:** [RGSTYv1](/main/contracts/docs/src/modules/RGSTY/RGSTY.v1.sol/abstract.RGSTYv1)

**Title:** Olympus Contract Registry

This module is used to track the addresses of contracts.
It supports both immutable and mutable addresses.
Immutable addresses can be used to track commonly-used addresses (such as tokens), where the dependent contract needs an assurance that the address is immutable.
Mutable addresses can be used to track contracts that are expected to change over time, such as the latest version of a Policy.

## Constants

### keycode

The keycode for the Olympus Contract Registry

```solidity
bytes5 public constant keycode = "RGSTY";
```

## Functions

<a id="constructor-address"></a>

### constructor

Constructor for the Olympus Contract Registry

<i>

This function will revert if:

- The provided kernel address is zero

</i>

```solidity
constructor(address kernel_) Module(Kernel(kernel_));
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` | The address of the kernel |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `Keycode` |             |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() public pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="registerimmutablecontract-bytes5-address"></a>

### registerImmutableContract

<i>

This function performs the following steps:

- Validates the parameters
- Registers the contract
- Updates the contract names
- Refreshes the dependent policies

</i>

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
function registerImmutableContract(
        bytes5 name_,
        address contractAddress_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="registercontract-bytes5-address"></a>

### registerContract

<i>

This function performs the following steps:

- Validates the parameters
- Updates the contract address
- Updates the contract names (if needed)
- Refreshes the dependent policies

</i>

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
function registerContract(
        bytes5 name_,
        address contractAddress_
    ) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="updatecontract-bytes5-address"></a>

### updateContract

<i>

This function performs the following steps:

- Validates the parameters
- Updates the contract address
- Updates the contract names (if needed)
- Refreshes the dependent policies

</i>

This function will revert if:

- The caller is not permissioned
- The contract is not registered as a mutable address
- The contract address is zero

```solidity
function updateContract(bytes5 name_, address contractAddress_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |
| contractAddress_ | `address` | The address of the contract |

<a id="deregistercontract-bytes5"></a>

### deregisterContract

<i>

This function performs the following steps:

- Validates the parameters
- Removes the contract address
- Removes the contract name
- Refreshes the dependent policies

</i>

This function will revert if:

- The caller is not permissioned
- The contract is not registered as a mutable address

```solidity
function deregisterContract(bytes5 name_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |

<a id="getimmutablecontract-bytes5"></a>

### getImmutableContract

Get the address of a registered immutable contract

<i>

This function will revert if:

- The contract is not registered as an immutable address

</i>

```solidity
function getImmutableContract(bytes5 name_) external view override returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the contract |

<a id="getimmutablecontractnames"></a>

### getImmutableContractNames

Get the names of all registered immutable contracts

<i>

Note that the order of the names in the array is not guaranteed to be consistent.

</i>

```solidity
function getImmutableContractNames() external view override returns (bytes5[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes5[]` | The names of all registered immutable contracts |

<a id="getcontract-bytes5"></a>

### getContract

Get the address of a registered mutable contract

<i>

This function will revert if:

- The contract is not registered

</i>

```solidity
function getContract(bytes5 name_) external view override returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the contract |

<a id="getcontractnames"></a>

### getContractNames

Get the names of all registered mutable contracts

<i>

Note that the order of the names in the array is not guaranteed to be consistent.

</i>

```solidity
function getContractNames() external view override returns (bytes5[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes5[]` | The names of all registered mutable contracts |

<a id="_validatecontractname-bytes5"></a>

### _validateContractName

Validates the contract name

<i>

This function will revert if:

- The name is empty
- Null characters are found in the start or middle of the name
- The name contains punctuation or uppercase letters

</i>

```solidity
function _validateContractName(bytes5 name_) internal pure;
```

**Parameters**

| Name  | Type     | Description |
| ----- | -------- | ----------- |
| name_ | `bytes5` |             |

<a id="_removecontractname-bytes5"></a>

### _removeContractName

Removes the name of a contract from the list of contract names.

```solidity
function _removeContractName(bytes5 name_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | `bytes5` | The name of the contract |

<a id="_refreshdependents"></a>

### _refreshDependents

Refreshes the dependents of the module

```solidity
function _refreshDependents() internal;
```
