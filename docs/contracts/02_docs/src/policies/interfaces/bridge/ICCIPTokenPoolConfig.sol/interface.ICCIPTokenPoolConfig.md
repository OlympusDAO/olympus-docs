# ICCIPTokenPoolConfig

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/bridge/ICCIPTokenPoolConfig.sol)

**Title:** ICCIPTokenPoolConfig

The interface of the policy that owns the local Chainlink CCIP token pool of OHM and
exposes a typed, role-separated subset of the pool owner's authority.

<i>

The policy is bound to one pool for its lifetime. Its functions form four groups:
admin functions that change root authority and pool infrastructure; route functions
that change the supported chains, remote pools and allowlist, callable by the config
operator or the admin; the rate limit function, additionally callable by the bridge
rate limiter role; and containment functions, callable by the emergency, admin,
bridge admin or bridge rate limiter role, that only reduce capacity and remain
callable while the policy is disabled.
Every other state-changing function requires the policy to be enabled.

</i>

The config operator is the delegated operator of `IConfigOperator`, which the
implementing contract exposes as a separate interface next to this one:
`configOperator` returns it, or the zero address when none is set, and
`setConfigOperator` replaces it immediately or revokes it with the zero address; the
setter is intended to be callable only by the admin role while the policy is enabled.
It is the config timelock: a non-zero candidate must advertise
`ICCIPTokenPoolConfigTimelock` through ERC-165 and report this policy as its config,
checked after the unchanged rule below. A caller holding this interface casts to
`IConfigOperator` for those two functions, as it does to `IEnabler` for the lifecycle.

The address setters and `setRemoteToken` reject the value they already hold, so a
call that lands always changes state: `setRouter`, `setRebalancer`,
`setRateLimitAdmin` and `setRemoteToken` with `CCIPTokenPoolConfig_AddressUnchanged`,
`setConfigOperator` with `ConfigOperator_Unchanged` of `IConfigOperator`. Where the
zero address is a meaningful value, it is subject to the same rule: revoking an
authority that is already unset reverts. The unchanged check follows the lifecycle
and role checks; its position among the other checks of a candidate is stated on
each setter: `setRateLimitAdmin` and `setConfigOperator` run it first, the candidate
check of the config operator after it, `setRebalancer` requires a liquidity
container pool before it, `setRouter` rejects the zero address before it and probes
the candidate after it, and `setRemoteToken` requires the route to exist and the
candidate to be non-empty and 32 bytes long before it and reads the rate limiters of
the route after it. Tooling that phrases a step as "set or validate" reads the live
value and skips the call when it already matches.

Amounts, capacities and rates are expressed in the smallest unit of the pool token.
Remote token and remote pool addresses are exactly 32 bytes: the ABI encoding of an
EVM address, or the raw account address of an SVM chain, the only length that the
CCIP ramps accept on every generation in service. The implementing contract checks
the length only; the shape of an EVM value is validated by the tooling that builds
the call. Every operation on the pool is emitted by this contract in addition to the
events that the pool emits itself.

## Functions

<a id="pool"></a>

### pool

Returns the token pool owned by this policy.

```solidity
function pool() external view returns (address pool_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool_ | `address` | The pool address. |

<a id="isliquiditycontainer"></a>

### isLiquidityContainer

Returns whether the pool advertises the liquidity container interface, which
enables `setRebalancer` and `transferLiquidity`.

```solidity
function isLiquidityContainer() external view returns (bool isContainer);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| isContainer | `bool` | True if the pool is a liquidity container. |

<a id="getdisabledratelimiterconfig"></a>

### getDisabledRateLimiterConfig

Returns the rate limiter configuration written to both buckets of a route by the
containment functions, and rejected by `addChain`, `setChainRateLimits` and their
validation mirrors. At this capacity every real transfer exceeds the bucket size
and fails immediately. The capacity and the rate are counted in the units the
pool charges: nine-decimal OHM units outbound, the units of the source pool
inbound, charged before the pool converts the amount to local units; the inbound
containment therefore assumes a source pool that encodes nine decimals. The policy
does not verify the decimals of a remote token or a remote pool.

