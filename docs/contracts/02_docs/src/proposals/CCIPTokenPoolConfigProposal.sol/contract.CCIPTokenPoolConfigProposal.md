# CCIPTokenPoolConfigProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/CCIPTokenPoolConfigProposal.sol)

**Inherits:** GovernorBravoProposal

OCG proposal that re-activates OHM bridging through Chainlink CCIP: it opens the
mainnet routes to Arbitrum, Optimism, Base, Berachain and Robinhood Chain on the OHM
token pool, and moves the pool under the CCIPTokenPoolConfig policy and its CCIPTokenPoolConfigTimelock
and the OHM administrator position in the Chainlink TokenAdminRegistry under the OCG
timelock.

The first action calls the deployed CCIPTokenPoolConfigProposalChecker, a read-only
contract that asserts at execution time what the build read: the precondition of
each handover action the proposal includes, the end state of each handover action
the live state already satisfies, the absence of the five routes from the pool and
the minimum backing of the pool. Every handover action is conditional on the live
state, so the proposal is idempotent with respect to steps that had already happened
when it was built; a step that happens between the build and the execution fails
the first action instead. The actions read, in order: check the preconditions,
accept the OHM administrator
role, grant `bridge_admin` to the DAO MS, enable the config policy, accept the pool
ownership, set the config timelock as config operator, set the OCG timelock as
rebalancer, clear the native rate limit admin, enable the config timelock, and add
the five routes through `CCIPTokenPoolConfig.addChain`. At most fourteen actions, so
no activator contract is needed.

The route actions come after the handover actions because `addChain` requires the
config policy to be enabled and to own the pool, both of which happen earlier in the
same execution. The gap between submission and execution is covered by the checker:
until execution the only party able to change the pool, the registry entry or the
routes is the DAO MS (the pool owner, the pool rebalancer and the OHM administrator
until the proposal accepts both transfers), and a change that invalidates an action
or lowers the backing below the minimum makes the first action revert with a named
error, so no handover action runs. The one change the checker cannot see is a
repointed pending pool owner, since the pool exposes no read of it; that case
reverts at the acceptance action with `MustBeProposedOwner`. If a route is added
directly before submission, the build-time check of the missing set fails closed:
investigate, rebuild and resubmit.

Assumes:

- CCIPTokenPoolConfig, CCIPTokenPoolConfigTimelock and
CCIPTokenPoolConfigProposalChecker have been deployed on Ethereum mainnet and
recorded in `src/proposals/addresses.json` and `src/scripts/env.json`.
- The DAO MS has run `CCIPTokenPoolConfigBatch.prepareHandover`: both policies are
active in the Kernel, CCIPTokenPoolConfig is the pending owner of the pool and the OCG
timelock is the pending OHM administrator in the TokenAdminRegistry.
- The OCG timelock holds the `admin` role.
- The live Solana route of the pool matches `olympus.config.CCIP.routes` in
`src/scripts/env.json`; the exact five routes to Arbitrum, Optimism, Base,
Berachain and Robinhood Chain are declared there and missing from the pool.
- The burn/mint pools of those five chains are deployed and recorded in
`src/scripts/env.json` (`olympus.policies.CCIPBurnMintTokenPool`), since each route
resolves its accepted remote pool from there unless it declares an explicit
`remotePools` override; so is the OHM of Robinhood Chain (`olympus.legacy.OHM`),
the default remote token of its route, which the tracked file records as the zero
address until it is deployed.
- The pool holds at least `olympus.config.CCIP.minimumPoolBacking` OHM (the supply
outstanding on the burn/mint chains; `CCIPTokenPoolBatch.fundPool`).
- Every mainnet lane toward the five chains carries an enabled OHM fee entry with a
delivery gas budget of at least 175000, obtained from Chainlink.

## Constants

### _ENV_PATH

```solidity
string internal constant _ENV_PATH = "./src/scripts/env.json";
```

### _EXPECTED_ROUTE_COUNT

<i>

The chain selectors of the five routes this proposal opens. The build fails closed
unless the set of desired routes missing from the pool equals exactly this set.

</i>

```solidity
uint256 internal constant _EXPECTED_ROUTE_COUNT = 5;
```

### _ARBITRUM_SELECTOR

```solidity
uint64 internal constant _ARBITRUM_SELECTOR = 4949039107694359620;
```

### _OPTIMISM_SELECTOR

```solidity
uint64 internal constant _OPTIMISM_SELECTOR = 3734403246176062136;
```

### _BASE_SELECTOR

