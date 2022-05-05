---
hide_title: true
title: IIP-3
sidebar_label: IIP-3
---

## IIP-3: Voting discrimination

`Author`: Zen

`Status`: Final

`Type`: Standard

`Created`: 2022-02-15

`Discussion`: https://github.com/idena-network/idena-docs/discussions/64

### Abstract

Discriminate the voting power of pool delegators that undelegate and identities with newbie status.

### Motivation

The motivation behind this proposal is fueled by large pools being able to undelegate a significant number of identities that instantly regain voting powers. Those identities can then vote in a coordinated manner and incline the outcome of an oracle or fork voting. This can also be used to manipulate the funds of an oracle lock. 

One of the principles pools were designed on is "Accounts included in a pool (delegated accounts) should be excluded from the decision-making process, oracle voting, block confirmation keeping the pool’s rewards at the same level as if it were separate accounts."

### Specification

After undelegating identities will have to wait 2 epochs plus the remaining period of the epoch in which the delegation took place to gain voting powers.   
Newbies passing their first validation will be discriminated across 2 full epochs.   

An undelegated identity can not delegate to a different pool address during the discrimination period. Delegating back to the previous pool address is accepted.

Pool owners won't be able to terminate any identity that is currently not part of their pool (undelegated identities can not be terminated during the discrimination period).   

During the time an identity's voting power is discriminated, they can still take part in oracles in order to receive rewards from prize pools. Their vote won't influence the outcome of an oracle voting, but if they are in consensus with the oracle's decision (or just participated in a poll) a discriminated identity will still be rewarded as a regular identity (like currently delegated identities do if they are not the last identity voting from that pool).

To prevent a post-fork attack where discriminated identities run outdated node versions in order to get the block creation process get stuck, the votes of discriminated identities that were included in the block committee should not be counted. Adding to that:    
- Discriminated identities will be rewarded for the mining as a regular identity.    
- Discriminated identities' votes for blocks will only be used to identify their online mining status.   
- Discriminated identities can propose blocks and get paid for that as a regular identity.   

### Rationale

Having an identity wait for 2 epochs before taking part in governing the network would give enough time for a fork or oracle voting to expire thus pools won't be able to prepare any kind of setup where they'd be able to take part in a voting.

Identities with newbie status have to be discriminated in order to remove the possibility of pools re-inviting their identities to take part in a voting.     
Normally an identity can reach verified status after 3 validations (Candidate->**Newbie**->**Newbie**->Verified). Since the discrimination starts after they reach age 1 (first validation), this would mean an identity's discrimination will end once they reach Verified status.   
This would also make an older identity more valuable and would incentivize people to not terminate their identity.

Undelegated identities should not be able to delegate to new pool addresses so an attack using micro-pools with 1 identity each is prevented. 

Permanently removing voting powers from pool delegators was also considered, but this may incentivize people to terminate their identity once they decide to leave a pool and host a node for themselves, in order to regain their voting power.   

Discriminated identities' votes from block committees should not be counted because discriminated identities voting against a fork by running an outdated node version that does not support the upcoming fork will not be taken into consideration, the fork will activate, and the block creation may cease if all votes from block committees are counted.

An example where this kind of scenario happened was on 17th November 2021 (during a hard fork voting).    
The voting number was stagnating right below the threshold for the hard fork to be activated. Two pools performed an operation where a significant number of identities undelegated, turned on mining (voted on the hard fork), and after the hard fork was activated redelegated to their pools.  
Reference blocks where some of the related transactions were confirmed:
`3636579`,`3636615`,`3636660` and `3636661` (undelegation); `3636606`,`3636653`,`3636654`,`3636706` (mining status turned on); `3636769` (hard fork activation); `3636871`,`3636872` and `3636873` (redelegation)      
Even if this was done with good intentions, it proved pools can still take part in the governance of the network which is against the vision of Idena pools.

### Backwards Compatibility

This proposal requires changes to the following parts of the protocol: voting mechanics, delegation requirements and, most notably, block consensus mechanics.    
The changes require a hard fork.

### Security Considerations

The security of forks and oracle votings (oracle votings may be tied to governance or fund management, i.e. polls regarding protocol changes and oracle locks respectively) is increased by eliminating the possibility of pools undelegating their identities or re-inviting themselves with different addresses and manipulating the outcome of a voting. This would also discourage a potential bad actor from trying to gather up a significant number of identities in a short time span just to perform the same form of attack.
