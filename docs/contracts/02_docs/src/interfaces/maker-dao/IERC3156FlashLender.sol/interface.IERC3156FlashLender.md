# IERC3156FlashLender

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/interfaces/maker-dao/IERC3156FlashLender.sol)

## Functions

<a id="maxflashloan-address"></a>

### maxFlashLoan

<i>

The amount of currency available to be lent.

</i>

```solidity
function maxFlashLoan(address token) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The loan currency. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of `token` that can be borrowed. |

<a id="flashfee-address-uint256"></a>

### flashFee

<i>

The fee to be charged for a given loan.

</i>

```solidity
function flashFee(address token, uint256 amount) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | `address` | The loan currency. |
| amount | `uint256` | The amount of tokens lent. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | The amount of `token` to be charged for the loan, on top of the returned principal. |

<a id="flashloan-ierc3156flashborrower-address-uint256-bytes"></a>

### flashLoan

<i>

Initiate a flash loan.

</i>

```solidity
function flashLoan(
        IERC3156FlashBorrower receiver,
        address token,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver | `IERC3156FlashBorrower` | The receiver of the tokens in the loan, and the receiver of the callback. |
| token | `address` | The loan currency. |
| amount | `uint256` | The amount of tokens lent. |
| data | `bytes` | Arbitrary data structure, intended to contain user-defined parameters. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
