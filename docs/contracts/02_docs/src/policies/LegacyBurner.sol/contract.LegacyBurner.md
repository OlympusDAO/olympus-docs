# LegacyBurner

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/LegacyBurner.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy)

**Title:** Olympus Legacy Burner Policy

## Constants

### ohm

```solidity
OlympusERC20Token public immutable ohm;
```

### DENOMINATOR

```solidity
uint256 internal constant DENOMINATOR = 100_000_000;
```

## State Variables

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### bondManager

```solidity
address public bondManager;
```

### inverseBondDepo

```solidity
address public inverseBondDepo;
```

### reward

```solidity
uint256 public reward;
```

### rewardClaimed

```solidity
bool public rewardClaimed;
```

## Functions

<a id="constructor-kernel-address-address-address-uint256"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        address ohm_,
        address bondManager_,
        address inverseBondDepo_,
        uint256 reward_ // in OHM, 9 decimals
    ) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| ohm_ | `address` |  |
| bondManager_ | `address` |  |
| inverseBondDepo_ | `address` |  |
| reward_ | `uint256` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="burn"></a>

### burn

Burn OHM from desired sources, send rewards to the caller

<i>

Calculates linearly increasing reward (up to cap) for the amount of OHM burned, burns OHM from
BondManager and InverseBondDepo, and mints rewards to the caller. We use this approach of burning
everything and then reminting the rewards because the InverseBondDepo does not allow partial burns
or the transfer of OHM to another address. We have to burn the entire amount of OHM in the contract.
So we burn everything, then mint the rewards to the caller.

</i>

```solidity
function burn() external;
```

<a id="_burnbondmanagerohm-uint256"></a>

### _burnBondManagerOhm

Burns OHM from the bond manager

<i>

An infinite approval (via Policy MS) for this contract to spend OHM from the bond manager is required

</i>

```solidity
function _burnBondManagerOhm(uint256 amount_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` |  |

<a id="_burninversebonddepoohm"></a>

### _burnInverseBondDepoOhm

Burns OHM from the legacy inverse bond depository

<i>

The only way to burn is to burn the entire amount of OHM in the contract, cannot transfer here first.
The burn function requires the caller to be specified as the `policy` address on an OlympusAuthority
contract. So in order for this to work we have to also deploy a mock OlympusAuthority contract that
specifies this contract as the policy address and then update the authority address on the inverse
bond depository contract.

</i>

```solidity
function _burnInverseBondDepoOhm() internal;
```

## Events

### Burn

```solidity
event Burn(uint256 amount, uint256 reward);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | `uint256` |  |
| reward | `uint256` |  |

## Errors

### LegacyBurner_RewardAlreadyClaimed

```solidity
error LegacyBurner_RewardAlreadyClaimed();
```
