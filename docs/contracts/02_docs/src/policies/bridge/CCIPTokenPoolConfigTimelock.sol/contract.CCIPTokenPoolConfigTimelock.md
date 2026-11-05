# CCIPTokenPoolConfigTimelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/CCIPTokenPoolConfigTimelock.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [ReEnablerGracePeriod](/main/contracts/docs/src/bases/ReEnablerGracePeriod.sol/abstract.ReEnablerGracePeriod), [PolicyEnablerV2](/main/contracts/docs/src/policies/utils/PolicyEnablerV2.sol/abstract.PolicyEnablerV2), [ConfigTimelockBatchQueue](/main/contracts/docs/src/policies/utils/ConfigTimelockBatchQueue.sol/abstract.ConfigTimelockBatchQueue), [ICCIPTokenPoolConfigTimelock](/main/contracts/docs/src/policies/interfaces/bridge/ICCIPTokenPoolConfigTimelock.sol/interface.ICCIPTokenPoolConfigTimelock), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** CCIPTokenPoolConfigTimelock

Timelock policy through which the bridge admin role queues typed route, remote pool,
allowlist and rate limit changes of a `CCIPTokenPoolConfig` policy.

<i>

The config policy address is fixed at construction and must advertise
`ICCIPTokenPoolConfig`, `IConfigOperator` and `IEnabler` through ERC165 and belong to
the same kernel as this policy. The token pool whose state is hashed is read from the
config policy at construction and is fixed for the lifetime of that policy. Enabling and
re-enabling this policy require the config policy to be an active policy of that kernel.

</i>

Queueing requires this policy and the config policy to be enabled, the caller to hold
the bridge admin role and the config policy to name this timelock as its config
operator. Every sub-action must target the config policy with a supported selector
and a payload whose canonical re-encoding equals the stored bytes, and must pass the
config policy's validation mirror of the targeted function. Execution is
permissionless at any block timestamp from `executableAt` to `expiresAt`, both
inclusive, and requires this policy and the config policy to be enabled and this
timelock to still be the config operator; the shared base then checks the reserved
keys and state hashes before each dispatch.
The domains and keys are those of `CCIPTokenPoolConfigKeyLib`, scoped to the config
policy; tooling derives the key of a reservation from the same library.
An action whose config policy is disabled after queueing holds its configuration
keys until it is executed once the config policy is enabled again, or until it is
cancelled; so does an action whose dispatch reverts because the config
policy no longer owns the pool, or whose execution this timelock rejects because the
config policy names another config operator or none. Cancellation is available
whether or not this policy is enabled: to the admin role, the emergency role and the
proposer of the action while the action has not expired, and to any caller once it
has.

`enable` and `setTimelockDelay` are restricted to the admin role, `disable` to the
emergency or admin role, `reEnable` to the bridge admin role within the grace window,
and `setGracePeriod` to the admin role while enabled.

## Constants

### MIN_TIMELOCK_DELAY

Returns the minimum accepted timelock delay, in seconds.

```solidity
uint48 public constant override MIN_TIMELOCK_DELAY = 1 days;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

### MAX_TIMELOCK_DELAY

Returns the maximum accepted timelock delay, in seconds.

```solidity
uint48 public constant override MAX_TIMELOCK_DELAY = 30 days;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

### EXECUTION_WINDOW

Returns the length of the execution window of a queued action, in seconds. An
action is executable at any block timestamp from its `executableAt` to its
`expiresAt`, which is `executableAt + EXECUTION_WINDOW`, both inclusive; it is
expired once the block timestamp is past `expiresAt`.

