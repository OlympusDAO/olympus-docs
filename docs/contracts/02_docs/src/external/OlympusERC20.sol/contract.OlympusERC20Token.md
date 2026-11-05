# OlympusERC20Token

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/OlympusERC20.sol)

**Inherits:** [ERC20Permit](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.ERC20Permit), [IOHM](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IOHM), [OlympusAccessControlled](/main/contracts/docs/src/external/OlympusERC20.sol/abstract.OlympusAccessControlled)

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(
        address _authority
    )
        ERC20("Olympus", "OHM", 9)
        ERC20Permit("Olympus")
        OlympusAccessControlled(IOlympusAuthority(_authority));
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| _authority | `address` |             |

<a id="mint-address-uint256"></a>

### mint

```solidity
function mint(address account_, uint256 amount_) external override onlyVault;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| account_ | `address` |             |
| amount_  | `uint256` |             |

<a id="burn-uint256"></a>

### burn

```solidity
function burn(uint256 amount) external override;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| amount | `uint256` |             |

<a id="burnfrom-address-uint256"></a>

### burnFrom

```solidity
function burnFrom(address account_, uint256 amount_) external override;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| account_ | `address` |             |
| amount_  | `uint256` |             |

<a id="_burnfrom-address-uint256"></a>

### _burnFrom

```solidity
function _burnFrom(address account_, uint256 amount_) internal;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| account_ | `address` |             |
| amount_  | `uint256` |             |
