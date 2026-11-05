# CCIPTokenPoolConfigProposalChecker

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/CCIPTokenPoolConfigProposalChecker.sol)

**Inherits:** [ICCIPTokenPoolConfigProposalChecker](/main/contracts/docs/src/proposals/interfaces/ICCIPTokenPoolConfigProposalChecker.sol/interface.ICCIPTokenPoolConfigProposalChecker)

**Title:** CCIPTokenPoolConfigProposalChecker

Read-only checker of the preconditions of the CCIP bridge activation proposal
(`CCIPTokenPoolConfigProposal`), called as the first action of that proposal. It is
bound at construction to the Kernel, the config policy, the config timelock, the
lock/release pool, OHM, the TokenAdminRegistry, the ROLES module, the OCG timelock
and the DAO MS of one chain, and holds no state beyond those bindings.

<i>

The constructor rejects a zero address and a set of contracts that are not bound to
each other the way the proposal requires. `check` reads the live state only; a call
into it from the OCG timelock returns normally when every expectation holds and
reverts with the named error of the first one that does not, which reverts the whole
execution before any handover action runs and leaves the proposal queued.

</i>

## Constants

### KERNEL

The Kernel both policies are active in.

```solidity
Kernel public immutable KERNEL;
```

### CONFIG

The config policy that owns the pool after the handover.

```solidity
ICCIPTokenPoolConfig public immutable CONFIG;
```

### CONFIG_TIMELOCK

The config timelock that is the config operator after the handover.

```solidity
ICCIPTokenPoolConfigTimelock public immutable CONFIG_TIMELOCK;
```

### POOL

The lock/release pool of OHM.

```solidity
ICCIPTokenPoolAdmin public immutable POOL;
```

### OHM

The OHM token.

```solidity
IERC20 public immutable OHM;
```

### REGISTRY

The Chainlink TokenAdminRegistry of the chain.

```solidity
ICCIPTokenAdminRegistry public immutable REGISTRY;
```

### ROLES

The ROLES module of the Kernel.

```solidity
ROLESv1 public immutable ROLES;
```

### OCG_TIMELOCK

The OCG timelock: the OHM administrator after the handover and the holder of
`admin`.

```solidity
address public immutable OCG_TIMELOCK;
```

### DAO_MS

The DAO MS: the pool owner before the handover and the holder of `bridge_admin`
after it.

```solidity
address public immutable DAO_MS;
```

## Functions

<a id="constructor-address-address-address-address-address-address-address-address-address"></a>

### constructor

Binds the checker to the contracts of one chain.

<i>

Reverts if:

- Any argument is the zero address (`CCIPTokenPoolConfigProposalChecker_ZeroAddress`).
- `config_` does not report `pool_` as its pool, `configTimelock_` does not report
`config_` as its config, either policy does not report `kernel_` as its Kernel,
`kernel_` does not report `roles_` as its ROLES module, or `pool_` does not
report `ohm_` as its token
(`CCIPTokenPoolConfigProposalChecker_BindingMismatch`).
- `config_` reports that `pool_` is not a liquidity container
(`CCIPTokenPoolConfigProposalChecker_NotLiquidityContainer`).

</i>

```solidity
constructor(
        address kernel_,
        address config_,
        address configTimelock_,
        address pool_,
        address ohm_,
        address registry_,
        address roles_,
        address ocgTimelock_,
        address daoMS_
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` | The Kernel. |
| config_ | `address` | The config policy. |
| configTimelock_ | `address` | The config timelock. |
| pool_ | `address` | The lock/release pool. |
| ohm_ | `address` | The OHM token. |
| registry_ | `address` | The TokenAdminRegistry. |
| roles_ | `address` | The ROLES module. |
| ocgTimelock_ | `address` | The OCG timelock. |
| daoMS_ | `address` | The DAO MS. |

<a id="check-expectations"></a>

### check

