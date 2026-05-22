# OracleProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/caef4795cd4dfccadc4085516cabe05757745f02/src/proposals/OracleProposal.sol)

**Inherits:**
GovernorBravoProposal

forge-lint: disable-start(mixed-case-variable)

OracleProposal: Enable Oracle Policies and Deploy OHM/USDS Oracles

This proposal enables the oracle policies and deploys initial OHM/USDS oracles

## State Variables

### \_kernel

```solidity
Kernel internal _kernel
```

### DEFAULT_ORACLE_MAX_AGE

```solidity
uint48 internal constant DEFAULT_ORACLE_MAX_AGE = 1 hours
```

### CHAINLINK_BTC_USD

```solidity
address internal constant CHAINLINK_BTC_USD = 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c
```

### CHAINLINK_DAI_USD

```solidity
address internal constant CHAINLINK_DAI_USD = 0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9
```

### CHAINLINK_ETH_BTC

```solidity
address internal constant CHAINLINK_ETH_BTC = 0xAc559F25B1619171CbC396a50854A3240b6A4e99
```

### CHAINLINK_ETH_USD

```solidity
address internal constant CHAINLINK_ETH_USD = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
```

### CHAINLINK_OHM_ETH

```solidity
address internal constant CHAINLINK_OHM_ETH = 0x9a72298ae3886221820B1c878d12D872087D3a23
```

### CHAINLINK_USDS_USD

```solidity
address internal constant CHAINLINK_USDS_USD = 0xfF30586cD0F29eD462364C7e81375FC0C71219b1
```

### PYTH

```solidity
address internal constant PYTH = 0x4305FB66699C3B2702D4d05CF36551390A4c69C6
```

### REDSTONE_ETH_USD

```solidity
address internal constant REDSTONE_ETH_USD = 0x67F6838e58859d612E4ddF04dA396d6DABB66Dc4
```

### PYTH_ETH_USD_ID

```solidity
bytes32 internal constant PYTH_ETH_USD_ID = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
```

### PYTH_USDS_USD_ID

```solidity
bytes32 internal constant PYTH_USDS_USD_ID = 0x77f0971af11cc8bac224917275c1bf55f2319ed5c654a1ca955c82fa2d297ea1
```

### PYTH_ETH_USD_UPDATE_THRESHOLD

```solidity
uint256 internal constant PYTH_ETH_USD_UPDATE_THRESHOLD = 1 hours
```

### PYTH_USDS_USD_UPDATE_THRESHOLD

```solidity
uint256 internal constant PYTH_USDS_USD_UPDATE_THRESHOLD = 1 days
```

## Functions

### id

```solidity
function id() public pure override returns (uint256);
```

### name

```solidity
function name() public pure override returns (string memory);
```

### description

```solidity
function description() public pure override returns (string memory);
```

### \_deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

### \_afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address deployer) internal override;
```

### \_build

```solidity
function _build(Addresses addresses) internal override;
```

### \_run

```solidity
function _run(Addresses addresses, address) internal override;
```

### \_mockPriceFeedsAtTimelockExecution

GovernorBravoProposal simulates execution after the timelock delay by warping the fork
forward. On a static fork, external oracle contracts do not receive the
Chainlink/Pyth/RedStone updates that would occur during that real elapsed time, so PRICE
can reject otherwise valid proposal actions with stale-feed errors.
The proposal actions depend on PRICE during simulation because deploying the
cache-backed oracle clones seeds/validates the OHM/USDS cache. Preserve the feed answers
from the fork, but move their timestamps to the simulated timelock execution time so the
simulation exercises the proposal logic instead of failing on fork-only clock drift.
These mocks are cleared immediately after simulation and do not affect the calldata
submitted to governance.

```solidity
function _mockPriceFeedsAtTimelockExecution(Addresses addresses) internal;
```

### \_mockChainlinkFeedAt

```solidity
function _mockChainlinkFeedAt(address feed_, uint256 updatedAt_) internal;
```

### \_mockPythFeedAt

```solidity
function _mockPythFeedAt(address pyth_, bytes32 priceFeedId_, uint256 updateThreshold_, IPyth.Price memory price_)
    internal;
```

### \_validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

### \_verifyFactoryConfiguration

```solidity
function _verifyFactoryConfiguration(address factory_, string memory name_, bool isERC7726_, address priceCache_)
    internal
    view;
```
