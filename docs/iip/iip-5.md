---
hide_title: true
title: IIP-5
sidebar_label: IIP-5
---

# IIP-5: Mining rewards based on Quadratic staking

`Author`: midenaio

`Status`: Review

`Type`: Standard

`Created`: 2022-07-12

`Discussion`: https://github.com/idena-network/idena-docs/discussions/81

## Abstract

Change the block reward distribution so that instead of a fixed mining reward, the block proposer and block validators are paid in proportion to their stake to the power of `0.9`. The proposed change affects only mining rewards distribution and does not affect the consensus mechanism, which implies equality of votes when verifying blocks according to the principle: `one node = one vote`.

## Motivation

Positive effects expected from the mining rewards based on Quadratic staking:

- Increasing the number of validating nodes
- Increasing the yield of Quadratic staking through the additional mining rewards that can be earned by running the Idena node
- Amplifying the positive effects of Quadratic staking described in [IIP-4](/docs/iip/iip-4)

## Specification

Currently the block reward of 6 iDNA is distributed `1 to 5`: 1 iDNA goes to a randomly selected block proposer and 5 iDNA is distributed equally among a randomly selected committee of 100 validators.

We propose to change the block rewards distribution in proportion to `stake^0.9` so that the proportion of `1 to 5` is preserved if the stakes of the proposer and all validators are equal.

The block rewards that are paid to the block proposer and block validators depend on their weights:

```
Proposer weight = Proposer stake ^ 0.9 * N / 5
Validator weight[i] = Validator stake[i] ^ 0.9
```

Where `N`=100 and `i`=1..`N`.

The block proposer and block validators get the following shares of the block reward of 6 iDNA:

```
Proposer share = Proposer weight / W
Validator share[i] = Validator weight[i] / W
```

Where `W` is the sum of `Proposer weight` and all `Validators weight[i]` for `i` = `1`..`N`:

```
W = Proposer weight + Sum ( Validator weight[i] )
```

The following rewards are paid to the block proposer and block validators:

```
Proposer block reward = Proposer share * 6 iDNA
Validator block reward [i] = Validator share[i] * 6 iDNA
```

#### Example 1

Example for `N`=`12` if the stake of the block proposer and all stakes validators are equal:

| Role         | Stake, iDNA | Weight | Share  | Block reward, iDNA |
| ------------ | ----------- | ------ | ------ | ------------------ |
| Proposer     | 100         | 2.40   | 0.1667 | 1.00               |
| Validator 1  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 2  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 3  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 4  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 5  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 6  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 7  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 8  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 9  | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 10 | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 11 | 100         | 1.00   | 0.0694 | 0.42               |
| Validator 12 | 100         | 1.00   | 0.0694 | 0.42               |
| Total        |             | 14.40  | 1.0000 | 6.00               |

#### Example 2

Example for `N`=`12` if the stake of one of the validators and the stake of the proposer is 100

| Role         | Stake, iDNA | Weight | Share  | Block reward, iDNA |
| ------------ | ----------- | ------ | ------ | ------------------ |
| Proposer     | 100         | 151.43 | 0.6715 | 4.03               |
| Validator 1  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 2  | 100         | 63.10  | 0.2798 | 1.68               |
| Validator 3  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 4  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 5  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 6  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 7  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 8  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 9  | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 10 | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 11 | 1           | 1.00   | 0.0044 | 0.03               |
| Validator 12 | 1           | 1.00   | 0.0044 | 0.03               |
| Total        |             | 225.53 | 1.0000 | 6.00               |

### Mining rewards in pools

Mining rewards for pools are calculated in the same way as for regular validators. If one of the pool participants gets into the committee, then the reward for the block verification will be determined by the size of the stake of this selected address.

If a pool owner is selected as the block proposer, the block reward is determined by the stake of the pool representative. The pool representative is selected from the list of all delegates using the round robin algorithm.

### Mining penalties

Because mining rewards during an epoch can change significantly due to stake replenishments, the penalties will be in the form of penalty seconds rather than penalty coins. That is, as an offline penalty, the user receives a penalty equal to 8 hours. As the node works, the penalty time will decrease, and the mined coins will be burnt.

## Rationale

There are currently 11k participants validated on the network, with only 9.6k+ participants taking part in block production. This means that about 1.4k participants are “sleeping”.

At the same time, there are around 900 online validating nodes.This is a fairly good indicator when compared to other blockchains, especially considering the fact that each Idena node has equal voting power. However, we see the potential to increase the number of validating nodes through activating “sleeping” validators and stimulating solo mining.

The current reward system assumes equal mining income in proportion to the number of accounts. However, the relatively small cost of maintaining one node (about $7-10 per month for renting a VPS) is not covered by solo mining income. Therefore, if possible, users delegate mining to pools, while solo miners simply turn off the nodes.

In order to allow solo miners to recoup the cost of running a node, we offer mining rewards based on the amount of staked coins. Thus, solo miners can influence the profitability of their mining by replenishing the stake of their identity and compete with pools that currently do not use staking, but gain high returns from mining blocks due to a large number of accounts.

In contrast with PoS system, the proposed changes affect only the reward distribution system, but do not affect the consensus mechanism in any way, which implies equality of votes when checking blocks according to the principle: one node = one vote.

See the difference between PoP and PoS:

![image](/img/iip/iip-5/PoSvsPoP.png)

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear any risks for the Idena protocol. If the proposed changes cause an unwanted imbalance in the economics of iDNA, it will be possible to revert the changes and return to the previous age-proportional rewards scheme by initiating a fork.
