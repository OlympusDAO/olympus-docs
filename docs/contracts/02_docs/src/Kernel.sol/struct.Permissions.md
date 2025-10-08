# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
    Keycode keycode;
    bytes4 funcSelector;
}
```
