# Minter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Minter.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

**Title:** Olympus Minter Policy

Olympus Minter Policy Contract

<i>

This policy is to enable minting of OHM by the DAO MS to support test runs of new products which have not been automated yet.
This policy will be removed once the protocol completes feature development and the DAO no longer needs to test products.
This policy requires categories to be created to designate the purpose for minted OHM, which can be tracked externally from automated systems.

</i>

## State Variables

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### categories

List of approved categories for logging OHM mints

```solidity
bytes32[] public categories;
```

### categoryApproved

Whether a category is approved for logging

<i>

This is used to prevent logging of mint events that are not consistent with standardized names

</i>

```solidity
mapping(bytes32 => bool) public categoryApproved;
```

## Functions

<a id="constructor-kernel"></a>

### constructor

```solidity
constructor(Kernel kernel_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |

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

<a id="onlyapproved-bytes32"></a>

### onlyApproved

```solidity
modifier onlyApproved(bytes32 category_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category_ | `bytes32` |  |

<a id="mint-address-uint256-bytes32"></a>

### mint

Mint OHM to an address

```solidity
function mint(
        address to_,
        uint256 amount_,
        bytes32 category_
    ) external onlyRole("minter_admin") onlyApproved(category_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to_ | `address` | Address to mint OHM to |
| amount_ | `uint256` | Amount of OHM to mint |
| category_ | `bytes32` |  |

<a id="addcategory-bytes32"></a>

### addCategory

Add a category to the list of approved mint categories

```solidity
function addCategory(bytes32 category_) external onlyRole("minter_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category_ | `bytes32` | Category to add |

<a id="removecategory-bytes32"></a>

### removeCategory

Remove a category from the list of approved mint categories

```solidity
function removeCategory(bytes32 category_) external onlyRole("minter_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category_ | `bytes32` | Category to remove |

<a id="getcategories"></a>

### getCategories

Get the list of approved mint categories

```solidity
function getCategories() external view returns (bytes32[] memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bytes32[]` |  |

## Events

### Mint

```solidity
event Mint(address indexed to, bytes32 indexed category, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` |  |
| category | `bytes32` |  |
| amount | `uint256` |  |

### CategoryAdded

```solidity
event CategoryAdded(bytes32 category);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category | `bytes32` |  |

### CategoryRemoved

```solidity
event CategoryRemoved(bytes32 category);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category | `bytes32` |  |

## Errors

### Minter_CategoryNotApproved

```solidity
error Minter_CategoryNotApproved();
```

### Minter_CategoryApproved

```solidity
error Minter_CategoryApproved();
```
