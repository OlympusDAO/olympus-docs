# LoanConsolidator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/LoanConsolidator.sol)

**Inherits:** [IERC3156FlashBorrower](/main/contracts/docs/src/interfaces/maker-dao/IERC3156FlashBorrower.sol/interface.IERC3156FlashBorrower), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ReentrancyGuard

**Title:** Loan Consolidator

A policy that consolidates loans taken with a single Cooler contract into a single loan using Maker flashloans.
This policy can be used to consolidate loans within the same Clearinghouse, or from one Clearinghouse to another.
This also enables migration between debt denominated in different assets (such as DAI and USDS).

<i>

This policy uses the `IERC3156FlashBorrower` interface to interact with Maker flashloans.

</i>

This contract utilises the following roles:

- `loan_consolidator_admin`: Can set the fee percentage
- `emergency_shutdown`: Can activate and deactivate the contract

## Constants

### ONE_HUNDRED_PERCENT

The denominator for percentage calculations

```solidity
uint256 public constant ONE_HUNDRED_PERCENT = 100e2;
```

### ROLE_ADMIN

The role required to call admin functions

```solidity
bytes32 public constant ROLE_ADMIN = "loan_consolidator_admin";
```

### ROLE_EMERGENCY_SHUTDOWN

The role required to call emergency shutdown functions

```solidity
bytes32 public constant ROLE_EMERGENCY_SHUTDOWN = "emergency_shutdown";
```

## State Variables

### CHREG

The Clearinghouse registry module

<i>

The value is set when the policy is activated

</i>

```solidity
CHREGv1 internal CHREG;
```

### TRSRY

The treasury module

<i>

The value is set when the policy is activated

</i>

```solidity
TRSRYv1 internal TRSRY;
```

### RGSTY

The contract registry module

<i>

The value is set when the policy is activated

</i>

```solidity
RGSTYv1 internal RGSTY;
```

### DAI

The DAI token

<i>

The value is set when the policy is activated

</i>

```solidity
IERC20 internal DAI;
```

### USDS

The USDS token

<i>

The value is set when the policy is activated

</i>

```solidity
IERC20 internal USDS;
```

### GOHM

The gOHM token

<i>

The value is set when the policy is activated

</i>

```solidity
IERC20 internal GOHM;
```

### MIGRATOR

The DAI &lt;> USDS Migrator

<i>

The value is set when the policy is activated

</i>

```solidity
IDaiUsdsMigrator internal MIGRATOR;
```

### FLASH

The ERC3156 flash loan provider

<i>

The value is set when the policy is activated

</i>

```solidity
IERC3156FlashLender internal FLASH;
```

### feePercentage

Percentage of the debt to be paid as a fee

<i>

In terms of `ONE_HUNDRED_PERCENT`

</i>

```solidity
uint256 public feePercentage;
```

### consolidatorActive

Whether the contract is active

<i>

Note that this is different to the policy activation status

</i>

```solidity
bool public consolidatorActive;
```

## Functions

<a id="constructor-address-uint256"></a>

### constructor

Constructor for the Loan Consolidator

<i>

This function will revert if:

- The fee percentage is above `ONE_HUNDRED_PERCENT`
- The kernel address is zero

</i>

```solidity
constructor(address kernel_, uint256 feePercentage_) Policy(Kernel(kernel_));
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` |  |
| feePercentage_ | `uint256` |  |

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

<i>

This policy does not require any permissions

</i>

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| requests | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="consolidate-address-address-address-address-uint256"></a>

### consolidate

Consolidate loans (taken with a single Cooler contract) into a single loan by using flashloans.

Unlike `consolidateWithNewOwner()`, the owner of the new Cooler must be the same as the Cooler being repaid.

The caller will be required to provide additional funds to cover accrued interest on the Cooler loans and the lender and protocol fees (if applicable). Use the `requiredApprovals()` function to determine the amount of funds and approvals required.

It is expected that the caller will have already provided approval for this contract to spend the required tokens. See `requiredApprovals()` for more details.

<i>

This function will revert if:

- The caller is not the 'coolerFrom' and 'coolerTo' owner.
- The caller has not approved this contract to spend the reserve token of `clearinghouseTo_` in order to pay the interest, lender and protocol fees.
- The caller has not approved this contract to spend the gOHM escrowed by `coolerFrom_`.
- `clearinghouseFrom_` or `clearinghouseTo_` is not registered with the Clearinghouse registry.
- `coolerFrom_` or `coolerTo_` is not a valid Cooler for the respective Clearinghouse.
- Consolidation is taking place within the same Cooler, and less than two loans are being consolidated.
- The available funds are less than the required flashloan amount.
- The contract is not active.
- The contract has not been activated as a policy.
- Re-entrancy is detected.

