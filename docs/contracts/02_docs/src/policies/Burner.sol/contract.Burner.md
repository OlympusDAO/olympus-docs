# Burner

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/Burner.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned)

**Title:** Olympus Burner Policy

Olympus Burner Policy Contract

<i>

This policy is to enable burning of OHM by the DAO MS to support test runs of new products which have not been automated yet.
This policy will be removed once the protocol completes feature development and the DAO no longer needs to test products.
This policy requires categories to be created to designate the purpose for burned OHM, which can be tracked externally from automated systems.

</i>

## Constants

### OHM

OHM token

```solidity
ERC20 public immutable OHM;
```

## State Variables

### TRSRY

forge-lint: disable-start(mixed-case-variable)

```solidity
TRSRYv1 internal TRSRY;
```

### MINTR

```solidity
MINTRv1 internal MINTR;
```

### categories

List of approved categories for logging OHM burns

```solidity
bytes32[] public categories;
```

### categoryApproved

Whether a category is approved for logging

<i>

This is used to prevent logging of burn events that are not consistent with standardized names

</i>

```solidity
mapping(bytes32 => bool) public categoryApproved;
```

## Functions

<a id="constructor-kernel-erc20"></a>

### constructor

forge-lint: disable-end(mixed-case-variable)

```solidity
constructor(Kernel kernel_, ERC20 ohm_) Policy(kernel_);
```

**Parameters**

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| kernel_ | `Kernel` |             |
| ohm_    | `ERC20`  |             |

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

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| category_ | `bytes32` |             |

<a id="_onlyapproved-bytes32"></a>

### _onlyApproved

```solidity
function _onlyApproved(bytes32 category_) internal view;
```

**Parameters**

| Name      | Type      | Description |
| --------- | --------- | ----------- |
| category_ | `bytes32` |             |

<a id="burnfromtreasury-uint256-bytes32"></a>

### burnFromTreasury

Burn OHM from the treasury

```solidity
function burnFromTreasury(
        uint256 amount_,
        bytes32 category_
    ) external onlyEnabled onlyRole("burner_admin") onlyApproved(category_);
```

**Parameters**

| Name      | Type      | Description           |
| --------- | --------- | --------------------- |
| amount_   | `uint256` | Amount of OHM to burn |
| category_ | `bytes32` |                       |

<a id="burnfrom-address-uint256-bytes32"></a>

### burnFrom

Burn OHM from an address

<i>

Burning OHM from an address requires it to have approved the MINTR for their OHM.
Here, we transfer from the user and burn from this address to avoid approving a
a different contract.

</i>

```solidity
function burnFrom(
        address from_,
        uint256 amount_,
        bytes32 category_
    ) external onlyEnabled onlyRole("burner_admin") onlyApproved(category_);
```

**Parameters**

| Name      | Type      | Description              |
| --------- | --------- | ------------------------ |
| from_     | `address` | Address to burn OHM from |
| amount_   | `uint256` | Amount of OHM to burn    |
| category_ | `bytes32` |                          |

<a id="burn-uint256-bytes32"></a>

### burn

Burn OHM in this contract

```solidity
function burn(
        uint256 amount_,
        bytes32 category_
    ) external onlyEnabled onlyRole("burner_admin") onlyApproved(category_);
```

**Parameters**

| Name      | Type      | Description           |
| --------- | --------- | --------------------- |
| amount_   | `uint256` | Amount of OHM to burn |
| category_ | `bytes32` |                       |

<a id="addcategory-bytes32"></a>

### addCategory

Add a category to the list of approved burn categories

```solidity
function addCategory(bytes32 category_) external onlyEnabled onlyRole("burner_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category_ | `bytes32` | Category to add |

<a id="removecategory-bytes32"></a>

### removeCategory

Remove a category from the list of approved burn categories

```solidity
function removeCategory(bytes32 category_) external onlyEnabled onlyRole("burner_admin");
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| category_ | `bytes32` | Category to remove |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure returns (uint8, uint8);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| &lt;none&gt; | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

ERC165 interface support

<i>

Supports IERC165, IVersioned, and IEnabler (via PolicyEnabler)

</i>

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool);
```

**Parameters**

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| interfaceId | `bytes4` |             |

**Returns**

| Name         | Type   | Description |
| ------------ | ------ | ----------- |
| &lt;none&gt; | `bool` |             |

<a id="getcategories"></a>

### getCategories

Get the list of approved burn categories

```solidity
function getCategories() external view returns (bytes32[] memory);
```

**Returns**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| &lt;none&gt; | `bytes32[]` |             |

## Events

### Burn

```solidity
event Burn(address indexed from, bytes32 indexed category, uint256 amount);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| from     | `address` |             |
| category | `bytes32` |             |
| amount   | `uint256` |             |

### CategoryAdded

```solidity
event CategoryAdded(bytes32 category);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| category | `bytes32` |             |

### CategoryRemoved

```solidity
event CategoryRemoved(bytes32 category);
```

**Parameters**

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| category | `bytes32` |             |

## Errors

### Burner_CategoryNotApproved

```solidity
error Burner_CategoryNotApproved();
```

### Burner_CategoryApproved

```solidity
error Burner_CategoryApproved();
```
