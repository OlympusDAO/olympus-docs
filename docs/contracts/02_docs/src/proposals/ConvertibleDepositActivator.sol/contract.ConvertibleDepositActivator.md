# ConvertibleDepositActivator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/proposals/ConvertibleDepositActivator.sol)

**Inherits:**
Owned

Single-use contract to activate the Convertible Deposits system

## State Variables

### RESERVE_MIGRATOR

```solidity
address public constant RESERVE_MIGRATOR = 0x986b99579BEc7B990331474b66CcDB94Fa2419F5
```

### OPERATOR

```solidity
address public constant OPERATOR = 0x6417F206a0a6628Da136C0Faa39026d0134D2b52
```

### YIELD_REPURCHASE_FACILITY

```solidity
address public constant YIELD_REPURCHASE_FACILITY = 0x271e35a8555a62F6bA76508E85dfD76D580B0692
```

### DEPOSIT_MANAGER

```solidity
address public immutable DEPOSIT_MANAGER
```

### CD_FACILITY

```solidity
address public immutable CD_FACILITY
```

### REDEMPTION_VAULT

```solidity
address public immutable REDEMPTION_VAULT
```

### CD_AUCTIONEER

```solidity
address public immutable CD_AUCTIONEER
```

### EMISSION_MANAGER

```solidity
address public immutable EMISSION_MANAGER
```

### HEART

```solidity
address public immutable HEART
```

### RESERVE_WRAPPER

```solidity
address public immutable RESERVE_WRAPPER
```

### CD_NAME

```solidity
string public constant CD_NAME = "cdf"
```

### USDS

```solidity
address public constant USDS = 0xdC035D45d973E3EC169d2276DDab16f1e407384F
```

### SUSDS

```solidity
address public constant SUSDS = 0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD
```

### USDS_MAX_CAPACITY

```solidity
uint256 public constant USDS_MAX_CAPACITY = 1_000_000e18
```

### USDS_MIN_DEPOSIT

```solidity
uint256 public constant USDS_MIN_DEPOSIT = 1e18
```

### PERIOD_1M

```solidity
uint8 public constant PERIOD_1M = 1
```

### PERIOD_2M

```solidity
uint8 public constant PERIOD_2M = 2
```

### PERIOD_3M

```solidity
uint8 public constant PERIOD_3M = 3
```

### RECLAIM_RATE

```solidity
uint16 public constant RECLAIM_RATE = 90e2
```

### CDA_INITIAL_TARGET

```solidity
uint256 public constant CDA_INITIAL_TARGET = 0
```

### CDA_INITIAL_TICK_SIZE

```solidity
uint256 public constant CDA_INITIAL_TICK_SIZE = 0
```

### CDA_INITIAL_MIN_PRICE

```solidity
uint256 public constant CDA_INITIAL_MIN_PRICE = 0
```

### CDA_INITIAL_TICK_SIZE_BASE

```solidity
uint256 public constant CDA_INITIAL_TICK_SIZE_BASE = 2e18
```

### CDA_INITIAL_TICK_STEP_MULTIPLIER

```solidity
uint24 public constant CDA_INITIAL_TICK_STEP_MULTIPLIER = 10075
```

### CDA_AUCTION_TRACKING_PERIOD

```solidity
uint8 public constant CDA_AUCTION_TRACKING_PERIOD = 7
```

### CDA_MINIMUM_BID

```solidity
uint256 public constant CDA_MINIMUM_BID = 100e18
```

### EM_BASE_EMISSIONS_RATE

```solidity
uint256 public constant EM_BASE_EMISSIONS_RATE = 200000
```

### EM_MINIMUM_PREMIUM

```solidity
uint256 public constant EM_MINIMUM_PREMIUM = 5e17
```

### EM_BACKING

```solidity
uint256 public constant EM_BACKING = 11690000000000000000
```

### EM_TICK_SIZE

```solidity
uint256 public constant EM_TICK_SIZE = 150e9
```

### EM_MIN_PRICE_SCALAR

```solidity
uint256 public constant EM_MIN_PRICE_SCALAR = 12e17
```

### EM_BOND_MARKET_CAPACITY_SCALAR

```solidity
uint256 public constant EM_BOND_MARKET_CAPACITY_SCALAR = 0
```

### EM_RESTART_TIMEFRAME

```solidity
uint48 public constant EM_RESTART_TIMEFRAME = 950400
```

### isActivated

True if the activation has been performed

```solidity
bool public isActivated = false
```

## Functions

### constructor

```solidity
constructor(
    address owner_,
    address depositManager_,
    address cdFacility_,
    address cdAuctioneer_,
    address redemptionVault_,
    address emissionManager_,
    address heart_,
    address reserveWrapper_
) Owned(owner_);
```

### _activateContracts

```solidity
function _activateContracts() internal;
```

### _configureAssets

```solidity
function _configureAssets() internal;
```

### _configureAuction

```solidity
function _configureAuction() internal;
```

### _configurePeriodicTasks

```solidity
function _configurePeriodicTasks() internal;
```

### activate

Activates the Convertible Deposits system

This function assumes:

- The "admin" role has been granted to the contract
This function reverts if:
- The caller is not the owner
- The function has already been run

```solidity
function activate() external onlyOwner;
```

## Events

### Activated

```solidity
event Activated(address caller);
```

## Errors

### AlreadyActivated

```solidity
error AlreadyActivated();
```

### InvalidParams

```solidity
error InvalidParams(string reason);
```