</i>

```solidity
function consolidate(
        address clearinghouseFrom_,
        address clearinghouseTo_,
        address coolerFrom_,
        address coolerTo_,
        uint256[] calldata ids_
    ) public onlyPolicyActive onlyConsolidatorActive nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom_ | `address` | Olympus Clearinghouse that issued the existing loans. |
| clearinghouseTo_ | `address` | Olympus Clearinghouse to be used to issue the consolidated loan. |
| coolerFrom_ | `address` | Cooler from which the loans will be consolidated. |
| coolerTo_ | `address` | Cooler to which the loans will be consolidated |
| ids_ | `uint256[]` | Array containing the ids of the loans to be consolidated. |

<a id="consolidatewithnewowner-address-address-address-address-uint256"></a>

### consolidateWithNewOwner

Consolidate loans (taken with a single Cooler contract) into a single loan by using flashloans.

Unlike `consolidate()`, the owner of the new Cooler can be different from the Cooler being repaid.

The caller will be required to provide additional funds to cover accrued interest on the Cooler loans and the lender and protocol fees (if applicable). Use the `requiredApprovals()` function to determine the amount of funds and approvals required.

It is expected that the caller will have already provided approval for this contract to spend the required tokens. See `requiredApprovals()` for more details.

<i>

This function will revert if:

- The caller is not the `coolerFrom_` owner.
- `coolerFrom_` is the same as `coolerTo_` (in which case `consolidate()` should be used).
- The owner of `coolerFrom_` is the same as `coolerTo_` (in which case `consolidate()` should be used).
- The caller has not approved this contract to spend the reserve token of `clearinghouseTo_` in order to pay the interest, lender and protocol fees.
- The caller has not approved this contract to spend the gOHM escrowed by the target Cooler.
- `clearinghouseFrom_` or `clearinghouseTo_` is not registered with the Clearinghouse registry.
- `coolerFrom_` or `coolerTo_` is not a valid Cooler for the respective Clearinghouse.
- Consolidation is taking place within the same Cooler, and less than two loans are being consolidated.
- The available funds are less than the required flashloan amount.
- The contract is not active.
- The contract has not been activated as a policy.
- Re-entrancy is detected.

</i>

```solidity
function consolidateWithNewOwner(
        address clearinghouseFrom_,
        address clearinghouseTo_,
        address coolerFrom_,
        address coolerTo_,
        uint256[] calldata ids_
    ) public onlyPolicyActive onlyConsolidatorActive nonReentrant;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom_ | `address` | Olympus Clearinghouse that issued the existing loans. |
| clearinghouseTo_ | `address` | Olympus Clearinghouse to be used to issue the consolidated loan. |
| coolerFrom_ | `address` | Cooler from which the loans will be consolidated. |
| coolerTo_ | `address` | Cooler to which the loans will be consolidated |
| ids_ | `uint256[]` | Array containing the ids of the loans to be consolidated. |

<a id="_consolidatewithflashloan-address-address-address-address-uint256"></a>

### _consolidateWithFlashLoan

Internal logic for loan consolidation

<i>

Utilized by `consolidate()` and `consolidateWithNewOwner()`

</i>

This function assumes:

- The calling external-facing function has checked that the caller is permitted to operate on `coolerFrom_`.

```solidity
function _consolidateWithFlashLoan(
        address clearinghouseFrom_,
        address clearinghouseTo_,
        address coolerFrom_,
        address coolerTo_,
        uint256[] calldata ids_
    ) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom_ | `address` | Olympus Clearinghouse that issued the existing loans. |
| clearinghouseTo_ | `address` | Olympus Clearinghouse to be used to issue the consolidated loan. |
| coolerFrom_ | `address` | Cooler from which the loans will be consolidated. |
| coolerTo_ | `address` | Cooler to which the loans will be consolidated |
| ids_ | `uint256[]` | Array containing the ids of the loans to be consolidated. |

<a id="onflashloan-address-address-uint256-uint256-bytes"></a>

### onFlashLoan

<i>

This function reverts if:

- The caller is not the flash loan provider
- The initiator is not this contract

</i>

```solidity
function onFlashLoan(
        address initiator_,
        address, // flashloan token is only DAI
        uint256 amount_,
        uint256 lenderFee_,
        bytes calldata params_
    ) external override returns (bytes32);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| initiator_ | `address` | The initiator of the loan. |
