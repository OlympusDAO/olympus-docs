# CoolerTreasuryBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/policies/cooler/CoolerTreasuryBorrower.sol)

**Inherits:**
[ICoolerTreasuryBorrower](/main/contracts/docs/src/policies/interfaces/cooler/ICoolerTreasuryBorrower.sol/interface.ICoolerTreasuryBorrower), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

Policy which can borrow from Treasury on behalf of Cooler

- Cooler will always represent the debt amount in 18 decimal places.
- This logic is split out into a separate policy (rather than using `TreasuryCustodian`):
1/ So the Cooler debt token can be updated if required in future to another stablecoin without a redeploy of Cooler.
2/ In this case, debt is denominated in USDS but stored 'at rest' in Treasury into sUSDS for extra yield.
- Upon an upgrade, if the actual debt token is changed (with a new deployment of this contract) to a non 18dp asset
eg USDC, then borrow() and repay() will need to do the conversion.
- This implementation borrows USDS from Treasury but deposits into sUSDS to benefit from savings yield.

## State Variables

### DECIMALS

The decimal precision of the `amountInWad` used in borrow and repay functions.

*A constant of 18*

```solidity
uint8 public constant override DECIMALS = 18;
```

### TRSRY

Olympus V3 Treasury Module

```solidity
TRSRYv1 public TRSRY;
```

### SUSDS

sUSDS is used within TRSRY to generate yield on idle USDS

```solidity
ERC4626 public immutable SUSDS;
```

### _USDS

*The SKY USDS token*

```solidity
ERC20 private immutable _USDS;
```

### COOLER_ROLE

```solidity
bytes32 public constant COOLER_ROLE = bytes32("treasuryborrower_cooler");
```

## Functions

### constructor

```solidity
constructor(address kernel_, address susds_) Policy(Kernel(kernel_));
```

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`dependencies`|`Keycode[]`|- Keycode array of module dependencies.|

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

### borrow

Cooler borrows `amount` of `debtToken` from treasury, sent to `recipient`

*If the debtToken is 6dp (eg USDC) then this contract needs to handle the conversion internally*

```solidity
function borrow(uint256 amountInWad, address recipient) external override onlyEnabled onlyRole(COOLER_ROLE);
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
function repay() external override onlyEnabled onlyRole(COOLER_ROLE);
```

### writeOffDebt

Cooler may write off debt in the case of liquidations.

*This reduces the policies debt to TRSRY*

```solidity
function writeOffDebt(uint256 debtTokenAmount) external override onlyEnabled onlyRole(COOLER_ROLE);
```

### setDebt

In the case of a Cooler debt token change (eg USDS => USDC), the
debt may be manually net settled from the old debt token (in the old cooler treasury borrower)
to the new debt token (in the new cooler treasury borrower)

```solidity
function setDebt(uint256 debtTokenAmount) external override onlyEnabled onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`debtTokenAmount`|`uint256`|The amount of debt to set in Treasury, in the debtToken.decimals() precision|

### debtToken

The token (USD based stablecoin) which Cooler users borrow and repay

```solidity
function debtToken() external view override returns (IERC20);
```

### convertToDebtTokenAmount

Convert a debt amount in wad (18dp) into the decimals of the `debtToken`

```solidity
function convertToDebtTokenAmount(uint256 amountInWad)
    external
    view
    override
    returns (IERC20 dToken, uint256 dTokenAmount);
```

### _reduceDebtToTreasury

*Decrease the debt to TRSRY, floored at zero*

```solidity
function _reduceDebtToTreasury(uint256 debtTokenAmount) private;
```