```solidity
function getDisabledRateLimiterConfig()
        external
        pure
        returns (ICCIPRateLimiter.Config memory config);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `ICCIPRateLimiter.Config` | The disabled rate limiter configuration. |

<a id="ischaindisabled-uint64"></a>

### isChainDisabled

Returns whether both buckets of a configured route hold the disabled rate limiter
configuration. Only `isEnabled`, `capacity` and `rate` are compared. A route with
exactly one contained bucket is reported as not disabled. The route functions of
this policy never leave that configuration in place, so a route reported as
disabled was contained through this policy or configured directly on the pool.

```solidity
function isChainDisabled(uint64 chainSelector_) external view returns (bool disabled);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| disabled | `bool` | True if both buckets are contained. |

<a id="acceptpoolownership"></a>

### acceptPoolOwnership

Accepts a pending transfer of the pool ownership to this policy. Intended to be
callable only by the admin role while the policy is enabled.

```solidity
function acceptPoolOwnership() external;
```

<a id="transferpoolownership-address"></a>

### transferPoolOwnership

Proposes a new owner of the pool. Ownership moves only when the proposed owner
accepts, and a later proposal overwrites a pending one. Intended to be callable
only by the admin role while the policy is enabled.

```solidity
function transferPoolOwnership(address newOwner_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner_ | `address` | The proposed owner. |

<a id="setrouter-address"></a>

### setRouter

Sets the router of the pool after checking, in this order, that the candidate is
not the zero address, differs from the current router, holds code and answers
`typeAndVersion()` within a bounded gas budget. Intended to be callable only by
the admin role while the policy is enabled.

```solidity
function setRouter(address router_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| router_ | `address` | The router address. |

<a id="setrebalancer-address"></a>

### setRebalancer

Sets the rebalancer of a liquidity container pool. The zero address clears the
rebalancer; the current value, zero included, is rejected after the liquidity
container check. Intended to be callable only by the admin role while the policy
is enabled.

```solidity
function setRebalancer(address rebalancer_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer_ | `address` | The rebalancer address. |

<a id="setratelimitadmin-address"></a>

### setRateLimitAdmin

Sets the rate limit admin of the pool. The zero address clears the role; the
current value, zero included, is rejected, the only check of the candidate.
Intended to be callable only by the admin role while the policy is enabled.

```solidity
function setRateLimitAdmin(address rateLimitAdmin_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin_ | `address` | The rate limit admin address. |

<a id="transferliquidity-address-uint256"></a>

### transferLiquidity

Pulls liquidity from another lock/release pool into the pool. The pool must be
the rebalancer of `from_`. Intended to be callable only by the admin role while
the policy is enabled.

```solidity
function transferLiquidity(address from_, uint256 amount_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from_ | `address` | The pool to pull liquidity from. |
| amount_ | `uint256` | The amount to transfer. |

<a id="addchain-icciptokenpooladmin-chainupdate"></a>

### addChain

Adds a route with a non-zero chain selector, its remote token, accepted remote
pools and enabled rate limits in both directions, neither of them the disabled
rate limiter configuration. Both buckets start full. Intended to be callable only
by the config operator or the admin role while the policy is enabled.

```solidity
function addChain(ICCIPTokenPoolAdmin.ChainUpdate calldata update_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| update_ | `ICCIPTokenPoolAdmin.ChainUpdate` | The chain configuration to add. |

<a id="removechain-uint64"></a>

### removeChain

Removes a route together with its remote pools, remote token and both buckets.
In-flight messages from the route are rejected afterwards. Intended to be
callable only by the config operator or the admin role while the policy is enabled.

```solidity
function removeChain(uint64 chainSelector_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="setremotetoken-uint64-bytes"></a>

### setRemoteToken

Sets the remote token of a route. The pool has no update path for the remote
token, so the route is recreated: it is removed and re-added in one pool call with
the same remote pools and rate limiter configurations, after which the fill level
of both buckets is restored to its level before the replacement, with a floor of
two units. The route must exist and the candidate must be non-empty and 32 bytes
long; the current remote token is rejected after those checks and before the
rate limiters of the route are read, both of which must be enabled. Intended to
be callable only by the config operator or the admin role while the policy is
enabled.

```solidity
function setRemoteToken(uint64 chainSelector_, bytes calldata remoteToken_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remoteToken_ | `bytes` | The new remote token address. |

<a id="addremotepool-uint64-bytes"></a>

### addRemotePool

Adds an accepted remote pool to a route. Previously accepted pools remain
accepted. Intended to be callable only by the config operator or the admin role while
the policy is enabled.

```solidity
function addRemotePool(uint64 chainSelector_, bytes calldata remotePool_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to add. |

<a id="removeremotepool-uint64-bytes"></a>

### removeRemotePool

Removes an accepted remote pool from a route. The last accepted pool of a route
cannot be removed. In-flight messages from the removed pool are rejected
afterwards. Intended to be callable only by the config operator or the admin role
while the policy is enabled.

```solidity
function removeRemotePool(uint64 chainSelector_, bytes calldata remotePool_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to remove. |

<a id="applyallowlistupdates-address-address"></a>

### applyAllowListUpdates

Removes and then adds sender allowlist entries on a pool deployed with an
allowlist. Intended to be callable only by the config operator or the admin role
while the policy is enabled.

```solidity
function applyAllowListUpdates(address[] calldata removes_, address[] calldata adds_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes_ | `address[]` | The addresses to remove. |
| adds_ | `address[]` | The addresses to add. |

<a id="setchainratelimits-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### setChainRateLimits

Sets both rate limiter configurations of a route together. Both configurations
must be enabled and neither may be the disabled rate limiter configuration. The
fill level of each bucket is clamped to the new capacity and is never raised.
Intended to be callable only by the bridge rate limiter role, the config operator
or the admin role while the policy is enabled.

```solidity
function setChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

<a id="disablechain-uint64"></a>

### disableChain

Sets both buckets of a route to the disabled rate limiter configuration. Safe to
call on a route that is already contained. The inbound containment assumes a
source pool that encodes nine decimals; see `getDisabledRateLimiterConfig`.
Intended to be callable only by the emergency, admin, bridge admin or bridge rate
limiter role, whether or not the policy is enabled.

```solidity
function disableChain(uint64 chainSelector_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="disableallchains"></a>

### disableAllChains

Sets both buckets of every configured route to the disabled rate limiter
configuration. Reverts when no route is configured. The inbound containment
assumes a source pool that encodes nine decimals; see
`getDisabledRateLimiterConfig`. Intended to be callable only by the emergency,
admin, bridge admin or bridge rate limiter role, whether or not the policy is
enabled.

```solidity
function disableAllChains() external;
```

<a id="validateaddchain-icciptokenpooladmin-chainupdate"></a>

### validateAddChain

Validates the arguments of `addChain` against the live pool state, with the same
checks and errors as the state-changing call, and returns without effect when
they are valid.

```solidity
function validateAddChain(ICCIPTokenPoolAdmin.ChainUpdate calldata update_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| update_ | `ICCIPTokenPoolAdmin.ChainUpdate` | The chain configuration to validate. |

<a id="validateremovechain-uint64"></a>

### validateRemoveChain

Validates the arguments of `removeChain` against the live pool state, with the
same checks and errors as the state-changing call, and returns without effect
when they are valid.

```solidity
function validateRemoveChain(uint64 chainSelector_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="validatesetremotetoken-uint64-bytes"></a>

### validateSetRemoteToken

Validates the arguments of `setRemoteToken` against the live pool state, with the
same checks and errors as the state-changing call, and returns without effect
when they are valid.

```solidity
function validateSetRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remoteToken_ | `bytes` | The new remote token address. |

<a id="validateaddremotepool-uint64-bytes"></a>

### validateAddRemotePool

Validates the arguments of `addRemotePool` against the live pool state, with the
same checks and errors as the state-changing call, and returns without effect
when they are valid.

```solidity
function validateAddRemotePool(uint64 chainSelector_, bytes calldata remotePool_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to add. |

<a id="validateremoveremotepool-uint64-bytes"></a>

### validateRemoveRemotePool

Validates the arguments of `removeRemotePool` against the live pool state, with
the same checks and errors as the state-changing call, and returns without effect
when they are valid.

```solidity
function validateRemoveRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to remove. |

<a id="validateapplyallowlistupdates-address-address"></a>

### validateApplyAllowListUpdates

Validates the arguments of `applyAllowListUpdates` against the live pool state,
with the same checks and errors as the state-changing call, and returns without
effect when they are valid.

```solidity
function validateApplyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes_ | `address[]` | The addresses to remove. |
| adds_ | `address[]` | The addresses to add. |

<a id="validatesetchainratelimits-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### validateSetChainRateLimits

Validates the arguments of `setChainRateLimits` against the live pool state, with
the same checks and errors as the state-changing call, and returns without effect
when they are valid.

```solidity
function validateSetChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

## Events

### PoolOwnershipAccepted

Emitted when the policy accepts ownership of the pool.

```solidity
event PoolOwnershipAccepted(address indexed pool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `address` | The pool. |

### PoolOwnershipTransferRequested

Emitted when the policy proposes a new owner of the pool.

```solidity
event PoolOwnershipTransferRequested(address indexed newOwner);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner | `address` | The proposed owner. |

### PoolRouterSet

Emitted when the pool router is set.

```solidity
event PoolRouterSet(address indexed router);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | `address` | The router. |

### PoolRebalancerSet

Emitted when the pool rebalancer is set.

```solidity
event PoolRebalancerSet(address indexed rebalancer);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer | `address` | The rebalancer, or the zero address if cleared. |

### PoolRateLimitAdminSet

Emitted when the pool rate limit admin is set.

```solidity
event PoolRateLimitAdminSet(address indexed rateLimitAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin | `address` | The rate limit admin, or the zero address if cleared. |

### PoolLiquidityTransferred

Emitted when liquidity is pulled from another pool into the pool.

```solidity
event PoolLiquidityTransferred(address indexed from, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | `address` | The pool the liquidity was pulled from. |
| amount | `uint256` | The amount transferred. |

### RouteAdded

Emitted when a route is added.

```solidity
event RouteAdded(uint64 indexed chainSelector, ICCIPTokenPoolAdmin.ChainUpdate update);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |
| update | `ICCIPTokenPoolAdmin.ChainUpdate` | The chain configuration added. |

### RouteRemoved

Emitted when a route is removed.

```solidity
event RouteRemoved(uint64 indexed chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

### RemoteTokenSet

Emitted when the remote token of a route is set.

```solidity
event RemoteTokenSet(
        uint64 indexed chainSelector,
        bytes previousRemoteToken,
        bytes remoteToken
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |
| previousRemoteToken | `bytes` | The remote token before the change. |
| remoteToken | `bytes` | The remote token after the change. |

### RouteRemotePoolAdded

Emitted when a remote pool is added to a route.

```solidity
event RouteRemotePoolAdded(uint64 indexed chainSelector, bytes remotePool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |
| remotePool | `bytes` | The remote pool address added. |

### RouteRemotePoolRemoved

Emitted when a remote pool is removed from a route.

```solidity
event RouteRemotePoolRemoved(uint64 indexed chainSelector, bytes remotePool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |
| remotePool | `bytes` | The remote pool address removed. |

### AllowListUpdated

Emitted when the sender allowlist of the pool is updated.

```solidity
event AllowListUpdated(address[] removes, address[] adds);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes | `address[]` | The addresses removed. |
| adds | `address[]` | The addresses added. |

### RouteRateLimitsSet

Emitted when the rate limits of a route are set.

```solidity
event RouteRateLimitsSet(
        uint64 indexed chainSelector,
        ICCIPRateLimiter.Config previousOutbound,
        ICCIPRateLimiter.Config previousInbound,
        ICCIPRateLimiter.Config outbound,
        ICCIPRateLimiter.Config inbound
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |
| previousOutbound | `ICCIPRateLimiter.Config` | The outbound configuration before the change. |
| previousInbound | `ICCIPRateLimiter.Config` | The inbound configuration before the change. |
| outbound | `ICCIPRateLimiter.Config` | The outbound configuration after the change. |
| inbound | `ICCIPRateLimiter.Config` | The inbound configuration after the change. |

### RouteDisabled

Emitted when a route is contained by setting both of its buckets to the disabled
rate limiter configuration.

```solidity
event RouteDisabled(uint64 indexed chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

## Errors

### CCIPTokenPoolConfig_InvalidAddress

Thrown when a required address argument is the zero address.

```solidity
error CCIPTokenPoolConfig_InvalidAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the invalid parameter. |

### CCIPTokenPoolConfig_InvalidPool

Thrown when the pool supplied at construction does not advertise the CCIP v1
pool identifier `Pool.CCIP_POOL_V1` (`0xaff2afbf`) through ERC165, the identifier
that the CCIP on-ramp and off-ramp check before calling a pool.

```solidity
error CCIPTokenPoolConfig_InvalidPool(address pool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `address` | The rejected pool address. |

### CCIPTokenPoolConfig_UnsupportedModuleVersion

Thrown when a configured module reports an unsupported version.

```solidity
error CCIPTokenPoolConfig_UnsupportedModuleVersion(bytes5 keycode, uint8 major, uint8 minor);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| keycode | `bytes5` | The keycode of the module. |
| major | `uint8` | The major version reported by the module. |
| minor | `uint8` | The minor version reported by the module. |

### CCIPTokenPoolConfig_InvalidRouter

Thrown when a router candidate holds no code or does not answer
`typeAndVersion()`.

```solidity
error CCIPTokenPoolConfig_InvalidRouter(address router);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| router | `address` | The rejected router address. |

### CCIPTokenPoolConfig_InvalidConfigOperator

Thrown when a non-zero config operator candidate does not advertise
`ICCIPTokenPoolConfigTimelock` through ERC-165 or reports a config other than
this policy.

```solidity
error CCIPTokenPoolConfig_InvalidConfigOperator(address configOperator);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator | `address` | The rejected config operator address. |

### CCIPTokenPoolConfig_NotLiquidityContainer

Thrown when a liquidity function is called and the pool does not advertise the
liquidity container interface.

```solidity
error CCIPTokenPoolConfig_NotLiquidityContainer();
```

### CCIPTokenPoolConfig_ZeroAmount

Thrown when a liquidity transfer amount is zero.

```solidity
error CCIPTokenPoolConfig_ZeroAmount();
```

### CCIPTokenPoolConfig_RemotePoolsEmpty

Thrown when a chain is added without any remote pool.

```solidity
error CCIPTokenPoolConfig_RemotePoolsEmpty();
```

### CCIPTokenPoolConfig_RemoteTokenEmpty

Thrown when the remote token to set for a route is empty.

```solidity
error CCIPTokenPoolConfig_RemoteTokenEmpty();
```

### CCIPTokenPoolConfig_AddressUnchanged

Thrown when a setter is called with the value it already holds: the router, the
rebalancer or the rate limit admin of the pool, or the remote token of a route.
The zero address is a value in its own right here, so revoking an authority that
is already unset reverts as well. The config operator setter raises the mix-in's
`ConfigOperator_Unchanged` instead.

```solidity
error CCIPTokenPoolConfig_AddressUnchanged(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the unchanged parameter. |

### CCIPTokenPoolConfig_InvalidRemoteAddressLength

Thrown when a remote token or remote pool address is not exactly 32 bytes long:
the ABI encoding of an EVM address, or the raw account address of an SVM chain.
An empty value raises the emptiness error of its function instead.

```solidity
error CCIPTokenPoolConfig_InvalidRemoteAddressLength(bytes remoteAddress);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteAddress | `bytes` | The rejected remote address. |

### CCIPTokenPoolConfig_RateLimiterDisabled

Thrown when a supplied or current rate limiter configuration is disabled.
Every route served by the pool carries enabled limiters in both directions.

```solidity
error CCIPTokenPoolConfig_RateLimiterDisabled();
```

### CCIPTokenPoolConfig_RateLimiterReserved

Thrown when a supplied rate limiter configuration equals the disabled rate
limiter configuration, which only the containment functions write.

```solidity
error CCIPTokenPoolConfig_RateLimiterReserved();
```

### CCIPTokenPoolConfig_ChainSelectorZero

Thrown when a chain is added with a zero remote chain selector.

```solidity
error CCIPTokenPoolConfig_ChainSelectorZero();
```

### CCIPTokenPoolConfig_LastRemotePool

Thrown when the removal of a remote pool would leave the route without any
accepted remote pool.

```solidity
error CCIPTokenPoolConfig_LastRemotePool(uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

### CCIPTokenPoolConfig_AllowListUpdatesEmpty

Thrown when an allowlist update contains neither removals nor additions.

```solidity
error CCIPTokenPoolConfig_AllowListUpdatesEmpty();
```

### CCIPTokenPoolConfig_NoRoutesConfigured

Thrown when every route of the pool is to be contained and the pool has no
configured route.

```solidity
error CCIPTokenPoolConfig_NoRoutesConfigured();
```
