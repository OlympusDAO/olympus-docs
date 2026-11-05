# ZeroDistributor

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Distributor/ZeroDistributor.sol)

**Inherits:** [IDistributor](/main/contracts/docs/src/policies/interfaces/IDistributor.sol/interface.IDistributor)

## Constants

### staking

Getter function for the staking contract address.

```solidity
IStaking public immutable staking;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | address The staking contract address. |

## State Variables

### unlockRebase

```solidity
bool private unlockRebase;
```

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address staking_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| staking_ | `address` |  |

<a id="triggerrebase"></a>

### triggerRebase

Trigger 0 rebase via distributor. There is an error in Staking's stake function
which pulls forward part of the rebase for the next epoch. This path triggers a
rebase by calling unstake (which does not have the issue). The patch also
restricts distribute to only be able to be called from a tx originating in this
function.

```solidity
function triggerRebase() external;
```

<a id="distribute"></a>

### distribute

Endpoint must be available for Staking to call. Zero emission.

```solidity
function distribute() external;
```

<a id="retrievebounty"></a>

### retrieveBounty

Endpoint must be available for Staking to call. Zero emission.

```solidity
function retrieveBounty() external pure returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
