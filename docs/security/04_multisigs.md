---
title: "Olympus Multisig Signer Sets and Thresholds"
description: "How the Olympus Emergency and DAO multisigs are configured: signer sets, confirmation thresholds, wallet policies, and the security reasoning behind each choice."
sidebar_label: "Multisigs"
---

# Multisigs

Olympus operates two [Safe](https://safe.global/) multisigs with distinct
responsibilities and, deliberately, different security postures. This page
explains how each is configured and why. Deployment addresses for every chain
are listed on the [Addresses](../contracts/01_addresses.md) page; the roles each
multisig holds on-chain are described in the [Default Framework](./01_roles.md)
page.

> Signer sets and thresholds change over time. The tables below are a snapshot
> (as of 2026-07-16); the live configuration is always verifiable on-chain via
> the Safe UI, linked in each section.

## Emergency Multisig

The Emergency Multisig exists to **react quickly** to an incident. It holds
Olympus' emergency roles which together act as circuit breakers across the
protocol. With them it can:

- **Deactivate core modules:** shut down the **Treasury (TRSRY)** and **Minter
  (MINTR)** modules, halting reserve withdrawals and OHM minting, and shut down
  the **Clearinghouse**.
- **Disable individual policies:** switch off contracts across the protocol as
  needed, for example: the **Heart**, **EmissionManager**, **Convertible
  Deposits** (Auctioneer and Facility), **Cooler** lending (MonoCooler, LTV
  oracle, Treasury borrower), etc.

These are all pause / disable powers: the `emergency` role gates each
policy's `disable()` function. The Emergency Multisig cannot move funds,
change parameters, or re-enable anything. See the
[Default Framework](./01_roles.md) page for the exact role-to-contract mapping.

- **Address:** `0xa8A6ff2606b24F61AFA986381D8991DFcCCd2D55`, aligned to the
  **same address across all chains** (Mainnet, Arbitrum, Optimism, Base, Bera).
- **Threshold:** **2 confirmations** on every chain (2-of-10 on Mainnet, 2-of-7
  on the L2s).
- **Wallet policy:** signers use a mix of software and hardware wallets. Speed of response
  is prioritized, and the pause-only scope keeps the risk bounded.

<details>
<summary>Signer set snapshot — Emergency (Mainnet, 2-of-10)</summary>

```text
0x3524c03D39A13D51485419A17586286A6b617dd3
0x680FF9bd827ABE38212fC7d447Fb8545eEA47Ff3
0xb7eb90494B0312407Afb40f2B5F203A038e9D1e8
0xdA9Bea3719cf644a92729001D36EbcCD594EafA7
0xE0D5FDde79D8191F5C9d5E657acad0e83342fA6B
0xa81636AaCE97783AAC45764B873793bE081dA592
0xcb4524B63F2c532fF52FCbbBcd3C137D32c1D966
0xd8Eb6D9B93b6cbB39aBF62b719BbCCcd2b16F56b
0x131bd1A2827ccEb2945B2e3B91Ee1Bf736cCbf80
0x8d34EA6fb1Ed6B60F94ac6CD01dD1181ef12290E
```

Verify live: [Safe UI](https://app.safe.global/home?safe=eth:0xa8A6ff2606b24F61AFA986381D8991DFcCCd2D55)

</details>

## DAO Multisig

The DAO Multisig carries broad authority on Mainnet, so there it is configured
for **higher assurance rather than speed**.

- **Address (Mainnet):** `0x245cc372C84B3645Bf0Ffe6538620B04a217988B` (see the
  [Addresses](../contracts/01_addresses.md) page for the per-chain addresses).
- **Threshold:** **4-of-8** on Mainnet. On the L2s (Arbitrum, Optimism, Base)
  the DAO Multisig uses **2-of-4**. A lower
  threshold is deliberately chosen so routine L2 operations can move faster.
- **Wallet policy:** signers primarily use **hardware wallets**.
- **Coordination:** signers stay coordinated in a dedicated signing thread in
  Discord to review and confirm transactions.

<details>
<summary>Signer set snapshot — DAO (Mainnet, 4-of-8)</summary>

```text
0xb7eb90494B0312407Afb40f2B5F203A038e9D1e8
0x680FF9bd827ABE38212fC7d447Fb8545eEA47Ff3
0xf0be8F756389C2D22DD644cC9a3C979F568f3454
0x746c8C5EDb4F568F3D88e3Db2ADefe0dfE9a1c02
0x7f7500fe67f6992549376Ed9c89360a236468508
0xcb4524B63F2c532fF52FCbbBcd3C137D32c1D966
0xd8Eb6D9B93b6cbB39aBF62b719BbCCcd2b16F56b
0x131bd1A2827ccEb2945B2e3B91Ee1Bf736cCbf80
```

Verify live: [Safe UI](https://app.safe.global/home?safe=eth:0x245cc372C84B3645Bf0Ffe6538620B04a217988B)

</details>

<details>
<summary>Signer set snapshot — DAO (L2, 2-of-4)</summary>

```text
0xf0be8F756389C2D22DD644cC9a3C979F568f3454
0xd8Eb6D9B93b6cbB39aBF62b719BbCCcd2b16F56b
0x680FF9bd827ABE38212fC7d447Fb8545eEA47Ff3
0xb7eb90494B0312407Afb40f2B5F203A038e9D1e8
```

The same 2-of-4 threshold and signer set apply on Arbitrum, Optimism, and Base.
Verify live: [Safe UI (Base)](https://app.safe.global/home?safe=base:0x18a390bD45bCc92652b9A91AD51Aed7f1c1358f5)

</details>

## Threshold rationale

| Multisig  | Chain   | Threshold | Wallets        | Optimized for                       |
| --------- | ------- | --------- | -------------- | ----------------------------------- |
| Emergency | All     | 2-of-N    | Software / hot | Fast incident response (pause only) |
| DAO       | Mainnet | 4-of-8    | Hardware       | Assurance and coordinated execution |
| DAO       | L2s     | 2-of-4    | Hardware       | Faster L2 ops                       |
