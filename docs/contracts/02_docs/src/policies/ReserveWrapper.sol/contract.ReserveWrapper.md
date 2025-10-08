# ReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/policies/ReserveWrapper.sol)

**Inherits:**
[Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IPeriodicTask](/main/contracts/docs/src/interfaces/IPeriodicTask.sol/interface.IPeriodicTask), [IReserveWrapper](/main/contracts/docs/src/policies/interfaces/IReserveWrapper.sol/interface.IReserveWrapper)

Periodic task to wrap the reserve tokens in the TRSRY module into sReserve tokens

## State Variables

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### _RESERVE

```solidity
ERC20 internal immutable _RESERVE;
```

### _SRESERVE

```solidity
ERC4626 internal immutable _SRESERVE;
```

## Functions

### constructor

```solidity
constructor(address kernel_, address reserve_, address sReserve_) Policy(Kernel(kernel_));
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

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|The major version of the policy.|
|`minor`|`uint8`|The minor version of the policy.|

### getReserve

Returns the address of the reserve token

```solidity
function getReserve() external view override returns (address);
```

### getSReserve

Returns the address of the sReserve token

```solidity
function getSReserve() external view override returns (address);
```

### execute

Executes the periodic task

*Guidelines for implementing functions:*

```solidity
function execute() external override onlyRole(HEART_ROLE);
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view override(PolicyEnabler, IPeriodicTask) returns (bool);
```
