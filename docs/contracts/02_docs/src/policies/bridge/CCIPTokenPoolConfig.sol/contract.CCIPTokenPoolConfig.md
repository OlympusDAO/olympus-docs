# CCIPTokenPoolConfig

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/CCIPTokenPoolConfig.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [ReEnablerGracePeriod](/main/contracts/docs/src/bases/ReEnablerGracePeriod.sol/abstract.ReEnablerGracePeriod), [PolicyEnablerV2](/main/contracts/docs/src/policies/utils/PolicyEnablerV2.sol/abstract.PolicyEnablerV2), [ConfigOperatorSingleStep](/main/contracts/docs/src/policies/utils/ConfigOperatorSingleStep.sol/abstract.ConfigOperatorSingleStep), [ICCIPTokenPoolConfig](/main/contracts/docs/src/policies/interfaces/bridge/ICCIPTokenPoolConfig.sol/interface.ICCIPTokenPoolConfig), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** CCIPTokenPoolConfig

Policy that owns the local Chainlink CCIP token pool of OHM and exposes a typed,
role-separated subset of the pool owner's authority.

<i>

The pool address is fixed at construction. The constructor requires the pool to
advertise `Pool.CCIP_POOL_V1` through ERC165, the identifier that the on-ramp and the
off-ramp check before calling a pool, and probes it for the liquidity container
interface, whose result gates `setRebalancer` and `transferLiquidity`.

</i>

Authorization is split into four groups:

- admin functions (callable by the admin role, enabled only): pool ownership,
config operator, router, rebalancer, rate limit admin, liquidity transfer;
- route functions (callable by the config operator or the admin role, enabled only):
supported chains, remote pools, allowlist;
- the rate limit function (callable by the bridge rate limiter role, the config
operator or the admin role, enabled only);
- containment functions (callable by the emergency, admin, bridge admin or bridge
rate limiter role, whether or not the policy is enabled): they only write the
disabled rate limiter configuration and cannot restore capacity.

`enable` is restricted to the admin role, `disable` to the emergency or admin role,
`reEnable` to the bridge admin role within the grace window, and `setGracePeriod` to
the admin role while enabled.

The config operator is the single-step delegated operator of `ConfigOperatorSingleStep`:
it starts unset, `setConfigOperator` replaces it immediately with a candidate that
advertises `ICCIPTokenPoolConfigTimelock` through ERC165 and reports this policy as
its config, and the zero address revokes it. The route and rate limit functions
accept it alongside the admin role.

The address setters and `setRemoteToken` reject the value they already hold, the zero
address included where it is a value, so a call that lands always changes state:
`setRouter`, `setRebalancer`, `setRateLimitAdmin` and `setRemoteToken` with
`CCIPTokenPoolConfig_AddressUnchanged`, `setConfigOperator` with the mix-in's
`ConfigOperator_Unchanged`. The check runs after the lifecycle and role gates, at the
position the "Reverts if" list of each setter states: it is the first check of the
candidate in `setRateLimitAdmin` and in `setConfigOperator`, whose candidate check
follows it; `setRebalancer` requires the pool to be a liquidity container before it;
`setRouter` rejects the zero address before it and probes the candidate after it;
and `setRemoteToken` requires the route to exist and the candidate to be non-empty
and 32 bytes long before it, and reads the buckets of the route after it.

Every check that this contract adds on top of the pool is shared between the
state-changing function and its `validate*` mirror, and the mirrors also repeat the
checks that the pool performs itself, so that a caller can learn the exact revert of a
call before making it. In the "Reverts if" lists below, an error without the
`CCIPTokenPoolConfig_` prefix is raised by the pool and declared in
`ICCIPTokenPoolAdmin`, `ICCIPRateLimiter` or `ICCIPLockReleaseTokenPool`; the validation
mirrors raise the same errors for the checks they repeat. Disabling this policy does not
stop the pool from processing transfers; only the containment functions do.

## Constants

