# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/policies/interfaces/IEmissionManager_v1_1.sol)

Interface for the EmissionManager policy as of v1.1

## Functions

### locallyActive

Whether the contract is locally active

```solidity
function locallyActive() external view returns (bool);
```

### shutdown

Shutdown the emission manager

```solidity
function shutdown() external;
```
