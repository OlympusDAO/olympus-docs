# IReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IReserveWrapper.sol)

**Title:** IReserveWrapper

Interface for the ReserveWrapper policy

## Functions

<a id="getreserve"></a>

### getReserve

Returns the address of the reserve token

```solidity
function getReserve() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="getsreserve"></a>

### getSReserve

Returns the address of the sReserve token

```solidity
function getSReserve() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

## Events

### ReserveWrapped

```solidity
event ReserveWrapped(address indexed reserve, address indexed sReserve, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reserve | `address` |  |
| sReserve | `address` |  |
| amount | `uint256` |  |

## Errors

### ReserveWrapper_ZeroAddress

```solidity
error ReserveWrapper_ZeroAddress();
```

### ReserveWrapper_AssetMismatch

```solidity
error ReserveWrapper_AssetMismatch();
```
