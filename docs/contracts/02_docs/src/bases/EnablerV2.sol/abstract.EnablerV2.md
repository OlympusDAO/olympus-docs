# EnablerV2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/EnablerV2.sol)

**Inherits:** [IEnablerV2](/main/contracts/docs/src/bases/interfaces/IEnablerV2.sol/interface.IEnablerV2), ERC165

**Title:** EnablerV2

An abstract base contract that implements `IEnablerV2` and exposes
authorization and lifecycle hooks for inheriting contracts.

<i>

The contract is agnostic to the access control model used by the
implementation. Inheriting contracts must override `_authorizeEnable`
and `_authorizeDisable` to revert when the caller is not permitted to
perform the requested transition, and may override `_beforeEnable` and
`_beforeDisable` to perform implementation-specific state changes
alongside the transition.

</i>

The legacy `IEnabler` surface is preserved: `enable` and `disable`
retain their selectors and payload semantics, and the `Enabled` and
`Disabled` events are emitted in addition to the new `Transition` event
on every successful transition. Storage layout is intentionally compact:
`isEnabled` and `lastTransitionAt` share a single slot.

## State Variables

### isEnabled

Returns true if the contract is enabled

<i>

The flag is initialized to false at construction time, so a freshly
deployed contract always starts in the disabled state and must be
explicitly enabled before its gated functionality becomes available.

</i>

```solidity
bool public override isEnabled;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | True if the contract is enabled, false otherwise |

### lastTransitionAt

Returns the timestamp of the most recent transition between the enabled and
disabled states.

<i>

The value remains zero until the first successful `enable`, after
which it tracks the timestamp of the most recent transition.
The field is packed into the same storage slot as `isEnabled`.

</i>

```solidity
uint48 public override lastTransitionAt;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` | The timestamp of the most recent transition, or zero before the first enable. |

## Functions

<a id="enable-bytes"></a>

### enable

<i>

On success, the contract is moved to the enabled state,
`lastTransitionAt` is updated to the current timestamp, and both
the legacy `Enabled` event and the `Transition` event are emitted.

</i>

Reverts if:

- The contract is currently enabled.
- `_authorizeEnable` rejects the caller.
- `_beforeEnable` reverts.

```solidity
function enable(bytes calldata data_) public virtual override givenDisabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | Optional data to pass to a custom enable function |

<a id="disable-bytes"></a>

### disable

<i>

On success, the contract is moved to the disabled state,
`lastTransitionAt` is updated to the current timestamp, and both
the legacy `Disabled` event and the `Transition` event are emitted.

</i>

Reverts if:

- The contract is currently disabled.
- `_authorizeDisable` rejects the caller.
- `_beforeDisable` reverts.

```solidity
function disable(bytes calldata data_) public virtual override givenEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | Optional data to pass to a custom disable function |

<a id="_authorizeenable-bytes"></a>

### _authorizeEnable

Validates that the caller is permitted to enable the contract.

<i>

The function is invoked from `enable` before any state mutation.
The `data_` payload is forwarded unchanged so that authorization
may depend on the contents of the call.

</i>

Reverts if:

- The caller is not authorized to perform the enable.

```solidity
function _authorizeEnable(bytes calldata data_) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | The calldata payload passed to `enable`. |

<a id="_authorizedisable-bytes"></a>

### _authorizeDisable

Validates that the caller is permitted to disable the contract.

<i>

The function is invoked from `disable` before any state mutation.
The `data_` payload is forwarded unchanged so that authorization
may depend on the contents of the call.

</i>

Reverts if:

- The caller is not authorized to perform the disable.

```solidity
function _authorizeDisable(bytes calldata data_) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | The calldata payload passed to `disable`. |

<a id="_beforeenable-bytes"></a>

### _beforeEnable

Performs implementation-specific state changes that must run
immediately before the contract is moved to the enabled state.

<i>

The function is invoked from `enable` after `_authorizeEnable`
succeeds and before `isEnabled` is updated. The default
implementation is a no-op.

</i>

```solidity
function _beforeEnable(bytes calldata data_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | The calldata payload passed to `enable`. |

<a id="_beforedisable-bytes"></a>

### _beforeDisable

Performs implementation-specific state changes that must run
immediately before the contract is moved to the disabled state.

<i>

The function is invoked from `disable` after `_authorizeDisable`
succeeds and before `isEnabled` is updated. The default
implementation is a no-op.

</i>

```solidity
function _beforeDisable(bytes calldata data_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| data_ | `bytes` | The calldata payload passed to `disable`. |

<a id="_requireenabled"></a>

### _requireEnabled

Asserts that the contract is currently enabled.

<i>

The check is exposed as a function so that inheriting contracts
can compose it without using a modifier.

</i>

Reverts if:

- The contract is currently disabled.

```solidity
function _requireEnabled() internal view;
```

<a id="givenenabled"></a>

### givenEnabled

Modifier that reverts when the contract is not currently enabled.

```solidity
modifier givenEnabled();
```

<a id="_requiredisabled"></a>

### _requireDisabled

Asserts that the contract is currently disabled.

<i>

The check is exposed as a function so that inheriting contracts
can compose it without using a modifier.

</i>

Reverts if:

- The contract is currently enabled.

```solidity
function _requireDisabled() internal view;
```

<a id="givendisabled"></a>

### givenDisabled

Modifier that reverts when the contract is currently enabled.

```solidity
modifier givenDisabled();
```

<a id="_getblocktimestamp"></a>

### _getBlockTimestamp

Returns the current block timestamp narrowed to `uint48`.

<i>

The function is exposed as a virtual hook so that test doubles can
override the source of time without modifying the implementation.

</i>

```solidity
function _getBlockTimestamp() internal view virtual returns (uint48 timestamp);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| timestamp | `uint48` | The current block timestamp. |

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

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| interfaceId_ | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |
