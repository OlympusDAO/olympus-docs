# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/OlympusERC20.sol)

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
