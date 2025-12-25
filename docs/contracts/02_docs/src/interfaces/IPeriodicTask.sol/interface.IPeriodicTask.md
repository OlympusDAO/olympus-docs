# IPeriodicTask

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/interfaces/IPeriodicTask.sol)

**Title:**
IPeriodicTask

Interface for a contract that can perform a task at a specified interval

## Functions

### execute

Executes the periodic task

Guidelines for implementing functions:

- The implementing function is responsible for checking if the task is due to be executed.

- The implementing function should avoid reverting, as that would cause the calling contract to revert.

- The implementing function should be protected by a role check for the "heart" role.

```solidity
function execute() external;
```

### supportsInterface

ERC165 interface support

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```
