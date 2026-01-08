# IDepositReceiptToken

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/interfaces/IDepositReceiptToken.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

**Title:**
IDepositReceiptToken

Interface for a deposit receipt token

This interface adds additional metadata to the IERC20 interface that is necessary for deposit receipt tokens.

## Functions

### owner

```solidity
function owner() external view returns (address _owner);
```

### asset

```solidity
function asset() external view returns (IERC20 _asset);
```

### depositPeriod

```solidity
function depositPeriod() external view returns (uint8 _depositPeriod);
```

### operator

```solidity
function operator() external view returns (address _operator);
```

## Errors

### OnlyOwner

```solidity
error OnlyOwner();
```
