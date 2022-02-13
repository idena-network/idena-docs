---
hide_title: true
title: IIP-3
sidebar_label: IIP-3
---

## IIP-3: Post-undelegation discrimination

`Author`: Zen

`Status`: Idea

`Type`: Standard

`Created`: XXX

`Discussion`: https://github.com/idena-network/idena-docs/discussions/64

### Abstract

Discriminate the voting power of identities that undelegate.

### Motivation

The motivation behind this proposal is fueled by large pools being able to undelegate a significant number of identities that instantly regain voting powers. Those identities can then vote in a coordinated manner and incline the outcome of an oracle or fork voting. This can also be used to manipulate the funds of an oracle lock. 

One of the principles pools were designed on is "Accounts included in the pool (delegated accounts) should be excluded from the decision-making process, oracle voting, block confirmation keeping the pool’s rewards at the same level as if it were separate accounts."

### Specification

Identities will have to wait at least one month (or 2 epochs if they represent more than that) after undelegating from a pool to regain their voting powers. To calculate the time an identity will have to wait before regaining its voting powers, the following is calculated: 

`x=max(2592000,epoch_duration*2)`   
where:  
2592000 = 1 month in seconds   
epoch_duration = epoch duration in seconds in which undelegation took place 

`x` is added to the timestamp of the block with 'List of mining identities was updated' flag in which the identity's mining status was changed from delegated to undelegated.

### Rationale

Identities undelegating should have to wait 2 epochs before taking part in governing the network (or 1 month if 2 epochs represent less). During this time a hard fork or oracle voting will expire and thus identities that undelegate when a voting is started will have their voting power reinstituted too late to affect the outcome of the oracle or hard fork vote.  

Even though at the writing of the proposal the network size is big enough for epochs to be over 15 days, it was taken into consideration that a small network having the epoch duration of 3 days for example, would not benefit from the proposed change as the calculated value would be 6 days, not enough to prevent this kind manipulation.  

Permanently removing voting powers from pool delegators was also considered, but this may incetivize people to terminate their identity once they decide to leave a pool and host their node for themselves, in order to regain their voting power.   

An example where this kind of scenario happened was on 17th November 2021 (during a hard fork voting).    
The voting number was stagnating right below the threshold for the hard fork to be activated. Two pools performed an operation where a significant number of identities undelegated, turned on mining (voted on the hard fork), and after the hard fork was activated redelegated to their pools.  
Reference blocks where some of the related transactions were confirmed:
`3636579`,`3636615`,`3636660` and `3636661` (undelegation); `3636606`,`3636653`,`3636654`,`3636706` (mining status turned on); `3636769` (hard fork activation); `3636871`,`3636872` and `3636873` (redelegation)      
Even if this was done with good intentions, it proved pools can still take part in the governance of the network which is against the vision of Idena pools.

### Security Considerations

The security of forks and oracle votings (oracle votings may be tied to governance or fund management, i.e. polls regarding protocol changes and oracle locks respectively) is increased by eliminating the possibility of pools undelegating their identities and manipulating the outcome of a voting.
