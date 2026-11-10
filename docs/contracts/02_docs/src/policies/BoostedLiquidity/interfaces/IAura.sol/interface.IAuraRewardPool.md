# IAuraRewardPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/BoostedLiquidity/interfaces/IAura.sol)

## Functions

<a id="balanceof-address"></a>

### balanceOf

```solidity
function balanceOf(address account_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="earned-address"></a>

### earned

```solidity
function earned(address account_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="rewardrate"></a>

### rewardRate

```solidity
function rewardRate() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="rewardtoken"></a>

### rewardToken

```solidity
function rewardToken() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="extrarewardslength"></a>

### extraRewardsLength

```solidity
function extraRewardsLength() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="extrarewards-uint256"></a>

### extraRewards

```solidity
function extraRewards(uint256 index) external view returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="deposit-uint256-address"></a>

### deposit

```solidity
function deposit(uint256 assets_, address receiver_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| assets_ | `uint256` |  |
| receiver_ | `address` |  |

<a id="getreward-address-bool"></a>

### getReward

```solidity
function getReward(address account_, bool claimExtras_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| account_ | `address` |  |
| claimExtras_ | `bool` |  |

<a id="withdrawandunwrap-uint256-bool"></a>

### withdrawAndUnwrap

```solidity
function withdrawAndUnwrap(uint256 amount_, bool claim_) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` |  |
| claim_ | `bool` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
