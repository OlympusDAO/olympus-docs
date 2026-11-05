# IOlympusTreasury

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/IOlympusTreasury.sol)

## Functions

<a id="queue-managing-address"></a>

### queue

```solidity
function queue(MANAGING _managing, address _address) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _managing | `MANAGING` |  |
| _address | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="toggle-managing-address-address"></a>

### toggle

```solidity
function toggle(
        MANAGING _managing,
        address _address,
        address _calculator
    ) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _managing | `MANAGING` |  |
| _address | `address` |  |
| _calculator | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="isreservetoken-address"></a>

### isReserveToken

```solidity
function isReserveToken(address) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="isreservedepositor-address"></a>

### isReserveDepositor

```solidity
function isReserveDepositor(address) external view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="excessreserves"></a>

### excessReserves

```solidity
function excessReserves() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="valueof-address-uint256"></a>

### valueOf

```solidity
function valueOf(address _token, uint256 _amount) external view returns (uint256 value_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | `address` |  |
| _amount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint256` |  |

<a id="reservetokenqueue-address"></a>

### reserveTokenQueue

```solidity
function reserveTokenQueue(address) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="reservedepositorqueue-address"></a>

### reserveDepositorQueue

```solidity
function reserveDepositorQueue(address) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="deposit-uint256-address-uint256"></a>

### deposit

```solidity
function deposit(
        uint256 _amount,
        address _token,
        uint256 _profit
    ) external returns (uint256 send_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | `uint256` |  |
| _token | `address` |  |
| _profit | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| send_ | `uint256` |  |

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

**Variants**

| Name | Description |
| ---- | ----------- |
| RESERVEDEPOSITOR |  |
| RESERVESPENDER |  |
| RESERVETOKEN |  |
| RESERVEMANAGER |  |
| LIQUIDITYDEPOSITOR |  |
| LIQUIDITYTOKEN |  |
| LIQUIDITYMANAGER |  |
| DEBTOR |  |
| REWARDMANAGER |  |
| SOHM |  |
