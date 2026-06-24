# IEmissionManager

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/interfaces/IEmissionManager_v1_1.sol)

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
