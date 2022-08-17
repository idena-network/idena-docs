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

`Translations`: [🇷🇺](https://medium.com/idena/fd46e720304) 

## Abstract

Change the block reward distribution so that instead of a fixed mining reward, the block proposer and block validators are paid in proportion to their stake to the power of `0.9`. The proposed change affects only mining rewards distribution and does not affect the consensus mechanism, which implies equality of votes when verifying blocks according to the principle: `one node = one vote`.

## Motivation

Despite the principle of `one person=one vote`, with the growth of the network, the number of nodes does not increase, but falls. This is due to the concentration of mining rewards earned by pools which demotivates solo users to keep their nodes. There are 8k accounts represented by only ~40 nodes (large pools). Solo users cannot compete with pools and simply shut down their nodes. The network growth associated with the growth of pools does not increase the number of nodes run by independent validators. We believe that this is contrary to our goals and interferes with the solution of the scalability trilemma which requires excessive decentralization.

With quadratic mining rewards, several hundred dormant nodes can be back in the game. Due to the large stake discrimination (stake^0.9), we will provide resistance to the capture of the network by large stakeholders. With the dominance of large stakeholders, the degree can be revised by the network in future.

Positive effects expected from the mining rewards based on Quadratic staking:

- Increasing the number of validating nodes
- Increasing the yield of Quadratic staking through the additional mining rewards that can be earned by running the Idena node
- Amplifying the positive effects of Quadratic staking described in [IIP-4](/docs/iip/iip-4)
- Reducing mining rewards of pools which do not replenish the stakes of their accounts

See the difference between mining rewards distribution before and after IIP-5:

![image](/img/iip/iip-5/BeforeAfterChart.png)
![image](/img/iip/iip-5/BeforeAfterTable.png)

For newcomers and users with small stakes the mining rewards in iDNA will decrease. On the other hand, stimulating competition for mining from large stakeholders is aimed at increasing the valuation of the network and increasing the income from mining, denominated in US dollars, for all network participants, including users with small stakes.

You can check the estimated mining rewards using the [staking calculator](https://idena.io/staking).

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

| Role         | Stake, iDNA |    Weight |      Share | Block reward, iDNA |
| ------------ | ----------: | --------: | ---------: | -----------------: |
| Proposer     |           1 |      2.40 |     0.1667 |               1.00 |
| Validator 1  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 2  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 3  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 4  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 5  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 6  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 7  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 8  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 9  |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 10 |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 11 |           1 |      1.00 |     0.0694 |               0.42 |
| Validator 12 |           1 |      1.00 |     0.0694 |               0.42 |
| **Total**    |             | **14.40** | **1.0000** |           **6.00** |

#### Example 2

Example for `N`=`12` if the stake of one of the validators and the stake of the proposer is 100

| Role         | Stake, iDNA |     Weight |      Share | Block reward, iDNA |
| ------------ | ----------: | ---------: | ---------: | -----------------: |
| Proposer     |         100 |     151.43 |     0.6715 |               4.03 |
| Validator 1  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 2  |         100 |      63.10 |     0.2798 |               1.68 |
| Validator 3  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 4  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 5  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 6  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 7  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 8  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 9  |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 10 |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 11 |           1 |       1.00 |     0.0044 |               0.03 |
| Validator 12 |           1 |       1.00 |     0.0044 |               0.03 |
| **Total**    |             | **225.53** | **1.0000** |           **6.00** |

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

### Modeling

We've run a model emulating mining rewards distribution during the epoch `#0087` before and after the IIP-5 changes. The model doesn’t include possible mining rewards of the sleeping miners but reflects the possible mining rewards of validators who were actively running their nodes during the epoch `#0087`.

| Category by pool size | Number of nodes           | Mining rewards before IIP-5 | Mining rewards after IIP-5 |
| --------------------- | ------------------------- | --------------------------: | -------------------------: |
| Solo miners [1]       | 618                       |                 28 282 iDNA |               110 085 iDNA |
| Family pools [2..15]  | 237                       |                 40 284 iDNA |               113 642 iDNA |
| Medium pools [16..50] | 39                        |                 31 854 iDNA |                30 275 iDNA |
| Large pools [51+]     | 38                        |                240 810 iDNA |               163 868 iDNA |
| Delegated identities  | 10 029 (not running node) |                168 968 iDNA |                92 325 iDNA |
| **Total**             | **932**                   |            **510 198 iDNA** |           **510 198 iDNA** |

Before IIP-5 changes were made there were 618 solo miners earning 28k iDNA per epoch. At the same time there were 38 large pools earning more than 400k iDNA together with their delegatees getting rewards into stakes.

After the IIP-5 changes the distribution of rewards shifts in a favor of solo miners and family pools who mainly replenish their stakes.

#### Stake distibution of the solo miners

There were 618 solo miners running their nodes during the epoch `#0087`. We've run a model for the mining rewards of the solo miners depending on their stakes.

| Category by stake        | Number of nodes | Avg. rewards before IIP-5 | Avg. rewards after IIP-5 |
| ------------------------ | --------------- | ------------------------: | -----------------------: |
| Small stake [0..500]     | 419             |                   46 iDNA |                  44 iDNA |
| Medium stake [500..10k]  | 174             |                   45 iDNA |                 252 iDNA |
| Large stake [10k..100k]  | 22              |                   47 iDNA |               1 670 iDNA |
| Very large stake [100k+] | 3               |                   49 iDNA |               3 655 iDNA |
| **Total**                | **618**         |                           |                          |

Quadratic nature of the mining rewards gives a higher yield for the smaller stakes. This means that the mining income of the validators with a small stake is not affected significantly while encouraging them to increase their stakes.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear any risks for the Idena protocol. If the proposed changes cause an unwanted imbalance in the economics of iDNA, it will be possible to revert the changes and return to the previous age-proportional rewards scheme by initiating a fork.
