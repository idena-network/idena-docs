---
hide_title: true
title: IIP-11
sidebar_label: IIP-11 Minimal stake
---

## IIP-11: Increasing the cost of 51% attack

`Author`: midenaio

`Status`: Final

`Type`: Standard

`Created`: 2023-06-13

`Discussion`: https://github.com/idena-network/idena-docs/discussions/143

## Abstract

Increase the cost of 51% attack by disregarding votes from identities with stake amounts below a certain threshold. This threshold is set as a percentage of the median stake of top 100 accounts.

## Motivation

At present, to attack the network or any voting it is enough to validate a certain number of accounts (51% of the network size) by paying individuals to participate in the validation ceremony and operate separate mining nodes instead of delegating into a pool.

This proposal is made to increase the cost of 51% attack.

## Specification

To increase the cost of an attack on the Idena network we propose disregarding votes from identities with stake amounts below a certain threshold. The threshold is set dynamically based on the median stake of top accounts which prevents a malicious attacker with a large number of identities from manipulating the threshold.
The calculation of the threshold includes to following steps:

1. Calculate `median_top100` as the median stake held by the top 100 validated accounts. This value represents a stake of an average wealthy account (excluding zombie and suspended).
2. Calculate the threshold value as 0.5% of the `median_top100`:

```
 Threshold = 0.005 * median_top100
```

The threshold will be calculated once per epoch immediately after validation ceremony and will not change during the epoch (for example, due to stake replenishments or identity terminations).

Votes cast by identities with stake amounts below this threshold will not be taken into consideration in following cases:

- Oracle votes
- Votings for proposed blocks
- Votings for hard forks activation
- Voting for late submission (evidenceMap transactions)

All rewards, including mining rewards and Oracle rewards, will remain unaffected. If an identity participates in the Oracle voting, it will receive an Oracle reward just like other identities.

## Rationale

Currently the cost of 51% attack includes only the costs for validation (paying people to validate accounts that belong to an attacker) as well as the costs of operating separate mining nodes. Stake is not included in the cost of 51% attack.

As observed in the past, a single pool was able to validate and effectively [manage up to 1,400 accounts](https://scan.idena.io/pool/0x96d11da40FDe82D81ebE0EAE61bFe6a47F43d1a6#sizeHistory). Apparently, the owner has access to low-cost workers who either lack interest or awareness in managing their own accounts, and they are willing to validate identities in exchange for a small fee. Due to changes in the protocol’s tokenomics and transition to quadratic rewards, which are based on the identity’s stake, pools of such significant size no longer exist. Nevertheless, the potential for an attack remains real. It is crucial to increase the safety measures for the protocol.

This proposal suggests excluding voting power from identities that have a stake amount below the threshold. By doing so, we raise the cost of an attack because it becomes necessary to replenish the stakes of validated accounts in order to launch an attack against the protocol.

Let’s see the current state of the network and calculate the threshold:

- The current network size = 1639 identities
- The median of top 100 accounts = 64,582 IDNA
- The threshold = 0.5% \* 64,582 IDNA = 323 IDNA

The number of identities with stake amount below the threshold = 861 identities. Out of these, approximately 86% of them are already discriminated because they either have a Newbie status or have delegated their mining status to a pool.

If we take a look at top 10 pools, it becomes clear that the majority of their accounts have small stakes. As a result, if these pools deliberately decide to undelegate, they will not be able to perform 51% attack unless they make investments in stakes for each individual identity.

![image](/img/iip/iip-11/pools.png)

The calculations over a period of time show that the share of identities with a stake below this threshold falls within the range of 50-55% for recent epochs.

![image](/img/iip/iip-11/dynamics.png)

## Backward Compatibility

The changes require a hard fork.

## Security Considerations

Vectors of attack to manipulate threshold:

- Manipulating the threshold is not possible by just creating multiple accounts since the threshold is not dependent on the network size. Instead, a fixed number of accounts (100 in total) with the highest stakes are used.

- Increasing the threshold through collusion among wealthy accounts is difficult. It would require collusion and increasing the stakes of the majority of the top 100 accounts. Increasing stake by a single account can not significantly change the median value calculated across 100 accounts (in contrast to average that could be easier to manipulate).

- The threshold may decrease if a significant number of top accounts are terminated or failed validation.

The future impact of this proposal on the cost of a 51% attack:

- The cost of a 51% attack, measured in IDNA, will increase with the growth of the network size and the median stake of the top 100 accounts
- The cost of a 51% attack, expressed in dollars, will increase with the rising IDNA price as the network adoption expands
- The number of accounts used to calculate the median (100) and the coefficient for calculating the threshold (0.5%) may be reviewed in future forks based on the dynamic growth of the network and the size of the stakes.

As this change affects the protocol security, there is no preliminary Oracle voting regarding IIP-11. This change will be voted on by the validators at the next hard fork activation.
