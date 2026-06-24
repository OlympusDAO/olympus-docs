# Constants

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/policies/utils/RoleDefinitions.sol)

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

### ORACLE_MANAGER_ROLE

Oracle manager role, e.g. managing oracle deployments.

```solidity
bytes32 constant ORACLE_MANAGER_ROLE = "oracle_manager"
```
