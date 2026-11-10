# ITimelock

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/governance/interfaces/ITimelock.sol)

## Functions

<a id="delay"></a>

### delay

```solidity
function delay() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="grace_period"></a>

### GRACE_PERIOD

```solidity
function GRACE_PERIOD() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="acceptadmin"></a>

### acceptAdmin

```solidity
function acceptAdmin() external;
```

<a id="queuedtransactions-bytes32"></a>

### queuedTransactions

```solidity
function queuedTransactions(bytes32 hash) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| hash | `bytes32` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="queuetransaction-uint256-address-uint256-string-bytes-uint256"></a>

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
        string calldata signature,
        bytes calldata data,
        uint256 eta
    ) external;
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
        string calldata signature,
        bytes calldata data,
        bytes32 codehash,
        uint256 eta
    ) external payable returns (bytes memory);
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
