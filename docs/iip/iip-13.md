---
hide_title: true
title: IIP-13
sidebar_label: IIP-13
---

# IIP-13: Burning the rewards of penalized identities

`Author`: Zen

`Status`: Review

`Type`: Standard

`Created`: 2023-06-22

`Discussion`: https://github.com/idena-network/idena-docs/discussions/146

`Translations`:

## Abstract

Send the rewards of penalized identities during validation ceremonies to the zero wallet.

## Motivation

The current protocol redistributes the rewards of penalized identities during validation ceremonies (identities with reported flips).  This acted as a form of passive reward since everyone received a higher payout by reporting bad flips and not having their own flips reported.    
The current report reward fund does a better job of incentivizing correct flip reporting by directly rewarding correct reports.

At the moment, since the money in the zero wallet can not be spent, sending the penalties to it is equivalent to burning them.

Both the current model and the proposed one redistribute the value of the penalty to the rest of the network. However, the additional funds accumulated from the penalties in the zero wallet can help fund more initiatives in the future.

From the perspective of reward distribution, currently, there is no difference between the number of reported identities and the number of identities that missed the validation. They are not taken into consideration for the rewards distribution even though they participated in the ceremony. This is unlike other penalties where the "loss" of an identity that is actively participating is burnt (mining penalty, validation failure for identities without stake protection).

## Specification

The validation rewards of identities that have reported flips during validation ceremonies will be sent to the [zero wallet](https://scan.idena.io/address/0x0000000000000000000000000000000000000000) instead of being redistributed to the rest of the ceremony participants.

## Rationale

* The report reward scheme is more adequate in rewarding correct flips reports.
* The passive increase of rewards became insignificant after report rewards were implemented.
* After a spending solution is found for the zero wallet, the funds accumulated in it can help finance community projects.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

This proposal does not bear any risks for the Idena protocol.
