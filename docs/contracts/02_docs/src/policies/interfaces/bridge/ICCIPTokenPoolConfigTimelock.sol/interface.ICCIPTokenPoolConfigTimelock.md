# ICCIPTokenPoolConfigTimelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/bridge/ICCIPTokenPoolConfigTimelock.sol)

**Title:** ICCIPTokenPoolConfigTimelock

The interface of the timelock policy through which the bridge admin role queues
typed route, remote pool, allowlist and rate limit changes of a `CCIPTokenPoolConfig`
policy, for permissionless execution after a delay.

<i>

Every queued sub-action targets one function of the config policy and is validated at
queue time with the config policy's validation mirror of that function. Each
sub-action reserves the configuration domains it reads or writes and records their
state hashes, so that two unresolved changes of one domain cannot coexist and a change
cannot execute after the state it was queued against has moved.

</i>

The domains and their state hashes are:

- rate limits of a route: `isEnabled`, `capacity` and `rate` of both buckets, never
the fill level or the refill timestamp, together with the remote token of the
route;
- remote pools of a route: the number of accepted remote pools and the XOR of
`keccak256(remotePool)` over the raw bytes of each of them, together with the
remote token of the route;
- identity of a route: whether the route exists and its remote token;
- the pool-wide allowlist: whether the allowlist is enabled, the number of allowlisted
addresses and the XOR of `keccak256(abi.encode(member))` over each of them.

The remote token is part of every route domain, so a replacement of the remote token
moves the three hashes of the route together: an action queued against any domain of
the route reverts at execution after the remote token has changed.

The two set aggregates are independent of the order in which the pool returns the
members, which changes when an entry is removed from the underlying enumerable set.
Members are hashed before the XOR and the cardinality is part of the preimage: the
preimages are `abi.encode(REMOTE_POOLS_DOMAIN, chainSelector, count, aggregate,
remoteToken)` for the remote pools of a route and `abi.encode(ALLOWLIST_DOMAIN,
allowListEnabled, count, aggregate)` for the allowlist, where `remoteToken` is the raw
bytes the pool reports for the route. The XOR aggregate is not collision resistant against
members chosen by an adversary, since XOR is linear: two distinct sets of equal
cardinality whose hashed members XOR to the same value collide. It serves as a
detector of state drift between queueing and execution and relies on the pool storing
both sets as enumerable sets, so that `getRemotePools` and `getAllowList` return each
member exactly once and only the pool owner writes them.

`addChain`, `removeChain` and `setRemoteToken` reserve all three domains of their
route; `addRemotePool` and `removeRemotePool` reserve the remote pools domain;
`setChainRateLimits` reserves the rate limits domain; and `applyAllowListUpdates`
reserves the allowlist domain. Reserved domains are released only by execution or
cancellation, so an expired or invalidated action must be cancelled before its domains
can be queued again. An action that has not expired, whether still delayed or inside
its execution window, is cancellable by the admin role, the emergency role and its
proposer; an expired action is cancellable by any caller. Queueing and execution both
require the timelock and the config
policy to be enabled; an action whose config policy is disabled after queueing holds
its domains until it executes or is cancelled. Enabling and re-enabling the timelock
require the config policy to be an active policy of the timelock's kernel.

A reserved key is scoped to the config policy: for a route domain it is
`keccak256(abi.encode(config, keccak256(abi.encode(domain, chainSelector))))`, for the
allowlist `keccak256(abi.encode(config, ALLOWLIST_DOMAIN))`, with the domain constants
exposed below. `CCIPTokenPoolConfigKeyLib` derives these keys for the tooling that
reads `pendingActionId`.

The queue itself (`executeQueuedAction`, `cancelQueuedAction`, the stored actions,
`pendingActionId` and the other reservation views) is the `IConfigTimelockBatchQueue`
surface of the shared base, which the implementing contract exposes as a separate
interface next to this one; a caller holding this interface casts to it for those
functions, as it does to `IEnabler` for the lifecycle.

## Functions

<a id="config"></a>

### config

Returns the config policy that receives the queued actions.

```solidity
function config() external view returns (address config_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy address. |

<a id="min_timelock_delay"></a>

### MIN_TIMELOCK_DELAY

Returns the minimum accepted timelock delay, in seconds.

```solidity
function MIN_TIMELOCK_DELAY() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="max_timelock_delay"></a>

### MAX_TIMELOCK_DELAY

Returns the maximum accepted timelock delay, in seconds.

```solidity
function MAX_TIMELOCK_DELAY() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="execution_window"></a>

### EXECUTION_WINDOW

Returns the length of the execution window of a queued action, in seconds. An
action is executable at any block timestamp from its `executableAt` to its
`expiresAt`, which is `executableAt + EXECUTION_WINDOW`, both inclusive; it is
expired once the block timestamp is past `expiresAt`.

```solidity
function EXECUTION_WINDOW() external view returns (uint48);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

<a id="rate_limits_domain"></a>

### RATE_LIMITS_DOMAIN

Returns the domain constant of the rate limits of a route.

```solidity
function RATE_LIMITS_DOMAIN() external view returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="remote_pools_domain"></a>

### REMOTE_POOLS_DOMAIN

Returns the domain constant of the accepted remote pools of a route.

```solidity
function REMOTE_POOLS_DOMAIN() external view returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="route_identity_domain"></a>

### ROUTE_IDENTITY_DOMAIN

Returns the domain constant of the identity of a route.

```solidity
function ROUTE_IDENTITY_DOMAIN() external view returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="allowlist_domain"></a>

### ALLOWLIST_DOMAIN

Returns the domain constant of the pool-wide sender allowlist, which is also its
destination-local key.

```solidity
function ALLOWLIST_DOMAIN() external view returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="queueaddchain-icciptokenpooladmin-chainupdate"></a>

### queueAddChain

Queues an `addChain` call on the config policy. Intended to be callable only by
the bridge admin role while the timelock is enabled and named as config operator.

```solidity
function queueAddChain(
        ICCIPTokenPoolAdmin.ChainUpdate calldata update_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| update_ | `ICCIPTokenPoolAdmin.ChainUpdate` | The chain configuration to add. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queueremovechain-uint64"></a>

### queueRemoveChain

Queues a `removeChain` call on the config policy. Intended to be callable only by
the bridge admin role while the timelock is enabled and named as config operator.

```solidity
function queueRemoveChain(uint64 chainSelector_) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesetremotetoken-uint64-bytes"></a>

### queueSetRemoteToken

Queues a `setRemoteToken` call on the config policy. Intended to be callable only
by the bridge admin role while the timelock is enabled and named as config operator.

```solidity
function queueSetRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remoteToken_ | `bytes` | The new remote token address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queueaddremotepool-uint64-bytes"></a>

### queueAddRemotePool

Queues an `addRemotePool` call on the config policy. Intended to be callable only
by the bridge admin role while the timelock is enabled and named as config operator.

```solidity
function queueAddRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to add. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queueremoveremotepool-uint64-bytes"></a>

### queueRemoveRemotePool

Queues a `removeRemotePool` call on the config policy. Intended to be callable
only by the bridge admin role while the timelock is enabled and named as config
operator.

```solidity
function queueRemoveRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to remove. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queueapplyallowlistupdates-address-address"></a>

### queueApplyAllowListUpdates

Queues an `applyAllowListUpdates` call on the config policy. Intended to be
callable only by the bridge admin role while the timelock is enabled and named as
config operator.

```solidity
function queueApplyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes_ | `address[]` | The addresses to remove. |
| adds_ | `address[]` | The addresses to add. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesetchainratelimits-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### queueSetChainRateLimits

Queues a `setChainRateLimits` call on the config policy. Intended to be callable
only by the bridge admin role while the timelock is enabled and named as config
operator.

```solidity
function queueSetChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuebatch-itimelockbatchqueue-batchaction"></a>

### queueBatch

Queues a batch of config policy calls that executes atomically in array order.
Every sub-action must target the config policy with one of the supported
selectors and a canonically encoded payload. Intended to be callable only by the
bridge admin role while the timelock is enabled and named as config operator.

```solidity
function queueBatch(
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) external returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actions_ | `ITimelockBatchQueue.BatchAction[]` | The sub-actions to queue. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="settimelockdelay-uint48"></a>

### setTimelockDelay

Sets the delay applied to actions queued afterwards. Already queued actions keep
their stored timestamps. Intended to be callable only by the admin role while the
timelock is enabled.

```solidity
function setTimelockDelay(uint48 delay_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new delay, in seconds, within the accepted bounds. |

## Errors

### CCIPTokenPoolConfigTimelock_InvalidAddress

Thrown when a constructor argument is the zero address.

```solidity
error CCIPTokenPoolConfigTimelock_InvalidAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the invalid parameter. |

### CCIPTokenPoolConfigTimelock_InvalidConfig

Thrown when the config policy supplied at construction does not advertise the
`ICCIPTokenPoolConfig`, `IConfigOperator` and `IEnabler` interfaces through ERC165.

```solidity
error CCIPTokenPoolConfigTimelock_InvalidConfig(address config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `address` | The rejected config policy address. |

### CCIPTokenPoolConfigTimelock_KernelMismatch

Thrown when the config policy supplied at construction reports a kernel other
than the kernel of this policy.

```solidity
error CCIPTokenPoolConfigTimelock_KernelMismatch(address configKernel);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configKernel | `address` | The kernel reported by the config policy. |

### CCIPTokenPoolConfigTimelock_ConfigNotActive

Thrown when this policy is enabled or re-enabled while the config policy is not
an active policy of this policy's kernel.

```solidity
error CCIPTokenPoolConfigTimelock_ConfigNotActive(address config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `address` | The config policy address. |

### CCIPTokenPoolConfigTimelock_UnsupportedModuleVersion

Thrown when a configured module reports an unsupported version.

```solidity
error CCIPTokenPoolConfigTimelock_UnsupportedModuleVersion(
        bytes5 keycode,
        uint8 major,
        uint8 minor
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode | `bytes5` | The keycode of the module. |
| major | `uint8` | The major version reported by the module. |
| minor | `uint8` | The minor version reported by the module. |

### CCIPTokenPoolConfigTimelock_NotConfigOperator

Thrown when the config policy does not name this timelock as its config
operator.

```solidity
error CCIPTokenPoolConfigTimelock_NotConfigOperator(address configOperator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator | `address` | The config operator currently named by the config policy, or the<br/>zero address when none is set. |

### CCIPTokenPoolConfigTimelock_UnsupportedConfigKey

Thrown when a state hash is requested for a configuration key that no supported
action reserves.

```solidity
error CCIPTokenPoolConfigTimelock_UnsupportedConfigKey(bytes32 localKey);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| localKey | `bytes32` | The unsupported destination-local key. |
