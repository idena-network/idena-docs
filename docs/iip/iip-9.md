---
hide_title: true
title: IIP-9
sidebar_label: IIP-9
---

# IIP-9: Change the epoch length

`Author`: midenaio

`Status`: Final

`Type`: Standard

`Created`: 2022-05-23

`Discussion`: https://github.com/idena-network/idena-docs/discussions/139

## Abstract

Change the minimum epoch length to 14 days for the network that exceeds 291 identities.

## Motivation

Increasing the frequency of validations could result in an exodus of people, as they would need to dedicate more time to producing flips and making time available for validations. 

## Specification

This proposal suggests setting a minimum epoch duration of 14 days for the network with a size between 291 and 5,845 identities. The epoch duration can be set to 13 or 15 days to adjust the validation date to Saturdays.

If the majority of the network approves this proposal through a hard fork, the duration (or frequency) of epochs will be determined as outlined below:

| Network size | Frequency, days                     |
| ------------ | ----------------------------------- |
| 17+          |       3                             |
| 45+          |       4                             |
| 96+          |       5                             |
| 176+         |       6                             |
| 291+         | 14 if Saturday, 13 or 15 otherwise* |
| 5,845+       |       21                            |
| 16,203+      |       28                            |

* 13 days for Sunday, Monday, or Tuesday and 15 days for Wednesday, Thursday, or Friday


## Rationale

The proposed change is aimed to cut down the time users need to spend on making flips and doing validations when the network is not big enough.

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

There are no risks for the Idena protocol associated with this proposal.
