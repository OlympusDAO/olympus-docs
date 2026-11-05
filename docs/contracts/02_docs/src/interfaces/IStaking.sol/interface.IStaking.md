# IStaking

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IStaking.sol)

## Functions

<a id="ohm"></a>

### OHM

```solidity
function OHM() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="sohm"></a>

### sOHM

```solidity
function sOHM() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="gohm"></a>

### gOHM

```solidity
function gOHM() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="index"></a>

### index

```solidity
function index() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="supplyinwarmup"></a>

### supplyInWarmup

```solidity
function supplyInWarmup() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="rebase"></a>

### rebase

```solidity
function rebase() external returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="stake-address-uint256-bool-bool"></a>

### stake

```solidity
function stake(
        address to_,
        uint256 amount_,
        bool rebasing_,
        bool claim_
    ) external returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| amount_ | `uint256` |  |
| rebasing_ | `bool` |  |
| claim_ | `bool` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="unstake-address-uint256-bool-bool"></a>

### unstake

```solidity
function unstake(
        address to_,
        uint256 amount_,
        bool trigger_,
        bool rebasing_
    ) external returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` |  |
| amount_ | `uint256` |  |
| trigger_ | `bool` |  |
| rebasing_ | `bool` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="setdistributor-address"></a>

### setDistributor

```solidity
function setDistributor(address _distributor) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _distributor | `address` |  |

<a id="secondstonextepoch"></a>

### secondsToNextEpoch

```solidity
function secondsToNextEpoch() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="epoch"></a>

### epoch

```solidity
function epoch() external view returns (uint256, uint256, uint256, uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |
| &lt;none&gt; | `uint256` |  |
| &lt;none&gt; | `uint256` |  |
| &lt;none&gt; | `uint256` |  |

## Structs

### Epoch

```solidity
struct Epoch {
        uint256 length;
        uint256 number;
        uint256 end;
        uint256 distribute;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| length | `uint256` |  |
| number | `uint256` |  |
| end | `uint256` |  |
| distribute | `uint256` |  |
