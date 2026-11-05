# IReEnabler

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/bases/interfaces/IReEnabler.sol)

**Title:** IReEnabler

The external interface of a contract that exposes a parameterless `reEnable`
entry point.

## Functions

<a id="reenable"></a>

### reEnable

Returns the contract to the enabled state without consuming a calldata payload.

```solidity
function reEnable() external;
```

## Errors

### NeverEnabled

Thrown when `reEnable` is invoked on a contract that has never been enabled.

```solidity
error NeverEnabled();
```
