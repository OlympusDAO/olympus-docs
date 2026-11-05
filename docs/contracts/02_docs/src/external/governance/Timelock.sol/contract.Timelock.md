# Timelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/governance/Timelock.sol)

**Inherits:** [ITimelock](/main/contracts/docs/src/external/governance/interfaces/ITimelock.sol/interface.ITimelock)

## Constants

### GRACE_PERIOD

```solidity
uint256 public constant GRACE_PERIOD = 1 days;
```

### MINIMUM_DELAY

```solidity
uint256 public constant MINIMUM_DELAY = 1 days;
```

### MAXIMUM_DELAY

```solidity
uint256 public constant MAXIMUM_DELAY = 3 days;
```

## State Variables

### admin

```solidity
address public admin;
```

### pendingAdmin

```solidity
address public pendingAdmin;
```

### delay

```solidity
uint256 public delay;
```

### initialized

```solidity
bool public initialized;
```

### queuedTransactions

```solidity
mapping(bytes32 => bool) public queuedTransactions;
```

## Functions

<a id="constructor-address-uint256"></a>

### constructor

```solidity
constructor(address admin_, uint256 delay_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| admin_ | `address` |  |
| delay_ | `uint256` |  |

<a id="setfirstadmin-address"></a>

### setFirstAdmin

```solidity
function setFirstAdmin(address admin_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| admin_ | `address` |  |

<a id="fallback"></a>

### fallback

```solidity
fallback() external payable;
```

<a id="setdelay-uint256"></a>

### setDelay

```solidity
function setDelay(uint256 delay_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delay_ | `uint256` |  |

<a id="acceptadmin"></a>

### acceptAdmin

```solidity
function acceptAdmin() public;
```

<a id="setpendingadmin-address"></a>

### setPendingAdmin

```solidity
function setPendingAdmin(address pendingAdmin_) public;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| pendingAdmin_ | `address` |  |

<a id="queuetransaction-uint256-address-uint256-string-bytes-uint256"></a>

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| eta | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` |  |

<a id="canceltransaction-uint256-address-uint256-string-bytes-uint256"></a>

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| eta | `uint256` |  |

<a id="executetransaction-uint256-address-uint256-string-bytes-bytes32-uint256"></a>

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| codehash | `bytes32` |  |
| eta | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes` |  |

## Events

### NewAdmin

```solidity
event NewAdmin(address indexed newAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAdmin | `address` |  |

### NewPendingAdmin

```solidity
event NewPendingAdmin(address indexed newPendingAdmin);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newPendingAdmin | `address` |  |

### NewDelay

```solidity
event NewDelay(uint256 indexed newDelay);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newDelay | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| txHash | `bytes32` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| eta | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| txHash | `bytes32` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| eta | `uint256` |  |

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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| proposalId | `uint256` |  |
| txHash | `bytes32` |  |
| target | `address` |  |
| value | `uint256` |  |
| signature | `string` |  |
| data | `bytes` |  |
| eta | `uint256` |  |

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
