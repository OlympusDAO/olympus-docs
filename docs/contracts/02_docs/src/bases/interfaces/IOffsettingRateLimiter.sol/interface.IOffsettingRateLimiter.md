# IOffsettingRateLimiter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/interfaces/IOffsettingRateLimiter.sol)

**Title:** IOffsettingRateLimiter

The external interface of a rate limiter that tracks the amount moved
between this contract and a remote endpoint, and offsets activity in one
direction against in-flight activity in the other.

## Functions

<a id="outratelimits-uint32"></a>

### outRateLimits

Returns the stored outbound rate limit state for a destination endpoint.

```solidity
function outRateLimits(
        uint32 dstEid_
    ) external view returns (uint256 inFlight, uint256 limit, uint32 window, uint48 lastUpdated);
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

<a id="inratelimits-uint32"></a>

### inRateLimits

Returns the stored inbound rate limit state for a source endpoint.

```solidity
function inRateLimits(
        uint32 srcEid_
    ) external view returns (uint256 inFlight, uint256 limit, uint32 window, uint48 lastUpdated);
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

<a id="sendable-uint32"></a>

### sendable

Returns the current outbound capacity for a destination endpoint, with
the in-flight amount decayed against the current timestamp.

```solidity
function sendable(uint32 dstEid_) external view returns (uint256 inFlight, uint256 available);
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

```solidity
function receivable(uint32 srcEid_) external view returns (uint256 inFlight, uint256 available);
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

## Events

### OutRateLimitsSet

Emitted when one or more outbound rate limits have been configured.

```solidity
event OutRateLimitsSet(RateLimitConfig[] configs);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs | `RateLimitConfig[]` | The configurations that have been applied, in the order in which<br/>they were applied. |

### InRateLimitsSet

Emitted when one or more inbound rate limits have been configured.

```solidity
event InRateLimitsSet(RateLimitConfig[] configs);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configs | `RateLimitConfig[]` | The configurations that have been applied, in the order in which<br/>they were applied. |

### OutboundInFlightCleared

Emitted when the outbound in-flight amount has been cleared for one or
more endpoints.

<i>

The corresponding inbound rate limits for the listed endpoints are not
affected by this operation.

</i>

```solidity
event OutboundInFlightCleared(uint32[] eids);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids | `uint32[]` | The endpoint identifiers whose outbound in-flight amount has been<br/>cleared. |

### InboundInFlightCleared

Emitted when the inbound in-flight amount has been cleared for one or
more endpoints.

<i>

The corresponding outbound rate limits for the listed endpoints are not
affected by this operation.

</i>

```solidity
event InboundInFlightCleared(uint32[] eids);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eids | `uint32[]` | The endpoint identifiers whose inbound in-flight amount has been<br/>cleared. |

## Errors

### RateLimitExceeded

Thrown when a flow would exceed the remaining capacity of a rate limit for a given direction.

```solidity
error RateLimitExceeded(uint256 requested, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requested | `uint256` | The amount that was attempted to be debited from the rate limit. |
| available | `uint256` | The remaining capacity of the rate limit at the current timestamp. |

## Structs

### RateLimit

The state of a rate limit for a single endpoint identifier and direction.

```solidity
struct RateLimit {
        uint256 inFlight;
        uint256 limit;
        uint32 window;
        uint48 lastUpdated;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The amount that has been recorded within the active window and<br/>has not yet decayed to zero. |
| limit | `uint256` | The maximum amount that may be in flight at any point. |
| window | `uint32` | The length in seconds of the sliding window over which the<br/>in-flight amount decays linearly from `limit` to zero. |
| lastUpdated | `uint48` | The timestamp of the most recent update applied to this rate<br/>limit, used as the starting point of the decay calculation. |

### RateLimitConfig

The configuration payload used to set a rate limit for a given endpoint.

<i>

A configuration with `limit` set to zero pauses the direction it
applies to, since no further capacity can be granted in that direction.

</i>

```solidity
struct RateLimitConfig {
        uint32 eid;
        uint256 limit;
        uint32 window;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid | `uint32` | The endpoint identifier the configuration applies to. |
| limit | `uint256` | The maximum amount that may be in flight at any point. |
| window | `uint32` | The length in seconds of the sliding window over which the<br/>in-flight amount decays linearly from `limit` to zero. |
