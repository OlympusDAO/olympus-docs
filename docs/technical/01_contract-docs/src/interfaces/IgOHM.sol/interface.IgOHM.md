# IgOHM

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/interfaces/IgOHM.sol)

**Inherits:**
[IERC20](/main/technical/contract-docs/src/external/OlympusERC20.sol/interface.IERC20)

## Functions

### mint

```solidity
function mint(address _to, uint256 _amount) external;
```

### burn

```solidity
function burn(address _from, uint256 _amount) external;
```

### index

```solidity
function index() external view returns (uint256);
```

### balanceFrom

converts gOHM amount to OHM

```solidity
function balanceFrom(uint256 _amount) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|uint|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint|

### balanceTo

converts OHM amount to gOHM

```solidity
function balanceTo(uint256 _amount) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|uint|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint|

### migrate

```solidity
function migrate(address _staking, address _sOHM) external;
```

### getPriorVotes

```solidity
function getPriorVotes(address account, uint256 blockNumber) external view returns (uint256);
```

### totalSupply

```solidity
function totalSupply() external view override returns (uint256);
```
