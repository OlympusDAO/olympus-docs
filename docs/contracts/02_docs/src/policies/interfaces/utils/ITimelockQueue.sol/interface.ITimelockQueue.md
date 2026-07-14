# ITimelockQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/policies/interfaces/utils/ITimelockQueue.sol)

**Title:**
ITimelockQueue

Interface for contracts that queue, execute, and cancel timelocked actions.

Implementations are expected to enforce action-specific authorization and execution
checks in the concrete contract. Standard queued-action state checks, timestamp checks,
and terminal payload clearing are handled by the abstract implementation.

## Functions

### timelockDelay

Current timelock delay in seconds.

```solidity
function timelockDelay() external view returns (uint48);
```

### nextActionId

Next queued action ID.

```solidity
function nextActionId() external view returns (uint64);
```

### getQueuedAction

Get a queued action.

Reverts if the action does not exist.

```solidity
function getQueuedAction(uint64 actionId_) external view returns (QueuedAction memory action_);
```

**Parameters**

| Name        | Type     | Description           |
| ----------- | -------- | --------------------- |
| `actionId_` | `uint64` | The queued action ID. |

**Returns**

| Name      | Type           | Description        |
| --------- | -------------- | ------------------ |
| `action_` | `QueuedAction` | The queued action. |

### executeQueuedAction

Execute a queued action after its timelock has elapsed.

Implementations must revert from implementation-specific hooks if the caller,
target, selector, or payload should not be executed. Standard action state and
timestamp checks revert from the abstract implementation.

```solidity
function executeQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name        | Type     | Description           |
| ----------- | -------- | --------------------- |
| `actionId_` | `uint64` | The queued action ID. |

### cancelQueuedAction

Cancel a queued action.

Implementations must revert from implementation-specific hooks if the caller
is not authorized to cancel the queued action.

```solidity
function cancelQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name        | Type     | Description           |
| ----------- | -------- | --------------------- |
| `actionId_` | `uint64` | The queued action ID. |

## Events

### TimelockActionQueued

Emitted when an action is queued.

```solidity
event TimelockActionQueued(
    uint64 indexed actionId,
    address indexed target,
    bytes4 indexed selector,
    address proposer,
    bytes32 payloadHash,
    uint48 executableAt,
    uint48 expiresAt
);
```

**Parameters**

| Name           | Type      | Description                                                 |
| -------------- | --------- | ----------------------------------------------------------- |
| `actionId`     | `uint64`  | The queued action ID.                                       |
| `target`       | `address` | The contract expected to receive the queued action.         |
| `selector`     | `bytes4`  | The function selector for the queued action.                |
| `proposer`     | `address` | The account that queued the action.                         |
| `payloadHash`  | `bytes32` | Hash of the encoded action payload.                         |
| `executableAt` | `uint48`  | Timestamp at which the action can first be executed.        |
| `expiresAt`    | `uint48`  | Timestamp after which the action can no longer be executed. |

### TimelockActionExecuted

Emitted when a queued action is executed.

```solidity
event TimelockActionExecuted(
    uint64 indexed actionId, address indexed target, bytes4 indexed selector, address executor
);
```

**Parameters**

| Name       | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `actionId` | `uint64`  | The queued action ID.                         |
| `target`   | `address` | The contract that received the queued action. |
| `selector` | `bytes4`  | The function selector for the queued action.  |
| `executor` | `address` | The account that executed the action.         |

### TimelockActionCancelled

Emitted when a queued action is cancelled.

```solidity
event TimelockActionCancelled(
    uint64 indexed actionId, address indexed target, bytes4 indexed selector, address canceller
);
```

**Parameters**

| Name        | Type      | Description                                              |
| ----------- | --------- | -------------------------------------------------------- |
| `actionId`  | `uint64`  | The queued action ID.                                    |
| `target`    | `address` | The contract that would have received the queued action. |
| `selector`  | `bytes4`  | The function selector for the queued action.             |
| `canceller` | `address` | The account that cancelled the action.                   |

### TimelockDelaySet

Emitted when the timelock delay is changed.

