# OlympusPricev1_2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/modules/PRICE/OlympusPrice.v1_2.sol)

**Inherits:** [OlympusPricev2](/main/contracts/docs/src/modules/PRICE/OlympusPrice.v2.sol/contract.OlympusPricev2), [IPRICEv1](/main/contracts/docs/src/modules/PRICE/IPRICE.v1.sol/interface.IPRICEv1)

Backward compatibility layer for PRICEv1

<i>

Provides PRICEv1-compatible functions while using PRICEv2 implementation underneath

</i>

<i>

All PRICEv1 functions map to a default asset (OHM)

</i>

## Constants

### _DECIMALS

Number of decimals in the price values provided by the contract.

<i>

This is 18 for backwards-compatibility with PRICEv1.

</i>

```solidity
uint8 internal constant _DECIMALS = 18;
```

### _OHM

The address of the OHM token

```solidity
address internal immutable _OHM;
```

## State Variables

### minimumTargetPrice

OHM-specific minimum target price (PRICEv1 style), scaled to 18 decimals.

<i>

Value is represented as `targetPrice * 10**18`, matching PRICEv1-compatible output units.

</i>

```solidity
uint256 public minimumTargetPrice;
```

## Functions

<a id="constructor-kernel-address-uint32-uint256"></a>

### constructor

Constructor for PRICEv1_2 compatibility layer

<i>

The constructor reverts if:

</i>

<i>

- `observationFrequency_` is invalid (from `OlympusPricev2`)

</i>

<i>

- `ohm_ == address(0)` (`PRICE_InvalidOHM`)

</i>

```solidity
constructor(
        Kernel kernel_,
        address ohm_,
        uint32 observationFrequency_,
        uint256 minimumTargetPrice_
    ) OlympusPricev2(kernel_, _DECIMALS, observationFrequency_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` | Kernel address |
| ohm_ | `address` | The address of the OHM token |
| observationFrequency_ | `uint32` | Frequency at which prices are stored for moving average |
| minimumTargetPrice_ | `uint256` | Initial minimum target OHM price in 18 decimals (`price * 10**18`) |

<a id="version"></a>

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure virtual override returns (uint8 major_, uint8 minor_);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major_ | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor_ | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="_getohmprice-ipricev2-variant"></a>

### _getOhmPrice

Returns an OHM price variant from PRICEv2

```solidity
function _getOhmPrice(IPRICEv2.Variant variant_) internal view returns (uint256 price_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| variant_ | `IPRICEv2.Variant` | Price variant to fetch |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| price_ | `uint256` |          The requested OHM price |

<a id="_unitprice"></a>

### _unitPrice

Returns the unit price scaled to PRICE decimals

<i>

PRICEv1 compatibility always uses 18 decimals, so the unit price is constant.

</i>

```solidity
function _unitPrice() internal pure override returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getcurrentprice"></a>

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

<i>

Returns the current price of OHM.

</i>

<i>

Compatibility function for PRICEv1.

</i>

<i>

Reverts if:

</i>

<i>

- OHM is not approved in PRICE

</i>

<i>

- A current OHM price cannot be determined

</i>

```solidity
function getCurrentPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getlastprice"></a>

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

<i>

Returns the last price of OHM.

</i>

<i>

Compatibility function for PRICEv1.

</i>

<i>

Reverts if:

</i>

<i>

- OHM is not approved in PRICE

</i>

<i>

- OHM does not store moving-average observations

</i>

```solidity
function getLastPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="getmovingaverage"></a>

### getMovingAverage

Get the stored moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

<i>

Returns the moving average of OHM.

</i>

<i>

Compatibility function for PRICEv1.

</i>

<i>

Returns the raw stored moving average, which may be stale.

</i>

<i>

Reverts if:

</i>

<i>

- OHM is not approved in PRICE

</i>

<i>

- OHM does not store moving-average observations

</i>

