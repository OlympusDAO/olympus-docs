# IEnablerV2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/interfaces/IEnablerV2.sol)

**Inherits:** [IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

**Title:** IEnablerV2

The external interface of an enableable contract that augments `IEnabler`
with a per-transition event and a timestamp of the most recent transition.

<i>

The wire-level surface of `IEnabler` is preserved, so callers that target
the legacy interface can continue to invoke `enable` and `disable` and
observe `Enabled` and `Disabled` events without modification. The `Transition`
event is emitted alongside the legacy events on every successful transition,
and provides the caller, the direction, the calldata payload, and the
timestamp at which the transition was applied.

</i>

## Functions

<a id="lasttransitionat"></a>

### lastTransitionAt

Returns the timestamp of the most recent transition between the enabled and
disabled states.

```solidity
function lastTransitionAt() external view returns (uint48 at);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| at | `uint48` | The timestamp of the most recent transition, or zero before the first enable. |

## Events

### Transition

Emitted when the contract transitions between the enabled and disabled states.

<i>

The event is emitted in addition to the legacy `Enabled` and `Disabled` events,
so off-chain consumers may rely on either surface. The `data` field is the
raw calldata payload passed to `enable` or `disable`.

</i>

```solidity
event Transition(address indexed by, bool indexed enable, bytes data, uint48 at);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| by | `address` | The address that initiated the transition. |
| enable | `bool` | True when the transition is from disabled to enabled, false otherwise. |
| data | `bytes` | The calldata payload supplied to the transition entry point. |
| at | `uint48` | The timestamp at which the transition was applied. |
