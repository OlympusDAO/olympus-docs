# CoolerComposites

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/periphery/CoolerComposites.sol)

**Inherits:**
[ICoolerComposites](/main/contracts/docs/src/periphery/interfaces/ICoolerComposites.sol/interface.ICoolerComposites), Owned, [IEnabler](/main/contracts/docs/src/periphery/interfaces/IEnabler.sol/interface.IEnabler)

The CoolerComposites contract enables users to combine multiple operations into a single call

## State Variables

### isEnabled

Whether the contract is enabled

```solidity
bool public isEnabled;
```

### COOLER

```solidity
IMonoCooler public immutable COOLER;
```

### _COLLATERAL_TOKEN

```solidity
ERC20 internal immutable _COLLATERAL_TOKEN;
```

### _DEBT_TOKEN

```solidity
ERC20 internal immutable _DEBT_TOKEN;
```

## Functions

### constructor

```solidity
constructor(IMonoCooler cooler_, address owner_) Owned(owner_);
```

### addCollateralAndBorrow

Allow user to add collateral and borrow from Cooler V2

*User must provide authorization signature before using function*

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

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`IMonoCooler.Authorization`|       Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature`|`IMonoCooler.Signature`|           Off-chain auth signature. Ignored if `authorization_.account` is the zero address.|
|`collateralAmount`|`uint128`|    Amount of gOHM collateral to deposit|
|`borrowAmount`|`uint128`|        Amount of USDS to borrow|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|  Resulting collateral delegation|

### repayAndRemoveCollateral

Allow user to add collateral and borrow from Cooler V2

*User must provide authorization signature before using function*

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

|Name|Type|Description|
|----|----|-----------|
|`authorization`|`IMonoCooler.Authorization`|       Authorization info. Set the `account` field to the zero address to indicate that authorization has already been provided through `IMonoCooler.setAuthorization()`.|
|`signature`|`IMonoCooler.Signature`|           Off-chain auth signature. Ignored if `authorization_.account` is the zero address.|
|`repayAmount`|`uint128`|         Amount of USDS to repay|
|`collateralAmount`|`uint128`|    Amount of gOHM collateral to withdraw|
|`delegationRequests`|`IDLGTEv1.DelegationRequest[]`|  Resulting collateral delegation|

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

### onlyEnabled

```solidity
modifier onlyEnabled();
```

### enable

Enables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function enable(bytes calldata) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||

### disable

Disables the contract

*Implementing contracts should implement permissioning logic*

```solidity
function disable(bytes calldata) external onlyEnabled onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`||
