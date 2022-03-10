---
hide_title: true
title: IIP-4
sidebar_label: IIP-4
---

# IIP-4: Quadratic Staking

`Author`: midenaio

`Status`: Review

`Type`: Standard

`Created`: 2022-03-10

`Discussion`: https://github.com/idena-network/idena-docs/discussions/69

## Abstract

Instead of rewards paid for identity age, introduce quadratic staking rewards paid to validated identities proportional to their stake to the power of `0.9`. Allow identity stake replenishment. The amount of staked coins does not affect the voting power of the identity.

## Motivation

Staking is the way to earn rewards by holding the coins. Staking makes a tokenomy attractive for investors and reduces inflation by locking coins in stakes. However the traditional (linear) staking leads to inequality because large coin holders can extract the major part of the profits from staking. With Proof-of-Personhood in mind, we can offer quadratic staking reward schemes that are free of capital bias.

Currently, Idena staking is passive, which means that 20% of the income is automatically accumulated in the identity’s stake. At the same time, no rewards are paid for holding the stake. The stake cannot be withdrawn without terminating the identity. Identity’s stake is a security measure that ensures that the private key of a valid identity cannot be purchased without the risk of losing the stake and identity status. We see benefits in being able to replenish the identity stake and get rewarded for that but only if it leads to a balanced rise in stakes for a large number of identities. We consider the staking to be undesirable when it leads to the domination of a few large coin holders. We propose quadratic staking that discriminates against large coin holders and encourages smaller players to increase their stakes.

Positive effects of quadratic staking:

1. Quadratic staking is to make the iDNA coin more attractive for investors and reduce inflation by locking coins in stakes. This can lead to faster network growth.
1. Quadratic staking can make an older identity more valuable and would incentivize people to not terminate their identities.
1. Quadratic staking can improve security of the protocol because larger stakes increase the value of each identity. In other words, quadratic staking will lead to the growth of the capitalization of many identities resulting in higher security of the network.

## Specification

#### Governance

The higher amount of coins locked in the stake does not give more voting power to identity.

#### Identity stake replenishments

Any validated identity will be able to replenish the stake to earn quadratic staking rewards. To do this, a `StakeDNA` transaction will be added. This transaction can be sent at any time except for validation.

Stake withdrawal will be possible only by terminating the identity, as it is now.

#### Stake protection from burning

The proposal does not change the existing mechanics of the stake protection. A stake is protected from burning only for the identities with the Human status. If a Human fails validation, the identity goes to the Suspended status, and the owner can terminate the identity and withdraw the stake. Identities of other statuses do not have stake protection privilege.

#### Rewards payment procedure

Staking rewards are based on the identity's stake amount before validation and accrued after the end of validation, regardless of how long ago the stake was replenished

#### Quadratic staking rewards funding

