---
hide_title: true
title: IIP-8
sidebar_label: IIP-8 Pool voting rights
sidebar_position: 1
---

## IIP-8: Pool voting rights

`Author`: Zen

`Status`: Final

`Type`: Standard

`Created`: 2022-10-27

`Discussion`: https://github.com/idena-network/idena-docs/discussions/104

`Translations`:

### Abstract

Adjust the discrimination mechanism of pools, and discriminated identities.

### Motivation

With the introduction of quadratic stake rewards for mining, people are incentivized to start mining on their own, and if they and their friends/family have a validated identity too, even create small family pools to cut down on resources needed to mine while maximizing income.
The old reward structure made it convenient for people to delegate to public pools. Currently, people who want to start their own friend/family pools due to security considerations (protecting large stakes from the pool owners) have to wait a period of time before being able to delegate to a different pool. As a direct result, users are pressed to remain in their old pools.

This restriction was implemented as a way to prevent a micro pool attack where many discriminated identities would regain voting power by creating pools of size one.
This makes it inconvenient for people to leave pools they were previously delegated to if they are not planning on solo mining.

### Specification

A pool's vote will only be counted if and only if at least one of their delegators is not discriminated.

Identities with pending undelegation status will be allowed to delegate to any address, while discrimination will be taken into account within the pool.

#### Penalty system changes

- When undelegating from a pool, the address inherits the pool's mining penalty if any.
- An address with an active mining penalty can not delegate its mining rights to any pool.

### Rationale

This change allows identities to change pools or create their own ones easily while still preventing a micro pool attack, encouraging users to start a small pool on their own instead of being pressed to stay in the pool they were previously delegated to.

Mining penalties have to be inherited from the pool when undelegating in order to prevent the possibility of bypassing mining penalties.

### Backwards Compatibility

The changes require a hard fork due to the consensus rules being modified.

### Security Considerations

These changes improve the delegation mechanism while maintaining governance security.
