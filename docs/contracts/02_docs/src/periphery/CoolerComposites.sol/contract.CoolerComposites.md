# CoolerComposites

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/CoolerComposites.sol)

**Inherits:** [ICoolerComposites](/main/contracts/docs/src/periphery/interfaces/ICoolerComposites.sol/interface.ICoolerComposites), Owned, [IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

**Title:** Cooler Composites

The CoolerComposites contract enables users to combine multiple operations into a single call

## Constants

### COOLER

Get the Cooler contract address

```solidity
IMonoCooler public immutable COOLER;
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `address` |             |

### _COLLATERAL_TOKEN

```solidity
ERC20 internal immutable _COLLATERAL_TOKEN;
```

### _DEBT_TOKEN

```solidity
ERC20 internal immutable _DEBT_TOKEN;
```

## State Variables

### isEnabled

Whether the contract is enabled

```solidity
bool public isEnabled;
```

## Functions

<a id="constructor-imonocooler-address"></a>

### constructor

```solidity
constructor(IMonoCooler cooler_, address owner_) Owned(owner_);
```

**Parameters**

| Name    | Type          | Description |
| ------- | ------------- | ----------- |
| cooler_ | `IMonoCooler` |             |
| owner_  | `address`     |             |

<a id="addcollateralandborrow-imonocooler-authorization-imonocooler-signature-uint128-uint128-idlgtev1-delegationrequest"></a>

### addCollateralAndBorrow

Allow user to add collateral and borrow from Cooler V2

<i>

User must provide authorization signature before using function

</i>

```solidity
function addCollateralAndBorrow(
        IMonoCooler.Authorization memory authorization,
        IMonoCooler.Signature calldata signature,
        uint128 collateralAmount,
        uint128 borrowAmount,
        IDLGTEv1.DelegationRequest[] calldata delegationRequests
    ) external onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorization | `IMonoCooler.Authorization` | Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`. |
| signature | `IMonoCooler.Signature` | Off-chain auth signature. Ignored if `authorization_.account` is the zero address. |
| collateralAmount | `uint128` | Amount of gOHM collateral to deposit |
| borrowAmount | `uint128` | Amount of USDS to borrow |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | Resulting collateral delegation |

<a id="repayandremovecollateral-imonocooler-authorization-imonocooler-signature-uint128-uint128-idlgtev1-delegationrequest"></a>

### repayAndRemoveCollateral

Allow user to add collateral and borrow from Cooler V2

<i>

User must provide authorization signature before using function

</i>

```solidity
function repayAndRemoveCollateral(
        IMonoCooler.Authorization memory authorization,
        IMonoCooler.Signature calldata signature,
        uint128 repayAmount,
        uint128 collateralAmount,
        IDLGTEv1.DelegationRequest[] calldata delegationRequests
    ) external onlyEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorization | `IMonoCooler.Authorization` | Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`. |
| signature | `IMonoCooler.Signature` | Off-chain auth signature. Ignored if `authorization_.account` is the zero address. |
| repayAmount | `uint128` | Amount of USDS to repay |
| collateralAmount | `uint128` | Amount of gOHM collateral to withdraw |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | Resulting collateral delegation |

<a id="collateraltoken"></a>

### collateralToken

Get the collateral token contract address

```solidity
function collateralToken() external view returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="debttoken"></a>

### debtToken

Get the debt token contract address

```solidity
function debtToken() external view returns (IERC20);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `IERC20` |             |

<a id="onlyenabled"></a>

### onlyEnabled

```solidity
modifier onlyEnabled();
```

<a id="enable-bytes"></a>

### enable

Enables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function enable(bytes calldata) external onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Optional data to pass to a custom enable function |

<a id="disable-bytes"></a>

### disable

Disables the contract

<i>

Implementing contracts should implement permissioning logic

</i>

```solidity
function disable(bytes calldata) external onlyEnabled onlyOwner;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | Optional data to pass to a custom disable function |
