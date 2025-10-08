# DelegateEscrowFactory

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/0ee70b402d55937704dd3186ba661ff17d0b04df/src/external/cooler/DelegateEscrowFactory.sol)

The Delegate Escrow Factory creates new escrow contracts, each holding the delegated
gOHM from other accounts

*This contract uses Clones (<https://github.com/wighawag/clones-with-immutable-args>)
to save gas on deployment.*

## State Variables

### escrowImplementation

Reference implementation (deployed on creation to clone from).

```solidity
DelegateEscrow public immutable escrowImplementation;
```

### created

Mapping to validate deployed escrows.

```solidity
mapping(address => bool) public created;
```

### escrowFor

Mapping to query escrows for a given delegate.

```solidity
mapping(address => DelegateEscrow) public escrowFor;
```

## Functions

### constructor

```solidity
constructor(address gohm_);
```

### create

creates a new escrow contract for a delegate.

```solidity
function create(address delegate) external returns (DelegateEscrow escrow);
```

### logDelegate

Emit a global event when a new loan request is created.

```solidity
function logDelegate(address caller, address onBehalfOf, int256 delegationAmountDelta) external onlyFromFactory;
```

### onlyFromFactory

Ensure that the called is a Cooler.

```solidity
modifier onlyFromFactory();
```

## Events

### DelegateEscrowCreated

A caller has created a new escrow for a delegate

```solidity
event DelegateEscrowCreated(address indexed caller, address indexed delegate, address indexed escrow);
```

### Delegate

A `caller` has (un)delegated their gOHM amount from `escrow` on behalf of a user

delegationAmountDelta > 0: It has been delegated to this escrow
delegationAmountDelta < 0: It has been undelegated from this escrow*

```solidity
event Delegate(
    address indexed escrow, address indexed caller, address indexed onBehalfOf, int256 delegationAmountDelta
);
```

## Errors

### NotFromFactory

```solidity
error NotFromFactory();
```
