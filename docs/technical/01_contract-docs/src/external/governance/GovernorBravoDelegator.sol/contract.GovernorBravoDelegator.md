# GovernorBravoDelegator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/governance/GovernorBravoDelegator.sol)

**Inherits:**
[GovernorBravoDelegatorStorage](/main/technical/contract-docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegatorStorage), [IGovernorBravoEventsAndErrors](/main/technical/contract-docs/src/external/governance/interfaces/IGovernorBravoEvents.sol/interface.IGovernorBravoEventsAndErrors)

## Functions

### constructor

```solidity
constructor(
    address timelock_,
    address gohm_,
    address kernel_,
    address vetoGuardian_,
    address implementation_,
    uint256 votingPeriod_,
    uint256 votingDelay_,
    uint256 activationGracePeriod_,
    uint256 proposalThreshold_
);
```

### _setImplementation

Called by the admin to update the implementation of the delegator

```solidity
function _setImplementation(address implementation_) public;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation_`|`address`|The address of the new implementation for delegation|

### delegateTo

Internal method to delegate execution to another contract

*It returns to the external caller whatever the implementation returns or forwards reverts*

```solidity
function delegateTo(address callee, bytes memory data) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`callee`|`address`|The contract to delegatecall|
|`data`|`bytes`|The raw data to delegatecall|

### fallback

*Delegates execution to an implementation contract.
It returns to the external caller whatever the implementation returns
or forwards reverts.*

```solidity
fallback() external payable;
```
