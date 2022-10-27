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

`Discussion`: 

`Translations`: 

### Abstract

Adjust the discrimination mechanism of pools, newbies, and discriminated identities.

### Motivation

Due to the discrimination of pool delegators, identities participating in a pool are not allowed to switch pools immediately. When undelegating, an identity has to wait for the discrimination period to be over to be able to delegate to a different pool. This was implemented as a way to prevent a micro pool attack where many discriminated identities would regain voting power by creating pools of size one.   
This restriction makes it hard for people to leave pools they were previously delegated to if they are not planning on solo mining. If they want to create a family pool, they have to wait for the discrimination period to be over before delegating to their own created pool.

Newbies are allowed to delegate to any address, and thus are able to gain voting rights during the time they should be discriminated.

### Specification

A pool's vote will only be counted if and only if at least one of their delegators is not discriminated.

Identities with pending undelegation status will be allowed to delegate to any pool.

A number of non-discriminated delegators can be kept for every pool.
- If this number is greater than 0, a pool has voting rights, otherwise it does not.  
- This number is incremented when a new non-discriminated identity delegates to a pool, when a newbie reaches verified status and has no pending undelegations, or when an identity's pending undelegation is removed.
- This number is decremented when an identity that is not discriminated undelegates from the pool (even if it will become discriminated afterward) or if their status is no longer validated (case in which the effective pool size shrinks too).

For the already existing pools, there will be an iteration over their delegators in order to initialize their non-discriminated delegators number.

### Rationale

This change allows identities to change pools or create their own ones while still preventing a micro pool attack, encouraging users to start a small pool on their own instead of being pressed to stay in the pool they were previously delegated to.

This change also removes the possibility of newbies bypassing their discriminated status by creating micro pools.

The number of non-discriminated users from a pool is only decremented when an identity with voting powers leaves the pool or loses its validated status because there is not any other case where an identity that already has voting rights can lose them.

It is not necessary to iterate over all delegators from a pool each time it votes on the blockchain.

### Backwards Compatibility

The changes require a hard fork due to the voting consensus rules being modified.

### Security Considerations

These changes help improve the security of blockchain governing by removing the possibility of newbies bypassing voting discrimination.
