# Cross-Chain Bridge

## Overview

The OHM token is available cross-chain! Olympus uses bridge infrastructure to send and receive native OHM on supported chains. Whereas most bridge architectures create a wrapped representation of a token, Olympus takes a different approach: OHM is burned or locked on the source chain, and minted or released on the destination chain. The resulting OHM is native to that chain which makes it composable with every dApp.

Olympus currently uses two bridge paths:

- EVM chains use a LayerZero bridge with mint/burn accounting.
- Solana uses Chainlink CCIP through `CCIPCrossChainBridge`, the user-facing bridge contract, and CCIP token pools such as `CCIPLockReleaseTokenPool`.

The EVM bridge was rebuilt with a security-hardened, multi-contract LayerZero V2 design. For details on the new contracts, rate limits, and safety guardrails, see the [LayerZero Bridge Security Upgrade](./10_layerzero-bridge-upgrade.md) page.

## How to bridge

1. Navigate to [https://app.olympusdao.finance](https://app.olympusdao.finance)
2. Click Bridge in the sidebar
3. Select the source chain and the destination chain
4. Enter amounts, approve and click Bridge. Note that Olympus does not charge a fee for bridging. You only pay for gas and the message passing fee charged by the bridge infrastructure.
5. You can view the transaction under the Transactions list.

:::info

EVM bridging was paused as a precaution following an industry-wide bridge incident, then relaunched on a rebuilt, security-hardened bridge. See the [LayerZero Bridge Security Upgrade](./10_layerzero-bridge-upgrade.md) page for the new contracts and safety guardrails.

:::

## Supported networks

Ethereum mainnet, Arbitrum, Optimism, Base, Bera, and Solana.

## Bridge lanes

The available bridge lane determines both the messaging provider and the token accounting model:

| Lane                                                   | Bridge path | Mechanism                                                                                                                                              |
| ------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ethereum mainnet &rarr; Solana                         | CCIP        | Canonical OHM is locked in the Ethereum `CCIPLockReleaseTokenPool`; native OHM is minted on Solana through the CCIP token pool.                        |
| Solana &rarr; Ethereum mainnet                         | CCIP        | Native OHM is burned on Solana through the CCIP token pool; canonical OHM is released from the Ethereum `CCIPLockReleaseTokenPool`.                    |
| Ethereum mainnet &rarr; non-canonical EVM chain        | LayerZero   | OHM is burned on Ethereum mainnet and minted on the destination EVM chain. Applies to Arbitrum, Base, Berachain, and Optimism.                         |
| Non-canonical EVM chain &rarr; Ethereum mainnet        | LayerZero   | OHM is burned on the source EVM chain and minted on Ethereum mainnet. Applies to Arbitrum, Base, Berachain, and Optimism.                              |
| Non-canonical EVM chain &rarr; non-canonical EVM chain | LayerZero   | Supported on the upgraded LayerZero bridge; OHM is burned on the source EVM chain and minted on the destination EVM chain. Berachain connects to all other EVM chains. See the [LayerZero Bridge Security Upgrade](./10_layerzero-bridge-upgrade.md). |

## Mechanism

### EVM bridge

:::note

The EVM bridge has been upgraded to a multi-contract LayerZero V2 design. The burn/mint flow below illustrates the core accounting; for the current contract architecture, rate limits, and security guardrails, see the [LayerZero Bridge Security Upgrade](./10_layerzero-bridge-upgrade.md) page.

:::

When sending OHM from a source chain (e.g. mainnet) to a supported EVM chain, the `CrossChainBridge` smart contract invokes the `MINTR` module to burn OHM on the source chain and send a message payload over the LayerZero Endpoint. When the message is received, the destination `CrossChainBridge` mints OHM on the destination chain.

All current EVM bridge deployments use this mint/burn pattern. Ethereum mainnet is treated as the canonical chain for OHM supply: net-new protocol supply can only be minted on Ethereum mainnet. Bridge minting on non-canonical chains only mirrors OHM that has been burned on another chain.

```solidity
function sendOhm(uint16 dstChainId_, address to_, uint256 amount_) external payable {
  if (!bridgeActive) revert Bridge_Deactivated();
  if (ohm.balanceOf(msg.sender) < amount_) revert Bridge_InsufficientAmount();

  bytes memory payload = abi.encode(to_, amount_);

  MINTR.burnOhm(msg.sender, amount_);
  _sendMessage(dstChainId_, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);

  emit BridgeTransferred(msg.sender, amount_, dstChainId_);
}
```

On receipt, the destination `CrossChainBridge` mints native OHM:

```solidity
function _receiveMessage(
    uint16 srcChainId_,
    bytes memory,
    uint64,
    bytes memory payload_
) internal {
  (address to, uint256 amount) = abi.decode(payload_, (address, uint256));

  MINTR.increaseMintApproval(address(this), amount);
  MINTR.mintOhm(to, amount);

  emit BridgeReceived(to, amount, srcChainId_);
}
```

### Solana bridge

Bridging to and from Solana uses Chainlink CCIP instead of the LayerZero bridge. Users interact with `CCIPCrossChainBridge`, which sends CCIP messages and transfers OHM through CCIP token pools.

On Ethereum, Olympus uses Chainlink's heavily audited `CCIPLockReleaseTokenPool` to lock canonical OHM when tokens are bridged to Solana and release OHM when tokens are bridged back to Ethereum mainnet. On Solana, the CCIP token pool uses burn/mint accounting so that native OHM can be minted when entering Solana and burned when exiting Solana.

Once bridged, users can use native OHM in any protocol that accepts OHM.

## Security

The original Olympus `CrossChainBridge` smart contract was reviewed by the LayerZero integrations team and audited by OtterSec. The upgraded EVM bridge was audited by Guardian (June 2026) — see the [LayerZero Bridge Security Upgrade](./10_layerzero-bridge-upgrade.md) page for its security design. The CCIP bridge contracts were audited by Electisec. Audit reports are available in the [Audits](../security/02_audits.md) section.

To consider the pros and cons of Olympus’ approach to bridging, it’s worth understanding the difference between native tokens and non-native tokens. Native tokens (to a chain) are those tokens that are deployed by the smart contract; non-native tokens are those that are wrapped and managed by a third-party.

### Pros

Under the non-native bridge design, source tokens are stored in bridge contracts and wrapped representations are minted. This makes the contract a single point-of-attack, and why bridges account for ~50% of all DeFi exploits.

![Bridge Exploits](/gitbook/assets/bridgeExploits.png)

Olympus’ native bridge design avoids this problem by deploying bridge contracts that can mint, burn, lock, or release OHM according to the destination chain’s bridge path. This makes OHM a truly native asset on each chain it’s deployed on.

The CCIP lock/release design also bounds the impact of a non-canonical-chain minting issue. If an attacker were able to mint OHM on a non-canonical chain, the amount that could be bridged back to Ethereum mainnet would be capped by the amount of canonical OHM locked in the Ethereum `CCIPLockReleaseTokenPool`.

### Cons

Native bridge architecture is not without risk. The EVM bridge path depends on LayerZero messaging, and the Solana bridge path depends on Chainlink CCIP messaging and token pool infrastructure. A failure or compromise in the relevant messaging layer could affect bridge operation.

## Contracts

Bridge contract addresses are listed in the [contract addresses table](../contracts/01_addresses.md).
