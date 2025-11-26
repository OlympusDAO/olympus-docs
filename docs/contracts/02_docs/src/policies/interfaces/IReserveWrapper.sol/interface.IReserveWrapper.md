# IReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/policies/interfaces/IReserveWrapper.sol)

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
