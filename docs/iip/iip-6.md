---
hide_title: true
title: IIP-6
sidebar_label: IIP-6
---

# IIP-6: Quadratic invitation rewards

`Author`: midenaio

`Status`: Review

`Type`: Standard

`Created`: 2022-10-06

`Discussion`: https://github.com/idena-network/idena-docs/discussions/101

## Abstract

Change in invitation rewards distribution. Calculate invitation rewards in proportion to the size of the stake to the power of `0.9` and distribute invitation rewards between the inviter and the invitee.

## Motivation

As a result of the quadratic staking model, there is a drop in the size of the largest pools, while the number of mining nodes remains at the same level. We see this as a good signal that the network is recovering. Solo miners and family pools continue running their nodes.

![image](/img/iip/iip-6/validators.png)
![image](/img/iip/iip-6/top10pools.png)

Reducing the size of the pools does not affect the performance of the network. Each pool runs only one node and a large number of accounts in pools does not make the network diverse or decentralized. Moreover, as the pools shrink, the rewards for solo miners and family pools increase, making solo mining more profitable.

However, fighting large pools is not our end goal. An increase in the number of independent mining nodes is needed. To do this, we need to stimulate the growth of the network associated with the organic core of the community. This is why we propose to change the invitation rewards making it aligned with the quadrating staking ideology.

## Specification

Instead of flat invitation rewards, we suggest calculating them proportionally to the size of the inviter's stake to the power of 0.9 and the time when the invite was issued. The invitation rewards will be paid out for 3 epochs in a row, with part of the reward sent and locked in the Newbie stake.

| Epoch | Inviter reward (80/20) | Invitee reward (staked) |
| ----- | ---------------------- | ----------------------- |
| 1     | 20%                    | 80%                     |
| 2     | 50%                    | 50%                     |
| 3     | 80%                    | 20%                     |

80% of the reward that the inviter receives goes to the wallet, and 20% goes to the stake.

The invitee’s reward is blocked in the stake and is not returned to the main wallet when the Verified status is reached. This encourages newcomers to run a node and get mining rewards.

If the inviter was penalized for a bad flip, the invitation rewards are not paid neither to the inviter nor to the invitee.

If the invitee was penalized for a bad flip, the invitation reward is not paid to the invitee.

The proposed changes affect only the invitation rewards distribution. The invitation distribution algorithm does not change.

Also, the mechanism for reducing the amount of rewards for invites, depending on the time of activation of the invite, remains unchanged. Invites activated at the end of an epoch are rewarded 2 times less than invites activated at the beginning of an epoch.

![image](/img/iip/iip-6/discounts.png)

## Rationale

We rely on organic and decentralized network growth. Until now, the network has grown aggressively because of the pools’ growth. The proposed system rewards the users who have invested the most in their stake for involving their friends and families.

1. Users who replenish their stakes will get more motivation to invite their friends.

2. Newcomers will get the opportunity to receive mining rewards at the level of other participants immediately after the first validation.

In the new system, not all invites will be equal. For newcomers, it becomes more profitable to get an invite from an account with a large stake. This will provide them with a substantial stake from the first validation and the opportunity to receive rewards for mining and validation comparable with other participants in the subsequent epochs.

3. The proposed change will mitigate the self-invitation problem exploited by pools that do not stake their coins. Invitation rewards for these pools will be significantly decreased.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear risks for the Idena protocol. If the proposed changes cause an unwanted imbalance in the economics of iDNA, it will be possible to revert the changes and return to the previous flat invitation rewards by initiating a fork.
