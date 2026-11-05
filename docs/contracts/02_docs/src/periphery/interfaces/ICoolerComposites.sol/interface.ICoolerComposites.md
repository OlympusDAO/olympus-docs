# ICoolerComposites

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/interfaces/ICoolerComposites.sol)

## Functions

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
    ) external;
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
    ) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| authorization | `IMonoCooler.Authorization` | Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`. |
| signature | `IMonoCooler.Signature` | Off-chain auth signature. Ignored if `authorization_.account` is the zero address. |
| repayAmount | `uint128` | Amount of USDS to repay |
| collateralAmount | `uint128` | Amount of gOHM collateral to withdraw |
| delegationRequests | `IDLGTEv1.DelegationRequest[]` | Resulting collateral delegation |

<a id="cooler"></a>

### COOLER

Get the Cooler contract address

```solidity
function COOLER() external view returns (IMonoCooler);
```

**Returns**

| Name         | Type          | Description |
| ------------ | ------------- | ----------- |
| &lt;none&gt; | `IMonoCooler` |             |

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

## Events

### TokenRefunded

```solidity
event TokenRefunded(address indexed token, address indexed caller, uint256 amount);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| token  | `address` |             |
| caller | `address` |             |
| amount | `uint256` |             |