```solidity
uint64 internal constant _BASE_SELECTOR = 15971525489660198786;
```

### _BERACHAIN_SELECTOR

```solidity
uint64 internal constant _BERACHAIN_SELECTOR = 1294465214383781161;
```

### _ROBINHOOD_SELECTOR

```solidity
uint64 internal constant _ROBINHOOD_SELECTOR = 6180753054346818345;
```

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

## Functions

<a id="id"></a>

### id

```solidity
function id() public pure override returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="name"></a>

### name

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="description"></a>

### description

```solidity
function description() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_descriptionpreamble"></a>

### _descriptionPreamble

```solidity
function _descriptionPreamble() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_descriptionsteps"></a>

### _descriptionSteps

```solidity
function _descriptionSteps() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_deploy-addresses-address"></a>

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_build-addresses"></a>

### _build

```solidity
function _build(Addresses addresses) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |

<a id="_expectations-contracts-ccipconfiglib-desiredconfig-uint256"></a>

### _expectations

Reads the live state that decides each conditional handover action and records
the decisions as the expectations of the checker: for each action, whether it is
included, which the checker turns into the precondition the action needs or the
end state the action would have left.

<i>

Reverts with `PendingMismatch` when a two-step transfer is neither completed nor
pending to the right party, and with `AddressMismatch` when the registry does
not register the pool, when the pool ownership is to be accepted but the DAO MS
does not own the pool, or when the grant of `bridge_admin` is needed but the OCG
timelock does not administer RolesAdmin. The route selectors are filled by the
caller from `_missingRoutes`.

</i>

```solidity
function _expectations(
        Contracts memory c,
        CCIPConfigLib.DesiredConfig memory desired,
        uint256 minBacking_
    ) internal view returns (ICCIPTokenPoolConfigProposalChecker.Expectations memory e);
```

**Parameters**

| Name        | Type                          | Description |
| ----------- | ----------------------------- | ----------- |
| c           | `Contracts`                   |             |
| desired     | `CCIPConfigLib.DesiredConfig` |             |
| minBacking_ | `uint256`                     |             |

**Returns**

| Name | Type                                               | Description |
| ---- | -------------------------------------------------- | ----------- |
| e    | `ICCIPTokenPoolConfigProposalChecker.Expectations` |             |

<a id="_pushauthorityactions-contracts-icciptokenpoolconfigproposalchecker-expectations"></a>

### _pushAuthorityActions

Adds the registry and role actions the expectations include: accept the OHM
administrator role and grant `bridge_admin` to the DAO MS.

```solidity
function _pushAuthorityActions(
        Contracts memory c,
        ICCIPTokenPoolConfigProposalChecker.Expectations memory e
    ) internal;
```

**Parameters**

| Name | Type                                               | Description |
| ---- | -------------------------------------------------- | ----------- |
| c    | `Contracts`                                        |             |
| e    | `ICCIPTokenPoolConfigProposalChecker.Expectations` |             |

<a id="_pushconfigactions-contracts-icciptokenpoolconfigproposalchecker-expectations"></a>

### _pushConfigActions

Adds the config policy and timelock actions the expectations include: enable the
config policy, accept the pool ownership, set the config operator, the rebalancer
and the rate limit admin, and enable the timelock.

```solidity
function _pushConfigActions(
        Contracts memory c,
        ICCIPTokenPoolConfigProposalChecker.Expectations memory e
    ) internal;
```

**Parameters**

| Name | Type                                               | Description |
| ---- | -------------------------------------------------- | ----------- |
| c    | `Contracts`                                        |             |
| e    | `ICCIPTokenPoolConfigProposalChecker.Expectations` |             |

<a id="_missingroutes-contracts"></a>

### _missingRoutes

Returns one `addChain` update per desired route missing from the pool, in remote
chain name order with the remote chain names alongside, and requires the missing
set to be exactly the five expected chains (Arbitrum, Optimism, Base, Berachain,
Robinhood Chain).
Each update passes the config policy's own validation.

<i>

Fails closed on any drift: a missing route outside the expected set (an undeclared
selector cannot appear here since the routes come from `env.json`, so this means the
declaration changed), or an expected route that is already configured (someone added
it directly while the DAO MS still owned the pool). Both need investigation and a
rebuild rather than a silently smaller proposal.

</i>

```solidity
function _missingRoutes(
        Contracts memory c
    )
        internal
        view
        returns (ICCIPTokenPoolAdmin.ChainUpdate[] memory updates, string[] memory names);
