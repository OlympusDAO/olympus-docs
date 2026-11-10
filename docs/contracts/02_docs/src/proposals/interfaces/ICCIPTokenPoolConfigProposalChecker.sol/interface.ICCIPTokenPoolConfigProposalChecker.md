# ICCIPTokenPoolConfigProposalChecker

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/interfaces/ICCIPTokenPoolConfigProposalChecker.sol)

**Title:** ICCIPTokenPoolConfigProposalChecker

The interface of the read-only checker that the CCIP bridge activation proposal calls
as its first action. The checker is bound at construction to the contracts the
proposal acts on and asserts, at execution time, that the live state still matches
the state the proposal was built against: the precondition of every handover action
the proposal includes, the end state of every handover action it does not include,
the absence of every route it opens, and the minimum backing of the pool. It holds
no role and changes no state; the first expectation that does not hold reverts with
a named error, which fails the whole proposal before any handover action runs.

<i>

The pool is an `Ownable2Step` without a getter of its pending owner, so the
precondition of the ownership acceptance is narrowed to the current owner: a pending
owner repointed after the build is not detected here and surfaces at the acceptance
action instead.

</i>

## Functions

<a id="check-expectations"></a>

### check

Asserts the expectations against the live state and returns normally when every
one of them holds. Intended to be the first action of the CCIP bridge activation
proposal, so that a precondition that no longer holds at execution fails the
proposal with a named error before any handover action runs; callable by anyone
at any time, since it reads only.

<i>

The checks run in the order of the proposal actions, after the bindings that every
action relies on (both policies active in the Kernel, the Kernel reporting the
bound ROLES module, the bound pool registered for OHM, the OCG timelock holding
`admin`), and the first failing one reverts.
The pool owner is compared with the expected one only: the pool exposes no read
of its pending owner.

</i>

```solidity
function check(Expectations calldata expectations_) external view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expectations_ | `Expectations` | The expectations of the proposal build. |

## Errors

### CCIPTokenPoolConfigProposalChecker_ZeroAddress

Thrown when a constructor argument is the zero address.

```solidity
error CCIPTokenPoolConfigProposalChecker_ZeroAddress(string parameter);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| parameter | `string` | The name of the argument. |

### CCIPTokenPoolConfigProposalChecker_BindingMismatch

Thrown when a constructor argument is not bound to another one the way the
proposal requires, or when the Kernel no longer reports the bound ROLES module
at check time.

