# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
Keycode keycode;
bytes4 funcSelector;
}
```
