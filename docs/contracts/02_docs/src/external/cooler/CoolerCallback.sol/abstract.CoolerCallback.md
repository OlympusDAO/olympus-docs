# CoolerCallback

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/external/cooler/CoolerCallback.sol)

Allows for debt issuers to execute logic when a loan is repaid, rolled, or defaulted.

The three callback functions must be implemented if `isCoolerCallback()` is set to true.

## State Variables

### factory

```solidity
CoolerFactory public immutable factory
```

## Functions

### constructor

```solidity
constructor(address coolerFactory_) ;
```

### isCoolerCallback

Informs to Cooler that this contract can handle its callbacks.

```solidity
function isCoolerCallback() external pure returns (bool);
```

### onRepay

Callback function that handles repayments.

```solidity
function onRepay(uint256 loanID_, uint256 principlePaid_, uint256 interestPaid_) external;
```

### onDefault

Callback function that handles defaults.

```solidity
function onDefault(uint256 loanID_, uint256 principle, uint256 interest, uint256 collateral) external;
```

### _onRepay

Callback function that handles repayments. Override for custom logic.

```solidity
function _onRepay(uint256 loanID_, uint256 principlePaid_, uint256 interestPaid_) internal virtual;
```

### _onDefault

Callback function that handles defaults.

```solidity
function _onDefault(uint256 loanID_, uint256 principle_, uint256 interestDue_, uint256 collateral) internal virtual;
```

## Errors

### OnlyFromFactory

```solidity
error OnlyFromFactory();
```
