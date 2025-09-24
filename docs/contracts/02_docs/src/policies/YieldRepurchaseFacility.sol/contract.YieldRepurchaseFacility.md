# YieldRepurchaseFacility

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/e211052e366afcdb61c0c2e36af4e3ba686456db/src/policies/YieldRepurchaseFacility.sol)

**Inherits:**
[IYieldRepo](/main/contracts/docs/src/policies/interfaces/IYieldRepo.sol/interface.IYieldRepo), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnabler](/main/contracts/docs/src/policies/utils/PolicyEnabler.sol/abstract.PolicyEnabler)

the Yield Repurchase Facility (Yield Repo) contract pulls a derived amount of yield from
the Olympus treasury each week and uses it, along with the backing of previously purchased
OHM, to purchase OHM off the market using a Bond Protocol SDA market.

## State Variables

### epochLength

The length of the epoch

*3 epochs per day, 7 days = 21*

```solidity
uint48 public constant epochLength = 21;
```

### backingPerToken

The backing per token

*Assume backing of $11.33*

```solidity
uint256 public constant backingPerToken = 1133 * 1e7;
```

### ROLE_HEART

The role assigned to the Heart contract
This enables the Heart contract to call specific functions on this contract

```solidity
bytes32 public constant ROLE_HEART = "heart";
```

### ENABLE_PARAMS_LENGTH

The length of the `EnableParams` struct in bytes

```solidity
uint256 internal constant ENABLE_PARAMS_LENGTH = 96;
```

### sReserve

```solidity
ERC4626 public immutable sReserve;
```

### reserve

```solidity
ERC20 public immutable reserve;
```

### _reserveDecimals

```solidity
uint8 internal immutable _reserveDecimals;
```

### ohm

```solidity
ERC20 public immutable ohm;
```

### _ohmDecimals

```solidity
uint8 internal immutable _ohmDecimals;
```

### _oracleDecimals

```solidity
uint8 internal _oracleDecimals;
```

### TRSRY

```solidity
TRSRYv1 public TRSRY;
```

### PRICE

```solidity
PRICEv1 public PRICE;
```

### CHREG

```solidity
CHREGv1 public CHREG;
```

### teller

```solidity
address public immutable teller;
```

### auctioneer

```solidity
IBondSDA public immutable auctioneer;
```

### epoch

```solidity
uint48 public epoch;
```

### nextYield

```solidity
uint256 public nextYield;
```

### lastReserveBalance

```solidity
uint256 public lastReserveBalance;
```

### lastConversionRate

```solidity
uint256 public lastConversionRate;
```

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address ohm_, address sReserve_, address teller_, address auctioneer_) Policy(kernel_);
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

### endEpoch

create a new bond market at the end of the day with some portion of remaining funds

```solidity
function endEpoch() public override onlyRole(ROLE_HEART);
```

### adjustNextYield

allow manager to increase (by maximum 10%) or decrease yield for week if contract is inaccurate

```solidity
function adjustNextYield(uint256 newNextYield) external onlyAdminRole;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newNextYield`|`uint256`|to fund|

### _enable

Implementation-specific enable function

*This function expects the parameters to be an abi-encoded `address[]` with the tokens to transfer*

```solidity
function _enable(bytes calldata params_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`bytes`||

### _disable

Implementation-specific disable function

*This function expects the parameters to be an abi-encoded `address[]` with the tokens to transfer*

```solidity
function _disable(bytes calldata params_) internal override;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params_`|`bytes`||

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

*note amount given is in reserve, not sReserve*

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