```solidity
function getMovingAverage() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="gettargetprice"></a>

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

<i>

Returns the target price of OHM.

</i>

<i>

Compatibility function for PRICEv1.

</i>

<i>

Reverts if:

</i>

<i>

- OHM is not approved in PRICE

</i>

<i>

- OHM does not store moving-average observations

</i>

<i>

- OHM moving average is stale relative to `observationFrequency()`

</i>

```solidity
function getTargetPrice() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="lastobservationtime"></a>

### lastObservationTime

Unix timestamp of last observation (in seconds).

<i>

Returns the last observation time for OHM.

</i>

<i>

Compatibility function for PRICEv1.

</i>

<i>

Reverts if:

</i>

<i>

- OHM is not approved in PRICE

</i>

<i>

- OHM does not store moving-average observations

</i>

```solidity
function lastObservationTime() external view override returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="ohm"></a>

### OHM

Returns the OHM token address used by PRICEv1-compatible functions.

```solidity
function OHM() external view returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="updatemovingaverage"></a>

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

<i>

Updates the moving average for all assets.

</i>

<i>

Provided as a compatibility function for PRICEv1.

</i>

<i>

Reverts if:

</i>

<i>

- The caller is not permissioned by the Kernel

</i>

<i>

- Any configured moving-average asset fails observation storage

</i>

<i>

Reentrancy note: delegates to `storeObservations()`, whose feed/strategy lookups

</i>

<i>

are resolved via `staticcall`.

</i>

```solidity
function updateMovingAverage() external permissioned;
```

<a id="initialize-uint256-uint48"></a>

### initialize

Initialize the price module

<i>

Deprecated.

</i>

<i>

Reverts with `PRICE_Deprecated`.

</i>

```solidity
function initialize(uint256[] memory, uint48) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint256[]` |  |
| _ | `uint48` |  |

<a id="changeminimumtargetprice-uint256"></a>

### changeMinimumTargetPrice

Change the minimum target price

<i>

Changes the minimum target price for OHM.

</i>

<i>

Provided as a compatibility function for PRICEv1.

</i>

<i>

Reverts if the caller is not permissioned by the Kernel.

</i>

<i>

Reentrancy note: this function does not make external calls.

</i>

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external permissioned;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumTargetPrice_ | `uint256` | New minimum target OHM price in 18 decimals (`price * 10**18`) |

<a id="changeupdatethresholds-uint48-uint48"></a>

### changeUpdateThresholds

Change the update thresholds for the price feeds

<i>

Deprecated.

</i>

<i>

Reverts with `PRICE_Deprecated`.

</i>

```solidity
function changeUpdateThresholds(uint48, uint48) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint48` |  |
| _ | `uint48` |  |

<a id="changemovingaverageduration-uint48"></a>

### changeMovingAverageDuration

Change the moving average window (duration)

<i>

Deprecated.

</i>

<i>

Reverts with `PRICE_Deprecated`.

</i>

```solidity
function changeMovingAverageDuration(uint48) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint48` |  |

<a id="changeobservationfrequency-uint48"></a>

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

<i>

Deprecated.

</i>

<i>

Reverts with `PRICE_Deprecated`.

</i>

```solidity
function changeObservationFrequency(uint48) external pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `uint48` |  |

<a id="decimals"></a>

### decimals

The number of decimals to used in output values

<i>

Does not revert.

</i>

```solidity
function decimals() external pure virtual override(IPRICEv1, PRICEv2) returns (uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` |  |

<a id="observationfrequency"></a>

### observationFrequency

The frequency of price observations (in seconds)

<i>

Does not revert.

</i>

```solidity
function observationFrequency()
        external
        view
        virtual
        override(IPRICEv1, PRICEv2)
        returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

Does not revert.

</i>

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual override returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

## Errors

### PRICE_Deprecated

Function is deprecated in PRICEv1_2

```solidity
error PRICE_Deprecated();
```

### PRICE_InvalidOHM

OHM address is invalid

```solidity
error PRICE_InvalidOHM();
```
