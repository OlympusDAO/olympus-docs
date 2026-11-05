# PolicyReEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/PolicyReEnabler.sol)

**Inherits:** [ReEnabler](/main/contracts/docs/src/bases/ReEnabler.sol/abstract.ReEnabler), [PolicyEnablerV2](/main/contracts/docs/src/policies/utils/PolicyEnablerV2.sol/abstract.PolicyEnablerV2)

**Title:** PolicyReEnabler

An abstract policy mix-in that combines `PolicyEnablerV2` with the
parameterless re-enable extension `ReEnabler` and restricts the
re-enable entry point to the manager role.

<i>

The mix-in is intended for policies that should allow a manager to
return the contract to the enabled state after a disable
without supplying the calldata payload that the original `enable`
would require. The admin role is deliberately not granted access to
`reEnable`, since an admin caller can always invoke the standard
`enable` entry point with the appropriate payload.

</i>

The mix-in does not bound the number of times that `reEnable` may be
invoked across the lifetime of the contract, and does not bound the
re-enable to a window that follows a `disable`.

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="_authorizereenable"></a>

### _authorizeReEnable

The function is invoked from `reEnable` after the state checks pass and before

any state mutation.

Reverts if:

- The caller is not authorized to perform the re-enable.

<i>

Reverts if:

- The caller does not hold the manager role.

</i>

```solidity
function _authorizeReEnable() internal view override onlyManagerRole;
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

The override resolves the diamond between `ReEnabler` and
`PolicyEnablerV2` and forwards the lookup through the linearized
base chain, which advertises `IEnablerV2`, `IReEnabler`,
and the legacy `IEnabler`.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(EnablerV2, ReEnabler) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
