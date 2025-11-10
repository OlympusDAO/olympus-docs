# OlympusClearinghouseRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/modules/CHREG/OlympusClearinghouseRegistry.sol)

**Inherits:**
[CHREGv1](/main/contracts/docs/src/modules/CHREG/CHREG.v1.sol/abstract.CHREGv1)

Olympus Clearinghouse Registry (Module) Contract

*The Olympus Clearinghouse Registry Module tracks the lending facilities that the Olympus
protocol deploys to satisfy the Cooler Loan demand. This allows for a single-source of truth
for reporting purposes around the total Treasury holdings as well as its projected receivables.*

## Functions

### constructor

Can be initialized with an active Clearinghouse and list of inactive ones.

```solidity
constructor(Kernel kernel_, address active_, address[] memory inactive_) Module(kernel_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`kernel_`|`Kernel`|contract address.|
|`active_`|`address`|Address of the active Clearinghouse. Set to address(0) if none.|
|`inactive_`|`address[]`|List of inactive Clearinghouses. Leave empty if none.|

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

### activateClearinghouse

Adds a Clearinghouse to the registry.
Only callable by permissioned policies.

```solidity
function activateClearinghouse(address clearinghouse_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|The address of the clearinghouse.|

### deactivateClearinghouse

Deactivates a clearinghouse from the registry.
Only callable by permissioned policies.

```solidity
function deactivateClearinghouse(address clearinghouse_) external override permissioned;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|The address of the clearinghouse.|
