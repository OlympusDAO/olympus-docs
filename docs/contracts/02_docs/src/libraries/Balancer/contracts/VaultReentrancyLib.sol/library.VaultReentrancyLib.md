# VaultReentrancyLib

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/85927f39f9ef0f1355aa04e3451eec63a7df478f/src/libraries/Balancer/contracts/VaultReentrancyLib.sol)

## Functions

### ensureNotInVaultContext

Ensure we are not in a Vault context when this function is called, by attempting a no-op internal
balance operation. If we are already in a Vault transaction (e.g., a swap, join, or exit), the Vault's
reentrancy protection will cause this function to revert.
The exact function call doesn't really matter: we're just trying to trigger the Vault reentrancy check
(and not hurt anything in case it works). An empty operation array with no specific operation at all works
for that purpose, and is also the least expensive in terms of gas and bytecode size.
Call this at the top of any function that can cause a state change in a pool and is either public itself,
or called by a public function _outside_ a Vault operation (e.g., join, exit, or swap).
If this is _not_ called in functions that are vulnerable to the read-only reentrancy issue described
here (<https://forum.balancer.fi/t/reentrancy-vulnerability-scope-expanded/4345>), those functions are unsafe,
and subject to manipulation that may result in loss of funds.

```solidity
function ensureNotInVaultContext(IVault vault) internal view;
```
