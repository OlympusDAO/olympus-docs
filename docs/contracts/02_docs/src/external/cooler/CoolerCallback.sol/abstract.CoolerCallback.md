# CoolerCallback

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/cooler/CoolerCallback.sol)

Allows for debt issuers to execute logic when a loan is repaid, rolled, or defaulted.

<i>

The three callback functions must be implemented if `isCoolerCallback()` is set to true.

</i>

## Constants

### factory

```solidity
CoolerFactory public immutable factory;
```

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address coolerFactory_);
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| coolerFactory_ | `address` |             |

<a id="iscoolercallback"></a>

### isCoolerCallback

Informs to Cooler that this contract can handle its callbacks.

```solidity
function isCoolerCallback() external pure returns (bool);
```

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="onrepay-uint256-uint256-uint256"></a>

### onRepay

Callback function that handles repayments.

```solidity
function onRepay(uint256 loanID_, uint256 principlePaid_, uint256 interestPaid_) external;
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| loanID_        | `uint256` |             |
| principlePaid_ | `uint256` |             |
| interestPaid_  | `uint256` |             |

<a id="ondefault-uint256-uint256-uint256-uint256"></a>

### onDefault

Callback function that handles defaults.

```solidity
function onDefault(
        uint256 loanID_,
        uint256 principle,
        uint256 interest,
        uint256 collateral
    ) external;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| loanID_    | `uint256` |             |
| principle  | `uint256` |             |
| interest   | `uint256` |             |
| collateral | `uint256` |             |

<a id="_onrepay-uint256-uint256-uint256"></a>

### _onRepay

Callback function that handles repayments. Override for custom logic.

```solidity
function _onRepay(
        uint256 loanID_,
        uint256 principlePaid_,
        uint256 interestPaid_
    ) internal virtual;
```

**Parameters**

| Name           | Type      | Description |
| -------------- | --------- | ----------- |
| loanID_        | `uint256` |             |
| principlePaid_ | `uint256` |             |
| interestPaid_  | `uint256` |             |

<a id="_ondefault-uint256-uint256-uint256-uint256"></a>

### _onDefault

Callback function that handles defaults.

```solidity
function _onDefault(
        uint256 loanID_,
        uint256 principle_,
        uint256 interestDue_,
        uint256 collateral
    ) internal virtual;
```

**Parameters**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| loanID_      | `uint256` |             |
| principle_   | `uint256` |             |
| interestDue_ | `uint256` |             |
| collateral   | `uint256` |             |

## Errors

### OnlyFromFactory

```solidity
error OnlyFromFactory();
```
