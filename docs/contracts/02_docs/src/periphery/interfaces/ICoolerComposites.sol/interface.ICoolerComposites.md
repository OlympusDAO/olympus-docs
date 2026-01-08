# ICoolerComposites

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/periphery/interfaces/ICoolerComposites.sol)

## Functions

### addCollateralAndBorrow

Allow user to add collateral and borrow from Cooler V2

User must provide authorization signature before using function

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

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`IMonoCooler.Authorization`|       Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature`|`IMonoCooler.Signature`|           Off-chain auth signature. Ignored if `authorization_.account` is the zero address.|
|`collateralAmount`|`uint128`|    Amount of gOHM collateral to deposit|
|`borrowAmount`|`uint128`|        Amount of USDS to borrow|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|  Resulting collateral delegation|

### repayAndRemoveCollateral

Allow user to add collateral and borrow from Cooler V2

User must provide authorization signature before using function

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

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`IMonoCooler.Authorization`|       Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature`|`IMonoCooler.Signature`|           Off-chain auth signature. Ignored if `authorization_.account` is the zero address.|
|`repayAmount`|`uint128`|         Amount of USDS to repay|
|`collateralAmount`|`uint128`|    Amount of gOHM collateral to withdraw|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|  Resulting collateral delegation|

### COOLER

Get the Cooler contract address

```solidity
function COOLER() external view returns (IMonoCooler);
```

### collateralToken

Get the collateral token contract address

```solidity
function collateralToken() external view returns (IERC20);
```

### debtToken

Get the debt token contract address

```solidity
function debtToken() external view returns (IERC20);
```

## Events

### TokenRefunded

```solidity
event TokenRefunded(address indexed token, address indexed caller, uint256 amount);
```
