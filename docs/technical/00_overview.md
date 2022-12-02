---
sidebar_position: 0
---

# Contracts Overview

Olympus V3 is the current and latest iteration of the Olympus protocol. It is a foundation for the future of the protocol, utilizing the [Default Framework](https://github.com/fullyallocated/Default) to allow extensibility at the base layer via fully onchain governance mechanisms. There are a few major pieces to V3: the core registry (Kernel), treasury, minter, governor, and finally, the range-bound stability (RBS) system.

## Default Framework: Kernel, Modules and Policies Summary
Olympus V3 uses the [Default Framework](https://github.com/fullyallocated/Default) to configure the protocol’s smart contracts and authorized addresses within the system. In this framework, all contract dependencies and authorizations are managed via “Actions” in the Kernel.sol contract. These actions are as follows:

- Installing a Module
- Upgrading a Module
- Activating a Policy
- Deactivating a Policy
- Changing the Executor
  - Executor is the address able to call major Kernel functions
- Migrating the Kernel

All non-Kernel smart contracts in the protocol are either *Module Contracts* or *Policy Contracts*, which you can think of as the protocol's "back-end” and “front-end” logic, respectively. In some ways, this shares similarities to the "core" vs. "periphery" design pattern used by protocols like Uniswap: core contracts (Modules) define the core system capabilities, while periphery contracts (Policies) expose the interfaces that enable EOAs use to interact with the protocol's various features.

#### Ownership Model: The Executor

While most protocols have ownership defined at the contract level, Default's philosophy is to define ownership at the protocol level, within the Kernel. This is the function of the Kernel's Executor—it is the address that has the ability to execute actions within the Kernel. In Default, the executor defaults to the Deployer, but this can be set to any address using the Kernel Action _ChangeExecutor_: it's entirely possible to have a Kernel managed by a single wallet, or a multisig, but it can also be a contract. In Olympus V3, the Kernel's owner will be the Governance (Policy) contract.

#### Kernel Migration

The last and final action that can be performed by the Kernel is `MigrateKernel`. This action is particularly sensitive and should only be done the utmost care attention to detail. In Default, any contract that is installed or configured in a Kernel.sol needs to have an internal variable that points to the contract address of instance of the Kernel it is intended for. As a result, the same instance of a Module or a Policy cannot be reused across other Kernels. However, there may be circumstances in the future where new changes are made to the Kernel, like new Actions that are developed, gas optimizations found, or security improvements made that warrant porting the protocol contracts to a new instance of a Kernel without redeploying the contracts. 

The `MigrateKernel` Action reconfigures the internal variable for each contract registered in the Kernel, which will brick it. There are no forseeable plans to use this action in Olympus V3, but it's important to be aware of its' existence.

### Modules

Modules are **internal-facing smart contracts** that store shared state across the protocol, and are used as dependencies for Policies within the protocol. A module is a mix of a microservice and a data model: each Module is responsible for managing a particular data model within the system. Modules should have no dependencies of their own, and their logic should be limited to modifying their own internal state: in other words, a Module contract should not read from or the modify state of an external contract. By and large, EOAs should never call module contracts directly — if ever.
 

In Default protocols, Module contracts are referenced internally as 5 byte uppercase `KEYCODE` representing their underlying data models. For example, an ERC20 token module might have the keycode `TOKEN`, while a Treasury module might have the keycode `TRSRY`. This abstraction is intended to help clarify and distinguish where side effects occur when the protocol experiences external interactions, which should simplify both reading, writing and auditing its business logic.

In Olympus V3, we have the following Modules:

- `MINTR` — The Minter Module, a wrapper for the `OHM` ERC20 contract. Used for minting and burning OHM. A wrapper is used to allow the legacy ERC20 to fit in the Default architecture. 
- `TRSRY` — The Treasury Module, used for depositing and withdrawing assets within the protocol. Also manages token debt allocated to policies.
- `PRICE` — Used to store historical price oracle data. Used for the functionality of the Range-Bound Stability (RBS) system.
- `RANGE` — Stores range information for the RBS system.
- `INSTR` — The Instructions Module, used for storing batched Kernel instructions for convenient proposal execution in the Parthenon policy.
- `ROLES` — The Roles module is for allowing policies to define roles, assign addresses to those roles, and for the designated `rolesAdmin` to manage those roles.

In addition, Modules have a `VERSION()` and optional initialization logic `INIT()` thats called when the Module is integrated into the Kernel, which is mainly used when an existing module is upgraded and its state needs to be migrated. 

Modules often have permissioned functions which should only be called by authorized Policy contracts, such as minting tokens or withdrawing treasury funds. These functions include a `permissioned` modifier to ensure only authorized Policy contracts can call access them.

### Policies

While Module contracts define _where_ protocol side effects occur, Policy contracts define _how_ they occur. Policy contracts are **external-facing contracts** that intercept inbound calls to the protocol, then compose & route all the changes made in the protocol to the corresponding Modules. As a result, Policy contracts do have external dependencies, which are the Kernel Modules that they read and write from.

In Default protocols, Policies must declare their dependencies to the Kernel as part of the contracts state. You will notice that each Policy contract has two functions `configureDependencies()`, which return a list of Kernel modules by their Keycode, and `requestPermissions()`, which the function selectors of the privileged functions they need to call from within the contract logic.

Policies are not "stateless": they can store their own state. However, unlike Modules, the state in Policies should only be used internally, and never as part of another contract's logic. One mental model you can use is that Policies store local state in the protocol, while Modules store global state: if you find that any state is re-used across multiple Policies, it should most likely be abstracted into a Module.

The following Policies are included in Olympus V3:

Range-Bound Stability (RBS) policies:
- `Operator.sol` — Main policy for the Range-Bound Stability system. Inputs market orders, spins up bond markets and facilitates swaps with the treasury in line with the RBS spec (#Range-Bound Stability (RBS) system).
- `BondCallback.sol` — Used as a callback for bond markets. Allows bond markets to mint OHM for payouts.
- `Heart.sol` — Contract to allow easy access for keepers to call RBS keeper functions.
- `PriceConfig.sol` — Used for a specified role to adjust parameters in the `PRICE` module

Governance policies (NOTE: Still have not been deployed):
- `Parthenon.sol` - Governor contract specially made for Default, modeled after Proof-of-Stake.
- `VohmVault.sol` - Policy for distributing voting power to vote lockers.

General protocol and management policies:
- `TreasuryCustodian.sol` — Utility policy for allowing a specified role to modify `TRSRY` state in abnormal circumstances. Used for granting and removing approvals and managing debt.
- `Distributor.sol` - Contract for handling rebase emissions for OHM stakers.
- `RolesAdmin.sol` - Policy for managing the `ROLES` module.
- `Emergency.sol` - Emergency contract to shutdown and restart core systems in special cases.
- `
