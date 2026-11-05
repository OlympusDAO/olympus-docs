# TimelockQueue

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/utils/TimelockQueue.sol)

**Inherits:** [ITimelockQueue](/main/contracts/docs/src/policies/interfaces/utils/ITimelockQueue.sol/interface.ITimelockQueue)

**Title:** TimelockQueue

Reusable queue implementation for timelocked actions.

<i>

This contract owns the standard queue lifecycle:

- `_queueAction` validates queue authorization via `_validateQueue`, stores action
metadata, and emits `TimelockActionQueued`.
- `executeQueuedAction` validates standard executable state, delegates
implementation-specific execution authorization to `_validateExecution`, runs
`_executeAction`, clears the payload, and emits `TimelockActionExecuted`.
- `cancelQueuedAction` validates standard cancellable state, delegates
implementation-specific cancellation authorization to `_validateCancellation`,
clears the payload, and emits `TimelockActionCancelled`.

</i>

Child contracts must implement the virtual hooks by reverting on failure. Hooks should
not return booleans; a successful return means the hook accepted the operation.

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
mapping(uint64 => ITimelockQueue.QueuedAction) internal _queuedActions;
```

## Functions

<a id="constructor-uint48"></a>

### constructor

Initialize the timelock queue.

<i>

Calls `_validateTimelockDelay`. Child implementations should ensure that override
does not depend on child constructor-initialized storage.

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
    ) external view returns (ITimelockQueue.QueuedAction memory action_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action_ | `ITimelockQueue.QueuedAction` | The queued action. |

<a id="executequeuedaction-uint64"></a>

### executeQueuedAction

Execute a queued action after its timelock has elapsed.

<i>

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled
- The action is still timelocked
- The action has expired
- `_validateExecution` reverts
- `_executeAction` reverts

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

Reverts if:

- The action does not exist
- The action has already been executed
- The action has been cancelled
- `_validateCancellation` reverts

</i>

```solidity
function cancelQueuedAction(uint64 actionId_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |

<a id="_queueaction-address-bytes4-bytes"></a>

### _queueAction

Queue a timelocked action.

<i>

Calls `_validateQueue` internally so child contracts cannot use this helper without
passing their implementation-specific queue authorization and payload checks.

</i>

```solidity
function _queueAction(
        address target_,
        bytes4 selector_,
        bytes memory payload_
    ) internal returns (uint64 actionId_);
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
| actionId_ | `uint64` | The queued action ID. |

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

<a id="_validateexecutablestate-uint64-itimelockqueue-queuedaction"></a>

### _validateExecutableState

Validate standard executable state for a queued action.

<i>

Reverts on failure.

</i>

```solidity
function _validateExecutableState(
        uint64 actionId_,
        ITimelockQueue.QueuedAction storage action_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | The queued action storage reference. |

<a id="_validatecancellablestate-uint64-itimelockqueue-queuedaction"></a>

### _validateCancellableState

Validate standard cancellable state for a queued action.

<i>

Reverts on failure.

</i>

```solidity
function _validateCancellableState(
        uint64 actionId_,
        ITimelockQueue.QueuedAction storage action_
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | The queued action storage reference. |

<a id="_validatequeue-address-address-bytes4-bytes"></a>

### _validateQueue

Validate whether an action can be queued.

<i>

Child contracts must revert on failure. The caller is passed explicitly for clarity
and to support child contracts that centralize authorization around actor params.

</i>

```solidity
function _validateQueue(
        address caller_,
        address target_,
        bytes4 selector_,
        bytes memory payload_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account queueing the action. |
| target_ | `address` | The contract expected to receive the queued action. |
| selector_ | `bytes4` | The function selector for the queued action. |
| payload_ | `bytes` | Encoded parameters for the action. |

<a id="_validateexecution-address-uint64-itimelockqueue-queuedaction"></a>

### _validateExecution

Validate implementation-specific execution rules.

<i>

Child contracts must revert on failure. Standard queued-action state and timestamp
checks have already passed when this hook is called.

</i>

```solidity
function _validateExecution(
        address caller_,
        uint64 actionId_,
        ITimelockQueue.QueuedAction memory action_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account executing the action. |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_validatecancellation-address-uint64-itimelockqueue-queuedaction"></a>

### _validateCancellation

Validate implementation-specific cancellation rules.

<i>

Child contracts must revert on failure. Standard queued-action state checks have
already passed when this hook is called.

</i>

```solidity
function _validateCancellation(
        address caller_,
        uint64 actionId_,
        ITimelockQueue.QueuedAction memory action_
    ) internal view virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller_ | `address` | The account cancelling the action. |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_executeaction-uint64-itimelockqueue-queuedaction"></a>

### _executeAction

Execute an implementation-specific queued action.

<i>

Child contracts must revert on failure. The queued action has already been marked
executed before this hook is called; a revert rolls back that state change.

</i>

```solidity
function _executeAction(
        uint64 actionId_,
        ITimelockQueue.QueuedAction memory action_
    ) internal virtual;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| actionId_ | `uint64` | The queued action ID. |
| action_ | `ITimelockQueue.QueuedAction` | A memory copy of the queued action. |

<a id="_validatetimelockdelay-uint48"></a>

### _validateTimelockDelay

Validate a timelock delay.

<i>

Child contracts must revert on failure.

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

```solidity
function _executionWindow() internal view virtual returns (uint48 executionWindow_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| executionWindow_ | `uint48` | The execution window in seconds. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

Query if a contract implements an interface.

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public view virtual returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` | The interface identifier, as specified in ERC-165. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool         True if the contract implements `interfaceId_`. |
