# IReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/policies/interfaces/IReserveWrapper.sol)

**Title:**
IReserveWrapper

Interface for the ReserveWrapper policy

## Functions

### getReserve

Returns the address of the reserve token

```solidity
function getReserve() external view returns (address);
```

### getSReserve

Returns the address of the sReserve token

```solidity
function getSReserve() external view returns (address);
```

## Events

### ReserveWrapped

```solidity
event ReserveWrapped(address indexed reserve, address indexed sReserve, uint256 amount);
```

## Errors

### ReserveWrapper_ZeroAddress

```solidity
error ReserveWrapper_ZeroAddress();
```

### ReserveWrapper_AssetMismatch

```solidity
error ReserveWrapper_AssetMismatch();
```
