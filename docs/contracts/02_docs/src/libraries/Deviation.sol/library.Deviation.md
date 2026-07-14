# Deviation

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/libraries/Deviation.sol)

## Functions

### isDeviatingWithBpsCheck

Checks if the deviation between two values is greater than the given deviation

This function will revert if:

- `deviationBps_` is greater than `deviationMax_`

```solidity
function isDeviatingWithBpsCheck(uint256 value_, uint256 benchmark_, uint256 deviationBps_, uint256 deviationMax_)
    internal
    pure
    returns (bool);
```

**Parameters**

| Name            | Type      | Description                                               |
| --------------- | --------- | --------------------------------------------------------- |
| `value_`        | `uint256` | The value to be checked for deviation                     |
| `benchmark_`    | `uint256` | The reference value to check against                      |
| `deviationBps_` | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%)    |
| `deviationMax_` | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| `<none>` | `bool` | bool True if the deviation is greater than the given deviation, false otherwise |

### isDeviating

Checks if the deviation between two values is greater than the given deviation

```solidity
function isDeviating(uint256 value_, uint256 benchmark_, uint256 deviationBps_, uint256 deviationMax_)
    internal
    pure
    returns (bool);
```

**Parameters**

| Name            | Type      | Description                                               |
| --------------- | --------- | --------------------------------------------------------- |
| `value_`        | `uint256` | The value to be checked for deviation                     |
| `benchmark_`    | `uint256` | The reference value to check against                      |
| `deviationBps_` | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%)    |
| `deviationMax_` | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| `<none>` | `bool` | bool True if the deviation is greater than the given deviation, false otherwise |

### \_isDeviating

Checks if the deviation between two values is greater than the given deviation

This function will revert if:

- `benchmark_` is zero

```solidity
function _isDeviating(uint256 diff_, uint256 benchmark_, uint256 deviationBps_, uint256 deviationMax_)
    internal
    pure
    returns (bool);
```

**Parameters**

| Name            | Type      | Description                                               |
| --------------- | --------- | --------------------------------------------------------- |
| `diff_`         | `uint256` | The difference between the two values                     |
| `benchmark_`    | `uint256` | The reference value to check against                      |
| `deviationBps_` | `uint256` | The deviation in basis points (e.g. 100 = 1%)             |
| `deviationMax_` | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name     | Type   | Description                                                                     |
| -------- | ------ | ------------------------------------------------------------------------------- |
| `<none>` | `bool` | bool True if the deviation is greater than the given deviation, false otherwise |

## Errors

### Deviation_InvalidDeviationBps

The provided deviation is greater than the maximum deviation

```solidity
error Deviation_InvalidDeviationBps(uint256 deviationBps_, uint256 deviationMax_);
```

**Parameters**

| Name            | Type      | Description                                               |
| --------------- | --------- | --------------------------------------------------------- |
| `deviationBps_` | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%)    |
| `deviationMax_` | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |
