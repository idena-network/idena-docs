---
hide_title: true
title: IIP-7
sidebar_label: IIP-7 Extra flips rewards
sidebar_position: 1
---

## IIP-7: Quadratic rewards for extra flips

`Author`: midenaio

`Status`: Final

`Type`: Standard

`Created`: 2022-11-21

`Discussion`: https://github.com/idena-network/idena-docs/discussions/112

`Translations`: [🇷🇺](https://medium.com/idena/64561375cd64)

## Abstract

Change in flip rewards distribution. Calculate rewards for extra flips in proportion to the size of the stake to the power of `0.9`.

## Motivation

As the flip rewards became low relative to the staking rewards that users get for validation, we see that less and less people are motivated to create extra optional flips.

![image](/img/iip/iip-7/extraflips.png)

The extra flips are usually harder to make because people tend to choose the simplest obvious pairs of keywords for three obligatory flips. That is why we consider optional flips to be more AI-resistant as their keyword pairs are most likely not obvious to make a template flip.

Also, the more flips you create, the more you take the risk of one of your flips being reported and losing rewards for validation. Therefore, extra flips should be rewarded more to motivate users.

Flips in large pools are created in a centralized way. As pool flip makers create flips for many identities, they often use some templates, e.g. “wake up” flips or “painter” flips. AI can be trained to solve this kind of flips which jeopardize the network security.

For the security purpose we need more diverse flips created by independent users.

## Specification

We suggest to split the flip reward fund into 2 parts:

1. Basic rewards for flips
2. Premiums for extra flips.

As an initial ratio, the 3/4 split will be applied. This ratio may be revised in the future.

| Total rewards            | Before   | After     |
| ------------------------ | -------- | --------- |
| Staking rewards          | 18%      | As before |
| Candidates rewards       | 2%       | As before |
| Flip rewards             | 35%      | 15%       |
| Extra flip rewards       | -        | 20%       |
| Invitation rewards       | 18%      | As before |
| Reports rewards          | 15%      | As before |
| Idena foundation payouts | 10%      | As before |
| Zero wallet fund         | 2%       | As before |
| **Total**                | **100%** | **100%**  |

The Flip rewards fund will be distributed as it is now. Extra flips will be paid in addition to the basic flip rewards.

The fund for extra flip rewards will be distributed proportionally to the authors’ stakes^0.9. It will be paid out only to those authors who created 4 or 5 qualified flips which are not reported. Flips with minimal grades will be selected as extra flips.

Every extra flip gets a weight that is determined as follows:

```
weight[i]= stake[i]^0.9 * grade[i]
```

where
`stake[i]` is the stake of flip’s author
`grade[i]` is the grade coefficient of extra flip: 1, 2, 4 or 8 (see details [here](https://docs.idena.io/docs/wp/economics#flip-reward-fund))

Every extra flip gets a `share` of the **Extra flip rewards** fund `F`:

```
share[i] = weight[i] / W
```

where `W` - is the sum of all weights of all extra flips:

```
W = sum( weight[i] )
```

Every extra flip gets a reward proportional to its share:

```
Extra flip reward[i] = F * share[i]
```

## Rationale

1. The proposed changes will incentivise people to create more extra flips and provide opportunities to earn substantial rewards for their extra flips paying back the increased risks of being reported. In addition, we expect that the flip quality will be gradually improved as users who have stakes at risk are more likely to create flips in accordance with rules rather than low quality flips which have high risks of being reported.

2. The proposal will affect large pools that do not contribute to sustainable decentralization. Together with IIP-6 (quadratic invitation rewards) the changes will lead to reduction of the total rewards for pools that do not stake coins.
   If we take a look at the rewards of the [largest pool](https://scan.idena.io/pool/0x96d11da40FDe82D81ebE0EAE61bFe6a47F43d1a6#rewards), we see that it gets the substantial rewards from both invitations (this should be mitigated after [IIP-6](https://docs.idena.io/docs/iip/iip-6) which is already approved by the community) and flips.

![image](/img/iip/iip-7/pools.png)

3. Extra flips are created mostly by independent users and family pools (see the chart below). This is due to the fact that pools create flips centrally and the creation of additional flips leads to an increase in their costs with a simultaneous increase in the risk of getting a report for a flip.

![image](/img/iip/iip-7/rewards.png)

As large pools do not stake coins, creating extra flips for them is both risky and not economically viable. Thus, the proposed changes will lead to a decrease in the relative proportion of template flips created by pools and an increase in the total number of unique flips due to extra flips created by individuals, which is the goal of this IIP.

## Future Improvement

If the proposed mechanism leads to the creation of a significant number of extra flips by a large number of individual participants, then in the future it will be possible to reduce the number of mandatory flips from 3 to 2.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear risks for the Idena protocol. If the proposed changes cause an unwanted imbalance in the economics of iDNA, it will be possible to revert the changes and return to the previous flat flip rewards by initiating a fork.
