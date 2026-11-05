# LZBridgeAndDelegateConfig

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/LZBridgeAndDelegateConfig.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnablerV2](/main/contracts/docs/src/policies/utils/PolicyEnablerV2.sol/abstract.PolicyEnablerV2), [TimelockBatchQueue](/main/contracts/docs/src/policies/utils/TimelockBatchQueue.sol/abstract.TimelockBatchQueue), [ILZBridgeAndDelegateConfig](/main/contracts/docs/src/policies/interfaces/ILZBridgeAndDelegateConfig.sol/interface.ILZBridgeAndDelegateConfig), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** LZBridgeAndDelegateConfig

Timelock policy that owns LayerZero bridge configuration on behalf of an
LZBridgeGateway, LZEndpointDelegate, and periphery LZCrossChainBridge triple.

<i>

The policy is intended to hold the `bridge_configurator` role on the
gateway/delegate and to be pinned as the periphery bridge's `configurator`. The
`queue` entry point packs one or more gateway/delegate/facilitator sub-actions into
a single atomic timelock entry; each sub-action's proposer role and payload shape is
validated at queue time and dispatched at execution time via a typed call against
the configured target. The policy's own configuration (target slots, timelock delay)
is managed through the typed `queueSetTarget*` and `queueSetTimelockDelay` helpers;
`queue` deliberately rejects self-targeted sub-actions so that these privileged
rotations cannot be smuggled into an arbitrary batch. Cancellation is gated to the
emergency role only, so the proposer cannot rescind its own queued action; the
emergency role is intended for a multisig veto independent of the proposer roles.
Disabling the policy suspends queueing and execution but does not clear queued
actions; before re-enabling, the emergency role must cancel any queued action that
should not become executable again.

</i>

## Constants

### MIN_TIMELOCK_DELAY

Minimum accepted timelock delay.

```solidity
uint48 public constant override MIN_TIMELOCK_DELAY = 1 days;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

### MAX_TIMELOCK_DELAY

Maximum accepted timelock delay.

```solidity
uint48 public constant override MAX_TIMELOCK_DELAY = 30 days;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

### EXECUTION_WINDOW

Length of the window after `executableAt` during which a queued action may be
executed before it expires.

```solidity
uint48 public constant override EXECUTION_WINDOW = 3 days;
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `uint48` |             |

### _LEN_SINGLE_WORD

<i>

Exact ABI-encoded length of a single static-word payload: `(address)`,
`(uint256)`, or `(uint32)`.

</i>

```solidity
uint256 internal constant _LEN_SINGLE_WORD = 32;
```

### _LEN_SEND_LIBRARY

<i>

Exact ABI-encoded length of the `setSendLibrary` `(uint32, address)` payload.

</i>

```solidity
uint256 internal constant _LEN_SEND_LIBRARY = 64;
```

### _LEN_RECEIVE_LIBRARY

<i>

Exact ABI-encoded length of the `setReceiveLibrary` and
`setReceiveLibraryTimeout` `(uint32, address, uint256)` payload.

</i>

```solidity
uint256 internal constant _LEN_RECEIVE_LIBRARY = 96;
```

### _MIN_LEN_DYNAMIC_ARRAY

<i>

Minimal ABI-encoded length of a single dynamic-array payload (`T[]`): the head
offset word plus an empty array's length word.

</i>

```solidity
uint256 internal constant _MIN_LEN_DYNAMIC_ARRAY = 64;
```

### _MIN_LEN_ENDPOINT_CONFIG

<i>

Minimal ABI-encoded length of the `setEndpointConfig`
`(address, SetConfigParam[])` payload: the address word, the array offset word,
and an empty array's length word.

</i>

```solidity
uint256 internal constant _MIN_LEN_ENDPOINT_CONFIG = 96;
```

### _KEYCODE_ROLES

Pre-computed keycode for the ROLES module dependency.

<i>

Avoids the runtime cost of `toKeycode("ROLES")` at the call site.

</i>

```solidity
Keycode internal constant _KEYCODE_ROLES = Keycode.wrap(0x524F4C4553);
```

## State Variables

### gateway

The LZBridgeGateway this policy manages.

```solidity
address public override gateway;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### delegate

The LZEndpointDelegate this policy manages.

```solidity
address public override delegate;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### facilitator

The periphery LZCrossChainBridge this policy manages.

```solidity
address public override facilitator;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### subActionTargetKind

Records, per queued sub-action, the `TargetKind` it was validated against at
queue time: `subActionTargetKind[actionId][index]`.

<i>

Returns `NONE` for unknown action ids or indices. Entries are cleared when
consumed by `_executeSubAction` and on cancellation by `_onActionCancelled`, so
no stale entries remain once an action completes.

</i>

```solidity
mapping(uint64 actionId_ => mapping(uint256 index_ => TargetKind)) public subActionTargetKind;
```

