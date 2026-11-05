# ICoolerTreasuryBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/cooler/ICoolerTreasuryBorrower.sol)

**Title:** Cooler Treasury Borrower

Policy which can borrow from Treasury on behalf of Cooler

- Cooler will always represent the debt amount in 18 decimal places.
- This logic is split out into a separate policy (rather than using `TreasuryCustodian`):
  1/ So the Cooler debt token can be updated if required in future to another stablecoin without a redeploy of Cooler.
  2/ In this case, debt is denominated in USDS but stored 'at rest' in Treasury into sUSDS for extra yield.
- Upon an upgreade, if the actual debt token is changed (with a new deployment of this contract) to a non 18dp asset
  eg USDC, then borrow() and repay() will need to do the conversion.

## Functions

<a id="borrow-uint256-address"></a>

### borrow

Cooler borrows `amount` of `debtToken` from treasury, sent to `recipient`

<i>

If the debtToken is 6dp (eg USDC) then this contract needs to handle the conversion internally

</i>

```solidity
function borrow(uint256 amountInWad, address recipient) external;
```

**Parameters**

| Name        | Type      | Description                                                                                 |
| ----------- | --------- | ------------------------------------------------------------------------------------------- |
| amountInWad | `uint256` | The amount to borrow. Always 18 decimal places<br/>regardless of the `debtToken.decimals()` |
| recipient   | `address` |                                                                                             |

<a id="repay"></a>

### repay

Repay any `debtToken` in this contract back to treasury.

<i>

Cooler is expected to transfer the amount to this contract prior to calling

</i>

```solidity
function repay() external;
```

<a id="writeoffdebt-uint256"></a>

### writeOffDebt

Cooler may write off debt in the case of liquidations.

<i>

This reduces the policies debt to TRSRY

</i>

```solidity
function writeOffDebt(uint256 debtTokenAmount) external;
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| debtTokenAmount | `uint256` |             |

<a id="setdebt-uint256"></a>

### setDebt

In the case of a Cooler debt token change (eg USDS => USDC), the
debt may be manually net settled from the old debt token (in the old cooler treasury borrower)
to the new debt token (in the new cooler treasury borrower)

```solidity
function setDebt(uint256 debtTokenAmount) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtTokenAmount | `uint256` | The amount of debt to set in Treasury, in the debtToken.decimals() precision |

<a id="debttoken"></a>

### debtToken

The token (USD based stablecoin) which Cooler users borrow and repay

```solidity
function debtToken() external view returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="converttodebttokenamount-uint256"></a>

### convertToDebtTokenAmount

Convert a debt amount in wad (18dp) into the decimals of the `debtToken`

```solidity
function convertToDebtTokenAmount(
        uint256 amountInWad
    ) external view returns (IERC20 dToken, uint256 dTokenAmount);
```

**Parameters**

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| amountInWad | `uint256` |             |

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| dToken       | `IERC20`  |             |
| dTokenAmount | `uint256` |             |

<a id="decimals"></a>

### DECIMALS

The decimal precision of the `amountInWad` used in borrow and repay functions.

<i>

A constant of 18

</i>

```solidity
function DECIMALS() external view returns (uint8);
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

## Errors

### OnlyCooler

```solidity
error OnlyCooler();
```

### InvalidParam

```solidity
error InvalidParam();
```

### InvalidAddress

```solidity
error InvalidAddress();
```

### ExpectedNonZero

```solidity
error ExpectedNonZero();
```
