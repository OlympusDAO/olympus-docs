# MINTRv1





Wrapper for minting and burning functions of OHM token.



## Methods

### INIT

```solidity
function INIT() external nonpayable
```

Initialization function for the module

*This function is called when the module is installed or upgraded by the kernel.MUST BE GATED BY onlyKernel. Used to encompass any initialization or upgrade logic.*


### KEYCODE

```solidity
function KEYCODE() external pure returns (Keycode)
```

5 byte identifier for a module.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Keycode | undefined |

### VERSION

```solidity
function VERSION() external pure returns (uint8 major, uint8 minor)
```

Returns which semantic version of a module is being implemented.




#### Returns

| Name | Type | Description |
|---|---|---|
| major | uint8 | - Major version upgrade indicates breaking change to the interface. |
| minor | uint8 | - Minor version change retains backward-compatible interface. |

### activate

```solidity
function activate() external nonpayable
```

Re-activate minting and burning after shutdown.




### active

```solidity
function active() external view returns (bool)
```

Status of the minter. If false, minting and burning OHM is disabled.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### burnOhm

```solidity
function burnOhm(address from_, uint256 amount_) external nonpayable
```

Burn OHM from an address. Must have approval.



#### Parameters

| Name | Type | Description |
|---|---|---|
| from_ | address | undefined |
| amount_ | uint256 | undefined |

### changeKernel

```solidity
function changeKernel(contract Kernel newKernel_) external nonpayable
```

Function used by kernel when migrating to a new kernel.



#### Parameters

| Name | Type | Description |
|---|---|---|
| newKernel_ | contract Kernel | undefined |

### deactivate

```solidity
function deactivate() external nonpayable
```

Emergency shutdown of minting and burning.




### decreaseMintApproval

```solidity
function decreaseMintApproval(address policy_, uint256 amount_) external nonpayable
```

Decrease approval for specific withdrawer addresses



#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |
| amount_ | uint256 | undefined |

### increaseMintApproval

```solidity
function increaseMintApproval(address policy_, uint256 amount_) external nonpayable
```

Increase approval for specific withdrawer addresses

*Policies must explicity request how much they want approved before withdrawing.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |
| amount_ | uint256 | undefined |

### kernel

```solidity
function kernel() external view returns (contract Kernel)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract Kernel | undefined |

### mintApproval

```solidity
function mintApproval(address) external view returns (uint256)
```

Mapping of who is approved for minting.

*minter -&gt; amount. Infinite approval is max(uint256).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### mintOhm

```solidity
function mintOhm(address to_, uint256 amount_) external nonpayable
```

Mint OHM to an address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| to_ | address | undefined |
| amount_ | uint256 | undefined |

### ohm

```solidity
function ohm() external view returns (contract OlympusERC20Token)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract OlympusERC20Token | undefined |



## Events

### Burn

```solidity
event Burn(address indexed policy_, address indexed from_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| from_ `indexed` | address | undefined |
| amount_  | uint256 | undefined |

### DecreaseMintApproval

```solidity
event DecreaseMintApproval(address indexed policy_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| newAmount_  | uint256 | undefined |

### IncreaseMintApproval

```solidity
event IncreaseMintApproval(address indexed policy_, uint256 newAmount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| newAmount_  | uint256 | undefined |

### Mint

```solidity
event Mint(address indexed policy_, address indexed to_, uint256 amount_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ `indexed` | address | undefined |
| to_ `indexed` | address | undefined |
| amount_  | uint256 | undefined |



## Errors

### KernelAdapter_OnlyKernel

```solidity
error KernelAdapter_OnlyKernel(address caller_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| caller_ | address | undefined |

### MINTR_NotActive

```solidity
error MINTR_NotActive()
```






### MINTR_NotApproved

```solidity
error MINTR_NotApproved()
```






### MINTR_ZeroAmount

```solidity
error MINTR_ZeroAmount()
```






### Module_PolicyNotPermitted

```solidity
error Module_PolicyNotPermitted(address policy_)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| policy_ | address | undefined |


