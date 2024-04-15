---
sidebar_position: 1
sidebar_label: Proposal Lifecycle
---

# Proposal Lifecycle
Any proposal to Olympus' Governor Bravo follows this lifecycle:

1. Proposal is submitted by calling `propose()`. Proposal review period begins.
2. Proposal is activated for voting by calling `activate()`. Proposal voting period begins.
3. Proposal is queued by calling `queue()`. Proposal is transfered to Timelock, and grace period begins.
4. Proposal is executed by calling `execute()`, upgrading Olympus protocol.

![proposal-timeline-diagram](/gitbook/assets/proposal-timeline-diagram.svg)

## Proposal Submission
To submit a new proposal to On-chain Governance (OCG), submitters interact directly with Governor Bravo contract by calling propose() function. However, the following requirements must be met before submitting a proposal:

1. **Minimum voting power** - proposer must hold, and maintain, at least proposalThreshold of the total gOHM supply at time of proposal submission.
2. **Integration tests** - proposals must be added, tested and simulated in olympus-v3 repository. This process ensures that the proposal is secure and achieves the intended outcomes without putting the protocol at risk.

To learn more about how to submit proposals, visit [Proposal Submission Framework page](./proposal_submission).


:::info
The current proposalThreshold is set to 0.017% of the total gOHM supply
:::


## Proposal Review
Calling `propose()` sets the start block of the proposal `votingDelay` number of days after current block. This delay is designed to give tokenholders time to review the proposal and its implications.

OCG's trustless nature is one of its greatest strengths, but it also presents a challenge: the inability to mandate specific frameworks or best practices at the smart contract level. As a result, tokenholders plays a central role in evaluating the proposed on-chain actions for intent. Tokenholders responsibilities include, but are not limited to:

1. Verify proposal actions align with the protocol's goals,
2. Intent: Ensure the proposal intent is clear, transparent and not malicious,
3. Consensus: Ensure the proposal on-chain actions matches the consensus reached in the forums.
4. Security Assurance: This phase is critical for safeguarding the protocol against malicious proposals.
5. Community Engagement: Active community participation is vital in evaluating the proposal's feasibility and impact.

