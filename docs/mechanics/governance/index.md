---
sidebar_position: 1
sidebar_label: Governance
---
# Olympus Governance


This document outlines the [governance system](https://github.com/OlympusDAO/bophades2/blob/fully/governance/src/policies/Governance.sol) for OlympusDAO V3 (Bophades).


### Dependencies


The governance system requires two *Module* dependencies and their respective permissions:

- `INSTR`, used for storing arrays of Kernel instructions as proposals
    - permission to call INSTR.store();
- `VOTES`, an ERC20 token used for counting voting power by address
    - permission to call VOTES.transferFrom();


### Parameters

The governance system also utilizes the following parameter variables:

- `SUBMISSION REQUIREMENT`, the amount of votes a proposer needs in order to submit a proposal as a percentage of total supply (expressed in basis points)
- `ENDORSEMENT THRESHOLD`, the percentage of total voting supply required as endorsements needed to activate a proposal for voting
- `ACTIVATION DEADLINE`, the amount of time a submitted proposal has to activate before it expires.
- `GRACE PERIOD`, the amount of time an activated proposal must stay up before it can be replaced by a new activated proposal.
- `EXECUTION THRESHOLD`, the percent of total voting supply required as net votes needed to execute a proposal on chain
- `EXECUTION_TIMELOCK`, the required time for a proposal to be active before it can be executed.


## Summary

Proposals in the governance system are stored lists of Kernel instructions that specify a change to the underlying protocol smart contracts like new mechanisms or upgrades to existing features. For specific details around these instructions, please view the Bophades Kernel documentation.


The Olympus governance system can be roughly broken into three 3 parts:

1. Submission & Endorsement
2. Active Voting & Execution
3. Vote Redemption


## 1. Submission & Endorsement

Before proposals can be voted on for execution, there are a few steps that need to happen in order to reduce the likelihood of spam proposals and ensure that proposals that make it to an actual vote are high quality.

#### Submitting a Proposal

First, when submitting a proposal, the governance system requires the proposer to have at least some of the total voting tokens in circulation, determined by the `SUBMISSION REQUIREMENT` parameter. This mechanism exists to ensure that the proposer has some economic alignment and ownership with the protocol, and that it proposals cannot come from random empty addresses. The `SUBMISSION REQUIREMENT` is intially set to 1% of the total voting supply. 

In addition, the submitter may optionally add some metadata around the proposal (like a title and proposal URI) to make it human-readable and bring context to the instructions that are proposed. The proposal URI might be a google doc link, Snapshot/Discourse URL, IPFS hash, or something else, which can be optionally enforced by the front-end if a standard should be established.


#### Endorsing Proposals

Once proposals are submitted, they go through a curation process to signal interest that a proposal is worth voting on via _endorsements_. Endorsements are similar to a "temperature check" vote popular in other governance systems, but are conducted on-chain and part of the core governance logic within the smart contract. 

Users can endorse as many proposals as they like; an endorsement is not a vote in favor or against a proposal, but a metric of it’s significance and relevance within the governance community. With enough endorsements, a proposals contents may be executed, giving voters the impetus to understand what the proposal is attempting to do. As a result, the endorsement period is used to coordinate which proposals are worth learning more about and what their potential impact on the protocol will be, incentivizing proposers to distribute and market their ideas to ensure they are accepted prior to the actual vote. 

Once a proposal is submitted, it needs to reach a percentage of the total voting supply in endorsements—the `ENDORSEMENT THRESHOLD`—prior to being activated, which is initially set to 20%. Additionally, it must receive these endorsements within a certain period of time, the `ACTIVATION DEADLINE`, which is initially set to 2 weeks. If the proposal fails to reach the `ENDORSEMENT THRESHOLD` within the `ACTIVATION DEADLINE`, it is considered _expired_ and can not be activated, and the proposer must resubmit the proposal and try again.


## 2. Active Voting & Execution

If a proposal is successfully submitted, reaches the `ENDORSEMENT THRESHOLD` within the `ACTIVATION DEADLINE`, then the proposal can be 'activated' by the original proposer to trigger a vote for execution. However, there is one additional caveat: only one proposal can be active at a time to reduce potential distractions or information overload from multiple proposals occuring in parallel. 

#### One Active Proposal at a Time

As a result, endorsements can not be activated unless there is no currently active proposal, or that the active proposal has been available for longer than the `GRACE PERIOD`, which is initially set to 1 week. In other words, if a proposal has been in active voting for longer than a week and has not been executed, it may be replaced by a new proposal and considered to have failed.

Once a proposal is active, governance participants vote on whether or not its instructions should be executed by the Kernel. Votes are simply 'yes' or 'no' in favor of executing the proposal—by default, not voting on the proposal is considered abstaining. 

#### Counting Votes: Net Votes

The Olympus Governance system uses a unique method to measure determining whether a vote is considered passed. While most governance systems use a simple quorum threshold and majority voting, our governance system uses a passing criteria called **net votes**, which is calculated as the margin of votes between yes and no. For example, if there are 10 **yes votes** and 3 **no votes** for a given proposal, then that proposal has 7 **net votes**. 

In the governance system, the percentage of total voting supply that a proposal must reach in net votes is determined by the `EXECUTION THRESHOLD`, which is initially set to 33% of the circulating votes. 

There are a few interesting properties of voting that emerge with net votes. First, the quorum is not hard set, but adjusts dynamically higher as a vote becomes increasingly controversial. If a proposal has no opposition, for example, then only 1/3 of the voting supply needs to participate for the proposal to pass (quorum: 33%). However, if a proposal has 1/3 of the voting supply opposing it, then it needs the entire voting supply to participate for the proposal to pass (quorum: 100%), because it would require 66% of the voting supply to approve it to reach the prerequisite net votes. 

This makes abstaining, or not voting, an equally impactful decision as voting since opposing votes dramatically affect the participation requirements for a proposal to pass. This also means that controlling 1/3 of the voting supply grants that voter (or collective group of voters) unanimous veto power within the system.

#### Execution Delay

Aside from voting requirements, there is a period of time—the`EXECUTION TIMELOCK`—after a proposal is first activated where it cannot be activated. In our governance system, this is initially set to 3 days.

The `EXECUTION TIMELOCK` ensures that proposals cannot be immediately executed after they are endorsed in order to give enough time for voters to react to new proposals and signal their opinions accordingly. 

However, once a proposal has met it’s `EXECUTION THRESOLD`, and the `EXECUTION TIMELOCK` has expired, anyone can submit the transaction to execute the instructions in the proposal. Once the blockchain confirms this transaction, the submitted changes will happen automatically on-chain, and the underlying functionality of the protocol will change permanently and immediately.


## 3. Vote Redemption

As an additional safety mechanism, when votes are cast, the tokens used to vote on the proposal are locked in the contract until the proposal is no longer active. This exists to deter malicious behavior by ensuring users cannot transfer their voting tokens until after the proposal has been resolved. Once a proposal is no longer active, either by being executed or replaced by a new proposal, users may redeem their votes back from the contract.
