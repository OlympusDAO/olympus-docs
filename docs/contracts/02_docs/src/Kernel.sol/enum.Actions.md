# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/Kernel.sol)

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
