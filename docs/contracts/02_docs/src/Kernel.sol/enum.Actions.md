# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/Kernel.sol)

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
