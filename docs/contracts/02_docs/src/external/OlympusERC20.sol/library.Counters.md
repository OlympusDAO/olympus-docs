# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/OlympusERC20.sol)

## Functions

### current

```solidity
function current(Counter storage counter) internal view returns (uint256);
```

### increment

```solidity
function increment(Counter storage counter) internal;
```

### decrement

```solidity
function decrement(Counter storage counter) internal;
```

## Structs

### Counter

```solidity
struct Counter {
    uint256 _value;
}
```
