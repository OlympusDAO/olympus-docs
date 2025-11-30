# Timelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/external/governance/Timelock.sol)

**Inherits:**
[ITimelock](/main/contracts/docs/src/external/governance/interfaces/ITimelock.sol/interface.ITimelock)

## State Variables

### GRACE_PERIOD

```solidity
uint256 public constant GRACE_PERIOD = 1 days
```

### MINIMUM_DELAY

```solidity
uint256 public constant MINIMUM_DELAY = 1 days
```

### MAXIMUM_DELAY

```solidity
uint256 public constant MAXIMUM_DELAY = 3 days
```

### admin

```solidity
address public admin
```

### pendingAdmin

```solidity
address public pendingAdmin
```

### delay

```solidity
uint256 public delay
```

### initialized

```solidity
bool public initialized
```

### queuedTransactions

```solidity
mapping(bytes32 => bool) public queuedTransactions
```

## Functions

### constructor

```solidity
constructor(address admin_, uint256 delay_) ;
```

### setFirstAdmin

```solidity
function setFirstAdmin(address admin_) public;
```

### fallback

```solidity
fallback() external payable;
```

### setDelay

```solidity
function setDelay(uint256 delay_) public;
```

### acceptAdmin

```solidity
function acceptAdmin() public;
```

### setPendingAdmin

```solidity
function setPendingAdmin(address pendingAdmin_) public;
```

### queueTransaction

```solidity
function queueTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string memory signature,
    bytes memory data,
    uint256 eta
) public returns (bytes32);
```

### cancelTransaction

```solidity
function cancelTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string memory signature,
    bytes memory data,
    uint256 eta
) public;
```

### executeTransaction

```solidity
function executeTransaction(
    uint256 proposalId,
    address target,
    uint256 value,
    string memory signature,
    bytes memory data,
    bytes32 codehash,
    uint256 eta
) public payable returns (bytes memory);
```

## Events

### NewAdmin

```solidity
event NewAdmin(address indexed newAdmin);
```

### NewPendingAdmin

```solidity
event NewPendingAdmin(address indexed newPendingAdmin);
```

### NewDelay

```solidity
event NewDelay(uint256 indexed newDelay);
```

### CancelTransaction

```solidity
event CancelTransaction(
    uint256 indexed proposalId,
    bytes32 indexed txHash,
    address indexed target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
);
```

### ExecuteTransaction

```solidity
event ExecuteTransaction(
    uint256 indexed proposalId,
    bytes32 indexed txHash,
    address indexed target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
);
```

### QueueTransaction

```solidity
event QueueTransaction(
    uint256 indexed proposalId,
    bytes32 indexed txHash,
    address indexed target,
    uint256 value,
    string signature,
    bytes data,
    uint256 eta
);
```

## Errors

### Timelock_OnlyOnce

```solidity
error Timelock_OnlyOnce();
```

### Timelock_OnlyAdmin

```solidity
error Timelock_OnlyAdmin();
```

### Timelock_OnlyPendingAdmin

```solidity
error Timelock_OnlyPendingAdmin();
```

### Timelock_OnlyInternalCall

```solidity
error Timelock_OnlyInternalCall();
```

### Timelock_InvalidDelay

```solidity
error Timelock_InvalidDelay();
```

### Timelock_InvalidExecutionTime

```solidity
error Timelock_InvalidExecutionTime();
```

### Timelock_InvalidTx_Stale

```solidity
error Timelock_InvalidTx_Stale();
```

### Timelock_InvalidTx_Locked

```solidity
error Timelock_InvalidTx_Locked();
```

### Timelock_InvalidTx_NotQueued

```solidity
error Timelock_InvalidTx_NotQueued();
```

### Timelock_InvalidTx_CodeHashChanged

```solidity
error Timelock_InvalidTx_CodeHashChanged();
```

### Timelock_InvalidTx_ExecReverted

```solidity
error Timelock_InvalidTx_ExecReverted();
```