| _ | `address` | The loan currency. |
| amount_ | `uint256` | The amount of tokens lent. |
| lenderFee_ | `uint256` | The additional amount of tokens to repay. |
| params_ | `bytes` | Arbitrary data structure, intended to contain user-defined parameters. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32` | The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan" |

<a id="setfeepercentage-uint256"></a>

### setFeePercentage

Set the fee percentage

<i>

This function will revert if:

- The contract has not been activated as a policy.
- The fee percentage is above `ONE_HUNDRED_PERCENT`
- The caller does not have the `ROLE_ADMIN` role

</i>

```solidity
function setFeePercentage(
        uint256 feePercentage_
    ) external onlyPolicyActive onlyRole(ROLE_ADMIN);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| feePercentage_ | `uint256` |  |

<a id="activate"></a>

### activate

Activate the contract

<i>

This function will revert if:

- The contract has not been activated as a policy.
- The caller does not have the `ROLE_EMERGENCY_SHUTDOWN` role

</i>

If the contract is already active, it will do nothing.

```solidity
function activate() external onlyPolicyActive onlyRole(ROLE_EMERGENCY_SHUTDOWN);
```

<a id="deactivate"></a>

### deactivate

Deactivate the contract

<i>

This function will revert if:

- The contract has not been activated as a policy.
- The caller does not have the `ROLE_EMERGENCY_SHUTDOWN` role

</i>

If the contract is already deactivated, it will do nothing.

```solidity
function deactivate() external onlyPolicyActive onlyRole(ROLE_EMERGENCY_SHUTDOWN);
```

<a id="onlyconsolidatoractive"></a>

### onlyConsolidatorActive

Modifier to check that the contract is active

```solidity
modifier onlyConsolidatorActive();
```

<a id="onlypolicyactive"></a>

### onlyPolicyActive

Modifier to check that the contract is activated as a policy

```solidity
modifier onlyPolicyActive();
```

<a id="_getdebtforloans-address-uint256"></a>

### _getDebtForLoans

Get the total principal and interest for a given set of loans

```solidity
function _getDebtForLoans(
        address cooler_,
        uint256[] calldata ids_
    ) internal view returns (uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cooler_ | `address` | Cooler contract that issued the loans |
| ids_ | `uint256[]` | Array of loan ids to be consolidated |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | totalPrincipal_ Total principal |
| &lt;none&gt; | `uint256` | totalInterest_  Total interest |

<a id="_repaydebtforloans-address-uint256"></a>

### _repayDebtForLoans

Repay the debt for a given set of loans and collect the collateral.

<i>

This function assumes:

- The cooler owner has granted approval for this contract to spend the gOHM collateral

</i>

```solidity
function _repayDebtForLoans(address cooler_, uint256[] memory ids_) internal;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cooler_ | `address` | Cooler contract that issued the loans |
| ids_ | `uint256[]` | Array of loan ids to be repaid |

<a id="_isvalidclearinghouse-address"></a>

### _isValidClearinghouse

```solidity
function _isValidClearinghouse(address clearinghouse_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_isvalidcooler-address-address"></a>

### _isValidCooler

Check if a given cooler was created by the CoolerFactory for a Clearinghouse

<i>

This function assumes that the authenticity of the Clearinghouse is already verified

</i>

```solidity
function _isValidCooler(address clearinghouse_, address cooler_) internal view returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | Clearinghouse contract |
| cooler_ | `address` | Cooler contract |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` | bool          Whether the cooler was created by the CoolerFactory for the Clearinghouse |

<a id="_getclearinghousereservetoken-address"></a>

### _getClearinghouseReserveToken

Get the reserve token for a given Clearinghouse

<i>

This function will revert if the reserve token cannot be determined

</i>

```solidity
function _getClearinghouseReserveToken(address clearinghouse_) internal view returns (address);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | Clearinghouse contract |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | address         Reserve token |

<a id="_getmigrationtype-address-address"></a>

### _getMigrationType

Get the migration type for a given pair of Clearinghouses

<i>

This function will revert if the migration type cannot be determined

</i>

