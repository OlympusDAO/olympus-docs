# ICoolerTreasuryBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/interfaces/cooler/ICoolerTreasuryBorrower.sol)

Policy which can borrow from Treasury on behalf of Cooler

- Cooler will always represent the debt amount in 18 decimal places.
- This logic is split out into a separate policy (rather than using `TreasuryCustodian`):
1/ So the Cooler debt token can be updated if required in future to another stablecoin without a redeploy of Cooler.
2/ In this case, debt is denominated in USDS but stored 'at rest' in Treasury into sUSDS for extra yield.
- Upon an upgreade, if the actual debt token is changed (with a new deployment of this contract) to a non 18dp asset
eg USDC, then borrow() and repay() will need to do the conversion.

## Functions

### borrow

Cooler borrows `amount` of `debtToken` from treasury, sent to `recipient`

*If the debtToken is 6dp (eg USDC) then this contract needs to handle the conversion internally*

```solidity
function borrow(uint256 amountInWad, address recipient) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amountInWad`|`uint256`|The amount to borrow. Always 18 decimal places regardless of the `debtToken.decimals()`|
|`recipient`|`address`||

### repay

Repay any `debtToken` in this contract back to treasury.

*Cooler is expected to transfer the amount to this contract prior to calling*

```solidity
function repay() external;
```

### writeOffDebt

Cooler may write off debt in the case of liquidations.

*This reduces the policies debt to TRSRY*

```solidity
function writeOffDebt(uint256 debtTokenAmount) external;
```

### setDebt

In the case of a Cooler debt token change (eg USDS => USDC), the
debt may be manually net settled from the old debt token (in the old cooler treasury borrower)
to the new debt token (in the new cooler treasury borrower)

```solidity
function setDebt(uint256 debtTokenAmount) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`debtTokenAmount`|`uint256`|The amount of debt to set in Treasury, in the debtToken.decimals() precision|

### debtToken

The token (USD based stablecoin) which Cooler users borrow and repay

```solidity
function debtToken() external view returns (IERC20);
```

### convertToDebtTokenAmount

Convert a debt amount in wad (18dp) into the decimals of the `debtToken`

```solidity
function convertToDebtTokenAmount(uint256 amountInWad) external view returns (IERC20 dToken, uint256 dTokenAmount);
```

### DECIMALS

The decimal precision of the `amountInWad` used in borrow and repay functions.

*A constant of 18*

```solidity
function DECIMALS() external view returns (uint8);
```

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
