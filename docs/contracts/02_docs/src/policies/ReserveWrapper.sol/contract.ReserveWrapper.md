# ReserveWrapper

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/ReserveWrapper.sol)

**Inherits:** [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler), [IPeriodicTask](/main/contracts/docs/src/interfaces/IPeriodicTask.sol/interface.IPeriodicTask), [IReserveWrapper](/main/contracts/docs/src/policies/interfaces/IReserveWrapper.sol/interface.IReserveWrapper)

**Title:** ReserveWrapper

Periodic task to wrap the reserve tokens in the TRSRY module into sReserve tokens

## Constants

### _RESERVE

```solidity
ERC20 internal immutable _RESERVE;
```

### _SRESERVE

```solidity
ERC4626 internal immutable _SRESERVE;
```

## State Variables

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

## Functions

<a id="constructor-address-address-address"></a>

### constructor

```solidity
constructor(address kernel_, address reserve_, address sReserve_) Policy(Kernel(kernel_));
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `address` |  |
| reserve_ | `address` |  |
| sReserve_ | `address` |  |

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

Returns the version of the policy.

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | The major version of the policy. |
| minor | `uint8` | The minor version of the policy. |

<a id="getreserve"></a>

### getReserve

Returns the address of the reserve token

```solidity
function getReserve() external view override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="getsreserve"></a>

### getSReserve

Returns the address of the sReserve token

```solidity
function getSReserve() external view override returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="execute"></a>

### execute

<i>

This function reverts if:

- The caller is not authorized

</i>

Notes:

- If this contract disabled, nothing is done
- If the reserve balance is 0, nothing is done
- If the previewDeposit would result in zero shares, nothing is done
- If TRSRY is not active, nothing is done

```solidity
function execute() external override onlyRole(HEART_ROLE);
```

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public view override(PolicyEnabler, IPeriodicTask) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |
