# MINTRv1

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/08cb07a6ec9482918b69760e0bdfbf4b788e34ea/src/modules/MINTR/MINTR.v1.sol)

**Inherits:**
[Module](/main/contracts/docs/src/Kernel.sol/abstract.Module)

Wrapper for minting and burning functions of OHM token.

## State Variables

### ohm

```solidity
OHM public ohm
```

### active

Status of the minter. If false, minting and burning OHM is disabled.

```solidity
bool public active
```

### mintApproval

Mapping of who is approved for minting.

minter -> amount. Infinite approval is max(uint256).

```solidity
mapping(address => uint256) public mintApproval
```

## Functions

### onlyWhileActive

```solidity
modifier onlyWhileActive() ;
```

### mintOhm

Mint OHM to an address.

```solidity
function mintOhm(address to_, uint256 amount_) external virtual;
```

### burnOhm

Burn OHM from an address. Must have approval.

```solidity
function burnOhm(address from_, uint256 amount_) external virtual;
```

### increaseMintApproval

Increase approval for specific withdrawer addresses

Policies must explicity request how much they want approved before withdrawing.

```solidity
function increaseMintApproval(address policy_, uint256 amount_) external virtual;
```

### decreaseMintApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseMintApproval(address policy_, uint256 amount_) external virtual;
```

### deactivate

Emergency shutdown of minting and burning.

```solidity
function deactivate() external virtual;
```

### activate

Re-activate minting and burning after shutdown.

```solidity
function activate() external virtual;
```

## Events

### IncreaseMintApproval

```solidity
event IncreaseMintApproval(address indexed policy_, uint256 newAmount_);
```

### DecreaseMintApproval

```solidity
event DecreaseMintApproval(address indexed policy_, uint256 newAmount_);
```

### Mint

```solidity
event Mint(address indexed policy_, address indexed to_, uint256 amount_);
```

### Burn

```solidity
event Burn(address indexed policy_, address indexed from_, uint256 amount_);
```

## Errors

### MINTR_NotApproved

```solidity
error MINTR_NotApproved();
```

### MINTR_ZeroAmount

```solidity
error MINTR_ZeroAmount();
```

### MINTR_NotActive

```solidity
error MINTR_NotActive();
```
