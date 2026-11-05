# Permissions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

Used to define which module functions a policy needs access to

```solidity
struct Permissions {
    Keycode keycode;
    bytes4 funcSelector;
}
```

**Properties**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| keycode      | `Keycode` |             |
| funcSelector | `bytes4`  |             |
