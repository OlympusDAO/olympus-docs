# CCIPBurnMintTokenPool

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/bridge/CCIPBurnMintTokenPool.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [BurnMintTokenPoolBase](/main/contracts/docs/src/policies/bridge/BurnMintTokenPoolBase.sol/abstract.BurnMintTokenPoolBase), [ICCIPTokenPool](/main/contracts/docs/src/policies/interfaces/ICCIPTokenPool.sol/interface.ICCIPTokenPool), ITypeAndVersion

Bophades policy to handling minting and burning of OHM using Chainlink CCIP on non-canonical chains

*As the CCIP contracts have a minimum solidity version of 0.8.24, this policy is also compiled with 0.8.24
Despite being a policy, the admin functions inherited from `TokenPool` are not virtual and cannot be overriden, and so remain gated to the owner.*

## State Variables

### MINTR

Bophades module for minting and burning OHM

```solidity
MINTRv1 public MINTR;
```

### _typeAndVersion

Unique identifier for the TokenPool

*This is used to identify the TokenPool to CCIP*

```solidity
string internal constant _typeAndVersion = "BurnMintTokenPool 1.5.1";
```

## Functions

### constructor

```solidity
constructor(address kernel_, address ohm_, address rmnProxy_, address ccipRouter_)
    Policy(Kernel(kernel_))
    TokenPool(IERC20(ohm_), 9, new address[](0), rmnProxy_, ccipRouter_);
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
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`permissions`|`Permissions[]`|requests - Array of keycodes and function selectors for requested permissions.|

### VERSION

Returns the version of the policy

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|The major version of the policy|
|`minor`|`uint8`|The minor version of the policy|

### _burn

Burns the specified amount of OHM

*Implementation of the `_burn` function from the `BurnMintTokenPoolAbstract` contract*

```solidity
function _burn(uint256 amount_) internal override onlyEnabled;
```

### _mint

Mints the specified amount of OHM

*Implementation of the `_mint` function from the `BurnMintTokenPoolBase` contract*

```solidity
function _mint(address receiver_, uint256 amount_) internal override onlyEnabled;
```

### getBridgedSupply

Returns the amount of OHM that has been bridged from mainnet

*This function is not used in this policy, so it returns 0*

```solidity
function getBridgedSupply() external pure returns (uint256);
```

### typeAndVersion

```solidity
function typeAndVersion() external pure override returns (string memory);
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public pure override(TokenPool, PolicyEnabler) returns (bool);
```
