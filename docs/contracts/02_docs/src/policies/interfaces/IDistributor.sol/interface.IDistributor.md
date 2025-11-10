# IDistributor

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/interfaces/IDistributor.sol)

## Functions

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

### staking

Getter function for the staking contract address.

```solidity
function staking() external view returns (IStaking);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`IStaking`|address The staking contract address.|

## Errors

### Distributor_NoRebaseOccurred

```solidity
error Distributor_NoRebaseOccurred();
```

### Distributor_OnlyStaking

```solidity
error Distributor_OnlyStaking();
```

### Distributor_NotUnlocked

```solidity
error Distributor_NotUnlocked();
```