```

**Parameters**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

**Returns**

| Name    | Type                                | Description |
| ------- | ----------------------------------- | ----------- |
| updates | `ICCIPTokenPoolAdmin.ChainUpdate[]` |             |
| names   | `string[]`                          |             |

<a id="_pushrouteactions-contracts-icciptokenpooladmin-chainupdate-string"></a>

### _pushRouteActions

Adds one `addChain` action per route update, in the order given.

```solidity
function _pushRouteActions(
        Contracts memory c,
        ICCIPTokenPoolAdmin.ChainUpdate[] memory updates,
        string[] memory names
    ) internal;
```

**Parameters**

| Name    | Type                                | Description |
| ------- | ----------------------------------- | ----------- |
| c       | `Contracts`                         |             |
| updates | `ICCIPTokenPoolAdmin.ChainUpdate[]` |             |
| names   | `string[]`                          |             |

<a id="_selectorsof-icciptokenpooladmin-chainupdate"></a>

### _selectorsOf

The chain selectors of the route updates, in the same order.

```solidity
function _selectorsOf(
        ICCIPTokenPoolAdmin.ChainUpdate[] memory updates
    ) internal pure returns (uint64[] memory selectors);
```

**Parameters**

| Name    | Type                                | Description |
| ------- | ----------------------------------- | ----------- |
| updates | `ICCIPTokenPoolAdmin.ChainUpdate[]` |             |

**Returns**

| Name      | Type       | Description |
| --------- | ---------- | ----------- |
| selectors | `uint64[]` |             |

<a id="_endstateexpectations-ccipconfiglib-desiredconfig-uint256"></a>

### _endStateExpectations

The expectations of the end state the proposal leaves: no handover action
included, no route to add, the declared rebalancer, rate limit admin and
minimum backing.

```solidity
function _endStateExpectations(
        CCIPConfigLib.DesiredConfig memory desired,
        uint256 minBacking_
    ) internal pure returns (ICCIPTokenPoolConfigProposalChecker.Expectations memory e);
```

**Parameters**

| Name        | Type                          | Description |
| ----------- | ----------------------------- | ----------- |
| desired     | `CCIPConfigLib.DesiredConfig` |             |
| minBacking_ | `uint256`                     |             |

**Returns**

| Name | Type                                               | Description |
| ---- | -------------------------------------------------- | ----------- |
| e    | `ICCIPTokenPoolConfigProposalChecker.Expectations` |             |

<a id="_minimumpoolbacking"></a>

### _minimumPoolBacking

Reads `olympus.config.CCIP.minimumPoolBacking` of the chain.

```solidity
function _minimumPoolBacking() internal view returns (uint256 minBacking);
```

**Returns**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| minBacking | `uint256` |             |

<a id="_requirebackingandfeebudgets-contracts-uint256"></a>

### _requireBackingAndFeeBudgets

Reverts unless the pool holds the minimum backing and every mainnet lane toward a
burn/mint destination carries the raised OHM delivery gas budget. Checked at build
time and re-checked by `_validate`.

```solidity
function _requireBackingAndFeeBudgets(Contracts memory c, uint256 minBacking_) internal view;
```

**Parameters**

| Name        | Type        | Description |
| ----------- | ----------- | ----------- |
| c           | `Contracts` |             |
| minBacking_ | `uint256`   |             |

<a id="_run-addresses-address"></a>

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_validate-addresses-address"></a>

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_validatelifecycle-contracts"></a>

### _validateLifecycle

```solidity
function _validateLifecycle(Contracts memory c) internal view;
```

**Parameters**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

<a id="_validatepoolauthority-contracts-ccipconfiglib-desiredconfig"></a>

### _validatePoolAuthority

```solidity
function _validatePoolAuthority(
        Contracts memory c,
        CCIPConfigLib.DesiredConfig memory desired
    ) internal view;
```

**Parameters**

| Name    | Type                          | Description |
| ------- | ----------------------------- | ----------- |
| c       | `Contracts`                   |             |
| desired | `CCIPConfigLib.DesiredConfig` |             |

<a id="_validateregistry-contracts"></a>

### _validateRegistry

```solidity
function _validateRegistry(Contracts memory c) internal view;
```

**Parameters**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

<a id="_validateroles-contracts-address"></a>

### _validateRoles

```solidity
function _validateRoles(Contracts memory c, address proposer) internal view;
```

**Parameters**

| Name     | Type        | Description |
| -------- | ----------- | ----------- |
| c        | `Contracts` |             |
| proposer | `address`   |             |

<a id="_validateparameters-contracts-ccipconfiglib-desiredconfig"></a>

### _validateParameters

```solidity
function _validateParameters(
        Contracts memory c,
        CCIPConfigLib.DesiredConfig memory desired
    ) internal view;
