# CCIPBurnMintTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/CCIPBurnMintTokenPool.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [BurnMintTokenPoolBase](/main/contracts/docs/src/policies/bridge/BurnMintTokenPoolBase.sol/abstract.BurnMintTokenPoolBase), [ICCIPTokenPool](/main/contracts/docs/src/policies/interfaces/ICCIPTokenPool.sol/interface.ICCIPTokenPool), ITypeAndVersion

**Title:** CCIPBurnMintTokenPool

Bophades policy to handling minting and burning of OHM using Chainlink CCIP on non-canonical chains

<i>

As the CCIP contracts have a minimum solidity version of 0.8.24, this policy is also compiled with 0.8.24

</i>

Despite being a policy, the admin functions inherited from `TokenPool` are not virtual and cannot be overriden, and so remain gated to the owner.

## Constants

### _TYPE_AND_VERSION

Unique identifier for the TokenPool

<i>

This is used to identify the TokenPool to CCIP

</i>

```solidity
string internal constant _TYPE_AND_VERSION = "BurnMintTokenPool 1.5.1";
```

## State Variables

### MINTR

Bophades module for minting and burning OHM

```solidity
MINTRv1 public MINTR;
```

## Functions

<a id="constructor-address-address-address-address"></a>

### constructor

```solidity
constructor(
        address kernel_,
        address ohm_,
        address rmnProxy_,
        address ccipRouter_
    ) Policy(Kernel(kernel_)) TokenPool(IERC20(ohm_), 9, new address[](0), rmnProxy_, ccipRouter_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` |  |
| ohm_ | `address` |  |
| rmnProxy_ | `address` |  |
| ccipRouter_ | `address` |  |

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
function requestPermissions()
        external
        view
        override
        returns (Permissions[] memory permissions);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| permissions | `Permissions[]` | - Array of keycodes and function selectors for requested permissions. |

<a id="version"></a>

### VERSION

Returns the version of the policy

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | The major version of the policy |
| minor | `uint8` | The minor version of the policy |

<a id="_burn-uint256"></a>

### _burn

Burns the specified amount of OHM

<i>

Implementation of the `_burn` function from the `BurnMintTokenPoolAbstract` contract

</i>

```solidity
function _burn(uint256 amount_) internal override onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | `uint256` |  |

<a id="_mint-address-uint256"></a>

### _mint

Mints the specified amount of OHM

<i>

Implementation of the `_mint` function from the `BurnMintTokenPoolBase` contract

</i>

```solidity
function _mint(address receiver_, uint256 amount_) internal override onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver_ | `address` |  |
| amount_ | `uint256` |  |

<a id="getbridgedsupply"></a>

### getBridgedSupply

Returns the amount of OHM that has been bridged from mainnet

<i>

This function is not used in this policy, so it returns 0

</i>

```solidity
function getBridgedSupply() external pure returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="typeandversion"></a>

### typeAndVersion

```solidity
function typeAndVersion() external pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public pure override(TokenPool, PolicyEnabler) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
