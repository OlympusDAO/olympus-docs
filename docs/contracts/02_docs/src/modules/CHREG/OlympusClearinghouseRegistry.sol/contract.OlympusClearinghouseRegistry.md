# OlympusClearinghouseRegistry

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/CHREG/OlympusClearinghouseRegistry.sol)

**Inherits:** [CHREGv1](/main/contracts/docs/src/modules/CHREG/CHREG.v1.sol/abstract.CHREGv1)

**Title:** Olympus Clearinghouse Registry

Olympus Clearinghouse Registry (Module) Contract

<i>

The Olympus Clearinghouse Registry Module tracks the lending facilities that the Olympus
protocol deploys to satisfy the Cooler Loan demand. This allows for a single-source of truth
for reporting purposes around the total Treasury holdings as well as its projected receivables.

</i>

## Functions

<a id="constructor-kernel-address-address"></a>

### constructor

Can be initialized with an active Clearinghouse and list of inactive ones.

```solidity
constructor(Kernel kernel_, address active_, address[] memory inactive_) Module(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | contract address. |
| active_ | `address` | Address of the active Clearinghouse. Set to address(0) if none. |
| inactive_ | `address[]` | List of inactive Clearinghouses. Leave empty if none. |

<a id="keycode"></a>

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Keycode` |  |

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

<a id="activateclearinghouse-address"></a>

### activateClearinghouse

Adds a Clearinghouse to the registry.
Only callable by permissioned policies.

```solidity
function activateClearinghouse(address clearinghouse_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | The address of the clearinghouse. |

<a id="deactivateclearinghouse-address"></a>

### deactivateClearinghouse

Deactivates a clearinghouse from the registry.
Only callable by permissioned policies.

```solidity
function deactivateClearinghouse(address clearinghouse_) external override permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | The address of the clearinghouse. |
