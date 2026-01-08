# IPeriodicTaskManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/bases/interfaces/IPeriodicTaskManager.sol)

**Title:**
IPeriodicTaskManager

Interface for a contract that can manage periodic tasks with ordering capabilities

## Functions

### addPeriodicTask

Adds a periodic task to the end of the task list

This function should be protected by a role check for the "admin" role

```solidity
function addPeriodicTask(address task_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The periodic task to add|

### addPeriodicTaskAtIndex

Adds a periodic task at a specific index in the task list

This function should be protected by a role check for the "admin" role

If the index is greater than the current length, the task will be added at the end

```solidity
function addPeriodicTaskAtIndex(address task_, bytes4 customSelector_, uint256 index_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|          The periodic task to add|
|`customSelector_`|`bytes4`|The custom selector to use for the task (or 0)|
|`index_`|`uint256`|         The index where to insert the task|

### removePeriodicTask

Removes a periodic task from the task list

This function should be protected by a role check for the "admin" role

```solidity
function removePeriodicTask(address task_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The periodic task to remove|

### removePeriodicTaskAtIndex

Removes a periodic task at a specific index

This function should be protected by a role check for the "admin" role

```solidity
function removePeriodicTaskAtIndex(uint256 index_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|The index of the task to remove|

### getPeriodicTaskCount

Gets the total number of periodic tasks

```solidity
function getPeriodicTaskCount() external view returns (uint256 _taskCount);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_taskCount`|`uint256`| The number of periodic tasks|

### getPeriodicTaskAtIndex

Gets a periodic task at a specific index

```solidity
function getPeriodicTaskAtIndex(uint256 index_) external view returns (address _task, bytes4 _customSelector);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`index_`|`uint256`|         The index of the task to get|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_task`|`address`|          The address of the periodic task at the specified index|
|`_customSelector`|`bytes4`|The custom selector for the task (or 0)|

### getPeriodicTasks

Gets all periodic tasks

```solidity
function getPeriodicTasks() external view returns (address[] memory _tasks, bytes4[] memory _customSelectors);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_tasks`|`address[]`|             An array of all periodic tasks in order|
|`_customSelectors`|`bytes4[]`|   An array of all custom selectors in order|

### getPeriodicTaskIndex

Gets the index of a specific periodic task

```solidity
function getPeriodicTaskIndex(address task_) external view returns (uint256 _index);
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
function hasPeriodicTask(address task_) external view returns (bool _exists);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|  The periodic task to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_exists`|`bool`|True if the task exists, false otherwise|

## Events

### PeriodicTaskAdded

Emitted when a periodic task is added

```solidity
event PeriodicTaskAdded(address indexed task_, bytes4 customSelector_, uint256 indexed index_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The address of the periodic task|
|`customSelector_`|`bytes4`||
|`index_`|`uint256`|The index where the task was added|

### PeriodicTaskRemoved

Emitted when a periodic task is removed

```solidity
event PeriodicTaskRemoved(address indexed task_, uint256 indexed index_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`task_`|`address`|The address of the periodic task|
|`index_`|`uint256`|The index where the task was removed from|

## Errors

### PeriodicTaskManager_TaskNotFound

Error thrown when trying to remove a task that doesn't exist

```solidity
error PeriodicTaskManager_TaskNotFound(address task_);
```

### PeriodicTaskManager_TaskAlreadyExists

Error thrown when trying to add a task that already exists

```solidity
error PeriodicTaskManager_TaskAlreadyExists(address task_);
```

### PeriodicTaskManager_ZeroAddress

Error thrown when the provided task address is zero

```solidity
error PeriodicTaskManager_ZeroAddress();
```

### PeriodicTaskManager_NotPeriodicTask

Error thrown when the provided task does not implement the IPeriodicTask interface

```solidity
error PeriodicTaskManager_NotPeriodicTask(address task_);
```

### PeriodicTaskManager_CustomSelectorFailed

Error thrown when a custom selector fails

```solidity
error PeriodicTaskManager_CustomSelectorFailed(address task_, bytes4 customSelector_, bytes reason_);
```
