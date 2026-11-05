# ITimelockBatchQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/utils/ITimelockBatchQueue.sol)

**Title:** ITimelockBatchQueue

Interface for contracts that queue, execute, and cancel atomic batched timelocked
actions.

<i>

Each queued action represents a batch of one or more `BatchAction` sub-actions. A
batch of length one is the single-action case. Implementations are expected to
enforce action-specific authorization and execution checks in the concrete contract.
Standard queued-action state checks, timestamp checks, and terminal sub-action
clearing are handled by the abstract implementation.

</i>

Atomicity is a property of the batch lifecycle: a revert in any sub-action validator
or executor reverts the entire batch.

Ordering is a property of a single batch only: sub-actions execute in array order
within their batch, but no ordering is enforced across separately queued actions,
so independently queued batches may execute in any order once their timelocks
elapse. Actions with execution-order dependencies must be queued within a single
batch; independent batches must not be assumed to execute in queue order.

## Functions

<a id="timelockdelay"></a>

### timelockDelay

Current timelock delay in seconds.

```solidity
function timelockDelay() external view returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="nextactionid"></a>

### nextActionId

Next queued action ID.

```solidity
function nextActionId() external view returns (uint64);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint64` |  |

<a id="getqueuedaction-uint64"></a>

### getQueuedAction

Get a queued action.

<i>

Returns the historical record of the action for audit purposes. After the action
has been executed or cancelled the `actions` array is empty; the metadata fields
(proposer, timestamps, executed, cancelled) are still populated.

</i>

<i>

Reverts if the action does not exist.

</i>

```solidity
function getQueuedAction(uint64 actionId_) external view returns (QueuedAction memory action);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action | `QueuedAction` |   The queued action. |

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
| length | `uint256` |   The number of sub-actions stored for the action. |

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
| target | `address` |    The contract expected to receive the sub-action. |
| selector | `bytes4` |  The function selector for the sub-action. |
| payload | `bytes` |   Encoded parameters for the sub-action. |

<a id="executequeuedaction-uint64"></a>

### executeQueuedAction

Execute a queued action after its timelock has elapsed.

<i>

Implementations must revert from implementation-specific hooks if the caller or
any sub-action should not be executed. Standard action state and timestamp
checks revert from the abstract implementation: the action is executable at any
block timestamp in the closed window `[executableAt, expiresAt]`, and expired
once the block timestamp is past `expiresAt`. The batch is atomic: a revert
in any sub-action reverts the entire batch. Cross-batch ordering is not
enforced: once their timelocks elapse, separately queued actions may be
executed in any order, regardless of the order in which they were queued.

</i>

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

Implementations must revert from implementation-specific hooks if the caller
is not authorized to cancel the queued action.

</i>

