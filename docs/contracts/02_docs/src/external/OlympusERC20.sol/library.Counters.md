# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/OlympusERC20.sol)

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
