# IPeriodicTask

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/interfaces/IPeriodicTask.sol)

Interface for a contract that can perform a task at a specified interval

## Functions

### execute

Executes the periodic task

*Guidelines for implementing functions:*

*- The implementing function is responsible for checking if the task is due to be executed.*

*- The implementing function should avoid reverting, as that would cause the calling contract to revert.*

*- The implementing function should be protected by a role check for the "heart" role.*

```solidity
function execute() external;
```

### supportsInterface

ERC165 interface support

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool);
```