```solidity
function cancelQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

## Events

### TimelockActionQueued

Emitted when a batched action is queued.

<i>

Emitted once to close the batch, after one `TimelockSubActionQueued` event has
been emitted per sub-action.

</i>

```solidity
event TimelockActionQueued(
        uint64 indexed actionId,
        address indexed proposer,
        bytes32 batchHash,
        uint48 executableAt,
        uint48 expiresAt
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| proposer | `address` | The account that queued the action. |
| batchHash | `bytes32` | Hash of the encoded batch of sub-actions. |
| executableAt | `uint48` | Timestamp at which the action can first be executed. |
| expiresAt | `uint48` | The last timestamp at which the action can be executed, inclusive. |

### TimelockSubActionQueued

Emitted once per sub-action when a batched action is queued.

<i>

`target` and `selector` are indexed so off-chain consumers can filter by either
without decoding the batch.

</i>

```solidity
event TimelockSubActionQueued(
        uint64 indexed actionId,
        address indexed target,
        bytes4 indexed selector,
        uint256 index,
        bytes32 payloadHash
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| target | `address` | The contract expected to receive the sub-action. |
| selector | `bytes4` | The function selector for the sub-action. |
| index | `uint256` | The position of the sub-action within the batch. |
| payloadHash | `bytes32` | Hash of the encoded sub-action payload. |

### TimelockActionExecuted

Emitted when a batched action is executed.

<i>

Emitted once at the end of execution, after every `TimelockSubActionExecuted`
event for the same action.

</i>

```solidity
event TimelockActionExecuted(uint64 indexed actionId, address indexed executor);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| executor | `address` | The account that executed the action. |

### TimelockSubActionExecuted

Emitted once per sub-action immediately after that sub-action runs.

<i>

Emitted inside the execution loop after the corresponding sub-action handler
returns, so it is interleaved with any events emitted by the sub-action target.
`target` and `selector` are indexed so off-chain consumers can filter by either
without decoding the batch.

</i>

```solidity
event TimelockSubActionExecuted(
        uint64 indexed actionId,
        address indexed target,
        bytes4 indexed selector,
        uint256 index
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| target | `address` | The contract that received the sub-action. |
| selector | `bytes4` | The function selector for the sub-action. |
| index | `uint256` | The position of the sub-action within the batch. |

### TimelockActionCancelled

Emitted when a queued batched action is cancelled.

```solidity
event TimelockActionCancelled(uint64 indexed actionId, address indexed canceller);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| canceller | `address` | The account that cancelled the action. |

### TimelockDelaySet

Emitted when the timelock delay is changed.

```solidity
event TimelockDelaySet(uint48 delay);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay | `uint48` | The new timelock delay in seconds. |

## Errors

### ITimelockBatchQueue_ActionNotFound

Thrown when a queued action does not exist.

```solidity
error ITimelockBatchQueue_ActionNotFound(uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

### ITimelockBatchQueue_ActionAlreadyExecuted

Thrown when a queued action has already been executed.

```solidity
error ITimelockBatchQueue_ActionAlreadyExecuted(uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

### ITimelockBatchQueue_ActionCancelled

Thrown when a queued action has been cancelled.

```solidity
error ITimelockBatchQueue_ActionCancelled(uint64 actionId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |

### ITimelockBatchQueue_ActionNotReady

Thrown when a queued action is executed before its timelock has elapsed.

```solidity
error ITimelockBatchQueue_ActionNotReady(uint64 actionId, uint48 executableAt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| executableAt | `uint48` | Timestamp at which the action can first be executed. |

### ITimelockBatchQueue_ActionExpired

Thrown when a queued action is executed after `expiresAt`, the last executable
timestamp.

```solidity
error ITimelockBatchQueue_ActionExpired(uint64 actionId, uint48 expiresAt);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| expiresAt | `uint48` | The last timestamp at which the action can be executed, inclusive. |

### ITimelockBatchQueue_ActionInvalid

Thrown when a queued sub-action has an unsupported target or selector.

```solidity
error ITimelockBatchQueue_ActionInvalid(address target, bytes4 selector);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target | `address` | The queued target address. |
| selector | `bytes4` | The queued function selector. |

### ITimelockBatchQueue_TimelockDelayInvalid

Thrown when a proposed timelock delay is outside the accepted range.

```solidity
error ITimelockBatchQueue_TimelockDelayInvalid(uint48 delay, uint48 minimum, uint48 maximum);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay | `uint48` | The proposed delay. |
| minimum | `uint48` | The minimum accepted delay. |
| maximum | `uint48` | The maximum accepted delay. |

### ITimelockBatchQueue_BatchEmpty

Thrown when an empty batch is queued.

```solidity
error ITimelockBatchQueue_BatchEmpty();
```

### ITimelockBatchQueue_BatchTooLarge

Thrown when a queued batch exceeds the maximum allowed size.

```solidity
error ITimelockBatchQueue_BatchTooLarge(uint256 length, uint256 maximum);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | `uint256` | The length of the queued batch. |
| maximum | `uint256` | The maximum batch size. |

### ITimelockBatchQueue_SubActionIndexOutOfBounds

Thrown when a queried sub-action index is out of bounds for the action.

```solidity
error ITimelockBatchQueue_SubActionIndexOutOfBounds(
        uint64 actionId,
        uint256 index,
        uint256 length
    );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId | `uint64` | The queued action ID. |
| index | `uint256` | The requested sub-action index. |
| length | `uint256` | The number of sub-actions stored for the action. |

## Structs

### BatchAction

A single sub-action within a batched queued action.

```solidity
struct BatchAction {
        address target;
        bytes4 selector;
        bytes payload;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| target | `address` | The contract expected to receive the sub-action. |
| selector | `bytes4` | The function selector for the sub-action. |
| payload | `bytes` | Encoded parameters for the sub-action. |

### QueuedAction

Queued timelock action.

<i>

A queued action is always a batch of one or more `BatchAction` sub-actions.
Length-1 batches represent single actions. Sub-actions are executed in array
order. After an action has been executed or cancelled the `actions` array is
emptied; metadata fields (proposer, timestamps, executed, cancelled) remain
readable for audit purposes.

</i>

```solidity
struct QueuedAction {
        address proposer;
        uint48 queuedAt;
        uint48 executableAt;
        uint48 expiresAt;
        bool executed;
        bool cancelled;
        BatchAction[] actions;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposer | `address` | The account that queued the action. |
| queuedAt | `uint48` | Timestamp at which the action was queued. |
| executableAt | `uint48` | Timestamp at which the action can first be executed. |
| expiresAt | `uint48` | The last timestamp at which the action can be executed; the<br/>execution window is `[executableAt, expiresAt]`, both ends included. |
| executed | `bool` | Whether the action has been executed. |
| cancelled | `bool` | Whether the action has been cancelled. |
| actions | `BatchAction[]` | The sub-actions of the batch. |
