# LZCrossChainBridge

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/periphery/bridge/LZCrossChainBridge.sol)

**Inherits:** Owned, [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [ReEnablerGracePeriod](/main/contracts/docs/src/bases/ReEnablerGracePeriod.sol/abstract.ReEnablerGracePeriod), [ILZCrossChainBridge](/main/contracts/docs/src/periphery/interfaces/ILZCrossChainBridge.sol/interface.ILZCrossChainBridge), [Rescueable](/main/contracts/docs/src/bases/Rescueable.sol/abstract.Rescueable)

**Title:** LZCrossChainBridge

Sends OHM to other chains using LayerZero V2.

<i>

It is a periphery contract, as it does not require any privileged access to the
Olympus protocol. The user approves this contract for OHM, then calls sendOhm().
OHM is transferred to the gateway, which burns it and sends a LayerZero message.

</i>

Authorization for the lifecycle entry points splits responsibilities between the owner
and the address pinned in `configurator` (expected to be an
`LZBridgeAndDelegateConfig` instance, i.e. the timelock policy):

- `enable`, `disable`, `rescue`, and the bootstrap `setConfigurator` call are
restricted to the owner.
- `setGateway`, `setReEnabler`, `setGracePeriod`, and the post-bootstrap rotation of
`setConfigurator` are restricted to the current `configurator`.
- `reEnable` is restricted to the configured `reEnabler`, which is set in the
constructor and may be updated or cleared via `setReEnabler`. A re-enable
additionally requires that the grace window since the last transition has not yet
elapsed.

## Constants

### OHM

Returns the OHM token address.

```solidity
address public immutable override OHM;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

## State Variables

### gateway

Returns the LZBridgeGateway address.

```solidity
address public override gateway;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

### reEnabler

Returns the address authorized to call `reEnable()`.

<i>

Returns `address(0)` when no re-enabler has been configured.

</i>

```solidity
address public override reEnabler;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

### configurator

Returns the configurator address (an `LZBridgeAndDelegateConfig` instance).

<i>

Returns `address(0)` before the owner has performed the bootstrap call.

</i>

```solidity
address public override configurator;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

## Functions

<a id="onlyconfigurator"></a>

### onlyConfigurator

Reverts if `msg.sender` is not the currently configured configurator.

<i>

The check also rejects calls while the configurator variable is unset, i.e.
before the owner has performed the bootstrap `setConfigurator` call.

</i>

```solidity
modifier onlyConfigurator();
```

<a id="_requireconfigurator"></a>

### _requireConfigurator

Reverts if `msg.sender` is not the currently configured configurator.

<i>

The check also rejects calls while the configurator variable is unset, i.e.
before the owner has performed the bootstrap `setConfigurator` call.

</i>

```solidity
function _requireConfigurator() private view;
```

<a id="constructor-address-address-address-address-uint32"></a>

### constructor

```solidity
constructor(
        address ohm_,
        address owner_,
        address gateway_,
        address reEnabler_,
        uint32 grace_
    ) Owned(owner_) ReEnablerGracePeriod(grace_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| ohm_ | `address` |  |
| owner_ | `address` |  |
| gateway_ | `address` |  |
| reEnabler_ | `address` |  |
| grace_ | `uint32` |  |

<a id="version"></a>

### VERSION

Returns the version of the contract

```solidity
function VERSION() external pure override returns (uint8 major, uint8 minor);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| major | `uint8` | - Major version upgrade indicates breaking change to the interface. |
| minor | `uint8` | - Minor version change retains backward-compatible interface. |

<a id="sendohm-uint32-address-uint256"></a>

### sendOhm

Sends OHM to a destination chain via the gateway.

<i>

Reverts if:

- The bridge is not enabled.
- `amount_` is zero.
- The user has insufficient OHM balance or approval.
- The gateway reverts (e.g. no peer configured, rate limit exceeded, gateway not enabled).

</i>

```solidity
function sendOhm(
        uint32 dstEid_,
        address to_,
        uint256 amount_
    ) external payable override givenEnabled;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |

<a id="setgateway-address"></a>

### setGateway

Sets the gateway address.

<i>

Reverts if:

- The caller is not the configurator.
- `gateway_` is the zero address.

</i>

```solidity
function setGateway(address gateway_) external override onlyConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway_ | `address` | The new gateway address. |

<a id="_authorizerescue"></a>

### _authorizeRescue

Hook for subclasses to authorize the caller of `rescue()`.

<i>

Implementations MUST revert if the caller is not authorised.

</i>

```solidity
function _authorizeRescue() internal view override onlyOwner;
```

<a id="setreenabler-address"></a>

### setReEnabler

Sets the address authorized to call `reEnable()`.

<i>

Reverts if:

- The caller is not the configurator.

</i>

```solidity
function setReEnabler(address reEnabler_) external override onlyConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reEnabler_ | `address` | The new re-enabler address, or `address(0)` to clear. |

<a id="setconfigurator-address"></a>

### setConfigurator

Sets the configurator address.

In both cases the new configurator must implement `ILZBridgeAndDelegateConfig`

via ERC-165 to prevent the bridge from being bricked by an incompatible address.

<i>

Reverts if:

- The bootstrap call is made by anyone other than the owner.
- A subsequent rotation is made by anyone other than the current configurator.
- `newConfigurator_` is the zero address.
- `newConfigurator_` does not implement `ILZBridgeAndDelegateConfig` via ERC-165.

</i>

```solidity
function setConfigurator(address newConfigurator_) external override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConfigurator_ | `address` | The new configurator address. |

<a id="estimatesendfee-uint32-address-uint256"></a>

### estimateSendFee

Estimates the fee for sending OHM to a destination chain.

<i>

Proxies to the gateway's estimateSendFee function with empty extra options.

</i>

```solidity
function estimateSendFee(
        uint32 dstEid_,
        address to_,
        uint256 amount_
    ) external view override returns (MessagingFee memory fee);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |
| to_ | `address` | The recipient address on the destination chain. |
| amount_ | `uint256` | The amount of OHM to send. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | `MessagingFee` | The estimated messaging fee (native + lzToken (unused)). |

<a id="sendable-uint32"></a>

### sendable

Returns the current outbound capacity for a destination endpoint, with the
in-flight amount decayed against the current timestamp.

<i>

Proxies to the gateway's sendable function.

</i>

```solidity
function sendable(
        uint32 dstEid_
    ) external view override returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dstEid_ | `uint32` | The LayerZero destination endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed outbound in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be sent to the destination before the<br/>outbound rate limit is exceeded. |

<a id="receivable-uint32"></a>

### receivable

Returns the current inbound capacity for a source endpoint, with the
in-flight amount decayed against the current timestamp.

<i>

Proxies to the gateway's receivable function.

</i>

```solidity
function receivable(
        uint32 srcEid_
    ) external view override returns (uint256 inFlight, uint256 available);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The LayerZero source endpoint ID. |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| inFlight | `uint256` | The decayed inbound in-flight amount at the current timestamp. |
| available | `uint256` | The amount that may still be received from the source before<br/>the inbound rate limit is exceeded. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

```solidity
function supportsInterface(
        bytes4 interfaceId
    ) public view override(ReEnablerGracePeriod, Rescueable) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

<a id="_authorizeenable-bytes"></a>

### _authorizeEnable

Validates that the caller is permitted to enable the contract.

Reverts if:

- The caller is not authorized to perform the enable.

<i>

The function is invoked from `enable` before any state mutation.
The `data_` payload is forwarded unchanged so that authorization
may depend on the contents of the call.

</i>

```solidity
function _authorizeEnable(bytes calldata) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | The calldata payload passed to `enable`. |

<a id="_authorizedisable-bytes"></a>

### _authorizeDisable

Validates that the caller is permitted to disable the contract.

Reverts if:

- The caller is not authorized to perform the disable.

<i>

The function is invoked from `disable` before any state mutation.
The `data_` payload is forwarded unchanged so that authorization
may depend on the contents of the call.

</i>

```solidity
function _authorizeDisable(bytes calldata) internal view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| _ | `bytes` | The calldata payload passed to `disable`. |

<a id="_authorizereenable"></a>

### _authorizeReEnable

The function is invoked from `reEnable` after the state checks pass and before

any state mutation.

Reverts if:

- The caller is not authorized to perform the re-enable.

<i>

Reverts if `msg.sender` is not the configured re-enabler. The check also rejects calls when no re-enabler
has been set (i.e. `reEnabler == address(0)`).

</i>

```solidity
function _authorizeReEnable() internal view override;
```

<a id="_authorizesetgraceperiod"></a>

### _authorizeSetGracePeriod

Validates that the caller is permitted to update the grace window.

Reverts if:

- The caller is not authorized to update the grace window.

<i>

Restricts `setGracePeriod` to the address pinned in `configurator` (expected
to be the `LZBridgeAndDelegateConfig` timelock policy).

</i>

```solidity
function _authorizeSetGracePeriod() internal view override;
```

<a id="validatesetgateway-address"></a>

### validateSetGateway

Validates the payload that would be passed to `setGateway`.

<i>

Reverts if:

- `gateway_` is the zero address.

</i>

```solidity
function validateSetGateway(address gateway_) public pure override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway_ | `address` | The candidate gateway address. |

<a id="validatesetconfigurator-address"></a>

### validateSetConfigurator

Validates the payload that would be passed to `setConfigurator`.

<i>

Reverts if:

- `newConfigurator_` is the zero address.
- `newConfigurator_` does not implement `ILZBridgeAndDelegateConfig` via ERC-165.

</i>

```solidity
function validateSetConfigurator(address newConfigurator_) public view override;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| newConfigurator_ | `address` | The candidate configurator address. |

<a id="_onlyowner"></a>

### _onlyOwner

```solidity
function _onlyOwner() private view;
```

<a id="_setgateway-address"></a>

### _setGateway

```solidity
function _setGateway(address gateway_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| gateway_ | `address` |  |

<a id="_setreenabler-address"></a>

### _setReEnabler

```solidity
function _setReEnabler(address reEnabler_) private;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| reEnabler_ | `address` |  |

<a id="_requirenonzeroaddress-address-string"></a>

### _requireNonzeroAddress

```solidity
function _requireNonzeroAddress(address address_, string memory parameter_) private pure;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| address_ | `address` |  |
| parameter_ | `string` |  |
