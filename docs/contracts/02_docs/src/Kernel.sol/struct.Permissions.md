# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
    Keycode keycode;
    bytes4 funcSelector;
}
```
