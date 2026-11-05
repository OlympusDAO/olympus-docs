# MINTRv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/MINTR/MINTR.v1.sol)

**Inherits:** [Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Wrapper for minting and burning functions of OHM token.

## State Variables

### ohm

```solidity
OHM public ohm;
```

### active

Status of the minter. If false, minting and burning OHM is disabled.

```solidity
bool public active;
```

### mintApproval

Mapping of who is approved for minting.

<i>

minter -> amount. Infinite approval is max(uint256).

</i>

```solidity
mapping(address => uint256) public mintApproval;
```

## Functions

<a id="onlywhileactive"></a>

### onlyWhileActive

```solidity
modifier onlyWhileActive();
```

<a id="mintohm-address-uint256"></a>

### mintOhm

Mint OHM to an address.

```solidity
function mintOhm(address to_, uint256 amount_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| amount_ | `uint256` |  |

<a id="burnohm-address-uint256"></a>

### burnOhm

Burn OHM from an address. Must have approval.

```solidity
function burnOhm(address from_, uint256 amount_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` |  |
| amount_ | `uint256` |  |

<a id="increasemintapproval-address-uint256"></a>

### increaseMintApproval

Increase approval for specific withdrawer addresses

<i>

Policies must explicity request how much they want approved before withdrawing.

</i>

```solidity
function increaseMintApproval(address policy_, uint256 amount_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| amount_ | `uint256` |  |

<a id="decreasemintapproval-address-uint256"></a>

### decreaseMintApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseMintApproval(address policy_, uint256 amount_) external virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| amount_ | `uint256` |  |

<a id="deactivate"></a>

### deactivate

Emergency shutdown of minting and burning.

```solidity
function deactivate() external virtual;
```

<a id="activate"></a>

### activate

Re-activate minting and burning after shutdown.

```solidity
function activate() external virtual;
```

## Events

### IncreaseMintApproval

```solidity
event IncreaseMintApproval(address indexed policy_, uint256 newAmount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| newAmount_ | `uint256` |  |

### DecreaseMintApproval

```solidity
event DecreaseMintApproval(address indexed policy_, uint256 newAmount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| newAmount_ | `uint256` |  |

### Mint

```solidity
event Mint(address indexed policy_, address indexed to_, uint256 amount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| to_ | `address` |  |
| amount_ | `uint256` |  |

### Burn

```solidity
event Burn(address indexed policy_, address indexed from_, uint256 amount_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy_ | `address` |  |
| from_ | `address` |  |
| amount_ | `uint256` |  |

## Errors

### MINTR_NotApproved

```solidity
error MINTR_NotApproved();
```

### MINTR_ZeroAmount

```solidity
error MINTR_ZeroAmount();
```

### MINTR_NotActive

```solidity
error MINTR_NotActive();
```
