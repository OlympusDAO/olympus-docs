# IPeriodicTask

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IPeriodicTask.sol)

**Title:** IPeriodicTask

Interface for a contract that can perform a task at a specified interval

## Functions

<a id="execute"></a>

### execute

Executes the periodic task

<i>

Guidelines for implementing functions:

</i>

<i>

- The implementing function is responsible for checking if the task is due to be executed.

</i>

<i>

- The implementing function should avoid reverting, as that would cause the calling contract to revert.

</i>

<i>

- The implementing function should be protected by a role check for the "heart" role.

</i>

```solidity
function execute() external;
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

ERC165 interface support

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```

**Parameters**

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| interfaceId | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |
