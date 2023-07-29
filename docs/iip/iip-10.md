---
hide_title: true
title: IIP-10
sidebar_label: IIP-10 Protection for zombie
---

## IIP-10: Stake protection for Zombie status

`Author`: midenaio

`Status`: New

`Type`: Standard

`Created`: 2022-05-31

`Discussion`: https://github.com/idena-network/idena-docs/discussions/141

`Translations`:

## Abstract

Add stake protection for identities with Zombie status in case of missing validation

## Motivation

Currently identities with Zombie status get stake protection in case of validation failure. But if they miss the validation, their stake is fully burnt regardless of the identity's age ([see IIP-4](./iip-4)). This is one of the reasons why many individuals prefer to kill their identities with Zombie status to keep their stakes safe. However, having to start all over again might discourage them, and could potentially cause them to leave the project.
This proposal suggests adding stake protection for identities with Zombie status, similar to the stake protection implemented in case of validation failure.

## Specification

If the majority of the network approves this proposal through a hard fork, the stake protection in case of missing validation will be as follows:

| Age | Identity status | Validation | Share of stake burnt before IIP-10 | Share of stake burnt after IIP-10 | Identity status after validation |
| --- | --------------- | ---------- | ---------------------------------- | --------------------------------- | -------------------------------- |
| 0   | Candidate       | Miss       | 100%                               | 100%                              | Killed                           |
| 1   | Newbie          | Miss       | 100%                               | 100%                              | Killed                           |
| 2+  | Newbie          | Miss       | 100%                               | 100%                              | Killed                           |
| any | Verified        | Miss       | 0%                                 | 0%                                | Suspended                        |
| any | Human           | Miss       | 0%                                 | 0%                                | Suspended                        |
| any | Suspended       | Miss       | 0%                                 | 0%                                | Zombie                           |
| 5   | Zombie          | Miss       | 100%                               | 5%                                | Killed                           |
| 6   | Zombie          | Miss       | 100%                               | 4%                                | Killed                           |
| 7   | Zombie          | Miss       | 100%                               | 3%                                | Killed                           |
| 8   | Zombie          | Miss       | 100%                               | 2%                                | Killed                           |
| 9   | Zombie          | Miss       | 100%                               | 1%                                | Killed                           |
| 10+ | Zombie          | Miss       | 100%                               | 0%                                | Killed                           |

Once an identity is killed and a share of their stake is burnt, the remaining part of the stake will be transferred to the normal wallet.

## Rationale

- The proposed change will motivate people to maintain their identities even with Zombie status.
- Reducing the risk of older identities losing their stake due to some technical/personal issues (for example, electricity outage or medical appointment)

## Backward Compatibility

This change requires a hard fork.

## Security Considerations

There are no risks for the Idena protocol associated with this proposal.
