# CoolerV2Migrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/periphery/CoolerV2Migrator.sol)

**Inherits:**
[IERC3156FlashBorrower](/main/contracts/docs/src/interfaces/maker-dao/IERC3156FlashBorrower.sol/interface.IERC3156FlashBorrower), [ICoolerV2Migrator](/main/contracts/docs/src/periphery/interfaces/ICoolerV2Migrator.sol/interface.ICoolerV2Migrator), ReentrancyGuard, Owned, [IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

A contract that migrates debt from Olympus Cooler V1 facilities to Cooler V2.
This is compatible with all three versions of Cooler V1.

*This contract uses the `IERC3156FlashBorrower` interface to interact with Maker flashloans.
The debt token of MonoCooler is assumed to be USDS. If that is changed in the future, this contract will need to be re-deployed.*

## State Variables

### isEnabled

Whether the contract is enabled

```solidity
bool public isEnabled;
```

### CHREG

The Clearinghouse registry module

```solidity
CHREGv1 public immutable CHREG;
```

### DAI

The DAI token

```solidity
ERC20 public immutable DAI;
```

### USDS

The USDS token

```solidity
ERC20 public immutable USDS;
```

### GOHM

The gOHM token

```solidity
ERC20 public immutable GOHM;
```

### MIGRATOR

The DAI \\<\\> USDS Migrator

```solidity
IDaiUsdsMigrator public immutable MIGRATOR;
```

### FLASH

The ERC3156 flash loan provider

```solidity
IERC3156FlashLender public immutable FLASH;
```

### COOLERV2

The Cooler V2 contract

```solidity
IMonoCooler public immutable COOLERV2;
```

### _COOLER_FACTORIES

The list of CoolerFactories

```solidity
address[] internal _COOLER_FACTORIES;
```

### MAX_LOANS

This constant is used when iterating through the loans of a Cooler

*This is used to prevent infinite loops, and is an appropriate upper bound
as the maximum number of loans seen per Cooler is less than 50.*

```solidity
uint8 internal constant MAX_LOANS = type(uint8).max;
```

## Functions

### constructor

```solidity
constructor(
    address owner_,
    address coolerV2_,
    address dai_,
    address usds_,
    address gohm_,
    address migrator_,
    address flash_,
    address chreg_,
    address[] memory coolerFactories_
) Owned(owner_);
```

### previewConsolidate

Preview the consolidation of a set of loans.

```solidity
function previewConsolidate(address[] memory coolers_)
    external
    view
    onlyEnabled
    returns (uint256 collateralAmount, uint256 borrowAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolers_`|`address[]`|           The Coolers to consolidate the loans from.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`collateralAmount`|`uint256`|   The amount of collateral that will be migrated into Cooler V2.|
|`borrowAmount`|`uint256`|       The amount of debt that will be borrowed from Cooler V2.|

### consolidate

Consolidate Cooler V1 loans into Cooler V2
This function supports consolidation of loans from multiple Clearinghouses and Coolers, provided that the caller is the owner.
The funds for paying interest owed and fees will be borrowed from Cooler V2.
It is expected that the caller will have already provided approval for this contract to spend the required tokens. See `previewConsolidate()` for more details.

*This function will revert if:

- Any of the Coolers are not owned by the caller.
- Any of the Coolers have not been created by the CoolerFactory.
- Any of the Coolers have a different lender than an Olympus Clearinghouse.
- A duplicate Cooler is provided.
- The owner of the destination Cooler V2 has not provided authorization for this contract to manage their Cooler V2 position.
- The caller has not approved this contract to spend the collateral token, gOHM.
- The contract is not active.
- Re-entrancy is detected.*

```solidity
function consolidate(
    address[] memory coolers_,
    address newOwner_,
    IMonoCooler.Authorization memory authorization_,
    IMonoCooler.Signature calldata signature_,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests_
) external onlyEnabled nonReentrant;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolers_`|`address[]`|           The Coolers from which the loans will be migrated.|
|`newOwner_`|`address`|          Address of the owner of the Cooler V2 position. This can be the same as the caller, or a different address.|
|`authorization_`|`IMonoCooler.Authorization`|     Authorization parameters for the new owner. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature_`|`IMonoCooler.Signature`|         Authorization signature for the new owner. Ignored if `authorization_.account` is the zero address.|
|`delegationRequests_`|`IDLGTEv1.DelegationRequest[]`|Delegation requests for the new owner.|

### onFlashLoan

*This function reverts if:

- The caller is not the flash loan provider
- The initiator is not this contract*

```solidity
function onFlashLoan(address initiator_, address, uint256 amount_, uint256, bytes calldata params_)
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
|`<none>`|`uint256`||
|`params_`|`bytes`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"|

### _handleRepayments

```solidity
function _handleRepayments(Cooler cooler_, ERC20 debtToken_, uint256 numLoans_)
    internal
    returns (uint256 principal, uint256 interest, uint256 collateral);
```

### _getDebtForCooler

```solidity
function _getDebtForCooler(Cooler cooler_, address[] memory clearinghouses_)
    internal
    view
    returns (
        uint256 coolerPrincipal,
        uint256 coolerInterest,
        uint256 coolerCollateral,
        address debtToken,
        uint8 numLoans
    );
```

### _isValidCooler

Check if a given cooler was created by the CoolerFactory

```solidity
function _isValidCooler(address cooler_) internal view returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`cooler_`|`address`|      Cooler contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool          Whether the cooler was created by the CoolerFactory|

### _inArray

```solidity
function _inArray(address[] memory array_, address item_) internal pure returns (bool);
```

### _getClearinghouses

Get all of the clearinghouses in the registry

```solidity
function _getClearinghouses() internal view returns (address[] memory clearinghouses);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`clearinghouses`|`address[]`|The list of clearinghouses|

### addCoolerFactory

Add a CoolerFactory to the migrator

```solidity
function addCoolerFactory(address coolerFactory_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolerFactory_`|`address`|The CoolerFactory to add|

### removeCoolerFactory

Remove a CoolerFactory from the migrator

```solidity
function removeCoolerFactory(address coolerFactory_) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolerFactory_`|`address`|The CoolerFactory to remove|

### getCoolerFactories

Get the list of CoolerFactories

```solidity
function getCoolerFactories() external view returns (address[] memory coolerFactories);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`coolerFactories`|`address[]`|The list of CoolerFactories|

### onlyEnabled

```solidity
modifier onlyEnabled();
```

### enable

Enables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function enable(bytes calldata) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

### disable

Disables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function disable(bytes calldata) external onlyEnabled onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

## Structs

### CoolerData

Data structure used to store data about a Cooler

```solidity
struct CoolerData {
    Cooler cooler;
    ERC20 debtToken;
    uint8 numLoans;
}
```

### CoolerTotal

*Temporary storage for the principal and interest for each debt token*

```solidity
struct CoolerTotal {
    uint256 daiPrincipal;
    uint256 daiInterest;
    uint256 usdsPrincipal;
    uint256 usdsInterest;
}
```

### FlashLoanData

Data structure used for flashloan parameters

```solidity
struct FlashLoanData {
    CoolerData[] coolers;
    address currentOwner;
    address newOwner;
    uint256 usdsRequired;
    IDLGTEv1.DelegationRequest[] delegationRequests;
}
```