```solidity
uint48 public constant override EXECUTION_WINDOW = 3 days;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

### _MAX_CONFIG_KEYS_PER_BATCH

The maximum number of configuration keys that one batch may reserve.

<i>

A route contributes three keys and the allowlist one.

</i>

```solidity
uint256 internal constant _MAX_CONFIG_KEYS_PER_BATCH = 24;
```

### _CONFIG_INTERFACE_COUNT

The number of interfaces the constructor requires the config policy to
advertise: `ICCIPTokenPoolConfig`, `IConfigOperator` and `IEnabler`.

```solidity
uint256 internal constant _CONFIG_INTERFACE_COUNT = 3;
```

### _ROUTE_DOMAIN_COUNT

The number of configuration domains of one route: rate limits, remote pools and
route identity.

```solidity
uint256 internal constant _ROUTE_DOMAIN_COUNT = 3;
```

### _ROLES_KEYCODE

The keycode of the ROLES module this policy depends on.

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES";
```

### _CONFIG

The config policy that receives the queued actions.

```solidity
ICCIPTokenPoolConfig internal immutable _CONFIG;
```

### _POOL

The token pool owned by the config policy, whose state is hashed.

```solidity
ICCIPTokenPoolAdmin internal immutable _POOL;
```

## Functions

<a id="constructor-kernel-address-uint48-uint32"></a>

### constructor

Deploys the config timelock for one config policy.

<i>

The policy starts disabled. It becomes usable once the config policy names it as
config operator.

</i>

Reverts if:

- `config_` is the zero address.
- `config_` does not advertise `ICCIPTokenPoolConfig`, `IConfigOperator` and
`IEnabler` through ERC165.
- `config_` reports a kernel other than `kernel_`.
- `initialTimelockDelay_` is outside `[MIN_TIMELOCK_DELAY, MAX_TIMELOCK_DELAY]`.
- `gracePeriod_` is zero.

```solidity
constructor(
        Kernel kernel_,
        address config_,
        uint48 initialTimelockDelay_,
        uint32 gracePeriod_
    )
        Policy(kernel_)
        ReEnablerGracePeriod(gracePeriod_)
        ConfigTimelockBatchQueue(initialTimelockDelay_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | The kernel of the policy. |
| config_ | `address` | The config policy that receives the queued actions. |
| initialTimelockDelay_ | `uint48` | The initial timelock delay, in seconds. |
| gracePeriod_ | `uint32` | The length of the re-enable grace window, in seconds. |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

<i>

Reverts if the installed ROLES module major version is not 1
(`CCIPTokenPoolConfigTimelock_UnsupportedModuleVersion`, naming the keycode and the
version read).

</i>

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

<i>

This policy does not request module permissions.

</i>

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="config"></a>

### config

Returns the config policy that receives the queued actions.

```solidity
function config() external view override returns (address config_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `address` | The config policy address. |

<a id="rate_limits_domain"></a>

### RATE_LIMITS_DOMAIN

Returns the domain constant of the rate limits of a route.

```solidity
function RATE_LIMITS_DOMAIN() external pure override returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="remote_pools_domain"></a>

### REMOTE_POOLS_DOMAIN

Returns the domain constant of the accepted remote pools of a route.

```solidity
function REMOTE_POOLS_DOMAIN() external pure override returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="route_identity_domain"></a>

### ROUTE_IDENTITY_DOMAIN

Returns the domain constant of the identity of a route.

```solidity
function ROUTE_IDENTITY_DOMAIN() external pure override returns (bytes32 domain);
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
function ALLOWLIST_DOMAIN() external pure override returns (bytes32 domain);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| domain | `bytes32` | The domain constant. |

<a id="queueaddchain-icciptokenpooladmin-chainupdate"></a>

### queueAddChain

Queues an `addChain` call on the config policy. Intended to be callable only by
the bridge admin role while the timelock is enabled and named as config operator.

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateAddChain` of the config policy rejects `update_`.
- Any of the three route domains of `update_.remoteChainSelector` is reserved by
an unresolved action (`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueAddChain(
        ICCIPTokenPoolAdmin.ChainUpdate calldata update_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateRemoveChain` of the config policy rejects `chainSelector_`.
- Any of the three route domains of `chainSelector_` is reserved by an unresolved
action (`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueRemoveChain(uint64 chainSelector_) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateSetRemoteToken` of the config policy rejects the arguments.
- Any of the three route domains of `chainSelector_` is reserved by an unresolved
action (`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueSetRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateAddRemotePool` of the config policy rejects the arguments.
- The remote pools domain of `chainSelector_` is reserved by an unresolved action
(`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueAddRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateRemoveRemotePool` of the config policy rejects the arguments.
- The remote pools domain of `chainSelector_` is reserved by an unresolved action
(`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueRemoveRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateApplyAllowListUpdates` of the config policy rejects the arguments.
- The allowlist domain is reserved by an unresolved action
(`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueApplyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- `validateSetChainRateLimits` of the config policy rejects the arguments.
- The rate limits domain of `chainSelector_` is reserved by an unresolved action
(`IConfigTimelockBatchQueue_ConfigKeyPending`).

</i>

```solidity
function queueSetChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external override returns (uint64 actionId);
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

<i>

Reverts if:

- This policy is disabled.
- The config policy is disabled.
- The caller does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.
- The batch is empty (`ITimelockBatchQueue_BatchEmpty`) or holds more than the
maximum number of sub-actions (`ITimelockBatchQueue_BatchTooLarge`).
- A sub-action does not target the config policy, uses an unsupported selector or
carries a payload whose canonical re-encoding differs from the stored bytes
(`ITimelockBatchQueue_ActionInvalid`).
- A payload cannot be decoded with the parameter types of its selector; the
decoding revert is propagated as is.
- The config policy's validation mirror rejects a sub-action.
- Two sub-actions reserve the same domain, or a domain is reserved by an unresolved
action (`IConfigTimelockBatchQueue_ConfigKeyPending`).
- The batch reserves more than the maximum number of configuration keys
(`IConfigTimelockBatchQueue_ConfigKeysTooMany`).

</i>

```solidity
function queueBatch(
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) external override returns (uint64 actionId);
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

<i>

Setting the current value writes and emits.

</i>

Reverts if:

- This policy is disabled.
- The caller does not hold the admin role.
- `delay_` is outside `[MIN_TIMELOCK_DELAY, MAX_TIMELOCK_DELAY]`
(`ITimelockBatchQueue_TimelockDelayInvalid`).

```solidity
function setTimelockDelay(uint48 delay_) external override givenEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new delay, in seconds, within the accepted bounds. |

<a id="_validateconfigqueue-address"></a>

### _validateConfigQueue

Validates queue-wide authorization and lifecycle requirements.

<i>

Reverts if:

- This policy is disabled (`NotEnabled`).
- The config policy is disabled (`NotEnabled`).
- `caller_` does not hold the bridge admin role.
- The config policy does not name this timelock as its config operator.

</i>

```solidity
function _validateConfigQueue(address caller_) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | Account queueing the batch. |

<a id="_validateconfigsubaction-address-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _validateConfigSubAction

<i>

The payload is decoded with the parameter types of the targeted config function and
re-encoded; the re-encoding must equal the stored payload. The decoded arguments are
then passed to the config policy's validation mirror of that function.

</i>

Reverts if:

- The target is not the config policy (`ITimelockBatchQueue_ActionInvalid`).
- The selector is not one of the supported config functions
(`ITimelockBatchQueue_ActionInvalid`).
- The payload cannot be decoded with the parameter types of the selector; the
decoding revert is propagated as is.
- The canonical re-encoding of the decoded payload differs from the stored bytes
(`ITimelockBatchQueue_ActionInvalid`).
- The validation mirror of the targeted function rejects the decoded arguments.

```solidity
function _validateConfigSubAction(
        address,
        uint64,
        uint256,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` | Account queueing the batch. |
| _ | `uint64` | Action ID reserved for the batch. |
| _ | `uint256` | Position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | Sub-action to validate. |

<a id="_configdestination-itimelockbatchqueue-batchaction"></a>

### _configDestination

Selects the destination that namespaces this sub-action's configuration keys.

<i>

The config policy is the destination of every sub-action.

</i>

```solidity
function _configDestination(
        ITimelockBatchQueue.BatchAction memory
    ) internal view override returns (address destination);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `ITimelockBatchQueue.BatchAction` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| destination | `address` |  |

<a id="_configkeys-itimelockbatchqueue-batchaction"></a>

### _configKeys

<i>

The local keys of `CCIPTokenPoolConfigKeyLib`: route domains are keyed by
`keccak256(abi.encode(domain, chainSelector))`, the allowlist domain by
`ALLOWLIST_DOMAIN` itself.

</i>

Reverts if:

- The selector is not one of the supported config functions
(`ITimelockBatchQueue_ActionInvalid`).

```solidity
function _configKeys(
        ITimelockBatchQueue.BatchAction memory action_
    ) internal pure override returns (bytes32[] memory keys);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keys | `bytes32[]` |  |

<a id="_currentconfigstatehash-uint64-uint256-bytes32-itimelockbatchqueue-batchaction"></a>

### _currentConfigStateHash

<i>

The hash preimages are:

- rate limits: `abi.encode(RATE_LIMITS_DOMAIN, chainSelector, outbound.isEnabled,
outbound.capacity, outbound.rate, inbound.isEnabled, inbound.capacity,
inbound.rate, remoteToken)`;
- remote pools: `abi.encode(REMOTE_POOLS_DOMAIN, chainSelector, count, aggregate,
remoteToken)`, where `count` is the number of accepted remote pools and
`aggregate` is the XOR of `keccak256(remotePool)` over the raw bytes of every
accepted remote pool;
- route identity: `abi.encode(ROUTE_IDENTITY_DOMAIN, chainSelector, isSupported,
remoteToken)`;
- allowlist: `abi.encode(ALLOWLIST_DOMAIN, allowListEnabled, count, aggregate)`,
where `count` is the number of allowlisted addresses and `aggregate` is the XOR of
`keccak256(abi.encode(member))` over every allowlisted address;

</i>

where `remoteToken` is the raw bytes of the remote token the pool reports for the
route. The remote token is part of every route domain, so a replacement of the
remote token moves the three hashes of the route together.

The two set aggregates are independent of the order in which the pool returns the
members, which changes when an entry is removed from the underlying enumerable set,
and are computed in one pass over the returned array. Members are hashed before
the XOR and the cardinality is part of the preimage. The XOR aggregate is not
collision resistant against members chosen by an adversary, since XOR is linear: two
distinct sets of equal cardinality whose hashed members XOR to the same value collide.
It serves as a detector of state drift between queueing and execution and relies on
the pool storing both sets as enumerable sets, so that `getRemotePools` and
`getAllowList` return each member exactly once and only the pool owner writes them.

Reverts if:

- `key_` is not one of the keys that `_configKeys` returns for `action_`
(`CCIPTokenPoolConfigTimelock_UnsupportedConfigKey`).

```solidity
function _currentConfigStateHash(
        uint64,
        uint256,
        bytes32 key_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal view override returns (bytes32 stateHash);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint64` | ID of the queued action. |
| _ | `uint256` | Position of the sub-action within the batch. |
| key_ | `bytes32` | Destination-local configuration key being guarded. |
| action_ | `ITimelockBatchQueue.BatchAction` | Sub-action whose live configuration state is hashed. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | Canonical hash of the guarded live state. |

<a id="_executeconfigsubaction-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _executeConfigSubAction

<i>

Dispatches the sub-action as a typed call of the config policy function selected at
queue time, with the arguments decoded from the stored payload. A revert of the
config policy reverts the whole batch.

</i>

Reverts if:

- The selector is not one of the supported config functions
(`ITimelockBatchQueue_ActionInvalid`).
- The config policy reverts the dispatched call.

```solidity
function _executeConfigSubAction(
        uint64,
        uint256,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint64` |  |
| _ | `uint256` |  |
| action_ | `ITimelockBatchQueue.BatchAction` |  |

<a id="_maxconfigkeysperbatch"></a>

### _maxConfigKeysPerBatch

Maximum aggregate number of configuration keys a batch may reserve.

<i>

Defaults to the maximum number of sub-actions. Products supporting composite
multi-domain sub-actions should override this batch-wide bound.

</i>

```solidity
function _maxConfigKeysPerBatch() internal pure override returns (uint256 maximum);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maximum | `uint256` |  |

<a id="_validateexecution-address-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateExecution

<i>

Execution is permissionless. The delay that elapses while this policy is disabled
still counts, so an action can become executable as soon as the policy is
re-enabled. Queued actions are not cleared by a disable, by a rotation or revocation
of the config operator or by a transfer of the pool ownership: after
`setConfigOperator` names another contract or the zero address this hook reverts
with `CCIPTokenPoolConfigTimelock_NotConfigOperator`, and after the config policy loses
the ownership of the pool every dispatch reverts inside the pool
(`OnlyCallableByOwner`, or `Unauthorized` for `setChainRateLimits`); in both cases
the action keeps its configuration keys until it is cancelled.

</i>

Reverts if:

- This policy is disabled (`NotEnabled`).
- The config policy is disabled (`NotEnabled`).
- The config policy does not name this timelock as its config operator.

```solidity
function _validateExecution(
        address,
        uint64,
        ITimelockBatchQueue.QueuedAction storage
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` | The account executing the action. |
| _ | `uint64` | The queued action ID. |
| _ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference, including the sub-actions. |

<a id="_validatecancellation-address-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateCancellation

<i>

Cancellation is available while this policy is disabled. While the action has not
expired it is restricted to the admin role, the emergency role and the proposer of
the action; once the block timestamp is past `expiresAt`, any caller may cancel it.

</i>

Reverts if:

- The action has not expired and `caller_` holds neither the admin role nor the
emergency role and is not the proposer of the action.

```solidity
function _validateCancellation(
        address caller_,
        uint64,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account cancelling the action. |
| _ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference, including the sub-actions. |

<a id="_validatetimelockdelay-uint48"></a>

### _validateTimelockDelay

Validate a timelock delay.

<i>

Derived contracts must revert on failure.

</i>

```solidity
function _validateTimelockDelay(uint48 delay_) internal pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The delay to validate. |

<a id="_executionwindow"></a>

### _executionWindow

Return the execution window for queued actions.

<i>

An action queued at `queuedAt` stores `executableAt = queuedAt + timelockDelay`
and `expiresAt = executableAt + executionWindow`, the last executable timestamp,
inclusive.

</i>

```solidity
function _executionWindow() internal pure override returns (uint48 executionWindow);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| executionWindow | `uint48` | The execution window in seconds. |

<a id="_authorizereenable"></a>

### _authorizeReEnable

Authorizes a re-enable transition during the grace window.

<i>

The admin role is not accepted here: it restarts the policy through `enable`.

</i>

Reverts if:

- The caller does not hold the bridge admin role.

```solidity
function _authorizeReEnable() internal view override;
```

<a id="_authorizesetgraceperiod"></a>

### _authorizeSetGracePeriod

Authorizes a grace window update.

<i>

Reverts if:

- The caller does not hold the admin role.

</i>

```solidity
function _authorizeSetGracePeriod() internal view override onlyAdminRole;
```

<a id="_beforeenable-bytes"></a>

### _beforeEnable

Validates the config policy binding before this policy is enabled.

<i>

Reverts if:

- The config policy is not an active policy of this policy's kernel.

</i>

```solidity
function _beforeEnable(bytes calldata) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` |  |

<a id="_beforereenable"></a>

### _beforeReEnable

Validates the grace window and the config policy binding before this policy is
re-enabled.

<i>

Reverts if:

- The grace window since the last transition has elapsed (`GracePeriod_Expired`).
- The config policy is not an active policy of this policy's kernel.

</i>

```solidity
function _beforeReEnable() internal override;
```

<a id="_requireconfigenabled"></a>

### _requireConfigEnabled

Reverts with `NotEnabled` unless the config policy is enabled.

```solidity
function _requireConfigEnabled() internal view;
```

<a id="_requireconfigactive"></a>

### _requireConfigActive

Reverts with `CCIPTokenPoolConfigTimelock_ConfigNotActive` unless the config policy
is an active policy of this policy's kernel.

```solidity
function _requireConfigActive() internal view;
```

<a id="_requireoperatorofconfig"></a>

### _requireOperatorOfConfig

Reverts with `CCIPTokenPoolConfigTimelock_NotConfigOperator` unless the config
policy names this timelock as its config operator.

```solidity
function _requireOperatorOfConfig() internal view;
```

<a id="_requirecanonicalpayload-bytes-bytes-bytes4"></a>

### _requireCanonicalPayload

Reverts with `ITimelockBatchQueue_ActionInvalid` unless the canonical re-encoding
of the decoded arguments equals the stored payload.

```solidity
function _requireCanonicalPayload(
        bytes memory payload_,
        bytes memory encoded_,
        bytes4 selector_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| payload_ | `bytes` | The stored payload. |
| encoded_ | `bytes` | The canonical re-encoding of the decoded arguments. |
| selector_ | `bytes4` | The selector of the sub-action, for the error. |

<a id="_routechainselector-itimelockbatchqueue-batchaction"></a>

### _routeChainSelector

Decodes the chain selector of a route sub-action from its payload.

<i>

Reverts with `ITimelockBatchQueue_ActionInvalid` for a selector that does not
address one route.

</i>

```solidity
function _routeChainSelector(
        ITimelockBatchQueue.BatchAction memory action_
    ) internal pure returns (uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

<a id="_ratelimitsstatehash-uint64"></a>

### _rateLimitsStateHash

Returns the state hash of the rate limits domain of a route.

<i>

The preimage covers the configuration of both buckets and the remote token of
the route, never the fill levels or the refill timestamps.

</i>

```solidity
function _rateLimitsStateHash(uint64 chainSelector_) internal view returns (bytes32 stateHash);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | The state hash. |

<a id="_remotepoolsstatehash-uint64"></a>

### _remotePoolsStateHash

Returns the state hash of the remote pools domain of a route.

<i>

The aggregate is the XOR of `keccak256(remotePool)` over the raw bytes of every
accepted remote pool, computed in one pass over the array returned by the pool.
The preimage also covers the remote token of the route.

</i>

```solidity
function _remotePoolsStateHash(
        uint64 chainSelector_
    ) internal view returns (bytes32 stateHash);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | The state hash. |

<a id="_routeidentitystatehash-uint64"></a>

### _routeIdentityStateHash

Returns the state hash of the identity domain of a route.

```solidity
function _routeIdentityStateHash(
        uint64 chainSelector_
    ) internal view returns (bytes32 stateHash);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | The state hash. |

<a id="_allowliststatehash"></a>

### _allowListStateHash

Returns the state hash of the allowlist domain.

<i>

The aggregate is the XOR of `keccak256(abi.encode(member))` over every allowlisted
address, computed in one pass over the array returned by the pool.

</i>

```solidity
function _allowListStateHash() internal view returns (bytes32 stateHash);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| stateHash | `bytes32` | The state hash. |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

Adds `ICCIPTokenPoolConfigTimelock` and `IVersioned` to the interfaces advertised by
the bases, which include `ITimelockBatchQueue` and `IConfigTimelockBatchQueue`.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId_
    )
        public
        view
        virtual
        override(EnablerV2, ReEnablerGracePeriod, ConfigTimelockBatchQueue)
        returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
