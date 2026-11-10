# DelegateEscrow

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/external/cooler/DelegateEscrow.sol)

**Inherits:** Clone

**Title:** Delegate Escrow Account

An escrow to hold gOHM and delegate that amount to exactly one account.

<i>

Any caller (eg MonoCooler) can delegate on behalf of a `delegator` address, but only that same caller
can rescind the delegation to pull the gOHM back.
This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.
Note: Any donated gOHM (transferred directly rather than using `delegate()`) cannot be recovered.

</i>

## Constants

### gohm

OHM governance token

```solidity
ERC20 public immutable gohm;
```

## State Variables

### delegations

The mapping of delegation amounts.

<i>

Partitioned by the calling address, and also by
the address on behalf it is delegating for.

</i>

```solidity
mapping(address /* caller */ => mapping(address /* onBehalfOf */ => uint256 /* amount */))
        public delegations;
```

## Functions

<a id="constructor-address"></a>

### constructor

```solidity
constructor(address gohm_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gohm_ | `address` |  |

<a id="initialize"></a>

### initialize

```solidity
function initialize() external onlyFactory;
```

<a id="delegateaccount"></a>

### delegateAccount

The delegate address of the gOHM collateral in this escrow

```solidity
function delegateAccount() public pure returns (address);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

<a id="factory"></a>

### factory

The factory contract which created this escrow

```solidity
function factory() public pure returns (DelegateEscrowFactory _factory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _factory | `DelegateEscrowFactory` |  |

<a id="delegate-address-uint256"></a>

### delegate

Delegate an amount of gOHM to the predefined `delegateAccount`

<i>

gOHM is pulled from the caller (which must provide allowance), and only that
same caller may rescind the delegation to recall the gOHM at a future date.

</i>

```solidity
function delegate(
        address onBehalfOf,
        uint256 gohmAmount
    ) external returns (uint256 delegatedAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onBehalfOf | `address` |  |
| gohmAmount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatedAmount | `uint256` |  |

<a id="rescinddelegation-address-uint256"></a>

### rescindDelegation

Rescind a delegation of gOHM and send back to the caller.

```solidity
function rescindDelegation(
        address onBehalfOf,
        uint256 gohmAmount
    ) external returns (uint256 delegatedAmount);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| onBehalfOf | `address` |  |
| gohmAmount | `uint256` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegatedAmount | `uint256` |  |

<a id="totaldelegated"></a>

### totalDelegated

The total amount delegated via this escrow across all callers, including donations.

```solidity
function totalDelegated() external view returns (uint256);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="onlyfactory"></a>

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
