# ConvertibleDepositProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/proposals/ConvertibleDepositProposal.sol)

**Inherits:**
GovernorBravoProposal

Combined proposal that enables and configures the Convertible Deposit system

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

### CDF_NAME

```solidity
string internal constant CDF_NAME = "cdf";
```

### USDS_MAX_CAPACITY

```solidity
uint256 internal constant USDS_MAX_CAPACITY = 1_000_000e18;
```

### USDS_MIN_DEPOSIT

```solidity
uint256 internal constant USDS_MIN_DEPOSIT = 1e18;
```

### PERIOD_1M

```solidity
uint8 internal constant PERIOD_1M = 1;
```

### PERIOD_2M

```solidity
uint8 internal constant PERIOD_2M = 2;
```

### PERIOD_3M

```solidity
uint8 internal constant PERIOD_3M = 3;
```

### RECLAIM_RATE

```solidity
uint16 internal constant RECLAIM_RATE = 90e2;
```

### CDA_INITIAL_TARGET

```solidity
uint256 internal constant CDA_INITIAL_TARGET = 0;
```

### CDA_INITIAL_TICK_SIZE

```solidity
uint256 internal constant CDA_INITIAL_TICK_SIZE = 0;
```

### CDA_INITIAL_MIN_PRICE

```solidity
uint256 internal constant CDA_INITIAL_MIN_PRICE = 0;
```

### CDA_INITIAL_TICK_STEP_MULTIPLIER

```solidity
uint24 internal constant CDA_INITIAL_TICK_STEP_MULTIPLIER = 10075;
```

### CDA_AUCTION_TRACKING_PERIOD

```solidity
uint8 internal constant CDA_AUCTION_TRACKING_PERIOD = 7;
```

### EM_BASE_EMISSIONS_RATE

```solidity
uint256 internal constant EM_BASE_EMISSIONS_RATE = 200000;
```

### EM_MINIMUM_PREMIUM

```solidity
uint256 internal constant EM_MINIMUM_PREMIUM = 1e18;
```

### EM_BACKING

```solidity
uint256 internal constant EM_BACKING = 11740000000000000000;
```

### EM_TICK_SIZE

```solidity
uint256 internal constant EM_TICK_SIZE = 150e9;
```

### EM_MIN_PRICE_SCALAR

```solidity
uint256 internal constant EM_MIN_PRICE_SCALAR = 1e18;
```

### EM_RESTART_TIMEFRAME

```solidity
uint48 internal constant EM_RESTART_TIMEFRAME = 950400;
```

## Functions

### id

```solidity
function id() public pure override returns (uint256);
```

### name

```solidity
function name() public pure override returns (string memory);
```

### description

```solidity
function description() public pure override returns (string memory);
```

### _getHeaderSection

*Returns the header and summary section of the proposal description*

```solidity
function _getHeaderSection() private pure returns (string memory);
```

### _getContractsSection

*Returns the affected contracts section of the proposal description*

```solidity
function _getContractsSection() private pure returns (string memory);
```

### _getResourcesAndPrerequisitesSection

*Returns the resources and prerequisites section of the proposal description*

```solidity
function _getResourcesAndPrerequisitesSection() private pure returns (string memory);
```

### _getProposalStepsSection

*Returns the proposal steps section of the proposal description*

```solidity
function _getProposalStepsSection() private pure returns (string memory);
```

### _getProposalStepsPhase1and2

*Returns Phase 1 and 2 of the proposal steps*

```solidity
function _getProposalStepsPhase1and2() private pure returns (string memory);
```

### _getProposalStepsPhase3Part1

*Returns the first part of Phase 3 steps*

```solidity
function _getProposalStepsPhase3Part1() private pure returns (string memory);
```

### _getProposalStepsPhase3Part2

*Returns the second part of Phase 3 steps*

```solidity
function _getProposalStepsPhase3Part2() private pure returns (string memory);
```

### _getConclusionSection

*Returns the conclusion section of the proposal description*

```solidity
function _getConclusionSection() private pure returns (string memory);
```

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

### _build

```solidity
function _build(Addresses addresses) internal override;
```

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```
