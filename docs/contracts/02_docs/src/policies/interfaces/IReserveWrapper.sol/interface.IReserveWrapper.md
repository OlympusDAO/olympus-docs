# IReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/interfaces/IReserveWrapper.sol)

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
