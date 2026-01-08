# OlympusMinter

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/a33d3e5c59822df96ec00f47c9c19aefe3ceb9cb/src/modules/MINTR/OlympusMinter.sol)

**Inherits:**
[MINTRv1](/main/contracts/docs/src/modules/MINTR/MINTR.v1.sol/abstract.MINTRv1)

Wrapper for minting and burning functions of OHM token.

## Functions

### constructor

```solidity
constructor(Kernel kernel_, address ohm_) Module(kernel_);
```

### KEYCODE

5 byte identifier for a module.

```solidity
function KEYCODE() public pure override returns (Keycode);
```

### VERSION

Returns which semantic version of a module is being implemented.

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`major`|`uint8`|- Major version upgrade indicates breaking change to the interface.|
|`minor`|`uint8`|- Minor version change retains backward-compatible interface.|

### mintOhm

Mint OHM to an address.

```solidity
function mintOhm(address to_, uint256 amount_) external override permissioned onlyWhileActive;
```

### burnOhm

Burn OHM from an address. Must have approval.

```solidity
function burnOhm(address from_, uint256 amount_) external override permissioned onlyWhileActive;
```

### increaseMintApproval

Increase approval for specific withdrawer addresses

Policies must explicity request how much they want approved before withdrawing.

```solidity
function increaseMintApproval(address policy_, uint256 amount_) external override permissioned;
```

### decreaseMintApproval

Decrease approval for specific withdrawer addresses

```solidity
function decreaseMintApproval(address policy_, uint256 amount_) external override permissioned;
```

### deactivate

Emergency shutdown of minting and burning.

```solidity
function deactivate() external override permissioned;
```

### activate

Re-activate minting and burning after shutdown.

```solidity
function activate() external override permissioned;
```
