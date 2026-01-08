# YieldRepurchaseFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/policies/YieldRepurchaseFacility.sol)

**Inherits:**
[IYieldRepo](/main/contracts/docs/src/policies/interfaces/IYieldRepo.sol/interface.IYieldRepo), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [RolesConsumer](/main/contracts/docs/src/modules/ROLES/OlympusRoles.sol/abstract.RolesConsumer)

the Yield Repurchase Facility (Yield Repo) contract pulls a derived amount of yield from
the Olympus treasury each week and uses it, along with the backing of previously purchased
OHM, to purchase OHM off the market using a Bond Protocol SDA market.

## State Variables

### sReserve

```solidity
ERC4626 public immutable sReserve
```

### reserve

```solidity
ERC20 public immutable reserve
```

### _reserveDecimals

```solidity
uint8 internal immutable _reserveDecimals
```

### ohm

```solidity
ERC20 public immutable ohm
```

### _ohmDecimals

```solidity
uint8 internal immutable _ohmDecimals
```

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals
```

### TRSRY

```solidity
TRSRYv1 public TRSRY
```

### PRICE

```solidity
PRICEv1 public PRICE
```

### CHREG

```solidity
CHREGv1 public CHREG
```

### teller

```solidity
address public immutable teller
```

### auctioneer

```solidity
IBondSDA public immutable auctioneer
```

### epoch

```solidity
uint48 public epoch
```

### nextYield

```solidity
uint256 public nextYield
```

### lastReserveBalance

```solidity
uint256 public lastReserveBalance
```

### lastConversionRate

```solidity
uint256 public lastConversionRate
```

### isShutdown

```solidity
bool public isShutdown
```

### epochLength

```solidity
uint48 public constant epochLength = 21
```

### backingPerToken

```solidity
uint256 public constant backingPerToken = 1133 * 1e7
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address ohm_, address sReserve_, address teller_, address auctioneer_) Policy(kernel_);
```

### initialize

```solidity
function initialize(uint256 initialReserveBalance, uint256 initialConversionRate, uint256 initialYield)
    external
    onlyRole("loop_daddy");
```

### configureDependencies

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

### requestPermissions

```solidity
function requestPermissions() external view override returns (Permissions[] memory permissions);
```

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

### endEpoch

create a new bond market at the end of the day with some portion of remaining funds

```solidity
function endEpoch() public override onlyRole("heart");
```

### adjustNextYield

allow manager to increase (by maximum 10%) or decrease yield for week if contract is inaccurate

```solidity
function adjustNextYield(uint256 newNextYield) external onlyRole("loop_daddy");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newNextYield`|`uint256`|to fund|

### shutdown

retire contract by burning ohm balance and transferring tokens to treasury

```solidity
function shutdown(ERC20[] memory tokensToTransfer) external onlyRole("loop_daddy");
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokensToTransfer`|`ERC20[]`|list of tokens to transfer back to treasury (i.e. reserves)|

### _createMarket

create bond protocol market with given budget

```solidity
function _createMarket(uint256 bidAmount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bidAmount`|`uint256`|amount of reserve to fund bond market with|

### _getBackingForPurchased

internal function to burn ohm and retrieve backing

```solidity
function _getBackingForPurchased() internal;
```

### _withdraw

internal function to withdraw sReserve from treasury

note amount given is in reserve, not sReserve

```solidity
function _withdraw(uint256 amount) internal;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|an amount to withdraw, in reserve|

### _getPriceDecimals

Helper function to calculate number of price decimals based on the value returned from the price feed.

```solidity
function _getPriceDecimals(uint256 price_) internal view returns (int8);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`price_`|`uint256`|  The price to calculate the number of decimals for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int8`|The number of decimals|

### getReserveBalance

fetch combined sReserve balance of active clearinghouses and treasury, in reserve

```solidity
function getReserveBalance() public view override returns (uint256 balance);
```

### getNextYield

compute yield for the next week

```solidity
function getNextYield() public view override returns (uint256 yield);
```

### getOhmBalanceAndBacking

compute backing for ohm balance

```solidity
function getOhmBalanceAndBacking() public view override returns (uint256 balance, uint256 backing);
```

## Events

### RepoMarket

```solidity
event RepoMarket(uint256 marketId, uint256 bidAmount);
```

### NextYieldSet

```solidity
event NextYieldSet(uint256 nextYield);
```

### Shutdown

```solidity
event Shutdown();
```
