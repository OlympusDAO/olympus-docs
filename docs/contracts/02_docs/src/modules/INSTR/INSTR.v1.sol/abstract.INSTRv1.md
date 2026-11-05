# INSTRv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/INSTR/INSTR.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Caches and executes batched instructions for protocol upgrades in the Kernel.

## State Variables

### totalInstructions

Counter of total instructions

```solidity
uint256 public totalInstructions;
```

### storedInstructions

All stored instructions per count in totalInstructions

```solidity
mapping(uint256 => Instruction[]) public storedInstructions;
```

## Functions

<a id="getinstructions-uint256"></a>

### getInstructions

View function for retrieving a list of Instructions in an outside contract.

```solidity
function getInstructions(
        uint256 instructionsId_
    ) external virtual returns (Instruction[] memory);
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| instructionsId_ | `uint256` |             |

**Returns**

| Name         | Type            | Description |
| ------------ | --------------- | ----------- |
| &lt;none&gt; | `Instruction[]` |             |

<a id="store-instruction"></a>

### store

Store a list of Instructions to be executed in the future.

```solidity
function store(Instruction[] calldata instructions_) external virtual returns (uint256);
```

**Parameters**

| Name          | Type            | Description |
| ------------- | --------------- | ----------- |
| instructions_ | `Instruction[]` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

## Events

### InstructionsStored

```solidity
event InstructionsStored(uint256 instructionsId);
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| instructionsId | `uint256` |             |

## Errors

### INSTR_InstructionsCannotBeEmpty

```solidity
error INSTR_InstructionsCannotBeEmpty();
```

### INSTR_InvalidAction

```solidity
error INSTR_InvalidAction();
```
