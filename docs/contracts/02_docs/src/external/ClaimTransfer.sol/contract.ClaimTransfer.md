# ClaimTransfer

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/b214bbf24fd3cf5d2d9c92dfcdc682d8721bf8db/src/external/ClaimTransfer.sol)

*This contract is used to fractionalize pOLY claims and transfer portions of a user's claim to other addresses*

## State Variables

### pOLY

```solidity
IPOLY public pOLY;
```

### OHM

```solidity
ERC20 public OHM;
```

### DAI

```solidity
ERC20 public DAI;
```

### gOHM

```solidity
IgOHM public gOHM;
```

### fractionalizedTerms

```solidity
mapping(address => Term) public fractionalizedTerms;
```

### allowance

```solidity
mapping(address => mapping(address => uint256)) public allowance;
```

## Functions

### constructor

```solidity
constructor(address poly_, address ohm_, address dai_, address gohm_);
```

### fractionalizeClaim

Convert pOLY claim that can only be fully transfered to a new wallet to a fractionalized claim

```solidity
function fractionalizeClaim() external;
```

### claim

Claim OHM from the pOLY contract via your fractionalized claim

```solidity
function claim(uint256 amount_) external;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount_`|`uint256`|Amount of DAI to send to the pOLY contract|

### redeemableFor

Calculate the amount of OHM that can be redeemed for a given address's fractionalized claim

```solidity
function redeemableFor(address user_) external view returns (uint256, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user_`|`address`|Address of the user|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount of OHM the account can redeem|
|`<none>`|`uint256`|uint256 The amount of DAI required to claim the amount of OHM|

### approve

Approve a spender to spend a certain amount of your fractionalized claim (denominated in the `percent` value of a Term)

```solidity
function approve(address spender_, uint256 amount_) external returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender_`|`address`|Address of the spender|
|`amount_`|`uint256`|Amount of your fractionalized claim to approve|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool|

### transfer

Transfer a portion of your fractionalized claim to another address

*Transferring a portion of your claim transfers both based on the percentage and claimable amount of OHM.
The recipient will receive a claimable amount of OHM commensurate to the percentage of the sender's max claim
ignoring what the sender has already claimed. Say the sender has a percent of 10_000 and a max claim of 100 OHM.
They claim 10 OHM, leaving 90 OHM claimable. If they transfer 50% of their claim (5_000), the recipient gets a
max value of 55 and the commensurate gClaimed so they have a true claimable amount of 50 OHM. The sender's
fractionalized claim is updated to reflect the transfer.*

```solidity
function transfer(address to_, uint256 amount_) external returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to_`|`address`|Address of the recipient|
|`amount_`|`uint256`|Amount of your fractionalized claim to transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool|

### transferFrom

Transfer a portion of a fractionalized claim from another address to a recipient (must have approval)

*Transferring a portion of your claim transfers both based on the percentage and claimable amount of OHM.
The recipient will receive a claimable amount of OHM commensurate to the percentage of the sender's max claim
ignoring what the sender has already claimed. Say the sender has a percent of 10_000 and a max claim of 100 OHM.
They claim 10 OHM, leaving 90 OHM claimable. If they transfer 50% of their claim (5_000), the recipient gets a
max value of 55 and the commensurate gClaimed so they have a true claimable amount of 50 OHM. The sender's
fractionalized claim is updated to reflect the transfer.*

```solidity
function transferFrom(address from_, address to_, uint256 amount_) external returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from_`|`address`|Address of the sender|
|`to_`|`address`|Address of the recipient|
|`amount_`|`uint256`|Amount of the sender's fractionalized claim to transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool|

### _transfer

```solidity
function _transfer(address from_, address to_, uint256 amount_) internal;
```

## Errors

### CT_IllegalClaim

```solidity
error CT_IllegalClaim();
```

## Structs

### Term

```solidity
struct Term {
    uint256 percent;
    uint256 gClaimed;
    uint256 max;
}
```
