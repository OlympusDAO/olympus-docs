# OIP_194A

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/OIP_194A.sol)

**Inherits:** GovernorBravoProposal

OIP-194A updates the Cooler V2 origination LTV target.

## Constants

### TARGET_ORIGINATION_LTV

```solidity
uint96 private constant TARGET_ORIGINATION_LTV = 3_123_183_268_921_960_038_400;
```

### TARGET_ORIGINATION_LTV_TIME

```solidity
uint40 private constant TARGET_ORIGINATION_LTV_TIME = 1_793_059_200;
```

### PROPOSAL_MAX_ORIGINATION_LTV_RATE

```solidity
uint96 private constant PROPOSAL_MAX_ORIGINATION_LTV_RATE = 10_000_000_000_000;
```

### PROPOSAL_MAX_ORIGINATION_LTV_RATE_TIME_DELTA

```solidity
uint32 private constant PROPOSAL_MAX_ORIGINATION_LTV_RATE_TIME_DELTA = 1;
```

### PREVIOUS_MAX_ORIGINATION_LTV_RATE_TIME_DELTA

```solidity
uint32 private constant PREVIOUS_MAX_ORIGINATION_LTV_RATE_TIME_DELTA = 1;
```

## State Variables

### _kernel

```solidity
Kernel internal _kernel;
```

### _previousMaxOriginationLtvRate

```solidity
uint96 internal _previousMaxOriginationLtvRate;
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
function _afterDeploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name      | Type        | Description |
| --------- | ----------- | ----------- |
| addresses | `Addresses` |             |
| _         | `address`   |             |

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
