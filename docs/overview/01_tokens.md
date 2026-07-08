---
title: "OHM and gOHM Tokens: Contracts and Mechanics"
description: "OHM is Olympus's treasury-backed reserve token, not pegged to fiat. gOHM is wrapped staked OHM used for governance and as Cooler Loans collateral."
sidebar_label: "OHM and gOHM"
---

# OHM and gOHM

## OHM token

> **OHM Contract Address:** [0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5](https://etherscan.io/address/0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5)

OHM is the native token of the Olympus protocol, and is backed by the Olympus Treasury. Unlike fiat stablecoins, OHM is not pegged to any fiat currency. Instead, it is a free-floating, treasury-backed asset whose market price can move above or below its current liquid backing. Olympus uses governance-controlled mechanisms such as Protocol Owned Liquidity, Cooler Loans, yield strategies, and market-operation policies to support liquidity, backing growth, and long-term price predictability. The original Range Bound Stability (RBS) system is historical and should not be treated as the current price-range enforcement mechanism.

## gOHM token

> **gOHM Contract Address:** [0x0ab87046fBb341D058F17CBC4c1133F25a20a52f](https://etherscan.io/address/0x0ab87046fBb341D058F17CBC4c1133F25a20a52f)

gOHM, or Governance OHM, is an ERC-20 wrapper for OHM. gOHM can be obtained by wrapping OHM, and vice versa. It is used for Olympus governance and as collateral for Cooler Loans. Because gOHM represents wrapped OHM, the amount of OHM represented by one gOHM follows the Olympus index rather than a separate token price policy.
