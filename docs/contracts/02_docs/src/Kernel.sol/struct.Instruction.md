# Instruction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/Kernel.sol)

Used by executor to select an action and a target contract for a kernel action

```solidity
struct Instruction {
Actions action;
address target;
}
```