```

**Parameters**

| Name    | Type                          | Description |
| ------- | ----------------------------- | ----------- |
| c       | `Contracts`                   |             |
| desired | `CCIPConfigLib.DesiredConfig` |             |

<a id="_requiredeployment-contracts"></a>

### _requireDeployment

Reverts unless the config policy, the timelock and the pool are bound together,
the pool serves OHM and the checker is bound to the same contracts and accounts.

```solidity
function _requireDeployment(Contracts memory c) internal view;
```

**Parameters**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

<a id="_requirecheckerbindings-contracts"></a>

### _requireCheckerBindings

Reverts unless the checker reports the contracts and accounts this proposal acts
on as its bindings.

```solidity
function _requireCheckerBindings(Contracts memory c) internal view;
```

**Parameters**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

<a id="_requireversion-address"></a>

### _requireVersion

Reverts unless the policy reports version 1.0.

```solidity
function _requireVersion(address policy_) internal view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

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

<a id="_requireenabled-address"></a>

### _requireEnabled

Reverts unless the policy is enabled.

```solidity
function _requireEnabled(address policy_) internal view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| policy_ | `address` |             |

<a id="_requirerole-rolesv1-bytes32-address"></a>

### _requireRole

Reverts unless the account holds the role.

```solidity
function _requireRole(ROLESv1 roles_, bytes32 role_, address account_) internal view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| roles_   | `ROLESv1` |             |
| role_    | `bytes32` |             |
| account_ | `address` |             |

<a id="_requireaddress-string-address-address"></a>

### _requireAddress

Reverts unless the read address equals the expected one.

```solidity
function _requireAddress(
        string memory field_,
        address actual_,
        address expected_
    ) internal pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| field_    | `string`  |             |
| actual_   | `address` |             |
| expected_ | `address` |             |

<a id="_requireparameter-string-uint256-uint256"></a>

### _requireParameter

Reverts unless the read parameter equals the declared one.

```solidity
function _requireParameter(
        string memory name_,
        uint256 actual_,
        uint256 expected_
    ) internal pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| name_     | `string`  |             |
| actual_   | `uint256` |             |
| expected_ | `uint256` |             |

<a id="_requireroutesmatchenv-icciptokenpooladmin-bool"></a>

### _requireRoutesMatchEnv

Reverts unless every route declared in `env.json` matches the pool field by
field (existence, remote token, accepted remote pools and both rate limits),
every live route of the pool is declared as enabled in `env.json` with both
limiters enabled, and every route declared with `enabled: false` (the removal
marker) is absent from the pool.

```solidity
function _requireRoutesMatchEnv(
        ICCIPTokenPoolAdmin pool_,
        bool requireDesiredLive_
    ) internal view;
```

**Parameters**

| Name                | Type                  | Description                                                                                                                                                                                                      |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pool_               | `ICCIPTokenPoolAdmin` |                                                                                                                                                                                                                  |
| requireDesiredLive_ | `bool`                | Whether a desired enabled route missing from the pool reverts.<br/>The build passes false and requires the missing set to equal the five expected<br/>chains instead; the post-execution validation passes true. |

<a id="_requireliveroutesdeclared-icciptokenpooladmin-ccipconfiglib-desiredroute"></a>

### _requireLiveRoutesDeclared

Reverts unless every live route of the pool is declared as enabled in `env.json`
with both limiters enabled.

```solidity
function _requireLiveRoutesDeclared(
        ICCIPTokenPoolAdmin pool_,
        CCIPConfigLib.DesiredRoute[] memory desired
    ) internal view;
```

**Parameters**

| Name    | Type                           | Description |
| ------- | ------------------------------ | ----------- |
| pool_   | `ICCIPTokenPoolAdmin`          |             |
| desired | `CCIPConfigLib.DesiredRoute[]` |             |

<a id="_requiredesiredroutesconverged-icciptokenpooladmin-ccipconfiglib-desiredroute-bool"></a>

### _requireDesiredRoutesConverged

Reverts unless every desired route matches the pool: a route declared with
`enabled: false` is absent, an enabled route is present (when required) and
matches field by field.

