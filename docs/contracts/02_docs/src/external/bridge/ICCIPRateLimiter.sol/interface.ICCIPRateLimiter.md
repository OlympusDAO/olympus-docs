# ICCIPRateLimiter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/bridge/ICCIPRateLimiter.sol)

**Title:** ICCIPRateLimiter

The token bucket types, events and errors of the Chainlink CCIP `RateLimiter` library.

<i>

The struct layouts are identical to `RateLimiter.TokenBucket` and `RateLimiter.Config` of
Chainlink CCIP 1.6.0, so functions declared with these types encode to the same ABI and
the same selectors as the token pool functions that use the Chainlink types. Every amount
is expressed in the smallest unit of the pool token.

</i>

## Events

### TokensConsumed

Emitted when tokens are consumed from an enabled bucket.

```solidity
event TokensConsumed(uint256 tokens);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens | `uint256` | The number of tokens consumed. |

### ConfigChanged

Emitted when a bucket configuration is written.

```solidity
event ConfigChanged(Config config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `Config` | The configuration written. |

## Errors

### BucketOverfilled

Thrown when a bucket holds more tokens than its capacity.

```solidity
error BucketOverfilled();
```

### TokenMaxCapacityExceeded

Thrown when a request exceeds the capacity of the bucket.

```solidity
error TokenMaxCapacityExceeded(uint256 capacity, uint256 requested, address tokenAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| capacity | `uint256` | The capacity of the bucket. |
| requested | `uint256` | The number of tokens requested. |
| tokenAddress | `address` | The token of the bucket. |

### TokenRateLimitReached

Thrown when a request exceeds the tokens currently in the bucket.

```solidity
error TokenRateLimitReached(uint256 minWaitInSeconds, uint256 available, address tokenAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minWaitInSeconds | `uint256` | The number of seconds until the bucket holds enough tokens. |
| available | `uint256` | The number of tokens currently in the bucket. |
| tokenAddress | `address` | The token of the bucket. |

### InvalidRateLimitRate

Thrown when an enabled configuration has a zero rate or a rate that is not below
its capacity.

```solidity
error InvalidRateLimitRate(Config rateLimiterConfig);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimiterConfig | `Config` | The rejected configuration. |

### DisabledNonZeroRateLimit

Thrown when a disabled configuration has a non-zero capacity or rate.

```solidity
error DisabledNonZeroRateLimit(Config config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `Config` | The rejected configuration. |

## Structs

### TokenBucket

The live state of a token bucket.

```solidity
struct TokenBucket {
        uint128 tokens;
        uint32 lastUpdated;
        bool isEnabled;
        uint128 capacity;
        uint128 rate;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokens | `uint128` | The current number of tokens in the bucket. |
| lastUpdated | `uint32` | The timestamp of the last refill, in seconds. |
| isEnabled | `bool` | Whether the rate limiting is enabled. |
| capacity | `uint128` | The maximum number of tokens that the bucket can hold. |
| rate | `uint128` | The number of tokens per second that the bucket is refilled with. |

### Config

The configuration of a token bucket.

<i>

An enabled configuration requires `0 &lt; rate &lt; capacity`. A disabled configuration
requires `capacity == 0` and `rate == 0` and imposes no limit at all.

</i>

```solidity
struct Config {
        bool isEnabled;
        uint128 capacity;
        uint128 rate;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isEnabled | `bool` | Whether the rate limiting is enabled. |
| capacity | `uint128` | The maximum number of tokens that the bucket can hold. |
| rate | `uint128` | The number of tokens per second that the bucket is refilled with. |
