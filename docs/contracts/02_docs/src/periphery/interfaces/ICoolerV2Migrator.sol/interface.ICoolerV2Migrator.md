# ICoolerV2Migrator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/periphery/interfaces/ICoolerV2Migrator.sol)

Interface for contracts that migrate Cooler V1 loans to Cooler V2

## Functions

### previewConsolidate

Preview the consolidation of a set of loans.

```solidity
function previewConsolidate(address[] calldata coolers_)
    external
    view
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

*The implementing function is expected to handle the following:

- Ensure that `coolers_` are valid
- Ensure that the caller is the owner of the Coolers
- Repay all loans in the Coolers
- Deposit the collateral into Cooler V2
- Borrow the required amount from Cooler V2 to repay the Cooler V1 loans*

```solidity
function consolidate(
    address[] memory coolers_,
    address newOwner_,
    IMonoCooler.Authorization memory authorization_,
    IMonoCooler.Signature calldata signature_,
    IDLGTEv1.DelegationRequest[] calldata delegationRequests_
) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolers_`|`address[]`|           The Coolers from which the loans will be migrated.|
|`newOwner_`|`address`|          Address of the owner of the Cooler V2 position. This can be the same as the caller, or a different address.|
|`authorization_`|`IMonoCooler.Authorization`|     Authorization parameters for the new owner. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature_`|`IMonoCooler.Signature`|         Authorization signature for the new owner. Ignored if `authorization_.account` is the zero address.|
|`delegationRequests_`|`IDLGTEv1.DelegationRequest[]`|Delegation requests for the new owner.|

### addCoolerFactory

Add a CoolerFactory to the migrator

```solidity
function addCoolerFactory(address coolerFactory_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`coolerFactory_`|`address`|The CoolerFactory to add|

### removeCoolerFactory

Remove a CoolerFactory from the migrator

```solidity
function removeCoolerFactory(address coolerFactory_) external;
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

## Events

### CoolerFactoryAdded

Emitted when a CoolerFactory is added to the migrator

```solidity
event CoolerFactoryAdded(address indexed coolerFactory);
```

### CoolerFactoryRemoved

Emitted when a CoolerFactory is removed from the migrator

```solidity
event CoolerFactoryRemoved(address indexed coolerFactory);
```

### TokenRefunded

Emitted when a token is refunded to the recipient

```solidity
event TokenRefunded(address indexed token, address indexed recipient, uint256 amount);
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

### Only_CoolerOwner

Thrown when the Cooler is not owned by the caller

```solidity
error Only_CoolerOwner();
```

### Params_InvalidClearinghouse

Thrown when the Clearinghouse is not valid

```solidity
error Params_InvalidClearinghouse();
```

### Params_InvalidCooler

Thrown when the Cooler is not valid

```solidity
error Params_InvalidCooler();
```

### Params_InvalidNewOwner

Thrown when the new owner address provided does not match the authorization

```solidity
error Params_InvalidNewOwner();
```

### Params_DuplicateCooler

Thrown when the Cooler is duplicated

```solidity
error Params_DuplicateCooler();
```

### Params_InvalidAddress

Thrown when the address is invalid

```solidity
error Params_InvalidAddress(string reason_);
```
