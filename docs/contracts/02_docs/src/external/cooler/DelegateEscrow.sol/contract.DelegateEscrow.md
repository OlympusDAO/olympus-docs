# DelegateEscrow

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/external/cooler/DelegateEscrow.sol)

**Inherits:**
Clone

An escrow to hold gOHM and delegate that amount to exactly one account.

*Any caller (eg MonoCooler) can delegate on behalf of a `delegator` address, but only that same caller
can rescind the delegation to pull the gOHM back.
This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.
Note: Any donated gOHM (transferred directly rather than using `delegate()`) cannot be recovered.*

## State Variables

### gohm

OHM governance token

```solidity
ERC20 public immutable gohm;
```

### delegations

The mapping of delegation amounts.

*Partitioned by the calling address, and also by
the address on behalf it is delegating for.*

```solidity
mapping(address => mapping(address => uint256)) public delegations;
```

## Functions

### constructor

```solidity
constructor(address gohm_);
```

### initialize

```solidity
function initialize() external onlyFactory;
```

### delegateAccount

The delegate address of the gOHM collateral in this escrow

```solidity
function delegateAccount() public pure returns (address);
```

### factory

The factory contract which created this escrow

```solidity
function factory() public pure returns (DelegateEscrowFactory _factory);
```

### delegate

Delegate an amount of gOHM to the predefined `delegateAccount`

*gOHM is pulled from the caller (which must provide allowance), and only that
same caller may rescind the delegation to recall the gOHM at a future date.*

```solidity
function delegate(address onBehalfOf, uint256 gohmAmount) external returns (uint256 delegatedAmount);
```

### rescindDelegation

Rescind a delegation of gOHM and send back to the caller.

```solidity
function rescindDelegation(address onBehalfOf, uint256 gohmAmount) external returns (uint256 delegatedAmount);
```

### totalDelegated

The total amount delegated via this escrow across all callers, including donations.

```solidity
function totalDelegated() external view returns (uint256);
```

### onlyFactory

Ensure that the caller is the factory which created this contract only.

```solidity
modifier onlyFactory();
```

## Errors

### ExceededDelegationBalance

A caller cannot rescind a delegation for more the gOHM which was
delegated.

```solidity
error ExceededDelegationBalance();
```

### NotFactory

Can only be called from the factory which created this contract

```solidity
error NotFactory();
```
