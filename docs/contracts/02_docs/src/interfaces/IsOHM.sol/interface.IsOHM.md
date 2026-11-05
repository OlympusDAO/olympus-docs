# IsOHM

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IsOHM.sol)

**Inherits:** [IERC20](/main/contracts/docs/src/interfaces/IERC20.sol/interface.IERC20)

## Functions

<a id="setindex-uint256"></a>

### setIndex

```solidity
function setIndex(uint256 _index) external;
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| _index | `uint256` |             |

<a id="setgohm-address"></a>

### setgOHM

```solidity
function setgOHM(address _gOHM) external;
```

**Parameters**

| Name  | Type      | Description |
| ----- | --------- | ----------- |
| _gOHM | `address` |             |

<a id="initialize-address-address"></a>

### initialize

```solidity
function initialize(address _stakingContract, address _treasury) external;
```

**Parameters**

| Name             | Type      | Description |
| ---------------- | --------- | ----------- |
| _stakingContract | `address` |             |
| _treasury        | `address` |             |

<a id="index"></a>

### index

```solidity
function index() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="gohm"></a>

### gOHM

```solidity
function gOHM() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="stakingcontract"></a>

### stakingContract

```solidity
function stakingContract() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="treasury"></a>

### treasury

```solidity
function treasury() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="circulatingsupply"></a>

### circulatingSupply

```solidity
function circulatingSupply() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="gonsforbalance-uint256"></a>

### gonsForBalance

```solidity
function gonsForBalance(uint256 amount) external view returns (uint256);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| amount | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="balanceforgons-uint256"></a>

### balanceForGons

```solidity
function balanceForGons(uint256 gons) external view returns (uint256);
```

**Parameters**

| Name | Type      | Description |
| ---- | --------- | ----------- |
| gons | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
