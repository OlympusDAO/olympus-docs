# LZBridgeActivator

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/proposals/LZBridgeActivator.sol)

**Inherits:** Owned

**Title:** LZBridgeActivator

Single-use contract to configure and activate the LZBridgeGateway during the
OCG proposal. Batches all endpoint configuration, peer setup, enforced options,
per-endpoint bidirectional rate limits and enablement into a single proposal action,
working around the governor's 15-action limit.

<i>

Assumes:

- The `admin`, `bridge_admin`, and `bridge_configurator` roles have been granted to
this contract for the duration of the activation. `bridge_configurator` is the role
that gates the privileged configuration mutators on the gateway and the LZ
endpoint delegate; granting it temporarily lets the activator drive setup
directly, without routing the calls through the LZBridgeAndDelegateConfig timelock.
All three are revoked immediately after `activate()`, leaving `bridge_configurator`
only on the LZBridgeAndDelegateConfig policy.
- The gateway and the LZEndpointDelegate policy have been activated in the Kernel
(by the DAO MS pre-OCG).
- The caller is this contract's owner (the OCG timelock).

</i>

`activate()` points the gateway's endpoint delegate at the LZEndpointDelegate policy and
drives all OApp-authorized endpoint calls through that policy (libraries, ULN/Executor config).
Gateway-level operations (setPeer, setEnforcedOptions, enable) are called through the
gateway's role-gated functions directly. The delegate assignment is the steady-state
configuration and is not revoked when activation completes; subsequent OApp-authorized
endpoint operations continue to go through LZEndpointDelegate.

## Constants

### _REMOTE_CHAIN_COUNT

<i>

Number of remote chains configured by this activator.

</i>

```solidity
uint256 internal constant _REMOTE_CHAIN_COUNT = 4;
```

### GATEWAY

```solidity
address public immutable GATEWAY;
```

### DELEGATE

```solidity
address public immutable DELEGATE;
```

### ENDPOINT

```solidity
address public immutable ENDPOINT;
```

### ARB_GATEWAY

```solidity
address public immutable ARB_GATEWAY;
```

### OPT_GATEWAY

```solidity
address public immutable OPT_GATEWAY;
```

### BASE_GATEWAY

```solidity
address public immutable BASE_GATEWAY;
```

### BERA_GATEWAY

```solidity
address public immutable BERA_GATEWAY;
```

## State Variables

### isActivated

```solidity
bool public isActivated;
```

## Functions

<a id="constructor-address-address-address-address-address-address-address-address"></a>

### constructor

```solidity
constructor(
        address owner_,
        address gateway_,
        address delegate_,
        address endpoint_,
        address arbGateway_,
        address optGateway_,
        address baseGateway_,
        address beraGateway_
    ) Owned(owner_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | `address` | The OCG timelock address. |
| gateway_ | `address` | The LZBridgeGateway address on this chain. |
| delegate_ | `address` | The LZEndpointDelegate policy address on this chain. |
| endpoint_ | `address` | The LayerZero V2 endpoint address. |
| arbGateway_ | `address` | Remote gateway on Arbitrum. |
| optGateway_ | `address` | Remote gateway on Optimism. |
| baseGateway_ | `address` | Remote gateway on Base. |
| beraGateway_ | `address` | Remote gateway on Berachain. |

<a id="activate"></a>

### activate

Configures and activates the LZBridgeGateway.

<i>

This function assumes:

- The `admin`, `bridge_admin`, and `bridge_configurator` roles have been granted
to this contract for the duration of the activation.
- The LZEndpointDelegate policy is active in the Kernel.

</i>

This function reverts if:

- The caller is not the owner.
- The function has already been run.

```solidity
function activate() external onlyOwner;
```

<a id="_configurelzendpoint"></a>

### _configureLZEndpoint

<i>

Configures the LZ V2 endpoint via the LZEndpointDelegate policy: pin libraries and
set ULN/Executor config for all 4 remote chains.

</i>

```solidity
function _configureLZEndpoint() internal;
```

<a id="_setpeers"></a>

### _setPeers

<i>

Sets peers on the gateway for all 4 remote chains.

</i>

```solidity
function _setPeers() internal;
```

<a id="_setenforcedoptions"></a>

### _setEnforcedOptions

<i>

Sets enforced options (200k gas minimum) for all 4 remote chains.

</i>

```solidity
function _setEnforcedOptions() internal;
```

<a id="_setratelimits"></a>

### _setRateLimits

<i>

Sets bidirectional rate limits on the gateway for all 4 remote chains.
Outbound limit applies to OHM leaving the canonical chain; inbound limit
applies to OHM arriving from a remote chain. Window and per-direction
limits are sourced from `LZConfigLib`.

</i>

```solidity
function _setRateLimits() internal;
```

<a id="_enable"></a>

### _enable

<i>

Enables the gateway policy.

</i>

```solidity
function _enable() internal;
```

<a id="_requirenonzeroaddress-address-string"></a>

### _requireNonzeroAddress

```solidity
function _requireNonzeroAddress(address address_, string memory parameter_) private pure;
```

**Parameters**

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| address_   | `address` |             |
| parameter_ | `string`  |             |

## Events

### Activated

```solidity
event Activated(address caller);
```

**Parameters**

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| caller | `address` |             |

## Errors

### AlreadyActivated

```solidity
error AlreadyActivated();
```

### InvalidParams

```solidity
error InvalidParams(string reason);
```

**Parameters**

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| reason | `string` |             |