```solidity
function _getMigrationType(
        address clearinghouseFrom_,
        address clearinghouseTo_
    ) internal view returns (MigrationType migrationType, IERC20 reserveFrom, IERC20 reserveTo);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom_ | `address` | Clearinghouse that issued the existing loans |
| clearinghouseTo_ | `address` | Clearinghouse to be used to issue the consolidated loan |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| migrationType | `MigrationType` |       Migration type |
| reserveFrom | `IERC20` |         Reserve token for the existing loans |
| reserveTo | `IERC20` |           Reserve token for the consolidated loan |

<a id="_getflashloanparameters-clearinghouse-clearinghouse-cooler-cooler-uint256-migrationtype-ierc20-ierc20"></a>

### _getFlashloanParameters

Assembles the parameters for a flashloan

```solidity
function _getFlashloanParameters(
        Clearinghouse clearinghouseFrom_,
        Clearinghouse clearinghouseTo_,
        Cooler coolerFrom_,
        Cooler coolerTo_,
        uint256[] calldata ids_,
        MigrationType migrationType_,
        IERC20 reserveFrom_,
        IERC20 reserveTo_
    ) internal view returns (uint256 flashloanAmount, FlashLoanData memory flashloanParams);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom_ | `Clearinghouse` | Clearinghouse that issued the existing loans |
| clearinghouseTo_ | `Clearinghouse` | Clearinghouse to be used to issue the consolidated loan |
| coolerFrom_ | `Cooler` | Cooler contract that issued the existing loans |
| coolerTo_ | `Cooler` | Cooler contract to be used to issue the consolidated loan |
| ids_ | `uint256[]` | Array of loan ids to be consolidated |
| migrationType_ | `MigrationType` | Migration type |
| reserveFrom_ | `IERC20` | Reserve token for the existing loans |
| reserveTo_ | `IERC20` | Reserve token for the consolidated loan |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| flashloanAmount | `uint256` |     Amount of the flashloan |
| flashloanParams | `FlashLoanData` |     Flashloan parameters |

<a id="getprotocolfee-uint256"></a>

### getProtocolFee

View function to compute the protocol fee for a given total debt.