### _ROLES_KEYCODE

The keycode of the ROLES module this policy depends on.

```solidity
bytes5 internal constant _ROLES_KEYCODE = "ROLES";
```

### _DISABLED_RATE_LIMIT_CAPACITY

The capacity of the disabled rate limiter configuration written by the
containment functions, in token base units.

```solidity
uint128 internal constant _DISABLED_RATE_LIMIT_CAPACITY = 2;
```

### _DISABLED_RATE_LIMIT_RATE

The refill rate of the disabled rate limiter configuration written by the
containment functions, in token base units per second.

```solidity
uint128 internal constant _DISABLED_RATE_LIMIT_RATE = 1;
```

### _MIN_ENABLED_RATE

The refill rate of the temporary configuration that restores a bucket fill level,
in token base units per second: the smallest rate of an enabled configuration.

```solidity
uint128 internal constant _MIN_ENABLED_RATE = 1;
```

### _MIN_ENABLED_CAPACITY

The smallest capacity of an enabled configuration with a rate of
`_MIN_ENABLED_RATE`, in token base units: the pool requires the rate of an enabled
configuration to be non-zero and below its capacity.

```solidity
uint128 internal constant _MIN_ENABLED_CAPACITY = 2;
```

### _REMOTE_ADDRESS_LENGTH

The length of every remote token and remote pool address the policy accepts, in
bytes: the ABI encoding of an EVM address, or the raw account address of an SVM
chain. It is the only length that both the 1.6 and the 2.0.0 ramps accept, and
the one every live 1.5 route carries: the 1.6 fee quoter rejects a remote token of
any other length at send time, the 2.0.0 on-ramp unpads a 32-byte EVM remote token
to 20 bytes, and the source pool of an EVM message is delivered as its ABI
encoding, which the destination pool matches byte for byte against its accepted
remote pools. The policy checks the length only; the shape of an EVM value, a
left-padded address outside the range reserved for precompiles, is validated by
the tooling that builds the call.

```solidity
uint256 internal constant _REMOTE_ADDRESS_LENGTH = 32;
```

### _MIN_TYPE_AND_VERSION_RETURN_LENGTH

The minimum length of the return data of a successful `typeAndVersion()` call:
the ABI encoding of an empty string. It is also the number of bytes the probe
copies, since the probe measures the length of the answer and never decodes it.

```solidity
uint16 internal constant _MIN_TYPE_AND_VERSION_RETURN_LENGTH = 64;
```

### _TYPE_AND_VERSION_PROBE_GAS

The gas forwarded to the `typeAndVersion()` probe of a router candidate.

<i>

An implementation of `typeAndVersion()` returns a constant string: the deployed
CCIP `Router 1.2.0` answers in 726 gas on mainnet. This is the budget that
OpenZeppelin's `ERC165Checker` and Chainlink's `ERC165CheckerReverting` forward
per probe, about forty times that cost, and it bounds what a candidate can spend
of the caller's gas.

</i>

```solidity
uint256 internal constant _TYPE_AND_VERSION_PROBE_GAS = 30_000;
```

### _POOL

The token pool owned by this policy.

```solidity
ICCIPTokenPoolAdmin internal immutable _POOL;
```

### _IS_LIQUIDITY_CONTAINER

Whether the pool advertises `ICCIPLiquidityContainer` through ERC165.

```solidity
bool internal immutable _IS_LIQUIDITY_CONTAINER;
```

## Functions

<a id="constructor-kernel-address-uint32"></a>

### constructor

Deploys the config policy for one token pool.

<i>

The policy starts disabled. The pool is not required to be owned by this policy at
construction: ownership is completed later through `acceptPoolOwnership`.

</i>

Reverts if:

- `pool_` is the zero address.
- `pool_` does not advertise `Pool.CCIP_POOL_V1` through ERC165.
- `gracePeriod_` is zero.

