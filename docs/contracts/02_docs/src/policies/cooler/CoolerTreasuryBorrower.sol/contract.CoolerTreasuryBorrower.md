# CoolerTreasuryBorrower

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/cooler/CoolerTreasuryBorrower.sol)

**Inherits:** [ICoolerTreasuryBorrower](/main/contracts/docs/src/policies/interfaces/cooler/ICoolerTreasuryBorrower.sol/interface.ICoolerTreasuryBorrower), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

**Title:** Cooler Treasury Borrower - USDS borrows, sUSDS at rest

Policy which can borrow from Treasury on behalf of Cooler

- Cooler will always represent the debt amount in 18 decimal places.
- This logic is split out into a separate policy (rather than using `TreasuryCustodian`):
  1/ So the Cooler debt token can be updated if required in future to another stablecoin without a redeploy of Cooler.
  2/ In this case, debt is denominated in USDS but stored 'at rest' in Treasury into sUSDS for extra yield.
- Upon an upgrade, if the actual debt token is changed (with a new deployment of this contract) to a non 18dp asset
  eg USDC, then borrow() and repay() will need to do the conversion.
- This implementation borrows USDS from Treasury but deposits into sUSDS to benefit from savings yield.

## Constants

### DECIMALS

The decimal precision of the `amountInWad` used in borrow and repay functions.

<i>

A constant of 18

</i>

```solidity
uint8 public constant override DECIMALS = 18;
```

**Returns**

| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| &lt;none&gt; | `uint8` |             |

### SUSDS

sUSDS is used within TRSRY to generate yield on idle USDS

```solidity
ERC4626 public immutable SUSDS;
```

### _USDS

<i>

The SKY USDS token

</i>

```solidity
ERC20 private immutable _USDS;
```

### COOLER_ROLE

```solidity
bytes32 public constant COOLER_ROLE = bytes32("treasuryborrower_cooler");
```

## State Variables

### TRSRY

Olympus V3 Treasury Module

```solidity
TRSRYv1 public TRSRY;
```

## Functions

<a id="constructor-address-address"></a>

### constructor

```solidity
constructor(address kernel_, address susds_) Policy(Kernel(kernel_));
```

**Parameters**

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| kernel_ | `address` |             |
| susds_  | `address` |             |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

<a id="requestpermissions"></a>

### requestPermissions

Function called by kernel to set module function permissions.

```solidity
function requestPermissions() external view override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="borrow-uint256-address"></a>

### borrow

Cooler borrows `amount` of `debtToken` from treasury, sent to `recipient`

<i>

If the debtToken is 6dp (eg USDC) then this contract needs to handle the conversion internally

</i>

```solidity
function borrow(
        uint256 amountInWad,
        address recipient
    ) external override onlyEnabled onlyRole(COOLER_ROLE);
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
function repay() external override onlyEnabled onlyRole(COOLER_ROLE);
```

<a id="writeoffdebt-uint256"></a>

### writeOffDebt

Cooler may write off debt in the case of liquidations.

<i>

This reduces the policies debt to TRSRY

</i>

```solidity
function writeOffDebt(
        uint256 debtTokenAmount
    ) external override onlyEnabled onlyRole(COOLER_ROLE);
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
function setDebt(uint256 debtTokenAmount) external override onlyEnabled onlyAdminRole;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| debtTokenAmount | `uint256` | The amount of debt to set in Treasury, in the debtToken.decimals() precision |

<a id="debttoken"></a>

### debtToken

The token (USD based stablecoin) which Cooler users borrow and repay

```solidity
function debtToken() external view override returns (IERC20);
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
    ) external view override returns (IERC20 dToken, uint256 dTokenAmount);
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

<a id="_reducedebttotreasury-uint256"></a>

### _reduceDebtToTreasury

<i>

Decrease the debt to TRSRY, floored at zero

</i>

```solidity
function _reduceDebtToTreasury(uint256 debtTokenAmount) private;
```

**Parameters**

| Name            | Type      | Description |
| --------------- | --------- | ----------- |
| debtTokenAmount | `uint256` |             |
