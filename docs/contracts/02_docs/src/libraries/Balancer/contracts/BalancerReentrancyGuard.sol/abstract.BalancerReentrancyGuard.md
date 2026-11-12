# BalancerReentrancyGuard

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/libraries/Balancer/contracts/BalancerReentrancyGuard.sol)

<i>

Contract module that helps prevent reentrant calls to a function.

Inheriting from `ReentrancyGuard` will make the [nonReentrant](#nonreentrant) modifier
available, which can be applied to functions to make sure there are no nested
(reentrant) calls to them.

Note that because there is a single `nonReentrant` guard, functions marked as
`nonReentrant` may not call one another. This can be worked around by making
those functions `private`, and then adding `external` `nonReentrant` entry
points to them.

TIP: If you would like to learn more about reentrancy and alternative ways
to protect against it, check out our blog post
[https://blog.openzeppelin.com/reentrancy-after-istanbul/](https://blog.openzeppelin.com/reentrancy-after-istanbul/)[Reentrancy After Istanbul].

</i>

## Constants

### _NOT_ENTERED

```solidity
uint256 private constant _NOT_ENTERED = 1;
```

### _ENTERED

```solidity
uint256 private constant _ENTERED = 2;
```

## State Variables

### _status

```solidity
uint256 private _status;
```

## Functions

<a id="constructor"></a>

### constructor

```solidity
constructor();
```

<a id="nonreentrant"></a>

### nonReentrant

<i>

Prevents a contract from calling itself, directly or indirectly.
Calling a `nonReentrant` function from another `nonReentrant`
function is not supported. It is possible to prevent this from happening
by making the `nonReentrant` function external, and make it call a
`private` function that does the actual work.

</i>

```solidity
modifier nonReentrant();
```

<a id="_enternonreentrant"></a>

### _enterNonReentrant

```solidity
function _enterNonReentrant() private;
```

<a id="_exitnonreentrant"></a>

### _exitNonReentrant

```solidity
function _exitNonReentrant() private;
```