```solidity
constructor(
        Kernel kernel_,
        address pool_,
        uint32 gracePeriod_
    ) Policy(kernel_) ReEnablerGracePeriod(gracePeriod_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | The kernel of the policy. |
| pool_ | `address` | The token pool to own. |
| gracePeriod_ | `uint32` | The length of the re-enable grace window, in seconds. |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

<i>

Reverts if the installed ROLES module major version is not 1
(`CCIPTokenPoolConfig_UnsupportedModuleVersion`, naming the keycode and the version
read).

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

<a id="onlyconfigoperatororadmin"></a>

### onlyConfigOperatorOrAdmin

Reverts with `NotAuthorised` unless the caller is the config operator or holds
the admin role.

```solidity
modifier onlyConfigOperatorOrAdmin();
```

<a id="onlyratelimiterorconfigoperatororadmin"></a>

### onlyRateLimiterOrConfigOperatorOrAdmin

Reverts with `NotAuthorised` unless the caller holds the bridge rate limiter
role, is the config operator or holds the admin role.

```solidity
modifier onlyRateLimiterOrConfigOperatorOrAdmin();
```

<a id="onlycontainmentrole"></a>

### onlyContainmentRole

Reverts with `NotAuthorised` unless the caller holds the emergency, admin,
bridge admin or bridge rate limiter role.

```solidity
modifier onlyContainmentRole();
```

<a id="pool"></a>

### pool

Returns the token pool owned by this policy.

```solidity
function pool() external view override returns (address pool_);
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
function isLiquidityContainer() external view override returns (bool isContainer);
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

<i>

The capacity of two base units and the rate of one base unit per second are counted
in the units the pool charges: the outbound bucket in nine-decimal OHM units, the
inbound bucket in the units of the source pool, charged before the pool converts the
amount to local units with the decimals the source pool encodes in the message; a
message without decimal metadata is converted as nine-decimal. A source pool that
encodes fewer decimals therefore passes more OHM per charged unit through the inbound
bucket: up to two whole OHM per full bucket, refilled at one OHM per second, when it
encodes zero. This policy does not read the decimals of a remote token or a remote
pool.

</i>

```solidity
function getDisabledRateLimiterConfig()
        external
        pure
        override
        returns (ICCIPRateLimiter.Config memory config);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `ICCIPRateLimiter.Config` | The disabled rate limiter configuration. |

<a id="ischaindisabled-uint64"></a>

### isChainDisabled

<i>

`addChain`, `setChainRateLimits` and their validation mirrors reject the disabled
rate limiter configuration, so both buckets hold it only after `disableChain` or
`disableAllChains`, or when they were written directly on the pool: by its owner
before the handover, or by a rate limit admin of the pool.

</i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).

```solidity
function isChainDisabled(uint64 chainSelector_) external view override returns (bool disabled);
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

<i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- This policy is not the pending owner of the pool (`MustBeProposedOwner`), which
includes the case where it already owns the pool.

</i>

```solidity
function acceptPoolOwnership() external override givenEnabled onlyAdminRole;
```

<a id="transferpoolownership-address"></a>

### transferPoolOwnership

<i>

A pending proposal is overwritten by a later one. After the recipient accepts, this
policy no longer owns the pool: every function that calls the pool reverts
(`OnlyCallableByOwner`, or `Unauthorized` for the rate limiter setters), and every
action queued in the config operator reverts at execution and keeps its
configuration keys until it is cancelled.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- `newOwner_` is the zero address.
- `newOwner_` is this policy (`CannotTransferToSelf`).
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function transferPoolOwnership(address newOwner_) external override givenEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner_ | `address` | The proposed owner. |

<a id="setrouter-address"></a>

### setRouter

<i>

The candidate is probed with a static call to `typeAndVersion()`, which must succeed
within `_TYPE_AND_VERSION_PROBE_GAS` and return at least the ABI encoding of an empty
string; the string itself is never decoded. The probe runs through `SafeCall`, which
rejects a candidate without code before calling it and copies at most the 64 bytes the
check measures, so neither the gas nor the memory this call pays for depends on the
candidate. The current router is rejected before the probe runs, so the answer of the
installed router has no bearing on the rejection. Whether the candidate serves the
configured routes is not checked.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- `router_` is the zero address.
- `router_` is the current router of the pool.
- `router_` holds no code.
- The `typeAndVersion()` probe of `router_` reverts, exhausts its gas budget or
answers with less than the ABI encoding of an empty string.
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function setRouter(address router_) external override givenEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| router_ | `address` | The router address. |

<a id="setrebalancer-address"></a>

### setRebalancer

<i>

The pool emits no event for this change; `PoolRebalancerSet` is the only log of it.
The zero address clears the rebalancer and is a value in its own right: clearing a
rebalancer that is already unset reverts like any other unchanged write.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- The pool is not a liquidity container.
- `rebalancer_` is the current rebalancer of the pool.
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function setRebalancer(address rebalancer_) external override givenEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer_ | `address` | The rebalancer address. |

<a id="setratelimitadmin-address"></a>

### setRateLimitAdmin

<i>

The zero address clears the role and is a value in its own right: clearing a rate
limit admin that is already unset reverts like any other unchanged write.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- `rateLimitAdmin_` is the current rate limit admin of the pool.
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function setRateLimitAdmin(
        address rateLimitAdmin_
    ) external override givenEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin_ | `address` | The rate limit admin address. |

<a id="transferliquidity-address-uint256"></a>

### transferLiquidity

<i>

The tokens move directly from `from_` to the pool.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- The pool is not a liquidity container.
- `from_` is the zero address.
- `amount_` is zero.
- This policy does not own the pool (`OnlyCallableByOwner`).
- The pool is not the rebalancer of `from_` (`Unauthorized`).
- `amount_` exceeds the balance of `from_` (`InsufficientLiquidity`).

```solidity
function transferLiquidity(
        address from_,
        uint256 amount_
    ) external override givenEnabled onlyAdminRole;
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

<i>

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateAddChain` rejects `update_`.
- This policy does not own the pool (`OnlyCallableByOwner`).

</i>

```solidity
function addChain(
        ICCIPTokenPoolAdmin.ChainUpdate calldata update_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
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

<i>

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateRemoveChain` rejects `chainSelector_`.
- This policy does not own the pool (`OnlyCallableByOwner`).

</i>

```solidity
function removeChain(
        uint64 chainSelector_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="setremotetoken-uint64-bytes"></a>

### setRemoteToken

<i>

The route state is read from the pool before the replacement: the remote pools, both
rate limiter configurations and both fill levels projected to the current block. The
remote pools are carried forward as read, without the checks that `addChain` applies
to a new list, so a route seeded directly on the pool before the handover keeps an
empty set or an entry of another length. The replacement is one `applyChainUpdates`
call with `chainSelector_` in both the removals and the additions, after which both
buckets are full. Each fill level is then
restored by two `setChainRateLimiterConfig` calls in the same transaction: first a
configuration with `capacity = max(previousTokens, 2)` and `rate = 1`, which clamps
the bucket down to that level, then the original configuration. A previous fill
level below two units is therefore restored as two units, the smallest capacity of
an enabled configuration with a rate of one.

</i>

The pool emits, in this order: `ChainRemoved(chainSelector)`, without a
`RemotePoolRemoved` for the dropped remote pools; `RemotePoolAdded` per remote pool
followed by `ChainAdded`; then two `ConfigChanged` and one `ChainConfigured` per
`setChainRateLimiterConfig` call, so four `ConfigChanged` and two `ChainConfigured`
in total. The first `ChainConfigured` carries the temporary configuration
``true, max(previousTokens, 2), 1`` and does not reflect the rate limit policy of the
route; the second carries the original configuration and, together with the
`RemoteTokenSet` event of this contract, confirms the result. A monitor that tracks
the accepted remote pools of a route through pool events must re-read
`getRemotePools` after this operation.

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateSetRemoteToken` rejects the arguments.
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function setRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
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

