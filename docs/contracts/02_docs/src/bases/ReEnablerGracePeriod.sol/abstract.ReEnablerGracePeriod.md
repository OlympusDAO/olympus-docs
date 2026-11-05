# ReEnablerGracePeriod

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/ReEnablerGracePeriod.sol)

**Inherits:** [ReEnabler](/main/contracts/docs/src/bases/ReEnabler.sol/abstract.ReEnabler), [IGracePeriod](/main/contracts/docs/src/bases/interfaces/IGracePeriod.sol/interface.IGracePeriod)

**Title:** ReEnablerGracePeriod

An abstract extension of `ReEnabler` that gates `reEnable` on a grace window
measured from the most recent transition timestamp.

<i>

The contract exposes the configured grace window via `gracePeriod()` and wires
the grace check into the `_beforeReEnable` hook. Inheriting contracts that
override `_beforeReEnable` must call `super._beforeReEnable()` (or invoke
`_requireGrace()` themselves) to keep the gate.

</i>

The grace window restarts on every transition recorded by the underlying
`EnablerV2` state, so a fresh transition opens a new window of the same length.

The window is mutable: an authorized caller may update it after construction via
`setGracePeriod` while the contract is enabled. The contract is agnostic to the
access-control model used by the implementation, so an inheriting contract must
override `_authorizeSetGracePeriod` to revert when the caller is not permitted to
update the window. An implementation that prefers an immutable window may inherit
`ReEnablerGracePeriodImmutable` instead, which overrides `setGracePeriod` to
revert with the canonical `GracePeriod_NotConfigurable` error.

## State Variables

### gracePeriod

<i>

The length of the grace window in seconds. Initialized by the constructor and
updatable through `setGracePeriod` while the contract is enabled and when the
implementation authorizes the caller.

</i>

The value is the length of the window measured from
`IEnablerV2.lastTransitionAt`, so a fresh transition restarts the window at
its full length. The value is mutable through `setGracePeriod` unless the
implementation has locked the setter.

```solidity
uint32 public override gracePeriod;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint32` | The length of the grace window in seconds. |

## Functions

<a id="constructor-uint32"></a>

### constructor

Configures the initial grace window with the supplied length in seconds.

<i>

The constructor routes the value through `_setGracePeriod` so that the
zero-check and the `GracePeriodSet` event share a single code path with the
external setter.

</i>

Reverts if:

- `period_` is zero.

```solidity
constructor(uint32 period_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period_ | `uint32` | The initial length of the grace window in seconds. |

<a id="setgraceperiod-uint32"></a>

### setGracePeriod

<i>

The function delegates the caller authorization to
`_authorizeSetGracePeriod` and the value validation plus event emission to
`_setGracePeriod`. The function is declared `virtual` so that an
implementation that wishes to lock the window after construction can
override it and revert with `GracePeriod_NotConfigurable`; see
`ReEnablerGracePeriodImmutable` for the canonical lock.

</i>

The setter is gated by `givenEnabled`, so the grace window is fixed at the
value it held when the contract was last disabled and cannot be changed while
the contract is in the disabled state.

Reverts if:

- The contract is disabled.
- `_authorizeSetGracePeriod` rejects the caller.
- `period_` is zero.

```solidity
function setGracePeriod(uint32 period_) public virtual override givenEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period_ | `uint32` | The new length of the grace window in seconds. |

<a id="_beforereenable"></a>

### _beforeReEnable

The function is invoked from `reEnable` after `_authorizeReEnable` succeeds and

before `isEnabled` is updated. Implementations that share state-restoration

logic with `_beforeEnable` should factor the common path into a private helper

invoked from both hooks, since `reEnable` does not forward a calldata payload.

The default implementation is a no-op.

<i>

Asserts that the grace window since the last transition has not yet elapsed
via `_requireGrace`.

</i>

```solidity
function _beforeReEnable() internal virtual override;
```

<a id="_authorizesetgraceperiod"></a>

### _authorizeSetGracePeriod

Validates that the caller is permitted to update the grace window.

<i>

The function is invoked from `setGracePeriod` before any state mutation. The
base contract is agnostic to the access-control model, so the inheriting
contract must implement the hook and revert when the caller is not
authorized. An implementation that overrides `setGracePeriod` to always
revert is still required to provide an implementation; reverting is the
recommended default in that case.

</i>

Reverts if:

- The caller is not authorized to update the grace window.

```solidity
function _authorizeSetGracePeriod() internal view virtual;
```

<a id="_requiregrace"></a>

### _requireGrace

Asserts that the grace window measured from `lastTransitionAt` has not
yet elapsed.

<i>

The deadline is computed as `lastTransitionAt + gracePeriod`, and the check
passes when the current timestamp is less than or equal to that deadline.
The function is virtual so that an inheriting contract can extend or replace
the deadline calculation.

</i>

Reverts if:

- The current timestamp is strictly greater than the computed deadline.

```solidity
function _requireGrace() internal view virtual;
```

<a id="_setgraceperiod-uint32"></a>

### _setGracePeriod

Validates the supplied window length, writes it to storage, and emits the
`GracePeriodSet` event.

<i>

The helper centralizes the zero-check and the event so that the constructor
and the external setter share a single code path.

</i>

Reverts if:

- `period_` is zero.

```solidity
function _setGracePeriod(uint32 period_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period_ | `uint32` | The new length of the grace window in seconds. |

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
