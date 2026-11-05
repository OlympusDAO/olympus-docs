# OlympusInstructions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/INSTR/OlympusInstructions.sol)

**Inherits:** [INSTRv1](/main/contracts/docs/src/modules/INSTR/INSTR.v1.sol/abstract.INSTRv1)

Caches and executes batched instructions for protocol upgrades in the Kernel.

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Module(kernel_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |

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

<a id="getinstructions-uint256"></a>

### getInstructions

View function for retrieving a list of Instructions in an outside contract.

```solidity
function getInstructions(
        uint256 instructionsId_
    ) public view override returns (Instruction[] memory);
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
function store(
        Instruction[] calldata instructions_
    ) external override permissioned returns (uint256);
```

**Parameters**

| Name          | Type            | Description |
| ------------- | --------------- | ----------- |
| instructions_ | `Instruction[]` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
