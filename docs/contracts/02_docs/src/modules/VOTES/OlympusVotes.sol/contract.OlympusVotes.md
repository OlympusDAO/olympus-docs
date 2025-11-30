# OlympusVotes

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/afb0b906736ae1fb0a1c7b073969ad005255fc15/src/modules/VOTES/OlympusVotes.sol)

**Inherits:**
[VOTESv1](/main/contracts/docs/src/modules/VOTES/VOTES.v1.sol/abstract.VOTESv1)

Votes module is the ERC20 token that represents voting power in the network.

## Functions

### constructor

```solidity
constructor(Kernel kernel_, ERC20 gOhm_) Module(kernel_) ERC4626(gOhm_, "Olympus Votes", "vOHM");
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

### deposit

```solidity
function deposit(uint256 assets_, address receiver_) public override permissioned returns (uint256);
```

### mint

```solidity
function mint(uint256 shares_, address receiver_) public override permissioned returns (uint256);
```

### withdraw

```solidity
function withdraw(uint256 assets_, address receiver_, address owner_)
    public
    override
    permissioned
    returns (uint256);
```

### redeem

```solidity
function redeem(uint256 shares_, address receiver_, address owner_) public override permissioned returns (uint256);
```

### transfer

Transfers are locked for this token.

```solidity
function transfer(address to_, uint256 amt_) public override permissioned returns (bool);
```

### transferFrom

TransferFrom is only allowed by permissioned policies.

```solidity
function transferFrom(address from_, address to_, uint256 amount_) public override permissioned returns (bool);
```

### resetActionTimestamp

```solidity
function resetActionTimestamp(address _wallet) external override permissioned;
```

### totalAssets

```solidity
function totalAssets() public view override returns (uint256);
```