Asserts the expectations against the live state and returns normally when every
one of them holds. Intended to be the first action of the CCIP bridge activation
proposal, so that a precondition that no longer holds at execution fails the
proposal with a named error before any handover action runs; callable by anyone
at any time, since it reads only.

<i>

Reverts if, in this order:

- The config policy or the config timelock is not active in the Kernel
(`CCIPTokenPoolConfigProposalChecker_PolicyNotActive`).
- The Kernel does not report the bound ROLES module
(`CCIPTokenPoolConfigProposalChecker_BindingMismatch`).
- The pool registered for OHM in the TokenAdminRegistry is not the bound pool
(`CCIPTokenPoolConfigProposalChecker_RegisteredPoolMismatch`).
- The OCG timelock does not hold `admin`
(`CCIPTokenPoolConfigProposalChecker_MissingRole`).
- The OCG timelock is not the pending OHM administrator while `acceptAdminRole`
is set, or not the OHM administrator while it is not
(`CCIPTokenPoolConfigProposalChecker_OhmAdministratorMismatch`).
- The DAO MS holds `bridge_admin` while `grantBridgeAdmin` is set, or lacks it
while it is not (`CCIPTokenPoolConfigProposalChecker_BridgeAdminRoleMismatch`).
- The config policy is enabled while `enableConfig` is set, or disabled while
it is not (`CCIPTokenPoolConfigProposalChecker_ConfigEnabledMismatch`).
- The pool owner is not the DAO MS while `acceptPoolOwnership` is set, or not
the config policy while it is not
(`CCIPTokenPoolConfigProposalChecker_PoolOwnerMismatch`).
- The config operator is the config timelock while `setConfigOperator` is set,
or is not while it is not
(`CCIPTokenPoolConfigProposalChecker_ConfigOperatorMismatch`).
- The pool rebalancer equals `rebalancer` while `setRebalancer` is set, or
differs from it while it is not
(`CCIPTokenPoolConfigProposalChecker_RebalancerMismatch`).
- The native rate limit admin equals `rateLimitAdmin` while `setRateLimitAdmin`
is set, or differs from it while it is not
(`CCIPTokenPoolConfigProposalChecker_RateLimitAdminMismatch`).
- The config timelock is enabled while `enableTimelock` is set, or disabled
while it is not (`CCIPTokenPoolConfigProposalChecker_TimelockEnabledMismatch`).
- The pool supports a chain selector of `routesToAdd`, the first one in list
order (`CCIPTokenPoolConfigProposalChecker_RouteAlreadyExists`).
- The OHM balance of the pool is below `minimumPoolBacking`
(`CCIPTokenPoolConfigProposalChecker_BackingTooLow`).

</i>

```solidity
function check(Expectations calldata expectations_) external view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| expectations_ | `Expectations` | The expectations of the proposal build. |

<a id="_requireactive-address"></a>

### _requireActive

Reverts unless the policy is active in the Kernel.

```solidity
function _requireActive(address policy_) internal view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

<a id="_requireroutesabsent-uint64"></a>

### _requireRoutesAbsent

Reverts on the first chain selector of the list that the pool supports.

```solidity
function _requireRoutesAbsent(uint64[] calldata chainSelectors_) internal view;
```

**Parameters**

| Name            | Type       | Description |
| --------------- | ---------- | ----------- |
| chainSelectors_ | `uint64[]` |             |

<a id="_requirenonzero-address-string"></a>

### _requireNonZero

Reverts when the address is zero.

```solidity
function _requireNonZero(address value_, string memory parameter_) internal pure;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| value_     | `address` |             |
| parameter_ | `string`  |             |

<a id="_requirebinding-string-address-address"></a>

### _requireBinding

Reverts unless the value a bound contract reports equals the argument.

```solidity
function _requireBinding(
        string memory binding_,
        address actual_,
        address expected_
    ) internal pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| binding_  | `string`  |             |
| actual_   | `address` |             |
| expected_ | `address` |             |
