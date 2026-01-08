# Constants

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/utils/RoleDefinitions.sol)

### EMERGENCY_ROLE

Allows enabling/disabling the protocol/policies in an emergency

```solidity
bytes32 constant EMERGENCY_ROLE = "emergency"
```

### ADMIN_ROLE

Administrative access, e.g. configuration parameters. Typically assigned to on-chain governance.

```solidity
bytes32 constant ADMIN_ROLE = "admin"
```

### MANAGER_ROLE

Managerial access, e.g. managing specific protocol parameters. Typically assigned to a multisig/council.

```solidity
bytes32 constant MANAGER_ROLE = "manager"
```

### HEART_ROLE

Heart role, e.g. performing periodic tasks.

```solidity
bytes32 constant HEART_ROLE = "heart"
```
