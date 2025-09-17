# OlympusInstructions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/modules/INSTR/OlympusInstructions.sol)

**Inherits:**
[INSTRv1](/main/technical/contract-docs/src/modules/INSTR/INSTR.v1.sol/abstract.INSTRv1)

Caches and executes batched instructions for protocol upgrades in the Kernel.

## Functions

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

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

### getInstructions

View function for retrieving a list of Instructions in an outside contract.

```solidity
function getInstructions(uint256 instructionsId_) public view override returns (Instruction[] memory);
```

### store

Store a list of Instructions to be executed in the future.

```solidity
function store(Instruction[] calldata instructions_) external override permissioned returns (uint256);
```
