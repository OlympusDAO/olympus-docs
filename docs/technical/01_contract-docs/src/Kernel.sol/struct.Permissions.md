# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
    Keycode keycode;
    bytes4 funcSelector;
}
```
