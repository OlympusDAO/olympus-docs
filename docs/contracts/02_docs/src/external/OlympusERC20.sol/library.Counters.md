# Counters

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/external/OlympusERC20.sol)

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
