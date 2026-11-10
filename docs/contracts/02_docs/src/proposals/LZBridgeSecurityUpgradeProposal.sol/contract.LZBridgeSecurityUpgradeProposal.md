# LZBridgeSecurityUpgradeProposal

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/LZBridgeSecurityUpgradeProposal.sol)

**Inherits:** GovernorBravoProposal

OCG proposal for the LayerZero Bridge Security Upgrade.
Replaces the old CrossChainBridge with a hardened LZBridgeGateway policy
that separates infrastructure from user-facing concerns, tracks bridged supply,
and migrates to LayerZero V2 with explicit endpoint configuration, eliminating drag-along vulnerability.
The periphery LZCrossChainBridge is configured separately by the DAO MS.

The LZBridgeActivator performs all endpoint configuration,
peer setup, enforced options, rate limits and enablement in a single proposal action.
It is used to work around the governor's 15-action limit,

Assumes:

- LZBridgeGateway, LZEndpointDelegate, LZCrossChainBridge, LZBridgeActivator have been deployed on Ethereum mainnet.
- Remote instances have been deployed on Arbitrum, Optimism, Base, and Berachain.
- DAO MS has already activated LZBridgeGateway and LZEndpointDelegate in the Kernel.
- OCG timelock already has the `admin` and `bridge_admin` roles.

## Constants

### _REMOTE_CHAIN_COUNT

<i>

Number of remote chains (Arbitrum, Optimism, Base, Berachain).

</i>

```solidity
uint256 internal constant _REMOTE_CHAIN_COUNT = 4;
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

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `uint256` |  |

<a id="name"></a>

### name

```solidity
function name() public pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="description"></a>

### description

```solidity
function description() public pure override returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="_descriptionpreamble"></a>

### _descriptionPreamble

```solidity
function _descriptionPreamble() private pure returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="_descriptionsteps"></a>

### _descriptionSteps

```solidity
function _descriptionSteps() private pure returns (string memory);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `string` |  |

<a id="_deploy-addresses-address"></a>

### _deploy

```solidity
function _deploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_afterdeploy-addresses-address"></a>

### _afterDeploy

```solidity
function _afterDeploy(Addresses addresses, address) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_build-addresses"></a>

### _build

```solidity
function _build(Addresses addresses) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |

<a id="_run-addresses-address"></a>

### _run

```solidity
function _run(Addresses addresses, address) internal override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_validate-addresses-address"></a>

### _validate

```solidity
function _validate(Addresses addresses, address) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addresses | `Addresses` |  |
| _ | `address` |  |

<a id="_validatelzconfig-lzbridgegateway-ilayerzeroendpoint256v2"></a>

### _validateLZConfig

```solidity
function _validateLZConfig(LZBridgeGateway gw, ILayerZeroEndpointV2 ep) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |
| ep | `ILayerZeroEndpointV2` |  |

<a id="_validatelibraries-lzbridgegateway-ilayerzeroendpoint256v2-uint32"></a>

### _validateLibraries

```solidity
function _validateLibraries(
        LZBridgeGateway gw,
        ILayerZeroEndpointV2 ep,
        uint32 eid
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |
| ep | `ILayerZeroEndpointV2` |  |
| eid | `uint32` |  |

<a id="_validatesendconfig-lzbridgegateway-ilayerzeroendpoint256v2-uint32"></a>

### _validateSendConfig

```solidity
function _validateSendConfig(
        LZBridgeGateway gw,
        ILayerZeroEndpointV2 ep,
        uint32 eid
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |
| ep | `ILayerZeroEndpointV2` |  |
| eid | `uint32` |  |

<a id="_validaterecvconfig-lzbridgegateway-ilayerzeroendpoint256v2-uint32-uint64"></a>

### _validateRecvConfig

```solidity
function _validateRecvConfig(
        LZBridgeGateway gw,
        ILayerZeroEndpointV2 ep,
        uint32 eid,
        uint64 expectedConf
    ) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |
| ep | `ILayerZeroEndpointV2` |  |
| eid | `uint32` |  |
| expectedConf | `uint64` |  |

<a id="_validatepeers-lzbridgegateway-lzbridgeactivator"></a>

### _validatePeers

```solidity
function _validatePeers(LZBridgeGateway gw, LZBridgeActivator activator) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |
| activator | `LZBridgeActivator` |  |

<a id="_validateenforcedoptions-lzbridgegateway"></a>

### _validateEnforcedOptions

```solidity
function _validateEnforcedOptions(LZBridgeGateway gw) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |

<a id="_validateratelimits-lzbridgegateway"></a>

### _validateRateLimits

```solidity
function _validateRateLimits(LZBridgeGateway gw) internal view;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gw | `LZBridgeGateway` |  |

<a id="_requirenonzeroaddress-address-string"></a>

### _requireNonZeroAddress

Reverts if the address is zero, including the registry key in the message.

```solidity
function _requireNonZeroAddress(address addr_, string memory key_) internal pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| addr_ | `address` |  |
| key_ | `string` |  |
