# OlympusMinter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/MINTR/OlympusMinter.sol)

**Inherits:** [MINTRv1](/main/contracts/docs/src/modules/MINTR/MINTR.v1.sol/abstract.MINTRv1)

Wrapper for minting and burning functions of OHM token.

## Functions

<a id="constructor-kernel-address"></a>

### constructor

```solidity
constructor(Kernel kernel_, address ohm_) Module(kernel_);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| kernel_ | `Kernel`  |             |
| ohm_    | `address` |             |

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
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="mintohm-address-uint256"></a>

### mintOhm

Mint OHM to an address.

```solidity
function mintOhm(address to_, uint256 amount_) external override permissioned onlyWhileActive;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| to_     | `address` |             |
| amount_ | `uint256` |             |

<a id="burnohm-address-uint256"></a>

### burnOhm

Burn OHM from an address. Must have approval.

```solidity
function burnOhm(
        address from_,
        uint256 amount_
    ) external override permissioned onlyWhileActive;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| from_   | `address` |             |
| amount_ | `uint256` |             |

<a id="increasemintapproval-address-uint256"></a>

### increaseMintApproval

Increase approval for specific withdrawer addresses

<i>

Policies must explicity request how much they want approved before withdrawing.

</i>

```solidity
function increaseMintApproval(address policy_, uint256 amount_) external override permissioned;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |
| amount_ | `uint256` |             |

<a id="decreasemintapproval-address-uint256"></a>

### decreaseMintApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseMintApproval(address policy_, uint256 amount_) external override permissioned;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |
| amount_ | `uint256` |             |

<a id="deactivate"></a>

### deactivate

Emergency shutdown of minting and burning.

```solidity
function deactivate() external override permissioned;
```

<a id="activate"></a>

### activate

Re-activate minting and burning after shutdown.

```solidity
function activate() external override permissioned;
```
