# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/Kernel.sol)

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
