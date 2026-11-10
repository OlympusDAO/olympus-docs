# Instruction

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

Used by executor to select an action and a target contract for a kernel action

```solidity
struct Instruction {
    Actions action;
    address target;
}
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| action | `Actions` |  |
| target | `address` |  |
