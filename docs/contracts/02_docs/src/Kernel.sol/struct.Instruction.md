# Instruction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/Kernel.sol)

Used by executor to select an action and a target contract for a kernel action

```solidity
struct Instruction {
    Actions action;
    address target;
}
```
