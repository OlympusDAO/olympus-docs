# IgOHM

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IgOHM.sol)

**Inherits:** [IERC20](/main/contracts/docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

<a id="mint-address-uint256"></a>

### mint

```solidity
function mint(address _to, uint256 _amount) external;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| _to     | `address` |             |
| _amount | `uint256` |             |

<a id="burn-address-uint256"></a>

### burn

```solidity
function burn(address _from, uint256 _amount) external;
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| _from   | `address` |             |
| _amount | `uint256` |             |

<a id="index"></a>

### index

```solidity
function index() external view returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="sohm"></a>

### sOHM

```solidity
function sOHM() external view returns (address);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

<a id="balancefrom-uint256"></a>

### balanceFrom

```solidity
function balanceFrom(uint256 _amount) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| _amount | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="balanceto-uint256"></a>

### balanceTo

```solidity
function balanceTo(uint256 _amount) external view returns (uint256);
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| _amount | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="migrate-address-address"></a>

### migrate

```solidity
function migrate(address _staking, address _sOHM) external;
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| _staking | `address` |             |
| _sOHM    | `address` |             |

<a id="getpriorvotes-address-uint256"></a>

### getPriorVotes

```solidity
function getPriorVotes(address account, uint256 blockNumber) external view returns (uint256);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| account     | `address` |             |
| blockNumber | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="totalsupply"></a>

### totalSupply

<i>

Returns the amount of tokens in existence.

</i>

```solidity
function totalSupply() external view override returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |
