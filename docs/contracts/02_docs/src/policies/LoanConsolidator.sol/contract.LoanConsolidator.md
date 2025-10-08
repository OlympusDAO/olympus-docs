# LoanConsolidator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/LoanConsolidator.sol)

**Inherits:**
[IERC3156FlashBorrower](/main/contracts/docs/src/interfaces/maker-dao/IERC3156FlashBorrower.sol/interface.IERC3156FlashBorrower), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer), ReentrancyGuard

A policy that consolidates loans taken with a single Cooler contract into a single loan using Maker flashloans.
This policy can be used to consolidate loans within the same Clearinghouse, or from one Clearinghouse to another.
This also enables migration between debt denominated in different assets (such as DAI and USDS).

*This policy uses the `IERC3156FlashBorrower` interface to interact with Maker flashloans.
This contract utilises the following roles:

- `loan_consolidator_admin`: Can set the fee percentage
- `emergency_shutdown`: Can activate and deactivate the contract*

## State Variables

### CHREG

The Clearinghouse registry module

*The value is set when the policy is activated*

```solidity
CHREGv1 internal CHREG;
```

### TRSRY

The treasury module

*The value is set when the policy is activated*

```solidity
TRSRYv1 internal TRSRY;
```

### RGSTY

The contract registry module

*The value is set when the policy is activated*

```solidity
RGSTYv1 internal RGSTY;
```

### DAI

The DAI token

*The value is set when the policy is activated*

```solidity
IERC20 internal DAI;
```

### USDS

The USDS token

*The value is set when the policy is activated*

```solidity
IERC20 internal USDS;
```

### GOHM

The gOHM token

*The value is set when the policy is activated*

```solidity
IERC20 internal GOHM;
```

### MIGRATOR

The DAI \\<\\> USDS Migrator

*The value is set when the policy is activated*

```solidity
IDaiUsdsMigrator internal MIGRATOR;
```

### FLASH

The ERC3156 flash loan provider

*The value is set when the policy is activated*

```solidity
IERC3156FlashLender internal FLASH;
```

### ONE_HUNDRED_PERCENT

The denominator for percentage calculations

```solidity
uint256 public constant ONE_HUNDRED_PERCENT = 100e2;
```

### feePercentage

Percentage of the debt to be paid as a fee

*In terms of `ONE_HUNDRED_PERCENT`*

```solidity
uint256 public feePercentage;
```

### consolidatorActive

Whether the contract is active

*Note that this is different to the policy activation status*

```solidity
bool public consolidatorActive;
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

## Functions

### constructor

Constructor for the Loan Consolidator

*This function will revert if:

- The fee percentage is above `ONE_HUNDRED_PERCENT`
- The kernel address is zero*

```solidity
constructor(address kernel_, uint256 feePercentage_) Policy(Kernel(kernel_));
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

*This policy does not require any permissions*

```solidity
function requestPermissions() external pure override returns (Permissions[] memory requests);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`requests`|`Permissions[]`|- Array of keycodes and function selectors for requested permissions.|

### consolidate

Consolidate loans (taken with a single Cooler contract) into a single loan by using flashloans.
Unlike `consolidateWithNewOwner()`, the owner of the new Cooler must be the same as the Cooler being repaid.
The caller will be required to provide additional funds to cover accrued interest on the Cooler loans and the lender and protocol fees (if applicable). Use the `requiredApprovals()` function to determine the amount of funds and approvals required.
It is expected that the caller will have already provided approval for this contract to spend the required tokens. See `requiredApprovals()` for more details.

*This function will revert if:

- The caller is not the 'coolerFrom' and 'coolerTo' owner.
- The caller has not approved this contract to spend the reserve token of `clearinghouseTo_` in order to pay the interest, lender and protocol fees.
- The caller has not approved this contract to spend the gOHM escrowed by `coolerFrom_`.
- `clearinghouseFrom_` or `clearinghouseTo_` is not registered with the Clearinghouse registry.
- `coolerFrom_` or `coolerTo_` is not a valid Cooler for the respective Clearinghouse.
- Consolidation is taking place within the same Cooler, and less than two loans are being consolidated.
- The available funds are less than the required flashloan amount.
- The contract is not active.
- The contract has not been activated as a policy.
- Re-entrancy is detected.*

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

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseFrom_`|`address`|Olympus Clearinghouse that issued the existing loans.|
|`clearinghouseTo_`|`address`|Olympus Clearinghouse to be used to issue the consolidated loan.|
|`coolerFrom_`|`address`|    Cooler from which the loans will be consolidated.|
|`coolerTo_`|`address`|    Cooler to which the loans will be consolidated|
|`ids_`|`uint256[]`|          Array containing the ids of the loans to be consolidated.|

### consolidateWithNewOwner

Consolidate loans (taken with a single Cooler contract) into a single loan by using flashloans.
Unlike `consolidate()`, the owner of the new Cooler can be different from the Cooler being repaid.
The caller will be required to provide additional funds to cover accrued interest on the Cooler loans and the lender and protocol fees (if applicable). Use the `requiredApprovals()` function to determine the amount of funds and approvals required.
It is expected that the caller will have already provided approval for this contract to spend the required tokens. See `requiredApprovals()` for more details.

*This function will revert if:

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
- Re-entrancy is detected.*

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

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseFrom_`|`address`|Olympus Clearinghouse that issued the existing loans.|
|`clearinghouseTo_`|`address`|Olympus Clearinghouse to be used to issue the consolidated loan.|
|`coolerFrom_`|`address`|    Cooler from which the loans will be consolidated.|
|`coolerTo_`|`address`|    Cooler to which the loans will be consolidated|
|`ids_`|`uint256[]`|          Array containing the ids of the loans to be consolidated.|

### _consolidateWithFlashLoan

Internal logic for loan consolidation

*Utilized by `consolidate()` and `consolidateWithNewOwner()`
This function assumes:

- The calling external-facing function has checked that the caller is permitted to operate on `coolerFrom_`.*

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

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseFrom_`|`address`|Olympus Clearinghouse that issued the existing loans.|
|`clearinghouseTo_`|`address`|Olympus Clearinghouse to be used to issue the consolidated loan.|
|`coolerFrom_`|`address`|    Cooler from which the loans will be consolidated.|
|`coolerTo_`|`address`|    Cooler to which the loans will be consolidated|
|`ids_`|`uint256[]`|          Array containing the ids of the loans to be consolidated.|

### onFlashLoan

*This function reverts if:

- The caller is not the flash loan provider
- The initiator is not this contract*

```solidity
function onFlashLoan(address initiator_, address, uint256 amount_, uint256 lenderFee_, bytes calldata params_)
    external
    override
    returns (bytes32);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initiator_`|`address`||
|`<none>`|`address`||
|`amount_`|`uint256`||
|`lenderFee_`|`uint256`||
|`params_`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"|

### setFeePercentage

Set the fee percentage

*This function will revert if:

- The contract has not been activated as a policy.
- The fee percentage is above `ONE_HUNDRED_PERCENT`
- The caller does not have the `ROLE_ADMIN` role*

```solidity
function setFeePercentage(uint256 feePercentage_) external onlyPolicyActive onlyRole(ROLE_ADMIN);
```

### activate

Activate the contract

*This function will revert if:

- The contract has not been activated as a policy.
- The caller does not have the `ROLE_EMERGENCY_SHUTDOWN` role
If the contract is already active, it will do nothing.*

```solidity
function activate() external onlyPolicyActive onlyRole(ROLE_EMERGENCY_SHUTDOWN);
```

### deactivate

Deactivate the contract

*This function will revert if:

- The contract has not been activated as a policy.
- The caller does not have the `ROLE_EMERGENCY_SHUTDOWN` role
If the contract is already deactivated, it will do nothing.*

```solidity
function deactivate() external onlyPolicyActive onlyRole(ROLE_EMERGENCY_SHUTDOWN);
```

### onlyConsolidatorActive

Modifier to check that the contract is active

```solidity
modifier onlyConsolidatorActive();
```

### onlyPolicyActive

Modifier to check that the contract is activated as a policy

```solidity
modifier onlyPolicyActive();
```

### _getDebtForLoans

Get the total principal and interest for a given set of loans

```solidity
function _getDebtForLoans(address cooler_, uint256[] calldata ids_) internal view returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`address`|        Cooler contract that issued the loans|
|`ids_`|`uint256[]`|           Array of loan ids to be consolidated|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|totalPrincipal_ Total principal|
|`<none>`|`uint256`|totalInterest_  Total interest|

### _repayDebtForLoans

Repay the debt for a given set of loans and collect the collateral.

*This function assumes:

- The cooler owner has granted approval for this contract to spend the gOHM collateral*

```solidity
function _repayDebtForLoans(address cooler_, uint256[] memory ids_) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`address`|Cooler contract that issued the loans|
|`ids_`|`uint256[]`|   Array of loan ids to be repaid|

### _isValidClearinghouse

```solidity
function _isValidClearinghouse(address clearinghouse_) internal view returns (bool);
```

### _isValidCooler

Check if a given cooler was created by the CoolerFactory for a Clearinghouse

*This function assumes that the authenticity of the Clearinghouse is already verified*

