# OffsettingRateLimiter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/OffsettingRateLimiter.sol)

**Inherits:** [IOffsettingRateLimiter](/main/contracts/docs/src/bases/interfaces/IOffsettingRateLimiter.sol/interface.IOffsettingRateLimiter)

**Title:** OffsettingRateLimiter

An abstract rate limiter that maintains independent outbound and inbound
rate limits per endpoint, and offsets activity in one direction against
the in-flight amount of the other.

<i>

Each endpoint has two rate limits: outbound (`outRateLimits`) and
inbound (`inRateLimits`), whose in-flight amounts decay linearly
over the configured window. A flow debits its own side in full and
offsets the counterpart by reducing its in-flight with a floor at
zero; excess credit is dropped, not carried over.

</i>

This is not net accounting: the trailing leg of a round trip always
records its full amount, since the leading leg's in-flight has
already partially decayed by the time it is cancelled. A balanced
round trip therefore leaves residual in-flight equal to the trailing
leg, not zero.

Only internal mutators are exposed; an inheriting contract must gate
configuration and reset behind its own access control and invoke
`_outflow` / `_inflow` from the appropriate code paths.

## State Variables

### outRateLimits

Returns the stored outbound rate limit state for a destination endpoint.

<i>

The returned `inFlight` value is the raw stored amount and has not been
decayed against the current timestamp. Callers that require the current
effective capacity should use `sendable` instead.

</i>

```solidity
mapping(uint32 dstEid_ => RateLimit) public override outRateLimits;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The destination endpoint identifier. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The stored in-flight amount. |
| limit | `uint256` | The maximum amount that may be in flight at any point. |
| window | `uint32` | The length in seconds of the sliding window. |
| lastUpdated | `uint48` | The timestamp of the most recent update. |

### inRateLimits

Returns the stored inbound rate limit state for a source endpoint.

<i>

The returned `inFlight` value is the raw stored amount and has not been
decayed against the current timestamp. Callers that require the current
effective capacity should use `receivable` instead.

</i>

```solidity
mapping(uint32 srcEid_ => RateLimit) public override inRateLimits;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint identifier. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The stored in-flight amount. |
| limit | `uint256` | The maximum amount that may be in flight at any point. |
| window | `uint32` | The length in seconds of the sliding window. |
| lastUpdated | `uint48` | The timestamp of the most recent update. |

## Functions

<a id="sendable-uint32"></a>

### sendable

Returns the current outbound capacity for a destination endpoint, with
the in-flight amount decayed against the current timestamp.

<i>

When the configured window has fully elapsed since `lastUpdated`, or
when the configured window is zero, the returned `inFlight` is zero and
`available` is the full configured `limit`.

</i>

```solidity
function sendable(
        uint32 dstEid_
    ) external view virtual override returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The destination endpoint identifier. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be sent before the rate limit is<br/>exceeded. |

<a id="receivable-uint32"></a>

### receivable

Returns the current inbound capacity for a source endpoint, with the
in-flight amount decayed against the current timestamp.

<i>

When the configured window has fully elapsed since `lastUpdated`, or
when the configured window is zero, the returned `inFlight` is zero and
`available` is the full configured `limit`.

</i>

```solidity
function receivable(
        uint32 srcEid_
    ) external view virtual override returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint identifier. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be received before the rate limit<br/>is exceeded. |

<a id="_setoutratelimits-ratelimitconfig"></a>

### _setOutRateLimits

Configures the outbound rate limits for one or more destination
endpoints.

<i>

For each configuration, the existing outbound rate limit is
checkpointed against the current timestamp before the new `limit` and
`window` values are written, so the stored in-flight amount continues
to decay at the previous rate up to the moment of the change. The
in-flight amount itself is preserved across the configuration change.
The corresponding inbound rate limit is also checkpointed
(decayed-in-place with `lastUpdated` refreshed) by the same call, but
its `limit` and `window` are not modified.
Repeated entries for the same endpoint within the same call are
applied in order, so the last entry determines the final state.
This deviates from the typical convention elsewhere in the codebase
of reverting on duplicate inputs; here duplicates are accepted and
the trailing entry overrides the earlier ones.

</i>

Emits an `OutRateLimitsSet` event.

