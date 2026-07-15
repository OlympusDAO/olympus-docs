# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
Keycode keycode;
bytes4 funcSelector;
}
```
