---
title: "Held OHM Before? Start Here"
description: "The current route for OHM V1, sOHM, wsOHM, gOHM and Cooler V1 positions from earlier versions of Olympus."
sidebar_label: "Held OHM Before?"
---

# Held OHM before? Start here

Find what your wallet holds below and follow its steps. The routes run on Ethereum mainnet, from the
[My Balances](https://app.olympusdao.finance/#/ohm/balances) page of the Olympus app. Each row appears once you connect
the wallet that holds that position.

To identify a token, compare its contract address with [Addresses](../contracts/01_addresses.md): OHM V1, sOHM V1 and
wsOHM V1 are listed under Olympus V1, and sOHM V2 and gOHM under Olympus V2.

## wsOHM

wsOHM is wrapped sOHM V1.

1. On My Balances, select **Unwrap** on the wsOHM row. You receive sOHM V1.
2. Continue with [sOHM V1](#sohm-v1).

## sOHM V1

The route from sOHM V1 runs through OHM V1. Each sOHM V1 unstakes to one OHM V1.

1. On My Balances, select **Unstake** on the sOHM V1 row. You receive OHM V1.
2. Continue with [OHM V1](#ohm-v1).

The same step can be done directly on the V1 staking contract: see [Unstake sOHM V1 via Etherscan](../user-guides/01_using-etherscan/unstaking.md).

## OHM V1

OHM V1 migrates to the current OHM through the V1Migrator contract. Each address's allocation comes from a snapshot of
OHM V1 holdings, recorded onchain as a Merkle root. The app reads your allocation and submits the proof with the transaction.

1. On My Balances, select **Migrate** on the OHM V1 row.
2. You receive OHM. You can migrate in several transactions, up to your address's allocation.

An address outside the snapshot has no allocation. The migrator also has an overall cap, set by governance.

Details: [V1 to V2 Migration](../legacy/08_migration.md).

## sOHM V2

On My Balances, select **Wrap** on the sOHM row. It opens the [Wrap](https://app.olympusdao.finance/#/ohm/wrap) page, which offers:

- **Wrap sOHM to gOHM**, at the current index.
- **Unstake sOHM to OHM**, one OHM for each sOHM.

## gOHM on Ethereum

gOHM is a current Olympus token, so it has nothing to migrate. It can be used as collateral for
[Cooler Loans](./04_cooler-loans.md) and to vote in [governance](../governance/00_governance.md). To convert
it to OHM, select **Unwrap** on the gOHM row.

## OHM on another network

OHM on any network that Olympus supports is native OHM and needs no action. The supported networks, and how to move
OHM between them, are on [Cross-Chain OHM](./07_cross-chain/index.md).

## gOHM on another network

gOHM outside Ethereum is issued by Synapse, a third-party bridge, on each network it reaches, so it moves back to
Ethereum through Synapse. Wrapping and unwrapping gOHM happen only on Ethereum.

## Repay or extend a Cooler V1 loan (DAI or USDS)

A Cooler V1 loan is a fixed-term loan from a Clearinghouse. It is repaid in the token it was borrowed in: DAI for
Clearinghouse v1.0 and v1.1, and USDS for v1.2. Open loans appear on the
[Cooler V1](https://app.olympusdao.finance/#/cooler/v1) page of the app.

Until the loan's expiry:

- **Repay Loan** with any amount at any time. Payments go to interest first, then principal, and gOHM is returned in
  proportion to the principal repaid.
- **Extend** the term by paying the extension interest in advance.

After expiry, the loan can no longer be repaid or extended.

A V1 loan can move to Cooler V2 this way: repay it in full, then open a position on [Cooler Loans](./04_cooler-loans.md).
Full terms: [Cooler Loans (V1)](../legacy/07_coolers.md).

## Getting help and support

For help with any of these steps, ask in the public channels of the [Olympus Discord](https://discord.gg/olympusdao). The team never sends the first
direct message. To report a security issue, see [Bug Bounty](../security/03_bugbounty.md).