<i>

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateAddRemotePool` rejects the arguments.
- This policy does not own the pool (`OnlyCallableByOwner`).

</i>

```solidity
function addRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
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

<i>

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateRemoveRemotePool` rejects the arguments.
- This policy does not own the pool (`OnlyCallableByOwner`).

</i>

```solidity
function removeRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to remove. |

<a id="applyallowlistupdates-address-address"></a>

### applyAllowListUpdates

<i>

Absent removals, duplicate additions and zero addresses are skipped by the pool
without an event.

</i>

Reverts if:

- The policy is disabled.
- The caller is neither the config operator nor an admin.
- `validateApplyAllowListUpdates` rejects the arguments.
- This policy does not own the pool (`OnlyCallableByOwner`).

```solidity
function applyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) external override givenEnabled onlyConfigOperatorOrAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes_ | `address[]` | The addresses to remove. |
| adds_ | `address[]` | The addresses to add. |

<a id="setchainratelimits-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### setChainRateLimits

<i>

Setting the current values writes and emits.

</i>

Reverts if:

- The policy is disabled.
- The caller holds neither the bridge rate limiter role nor the admin role and is
not the config operator.
- `validateSetChainRateLimits` rejects the arguments.
- This policy does not own the pool and is not its rate limit admin
(`Unauthorized`).

```solidity
function setChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external override givenEnabled onlyRateLimiterOrConfigOperatorOrAdmin;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

<a id="disablechain-uint64"></a>

### disableChain

<i>

Both buckets are written to ``isEnabled: true, capacity: 2, rate: 1``, which clamps
each fill level to two units. The outbound bucket is charged in nine-decimal OHM
units and the inbound bucket in the units of the source pool, so the inbound
containment assumes a source pool that encodes nine decimals; see
`getDisabledRateLimiterConfig`. The policy's enabled state is not checked.

</i>

Reverts if:

- The caller holds none of the emergency, admin, bridge admin and bridge rate
limiter roles.
- This policy does not own the pool and is not its rate limit admin
(`Unauthorized`).
- `chainSelector_` is not a configured route (`NonExistentChain`).

```solidity
function disableChain(uint64 chainSelector_) external override onlyContainmentRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="disableallchains"></a>

### disableAllChains

<i>

Every configured route is written in one `setChainRateLimiterConfigs` call and one
`RouteDisabled` event is emitted per route. The policy's enabled state is not
checked. The order of the routes follows the pool's enumerable set. A pool without
a configured route is rejected before it is written to, so a sweep that lands always
contains at least one route. The outbound bucket of each route is charged in
nine-decimal OHM units and the inbound bucket in the units of the source pool, so
the inbound containment assumes a source pool that encodes nine decimals; see
`getDisabledRateLimiterConfig`.

</i>

The cost is linear in the number of configured routes: one `getSupportedChains`
read and one `setChainRateLimiterConfigs` call, plus, per route, the storage writes
of both buckets, two `ConfigChanged` and one `ChainConfigured` event of the pool and
one `RouteDisabled` event of this contract. `disableChain` contains one route per
call.

Reverts if:

- The caller holds none of the emergency, admin, bridge admin and bridge rate
limiter roles.
- No route is configured on the pool.
- This policy does not own the pool and is not its rate limit admin
(`Unauthorized`).

```solidity
function disableAllChains() external override onlyContainmentRole;
```

<a id="validateaddchain-icciptokenpooladmin-chainupdate"></a>

### validateAddChain

<i>

The checks run in the order in which the pool would perform its own, with the
config-only checks placed next to the pool check they extend: the disabled
configuration check after the rate check of the same configuration, the length
check of each remote address right after its emptiness check, and the zero selector
check right before the route existence check.

</i>

Reverts if:

- Either rate limiter configuration is disabled.
- Either rate limiter configuration has a zero rate or a rate that is not below its
capacity (`InvalidRateLimitRate`).
- Either rate limiter configuration is the disabled rate limiter configuration
(`CCIPTokenPoolConfig_RateLimiterReserved`).
- The remote token is empty (`ZeroAddressNotAllowed`).
- The remote token is not 32 bytes long.
- The remote chain selector is zero (`CCIPTokenPoolConfig_ChainSelectorZero`).
- The route already exists (`ChainAlreadyExists`).
- The remote pool list is empty.
- A remote pool entry is empty (`ZeroAddressNotAllowed`).
- A remote pool entry is not 32 bytes long.
- A remote pool entry is duplicated (`PoolAlreadyAdded`).

```solidity
function validateAddChain(
        ICCIPTokenPoolAdmin.ChainUpdate calldata update_
    ) external view override;
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

