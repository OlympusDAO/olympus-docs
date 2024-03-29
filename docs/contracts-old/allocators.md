---
sidebar_position: 4
---

# Allocators

## AAVE Allocator

The AAVE allocator is used to deposit excess DAI of the treasury into AAVE to
earn passive yield, as laid out in [OIP-13]. Below are listed AAVE allocator
contracts by version, where the latest version represents the currently active
contract.

- V1 [0x0e11...d9D4](https://etherscan.io/address/0x0e1177e47151Be72e5992E0975000E73Ab5fd9D4)

## BTRFLY / LOBI Allocator

The BTRFLY / LOBI allocator simply stakes both tokens in the respective
contracts. The staked tokens have governance power. This allocator is very
simple. It only supports staking and unstaking and was implemented without proxy
pattern.

- V1 [0x41Af...d58C](https://etherscan.io/address/0x41AfC1cD7d944cC38Dba0aFB31D5c6f83602d58C)

## Convex Allocator

The Convex allocator is used to deposit excess FRAX of the treasury into Convex
Finance to earn passive yield, as laid out in [OIP-14]. Below are listed Convex
allocator contracts by version, where the latest version represents the
currently active contract.

- V1 [0x3dF5...dF78](https://etherscan.io/address/0x3dF5A355457dB3A4B5C744B8623A7721BF56dF78)
- V2 [0x408a...67E8](https://etherscan.io/address/0x408a9A09d97103022F53300A3A14Ca6c3FF867E8)
- V3 [0xDbf0...c42d](https://etherscan.io/address/0xDbf0683fC4FC8Ac11e64a6817d3285ec4f2Fc42d)

## FXS Allocator

The FXS allocator locks FXS in Frax Finance and yields more FXS. Locked FXS
tokens are converted into veFXS, which returns FXS rewards that can be claimed
or locked again. The FXS allocator locks FXS tokens for the maximum period of 4
years. veFXS can further be used for Frax Gauge voting eventually.

- Proxy [0xde7b...9475](https://etherscan.io/address/0xde7b85f52577B113181921A7aa8Fc0C22e309475)
- Underlying V1 [0x55ea...123b](https://etherscan.io/address/0x55eae7195b14f38e46a686bba70b87f4c4c7123b)

## Aura Allocator

The Aura allocator locks Aura into the Aura Finance Locker for vlAura to recieve voting power for reward distribution across pools. It delegates this voting power back to the DAO multisig. vlAura accrues auraBAL rewards which are then staked to earn BAL rewards.

- V2 [0x8CaF...8FaD](https://etherscan.io/address/0x8CaF91A6bb38D55fB530dEc0faB535FA78d98FaD)

## DSR Allocator

The DSR allocator deposits DAI in the DAI staking rate module.

- V1 [0x0EA2...d063](https://etherscan.io/address/0x0EA26319836fF05B8C5C5afD83b8aB17dd46d063)

[oip-13]: https://snapshot.org/#/olympusdao.eth/proposal/QmRNXnfeJytnKomASszJGjrJRU4UWPDp3bppmiDM7CqrHH
[oip-14]: https://snapshot.org/#/olympusdao.eth/proposal/QmdGHMWvtjPzUvSiWQiiaMYFLLWgg9yq3E2HdPbdhMLHrZ
