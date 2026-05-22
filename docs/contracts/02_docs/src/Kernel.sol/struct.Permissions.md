# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
Keycode keycode;
bytes4 funcSelector;
}
```
