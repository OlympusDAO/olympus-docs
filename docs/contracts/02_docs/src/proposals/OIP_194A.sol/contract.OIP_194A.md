# OIP_194A

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/proposals/OIP_194A.sol)

**Inherits:**
GovernorBravoProposal

OIP-194A updates the Cooler V2 origination LTV target.

## State Variables

### \_kernel

```solidity
Kernel internal _kernel
```

### \_previousMaxOriginationLtvRate

```solidity
uint96 internal _previousMaxOriginationLtvRate
```

### TARGET_ORIGINATION_LTV

```solidity
uint96 private constant TARGET_ORIGINATION_LTV = 3_123_183_268_921_960_038_400
```

### TARGET_ORIGINATION_LTV_TIME

```solidity
uint40 private constant TARGET_ORIGINATION_LTV_TIME = 1_793_059_200
```

### PROPOSAL_MAX_ORIGINATION_LTV_RATE

```solidity
uint96 private constant PROPOSAL_MAX_ORIGINATION_LTV_RATE = 10_000_000_000_000
```

### PROPOSAL_MAX_ORIGINATION_LTV_RATE_TIME_DELTA

```solidity
uint32 private constant PROPOSAL_MAX_ORIGINATION_LTV_RATE_TIME_DELTA = 1
```

### PREVIOUS_MAX_ORIGINATION_LTV_RATE_TIME_DELTA

```solidity
uint32 private constant PREVIOUS_MAX_ORIGINATION_LTV_RATE_TIME_DELTA = 1
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

### \_deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

### \_afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address) internal override;
```

### \_build

```solidity
function _build(Addresses addresses) internal override;
```

### \_run

```solidity
function _run(Addresses addresses, address) internal override;
```

### \_validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```
