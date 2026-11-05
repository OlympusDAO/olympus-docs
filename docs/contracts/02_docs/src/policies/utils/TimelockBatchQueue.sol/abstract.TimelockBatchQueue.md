# TimelockBatchQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/TimelockBatchQueue.sol)

**Inherits:** [ITimelockBatchQueue](/main/contracts/docs/src/policies/interfaces/utils/ITimelockBatchQueue.sol/interface.ITimelockBatchQueue), ERC165

**Title:** TimelockBatchQueue

Reusable queue implementation for atomic batched timelocked actions.

<i>

Every queued action is a batch of one or more `BatchAction` sub-actions. A batch of
length one behaves like a single timelocked action. Batches are atomic by
construction: a revert in any sub-action validator or executor rolls back the entire
batch.

</i>

Sub-actions execute in array order within a batch, but no ordering is enforced
across separately queued actions: execution is permissionless once a timelock
elapses, so independently queued batches may execute in any order. Actions with
execution-order dependencies must be queued within a single batch.

Lifecycle:

- `_queueAction` enforces the configured batch size bounds, calls
`_onSubActionQueued` per sub-action and `_onBatchQueued` once for cross-sub
invariants, stores the batch metadata and sub-actions, emits one
`TimelockSubActionQueued` per sub-action, then emits `TimelockActionQueued`
to close the batch.
- `executeQueuedAction` validates standard executable state, delegates
implementation-specific execution authorization to `_validateExecution`, marks
the action executed, and runs the execution loop in the base contract: each
iteration calls `_executeSubAction` and then emits `TimelockSubActionExecuted`,
interleaving the per-sub event with any events emitted by the sub-action target.
After the loop `_onActionExecuted` runs once, the stored sub-actions are
cleared, and a single `TimelockActionExecuted` event is emitted.
- `cancelQueuedAction` validates standard cancellable state, delegates
implementation-specific cancellation authorization to `_validateCancellation`,
clears the stored sub-actions, calls `_onActionCancelled` so derived contracts
can clear per-sub-action state recorded at queue time, and emits
`TimelockActionCancelled`.

Derived contracts must implement the virtual hooks by reverting on failure. Hooks
should not return booleans; a successful return means the hook accepted the
operation.

## State Variables

### timelockDelay

Current timelock delay in seconds.

```solidity
uint48 public timelockDelay;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

### nextActionId

Next queued action ID.

```solidity
uint64 public nextActionId;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint64` |  |

### _queuedActions

Queued timelock actions.

```solidity
mapping(uint64 actionId => ITimelockBatchQueue.QueuedAction queuedAction)
        internal _queuedActions;
```

## Functions

<a id="constructor-uint48"></a>

### constructor

Initialize the timelock queue.

<i>

Delegates to `_setTimelockDelay`, which calls the virtual
`_validateTimelockDelay`. Derived implementations should ensure that override does
not depend on derived-contract constructor-initialized storage.

</i>

```solidity
constructor(uint48 initialTimelockDelay_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| initialTimelockDelay_ | `uint48` | Initial timelock delay in seconds. |

<a id="getqueuedaction-uint64"></a>

### getQueuedAction

Get a queued action.

<i>

Reverts if:

- The action does not exist

</i>

```solidity
function getQueuedAction(
        uint64 actionId_
    ) external view returns (ITimelockBatchQueue.QueuedAction memory action);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action | `ITimelockBatchQueue.QueuedAction` | The queued action. |

<a id="getqueuedactionlength-uint64"></a>

### getQueuedActionLength

Get the number of sub-actions stored for a queued action.

<i>

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled

</i>

```solidity
function getQueuedActionLength(uint64 actionId_) external view returns (uint256 length);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | `uint256` | The number of sub-actions stored for the action. |

<a id="getqueuedsubaction-uint64-uint256"></a>

### getQueuedSubAction

Get a single sub-action of a queued action.

<i>

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled
- The sub-action index is out of bounds

</i>

```solidity
function getQueuedSubAction(
        uint64 actionId_,
        uint256 index_
    ) external view returns (address target, bytes4 selector, bytes memory payload);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| index_ | `uint256` | The sub-action index. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target | `address` | The contract expected to receive the sub-action. |
| selector | `bytes4` | The function selector for the sub-action. |
| payload | `bytes` | Encoded parameters for the sub-action. |

<a id="executequeuedaction-uint64"></a>

### executeQueuedAction

<i>

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled
- The action is still timelocked (the block timestamp is before `executableAt`)
- The action has expired (the block timestamp is past `expiresAt`, the last
executable timestamp)
- `_validateExecution` reverts
- `_executeSubAction` reverts for any sub-action
- `_onActionExecuted` reverts

</i>

In both `_queueAction` and execution the per-sub-action events precede the
single action-level event that closes the batch. At execution time each
`TimelockSubActionExecuted` is emitted *inside* the loop, immediately after
the corresponding `_executeSubAction` call, so it interleaves with any
events the sub-action target emits and the log preserves real execution
order; `TimelockActionExecuted` is then emitted once after the loop. At
queue time there is no nested call to interleave with, so the
`TimelockSubActionQueued` events form a uniform group followed by
`TimelockActionQueued`.

```solidity
function executeQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

<a id="cancelqueuedaction-uint64"></a>

### cancelQueuedAction

Cancel a queued action.

<i>

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled
- `_validateCancellation` reverts
- `_onActionCancelled` reverts

</i>

```solidity
function cancelQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

<a id="_queueaction-itimelockbatchqueue-batchaction"></a>

### _queueAction

Queue a batched timelocked action.

<i>

Calls `_onSubActionQueued` per sub-action and `_onBatchQueued` once after, so
derived contracts cannot use this helper without passing their implementation
specific authorization and payload checks.

</i>

Reverts if:

- The batch is empty
- The batch exceeds `_maxBatchSize()`
- `_onSubActionQueued` reverts for any sub-action
- `_onBatchQueued` reverts

```solidity
function _queueAction(
        ITimelockBatchQueue.BatchAction[] memory actions_
    ) internal returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actions_ | `ITimelockBatchQueue.BatchAction[]` | The sub-actions of the batch. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="_queueaction-address-bytes4-bytes"></a>

### _queueAction

Queue a single timelocked action.

<i>

Convenience wrapper that forwards a single (target, selector, payload) triple as
a length-1 batch and delegates to the batch overload. The derived contract's
`_onSubActionQueued` hook is invoked once and `_onBatchQueued` is invoked once
with a length-1 array.

</i>

```solidity
function _queueAction(
        address target_,
        bytes4 selector_,
        bytes memory payload_
    ) internal returns (uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target_ | `address` | The contract expected to receive the queued action. |
| selector_ | `bytes4` | The function selector for the queued action. |
| payload_ | `bytes` | Encoded parameters for the action. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

<a id="_settimelockdelay-uint48"></a>

### _setTimelockDelay

Set the timelock delay.

<i>

Reverts if `_validateTimelockDelay` rejects the new delay.

</i>

```solidity
function _setTimelockDelay(uint48 delay_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint48` | The new timelock delay in seconds. |

<a id="_validateexecutablestate-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateExecutableState

Validate standard executable state for a queued action.

<i>

Reverts on failure. The action is executable at any block timestamp in the closed
window `[executableAt, expiresAt]`: `expiresAt` is the last executable timestamp,
inclusive, and the action is expired only once the block timestamp is past it.

</i>

```solidity
function _validateExecutableState(
        uint64 actionId_,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference. |

<a id="_validatecancellablestate-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateCancellableState

Validate standard cancellable state for a queued action.

<i>

Reverts on failure.

</i>

```solidity
function _validateCancellableState(
        uint64 actionId_,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference. |

<a id="_requireactionaccessible-uint64-itimelockbatchqueue-queuedaction"></a>

### _requireActionAccessible

Reverts if the action does not exist, has been executed, or has been cancelled.

<i>

Common precondition for lifecycle validators and for the view functions that
expose sub-action data. Sub-action arrays are cleared on execute and cancel
while the corresponding flags remain set, so this helper distinguishes "never
queued" from "already executed" from "already cancelled" with explicit reverts.

</i>

```solidity
function _requireActionAccessible(
        uint64 actionId_,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference. |

<a id="_onsubactionqueued-address-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _onSubActionQueued

Hook invoked once per sub-action at queue time, before the batch is stored.

<i>

Derived contracts must revert on failure. Implementations are expected to
validate the target, selector, and payload of the sub-action in isolation, and
may record per-sub-action state. Cross sub-action invariants belong in
`_onBatchQueued`. The caller is passed explicitly for clarity and to support
derived contracts that centralize authorization around actor params.

</i>

```solidity
function _onSubActionQueued(
        address caller_,
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account queueing the action. |
| actionId_ | `uint64` | The id the batch will be stored under. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action being queued. |

<a id="_onbatchqueued-address-uint64-itimelockbatchqueue-batchaction"></a>

### _onBatchQueued

Hook invoked once per batch at queue time, after every `_onSubActionQueued`.

<i>

Default implementation is a no-op. Derived contracts override only when
invariants spanning multiple sub-actions are required (e.g. forbidding
duplicate or conflicting sub-actions inside one batch).

</i>

```solidity
function _onBatchQueued(
        address /* caller_ */,
        uint64 /* actionId_ */,
        ITimelockBatchQueue.BatchAction[] memory /* actions_ */
    ) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |
| _ | `uint64` |  |
| _ | `ITimelockBatchQueue.BatchAction[]` |  |

<a id="_validateexecution-address-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateExecution

Validate implementation-specific execution rules for the entire batch.

<i>

Derived contracts must revert on failure. Standard queued-action state and
timestamp checks have already passed when this hook is called, and no
sub-action has been executed yet. This hook is the right place for batch-level
execution gates (e.g. requiring an execution role, checking that the policy is
enabled). Per-sub-action execution behavior belongs in `_executeSubAction`.

</i>

```solidity
function _validateExecution(
        address caller_,
        uint64 actionId_,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account executing the action. |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference, including the sub-actions. |

<a id="_validatecancellation-address-uint64-itimelockbatchqueue-queuedaction"></a>

### _validateCancellation

Validate implementation-specific cancellation rules.

<i>

Derived contracts must revert on failure. Standard queued-action state checks have
already passed when this hook is called.

</i>

```solidity
function _validateCancellation(
        address caller_,
        uint64 actionId_,
        ITimelockBatchQueue.QueuedAction storage action_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account cancelling the action. |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockBatchQueue.QueuedAction` | The queued action storage reference, including the sub-actions. |

<a id="_onactioncancelled-uint64-uint256"></a>

### _onActionCancelled

Hook invoked once when a queued action is cancelled, after the stored
sub-actions have been cleared.

<i>

Default implementation is a no-op. Derived contracts override to clear any
per-sub-action state recorded at queue time by `_onSubActionQueued`. The
sub-action count is captured before the stored array is deleted, so
implementations can iterate the indices that were recorded.

</i>

```solidity
function _onActionCancelled(uint64 actionId_, uint256 subActionCount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The cancelled action ID. |
| subActionCount_ | `uint256` | The number of sub-actions the action held before clearing. |

<a id="_onactionexecuted-uint64-uint256"></a>

### _onActionExecuted

Hook invoked once after every sub-action has executed successfully and before the
stored sub-actions are cleared.

<i>

Default implementation is a no-op. A revert rolls back the complete batch,
including target state changes and the action's executed flag. Derived contracts
may use this hook to clear state that must remain available throughout execution.

</i>

```solidity
function _onActionExecuted(uint64 actionId_, uint256 subActionCount_) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The executed action ID. |
| subActionCount_ | `uint256` | The number of successfully executed sub-actions. |

<a id="_executesubaction-uint64-uint256-itimelockbatchqueue-batchaction"></a>

### _executeSubAction

Execute a single sub-action of a batched queued action.

<i>

Derived contracts must revert on failure. Called by the base contract once per
sub-action in array order; the action has already been marked executed, so a
revert in any iteration reverts the entire batch and rolls back that flag.
Derived contracts must not rely on the base contract calling this hook in any
other order.

</i>

```solidity
function _executeSubAction(
        uint64 actionId_,
        uint256 index_,
        ITimelockBatchQueue.BatchAction memory action_
    ) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| index_ | `uint256` | The position of the sub-action within the batch. |
| action_ | `ITimelockBatchQueue.BatchAction` | The sub-action to execute. |

<a id="_validatetimelockdelay-uint48"></a>

### _validateTimelockDelay

Validate a timelock delay.

<i>

Derived contracts must revert on failure.

</i>

```solidity
function _validateTimelockDelay(uint48 delay_) internal view virtual;
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
function _executionWindow() internal view virtual returns (uint48 executionWindow);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| executionWindow | `uint48` | The execution window in seconds. |

<a id="_maxbatchsize"></a>

### _maxBatchSize

Maximum number of sub-actions allowed in a single batch.

<i>

Default protects against batches that cannot be executed within the block gas
limit. Derived contracts whose sub-actions are unusually expensive or cheap may
override.

</i>

```solidity
function _maxBatchSize() internal view virtual returns (uint256 maxBatchSize);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxBatchSize | `uint256` | The maximum number of sub-actions allowed in a single batch. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface.

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool         True if the contract implements `interfaceId_`. |
