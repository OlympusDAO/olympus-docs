# ITimelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/external/governance/interfaces/ITimelock.sol)

## Functions

### delay

```solidity
function delay() external view returns (uint256);
```

### GRACE_PERIOD

```solidity
function GRACE_PERIOD() external view returns (uint256);
```

### acceptAdmin

```solidity
function acceptAdmin() external;
```

### queuedTransactions

```solidity
function queuedTransactions(bytes32 hash) external view returns (bool);
```

### queueTransaction

```solidity
function queueTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string calldata signature,
    bytes calldata data,
    uint256 eta
) external returns (bytes32);
```

### cancelTransaction

```solidity
function cancelTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string calldata signature,
    bytes calldata data,
    uint256 eta
) external;
```

### executeTransaction

```solidity
function executeTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string calldata signature,
    bytes calldata data,
    bytes32 codehash,
    uint256 eta
) external payable returns (bytes memory);
```
