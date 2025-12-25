# BasePeriodicTaskManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/bases/BasePeriodicTaskManager.sol)

**Inherits:**
[IPeriodicTaskManager](/main/contracts/docs/src/bases/interfaces/IPeriodicTaskManager.sol/interface.IPeriodicTaskManager), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

## State Variables

### _periodicTaskAddresses

The periodic tasks

```solidity
address[] internal _periodicTaskAddresses
```

### _periodicTaskCustomSelectors

An optional custom selector for each periodic task

If the selector is set (non-zero), the task will be executed using the custom selector
instead of the `IPeriodicTask.execute` function

```solidity
mapping(address => bytes4) internal _periodicTaskCustomSelectors
```

## Functions

### _addPeriodicTask

```solidity
function _addPeriodicTask(address task_, bytes4 customSelector_, uint256 index_) internal;
```

### addPeriodicTask

Adds a periodic task to the end of the task list

This function reverts if:

- The caller is not the admin
- The task is already added
- The task is not a valid periodic task

```solidity
function addPeriodicTask(address task_) external override onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The periodic task to add|

### addPeriodicTaskAtIndex

Adds a periodic task at a specific index in the task list

This function reverts if:

- The caller is not the admin
- The task is already added
- The task is not a valid periodic task
- The index is out of bounds
If a custom selector is provided, care must be taken to ensure that the selector exists on {task_}.
If the selector does not exist, all of the periodic tasks will revert.

```solidity
function addPeriodicTaskAtIndex(address task_, bytes4 customSelector_, uint256 index_)
    external
    override
    onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|          The periodic task to add|
|`customSelector_`|`bytes4`|The custom selector to use for the task (or 0)|
|`index_`|`uint256`|         The index where to insert the task|

### _removePeriodicTask

```solidity
function _removePeriodicTask(uint256 index_) internal;
```

### removePeriodicTask

Removes a periodic task from the task list

This function reverts if:

- The caller is not the admin
- The task is not added

```solidity
function removePeriodicTask(address task_) external override onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The periodic task to remove|

### removePeriodicTaskAtIndex

Removes a periodic task at a specific index

This function reverts if:

- The caller is not the admin
- The index is out of bounds

```solidity
function removePeriodicTaskAtIndex(uint256 index_) external override onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|The index of the task to remove|

### _executePeriodicTasks

This function does not implement any logic to catch errors from the periodic tasks.

The logic is that if a periodic task fails, it should fail loudly and revert.

Any tasks that are non-essential can include a try-catch block to handle the error internally.

```solidity
function _executePeriodicTasks() internal;
```

### getPeriodicTaskCount

Gets the total number of periodic tasks

```solidity
function getPeriodicTaskCount() external view override returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_taskCount  The number of periodic tasks|

### getPeriodicTaskAtIndex

Gets a periodic task at a specific index

```solidity
function getPeriodicTaskAtIndex(uint256 index_) external view override returns (address, bytes4);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|         The index of the task to get|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_task           The address of the periodic task at the specified index|
|`<none>`|`bytes4`|_customSelector The custom selector for the task (or 0)|

### getPeriodicTasks

Gets all periodic tasks

```solidity
function getPeriodicTasks() external view override returns (address[] memory, bytes4[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|_tasks              An array of all periodic tasks in order|
|`<none>`|`bytes4[]`|_customSelectors    An array of all custom selectors in order|

### getPeriodicTaskIndex

Gets the index of a specific periodic task

```solidity
function getPeriodicTaskIndex(address task_) public view override returns (uint256 _index);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|  The periodic task to find|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`| The index of the task, or type(uint256).max if not found|

### hasPeriodicTask

Checks if a periodic task exists in the manager

```solidity
function hasPeriodicTask(address task_) public view override returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|  The periodic task to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|_exists True if the task exists, false otherwise|