```solidity
function _requireDesiredRoutesConverged(
        ICCIPTokenPoolAdmin pool_,
        CCIPConfigLib.DesiredRoute[] memory desired,
        bool requireDesiredLive_
    ) internal view;
```

**Parameters**

| Name                | Type                           | Description |
| ------------------- | ------------------------------ | ----------- |
| pool_               | `ICCIPTokenPoolAdmin`          |             |
| desired             | `CCIPConfigLib.DesiredRoute[]` |             |
| requireDesiredLive_ | `bool`                         |             |

<a id="_contracts-addresses"></a>

### _contracts

```solidity
function _contracts(Addresses addresses) internal view returns (Contracts memory c);
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |

**Returns**

| Name | Type        | Description |
| ---- | ----------- | ----------- |
| c    | `Contracts` |             |

<a id="_pendingowner-address"></a>

### _pendingOwner

```solidity
function _pendingOwner(address pool_) internal view returns (address pending);
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| pool_ | `address` |             |

**Returns**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| pending | `address` |             |

<a id="_readenv"></a>

### _readEnv

Reads `env.json`, the desired-state source that the proposal validates the
deployment and the routes against.

<i>

Read from disk on every use rather than cached in storage: `run` executes as one
isolated transaction under the block gas limit, and storing the file would spend most
of it.

</i>

```solidity
function _readEnv() internal view virtual returns (string memory env);
```

**Returns**

| Name | Type     | Description |
| ---- | -------- | ----------- |
| env  | `string` |             |

<a id="_chain"></a>

### _chain

```solidity
function _chain() internal view returns (string memory chain);
```

**Returns**

| Name  | Type     | Description |
| ----- | -------- | ----------- |
| chain | `string` |             |

## Errors

### CCIPTokenPoolConfigProposal_AddressMismatch

Thrown when an address read from the chain or from `env.json` differs from the
expected one.

