# IDepositReceiptToken

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IDepositReceiptToken.sol)

**Inherits:** [IERC20](/main/contracts/docs/src/interfaces/IERC20.sol/interface.IERC20)

**Title:** IDepositReceiptToken

Interface for a deposit receipt token

<i>

This interface adds additional metadata to the IERC20 interface that is necessary for deposit receipt tokens.

</i>

## Functions

<a id="owner"></a>

### owner

```solidity
function owner() external view returns (address _owner);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | `address` |  |

<a id="asset"></a>

### asset

```solidity
function asset() external view returns (IERC20 _asset);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | `IERC20` |  |

<a id="depositperiod"></a>

### depositPeriod

```solidity
function depositPeriod() external view returns (uint8 _depositPeriod);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _depositPeriod | `uint8` |  |

<a id="operator"></a>

### operator

```solidity
function operator() external view returns (address _operator);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _operator | `address` |  |

## Errors

### OnlyOwner

```solidity
error OnlyOwner();
```
