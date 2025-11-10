# ZeroDistributor

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/Distributor/ZeroDistributor.sol)

**Inherits:**
[IDistributor](/main/contracts/docs/src/policies/interfaces/IDistributor.sol/interface.IDistributor)

## State Variables

### staking

```solidity
IStaking public immutable staking;
```

### unlockRebase

```solidity
bool private unlockRebase;
```

## Functions

### constructor

```solidity
constructor(address staking_);
```

### triggerRebase

Trigger 0 rebase via distributor. There is an error in Staking's stake function
which pulls forward part of the rebase for the next epoch. This path triggers a
rebase by calling unstake (which does not have the issue). The patch also
restricts distribute to only be able to be called from a tx originating in this
function.

```solidity
function triggerRebase() external;
```

### distribute

Endpoint must be available for Staking to call. Zero emission.

```solidity
function distribute() external;
```

### retrieveBounty

Endpoint must be available for Staking to call. Zero emission.

```solidity
function retrieveBounty() external pure returns (uint256);
```