```solidity
function getProtocolFee(uint256 totalDebt_) public view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalDebt_ | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="requiredapprovals-address-address-uint256"></a>

### requiredApprovals

View function to compute the required approval amounts that the owner of a given Cooler
must give to this contract in order to consolidate the loans.

<i>

This function will revert if:

- The contract has not been activated as a policy.

</i>

```solidity
function requiredApprovals(
        address clearinghouseTo_,
        address coolerFrom_,
        uint256[] calldata ids_
    ) external view onlyPolicyActive returns (address, uint256, address, uint256, uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseTo_ | `address` | Clearinghouse contract used to issue the consolidated loan. |
| coolerFrom_ | `address` | Cooler contract that issued the loans. |
| ids_ | `uint256[]` | Array of loan ids to be consolidated. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` | owner               Owner of the Cooler (address that should grant the approval). |
| &lt;none&gt; | `uint256` | gOhmAmount          Amount of gOHM to be approved by the Cooler owner. |
| &lt;none&gt; | `address` | reserveTo           Token that the approval is in terms of |
| &lt;none&gt; | `uint256` | ownerReserveTo      Amount of `reserveTo` to be approved by the Cooler owner. This will be the principal of the consolidated loan. |
| &lt;none&gt; | `uint256` | callerReserveTo     Amount of `reserveTo` that the caller will need to provide. |

<a id="collateralrequired-address-address-uint256"></a>

### collateralRequired

Calculates the collateral required to consolidate a set of loans.

<i>

Due to rounding, the collateral required for the consolidated loan may be greater than the collateral of the loans being consolidated.
This function calculates the additional collateral required.

</i>

```solidity
function collateralRequired(
        address clearinghouse_,
        address cooler_,
        uint256[] memory ids_
    )
        public
        view
        returns (
            uint256 consolidatedLoanCollateral,
            uint256 existingLoanCollateral,
            uint256 additionalCollateral
        );
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouse_ | `address` | Clearinghouse contract used to issue the consolidated loan. |
| cooler_ | `address` | Cooler contract that issued the loans. |
| ids_ | `uint256[]` | Array of loan ids to be consolidated. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| consolidatedLoanCollateral | `uint256` |  Collateral required for the consolidated loan. |
| existingLoanCollateral | `uint256` |      Collateral of the existing loans. |
| additionalCollateral | `uint256` |        Additional collateral required to consolidate the loans. This will need to be supplied by the Cooler owner. |

<a id="fundsrequired-address-address-uint256"></a>

### fundsRequired

View function to compute the funds required to consolidate a set of loans.
The sum of the values must be held in the caller's wallet, in terms of the reserve token.

```solidity
function fundsRequired(
        address clearinghouseTo_,
        address coolerFrom_,
        uint256[] calldata ids_
    )
        public
        view
        onlyPolicyActive
        returns (address reserveTo, uint256 interest, uint256 lenderFee, uint256 protocolFee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseTo_ | `address` | Clearinghouse contract to be used to issue the consolidated loan. |
| coolerFrom_ | `address` | Cooler contract that issued the loans. |
| ids_ | `uint256[]` | Array of loan ids to be consolidated. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reserveTo | `address` |           Token the fund amounts are in terms of |
| interest | `uint256` |            Total interest |
| lenderFee | `uint256` |           Lender fee |
| protocolFee | `uint256` |         Protocol fee |

<a id="version"></a>

### VERSION

Version of the contract

```solidity
function VERSION() external pure returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | Version number |

## Events

### ConsolidatorActivated

Emitted when the contract is activated

<i>

Note that this is different to activation of the contract as a policy

</i>

```solidity
event ConsolidatorActivated();
```

### ConsolidatorDeactivated

Emitted when the contract is deactivated

<i>

Note that this is different to deactivation of the contract as a policy

</i>

```solidity
event ConsolidatorDeactivated();
```

### FeePercentageSet

Emitted when the fee percentage is set

```solidity
event FeePercentageSet(uint256 feePercentage);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| feePercentage | `uint256` |  |

## Errors

### OnlyThis

Thrown when the caller is not the contract itself.

```solidity
error OnlyThis();
```

### OnlyLender

Thrown when the caller is not the flash lender.

```solidity
error OnlyLender();
```

### OnlyCoolerOwner

Thrown when the caller is not the Cooler owner.

```solidity
error OnlyCoolerOwner();
```

### OnlyConsolidatorActive

Thrown when the contract is not active.

```solidity
error OnlyConsolidatorActive();
```

### OnlyPolicyActive

Thrown when the contract is not activated as a policy.

```solidity
error OnlyPolicyActive();
```

### Params_FeePercentageOutOfRange

Thrown when the fee percentage is out of range.

<i>

Valid values are 0 &lt;= feePercentage &lt;= 100e2

</i>

```solidity
error Params_FeePercentageOutOfRange();
```

### Params_InvalidAddress

Thrown when the address is invalid.

```solidity
error Params_InvalidAddress();
```

### Params_InsufficientCoolerCount

Thrown when the caller attempts to consolidate too few cooler loans. The minimum is two.

```solidity
error Params_InsufficientCoolerCount();
```

### Params_InvalidClearinghouse

Thrown when the Clearinghouse is not registered with the Bophades kernel

```solidity
error Params_InvalidClearinghouse();
```

### Params_InvalidCooler

Thrown when the Cooler is not created by the CoolerFactory for the specified Clearinghouse

```solidity
error Params_InvalidCooler();
```

## Structs

### FlashLoanData

Data structure used for flashloan parameters

```solidity
struct FlashLoanData {
        Clearinghouse clearinghouseFrom;
        Clearinghouse clearinghouseTo;
        Cooler coolerFrom;
        Cooler coolerTo;
        uint256[] ids;
        uint256 principal;
        uint256 interest;
        uint256 protocolFee;
        MigrationType migrationType;
        IERC20 reserveFrom;
        IERC20 reserveTo;
    }
```

**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| clearinghouseFrom | `Clearinghouse` |  |
| clearinghouseTo | `Clearinghouse` |  |
| coolerFrom | `Cooler` |  |
| coolerTo | `Cooler` |  |
| ids | `uint256[]` |  |
| principal | `uint256` |  |
| interest | `uint256` |  |
| protocolFee | `uint256` |  |
| migrationType | `MigrationType` |  |
| reserveFrom | `IERC20` |  |
| reserveTo | `IERC20` |  |

## Enums

### MigrationType

```solidity
enum MigrationType {
        DAI_DAI,
        USDS_USDS,
        DAI_USDS,
        USDS_DAI
    }
```

**Variants**

| Name | Description |
| ---- | ----------- |
| DAI_DAI |  |
| USDS_USDS |  |
| DAI_USDS |  |
| USDS_DAI |  |
