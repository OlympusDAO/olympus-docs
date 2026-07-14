# OlympusPricev1_2

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a7402cac180f9250225e154e4b4ca9b7a23e06f4/src/modules/PRICE/OlympusPrice.v1_2.sol)

**Inherits:**
[OlympusPricev2](/main/contracts/docs/src/modules/PRICE/OlympusPrice.v2.sol/contract.OlympusPricev2), [IPRICEv1](/main/contracts/docs/src/modules/PRICE/IPRICE.v1.sol/interface.IPRICEv1)

forge-lint: disable-start(mixed-case-function)

Backward compatibility layer for PRICEv1

Provides PRICEv1-compatible functions while using PRICEv2 implementation underneath

All PRICEv1 functions map to a default asset (OHM)

## State Variables

### \_DECIMALS

Number of decimals in the price values provided by the contract.

This is 18 for backwards-compatibility with PRICEv1.

```solidity
uint8 internal constant _DECIMALS = 18
```

### \_OHM

The address of the OHM token

```solidity
address internal immutable _OHM
```

### minimumTargetPrice

OHM-specific minimum target price (PRICEv1 style), scaled to 18 decimals.

Value is represented as `targetPrice * 10**18`, matching PRICEv1-compatible output units.

```solidity
uint256 public minimumTargetPrice
```

## Functions

### constructor

Constructor for PRICEv1_2 compatibility layer

The constructor reverts if:

- `observationFrequency_` is invalid (from `OlympusPricev2`)

- `ohm_ == address(0)` (`PRICE_InvalidOHM`)

```solidity
constructor(Kernel kernel_, address ohm_, uint32 observationFrequency_, uint256 minimumTargetPrice_)
    OlympusPricev2(kernel_, _DECIMALS, observationFrequency_);
```

**Parameters**

| Name                    | Type      | Description                                                        |
| ----------------------- | --------- | ------------------------------------------------------------------ |
| `kernel_`               | `Kernel`  | Kernel address                                                     |
| `ohm_`                  | `address` | The address of the OHM token                                       |
| `observationFrequency_` | `uint32`  | Frequency at which prices are stored for moving average            |
| `minimumTargetPrice_`   | `uint256` | Initial minimum target OHM price in 18 decimals (`price * 10**18`) |

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure virtual override returns (uint8 major_, uint8 minor_);
```

**Returns**

| Name     | Type    | Description                                                               |
| -------- | ------- | ------------------------------------------------------------------------- |
| `major_` | `uint8` | major - Major version upgrade indicates breaking change to the interface. |
| `minor_` | `uint8` | minor - Minor version change retains backward-compatible interface.       |

### \_getOhmPrice

Returns an OHM price variant from PRICEv2

```solidity
function _getOhmPrice(IPRICEv2.Variant variant_) internal view returns (uint256 price_);
```

**Parameters**

| Name       | Type               | Description            |
| ---------- | ------------------ | ---------------------- |
| `variant_` | `IPRICEv2.Variant` | Price variant to fetch |

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `price_` | `uint256` | The requested OHM price |

### \_unitPrice

Returns the unit price scaled to PRICE decimals

PRICEv1 compatibility always uses 18 decimals, so the unit price is constant.

```solidity
function _unitPrice() internal pure override returns (uint256);
```

### getCurrentPrice

Get the current price of OHM in the Reserve asset from the price feeds

Returns the current price of OHM.

Compatibility function for PRICEv1.

Reverts if:

- OHM is not approved in PRICE

- A current OHM price cannot be determined

```solidity
function getCurrentPrice() external view returns (uint256);
```

### getLastPrice

Get the last stored price observation of OHM in the Reserve asset

Returns the last price of OHM.

Compatibility function for PRICEv1.

Reverts if:

- OHM is not approved in PRICE

- OHM does not store moving-average observations

```solidity
function getLastPrice() external view returns (uint256);
```

### getMovingAverage

Get the stored moving average of OHM in the Reserve asset over the defined window (see movingAverageDuration and observationFrequency).

Returns the moving average of OHM.

Compatibility function for PRICEv1.

Returns the raw stored moving average, which may be stale.

Reverts if:

- OHM is not approved in PRICE

- OHM does not store moving-average observations

```solidity
function getMovingAverage() external view returns (uint256);
```

### getTargetPrice

Get target price of OHM in the Reserve asset for the RBS system

Returns the target price of OHM.

Compatibility function for PRICEv1.

Reverts if:

- OHM is not approved in PRICE

- OHM does not store moving-average observations

- OHM moving average is stale relative to `observationFrequency()`

```solidity
function getTargetPrice() external view returns (uint256);
```

### lastObservationTime

Unix timestamp of last observation (in seconds).

Returns the last observation time for OHM.

Compatibility function for PRICEv1.

Reverts if:

- OHM is not approved in PRICE

- OHM does not store moving-average observations

```solidity
function lastObservationTime() external view override returns (uint48);
```

### OHM

Returns the OHM token address used by PRICEv1-compatible functions.

```solidity
function OHM() external view returns (address);
```

### updateMovingAverage

Trigger an update of the moving average. Permissioned.

Updates the moving average for all assets.

Provided as a compatibility function for PRICEv1.

Reverts if:

- The caller is not permissioned by the Kernel

- Any configured moving-average asset fails observation storage

Reentrancy note: delegates to `storeObservations()`, whose feed/strategy lookups

are resolved via `staticcall`.

```solidity
function updateMovingAverage() external permissioned;
```

### initialize

Initialize the price module

Deprecated.

Reverts with `PRICE_Deprecated`.

```solidity
function initialize(uint256[] memory, uint48) external pure;
```

### changeMinimumTargetPrice

Change the minimum target price

Changes the minimum target price for OHM.

Provided as a compatibility function for PRICEv1.

Reverts if the caller is not permissioned by the Kernel.

Reentrancy note: this function does not make external calls.

```solidity
function changeMinimumTargetPrice(uint256 minimumTargetPrice_) external permissioned;
```

**Parameters**

| Name                  | Type      | Description                                                    |
| --------------------- | --------- | -------------------------------------------------------------- |
| `minimumTargetPrice_` | `uint256` | New minimum target OHM price in 18 decimals (`price * 10**18`) |

### changeUpdateThresholds

Change the update thresholds for the price feeds

Deprecated.

Reverts with `PRICE_Deprecated`.

```solidity
function changeUpdateThresholds(uint48, uint48) external pure;
```

### changeMovingAverageDuration

Change the moving average window (duration)

Deprecated.

Reverts with `PRICE_Deprecated`.

```solidity
function changeMovingAverageDuration(uint48) external pure;
```

### changeObservationFrequency

Change the observation frequency of the moving average (i.e. how often a new observation is taken)

Deprecated.

Reverts with `PRICE_Deprecated`.

```solidity
function changeObservationFrequency(uint48) external pure;
```

### decimals

The number of decimals to used in output values

Does not revert.

```solidity
function decimals() external pure virtual override(IPRICEv1, PRICEv2) returns (uint8);
```

### observationFrequency

The frequency of price observations (in seconds)

Does not revert.

```solidity
function observationFrequency() external view virtual override(IPRICEv1, PRICEv2) returns (uint48);
```

### supportsInterface

Does not revert.

```solidity
function supportsInterface(bytes4 interfaceId_) public pure virtual override returns (bool);
```

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