The proposed source for the quadratic staking rewards is the Validation Rewards Fund which is currently 20% of the total Validation Session Fund. The original purpose of the Validation Rewards Fund was to incentivize users to maintain the validation status of older identities. Candidates who validate for the first time also get rewards from this fund. The fund currently accounts for 20% of the Validation Session Fund (see [iDNA economics](https://docs.idena.io/docs/wp/economics#economics-of-the-idna) for details).

This proposal is to split the Validation rewards fund into two parts:

- Candidate rewards fund: 2% - a fixed payment to new users for validation;
- Staking rewards fund: 18% - rewards for quadratic staking.

| Total rewards            | Before 100% | After 100% |
| ------------------------ | ----------- | ---------- |
| Validation rewards       | 20%         | -          |
| Staking rewards          | -           | 18%        |
| Candidates rewards       | -           | 2%         |
| Flip rewards             | 35%         | As before  |
| Invitation rewards       | 18%         | As before  |
| Reports rewards          | 15%         | As before  |
| Idena foundation payouts | 10%         | As before  |
| Zero wallet fund         | 2%          | As before  |

### Identity reward for quadratic staking calculation

The distribution of rewards for staking depends on the `weight` of identity `i` calculated as the amount of coins locked in stake to the power of `p`, where `p=0.9`:

```
weight[i] = stake[i]^p
```

Every identity `i` gets `share[i]` from the Staking reward fund `F`:

```
share[i] = weight[i]/W
```

Where `W` is the sum of all `weight[i]` for all validated identities:

```
W = sum( weight[i] )
```

Identity `i` gets paid with staking `reward[i]` proportionally to the share:

```
reward[i] = F\W * share[i]
```

Identity `i` earns epoch percentage yield `r[i]` for the quadratic staking:

```
r[i] = reward[i] / stake[i]
```

## Rationale

Quadratic staking can lead to the following effects:

1. Users will have more motivation to maintain their identity for a longer period. The age-dependent rewards from the Validation Rewards Fund are not a sufficient incentive to maintain an identity because users cannot adjust their age to get more rewards than the identities who joined the network earlier.
1. Since only identities with Human status have their stake protected from burning, we expect fewer identity terminations after reaching the Verified status, and less abuse of invites by validating the second identity. On the contrary, users will have the motivation to maintain Human status to enjoy staking rewards. At the same time, more spare invites will go to new users who want to join the network.
1. Quadratic staking will not allow large stakeholders to get high staking rewards, thus leveling the playfield for everyone. For example, with regular staking, if the stake of one participant exceeds 50% of all staked coins, then the staking reward of this participant can be more than 50% of the staking reward fund. With quadratic staking, the yield % goes down as the stake size increases.
1. Large coin holders are encouraged to distribute their stake among multiple identities to maximize their profit from staking.
1. Pools are encouraged to distribute their capital across as many addresses as they have. On one hand, this improves protocol security. On the other hand, this will allow pools with a large number of addresses to get a higher interest rate on their capital than the identities with a large stake under a single address.
1. iDNA coin will become more attractive to invest in. Staking can reduce inflation by increasing the number of coins locked. This will lead to faster network growth.
1. The security of the protocol will increase due to the capitalization of the stake of each individual identity. Large identity stakes prevent buying and selling identities because the seller can terminate the identity after the sell and withdraw the stake.
1. Since the staking reward fund is limited to only 18% of the validation fund, and the other components of the validation fund remain the same, this small change in motivation can hardly reduce the security of the invitation system, cause lower quality flips, or affect reporting.

### Why Candidates Rewards Fund is 2%

This proposal is to split the Validation Rewards Fund into two parts:

- Candidate Rewards Fund: 2%;
- Staking Rewards Fund: 18%.

We aim to keep rewards paid to the new users at the same level. Let’s check actual rewards paid to Candidates in epoch #80.

The payments for the [epoch #80 were as follows](https://scan.idena.io/epoch/81/rewards):

- Total Validation Session Fund: 545,268 IDNA (100%)
- Validation Rewards Fund: 109,054 IDNA (20%)

The Validation Rewards Fund was distributed proportional to identities ages in 80th epoch (109,054 IDNA) as following:

- Single Candidate reward was 5.044 IDNA
- Total number of Candidates awarded: 1,999

Overall Candidates earned 10,082 IDNA. This is equal to ~2% of the total Validation Session Fund.

### Model distribution quadratic staking rewards

According to this proposal, Staking Reward Fund for the epoch #80 would have been 98,148 IDNA (18%). Let’s model the distribution of this fund for 4 groups of users A, B, C and D having the following stakes:

| Type of user | Number of users | Stake, iDNA |
| ------------ | --------------- | ----------- |
| A            | 10              | 100,000     |
| B            | 100             | 10,000      |
| C            | 1,000           | 1,000       |
| D            | 10,000          | 100         |

In this model there are 4,000,000 iDNAs locked in total. The larger the total amount of coins locked in stakes by all participants the lower the yield that every participant can earn. This is also true for regular (linear) staking. With regular linear staking, the persentage yield would be fixed for all participants, regardless of the amount of their stake (98,148 IDNA / 4,000,000 = 2.4%).

However, for Quadratic staking, the distribution of rewards depends on the amount of stake to the power of 0.9. Therefore, the higher the stake the lower the yield.

Model distribution of the quadratic staking rewards:

| Investor | Stake, iDNA | Number of users | Weight (stake^0.9) | Epoch percentage yield |
| -------- | ----------- | --------------- | ------------------ | ---------------------- |
| A        | 100,000     | 10              | 31,622             | 1.68% (1,680 iDNA)     |
| B        | 10,000      | 100             | 3,981              | 2.1% (216 iDNA)        |
| C        | 1,000       | 1,000           | 501                | 2.7% (26.6 iDNA)       |
| D        | 100         | 10,000          | 63                 | 3.4% (3.35 iDNA)       |

Model parameters:

- Total users: 11,110
- Total stakes: 4,000,000 iDNA
- Stake rewards fund: 98,148 iDNA
- APY: 29%..59%

The example shows that the lower the stake, the higher the yield. On the one hand, this will eliminate inequality of rewards for large and small stakeholders. On the other hand, this will encourage pools to distribute capital evenly across all their identities.

You can also check the [model distribution](https://docs.google.com/spreadsheets/d/1MIb4HTJjMm7rv5rjQOP3XkkcxdJrOCg3uBPbtgQq8fA/edit#gid=29184198) of the quadratic staking rewards for the actual addresses in epoch #80.

### Why `p=0.9` is used for the quadratic staking rewards calculation

The power `p` to which identity stake `s` is raised shows how much large coin holders will be discriminated against:

```
weight=stake^p
```

#### Let `p=1`

With usual linear staking where `p=1`, the yield is fixed for all participants, regardless of the amount of stake.

| Investor | Stake, iDNA | Number of users | Weight (stake^0.9) | Epoch percentage yield |
| -------- | ----------- | --------------- | ------------------ | ---------------------- |
| A        | 100,000     | 10              | 100,000            | 2.45% (2.4 iDNA)       |
| B        | 10,000      | 100             | 10,000             | 2.45% (2.4 iDNA)       |
| C        | 1,000       | 1,000           | 1,000              | 2.45% (2.4 iDNA)       |
| D        | 100         | 10,000          | 100                | 2.45% (2.4 iDNA)       |

Model parameters:

- Total users: 11,110
- Total stakes: 4,000,000 iDNA
- Stake rewards fund: 98,148 iDNA
- APY: 42.7%

This type of staking is undesirable since it leads to the domination of large coin holders. It also discourages small investors to stake their coins. Pool owners do not get incentives to increase stakes of their identities since they can get the same yield just by keeping all their coins locked in a single identity stake.

#### Let `p=0.5`

Let's also consider the alternative when p=0.5

> _Note: The name of quadratic staking is taken from the name of quadratic funding where the weight of each investor depends on the square root of his contribution (power of 0.5). This allows taking into account the interests of many small independent investors_

| Investor | Stake, iDNA | Number of users | Weight (stake^0.9) | Epoch percentage yield |
| -------- | ----------- | --------------- | ------------------ | ---------------------- |
| A        | 100,000     | 10              | 316                | 0.21% (214.4 iDNA)     |
| B        | 10,000      | 100             | 100                | 0.68% (67.8 iDNA)      |
| C        | 1,000       | 1,000           | 31.6               | 2.14% (21.4 iDNA)      |
| D        | 100         | 10,000          | 10                 | 6.78% (6.8 iDNA)       |

Model parameters:

- Total users: 11,110
- Total stakes: 4,000,000 iDNA
- Stake rewards fund: 98,148 iDNA
- APY: 3.6%..118%

The distribution of staking rewards which depends on the amount of stake to the power of 0.5 will effectively encourage pools to distribute their coins across as many identities to earn the high yield. However this leads to the disproportional domination of large pool owners and discourages independent users increasing their stakes.

#### Let `p=0.9`

The proposed stake discrimination factor of `0.9` seems to be the optimal value in the range between 0.5 and 1 and leads to the following positive effects:

1. It will not allow large stakeholders to dominate by getting high staking rewards, thus leveling the playfield for everyone. Yield % goes down as the stake size increases.
1. Small investors are encouraged to stake their coins.
1. Large coin holders are encouraged to distribute their stake among multiple identities to maximize their profit from staking.
1. Pools are encouraged to distribute their capital across as many addresses as they have. Pools can get a higher yield on their capital than a single identity with the same amount of coins.

## Why use “quadratic” in IIP naming

Although the word “quadratic” or “square” refers to the power of 0.5 rather than 0.9, we have retained this word in the IIP name because it reflects the spirit of quadratic funding, which takes into account the interests of small independent participants.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear any risks for the Idena protocol. If the proposed changes cause an unwanted imbalance in the economics of iDNA, it will be possible to revert the changes and return to the previous age-proportional rewards scheme by initiating a fork.
