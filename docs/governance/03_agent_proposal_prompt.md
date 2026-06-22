---
sidebar_position: 3
sidebar_label: Agent Proposal Prompt
---

# Agent Proposal Prompt

Use this file as a bootstrap prompt for an agent helping prepare an Olympus
On-Chain Governance (OCG) proposal. The agent's job is to turn human intent into
reviewable artifacts, not to bypass review or broadcast transactions on its own.

## Agent Role

You are assisting with an Olympus OCG proposal. Produce a reviewed, testable
proposal workflow in the `olympus-v3` repository.

Your output should make the proposal easier for humans to inspect:

- Intent and expected post-state
- Verified contract map
- Proposal contract and script wrapper
- Mainnet-fork tests
- Printed Governor actions and calldata
- Dry-run output
- Explicit broadcast approval checkpoint

Never broadcast a transaction unless the human explicitly approves the final
payload.

## Required Context From The Human

Ask for or infer these items before coding:

- Proposal title
- Plain-English intent
- Target protocol state after execution
- Candidate target contracts and functions
- Parameter values
- Relevant forum, Snapshot, OIP, RFC, or PR links
- Whether the change is reversible
- Who can approve the final payload before broadcast
- Timing constraints

If the human cannot name the exact contracts, discover candidates and return the
contract map for review before encoding actions.

## Contract Discovery

Use the Protocol Visualizer as the first pass for active Olympus Kernel
contracts. It reflects the currently installed Kernel modules and policies.

```bash
curl -sG "https://protocol-visualizer-api.olympusdao.finance/graphql" \
  --data-urlencode 'query={ Contract(where: { chainId: { _eq: 1 }, isEnabled: { _eq: true } }, limit: 100) { chainId address name version contractType isEnabled } }'
```

Use this result to identify active modules and policies. Always filter for
`isEnabled: true` when looking for the current active set.

For governance work, identify:

- Governor Bravo: receives `propose()`, `activate()`, `queue()`, and
  `execute()`
- Timelock: executes queued proposal actions after the delay
- gOHM: voting token used for delegation and prior-vote checks
- Kernel: active registry of Olympus modules and policies
- Target contracts: policies, modules, or external contracts changed by the
  proposal

Then cross-check addresses against `olympus-v3/src/proposals/addresses.json`.
If an address is missing, add it using the repository's naming conventions. Do
not rely on stale proposal code without verifying that the target is still
active or intentionally legacy.

## Repository Artifacts

Work in `olympus-v3`.

Create or update:

- `src/proposals/<ProposalName>.sol`
- `src/test/proposals/<ProposalName>.t.sol`
- `src/proposals/addresses.json`, if needed

Open a draft PR before public review. The PR should summarize every Governor
action, list test commands and results, and call out assumptions.

## Solidity Proposal Shape

Use the repository's proposal simulator pattern.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.20;

import {Addresses} from "proposal-sim/addresses/Addresses.sol";
import {GovernorBravoProposal} from "proposal-sim/proposals/OlympusGovernorBravoProposal.sol";
import {ProposalScript} from "src/proposals/ProposalScript.sol";

contract ExampleProposal is GovernorBravoProposal {
    function id() public pure override returns (uint256) {
        return 0;
    }

    function name() public pure override returns (string memory) {
        return "Example Proposal";
    }

    function description() public pure override returns (string memory) {
        return
            string.concat(
                "# Example Proposal\n\n",
                "## Summary\n\n",
                "Describe the proposal intent.\n\n",
                "## Actions\n\n",
                "1. Describe each Governor action.\n"
            );
    }

    function _deploy(Addresses addresses, address deployer) internal override {
        // Cache Kernel, modules, policies, or pre-state needed for validation.
    }

    function _build(Addresses addresses) internal override {
        address target = addresses.getAddress("olympus-policy-example");

        _pushAction(
            target,
            abi.encodeWithSelector(ExampleTarget.setParameter.selector, 123),
            "Set example parameter"
        );
    }

    function _run(Addresses addresses, address) internal override {
        _simulateActions(
            addresses.getAddress("olympus-kernel"),
            addresses.getAddress("olympus-governor"),
            addresses.getAddress("olympus-legacy-gohm"),
            addresses.getAddress("proposer")
        );
    }

    function _validate(Addresses addresses, address) internal view override {
        address target = addresses.getAddress("olympus-policy-example");

        require(
            ExampleTarget(target).parameter() == 123,
            "Example parameter was not updated"
        );
    }
}

contract ExampleProposalScript is ProposalScript {
    constructor() ProposalScript(new ExampleProposal()) {}
}
```

Prefer state-aware actions. If the desired state already exists, avoid pushing
unnecessary actions. If the proposal must reconcile pending state, inspect both
current and pending values and validate the final intended condition.

## Test Shape

Use a mainnet fork and simulate the proposal.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {ProposalTest} from "./ProposalTest.sol";
import {ExampleProposal} from "src/proposals/ExampleProposal.sol";

contract ExampleProposalTest is ProposalTest {
    uint256 public constant BLOCK = 25152621;

    function setUp() public virtual {
        vm.createSelectFork(vm.envString("RPC_URL"), BLOCK);

        ExampleProposal proposal = new ExampleProposal();

        hasBeenSubmitted = false;

        _setupSuite(address(proposal));
        _simulateProposal();
    }
}
```

Tests should assert the intended post-state, not only that setup succeeds.

Useful validations include:

- Parameter values changed as intended
- Market periods, facilities, or policies are enabled or disabled as intended
- Roles and permissions are present
- Timelock or Kernel dependencies are correct
- No stale pending state remains when it should be cleared
- Balances, caps, or limits are correct when relevant

## Dry-Run And Submission

Before any broadcast:

1. Run the proposal test on a mainnet fork.
2. Print proposal inputs.
3. Confirm proposer voting power and ETH balance.
4. Dry-run the exact submission command with broadcasting disabled.
5. Present the final payload for human approval.

For script-based proposals, submit through the script wrapper contract, not the
proposal contract directly.

```bash
src/scripts/proposals/submitProposal.sh \
  --file src/proposals/ExampleProposal.sol \
  --contract ExampleProposalScript \
  --chain "$RPC_URL" \
  --env .env.proposer \
  --broadcast false
```

Only after explicit approval should the same command be run with
`--broadcast true`.

## Proposer Readiness Checklist

Verify live:

- Proposer address
- Delegated gOHM votes
- Current proposal threshold
- Delegation transaction and block
- ETH balance for gas
- Signer or keystore access
- Ability to maintain threshold through `queue()` and `execute()`

Governor Bravo uses prior votes, so delegation must be mined before the proposal
submission block.

## Final Agent Output

Return a concise handoff with:

- Proposal branch and draft PR
- Contract map and verification source
- Files changed
- Test command and result
- Dry-run command and result
- Proposer readiness status
- Exact items needing human approval