## Functions

<a id="constructor-kernel-address-address-address-uint48"></a>

### constructor

<i>

Reverts if any address argument is zero or the initial delay is outside
`[MIN_TIMELOCK_DELAY, MAX_TIMELOCK_DELAY]`.

</i>

```solidity
constructor(
        Kernel kernel_,
        address gateway_,
        address delegate_,
        address facilitator_,
        uint48 initialTimelockDelay_
    ) Policy(kernel_) TimelockBatchQueue(initialTimelockDelay_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | Bophades kernel. |
| gateway_ | `address` | LZBridgeGateway to manage. |
| delegate_ | `address` | LZEndpointDelegate to manage. |
| facilitator_ | `address` | Periphery LZCrossChainBridge to manage. |
| initialTimelockDelay_ | `uint48` | Initial timelock delay; validated by `_validateTimelockDelay`. |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

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

```solidity
function requestPermissions() external pure override returns (Permissions[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

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

<a id="queuesettargetgateway-address"></a>

### queueSetTargetGateway

Queues a self-call updating the policy's `gateway` target slot.

<i>

Reverts if:

- The policy is disabled
- The caller does not have the `admin` role
- `newGateway_` is the zero address

</i>

```solidity
function queueSetTargetGateway(
        address newGateway_
    ) external override returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newGateway_ | `address` | The new gateway address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettargetdelegate-address"></a>

### queueSetTargetDelegate

Queues a self-call updating the policy's `delegate` target slot.

<i>

Reverts if:

- The policy is disabled
- The caller does not have the `admin` role
- `newDelegate_` is the zero address

</i>

```solidity
function queueSetTargetDelegate(
        address newDelegate_
    ) external override returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelegate_ | `address` | The new delegate address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettargetfacilitator-address"></a>

### queueSetTargetFacilitator

Queues a self-call updating the policy's `facilitator` target slot.

<i>

Reverts if:

- The policy is disabled
- The caller does not have the `admin` role
- `newFacilitator_` is the zero address

</i>

```solidity
function queueSetTargetFacilitator(
        address newFacilitator_
    ) external override returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newFacilitator_ | `address` | The new facilitator address. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queuesettimelockdelay-uint48"></a>

### queueSetTimelockDelay

Queues a self-call updating the configured timelock delay.

<i>

Reverts if:

- The policy is disabled
- The caller does not have the `admin` role
- `delay_` is outside `[MIN_TIMELOCK_DELAY, MAX_TIMELOCK_DELAY]`

</i>

```solidity
function queueSetTimelockDelay(uint48 delay_) external override returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new timelock delay in seconds. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="queue-itimelockbatchqueue-batchaction"></a>

### queue

Queues a batch of one or more gateway, delegate, or facilitator sub-actions
for atomic timelocked execution.

<i>

Reverts if:

- The policy is disabled
- The batch is empty
- The batch exceeds the maximum batch size
- Any sub-action targets this policy (self-actions must use the typed
`queueSetTarget*` / `queueSetTimelockDelay` helpers)
- Any sub-action target is not the gateway, delegate, or facilitator
- The caller does not hold the proposer role required by any sub-action
- Any sub-action payload cannot be decoded into the expected types

</i>

```solidity
function queue(
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

<a id="_onsubactionqueued-address-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _onSubActionQueued

<i>

Validates the proposer's role and the (target, selector, payload) triple against
the supported action table, then records the resolved `TargetKind`.

</i>

Reverts if:

- The policy is disabled
- The action's target is unknown
- The proposer lacks the role required by the action
- The payload cannot be decoded into the expected types for the action

```solidity
function _onSubActionQueued(
        address caller_,
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account queueing the action. |
| actionId_ | `uint64` | The id the batch will be stored under. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action being queued. |

<a id="_validateexecution-address-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateExecution

<i>

Execution is permissionless once the timelock elapses; this hook only enforces
enabled status. The proposer was authorized at queue time by `_onSubActionQueued`,
and requiring an execution role would let an unavailable or compromised executor
block already-approved changes. The queue-to-execution target binding is enforced
per sub-action in `_executeSubAction`: dispatch is by the `TargetKind` recorded at
queue time.

</i>

Disabling the policy suspends execution but does not clear the queue: queued
actions remain in storage and become executable again once the policy is
re-enabled, for as long as their execution windows have not expired. Before
re-enabling, the emergency role must therefore cancel every queued action that
should not survive the disable, such as an action queued by a compromised
proposer.

Reverts if:

- The policy is disabled

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

Cancellation is restricted to the emergency role; the proposer cannot rescind
its own queued action. Intentionally permitted while the policy is disabled so
stale or unwanted queued actions can be cleared before the policy is re-enabled.

</i>

Reverts if:

- The caller does not have the emergency role

```solidity
function _validateCancellation(
        address caller_,
        uint64,
        ITimelockBatchQueue.QueuedAction storage
    ) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account cancelling the action. |
| _ | `uint64` | The queued action ID. |
| _ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference, including the sub-actions. |

<a id="_executesubaction-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _executeSubAction

<i>

Dispatches by the `TargetKind` recorded at queue time, and asserts the slot for
that kind still holds the queued address before forwarding the call.
The payload-shape checks performed at queue time are deliberately not re-run here,
since storage already holds the queued action and ABI decoding will revert on mismatch.
The recorded kind is consumed exactly once, so its entry is cleared before
dispatch; a revert in the dispatched call rolls the deletion back with the batch.

</i>

Reverts if:

- The recorded kind's target slot no longer holds the queued address
- No kind was recorded for the sub-action

```solidity
function _executeSubAction(
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action to execute. |

<a id="_onactioncancelled-uint64-uint256"></a>

### _onActionCancelled

Hook invoked once when a queued action is cancelled, after the stored
sub-actions have been cleared.

<i>

Clears the per-sub-action `TargetKind` entries recorded at queue time so no
stale entries remain after cancellation.

</i>

```solidity
function _onActionCancelled(uint64 actionId_, uint256 subActionCount_) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The cancelled action ID. |
| subActionCount_ | `uint256` | The number of sub-actions the action held before clearing. |

<a id="_requiretargetunchanged-uint64-uint256-address-address"></a>

### _requireTargetUnchanged

Reverts if the slot for a sub-action's recorded `TargetKind` no longer holds
the address the action was queued against.

```solidity
function _requireTargetUnchanged(
        uint64 actionId_,
        uint256 index_,
        address queued_,
        address current_
    ) private pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| actionId_ | `uint64`  |             |
| index_    | `uint256` |             |
| queued_   | `address` |             |
| current_  | `address` |             |

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
function _executionWindow() internal pure override returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` | The execution window in seconds. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface.

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(EnablerV2, TimelockBatchQueue) returns (bool);
```

**Parameters**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| interfaceId_ | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="_requirebridgeadminproposer-address"></a>

### _requireBridgeAdminProposer

Requires the caller to hold `bridge_admin` or `admin`.

```solidity
function _requireBridgeAdminProposer(address caller_) private view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| caller_ | `address` |             |

<a id="_requireratelimiterproposer-address"></a>

### _requireRateLimiterProposer

Requires the caller to hold `bridge_rate_limiter`, `bridge_admin`, or `admin`.

```solidity
function _requireRateLimiterProposer(address caller_) private view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| caller_ | `address` |             |

<a id="_requireadminproposer-address"></a>

### _requireAdminProposer

Requires the caller to hold `admin`.

```solidity
function _requireAdminProposer(address caller_) private view;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| caller_ | `address` |             |

<a id="_validategatewaysubaction-address-itimelockbatchqueue-batchaction"></a>

### _validateGatewaySubAction

```solidity
function _validateGatewaySubAction(
        address caller_,
        ITimelockBatchQueue.BatchAction memory action_
    ) private view;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| caller_ | `address`                         |             |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_validatedelegatesubaction-address-itimelockbatchqueue-batchaction"></a>

### _validateDelegateSubAction

```solidity
function _validateDelegateSubAction(
        address caller_,
        ITimelockBatchQueue.BatchAction memory action_
    ) private view;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| caller_ | `address`                         |             |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_validatefacilitatorsubaction-address-itimelockbatchqueue-batchaction"></a>

### _validateFacilitatorSubAction

```solidity
function _validateFacilitatorSubAction(
        address caller_,
        ITimelockBatchQueue.BatchAction memory action_
    ) private view;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| caller_ | `address`                         |             |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_validateselfsubaction-address-itimelockbatchqueue-batchaction"></a>

### _validateSelfSubAction

```solidity
function _validateSelfSubAction(
        address caller_,
        ITimelockBatchQueue.BatchAction memory action_
    ) private view;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| caller_ | `address`                         |             |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_decodegatewayratelimitpayload-address-bytes4-bytes"></a>

### _decodeGatewayRateLimitPayload

Decodes the payload of a rate-limit-related gateway sub-action.

<i>

Both shapes are a single dynamic-array argument. The payload must be at least
the minimal empty-array encoding and must round-trip to its canonical ABI
encoding, so trailing or non-canonical bytes are rejected at queue time. Only
the shape is checked here; the target function validates the values.

</i>

```solidity
function _decodeGatewayRateLimitPayload(
        address target_,
        bytes4 sel_,
        bytes memory payload_
    ) private pure;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| target_  | `address` |             |
| sel_     | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_decodegatewayadminpayload-address-bytes4-bytes"></a>

### _decodeGatewayAdminPayload

Decodes the payload of a non-rate-limit gateway sub-action and forwards it to
the target's `validate*` mirror so payload invariants fail at queue time.

<i>

Every shape is a single static word, so the payload length must be exactly 32.

</i>

```solidity
function _decodeGatewayAdminPayload(
        address target_,
        bytes4 sel_,
        bytes memory payload_
    ) private view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| target_  | `address` |             |
| sel_     | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_decodedelegatepayload-address-bytes4-bytes"></a>

### _decodeDelegatePayload

Decodes the payload of a delegate sub-action.

<i>

`setSendLibrary` and the receive-library helpers are fixed-size static tuples
with an exact length. `setEndpointConfig` carries a dynamic
`(address, SetConfigParam[])` tuple, so it is bounded by its minimal empty-array
encoding and must round-trip to its canonical ABI encoding.

</i>

```solidity
function _decodeDelegatePayload(
        address target_,
        bytes4 sel_,
        bytes memory payload_
    ) private pure;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| target_  | `address` |             |
| sel_     | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_decodefacilitatorpayload-address-bytes4-bytes"></a>

### _decodeFacilitatorPayload

Decodes the payload of a facilitator sub-action that is not `setConfigurator`,
forwarding it to the target's `validate*` mirror where one exists so payload
invariants fail at queue time.

<i>

Every shape is a single static word, so the payload length must be exactly 32.

</i>

```solidity
function _decodeFacilitatorPayload(
        address target_,
        bytes4 sel_,
        bytes memory payload_
    ) private view;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| target_  | `address` |             |
| sel_     | `bytes4`  |             |
| payload_ | `bytes`   |             |

<a id="_executegatewaysubaction-itimelockbatchqueue-batchaction"></a>

### _executeGatewaySubAction

```solidity
function _executeGatewaySubAction(ITimelockBatchQueue.BatchAction memory action_) private;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_executedelegatesubaction-itimelockbatchqueue-batchaction"></a>

### _executeDelegateSubAction

```solidity
function _executeDelegateSubAction(ITimelockBatchQueue.BatchAction memory action_) private;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_executefacilitatorsubaction-itimelockbatchqueue-batchaction"></a>

### _executeFacilitatorSubAction

```solidity
function _executeFacilitatorSubAction(ITimelockBatchQueue.BatchAction memory action_) private;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_executeselfsubaction-itimelockbatchqueue-batchaction"></a>

### _executeSelfSubAction

<i>

Queue-time validation in `_validateSelfSubAction` already enforces non-zero target
addresses and the timelock delay bounds, so this execute path trusts the decoded
payload and routes to the matching `_setTarget*` helper.

</i>

```solidity
function _executeSelfSubAction(ITimelockBatchQueue.BatchAction memory action_) private;
```

**Parameters**

| Name    | Type                              | Description |
| ------- | --------------------------------- | ----------- |
| action_ | `ITimelockBatchQueue.BatchAction` |             |

<a id="_settargetgateway-address"></a>

### _setTargetGateway

Writes the gateway target and emits `TargetGatewaySet`. Shared between the
constructor and the timelocked rotation path.

```solidity
function _setTargetGateway(address gateway_) private;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| gateway_ | `address` |             |

<a id="_settargetdelegate-address"></a>

### _setTargetDelegate

Writes the delegate target and emits `TargetDelegateSet`. Shared between the
constructor and the timelocked rotation path.

```solidity
function _setTargetDelegate(address delegate_) private;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| delegate_ | `address` |             |

<a id="_settargetfacilitator-address"></a>

### _setTargetFacilitator

Writes the facilitator target and emits `TargetFacilitatorSet`. Shared between
the constructor and the timelocked rotation path.

```solidity
function _setTargetFacilitator(address facilitator_) private;
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| facilitator_ | `address` |             |

<a id="_validategraceperiod-uint32"></a>

### _validateGracePeriod

Mirrors the zero-period check performed by `ReEnablerGracePeriod._setGracePeriod`
so that a `setGracePeriod` sub-action is rejected at queue time rather than at
execution time.

```solidity
function _validateGracePeriod(uint32 period_) private pure;
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| period_ | `uint32` |             |

<a id="_requirenonzeroaddress-address-string"></a>

### _requireNonzeroAddress

```solidity
function _requireNonzeroAddress(address address_, string memory parameter_) private pure;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| address_   | `address` |             |
| parameter_ | `string`  |             |

<a id="_revertactioninvalid-address-bytes4"></a>

### _revertActionInvalid

Reverts with `ITimelockBatchQueue_ActionInvalid` for an unsupported sub-action.

<i>

Centralizes the revert so the error encoding is emitted once instead of being
inlined at every dispatch and payload-validation branch.

</i>

```solidity
function _revertActionInvalid(address target_, bytes4 selector_) private pure;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| target_   | `address` |             |
| selector_ | `bytes4`  |             |
