# IGenericClearinghouse

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/interfaces/IGenericClearinghouse.sol)

## Functions

<a id="debttoken"></a>

### debtToken

The debt token of the clearinghouse.

```solidity
function debtToken() external view returns (IERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IERC20` |  |

<a id="collateraltoken"></a>

### collateralToken

The collateral token of the clearinghouse.

```solidity
function collateralToken() external view returns (IERC20);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `IERC20` |  |

<a id="duration"></a>

### duration

The duration of the loan.

```solidity
function duration() external view returns (uint48);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint48` |  |

<a id="interestrate"></a>

### interestRate

The interest rate of the loan.
Stored as a percentage, in terms of 1e18.

```solidity
function interestRate() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="loantocollateral"></a>

### loanToCollateral

The ratio of debt tokens to collateral tokens.

```solidity
function loanToCollateral() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="maxrewardperloan"></a>

### maxRewardPerLoan

The maximum reward (in collateral tokens) per loan.

```solidity
function maxRewardPerLoan() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="lendtocooler-icooler-uint256"></a>

### lendToCooler

Lend to a cooler.

```solidity
function lendToCooler(ICooler cooler_, uint256 amount_) external returns (uint256 loanId);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cooler_ | `ICooler` | The Cooler instance to lend to. |
| amount_ | `uint256` | The amount of debt token to lend. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| loanId | `uint256` |  The id of the granted loan. |

<a id="extendloan-icooler-uint256-uint8"></a>

### extendLoan

Extend the loan duration.

```solidity
function extendLoan(ICooler cooler_, uint256 loanId_, uint8 times_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| cooler_ | `ICooler` | The Cooler instance to extend the loan for. |
| loanId_ | `uint256` | The id of the loan to extend. |
| times_ | `uint8` | The number of times to extend the loan. |

<a id="claimdefaulted-address-uint256"></a>

### claimDefaulted

Batch several default claims to save gas.
The elements on both arrays must be paired based on their index.

<i>

Implements an auction style reward system that linearly increases up to a max reward.

</i>

```solidity
function claimDefaulted(address[] calldata coolers_, uint256[] calldata loans_) external;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| coolers_ | `address[]` | Array of contracts where the default must be claimed. |
| loans_ | `uint256[]` | Array of defaulted loan ids. |

<a id="getcollateralforloan-uint256"></a>

### getCollateralForLoan

View function computing collateral for a loan amount.

```solidity
function getCollateralForLoan(uint256 principal_) external view returns (uint256);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| principal_ | `uint256` | The amount of debt tokens to compute collateral for. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` | collateral_ The amount of collateral tokens required for the loan. |

<a id="getloanforcollateral-uint256"></a>

### getLoanForCollateral

View function computing loan for a collateral amount.

```solidity
function getLoanForCollateral(
        uint256 collateral_
    ) external view returns (uint256 principal, uint256 interest);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| collateral_ | `uint256` | The amount of collateral tokens to compute the loan for. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| principal | `uint256` |   The amount of debt tokens for the loan. |
| interest | `uint256` |    The amount of interest tokens for the loan. |

<a id="interestforloan-uint256-uint256"></a>

### interestForLoan

View function to compute the interest for given principal amount.

```solidity
function interestForLoan(
        uint256 principal_,
        uint256 duration_
    ) external view returns (uint256 interest);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| principal_ | `uint256` | The amount of reserve being lent. |
| duration_ | `uint256` | The elapsed time in seconds. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interest | `uint256` |    The amount of interest for the loan. |

<a id="principalreceivables"></a>

### principalReceivables

The amount of principal receivables.

```solidity
function principalReceivables() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="interestreceivables"></a>

### interestReceivables

The amount of interest receivables.

```solidity
function interestReceivables() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="gettotalreceivables"></a>

### getTotalReceivables

Get total receivable reserve for the treasury.
Includes both principal and interest.

```solidity
function getTotalReceivables() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

## Events

### YieldSwept

```solidity
event YieldSwept(address indexed to, uint256 amount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | `address` |  |
| amount | `uint256` |  |

### InterestRateSet

```solidity
event InterestRateSet(uint256 interestRate);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interestRate | `uint256` |  |

### MaxRewardPerLoanSet

```solidity
event MaxRewardPerLoanSet(uint256 maxRewardPerLoan);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxRewardPerLoan | `uint256` |  |

### LoanToCollateralSet

```solidity
event LoanToCollateralSet(uint256 loanToCollateral);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| loanToCollateral | `uint256` |  |

### DurationSet

```solidity
event DurationSet(uint48 duration);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| duration | `uint48` |  |

## Errors

### BadEscrow

```solidity
error BadEscrow();
```

### DurationMaximum

```solidity
error DurationMaximum();
```

### OnlyBurnable

```solidity
error OnlyBurnable();
```

### TooEarlyToFund

```solidity
error TooEarlyToFund();
```

### LengthDiscrepancy

```solidity
error LengthDiscrepancy();
```

### OnlyBorrower

```solidity
error OnlyBorrower();
```

### NotLender

```solidity
error NotLender();
```

### InvalidParams

```solidity
error InvalidParams(string reason);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reason | `string` |  |
