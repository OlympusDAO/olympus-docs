# ContractRegistryProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/ContractRegistryProposal.sol)

**Inherits:** GovernorBravoProposal

Activates the contract registry module and associated configuration policy.

## Constants

### DAI

```solidity
address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
```

### SDAI

```solidity
address public constant SDAI = 0x83F20F44975D03b1b09e64809B757c47f942BEeA;
```

### USDS

```solidity
address public constant USDS = 0xdC035D45d973E3EC169d2276DDab16f1e407384F;
```

### SUSDS

```solidity
address public constant SUSDS = 0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD;
```

### GOHM

```solidity
address public constant GOHM = 0x0ab87046fBb341D058F17CBC4c1133F25a20a52f;
```

### OHM

```solidity
address public constant OHM = 0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5;
```

### FLASH_LENDER

```solidity
address public constant FLASH_LENDER = 0x60744434d6339a6B27d73d9Eda62b6F66a0a04FA;
```

### DAI_USDS_MIGRATOR

```solidity
address public constant DAI_USDS_MIGRATOR = 0x3225737a9Bbb6473CB4a45b7244ACa2BeFdB276A;
```

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

## Functions

<a id="id"></a>

### id

```solidity
function id() public pure override returns (uint256);
```

**Returns**

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| &lt;none&gt; | `uint256` |             |

<a id="name"></a>

### name

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="description"></a>

### description

```solidity
function description() public pure override returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_deploy-addresses-address"></a>

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_afterdeploy-addresses-address"></a>

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| deployer  | `address`   |             |

<a id="_build-addresses"></a>

### _build

```solidity
function _build(Addresses addresses) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |

<a id="_run-addresses-address"></a>

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

<a id="_validate-addresses-address"></a>

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |
