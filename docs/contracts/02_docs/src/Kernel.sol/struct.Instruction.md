# Instruction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/Kernel.sol)

Used by executor to select an action and a target contract for a kernel action

```solidity
struct Instruction {
Actions action;
address target;
}
```