To address this challenge, Olympus uses [forge-proposal-simulator](https://solidity-labs.gitbook.io/forge-proposal-simulator/), an open-source framework designed to structure proposals effectively and streamline the proposal verification process. On a high-level, this framework allows anyone to execute proposals in a forked environment and develop integration tests to examine the new system's behavior in a controlled sandbox.

Due to the importance of this framework in ensuring transparency and security, **Emergency MS will veto any proposals not adopting it**. This stance is based on the belief that **omitting the framework could indicate an attempt to pass a harmful proposal** by obfuscating its review process.

:::info
The current votingDelay is set to 3 days
:::


## Proposal Activation
Anyone can activate a proposal by calling `activate()`. Calling activate records records `quorumVotes` on the proposal. If the proposal targets a high-risk module, the quorum is calculated using the `getHighRiskQuorumVotes()` function:

```solidity
function getHighRiskQuorumVotes() public view returns (uint256) {
    return (gohm.totalSupply() * highRiskQuorum) / 100_000;
}
```

Otherwise, quorum is calculated using the `getQuorumVotes()` function:

```solidity
function getQuorumVotes() public view returns (uint256) {
    return (gohm.totalSupply() * quorumPct) / 100_000;
}
```

The proposal will use this `quorumVotes` for the remainder of proposal lifecycle.

:::info
The current quorumPct is set to 20% of gOHM supply
:::

Also, if the proposal is not activated within the `activationGracePeriod` days after proposal review, it will expire and can no longer be activated. 

:::info
The current activationGracePeriod is set to 1 day
:::


## Proposal Voting
Olympus' implementation of Governor Bravo employs a pessimistic vote casting mechanism. This mechanism operates under the assumption that all governance proposals could potentially be malicious. Therefore, it consistently computes the most unfavorable voting supply at different timestamps for each participant. This mechanism is designed to prevent voters from altering their exposure level to the gOHM and influence the outcome of the vote. By doing so, it attempts to safeguard the voting process against strategies that manipulate voting power.

```solidity
function castVoteInternal(
    address voter,
    uint256 proposalId,
    uint8 support
) internal returns (uint256) {
    // Checks...

    // Get the user's votes at the start of the proposal and at the time of voting. Take the minimum.
    uint256 originalVotes = gohm.getPriorVotes(voter, proposal.startBlock);
    uint256 currentVotes = gohm.getPriorVotes(voter, block.number);
    uint256 votes = currentVotes > originalVotes ? originalVotes : currentVotes;

    // Effects...
}
```

Consider the following examples:

* Alice has 0 gOHM at time of `proposal.startBlock` and 100 gOHM when she votes. `castVote()` will return 0 gOHM.
* Jim has 100 gOHM at time of `proposal.startBlock` and 0 gOHM when he votes. `castVote()` will return 0 gOHM.
* Bob has 100 gOHM at time of `proposal.startBlock` and 100 gOHM when he votes. `castVote()` will return 100 gOHM.
* Robert has 50 gOHM at time of `proposal.startBlock` and 100 gOHM when he votes. `castVote()` will return 50 gOHM.

At the end of the voting period, the contract checks proposal's state by checking two things:

1. Quorum: Number of FOR votes at least `proposal.quorumVotes` (the proposal quorum set during `activate()`)
2. Net votes: Percentage of FOR votes at least `approvalThresholdPct` (the majority approval threshold)

```solidity
function getVoteOutcome(uint256 proposalId) public view returns (bool) {
  Proposal storage proposal = proposals[proposalId];

  if (proposal.forVotes == 0 && proposal.againstVotes == 0) {
    return false;
  } else if (
    (proposal.forVotes * 100_000) / (proposal.forVotes + proposal.againstVotes) <
    approvalThresholdPct ||
    proposal.forVotes < proposal.quorumVotes
  ) {
    return false;
  }

  return true;
}
```

If either quorum or net votes is not met, the proposal is automatically defeated.

:::info
The current votingPeriod is set to 7 days from the time the proposal is activated.
:::

:::info
The current quorumPct is set to 20% of gOHM supply
:::

:::info
The current approvalThresholdPct is set to 60%
:::



## Proposal Queuing
Anyone can activate a proposal by calling `queue()`. Queueing a proposal prepares the proposal for execution by the Timelock contract in `delay` days. The proposer's gOHM balance is again checked during `queue()`. If the balance falls below `proposalThreshold`, the proposal will fail.

:::info
The current delay is set to 1 day
:::


## Proposal Execution
Any can execute a proposal by calling `execute()`. Executing a proposal triggers the Timelock contract to execute the proposal's actions. The proposer's gOHM balance is again checked during `execute()`. If the balance falls below `proposalThreshold`, the proposal will fail. 

Also, if the proposal is not activated within the `GRACE_PERIOD` days after proposal is queued, it will expire and can no longer be executed. 

:::info
The current GRACE_PERIOD is set to 1 day
:::

## Canceling Proposal
The proposal can be canceled at any time (before execution) by the proposer. A proposer can be canceled by anyone only if the proposer's gOHM balance
is below `proposalThreshold`.

## Vetoing Proposal
The proposal can be vetoed any time (before execution) by the Veto Guardian. Once a proposal is vetoed, it fails forever.

:::info
The current Veto Guardian is set to Emergency MS
:::

## Emergency State
In the event that gOHM supply collapsed below MIN_GOHM_SUPPLY, Governor Bravo contract enters an emergency state. No
proposal can be submitted, activated, queued or executed. The only action that can be taken is `emergencyPropose()` which
can only be called by Veto Guardian. This function is used to propose a new proposal to address the emergency situation.

:::info
The current MIN_GOHM_SUPPLY is set to 1000 gOHM
:::


