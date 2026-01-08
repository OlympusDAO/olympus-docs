# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
Keycode keycode;
bytes4 funcSelector;
}
```
