# IOlympusTreasury

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/8f211f9ca557f5c6c9596f50d3a90d95ca98bea1/src/interfaces/IOlympusTreasury.sol)

## Functions

### queue

```solidity
function queue(MANAGING _managing, address _address) external returns (bool);
```

### toggle

```solidity
function toggle(MANAGING _managing, address _address, address _calculator) external returns (bool);
```

### isReserveToken

```solidity
function isReserveToken(address) external view returns (bool);
```

### isReserveDepositor

```solidity
function isReserveDepositor(address) external view returns (bool);
```

### excessReserves

```solidity
function excessReserves() external view returns (uint256);
```

### valueOf

```solidity
function valueOf(address _token, uint256 _amount) external view returns (uint256 value_);
```

### reserveTokenQueue

```solidity
function reserveTokenQueue(address) external view returns (uint256);
```

### reserveDepositorQueue

```solidity
function reserveDepositorQueue(address) external view returns (uint256);
```

### deposit

```solidity
function deposit(uint256 _amount, address _token, uint256 _profit) external returns (uint256 send_);
```

## Enums

### MANAGING

```solidity
enum MANAGING {
    RESERVEDEPOSITOR,
    RESERVESPENDER,
    RESERVETOKEN,
    RESERVEMANAGER,
    LIQUIDITYDEPOSITOR,
    LIQUIDITYTOKEN,
    LIQUIDITYMANAGER,
    DEBTOR,
    REWARDMANAGER,
    SOHM
}
```
