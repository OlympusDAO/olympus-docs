# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
Keycode keycode;
bytes4 funcSelector;
}
```
