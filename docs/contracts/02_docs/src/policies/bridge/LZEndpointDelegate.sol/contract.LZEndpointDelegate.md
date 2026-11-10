# LZEndpointDelegate

[Git Source](https://github.com/OlympusDAO/olympus-v3/blob/5fa826cecd6023bab8135ebb7a48a9313caea5a4/src/policies/bridge/LZEndpointDelegate.sol)

**Inherits:** [ILZEndpointDelegate](/main/contracts/docs/src/policies/interfaces/ILZEndpointDelegate.sol/interface.ILZEndpointDelegate), [ILZEndpointV2Authorized](/main/contracts/docs/src/policies/interfaces/ILZEndpointV2Authorized.sol/interface.ILZEndpointV2Authorized), [IVersioned](/main/contracts/docs/src/interfaces/IVersioned.sol/interface.IVersioned), [Policy](/main/contracts/docs/src/Kernel.sol/abstract.Policy), [PolicyEnablerV2](/main/contracts/docs/src/policies/utils/PolicyEnablerV2.sol/abstract.PolicyEnablerV2)

**Title:** LZEndpointDelegate

Thin policy that proxies LayerZero V2 OApp-authorized endpoint calls on behalf of a single
LZBridgeGateway. It is designed to act as the LayerZero V2 endpoint delegate
for an LZBridgeGateway.

<i>

This contract holds no protocol state beyond the enable/disable lifecycle inherited
from `PolicyEnablerV2`. Every external mutator is gated by both a role check and the
`givenEnabled` modifier.

</i>

## Constants

### _KEYCODE_ROLES

Pre-computed keycode for the ROLES module dependency.

<i>

Avoids the runtime cost of `toKeycode("ROLES")` at the call site.

</i>

```solidity
Keycode internal constant _KEYCODE_ROLES = Keycode.wrap(0x524F4C4553);
```

### LZ_ENDPOINT

The LayerZero V2 endpoint address this delegate proxies to.

```solidity
address public immutable override LZ_ENDPOINT;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

### GATEWAY

The address of the LZBridgeGateway this delegate acts on behalf of.

```solidity
address public immutable override GATEWAY;
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `address` |  |

## Functions

<a id="onlybridgeconfigurator"></a>

### onlyBridgeConfigurator

Reverts if the caller does not hold the `bridge_configurator` role.

<i>

Gated solely by the role; the role is expected to be granted exclusively to
`LZBridgeAndDelegateConfig` (the timelock policy), in which case calls are
dispatched through that policy's timelock queue. Any holder that does not
itself enforce a timelock on these mutators should only be granted the role
temporarily for bootstrap. This contract does not enforce a timelock itself;
it is enforced only by the `LZBridgeAndDelegateConfig` role holder. Granting
`bridge_configurator` to any other address bypasses the timelock for these
mutators.

</i>

```solidity
modifier onlyBridgeConfigurator();
```

<a id="_requirebridgeconfigurator"></a>

### _requireBridgeConfigurator

Reverts with `ROLESv1.ROLES_RequireRole(BRIDGE_CONFIGURATOR_ROLE)` if
`msg.sender` does not hold the `bridge_configurator` role.

```solidity
function _requireBridgeConfigurator() private view;
```

<a id="onlychannelmanager"></a>

### onlyChannelManager

Reverts if the caller holds none of the `bridge_channel_manager`,
`bridge_admin`, or `admin` roles.

<i>

Gates the inbound-channel management primitives (`skip`, `nilify`, `burn`, `clear`).
The `bridge_channel_manager` role is an optional dedicated role for these
primitives, accepted so channel management can be delegated without granting the
broader `bridge_admin` role.

</i>

```solidity
modifier onlyChannelManager();
```

<a id="_requirechannelmanager"></a>

### _requireChannelManager

Reverts with `IPolicyAdmin.NotAuthorised` if `msg.sender` holds none of the
`bridge_channel_manager`, `bridge_admin`, or `admin` roles.

```solidity
function _requireChannelManager() private view;
```

<a id="constructor-kernel-address"></a>

### constructor

<i>

Reverts if:

- The kernel address is the zero address.
- The gateway address is the zero address.
- The LZ endpoint reported by the specified gateway is the zero address.

</i>

```solidity
constructor(Kernel kernel_, address gateway_) Policy(kernel_);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| kernel_ | `Kernel` |  |
| gateway_ | `address` |  |

<a id="configuredependencies"></a>

### configureDependencies

Define module dependencies for this policy.

```solidity
function configureDependencies() external override returns (Keycode[] memory dependencies);
```

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| dependencies | `Keycode[]` | - Keycode array of module dependencies. |

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

<a id="setsendlibrary-uint32-address"></a>

### setSendLibrary

Pins send library for a destination EID.

<i>

Reverts if:

- The contract is disabled.
- The caller does not have the bridge_configurator role.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `setSendLibrary` function reverts.

</i>

```solidity
function setSendLibrary(
        uint32 eid_,
        address lib_
    ) external override givenEnabled onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The destination endpoint ID. |
| lib_ | `address` | The send library address to pin. |

<a id="setreceivelibrary-uint32-address-uint256"></a>

### setReceiveLibrary

Pins receive library for a source EID.

<i>

Reverts if:

- The contract is disabled.
- The caller does not have the bridge_configurator role.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `setReceiveLibrary` function reverts.

</i>

```solidity
function setReceiveLibrary(
        uint32 eid_,
        address lib_,
        uint256 gracePeriod_
    ) external override givenEnabled onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The source endpoint ID. |
| lib_ | `address` | The receive library address to pin. |
| gracePeriod_ | `uint256` | Grace period for migration (0 for immediate). |

<a id="setreceivelibrarytimeout-uint32-address-uint256"></a>

### setReceiveLibraryTimeout

Sets receive library timeout for migration.

<i>

Reverts if:

- The contract is disabled.
- The caller does not have the bridge_configurator role.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `setReceiveLibraryTimeout` function reverts.

</i>

```solidity
function setReceiveLibraryTimeout(
        uint32 eid_,
        address lib_,
        uint256 expiry_
    ) external override givenEnabled onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| eid_ | `uint32` | The source endpoint ID. |
| lib_ | `address` | The library address. |
| expiry_ | `uint256` | The expiry timestamp. |

<a id="setendpointconfig-address-setconfigparam"></a>

### setEndpointConfig

Sets ULN/Executor config on a message library.

<i>

Reverts if:

- The contract is disabled.
- The caller does not have the bridge_configurator role.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `setConfig` function reverts.

</i>

```solidity
function setEndpointConfig(
        address lib_,
        SetConfigParam[] calldata params_
    ) external override givenEnabled onlyBridgeConfigurator;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| lib_ | `address` | The message library address. |
| params_ | `SetConfigParam[]` | Array of config parameters per EID. |

<a id="skip-uint32-bytes32-uint64"></a>

### skip

<i>

On the canonical chain, permanently discarding an inbound OHM mint message via skip
does NOT update the gateway's `bridgedSupply` or its MINTR mint approval. The caller
MUST follow up with a corresponding `LZBridgeGateway.decreaseBridgedSupply` call to
keep the bookkeeping consistent. Depending on the cause of the skip, a separate
governance proposal may also be required to restore the OHM owed to the affected user.

</i>

Reverts if:

- The contract is disabled.
- The caller holds none of the `bridge_channel_manager`, `bridge_admin`, or
`admin` roles.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `skip` function reverts.

```solidity
function skip(
        uint32 srcEid_,
        bytes32 sender_,
        uint64 nonce_
    ) external override givenEnabled onlyChannelManager;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce to skip. |

<a id="nilify-uint32-bytes32-uint64-bytes32"></a>

### nilify

Nilifies a payload for a source path.

<i>

Reverts if:

- The contract is disabled.
- The caller holds none of the `bridge_channel_manager`, `bridge_admin`, or
`admin` roles.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `nilify` function reverts.

</i>

```solidity
function nilify(
        uint32 srcEid_,
        bytes32 sender_,
        uint64 nonce_,
        bytes32 payloadHash_
    ) external override givenEnabled onlyChannelManager;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce of the message. |
| payloadHash_ | `bytes32` | The hash of the payload to nilify. |

<a id="burn-uint32-bytes32-uint64-bytes32"></a>

### burn

<i>

On the canonical chain, permanently discarding an inbound OHM mint message via burn
does NOT update the gateway's `bridgedSupply` or its MINTR mint approval. The caller
MUST follow up with a corresponding `LZBridgeGateway.decreaseBridgedSupply` call to
keep the bookkeeping consistent. Depending on the cause of the burn, a separate
governance proposal may also be required to restore the OHM owed to the affected user.

</i>

Reverts if:

- The contract is disabled.
- The caller holds none of the `bridge_channel_manager`, `bridge_admin`, or
`admin` roles.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `burn` function reverts.

```solidity
function burn(
        uint32 srcEid_,
        bytes32 sender_,
        uint64 nonce_,
        bytes32 payloadHash_
    ) external override givenEnabled onlyChannelManager;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| srcEid_ | `uint32` | The source endpoint ID. |
| sender_ | `bytes32` | The sender address (bytes32). |
| nonce_ | `uint64` | The nonce of the message. |
| payloadHash_ | `bytes32` | The hash of the payload to burn. |

<a id="clear-origin-bytes32-bytes"></a>

### clear

<i>

On the canonical chain, clearing an inbound OHM mint message bypasses the gateway's
`lzReceive` handler, so `bridgedSupply` is not decremented and the MINTR mint approval
is not consumed. The caller MUST follow up with a corresponding
`LZBridgeGateway.decreaseBridgedSupply` call to keep the bookkeeping consistent.
Depending on the cause of the clear, a separate governance proposal may also be
required to restore the OHM owed to the affected user.

</i>

Reverts if:

- The contract is disabled.
- The caller holds none of the `bridge_channel_manager`, `bridge_admin`, or
`admin` roles.
- The gateway has not set this contract as its endpoint delegate.
- The LZ endpoint's `clear` function reverts.

```solidity
function clear(
        Origin calldata origin_,
        bytes32 guid_,
        bytes calldata message_
    ) external override givenEnabled onlyChannelManager;
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| origin_ | `Origin` | The origin of the message. |
| guid_ | `bytes32` | The GUID of the message. |
| message_ | `bytes` | The message bytes. |

<a id="supportsinterface-bytes4"></a>

### supportsInterface

<i>

The contract advertises support for `IEnablerV2`, the legacy
`IEnabler`, and any interface advertised by the parent
`ERC165` implementation. Extension mixins are expected to
override this function and add their own interface identifiers.

</i>

```solidity
function supportsInterface(
        bytes4 interfaceId_
    ) public view virtual override(EnablerV2) returns (bool);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId_ | `bytes4` |  |

**Returns**

| Name | Type | Description |
| ---- | ---- | ----------- |
| &lt;none&gt; | `bool` |  |

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
