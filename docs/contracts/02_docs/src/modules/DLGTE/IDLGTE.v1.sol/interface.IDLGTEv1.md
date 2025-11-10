# IDLGTEv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/06cd3728b58af36639dea8a6f0a3c4d79f557b65/src/modules/DLGTE/IDLGTE.v1.sol)

## Functions

### setMaxDelegateAddresses

Set an account to have more or less than the DEFAULT_MAX_DELEGATE_ADDRESSES
number of delegates.

```solidity
function setMaxDelegateAddresses(address account, uint32 maxDelegateAddresses) external;
```

### depositUndelegatedGohm

gOHM is pulled from the calling policy and added to the undelegated balance.

- This gOHM cannot be used for governance voting until it is delegated.
- Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited*

```solidity
function depositUndelegatedGohm(address onBehalfOf, uint256 amount) external;
```

### withdrawUndelegatedGohm

Undelegated gOHM is transferred to the calling policy.

- If `autoRescindMaxNumDelegates` is greater than zero, the delegations will be automatically rescinded if required
from up to `autoRescindMaxNumDelegates` number of delegate escrows. See `rescindDelegations()` for details
- Will revert if there is still not enough undelegated gOHM for `onBehalfOf` OR
if policy is attempting to withdraw more gOHM than it deposited
Deposted gOHM balances are tracked per policy. policyA cannot withdraw gOHM that policyB deposited*

```solidity
function withdrawUndelegatedGohm(address onBehalfOf, uint256 amount, uint256 autoRescindMaxNumDelegates) external;
```

### applyDelegations

Apply a set of delegation requests on behalf of a given account.

- Each delegation request either delegates or undelegates to an address
- It applies across total gOHM balances for a given account across all calling policies
So policyA may (un)delegate the account's gOHM set by policyA, B and C

```solidity
function applyDelegations(address onBehalfOf, DelegationRequest[] calldata delegationRequests)
    external
    returns (uint256 totalDelegated, uint256 totalUndelegated, uint256 undelegatedBalance);
```

### rescindDelegations

Rescind delegations until the amount undelegated for the `onBehalfOf` account
is greater or equal to `requestedUndelegatedBalance`. No more than `maxNumDelegates`
will be rescinded as part of this

- Delegations are rescinded by iterating through the delegate addresses for the
`onBehalfOf` address.
- No guarantees on the order of who is rescinded -- it may change as delegations are
removed
- A calling policy may be able to rescind more than it added via `depositUndelegatedGohm()`
however the policy cannot then withdraw an amount higher than what it deposited.
- If the full `requestedUndelegatedBalance` cannot be fulfilled the `actualUndelegatedBalance`
return parameter may be less than `requestedUndelegatedBalance`. The caller must decide
on how to handle that.*

```solidity
function rescindDelegations(address onBehalfOf, uint256 requestedUndelegatedBalance, uint256 maxNumDelegates)
    external
    returns (uint256 totalRescinded, uint256 newUndelegatedBalance);
```

### policyAccountBalances

Report the total delegated and undelegated gOHM balance for an account
in a given policy

```solidity
function policyAccountBalances(address policy, address account) external view returns (uint256 gOhmBalance);
```

### accountDelegationsList

Paginated view of an account's delegations

*This can be called sequentially, increasing the `startIndex` each time by the number of items
returned in the previous call, until number of items returned is less than `maxItems`
The `totalAmount` delegated within the return struct is across all policies for that account delegate*

```solidity
function accountDelegationsList(address account, uint256 startIndex, uint256 maxItems)
    external
    view
    returns (AccountDelegation[] memory delegations);
```

### accountDelegationSummary

A summary of an account's delegations

```solidity
function accountDelegationSummary(address account)
    external
    view
    returns (
        uint256 totalGOhm,
        uint256 delegatedGOhm,
        uint256 numDelegateAddresses,
        uint256 maxAllowedDelegateAddresses
    );
```

### totalDelegatedTo

The total amount delegated to a particular delegate across all policies,
and externally made delegations (including any permanent donations)

```solidity
function totalDelegatedTo(address delegate) external view returns (uint256);
```

### maxDelegateAddresses

The maximum number of delegates an account can have accross all policies

```solidity
function maxDelegateAddresses(address account) external view returns (uint32 result);
```

### gOHM

The gOhm token supplied by accounts

```solidity
function gOHM() external view returns (IERC20);
```

### DEFAULT_MAX_DELEGATE_ADDRESSES

The default maximum number of addresses an account can delegate to

```solidity
function DEFAULT_MAX_DELEGATE_ADDRESSES() external view returns (uint32);
```

## Events

### DelegationApplied

```solidity
event DelegationApplied(address indexed account, address indexed delegate, int256 amount);
```

### MaxDelegateAddressesSet

```solidity
event MaxDelegateAddressesSet(address indexed account, uint256 maxDelegateAddresses);
```

## Errors

### DLGTE_InvalidAddress

```solidity
error DLGTE_InvalidAddress();
```

### DLGTE_InvalidDelegationRequests

```solidity
error DLGTE_InvalidDelegationRequests();
```

### DLGTE_TooManyDelegates

```solidity
error DLGTE_TooManyDelegates();
```

### DLGTE_InvalidDelegateEscrow

```solidity
error DLGTE_InvalidDelegateEscrow();
```

### DLGTE_InvalidAmount

```solidity
error DLGTE_InvalidAmount();
```

### DLGTE_ExceededUndelegatedBalance

```solidity
error DLGTE_ExceededUndelegatedBalance(uint256 balance, uint256 requested);
```

### DLGTE_ExceededDelegatedBalance

```solidity
error DLGTE_ExceededDelegatedBalance(address delegate, uint256 balance, uint256 requested);
```

### DLGTE_ExceededPolicyAccountBalance

```solidity
error DLGTE_ExceededPolicyAccountBalance(uint256 balance, uint256 requested);
```

## Structs

### DelegationRequest

```solidity
struct DelegationRequest {
    address delegate;
    int256 amount;
}
```

### AccountDelegation

```solidity
struct AccountDelegation {
    address delegate;
    uint256 amount;
    address escrow;
}
```
