# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/Kernel.sol)

Actions to trigger state changes in the kernel. Passed by the executor

```solidity
enum Actions {
    InstallModule,
    UpgradeModule,
    ActivatePolicy,
    DeactivatePolicy,
    ChangeExecutor,
    MigrateKernel
}
```

**Variants**

| Name             | Description |
| ---------------- | ----------- |
| InstallModule    |             |
| UpgradeModule    |             |
| ActivatePolicy   |             |
| DeactivatePolicy |             |
| ChangeExecutor   |             |
| MigrateKernel    |             |
