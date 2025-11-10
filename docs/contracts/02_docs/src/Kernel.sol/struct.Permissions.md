# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
    Keycode keycode;
    bytes4 funcSelector;
}
```