```solidity
function _setOutRateLimits(RateLimitConfig[] memory configs_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The outbound rate limit configurations to apply. |

<a id="_setinratelimits-ratelimitconfig"></a>

### _setInRateLimits

Configures the inbound rate limits for one or more source endpoints.

<i>

For each configuration, the existing inbound rate limit is
checkpointed against the current timestamp before the new `limit` and
`window` values are written, so the stored in-flight amount continues
to decay at the previous rate up to the moment of the change. The
in-flight amount itself is preserved across the configuration change.
The corresponding outbound rate limit is also checkpointed
(decayed-in-place with `lastUpdated` refreshed) by the same call, but
its `limit` and `window` are not modified.
Repeated entries for the same endpoint within the same call are
applied in order, so the last entry determines the final state.
This deviates from the typical convention elsewhere in the codebase
of reverting on duplicate inputs; here duplicates are accepted and
the trailing entry overrides the earlier ones.

</i>

Emits an `InRateLimitsSet` event.

```solidity
function _setInRateLimits(RateLimitConfig[] memory configs_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs_ | `RateLimitConfig[]` | The inbound rate limit configurations to apply. |

<a id="_applyconfigs-mapping-uint32-ratelimit-mapping-uint32-ratelimit-ratelimitconfig"></a>

### _applyConfigs

Applies a batch of rate limit configurations to a primary direction
and checkpoints the in-flight amount against the previous configuration.

<i>

The function calls `_settle` with a zero delta for each entry, which
decays the existing in-flight amount and refreshes `lastUpdated` to
the current timestamp before the new `limit` and `window` are written.
The counterpart rate limit is also checkpointed by the same call,
since `_settle` always touches both sides, even though no delta is
recorded.

</i>

```solidity
function _applyConfigs(
        mapping(uint32 => RateLimit) storage rlByEid_,
        mapping(uint32 => RateLimit) storage counterpartRlByEid_,
        RateLimitConfig[] memory configs_
    ) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rlByEid_ | `mapping(uint32 => RateLimit)` | The mapping that holds the rate limits being configured. |
| counterpartRlByEid_ | `mapping(uint32 => RateLimit)` | The mapping that holds the counterpart rate limits. |
| configs_ | `RateLimitConfig[]` | The rate limit configurations to apply. |

<a id="_clearoutboundinflight-uint32"></a>

### _clearOutboundInFlight

Clears the outbound in-flight amount for one or more destination
endpoints.

<i>

The in-flight amount is set to zero and `lastUpdated` is set to the
current timestamp for each endpoint. The configured `limit` and
`window` are not modified, and the corresponding inbound rate limits
are not affected.

</i>

Emits an `OutboundInFlightCleared` event.

```solidity
function _clearOutboundInFlight(uint32[] memory eids_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The destination endpoint identifiers to reset. |

<a id="_clearinboundinflight-uint32"></a>

### _clearInboundInFlight

Clears the inbound in-flight amount for one or more source endpoints.

<i>

The in-flight amount is set to zero and `lastUpdated` is set to the
current timestamp for each endpoint. The configured `limit` and
`window` are not modified, and the corresponding outbound rate limits
are not affected.

</i>

Emits an `InboundInFlightCleared` event.

```solidity
function _clearInboundInFlight(uint32[] memory eids_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids_ | `uint32[]` | The source endpoint identifiers to reset. |

<a id="_reset-mapping-uint32-ratelimit-uint32"></a>

### _reset

Clears the in-flight amount for a set of endpoints in the given
mapping.

<i>

For each endpoint, the in-flight amount is set to zero and
`lastUpdated` is set to the current timestamp. The `limit` and
`window` are preserved.

</i>

```solidity
function _reset(mapping(uint32 => RateLimit) storage rlByEid_, uint32[] memory eids_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rlByEid_ | `mapping(uint32 => RateLimit)` | The mapping that holds the rate limits to reset. |
| eids_ | `uint32[]` | The endpoint identifiers to reset. |

<a id="_outflow-uint32-uint256"></a>

### _outflow

Records an outbound flow of `amount_` to the destination endpoint and
credits the inbound rate limit for the same endpoint by the same
amount.

<i>

Reverts with `RateLimitExceeded` when `amount_` is greater than the
available outbound capacity at the current timestamp. The inbound
credit is clamped at zero, so any excess credit beyond the inbound
in-flight amount is dropped rather than carried over.

</i>

```solidity
function _outflow(uint32 dstEid_, uint256 amount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The destination endpoint identifier. |
| amount_ | `uint256` | The amount to record as an outbound flow. |

<a id="_inflow-uint32-uint256"></a>

### _inflow

Records an inbound flow of `amount_` from the source endpoint and
credits the outbound rate limit for the same endpoint by the same
amount.

<i>

Reverts with `RateLimitExceeded` when `amount_` is greater than the
available inbound capacity at the current timestamp. The outbound
credit is clamped at zero, so any excess credit beyond the outbound
in-flight amount is dropped rather than carried over.

</i>

```solidity
function _inflow(uint32 srcEid_, uint256 amount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint identifier. |
| amount_ | `uint256` | The amount to record as an inbound flow. |

<a id="_currentstate-uint256-uint256-uint32-uint48"></a>

### _currentState

Computes the decayed in-flight amount and the remaining capacity of a
rate limit at the current timestamp.

<i>

The decay is linear at a rate of `limit_ / window_` per second from
the stored `inFlight_` value at `lastUpdated_`. When the elapsed time
is at least `window_`, or when `window_` is zero, the function returns
a fully decayed result with `inFlight` equal to zero and `available`
equal to the full `limit_`. The early return also avoids a division by
zero when `window_` is zero.

</i>

Integer division of `decay` rounds DOWN, so the effective
`inFlight` is rounded UP and `available` is rounded DOWN relative
to the exact linear curve. This is the protocol-favourable
direction: a user can never observe more capacity than the true
linear decay would grant, and any sub-quantum slack is held back
rather than handed out early.

```solidity
function _currentState(
        uint256 inFlight_,
        uint256 limit_,
        uint32 window_,
        uint48 lastUpdated_
    ) internal view virtual returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight_ | `uint256` | The stored in-flight amount at the last update. |
| limit_ | `uint256` | The maximum amount that may be in flight at any point. |
| window_ | `uint32` | The length in seconds of the sliding window. |
| lastUpdated_ | `uint48` | The timestamp of the most recent update. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed in-flight amount at the current timestamp. |
| available | `uint256` | The remaining capacity at the current timestamp. |

<a id="_settle-ratelimit-ratelimit-uint256"></a>

### _settle

Settles a flow of `delta_` against a primary rate limit and credits
the counterpart rate limit by the same amount.

<i>

The function decays the primary rate limit, reverts with
`RateLimitExceeded` when `delta_` is greater than the remaining
capacity, and otherwise stores the new in-flight value as the decayed
amount plus `delta_` and refreshes the primary `lastUpdated` to the
current timestamp. The counterpart rate limit is then decayed and its
in-flight value is reduced by `delta_`, with a floor at zero, after
which its `lastUpdated` is also refreshed to the current timestamp.

</i>

When `delta_` is zero, the call serves as a checkpoint that captures
the current decayed in-flight amounts on both rate limits and
refreshes the `lastUpdated` of both to the current timestamp without
altering the effective remaining capacity.

```solidity
function _settle(
        RateLimit storage rl_,
        RateLimit storage counterpartRl_,
        uint256 delta_
    ) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rl_ | `RateLimit` | The storage reference to the primary rate limit (the one being debited by `delta_`). |
| counterpartRl_ | `RateLimit` | The storage reference to the counterpart rate limit (offset by `delta_`). |
| delta_ | `uint256` | The amount to record on the primary side (and to be credited to the counterpart rate limit). |

<a id="_suborzero-uint256-uint256"></a>

### _subOrZero

Returns `a_ - b_` when `a_` is greater than `b_`, and zero otherwise.

<i>

The subtraction is performed inside an `unchecked` block, since the
conditional guarantees that no underflow can occur.

</i>

```solidity
function _subOrZero(uint256 a_, uint256 b_) private pure returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| a_ | `uint256` | The minuend. |
| b_ | `uint256` | The subtrahend. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The non-negative difference, clamped at zero. |
