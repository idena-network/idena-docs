---
hide_title: true
title: IIP-7
sidebar_label: IIP-7
---

## IIP-7: Pool voting rights

`Author`: Zen

`Status`: Review

`Type`: Standard

`Created`: 2022-10-27

`Discussion`: https://github.com/idena-network/idena-docs/discussions/104

`Translations`: 

### Abstract

Adjust the discrimination mechanism of pools, newbies, and discriminated identities.

### Motivation

With the introduction of quadratic stake rewards for mining, people are incentivized to start mining on their own, and if they and their friends/family have a validated identity too, even create small family pools to cut down on resources needed to mine while maximizing income.
The old reward structure made it convenient for people to delegate to public pools. Currently, people who want to start their own friend/family pools due to security considerations (protecting large stakes from the pool owners) have to wait a period of time before being able to delegate to a different pool. As a direct result, users are pressed to remain in their old pools.

This restriction was implemented as a way to prevent a micro pool attack where many discriminated identities would regain voting power by creating pools of size one.
This makes it inconvenient for people to leave pools they were previously delegated to if they are not planning on solo mining.

Newbies are allowed to delegate to any address, and thus are able to gain voting rights during the time they should be discriminated.

### Specification

A pool's vote will only be counted if and only if at least one of their delegators is not discriminated.

Identities with pending undelegation status will be allowed to delegate to any address while still keeping track of their most recent undelegation.
- This is done using the "pendingUndelegation" field and a new "undelegationEpoch" field in the identity's state, where "pendingUndelegation" stores the address from which the most recent undelegation occurred and "undelegationEpoch" stores the epoch when it happened. 
- The "pendingUndelegation" field will no longer be cleared when a delegation happens, instead, it will only be updated when an undelegation occurs or when it expires. 
- The "delegationEpoch" field will no longer have a double purpose as it is now necessary to keep track of both delegations and undelegations of an address separately.

Any address will be allowed to delegate to an identity that has a pending undelegation, allowing it to become a pool.

The discrimination criteria for an identity is not modified: an identity is discriminated if it has newbie status or has an address stored in its "pendingUndelegation" field.

A number of non-discriminated delegators can be kept for every pool.
- If this number is greater than 0, a pool has voting rights, otherwise it does not.  
- This number is incremented when a new non-discriminated identity delegates to a pool, when a newbie reaches verified status and has no pending undelegations, or when an identity's pending undelegation is removed.
- This number is decremented when an identity that is not discriminated undelegates from the pool (even if it will become discriminated afterward) or if their status is no longer validated (case in which the effective pool size shrinks too).

If the pool address is validated itself, it should be considered for pool voting rights just like a regular delegator.

Oracle voting contracts will continue to count only the last non-discriminated vote from a pool while still rewarding everyone voting.

For the already existing pools, there will be an iteration over their delegators in order to initialize their non-discriminated delegators number.

### Rationale

This change allows identities to change pools or create their own ones while still preventing a micro pool attack, encouraging users to start a small pool on their own instead of being pressed to stay in the pool they were previously delegated to.

This change also removes the possibility of newbies bypassing their discriminated status by creating micro pools.

It is necessary to keep track of both when delegations and undelegations occur separately because it is now possible to delegate to a different pool while still pending undelegation.

The number of non-discriminated users from a pool is only decremented when an identity with voting powers leaves the pool or loses its validated status because there is not any other case where an identity that already has voting rights can lose them.

It is not necessary to iterate over all delegators from a pool each time it votes on the blockchain.

### Backwards Compatibility

The changes require a hard fork due to the consensus rules being modified.

### Security Considerations

These changes help improve the security of blockchain governing by removing the possibility of newbies bypassing voting discrimination.
