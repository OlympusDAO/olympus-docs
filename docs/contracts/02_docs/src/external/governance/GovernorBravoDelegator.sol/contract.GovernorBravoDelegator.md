# GovernorBravoDelegator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/governance/GovernorBravoDelegator.sol)

**Inherits:** [GovernorBravoDelegatorStorage](/main/contracts/docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegatorStorage), [IGovernorBravoEventsAndErrors](/main/contracts/docs/src/external/governance/interfaces/IGovernorBravoEvents.sol/interface.IGovernorBravoEventsAndErrors)

## Functions

<a id="constructor-address-address-address-address-address-uint256-uint256-uint256-uint256"></a>

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timelock_ | `address` |  |
| gohm_ | `address` |  |
| kernel_ | `address` |  |
| vetoGuardian_ | `address` |  |
| implementation_ | `address` |  |
| votingPeriod_ | `uint256` |  |
| votingDelay_ | `uint256` |  |
| activationGracePeriod_ | `uint256` |  |
| proposalThreshold_ | `uint256` |  |

<a id="_setimplementation-address"></a>

### _setImplementation

Called by the admin to update the implementation of the delegator

```solidity
function _setImplementation(address implementation_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| implementation_ | `address` | The address of the new implementation for delegation |

<a id="delegateto-address-bytes"></a>

### delegateTo

Internal method to delegate execution to another contract

<i>

It returns to the external caller whatever the implementation returns or forwards reverts

</i>

```solidity
function delegateTo(address callee, bytes memory data) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| callee | `address` | The contract to delegatecall |
| data | `bytes` | The raw data to delegatecall |

<a id="fallback"></a>

### fallback

<i>

Delegates execution to an implementation contract.
It returns to the external caller whatever the implementation returns
or forwards reverts.

</i>

```solidity
fallback() external payable;
```
