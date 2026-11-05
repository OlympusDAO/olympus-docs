# IDaiUsdsMigrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/maker-dao/IDaiUsdsMigrator.sol)

## Functions

<a id="dai"></a>

### dai

```solidity
function dai() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="daijoin"></a>

### daiJoin

```solidity
function daiJoin() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="daitousds-address-uint256"></a>

### daiToUsds

```solidity
function daiToUsds(address usr, uint256 wad) external;
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| usr  | `address` |             |
| wad  | `uint256` |             |

<a id="usds"></a>

### usds

```solidity
function usds() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="usdsjoin"></a>

### usdsJoin

```solidity
function usdsJoin() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="usdstodai-address-uint256"></a>

### usdsToDai

```solidity
function usdsToDai(address usr, uint256 wad) external;
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| usr  | `address` |             |
| wad  | `uint256` |             |

## Events

### DaiToUsds

```solidity
event DaiToUsds(address indexed caller, address indexed usr, uint256 wad);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| caller | `address` |             |
| usr    | `address` |             |
| wad    | `uint256` |             |

### UsdsToDai

```solidity
event UsdsToDai(address indexed caller, address indexed usr, uint256 wad);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| caller | `address` |             |
| usr    | `address` |             |
| wad    | `uint256` |             |
