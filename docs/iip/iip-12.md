---
hide_title: true
title: IIP-12
sidebar_label: IIP-12 Invitee rewards
---

## IIP-12: Locking invitee rewards

`Author`: midenaio

`Status`: Final

`Type`: Standard

`Created`: 2023-06-20

`Discussion`: https://github.com/idena-network/idena-docs/discussions/149

`Translations`:

## Abstract

Lock invitee rewards for 10 subsequent epochs

## Motivation

Some people take advantage of the chance to gain substantial invitee rewards from a staker with high stake. They validate identities until they reach a Verified status, and then terminate those identities in order to transfer these rewards in their normal wallet. Subsequently, they hunt for another invitation with a high stake and repeat the process.
Here are the examples of such behavior:

https://scan.idena.io/identity/0x6FDe62176DA5b816Fa150d222672f3c468Fc65BC

https://scan.idena.io/identity/0x0030AaebcD8B8Dbc7e44d54E1f9621e661691d7F

https://scan.idena.io/identity/0x0BabFA44201A4ab0878D56c0Dc32d347beA8B057

https://scan.idena.io/identity/0x13854c32cbC74Eb904Cd043Bc488B7422583C387

![image](/img/iip/iip-12/example.png)
This proposal is aimed at demotivating the abuse of invitee's rewards.

## Specification

Lock invitee rewards in identity stake for a duration of 10 epochs to prevent the abuse of these rewards. APY on this part of the stake is calculated in the same way as on a regular stake.

If an identity is terminated or if an identity is killed due to missing or failing validations before the completion of 10 epochs, the entire sum of invitee rewards is burned. Stake protection does not apply to invitee rewards in this case. The remaining part of stake, with stake protection taken into account, is transferred to a regular wallet.

After 10 epochs, the lock of invitee rewards is no longer applicable. These rewards are treated the same way as the regular stake.

## Rationale

- Mitigating the abuse of invitee rewards by increasing costs of repeatedly validating and terminating accounts invited by identities with high stakes
- New users will get more chances to receive invitations from identities with high stakes

## Backward Compatibility

The changes require a hard fork.

## Security Considerations

Since receiving an invitee reward requires passing 10 validations instead of 3, this solution mitigates invite abuse by making the cost of abuse more than three times higher. However, the solution does not completely eliminate the possibility of invitee's rewards abuse.

As this change is aimed to mitigate the vulnerability in invitee’s reward distribution, there will be no preliminary Oracle voting regarding IIP-12. This change will be voted on by the validators at the next hard fork activation.