```solidity
error CCIPTokenPoolConfigProposalChecker_BindingMismatch(
        string binding,
        address actual,
        address expected
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| binding | `string` | The name of the binding. |
| actual | `address` | The value the bound contract reports. |
| expected | `address` | The bound value it was compared with. |

### CCIPTokenPoolConfigProposalChecker_NotLiquidityContainer

Thrown when the config policy reports that the pool is not a liquidity container,
so the pool has no rebalancer to check.

```solidity
error CCIPTokenPoolConfigProposalChecker_NotLiquidityContainer(address pool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `address` | The pool. |

### CCIPTokenPoolConfigProposalChecker_PolicyNotActive

Thrown when a policy is not active in the Kernel.

```solidity
error CCIPTokenPoolConfigProposalChecker_PolicyNotActive(address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The policy. |

### CCIPTokenPoolConfigProposalChecker_RegisteredPoolMismatch

Thrown when the pool registered for OHM in the TokenAdminRegistry is not the
bound pool.

```solidity
error CCIPTokenPoolConfigProposalChecker_RegisteredPoolMismatch(
        address registered,
        address expected
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| registered | `address` | The registered pool. |
| expected | `address` | The bound pool. |

### CCIPTokenPoolConfigProposalChecker_MissingRole

Thrown when an account does not hold a required role.

```solidity
error CCIPTokenPoolConfigProposalChecker_MissingRole(bytes32 role, address account);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | `bytes32` | The role. |
| account | `address` | The account. |

### CCIPTokenPoolConfigProposalChecker_OhmAdministratorMismatch

Thrown when the OHM administrator position in the TokenAdminRegistry does not
match the expectation: the OCG timelock is not the pending administrator while
the acceptance is included, or is not the administrator while it is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_OhmAdministratorMismatch(
        address administrator,
        address pendingAdministrator,
        bool acceptIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| administrator | `address` | The administrator read. |
| pendingAdministrator | `address` | The pending administrator read. |
| acceptIncluded | `bool` | Whether the acceptance is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_BridgeAdminRoleMismatch

Thrown when the DAO MS holds `bridge_admin` while the grant is included, or
lacks it while the grant is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_BridgeAdminRoleMismatch(bool held, bool grantIncluded);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| held | `bool` | Whether the DAO MS holds the role. |
| grantIncluded | `bool` | Whether the grant is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_ConfigEnabledMismatch

Thrown when the config policy is enabled while its `enable` is included, or
disabled while it is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_ConfigEnabledMismatch(
        bool enabled,
        bool enableIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | Whether the config policy is enabled. |
| enableIncluded | `bool` | Whether the `enable` is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_PoolOwnerMismatch

Thrown when the pool owner is not the expected one: the DAO MS while the
ownership acceptance is included, the config policy while it is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_PoolOwnerMismatch(address owner, address expected);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | `address` | The pool owner read. |
| expected | `address` | The expected owner. |

### CCIPTokenPoolConfigProposalChecker_ConfigOperatorMismatch

Thrown when the config operator of the config policy is the config timelock
while the rotation is included, or is not while the rotation is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_ConfigOperatorMismatch(
        address configOperator,
        address desired,
        bool setIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| configOperator | `address` | The config operator read. |
| desired | `address` | The config timelock. |
| setIncluded | `bool` | Whether the rotation is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_RebalancerMismatch

Thrown when the pool rebalancer equals the desired one while the setter is
included, or differs from it while the setter is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_RebalancerMismatch(
        address rebalancer,
        address desired,
        bool setIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rebalancer | `address` | The rebalancer read. |
| desired | `address` | The desired rebalancer. |
| setIncluded | `bool` | Whether the setter is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_RateLimitAdminMismatch

Thrown when the native rate limit admin of the pool equals the desired one while
the setter is included, or differs from it while the setter is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_RateLimitAdminMismatch(
        address rateLimitAdmin,
        address desired,
        bool setIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| rateLimitAdmin | `address` | The rate limit admin read. |
| desired | `address` | The desired rate limit admin. |
| setIncluded | `bool` | Whether the setter is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_TimelockEnabledMismatch

Thrown when the config timelock is enabled while its `enable` is included, or
disabled while it is not.

```solidity
error CCIPTokenPoolConfigProposalChecker_TimelockEnabledMismatch(
        bool enabled,
        bool enableIncluded
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| enabled | `bool` | Whether the config timelock is enabled. |
| enableIncluded | `bool` | Whether the `enable` is included in the proposal. |

### CCIPTokenPoolConfigProposalChecker_RouteAlreadyExists

Thrown when the pool already supports a route the proposal opens.

```solidity
error CCIPTokenPoolConfigProposalChecker_RouteAlreadyExists(uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

### CCIPTokenPoolConfigProposalChecker_BackingTooLow

Thrown when the pool holds less OHM than the minimum backing.

```solidity
error CCIPTokenPoolConfigProposalChecker_BackingTooLow(uint256 balance, uint256 minimum);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| balance | `uint256` | The OHM balance of the pool, in OHM base units. |
| minimum | `uint256` | The minimum backing, in OHM base units. |

## Structs

### Expectations

The expectations of one proposal build. Each `bool` says whether the proposal
includes the handover action of the same name; the checker asserts the
precondition the action needs when it is included and the end state the action
leaves when it is not.

```solidity
struct Expectations {
        bool acceptAdminRole;
        bool grantBridgeAdmin;
        bool enableConfig;
        bool acceptPoolOwnership;
        bool setConfigOperator;
        bool setRebalancer;
        bool setRateLimitAdmin;
        bool enableTimelock;
        address rebalancer;
        address rateLimitAdmin;
        uint64[] routesToAdd;
        uint256 minimumPoolBacking;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| acceptAdminRole | `bool` | The OCG timelock is the pending OHM administrator in the<br/>TokenAdminRegistry when true, the OHM administrator otherwise. |
| grantBridgeAdmin | `bool` | The DAO MS does not hold `bridge_admin` when true, holds it<br/>otherwise. |
| enableConfig | `bool` | The config policy is disabled when true, enabled otherwise. |
| acceptPoolOwnership | `bool` | The DAO MS owns the pool when true, the config policy<br/>otherwise. |
| setConfigOperator | `bool` | The config operator of the config policy differs from the<br/>config timelock when true, is the config timelock otherwise. |
| setRebalancer | `bool` | The pool rebalancer differs from `rebalancer` when true,<br/>equals it otherwise. |
| setRateLimitAdmin | `bool` | The native rate limit admin of the pool differs from<br/>`rateLimitAdmin` when true, equals it otherwise. |
| enableTimelock | `bool` | The config timelock is disabled when true, enabled otherwise. |
| rebalancer | `address` | The desired pool rebalancer. |
| rateLimitAdmin | `address` | The desired native rate limit admin of the pool. |
| routesToAdd | `uint64[]` | The chain selectors of the routes the proposal opens, none of<br/>which the pool supports. |
| minimumPoolBacking | `uint256` | The OHM balance the pool holds at least, in OHM base units. |
