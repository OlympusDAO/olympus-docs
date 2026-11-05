# ConvertibleDepositProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/ConvertibleDepositProposal.sol)

**Inherits:** GovernorBravoProposal

Combined proposal that enables and configures the Convertible Deposit system

## Constants

### CDF_NAME

```solidity
string internal constant CDF_NAME = "cdf";
```

### USDS_MAX_CAPACITY

```solidity
uint256 internal constant USDS_MAX_CAPACITY = 1_000_000e18;
```

### USDS_MIN_DEPOSIT

```solidity
uint256 internal constant USDS_MIN_DEPOSIT = 1e18;
```

### PERIOD_1M

```solidity
uint8 internal constant PERIOD_1M = 1;
```

### PERIOD_2M

```solidity
uint8 internal constant PERIOD_2M = 2;
```

### PERIOD_3M

```solidity
uint8 internal constant PERIOD_3M = 3;
```

### RECLAIM_RATE

```solidity
uint16 internal constant RECLAIM_RATE = 90e2;
```

### CDA_INITIAL_TARGET

```solidity
uint256 internal constant CDA_INITIAL_TARGET = 0;
```

### CDA_INITIAL_TICK_SIZE

```solidity
uint256 internal constant CDA_INITIAL_TICK_SIZE = 0;
```

### CDA_INITIAL_MIN_PRICE

```solidity
uint256 internal constant CDA_INITIAL_MIN_PRICE = 0;
```

### CDA_INITIAL_TICK_STEP_MULTIPLIER

```solidity
uint24 internal constant CDA_INITIAL_TICK_STEP_MULTIPLIER = 10075;
```

### CDA_AUCTION_TRACKING_PERIOD

```solidity
uint8 internal constant CDA_AUCTION_TRACKING_PERIOD = 7;
```

### EM_BASE_EMISSIONS_RATE

```solidity
uint256 internal constant EM_BASE_EMISSIONS_RATE = 200000;
```

### EM_MINIMUM_PREMIUM

```solidity
uint256 internal constant EM_MINIMUM_PREMIUM = 5e17;
```

### EM_BACKING

```solidity
uint256 internal constant EM_BACKING = 11690000000000000000;
```

### EM_TICK_SIZE

```solidity
uint256 internal constant EM_TICK_SIZE = 150e9;
```

### EM_MIN_PRICE_SCALAR

```solidity
uint256 internal constant EM_MIN_PRICE_SCALAR = 12e17;
```

### EM_BOND_MARKET_CAPACITY_SCALAR

```solidity
uint256 internal constant EM_BOND_MARKET_CAPACITY_SCALAR = 0;
```

### EM_RESTART_TIMEFRAME

```solidity
uint48 internal constant EM_RESTART_TIMEFRAME = 950400;
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

<a id="_getheadersection"></a>

### _getHeaderSection

<i>

Returns the header and summary section of the proposal description

</i>

```solidity
function _getHeaderSection() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getcontractssection"></a>

### _getContractsSection

<i>

Returns the affected contracts section of the proposal description

</i>

```solidity
function _getContractsSection() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getresourcesandprerequisitessection"></a>

### _getResourcesAndPrerequisitesSection

<i>

Returns the resources and prerequisites section of the proposal description

</i>

```solidity
function _getResourcesAndPrerequisitesSection() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getproposalstepssection"></a>

### _getProposalStepsSection

<i>

Returns the proposal steps section of the proposal description

</i>

```solidity
function _getProposalStepsSection() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getproposalstepsphase1and2"></a>

### _getProposalStepsPhase1and2

<i>

Returns Phase 1 and 2 of the proposal steps

</i>

```solidity
function _getProposalStepsPhase1and2() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getproposalstepsphase3part1"></a>

### _getProposalStepsPhase3Part1

<i>

Returns the first part of Phase 3 steps

</i>

```solidity
function _getProposalStepsPhase3Part1() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getproposalstepsphase3part2"></a>

### _getProposalStepsPhase3Part2

<i>

Returns the second part of Phase 3 steps

</i>

```solidity
function _getProposalStepsPhase3Part2() private pure returns (string memory);
```

**Returns**

| Name         | Type     | Description |
| ------------ | -------- | ----------- |
| &lt;none&gt; | `string` |             |

<a id="_getconclusionsection"></a>

### _getConclusionSection

<i>

Returns the conclusion section of the proposal description

</i>

```solidity
function _getConclusionSection() private pure returns (string memory);
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
