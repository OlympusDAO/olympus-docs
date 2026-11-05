# BasePeriodicTaskManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/BasePeriodicTaskManager.sol)

**Inherits:** [IPeriodicTaskManager](/main/contracts/docs/src/bases/interfaces/IPeriodicTaskManager.sol/interface.IPeriodicTaskManager), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

## State Variables

### _periodicTaskAddresses

The periodic tasks

```solidity
address[] internal _periodicTaskAddresses;
```

### _periodicTaskCustomSelectors

An optional custom selector for each periodic task

<i>

If the selector is set (non-zero), the task will be executed using the custom selector
instead of the `IPeriodicTask.execute` function

</i>

```solidity
mapping(address => bytes4) internal _periodicTaskCustomSelectors;
```

## Functions

<a id="_addperiodictask-address-bytes4-uint256"></a>

### _addPeriodicTask

```solidity
function _addPeriodicTask(address task_, bytes4 customSelector_, uint256 index_) internal;
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| task_           | `address` |             |
| customSelector_ | `bytes4`  |             |
| index_          | `uint256` |             |

<a id="addperiodictask-address"></a>

### addPeriodicTask

Adds a periodic task to the end of the task list

<i>

This function reverts if:

- The caller is not the admin
- The task is already added
- The task is not a valid periodic task

</i>

```solidity
function addPeriodicTask(address task_) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_ | `address` | The periodic task to add |

<a id="addperiodictaskatindex-address-bytes4-uint256"></a>

### addPeriodicTaskAtIndex

<i>

This function reverts if:

- The caller is not the admin
- The task is already added
- The task is not a valid periodic task
- The index is out of bounds

</i>

If a custom selector is provided, care must be taken to ensure that the selector exists on `task_`.
If the selector does not exist, all of the periodic tasks will revert.

```solidity
function addPeriodicTaskAtIndex(
        address task_,
        bytes4 customSelector_,
        uint256 index_
    ) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_ | `address` | The periodic task to add |
| customSelector_ | `bytes4` | The custom selector to use for the task (or 0) |
| index_ | `uint256` | The index where to insert the task |

<a id="_removeperiodictask-uint256"></a>

### _removePeriodicTask

```solidity
function _removePeriodicTask(uint256 index_) internal;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| index_ | `uint256` |             |

<a id="removeperiodictask-address"></a>

### removePeriodicTask

Removes a periodic task from the task list

<i>

This function reverts if:

- The caller is not the admin
- The task is not added

</i>

```solidity
function removePeriodicTask(address task_) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_ | `address` | The periodic task to remove |

<a id="removeperiodictaskatindex-uint256"></a>

### removePeriodicTaskAtIndex

Removes a periodic task at a specific index

<i>

This function reverts if:

- The caller is not the admin
- The index is out of bounds

</i>

```solidity
function removePeriodicTaskAtIndex(uint256 index_) external override onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| index_ | `uint256` | The index of the task to remove |

<a id="_executeperiodictasks"></a>

### _executePeriodicTasks

<i>

This function does not implement any logic to catch errors from the periodic tasks.

</i>

<i>

The logic is that if a periodic task fails, it should fail loudly and revert.

</i>

<i>

Any tasks that are non-essential can include a try-catch block to handle the error internally.

</i>

```solidity
function _executePeriodicTasks() internal;
```

<a id="getperiodictaskcount"></a>

### getPeriodicTaskCount

Gets the total number of periodic tasks

```solidity
function getPeriodicTaskCount() external view override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The number of periodic tasks |

<a id="getperiodictaskatindex-uint256"></a>

### getPeriodicTaskAtIndex

Gets a periodic task at a specific index

```solidity
function getPeriodicTaskAtIndex(
        uint256 index_
    ) external view override returns (address, bytes4);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| index_ | `uint256` | The index of the task to get |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | The address of the periodic task at the specified index |
| &lt;none&gt; | `bytes4` | The custom selector for the task (or 0) |

<a id="getperiodictasks"></a>

### getPeriodicTasks

Gets all periodic tasks

```solidity
function getPeriodicTasks() external view override returns (address[] memory, bytes4[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address[]` | An array of all periodic tasks in order |
| &lt;none&gt; | `bytes4[]` | An array of all custom selectors in order |

<a id="getperiodictaskindex-address"></a>

### getPeriodicTaskIndex

Gets the index of a specific periodic task

```solidity
function getPeriodicTaskIndex(address task_) public view override returns (uint256 _index);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_ | `address` | The periodic task to find |

**Returns**

| Name   | Type      | Description                                              |
| ------ | --------- | -------------------------------------------------------- |
| _index | `uint256` | The index of the task, or type(uint256).max if not found |

<a id="hasperiodictask-address"></a>

### hasPeriodicTask

Checks if a periodic task exists in the manager

```solidity
function hasPeriodicTask(address task_) public view override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_ | `address` | The periodic task to check |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | True if the task exists, false otherwise |