<i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).

</i>

```solidity
function validateRemoveChain(uint64 chainSelector_) external view override;
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

<i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).
- `remoteToken_` is empty.
- `remoteToken_` is not 32 bytes long.
- `remoteToken_` equals the current remote token of the route.
- Either current bucket of the route is disabled.

</i>

```solidity
function validateSetRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) external view override;
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

<i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).
- `remotePool_` is empty (`ZeroAddressNotAllowed`).
- `remotePool_` is not 32 bytes long.
- `remotePool_` is already accepted for the route (`PoolAlreadyAdded`).

</i>

```solidity
function validateAddRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external view override;
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

<i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).
- `remotePool_` is not accepted for the route (`InvalidRemotePoolForChain`).
- `remotePool_` is the only accepted remote pool of the route.

</i>

```solidity
function validateRemoveRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) external view override;
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

<i>

Reverts if:

- The pool was deployed without an allowlist (`AllowListNotEnabled`).
- Both `removes_` and `adds_` are empty.

</i>

```solidity
function validateApplyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) external view override;
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

<i>

Reverts if:

- `chainSelector_` is not a configured route (`NonExistentChain`).
- Either configuration is disabled.
- Either configuration has a zero rate or a rate that is not below its capacity
(`InvalidRateLimitRate`).
- Either configuration is the disabled rate limiter configuration
(`CCIPTokenPoolConfig_RateLimiterReserved`).

</i>

```solidity
function validateSetChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

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

<a id="setconfigoperator-address"></a>

### setConfigOperator

<i>

The mix-in runs the lifecycle and role gates of `_authorizeSetConfigOperator`, the
unchanged check and the write, in that order; the candidate check runs after the
write and reverts it when the candidate is rejected. A non-zero candidate must
advertise `ICCIPTokenPoolConfigTimelock` through ERC165 and report this policy as
its `config()`; the zero address revokes the operator without a candidate check.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.
- `configOperator_` is the operator already set, the zero address included
(`ConfigOperator_Unchanged`).
- `configOperator_` is not the zero address and does not advertise
`ICCIPTokenPoolConfigTimelock` through ERC165, or reports a config other than this
policy (`CCIPTokenPoolConfig_InvalidConfigOperator`).

```solidity
function setConfigOperator(address configOperator_) public override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator_ | `address` | New config operator address. |

<a id="_authorizesetconfigoperator"></a>

### _authorizeSetConfigOperator

<i>

The hook reverts on failure, so the mix-in never reports `ConfigOperator_Unauthorized`
through this policy; the mix-in then rejects the operator already set, the zero
address included, with `ConfigOperator_Unchanged`, so the setter carries the
lifecycle and role errors of the other admin functions followed by the unchanged
check, in that order.

</i>

Reverts if:

- The policy is disabled.
- The caller does not hold the admin role.

```solidity
function _authorizeSetConfigOperator()
        internal
        view
        override
        givenEnabled
        onlyAdminRole
        returns (bool authorized);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorized | `bool` | True when the caller may set the config operator. |

<a id="_validateaddchain-icciptokenpooladmin-chainupdate"></a>

