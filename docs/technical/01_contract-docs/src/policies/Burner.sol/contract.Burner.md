# Burner

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/policies/Burner.sol)

**Inherits:**
[Policy](/main/technical/contract-docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/technical/contract-docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

Olympus Burner Policy Contract

*This policy is to enable burning of OHM by the DAO MS to support test runs of new products which have not been automated yet.
This policy will be removed once the protocol completes feature development and the DAO no longer needs to test products.
This policy requires categories to be created to designate the purpose for burned OHM, which can be tracked externally from automated systems.*

## State Variables

### TRSRY

```solidity
TRSRYv1 internal TRSRY;
```

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### ohm

OHM token

```solidity
ERC20 public immutable ohm;
```

### categories

List of approved categories for logging OHM burns

```solidity
bytes32[] public categories;
```

### categoryApproved

Whether a category is approved for logging

*This is used to prevent logging of burn events that are not consistent with standardized names*

```solidity
mapping(bytes32 => bool) public categoryApproved;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, ERC20 ohm_) Policy(kernel_);
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

### onlyApproved

```solidity
modifier onlyApproved(bytes32 category_);
```

### burnFromTreasury

Burn OHM from the treasury

```solidity
function burnFromTreasury(uint256 amount_, bytes32 category_)
    external
    onlyRole("burner_admin")
    onlyApproved(category_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|Amount of OHM to burn|
|`category_`|`bytes32`||

### burnFrom

Burn OHM from an address

*Burning OHM from an address requires it to have approved the MINTR for their OHM.
Here, we transfer from the user and burn from this address to avoid approving a
a different contract.*

```solidity
function burnFrom(address from_, uint256 amount_, bytes32 category_)
    external
    onlyRole("burner_admin")
    onlyApproved(category_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from_`|`address`|Address to burn OHM from|
|`amount_`|`uint256`|Amount of OHM to burn|
|`category_`|`bytes32`||

### burn

Burn OHM in this contract

```solidity
function burn(uint256 amount_, bytes32 category_) external onlyRole("burner_admin") onlyApproved(category_);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|Amount of OHM to burn|
|`category_`|`bytes32`||

### addCategory

Add a category to the list of approved burn categories

```solidity
function addCategory(bytes32 category_) external onlyRole("burner_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`category_`|`bytes32`|Category to add|

### removeCategory

Remove a category from the list of approved burn categories

```solidity
function removeCategory(bytes32 category_) external onlyRole("burner_admin");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`category_`|`bytes32`|Category to remove|

### getCategories

Get the list of approved burn categories

```solidity
function getCategories() external view returns (bytes32[] memory);
```

## Events

### Burn

```solidity
event Burn(address indexed from, bytes32 indexed category, uint256 amount);
```

### CategoryAdded

```solidity
event CategoryAdded(bytes32 category);
```

### CategoryRemoved

```solidity
event CategoryRemoved(bytes32 category);
```

## Errors

### Burner_CategoryNotApproved

```solidity
error Burner_CategoryNotApproved();
```

### Burner_CategoryApproved

```solidity
error Burner_CategoryApproved();
```
