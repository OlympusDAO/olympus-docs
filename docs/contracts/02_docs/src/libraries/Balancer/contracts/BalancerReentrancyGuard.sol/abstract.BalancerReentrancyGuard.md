# BalancerReentrancyGuard

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/libraries/Balancer/contracts/BalancerReentrancyGuard.sol)

Contract module that helps prevent reentrant calls to a function.
Inheriting from `ReentrancyGuard` will make the [nonReentrant](/main/contracts/docs/src/libraries/Balancer/contracts/BalancerReentrancyGuard.sol/abstract.BalancerReentrancyGuard#nonreentrant) modifier
available, which can be applied to functions to make sure there are no nested
(reentrant) calls to them.
Note that because there is a single `nonReentrant` guard, functions marked as
`nonReentrant` may not call one another. This can be worked around by making
those functions `private`, and then adding `external` `nonReentrant` entry
points to them.
TIP: If you would like to learn more about reentrancy and alternative ways
to protect against it, check out our blog post
<https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy> After Istanbul].

## State Variables

### \_NOT_ENTERED

```solidity
uint256 private constant _NOT_ENTERED = 1
```

### \_ENTERED

```solidity
uint256 private constant _ENTERED = 2
```

### \_status

```solidity
uint256 private _status
```

## Functions

### constructor

```solidity
constructor() ;
```

### nonReentrant

Prevents a contract from calling itself, directly or indirectly.
Calling a `nonReentrant` function from another `nonReentrant`
function is not supported. It is possible to prevent this from happening
by making the `nonReentrant` function external, and make it call a
`private` function that does the actual work.

```solidity
modifier nonReentrant() ;
```

### \_enterNonReentrant

```solidity
function _enterNonReentrant() private;
```

### \_exitNonReentrant

```solidity
function _exitNonReentrant() private;
```
