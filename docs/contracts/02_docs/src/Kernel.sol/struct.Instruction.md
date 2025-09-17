# Instruction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/Kernel.sol)

Used by executor to select an action and a target contract for a kernel action

```solidity
struct Instruction {
    Actions action;
    address target;
}
```
