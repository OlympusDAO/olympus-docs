# ReEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/ReEnabler.sol)

**Inherits:** [IReEnabler](/main/contracts/docs/src/bases/interfaces/IReEnabler.sol/interface.IReEnabler), [EnablerV2](/main/contracts/docs/src/bases/EnablerV2.sol/abstract.EnablerV2)

**Title:** ReEnabler

An abstract extension of `EnablerV2` that adds a parameterless `reEnable` entry
point intended for callers that should be able to return the contract to the
enabled state without the calldata payload required by the standard `enable`.

<i>

The extension is intended to allow a caller distinct from the principal enabler,
such as a manager that does not hold the admin role, to return the contract to
the enabled state after a `disable` without supplying the calldata payload that
the original `enable` would require. The extension is therefore only meaningful
once the contract has been enabled at least once through the standard
`IEnabler.enable` entry point.

</i>

Inheriting contracts must override `_authorizeReEnable` to revert when the caller
is not permitted to perform the re-enable.

A successful re-enable updates `lastTransitionAt` to the current timestamp and
emits both the legacy `Enabled` event and a `Transition` event with an empty
`data` field, mirroring the behavior of `enable` aside from the absent payload.

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="reenable"></a>

### reEnable

<i>

The "never been enabled" check uses `lastTransitionAt`, which is zero before the
first successful `enable`. On success, the contract is moved to the enabled
state, `lastTransitionAt` is updated to the current timestamp, and both the
legacy `Enabled` event and a `Transition` event with an empty `data` field are
emitted.

</i>

Reverts if:

- The contract is currently enabled.
- The contract has never been enabled (`lastTransitionAt` is zero).
- `_authorizeReEnable` rejects the caller.
- `_beforeReEnable` reverts.

```solidity
function reEnable() public virtual override givenDisabled;
```

<a id="_authorizereenable"></a>

### _authorizeReEnable

<i>

Validates that the caller is permitted to re-enable the contract.

</i>

The function is invoked from `reEnable` after the state checks pass and before
any state mutation.

Reverts if:

- The caller is not authorized to perform the re-enable.

```solidity
function _authorizeReEnable() internal view virtual;
```

<a id="_beforereenable"></a>

### _beforeReEnable

<i>

Performs implementation-specific state changes that must run immediately
before the contract is moved back to the enabled state.

</i>

The function is invoked from `reEnable` after `_authorizeReEnable` succeeds and
before `isEnabled` is updated. Implementations that share state-restoration
logic with `_beforeEnable` should factor the common path into a private helper
invoked from both hooks, since `reEnable` does not forward a calldata payload.
The default implementation is a no-op.

```solidity
function _beforeReEnable() internal virtual;
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

The contract advertises support for `IEnablerV2`, the legacy
`IEnabler`, and any interface advertised by the parent
`ERC165` implementation. Extension mixins are expected to
override this function and add their own interface identifiers.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