### _validateAddChain

Validates the arguments of `addChain`. See `validateAddChain`.

```solidity
function _validateAddChain(ICCIPTokenPoolAdmin.ChainUpdate calldata update_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| update_ | `ICCIPTokenPoolAdmin.ChainUpdate` | The chain configuration to validate. |

<a id="_validateremovechain-uint64"></a>

### _validateRemoveChain

Validates the arguments of `removeChain`. See `validateRemoveChain`.

```solidity
function _validateRemoveChain(uint64 chainSelector_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |

<a id="_validatesetremotetoken-uint64-bytes"></a>

### _validateSetRemoteToken

Validates the arguments of `setRemoteToken`. See `validateSetRemoteToken`.

```solidity
function _validateSetRemoteToken(
        uint64 chainSelector_,
        bytes calldata remoteToken_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remoteToken_ | `bytes` | The new remote token address. |

<a id="_validateaddremotepool-uint64-bytes"></a>

### _validateAddRemotePool

Validates the arguments of `addRemotePool`. See `validateAddRemotePool`.

```solidity
function _validateAddRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to add. |

<a id="_validateremoveremotepool-uint64-bytes"></a>

### _validateRemoveRemotePool

Validates the arguments of `removeRemotePool`. See `validateRemoveRemotePool`.

```solidity
function _validateRemoveRemotePool(
        uint64 chainSelector_,
        bytes calldata remotePool_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remotePool_ | `bytes` | The remote pool address to remove. |

<a id="_validateapplyallowlistupdates-address-address"></a>

### _validateApplyAllowListUpdates

Validates the arguments of `applyAllowListUpdates`. See
`validateApplyAllowListUpdates`.

```solidity
function _validateApplyAllowListUpdates(
        address[] calldata removes_,
        address[] calldata adds_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| removes_ | `address[]` | The addresses to remove. |
| adds_ | `address[]` | The addresses to add. |

<a id="_validatesetchainratelimits-uint64-iccipratelimiter-config-iccipratelimiter-config"></a>

### _validateSetChainRateLimits

Validates the arguments of `setChainRateLimits`. See
`validateSetChainRateLimits`.

```solidity
function _validateSetChainRateLimits(
        uint64 chainSelector_,
        ICCIPRateLimiter.Config calldata outbound_,
        ICCIPRateLimiter.Config calldata inbound_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| outbound_ | `ICCIPRateLimiter.Config` | The outbound rate limiter configuration. |
| inbound_ | `ICCIPRateLimiter.Config` | The inbound rate limiter configuration. |

<a id="_validateratelimiterconfig-iccipratelimiter-config"></a>

### _validateRateLimiterConfig

Validates a rate limiter configuration supplied to the pool.

<i>

The disabled rate limiter configuration passes the pool's own checks; it is
rejected last, so that the containment functions remain the only functions of
this policy that leave it in place.

</i>

Reverts if:

- `config_` is disabled.
- `config_` has a zero rate or a rate that is not below its capacity
(`InvalidRateLimitRate`).
- `config_` is the disabled rate limiter configuration
(`CCIPTokenPoolConfig_RateLimiterReserved`).

```solidity
function _validateRateLimiterConfig(ICCIPRateLimiter.Config memory config_) internal pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config_ | `ICCIPRateLimiter.Config` |  |

<a id="_requireremoteaddresslength-bytes"></a>

### _requireRemoteAddressLength

Reverts with `CCIPTokenPoolConfig_InvalidRemoteAddressLength` unless
`remoteAddress_` is exactly `_REMOTE_ADDRESS_LENGTH` bytes long. The length is
the only check: the shape of an EVM value is validated by the tooling.

```solidity
function _requireRemoteAddressLength(bytes calldata remoteAddress_) internal pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteAddress_ | `bytes` | The remote token or remote pool address to check. |

<a id="_requiresupportedchain-uint64"></a>

### _requireSupportedChain

Reverts with `NonExistentChain` unless `chainSelector_` is a configured route.

```solidity
function _requireSupportedChain(uint64 chainSelector_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` |  |

<a id="_requireliquiditycontainer"></a>

### _requireLiquidityContainer

Reverts with `CCIPTokenPoolConfig_NotLiquidityContainer` unless the pool advertises
the liquidity container interface.

```solidity
function _requireLiquidityContainer() internal view;
```

<a id="_requireconfigoperatorcandidate-address"></a>

### _requireConfigOperatorCandidate

Reverts with `CCIPTokenPoolConfig_InvalidConfigOperator` unless `candidate_`
advertises `ICCIPTokenPoolConfigTimelock` through ERC165 and reports this policy
as its config.

```solidity
function _requireConfigOperatorCandidate(address candidate_) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| candidate_ | `address` | The config operator candidate, never the zero address. |

<a id="_replaceroute-uint64-bytes-iccipratelimiter-tokenbucket-iccipratelimiter-tokenbucket"></a>

### _replaceRoute

Replaces a route in one `applyChainUpdates` call, keeping its remote pools and
rate limiter configurations and setting a new remote token.

```solidity
function _replaceRoute(
        uint64 chainSelector_,
        bytes calldata remoteToken_,
        ICCIPRateLimiter.TokenBucket memory outbound_,
        ICCIPRateLimiter.TokenBucket memory inbound_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector_ | `uint64` | The chain selector of the route. |
| remoteToken_ | `bytes` | The new remote token address. |
| outbound_ | `ICCIPRateLimiter.TokenBucket` | The outbound bucket read before the replacement. |
| inbound_ | `ICCIPRateLimiter.TokenBucket` | The inbound bucket read before the replacement. |

<a id="_fillrestoreconfig-uint128"></a>

### _fillRestoreConfig

Returns the temporary configuration that clamps a full bucket down to a previous
fill level: `capacity = max(previousTokens_, _MIN_ENABLED_CAPACITY)` and
`rate = _MIN_ENABLED_RATE`.

```solidity
function _fillRestoreConfig(
        uint128 previousTokens_
    ) internal pure returns (ICCIPRateLimiter.Config memory config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| previousTokens_ | `uint128` | The fill level to restore, in token base units. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `ICCIPRateLimiter.Config` | The temporary configuration. |

<a id="_disabledratelimiterconfig"></a>

### _disabledRateLimiterConfig

Returns the disabled rate limiter configuration.

```solidity
function _disabledRateLimiterConfig()
        internal
        pure
        returns (ICCIPRateLimiter.Config memory config);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `ICCIPRateLimiter.Config` | The configuration ``isEnabled: true, capacity: 2, rate: 1``. |

<a id="_isdisabledbucket-iccipratelimiter-tokenbucket"></a>

### _isDisabledBucket

Returns whether a bucket holds the disabled rate limiter configuration, comparing
`isEnabled`, `capacity` and `rate` only.

```solidity
function _isDisabledBucket(
        ICCIPRateLimiter.TokenBucket memory bucket_
    ) internal pure returns (bool disabled);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bucket_ | `ICCIPRateLimiter.TokenBucket` | The bucket to inspect. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| disabled | `bool` | True if the bucket is contained. |

<a id="_toconfig-iccipratelimiter-tokenbucket"></a>

### _toConfig

Extracts the configuration fields of a bucket.

```solidity
function _toConfig(
        ICCIPRateLimiter.TokenBucket memory bucket_
    ) internal pure returns (ICCIPRateLimiter.Config memory config);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| bucket_ | `ICCIPRateLimiter.TokenBucket` | The bucket. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| config | `ICCIPRateLimiter.Config` | The `isEnabled`, `capacity` and `rate` of the bucket. |

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

Adds `ICCIPTokenPoolConfig`, `IConfigOperator` and `IVersioned` to the interfaces
advertised by the bases.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(EnablerV2, ReEnablerGracePeriod) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
