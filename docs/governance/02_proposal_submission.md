---
sidebar_position: 2
sidebar_label: Submission Guidelines
---

# Submission Guidelines

Olympus On-Chain Governance (OCG) proposals are executable transactions. A strong submission should make the intended protocol change clear, prove the calldata is correct, and give tokenholders enough time and context to review it before voting.

:::info
Before submitting a new proposal, review the [Governance intro](./00_governance.md) and [Proposal lifecycle](./proposal_lifecycle). The lifecycle page explains activation, voting, queueing, and execution after the initial submission.
:::

## Submission Paths

There are two common ways to move a proposal from idea to on-chain submission:

1. **Self-submission** - the author holds or receives enough delegated gOHM voting power, prepares the proposal in the `olympus-v3` repository, and submits it directly.
2. **Operator-assisted submission** - the author prepares the intent and review materials, while a trusted proposer or agent operator helps convert the proposal into tested calldata and submits from an eligible proposer address.

Both paths should produce the same public artifacts: a reviewed `olympus-v3` pull request, test output, proposal calldata, and an on-chain proposal that references the PR or other review material in the description.

## Requirements

To submit a new OCG proposal, a proposer calls Governor Bravo's `propose()` function. The transaction will revert unless the proposer satisfies these requirements.

### Minimum Voting Power

The proposer must hold, or be delegated, at least `proposalThreshold` of the total gOHM supply. The threshold is calculated by `getProposalThresholdVotes()`:

```solidity
function getProposalThresholdVotes() public view returns (uint256) {
    return (gohm.totalSupply() * proposalThreshold) / 100_000;
}
```

The proposer's votes are checked during `propose()`, `queue()`, and `execute()`. Delegated voting power must remain in place through the full proposal lifecycle.

:::info
The current `proposalThreshold` is 0.017% of the total gOHM supply. Check the live Governor contract before submitting, because the exact gOHM amount changes with supply.
:::

:::tip
Governor Bravo checks prior votes. If voting power is delegated to a proposer address, wait until at least the next block before calling `propose()`.
:::

### Proposal Simulation

Proposals must be added, tested, and simulated in the [olympus-v3 repository](https://github.com/OlympusDAO/olympus-v3/). Olympus uses [forge-proposal-simulator](https://solidity-labs.gitbook.io/forge-proposal-simulator/) to make proposals reviewable in a forked environment before they are submitted on-chain.

A proposal PR should show:

- The proposal contract in `src/proposals/`
- Any new or updated addresses in `src/proposals/addresses.json`
- Tests in `src/test/proposals/`
- Simulation output proving the proposal can execute successfully
- Validation assertions proving the intended post-state

:::warning
Emergency MS may veto proposals that bypass the proposal simulator or make calldata difficult to review. The simulator is part of Olympus' governance safety process.
:::

## Recommended Workflow

### 1. Define the Proposal Intent

Write down the plain-English intent before writing Solidity. Include:

- What protocol state should change
- Which contracts will be called
- Why the change is needed
- Expected risk, reversibility, and operational follow-up
- Forum, Snapshot, OIP, or RFC links if they exist

This context should also appear in the proposal description or linked PR.

### 2. Prepare the Proposal Contract

Create a proposal contract in `src/proposals/`, named after the proposal or OIP. The contract should inherit `GovernorBravoProposal`.

Use the proposal contract to:

- Declare dependencies through `addresses.json`
- Deploy or reference contracts in `_deploy()`
- Build actions in `_build()`
- Simulate execution in `_run()`
- Assert the expected post-state in `_validate()`

Use `_pushAction()` for each Governor action:

```solidity
_pushAction(
    target,
    abi.encodeWithSelector(TargetContract.setParameter.selector, newValue),
    "Set target parameter"
);
```

When referencing addresses, prefer the registry over hardcoded addresses. Use lowercase, dash-separated keys such as `olympus-policy-example`, `external-token-usds`, or `olympus-multisig-dao`.

For current Olympus Kernel contracts, use the [Protocol Visualizer](https://protocol-visualizer.olympusdao.finance/) or its GraphQL API to verify the active contract set before adding addresses. The visualizer reflects installed Kernel modules and policies, which helps reviewers confirm that proposal actions target the intended contracts.

### 3. Add Tests

Create tests in `src/test/proposals/`. The tests should import the proposal and run it against a mainnet fork.

A minimal test should prove setup works:

```solidity
function testProposal() public {
    assertTrue(true);
}
```

Useful tests go further and verify the post-proposal state that tokenholders care about. For example, assert changed parameters, permissions, enabled flags, balances, or market configuration.

### 4. Open a Review PR

Open a pull request against [olympus-v3](https://github.com/OlympusDAO/olympus-v3/) with the proposal contract, tests, and any address registry changes.

The PR should include:

- Summary of actions
- Governance/forum context
- Local test command and result
- Any assumptions or operational dependencies
- Expected on-chain proposer address, if known

### 5. Check Proposer Readiness

Before submission, verify:

- Proposer has enough delegated gOHM voting power
- Delegation was mined at least one block ago
- Proposer has enough ETH for gas
- Proposer can sign from the intended wallet or keystore
- Proposal description includes the PR link or equivalent review artifact

### 6. Dry-Run Submission

Use the repository's proposal scripts or Foundry directly to dry-run the exact submission path before broadcasting.

For script-based proposals, submit through the wrapper script contract, not the proposal contract directly. The wrapper is what prepares the proposal script environment for `forge script`.

Example shape:

```bash
src/scripts/proposals/submitProposal.sh \
  --file src/proposals/MyProposal.sol \
  --contract MyProposalScript \
  --chain "$RPC_URL" \
  --env .env.proposer \
  --broadcast false
```

Review the printed targets, values, calldata, description, proposer address, and any simulation output before broadcasting.

### 7. Broadcast

After review, broadcast the same command with broadcasting enabled:

```bash
src/scripts/proposals/submitProposal.sh \
  --file src/proposals/MyProposal.sol \
  --contract MyProposalScript \
  --chain "$RPC_URL" \
  --env .env.proposer \
  --broadcast true
```

Capture the transaction hash, block number, proposal id, and proposer address. Add them to the PR or governance discussion so reviewers can follow the proposal through activation, voting, queueing, and execution.

## Operator-Assisted Submissions

A proposer does not need to be the same person who authored the proposal. A contributor can work with a trusted proposer, multisig, or agent operator that acts as middleware between the human intent and Governor Bravo.

This can lower friction for contributors who understand the desired protocol change but do not maintain local Foundry tooling, proposer infrastructure, or enough delegated gOHM voting power.

The operator should still keep the process transparent:

- Use a dedicated proposer address where possible
- Hold only the gas ETH needed for submission
- Receive delegated gOHM voting power explicitly for the proposal
- Run the same fork tests and dry-runs as a self-submitter
- Share the exact PR, calldata, proposer address, and transaction hash
- Never broadcast until the proposal author and relevant reviewers approve the final payload

For a contract-aware prompt and implementation template that an agent can use to
start proposal work, see [Agent Proposal Prompt](./agent_proposal_prompt).
