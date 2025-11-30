# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/Kernel.sol)

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
