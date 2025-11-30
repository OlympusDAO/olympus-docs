# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/external/OlympusERC20.sol)

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
    // This variable should never be directly accessed by users of the library: interactions must be restricted to
    // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
    // this feature: see https://github.com/ethereum/solidity/issues/4637
    uint256 _value; // default: 0
}
```
