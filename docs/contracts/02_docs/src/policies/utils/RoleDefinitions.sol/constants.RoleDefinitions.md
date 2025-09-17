# Constants

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/utils/RoleDefinitions.sol)

### EMERGENCY_ROLE

*Allows enabling/disabling the protocol/policies in an emergency*

```solidity
bytes32 constant EMERGENCY_ROLE = "emergency";
```

### ADMIN_ROLE

*Administrative access, e.g. configuration parameters. Typically assigned to on-chain governance.*

```solidity
bytes32 constant ADMIN_ROLE = "admin";
```

### MANAGER_ROLE

*Managerial access, e.g. managing specific protocol parameters. Typically assigned to a multisig/council.*

```solidity
bytes32 constant MANAGER_ROLE = "manager";
```
