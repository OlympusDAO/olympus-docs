# GovernorBravoDelegateStorageV2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/governance/abstracts/GovernorBravoStorage.sol)

**Inherits:**
[GovernorBravoDelegateStorageV1](/main/technical/contract-docs/src/external/governance/abstracts/GovernorBravoStorage.sol/abstract.GovernorBravoDelegateStorageV1)

## State Variables

### isKeycodeHighRisk

Modules in the Default system that are considered high risk

*In Default Framework, Keycodes are used to uniquely identify modules. They are a
wrapper over the bytes5 data type, and allow us to easily check if a proposal is
touching any specific modules*

```solidity
mapping(Keycode => bool) public isKeycodeHighRisk;
```

### vetoGuardian

Address which has veto power over all proposals

```solidity
address public vetoGuardian;
```

### kernel

The central hub of the Default Framework system that manages modules and policies

*Used in this adaptation of Governor Bravo to identify high risk proposals*

```solidity
address public kernel;
```
