# Distributor

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/Distributor/Distributor.sol)

**Inherits:**
[IDistributor](/main/contracts/docs/src/policies/interfaces/IDistributor.sol/interface.IDistributor), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

Import External Dependencies
Import Local Dependencies
Import external interfaces

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

### ohm

Olympus contract dependencies

```solidity
ERC20 private immutable ohm;
```

### staking

```solidity
IStaking public immutable staking;
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

### DENOMINATOR

Constants

```solidity
uint256 private constant DENOMINATOR = 1e9;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address ohm_, address staking_, uint256 initialRate_) Policy(kernel_);
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### triggerRebase

Trigger rebases via distributor. There is an error in Staking's `stake` function
which pulls forward part of the rebase for the next epoch. This path triggers a
rebase by calling `unstake` (which does not have the issue). The patch also
restricts `distribute` to only be able to be called from a tx originating in this
function.

```solidity
function triggerRebase() external;
```

### distribute

Send the epoch's reward to the staking contract, and mint rewards to Uniswap V2 pools.
This removes opportunity cost for liquidity providers by sending rebase rewards
directly into the liquidity pool.
NOTE: This does not add additional emissions (user could be staked instead and get the
same tokens).

```solidity
function distribute() external;
```

### retrieveBounty

Mints the bounty (if > 0) to the staking contract for distribution.

```solidity
function retrieveBounty() external returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM minted as a bounty.|

### nextRewardFor

Returns the next reward for the given address based on their OHM balance.

```solidity
function nextRewardFor(address who_) public view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`who_`|`address`|The address to get the next reward for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The next reward for the given address.|

### setBounty

Adjusts the bounty

*This function is only available to an authorized user.*

```solidity
function setBounty(uint256 bounty_) external onlyRole("distributor_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bounty_`|`uint256`|The new bounty amount in OHM (9 decimals).|

### setPools

Sets the Uniswap V2 pools to be minted into

*This function is only available to an authorized user.*

```solidity
function setPools(address[] calldata pools_) external onlyRole("distributor_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pools_`|`address[]`|The array of Uniswap V2 pools.|

### removePool

Removes a liquidity pool from the list of pools to be minted into

*This function is only available to an authorized user.*

```solidity
function removePool(uint256 index_, address pool_) external onlyRole("distributor_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|The index in the pools array of the liquidity pool to remove.|
|`pool_`|`address`|The address of the liquidity pool to remove.|

### addPool

Adds a liquidity pool to the list of pools to be minted into

```solidity
function addPool(uint256 index_, address pool_) external onlyRole("distributor_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|The index in the pools array to add the liquidity pool to.|
|`pool_`|`address`|The address of the liquidity pool to add.|

### setRewardRate

Sets the new OHM reward rate to mint and distribute per epoch

```solidity
function setRewardRate(uint256 newRewardRate_) external onlyRole("distributor_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newRewardRate_`|`uint256`|The new rate to set (9 decimals, i.e. 10_000_000 / 1_000_000_000 = 1%)|

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