```solidity
event TimelockDelaySet(uint48 delay);
```

**Parameters**

| Name    | Type     | Description                        |
| ------- | -------- | ---------------------------------- |
| `delay` | `uint48` | The new timelock delay in seconds. |

## Errors

### ITimelockQueue_ActionNotFound

Thrown when a queued action does not exist.

```solidity
error ITimelockQueue_ActionNotFound(uint64 actionId);
```

**Parameters**

| Name       | Type     | Description           |
| ---------- | -------- | --------------------- |
| `actionId` | `uint64` | The queued action ID. |

### ITimelockQueue_ActionAlreadyExecuted

Thrown when a queued action has already been executed.

```solidity
error ITimelockQueue_ActionAlreadyExecuted(uint64 actionId);
```

**Parameters**

| Name       | Type     | Description           |
| ---------- | -------- | --------------------- |
| `actionId` | `uint64` | The queued action ID. |

### ITimelockQueue_ActionCancelled

Thrown when a queued action has been cancelled.

```solidity
error ITimelockQueue_ActionCancelled(uint64 actionId);
```

**Parameters**

| Name       | Type     | Description           |
| ---------- | -------- | --------------------- |
| `actionId` | `uint64` | The queued action ID. |

### ITimelockQueue_ActionNotReady

Thrown when a queued action is executed before its timelock has elapsed.

```solidity
error ITimelockQueue_ActionNotReady(uint64 actionId, uint48 executableAt);
```

**Parameters**

| Name           | Type     | Description                                          |
| -------------- | -------- | ---------------------------------------------------- |
| `actionId`     | `uint64` | The queued action ID.                                |
| `executableAt` | `uint48` | Timestamp at which the action can first be executed. |

### ITimelockQueue_ActionExpired

Thrown when a queued action is executed after its execution window.

```solidity
error ITimelockQueue_ActionExpired(uint64 actionId, uint48 expiresAt);
```

**Parameters**

| Name        | Type     | Description                                                 |
| ----------- | -------- | ----------------------------------------------------------- |
| `actionId`  | `uint64` | The queued action ID.                                       |
| `expiresAt` | `uint48` | Timestamp after which the action can no longer be executed. |

### ITimelockQueue_ActionInvalid

Thrown when a queued action has an unsupported target or selector.

```solidity
error ITimelockQueue_ActionInvalid(address target, bytes4 selector);
```

**Parameters**

| Name       | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `target`   | `address` | The queued target address.    |
| `selector` | `bytes4`  | The queued function selector. |

### ITimelockQueue_TimelockDelayInvalid

Thrown when a proposed timelock delay is outside the accepted range.

```solidity
error ITimelockQueue_TimelockDelayInvalid(uint48 delay, uint48 minimum, uint48 maximum);
```

**Parameters**

| Name      | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `delay`   | `uint48` | The proposed delay.         |
| `minimum` | `uint48` | The minimum accepted delay. |
| `maximum` | `uint48` | The maximum accepted delay. |

## Structs

### QueuedAction

Queued timelock action.

```solidity
struct QueuedAction {
    address target;
    bytes4 selector;
    address proposer;
    uint48 queuedAt;
    uint48 executableAt;
    uint48 expiresAt;
    bool executed;
    bool cancelled;
    bytes payload;
}
```

**Properties**

| Name           | Type      | Description                                                 |
| -------------- | --------- | ----------------------------------------------------------- |
| `target`       | `address` | The contract expected to receive the queued action.         |
| `selector`     | `bytes4`  | The function selector for the queued action.                |
| `proposer`     | `address` | The account that queued the action.                         |
| `queuedAt`     | `uint48`  | Timestamp at which the action was queued.                   |
| `executableAt` | `uint48`  | Timestamp at which the action can first be executed.        |
| `expiresAt`    | `uint48`  | Timestamp after which the action can no longer be executed. |
| `executed`     | `bool`    | Whether the action has been executed.                       |
| `cancelled`    | `bool`    | Whether the action has been cancelled.                      |
| `payload`      | `bytes`   | Encoded parameters for the action.                          |
