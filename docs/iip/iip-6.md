---
hide_title: true
title: IIP-6
sidebar_label: IIP-6
---

## IIP-6: Change the requirements needed to reach quorum in Oracle Votings

`Author`: Zen

`Status`: Review

`Type`: Standard

`Created`: 2022-08-22

`Discussion`: https://github.com/idena-network/idena-docs/discussions/93

`Translations`: 

### Abstract

The quorum represents the minimum number of votes in an Oracle Voting required to move to the public voting phase. The quorum should only be reached only when the total number of non-discriminated votes reaches the quorum value.

### Motivation
  
At the moment in time when an oracle reaches its quorum, it is expected that all votes sent to that point can be taken into consideration if published.    
Currently, the quorum can be reached with pool votes, which do not make a difference in the final outcome of the voting. This can lead to a premature reaching of the quorum: an oracle moving to the public vote phase even if the total number of not-discriminated votes is below the quorum limit. 

Examples:
- An ad review oracle (3 votes required) receives 1 vote from an independent identity and 2 votes from identities within the same pool. This vote would move to the public voting phase, even if the total number of votes that can be counted is 2 (one from the independent identity, one from the pool), less than the set quorum.
- A poll oracle with 150 votes required receives 50 votes from independent identities. Near the date when public voting is supposed to be started, a pool with 100 identities can accelerate the voting and not leave it to be prolonged as it should be. This may be motivated by a pool wanting to unlock the prize pool of the oracle faster. The author would have to recreate the oracle voting since they had no chance of prolonging the vote to obtain more useful votes.

### Specification

For simplicity, the `sendVoteProof` function of the Oracle Vote smart contract can track the non-discriminated votes count in an additional variable. This variable will be used to check if the quorum has been reached instead of `secretVotesCount`. The pool tracking mechanism used to check if the variable should be incremented or not can be similar to the one used in the `sendVote` function.

The variable is incremented according to the statement `1 pool = 1 vote`. This means that for the first vote coming from a pool, this variable will be incremented. Any votes coming after that from the same pool will no longer increment this variable. 

### Rationale

The modification of the smart contract code provides the best solution to address this problem. Leaving the authors to artificially increase their quorum size to prevent similar scenarios does not solve the problem completely. It may even make it harder for their vote to reach quorum due to the artificial increase while still leaving room for potential pool manipulation to some extent.

Authors may also be incentivized to not set any prize pool for oracles. Due to an oracle having no rewards for the voters, and pools only being able to send one counting vote, farm-like pools would be encouraged to only vote once using one identity since they won't be getting increasing rewards with each vote, but instead lose funds to transaction fees.

These changes do not interfere with the way votes are counted. It only affects the quorum requirement.

The benefits of these changes outweigh the additional computation required by the `sendVoteProof` function (slightly higher fees).

### Backwards Compatibility

The described changes require a hard fork as the Oracle Voting smart contract code is embedded in the core client code.

The changes do not require any client update and do not affect the way users interact with the smart contract.

### Security Considerations

This IIP only affects the Oracle Vote smart contract and aims to improve its security by removing potential pool manipulation.
