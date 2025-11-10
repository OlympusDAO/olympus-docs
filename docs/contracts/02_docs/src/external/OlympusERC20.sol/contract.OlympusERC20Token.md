# OlympusERC20Token

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/OlympusERC20.sol)

**Inherits:**
[ERC20Permit](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.ERC20Permit), [IOHM](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IOHM), [OlympusAccessControlled](/main/contracts/docs/src/external/OlympusAuthority.sol/abstract.OlympusAccessControlled)

## Functions

### constructor

```solidity
constructor(address _authority)
    ERC20("Olympus", "OHM", 9)
    ERC20Permit("Olympus")
    OlympusAccessControlled(IOlympusAuthority(_authority));
```

### mint

```solidity
function mint(address account_, uint256 amount_) external override onlyVault;
```

### burn

```solidity
function burn(uint256 amount) external override;
```

### burnFrom

```solidity
function burnFrom(address account_, uint256 amount_) external override;
```

### _burnFrom

```solidity
function _burnFrom(address account_, uint256 amount_) internal;
```