```solidity
function _isValidCooler(address clearinghouse_, address cooler_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|Clearinghouse contract|
|`cooler_`|`address`|      Cooler contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool          Whether the cooler was created by the CoolerFactory for the Clearinghouse|

### _getClearinghouseReserveToken

Get the reserve token for a given Clearinghouse

*This function will revert if the reserve token cannot be determined*

```solidity
function _getClearinghouseReserveToken(address clearinghouse_) internal view returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`| Clearinghouse contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address         Reserve token|

### _getMigrationType

Get the migration type for a given pair of Clearinghouses

*This function will revert if the migration type cannot be determined*

```solidity
function _getMigrationType(address clearinghouseFrom_, address clearinghouseTo_)
    internal
    view
    returns (MigrationType migrationType, IERC20 reserveFrom, IERC20 reserveTo);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseFrom_`|`address`| Clearinghouse that issued the existing loans|
|`clearinghouseTo_`|`address`|   Clearinghouse to be used to issue the consolidated loan|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`migrationType`|`MigrationType`|      Migration type|
|`reserveFrom`|`IERC20`|        Reserve token for the existing loans|
|`reserveTo`|`IERC20`|          Reserve token for the consolidated loan|

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

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseFrom_`|`Clearinghouse`| Clearinghouse that issued the existing loans|
|`clearinghouseTo_`|`Clearinghouse`|   Clearinghouse to be used to issue the consolidated loan|
|`coolerFrom_`|`Cooler`|        Cooler contract that issued the existing loans|
|`coolerTo_`|`Cooler`|          Cooler contract to be used to issue the consolidated loan|
|`ids_`|`uint256[]`|               Array of loan ids to be consolidated|
|`migrationType_`|`MigrationType`|     Migration type|
|`reserveFrom_`|`IERC20`|       Reserve token for the existing loans|
|`reserveTo_`|`IERC20`|         Reserve token for the consolidated loan|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`flashloanAmount`|`uint256`|    Amount of the flashloan|
|`flashloanParams`|`FlashLoanData`|    Flashloan parameters|

### getProtocolFee

View function to compute the protocol fee for a given total debt.

```solidity
function getProtocolFee(uint256 totalDebt_) public view returns (uint256);
```

### requiredApprovals

View function to compute the required approval amounts that the owner of a given Cooler
must give to this contract in order to consolidate the loans.

*This function will revert if:

- The contract has not been activated as a policy.*

```solidity
function requiredApprovals(address clearinghouseTo_, address coolerFrom_, uint256[] calldata ids_)
    external
    view
    onlyPolicyActive
    returns (address, uint256, address, uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseTo_`|`address`|   Clearinghouse contract used to issue the consolidated loan.|
|`coolerFrom_`|`address`|        Cooler contract that issued the loans.|
|`ids_`|`uint256[]`|               Array of loan ids to be consolidated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|owner               Owner of the Cooler (address that should grant the approval).|
|`<none>`|`uint256`|gOhmAmount          Amount of gOHM to be approved by the Cooler owner.|
|`<none>`|`address`|reserveTo           Token that the approval is in terms of|
|`<none>`|`uint256`|ownerReserveTo      Amount of `reserveTo` to be approved by the Cooler owner. This will be the principal of the consolidated loan.|
|`<none>`|`uint256`|callerReserveTo     Amount of `reserveTo` that the caller will need to provide.|

### collateralRequired

Calculates the collateral required to consolidate a set of loans.

*Due to rounding, the collateral required for the consolidated loan may be greater than the collateral of the loans being consolidated.
This function calculates the additional collateral required.*

```solidity
function collateralRequired(address clearinghouse_, address cooler_, uint256[] memory ids_)
    public
    view
    returns (uint256 consolidatedLoanCollateral, uint256 existingLoanCollateral, uint256 additionalCollateral);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouse_`|`address`|     Clearinghouse contract used to issue the consolidated loan.|
|`cooler_`|`address`|            Cooler contract that issued the loans.|
|`ids_`|`uint256[]`|               Array of loan ids to be consolidated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`consolidatedLoanCollateral`|`uint256`| Collateral required for the consolidated loan.|
|`existingLoanCollateral`|`uint256`|     Collateral of the existing loans.|
|`additionalCollateral`|`uint256`|       Additional collateral required to consolidate the loans. This will need to be supplied by the Cooler owner.|

### fundsRequired

View function to compute the funds required to consolidate a set of loans.
The sum of the values must be held in the caller's wallet, in terms of the reserve token.

```solidity
function fundsRequired(address clearinghouseTo_, address coolerFrom_, uint256[] calldata ids_)
    public
    view
    onlyPolicyActive
    returns (address reserveTo, uint256 interest, uint256 lenderFee, uint256 protocolFee);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouseTo_`|`address`|   Clearinghouse contract to be used to issue the consolidated loan.|
|`coolerFrom_`|`address`|        Cooler contract that issued the loans.|
|`ids_`|`uint256[]`|               Array of loan ids to be consolidated.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reserveTo`|`address`|          Token the fund amounts are in terms of|
|`interest`|`uint256`|           Total interest|
|`lenderFee`|`uint256`|          Lender fee|
|`protocolFee`|`uint256`|        Protocol fee|

### VERSION

Version of the contract

```solidity
function VERSION() external pure returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Version number|

## Events

### ConsolidatorActivated

Emitted when the contract is activated

*Note that this is different to activation of the contract as a policy*

```solidity
event ConsolidatorActivated();
```

### ConsolidatorDeactivated

Emitted when the contract is deactivated

*Note that this is different to deactivation of the contract as a policy*

```solidity
event ConsolidatorDeactivated();
```

### FeePercentageSet

Emitted when the fee percentage is set

```solidity
event FeePercentageSet(uint256 feePercentage);
```

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

*Valid values are 0 <= feePercentage <= 100e2*

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
