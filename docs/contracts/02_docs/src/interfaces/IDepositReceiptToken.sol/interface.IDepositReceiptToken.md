# IDepositReceiptToken

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/interfaces/IDepositReceiptToken.sol)

**Inherits:**
[IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

Interface for a deposit receipt token

*This interface adds additional metadata to the IERC20 interface that is necessary for deposit receipt tokens.*

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
