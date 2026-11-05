# IGracePeriod

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/interfaces/IGracePeriod.sol)

**Title:** IGracePeriod

The external interface of a contract that exposes a grace window measured from
a reference timestamp, along with the events and errors related to its
configuration and enforcement.

## Functions

<a id="setgraceperiod-uint32"></a>

### setGracePeriod

Updates the grace window to the supplied length in seconds.

```solidity
function setGracePeriod(uint32 period_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period_ | `uint32` | The new length of the grace window in seconds. |

<a id="graceperiod"></a>

### gracePeriod

Returns the configured grace window in seconds.

```solidity
function gracePeriod() external view returns (uint32 period);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period | `uint32` | The length of the grace window in seconds. |

## Events

### GracePeriodSet

Emitted when the grace window is configured.

```solidity
event GracePeriodSet(uint32 period);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| period | `uint32` | The new length of the grace window in seconds. |

## Errors

### GracePeriod_Expired

Thrown when an operation gated by the grace window is invoked after the
window has elapsed.

```solidity
error GracePeriod_Expired(uint48 deadline);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| deadline | `uint48` | The timestamp at which the grace window ended. |

### GracePeriod_ZeroPeriod

Thrown when the grace window is configured with a zero length, which would
otherwise prevent any grace-gated operation from succeeding.

```solidity
error GracePeriod_ZeroPeriod();
```

### GracePeriod_NotConfigurable

Thrown when a call to `setGracePeriod` is rejected because the
implementation has locked the grace window.

```solidity
error GracePeriod_NotConfigurable();
```
