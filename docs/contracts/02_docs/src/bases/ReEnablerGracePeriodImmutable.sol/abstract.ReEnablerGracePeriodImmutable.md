# ReEnablerGracePeriodImmutable

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/ReEnablerGracePeriodImmutable.sol)

**Inherits:** [ReEnablerGracePeriod](/main/contracts/docs/src/bases/ReEnablerGracePeriod.sol/abstract.ReEnablerGracePeriod)

**Title:** ReEnablerGracePeriodImmutable

An abstract extension of `ReEnablerGracePeriod` that locks the grace window
after construction.

<i>

`setGracePeriod` always reverts with `GracePeriod_NotConfigurable`. The
`_authorizeSetGracePeriod` hook is left abstract so that an inheriting contract
that re-opens the setter must define an authorisation rule consciously.

</i>

## Functions

<a id="constructor-uint32"></a>

### constructor

Forwards the initial grace window length to the parent constructor.

```solidity
constructor(uint32 period_) ReEnablerGracePeriod(period_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period_ | `uint32` | The grace window length in seconds. |

<a id="setgraceperiod-uint32"></a>

### setGracePeriod

The setter is gated by `givenEnabled`, so the grace window is fixed at the

value it held when the contract was last disabled and cannot be changed while

the contract is in the disabled state.

Reverts if:

- The contract is disabled.

- `_authorizeSetGracePeriod` rejects the caller.

- `period_` is zero.

<i>

The function delegates the caller authorization to
`_authorizeSetGracePeriod` and the value validation plus event emission to
`_setGracePeriod`. The function is declared `virtual` so that an
implementation that wishes to lock the window after construction can
override it and revert with `GracePeriod_NotConfigurable`; see
`ReEnablerGracePeriodImmutable` for the canonical lock.

</i>

```solidity
function setGracePeriod(uint32) public pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint32` | The new length of the grace window in seconds. |
