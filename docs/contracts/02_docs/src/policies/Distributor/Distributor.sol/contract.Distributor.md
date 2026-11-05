# Distributor

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Distributor/Distributor.sol)

**Inherits:** [IDistributor](/main/contracts/docs/src/policies/interfaces/IDistributor.sol/interface.IDistributor), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

## Constants

### ohm

Olympus contract dependencies

```solidity
ERC20 private immutable ohm;
```

### staking

Getter function for the staking contract address.

```solidity
IStaking public immutable staking;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | address The staking contract address. |

### DENOMINATOR

Constants

```solidity
uint256 private constant DENOMINATOR = 1e9;
```

## State Variables

### TRSRY

Modules

```solidity
TRSRYv1 public TRSRY;
```

### MINTR

```solidity
MINTRv1 public MINTR;
```

### pools

Policy state

```solidity
address[] public pools;
```

### rewardRate

```solidity
uint256 public rewardRate;
```

### bounty

```solidity
uint256 public bounty;
```

### unlockRebase

```solidity
bool private unlockRebase;
```

## Functions

<a id="constructor-kernel-address-address-uint256"></a>

### constructor

```solidity
constructor(
        Kernel kernel_,
        address ohm_,
        address staking_,
        uint256 initialRate_
    ) Policy(kernel_);
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| kernel_      | `Kernel`  |             |
| ohm_         | `address` |             |
| staking_     | `address` |             |
| initialRate_ | `uint256` |             |

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
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="triggerrebase"></a>

### triggerRebase

Trigger rebases via distributor. There is an error in Staking's `stake` function
which pulls forward part of the rebase for the next epoch. This path triggers a
rebase by calling `unstake` (which does not have the issue). The patch also
restricts `distribute` to only be able to be called from a tx originating in this
function.

```solidity
function triggerRebase() external;
```

<a id="distribute"></a>

### distribute

Send the epoch's reward to the staking contract, and mint rewards to Uniswap V2 pools.
This removes opportunity cost for liquidity providers by sending rebase rewards
directly into the liquidity pool.

NOTE: This does not add additional emissions (user could be staked instead and get the
same tokens).

```solidity
function distribute() external;
```

<a id="retrievebounty"></a>

### retrieveBounty

Mints the bounty (if > 0) to the staking contract for distribution.

```solidity
function retrieveBounty() external returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The amount of OHM minted as a bounty. |

<a id="nextrewardfor-address"></a>

### nextRewardFor

Returns the next reward for the given address based on their OHM balance.

```solidity
function nextRewardFor(address who_) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| who_ | `address` | The address to get the next reward for. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | uint256 The next reward for the given address. |

<a id="setbounty-uint256"></a>

### setBounty

Adjusts the bounty

<i>

This function is only available to an authorized user.

</i>

```solidity
function setBounty(uint256 bounty_) external onlyRole("distributor_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bounty_ | `uint256` | The new bounty amount in OHM (9 decimals). |

<a id="setpools-address"></a>

### setPools

Sets the Uniswap V2 pools to be minted into

<i>

This function is only available to an authorized user.

</i>

```solidity
function setPools(address[] calldata pools_) external onlyRole("distributor_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pools_ | `address[]` | The array of Uniswap V2 pools. |

<a id="removepool-uint256-address"></a>

### removePool

Removes a liquidity pool from the list of pools to be minted into

<i>

This function is only available to an authorized user.

</i>

```solidity
function removePool(uint256 index_, address pool_) external onlyRole("distributor_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| index_ | `uint256` | The index in the pools array of the liquidity pool to remove. |
| pool_ | `address` | The address of the liquidity pool to remove. |

<a id="addpool-uint256-address"></a>

### addPool

Adds a liquidity pool to the list of pools to be minted into

```solidity
function addPool(uint256 index_, address pool_) external onlyRole("distributor_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| index_ | `uint256` | The index in the pools array to add the liquidity pool to. |
| pool_ | `address` | The address of the liquidity pool to add. |

<a id="setrewardrate-uint256"></a>

### setRewardRate

Sets the new OHM reward rate to mint and distribute per epoch

```solidity
function setRewardRate(uint256 newRewardRate_) external onlyRole("distributor_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newRewardRate_ | `uint256` | The new rate to set (9 decimals, i.e. 10_000_000 / 1_000_000_000 = 1%) |

## Errors

### Distributor_InvalidConstruction

```solidity
error Distributor_InvalidConstruction();
```

### Distributor_SanityCheck

```solidity
error Distributor_SanityCheck();
```

### Distributor_AdjustmentLimit

```solidity
error Distributor_AdjustmentLimit();
```

### Distributor_AdjustmentUnderflow

```solidity
error Distributor_AdjustmentUnderflow();
```

### Distributor_NotPermissioned

```solidity
error Distributor_NotPermissioned();
```
