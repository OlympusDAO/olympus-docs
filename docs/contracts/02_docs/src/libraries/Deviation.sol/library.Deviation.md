# Deviation

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Deviation.sol)

## Functions

<a id="isdeviatingwithbpscheck-uint256-uint256-uint256-uint256"></a>

### isDeviatingWithBpsCheck

Checks if the deviation between two values is greater than the given deviation

<i>

This function will revert if:

- `deviationBps_` is greater than `deviationMax_`

</i>

```solidity
function isDeviatingWithBpsCheck(
        uint256 value_,
        uint256 benchmark_,
        uint256 deviationBps_,
        uint256 deviationMax_
    ) internal pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint256` | The value to be checked for deviation |
| benchmark_ | `uint256` | The reference value to check against |
| deviationBps_ | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%) |
| deviationMax_ | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the deviation is greater than the given deviation, false otherwise |

<a id="isdeviating-uint256-uint256-uint256-uint256"></a>

### isDeviating

Checks if the deviation between two values is greater than the given deviation

```solidity
function isDeviating(
        uint256 value_,
        uint256 benchmark_,
        uint256 deviationBps_,
        uint256 deviationMax_
    ) internal pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| value_ | `uint256` | The value to be checked for deviation |
| benchmark_ | `uint256` | The reference value to check against |
| deviationBps_ | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%) |
| deviationMax_ | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the deviation is greater than the given deviation, false otherwise |

<a id="_isdeviating-uint256-uint256-uint256-uint256"></a>

### _isDeviating

Checks if the deviation between two values is greater than the given deviation

<i>

This function will revert if:

- `benchmark_` is zero

</i>

```solidity
function _isDeviating(
        uint256 diff_,
        uint256 benchmark_,
        uint256 deviationBps_,
        uint256 deviationMax_
    ) internal pure returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| diff_ | `uint256` | The difference between the two values |
| benchmark_ | `uint256` | The reference value to check against |
| deviationBps_ | `uint256` | The deviation in basis points (e.g. 100 = 1%) |
| deviationMax_ | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool            True if the deviation is greater than the given deviation, false otherwise |

## Errors

### Deviation_InvalidDeviationBps

The provided deviation is greater than the maximum deviation

```solidity
error Deviation_InvalidDeviationBps(uint256 deviationBps_, uint256 deviationMax_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| deviationBps_ | `uint256` | The accepted deviation in basis points (e.g. 100 = 1%) |
| deviationMax_ | `uint256` | The maximum deviation in basis points (e.g. 10000 = 100%) |
