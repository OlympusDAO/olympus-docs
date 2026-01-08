# Actions

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/Kernel.sol)

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
