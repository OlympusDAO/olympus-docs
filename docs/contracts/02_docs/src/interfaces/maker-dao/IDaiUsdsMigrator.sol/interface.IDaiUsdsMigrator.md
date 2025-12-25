# IDaiUsdsMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/interfaces/maker-dao/IDaiUsdsMigrator.sol)

## Functions

### dai

```solidity
function dai() external view returns (address);
```

### daiJoin

```solidity
function daiJoin() external view returns (address);
```

### daiToUsds

```solidity
function daiToUsds(address usr, uint256 wad) external;
```

### usds

```solidity
function usds() external view returns (address);
```

### usdsJoin

```solidity
function usdsJoin() external view returns (address);
```

### usdsToDai

```solidity
function usdsToDai(address usr, uint256 wad) external;
```

## Events

### DaiToUsds

```solidity
event DaiToUsds(address indexed caller, address indexed usr, uint256 wad);
```

### UsdsToDai

```solidity
event UsdsToDai(address indexed caller, address indexed usr, uint256 wad);
```