```solidity
error CCIPTokenPoolConfigProposal_AddressMismatch(
        string field,
        address actual,
        address expected
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| field | `string` | The name of the compared field. |
| actual | `address` | The value read. |
| expected | `address` | The expected value. |

### CCIPTokenPoolConfigProposal_PendingMismatch

Thrown when a two-step transfer is not in the expected state: at build time the
expected value is the party that must accept (run
`CCIPTokenPoolConfigBatch.prepareHandover` first), after execution it is the zero
address.

```solidity
error CCIPTokenPoolConfigProposal_PendingMismatch(
        string field,
        address pending,
        address expected
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| field | `string` | The name of the transferred authority. |
| pending | `address` | The pending value read. |
| expected | `address` | The expected pending value. |

### CCIPTokenPoolConfigProposal_MissingRole

Thrown when an account does not hold a required role.

```solidity
error CCIPTokenPoolConfigProposal_MissingRole(bytes32 role, address account);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | `bytes32` | The role. |
| account | `address` | The account. |

### CCIPTokenPoolConfigProposal_RoleNotUnassigned

Thrown when an account holds a role that must be unassigned at launch.

```solidity
error CCIPTokenPoolConfigProposal_RoleNotUnassigned(bytes32 role, address account);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | `bytes32` | The role. |
| account | `address` | The account. |

### CCIPTokenPoolConfigProposal_PolicyNotActive

Thrown when a policy is not active in the Kernel (run
`CCIPTokenPoolConfigBatch.prepareHandover` first).

```solidity
error CCIPTokenPoolConfigProposal_PolicyNotActive(address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The policy. |

### CCIPTokenPoolConfigProposal_PolicyNotEnabled

Thrown when a policy is not enabled.

```solidity
error CCIPTokenPoolConfigProposal_PolicyNotEnabled(address policy);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The policy. |

### CCIPTokenPoolConfigProposal_NotLiquidityContainer

Thrown when the pool does not advertise the liquidity container interface.

```solidity
error CCIPTokenPoolConfigProposal_NotLiquidityContainer(address pool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pool | `address` | The pool. |

### CCIPTokenPoolConfigProposal_VersionMismatch

Thrown when a policy does not report version 1.0.

```solidity
error CCIPTokenPoolConfigProposal_VersionMismatch(address policy, uint8 major, uint8 minor);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| policy | `address` | The policy. |
| major | `uint8` | The reported major version. |
| minor | `uint8` | The reported minor version. |

### CCIPTokenPoolConfigProposal_ParameterMismatch

Thrown when a numeric parameter differs from the value declared in `env.json`.

```solidity
error CCIPTokenPoolConfigProposal_ParameterMismatch(
        string name,
        uint256 actual,
        uint256 expected
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | `string` | The parameter name. |
| actual | `uint256` | The value read. |
| expected | `uint256` | The declared value. |

### CCIPTokenPoolConfigProposal_NoRoutesDeclared

Thrown when `env.json` declares no CCIP route for the chain.

```solidity
error CCIPTokenPoolConfigProposal_NoRoutesDeclared();
```

### CCIPTokenPoolConfigProposal_RouteUndeclared

Thrown when a live route of the pool is not declared as enabled in `env.json`.

```solidity
error CCIPTokenPoolConfigProposal_RouteUndeclared(uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

### CCIPTokenPoolConfigProposal_RouteLimiterDisabled

Thrown when a live route carries a disabled rate limiter.

```solidity
error CCIPTokenPoolConfigProposal_RouteLimiterDisabled(uint64 chainSelector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainSelector | `uint64` | The chain selector of the route. |

### CCIPTokenPoolConfigProposal_RouteNotRemoved

Thrown when a route declared with `enabled: false` is still configured on the
pool (remove it through `CCIPRouteReconcileBatch` before the proposal).

```solidity
error CCIPTokenPoolConfigProposal_RouteNotRemoved(string remoteChain);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChain | `string` | The remote chain name. |

### CCIPTokenPoolConfigProposal_RouteMissing

Thrown when an enabled desired route is not configured on the pool after
execution.

```solidity
error CCIPTokenPoolConfigProposal_RouteMissing(string remoteChain);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChain | `string` | The remote chain name. |

### CCIPTokenPoolConfigProposal_RouteDrift

Thrown when a live route differs from its `env.json` declaration (reconcile it
before the proposal: direct pool owner batch before the handover, config timelock
afterwards).

```solidity
error CCIPTokenPoolConfigProposal_RouteDrift(string remoteChain);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChain | `string` | The remote chain name. |

### CCIPTokenPoolConfigProposal_UnexpectedMissingRoute

Thrown when a desired route missing from the pool is not one of the five chains
this proposal opens.

```solidity
error CCIPTokenPoolConfigProposal_UnexpectedMissingRoute(string remoteChain);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| remoteChain | `string` | The remote chain name. |

### CCIPTokenPoolConfigProposal_MissingRouteSetMismatch

Thrown when the set of desired routes missing from the pool is not exactly the
five chains this proposal opens (investigate, rebuild and resubmit).

```solidity
error CCIPTokenPoolConfigProposal_MissingRouteSetMismatch(
        uint256 missingCount,
        uint256 expectedCount
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| missingCount | `uint256` | The number of missing routes among the expected chains. |
| expectedCount | `uint256` | The number of expected chains. |

### CCIPTokenPoolConfigProposal_BackingTooLow

Thrown when the pool holds less OHM than `olympus.config.CCIP.minimumPoolBacking`
(re-read `shell/calc_bridged_supply.sh` and run `CCIPTokenPoolBatch.fundPool`
first).

```solidity
error CCIPTokenPoolConfigProposal_BackingTooLow(uint256 balance, uint256 minimum);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| balance | `uint256` | The OHM balance of the pool. |
| minimum | `uint256` | The required minimum. |

## Structs

### Contracts

<i>

The contracts and accounts the proposal acts on, resolved from the address registry.

</i>

```solidity
struct Contracts {
        ICCIPTokenPoolConfig config;
        ICCIPTokenPoolConfigTimelock configTimelock;
        CCIPTokenPoolConfigProposalChecker checker;
        ICCIPTokenPoolAdmin pool;
        ICCIPTokenAdminRegistry registry;
        ROLESv1 roles;
        address rolesAdmin;
        address ohm;
        address daoMS;
        address emergencyMS;
        address ocgTimelock;
        address bridge;
    }
```

**Properties**

| Name           | Type                                 | Description |
| -------------- | ------------------------------------ | ----------- |
| config         | `ICCIPTokenPoolConfig`               |             |
| configTimelock | `ICCIPTokenPoolConfigTimelock`       |             |
| checker        | `CCIPTokenPoolConfigProposalChecker` |             |
| pool           | `ICCIPTokenPoolAdmin`                |             |
| registry       | `ICCIPTokenAdminRegistry`            |             |
| roles          | `ROLESv1`                            |             |
| rolesAdmin     | `address`                            |             |
| ohm            | `address`                            |             |
| daoMS          | `address`                            |             |
| emergencyMS    | `address`                            |             |
| ocgTimelock    | `address`                            |             |
| bridge         | `address`                            |             |
