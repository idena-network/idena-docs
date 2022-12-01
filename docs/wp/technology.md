---
hide_title: true
title: Idena Proof-of-personhood
sidebar_label: Technology
---

## Proof-of-personhood

The Idena network allows for a proof of humanity and proof of uniqueness for its participants. We call it Proof-of-Person (PoP) protocol. Idena does not require any personal data sharing, does not reveal a person’s identity, and does not need a third-party identification center. Idena is based on a network of people mutually validating their humanness and uniqueness. How is it possible?

Idena employs regular checkpoint rituals — synchronous validation sessions — to certify a participants’ humanness for the consequent epoch. The validation requires solving of `flips-puzzles` easy for a human, difficult for a bot.

<img src="/img/wp/idena-validation-flow.png" alt="Idena validation flow" width="50%"
style={{display: "block", margin: "auto"}} />

The uniqueness of participants is proven by the fact that they must solve flip synchronously. Flips are decrypted at the same time worldwide. A single person is not able to validate herself multiple times because of the limited timeframe for the answers submission.

After the validation session is over, the network reaches consensus about the new list of validated participants, and the date of the next validation session is scheduled. The bigger the network is, the less frequently the validation sessions happen.

The validation status of a participant is not forever. It expires when the next epoch starts. Participants should prolong their validation status for every new epoch.

To be allowed to take part in the next validation round, the participant must provide a certain number of newly created flips.

### Validation session schedule

The date of the validation session is calculated by the network and is shown in the Idena app. The time is always fixed: 13:30 UTC.

The bigger the network is, the less frequently the validation sessions happen.

The validation date will be adjusted to Saturdays once the network reaches 9441 identities. The total epoch duration is limited to 28 days.

| Network size | Frequency days              |
| ------------ | --------------------------- |
| 17+          | 3                           |
| 45+          | 4                           |
| 96+          | 5                           |
| 176+         | 6                           |
| 291+         | 7                           |
| 449+         | 8                           |
| N            | round(N^0.33)               |
| ...          | ...                         |
| 9441+        | 21 if Saturday 20 otherwise |
| N            | round(N^(0.33)/7)\*7        |
| ...          | ...                         |
| 16203+       | 28                          |

The validation time of 13:30 UTC covers most countries when most people are awake. These are the local times for some of the world's cities (as of June 1, 2019):

- San Francisco, USA 6:30
- New York, USA 9:30
- Tunis, Tunisia 14:30
- Berlin, Germany 15:30
- Moscow, Russia 16:30
- Delhi, India 19:00
- Beijing, China 21:30
- Sydney, Australia 23:30
- Auckland, New Zealand 01:30
- Honolulu, Hawaii, USA 03:30

### Short session and Long session

The short validation session has a very limited time frame, less than two minutes, and consists of six flips, each of which is received only by 1–4 participants in the network (depending on the network size). This session’s task is conducting a Turing test: telling humans from AI.

The long flip qualification session lasts 30 minutes and consists of 25-30 flips, each of which is received by a larger number of network participants (depending on the network size). This session enables the network to achieve a consensus on flip quality and the right answer to a flip.

## Cryptoidentity

Cryptoidentity is one validated account with equal voting power. The cryptoidentity persists for as long as the current epoch lasts. During the epoch, the cryptoidentity gains special privileges, including the ability to invite new users, mine new blocks and get rewards, propose protocol improvements, and create new flips.

After the validation expires by the end of the epoch, participants revalidate themselves with a new synchronized test.

#### Candidate

A participant who has just joined the network via an invitation can participate in the subsequent validation session only.

#### Newbie

A newly validated identity can participate in subsequent validation sessions, mine coins, and create flips, but this person cannot send out invitations or miss validations.

#### Verified

A cryptoidentity validated at least three times in a row and having Total score>=75% can do the same as a Newbie plus

- send out invitations
- submit 1 extra flip
- miss up to two validations in a row.
  This person cannot fail neither short session nor long session.

#### Human

A cryptoidentity validated at least four times and having Total score>=92% can do the same as a Verified plus

- submit 2 extra flips (5 in total)
- fail short session without being killed.
  This person cannot fail a long session.

#### Suspended

A verified cryptoidentity that has missed one validation session can do the same as a Candidate and can miss one validation session.

#### Zombie

A verified cryptoidentity that has missed two validation sessions is equal to a Candidate.

#### Killed

The account is not part of the network anymore.

<img src="/img/wp/Idena-Identity-Status-Flow-1.png" alt="Idena accounts flow" width="50%" style={{display: "block", margin: "auto"}} />

<img src="/img/wp/Idena-Identity-Status-Flow-2.png" alt="Idena accounts flow 2" width="50%" style={{display: "block", margin: "auto"}} />

### Selling cryptoidentity

Technically, an identity can be sold and bought. However, the Idena protocol introduces economic incentives to prevent participants from doing that. A person who sells their identity can simply kill the identity afterwards to unlock their frozen coins (frozen coins accumulate for each identity as a part of UBI and cannot be spent while the identity is valid).

To sell an identity, the seller provides a copy of the identity's private key. The buyer cannot be sure that another copy of the private key will not stay with the seller. Thus, the private key enables the seller to kill the identity at any time, and the buyer would not have an economic reason to buy identity.

### Cryptoidentity validation criteria

To get validated, you need to meet these three requirements during each validation session:

Your current short validation session’s score should be 60% or more.
Your total score for the last 10 short validations (including the current validation session and all the previous ones) should be 75% or more.
Your current long session’s score should be 75% or more.

In addition, you need to solve flips both correctly and fast. The first 6 flips must be solved in less than 2 minutes.

### Stake wallet

Every account in Idena has two wallets: the Idena wallet and the stake. The stake is like your pension account: 20% of all your Idena rewards (mining, validation rewards, flip rewards, valid invitation rewards, and so on) accumulate in the stake, while the remaining 80% goes directly to your Idena wallet.

Idena does not use the stake for governance purposes.

The stake cannot be spent while the account is valid. You can receive these coins in your Idena wallet when you voluntarily terminate your Idena account - that is when you terminate your cryptoidentity. 

You may also receive part or all of these coins when your identity is killed by the network protocol depending on the age and status of your identity.

### Losing stake

If cryptoidentity is killed by the network, then a part or the entire stake gets burnt depending on the age and status of the identity: identities receive stake protection according to the stake protection implemented with [IIP-4](/docs/iip/iip-4#validation-failure-stake-protection).

The coins stored on normal Idena wallets can not be burnt in any cases.

#### Validation failure stake protection

This protection affects identities that fail a validation session (not when they miss it).

| Age | Identity status     | Validation | Share of stake burnt | Identity status after validation |
| --- | ------------------- | ---------- | -------------------- | -------------------------------- |
| 0   | Candidate           | Fail       | 100%                 | Killed                           |
| 1   | Newbie              | Fail       | 100%                 | Killed                           |
| 2+  | Newbie              | Fail       | 100%                 | Killed                           |
| any | Verified            | Fail       | 100%                 | Killed                           |
| any | Human               | Fail       | 0%                   | Suspended                        |
| 4   | Suspended           | Fail       | 100%                 | Killed                           |
| 5   | Suspended or Zombie | Fail       | 5%                   | Killed                           |
| 6   | Suspended or Zombie | Fail       | 4%                   | Killed                           |
| 7   | Suspended or Zombie | Fail       | 3%                   | Killed                           |
| 8   | Suspended or Zombie | Fail       | 2%                   | Killed                           |
| 9   | Suspended or Zombie | Fail       | 1%                   | Killed                           |
| 10+ | Suspended or Zombie | Fail       | 0%                   | Killed                           |


#### Missing validation stake protection

This protection affects identities that do not show up for a validation session.

| Age | Identity status | Validation | Share of stake burnt | Identity status after validation |
| --- | --------------- | ---------- | -------------------- | -------------------------------- |
| 0   | Candidate       | Miss       | 100%                 | Killed                           |
| 1   | Newbie          | Miss       | 100%                 | Killed                           |
| 2+  | Newbie          | Miss       | 100%                 | Killed                           |
| any | Verified        | Miss       | 0%                   | Suspended                        |
| any | Human           | Miss       | 0%                   | Suspended                        |
| any | Suspended       | Miss       | 0%                   | Zombie                           |
| any | Zombie          | Miss       | 100%                 | Killed                           |

### Discrimination of identities with the Newbie status

Only 20% of earned coins is mined to the main wallet for Newbies. The rest 80% is mined to the stake: in total 60% of earned coins is temporary locked in the stake until a Newbie becomes Verified.

60% of earned coins will be sent back to the main wallet once a Newbie becomes Verified.

Newbies cannot terminate their identities to withdraw the stake.

Newbies cannot participate in the governance of the network. While adresses with this status can get rewards for mining and participating in oracle votes, their votes are not counted and do not make a difference in the final outcome of a voting: they cannot influence a hard fork voting or an oracle voting.

## Invitations

To create a cryptoidentity, an individual should receive an invitation code from a validated participant of the network and use the code to apply for validation.

New invitations can only be sent out by validated nodes. The number of new invitations per node is limited and decreases as the network grows, while the total amount of generated invitations gets larger.

The core Idena team is also granted to issue a limited number of invitations per epoch to support the growth of the network.

The pace of network growth is restricted to minimize the probability of a Sybil attack.

### Selling and buying invitations

The Idena protocol introduces incentives to prevent participants from buying and selling invitations. The person who sells an invitation can kill the invited participant before they pass the first validation and their status is "Newbie". The seller can double-spend the invitation by selling it multiple times. Invitations should be granted for free to trusted people only (relatives, friends, and so on).

### Distribution of invitations

The targeted number of invitations in the network is calculated as 50% of the network size after each validation (Idena foundation invitations remaining extra).

Invitations are distributed as follows:

- Identities with the Human status get one invitation starting with the highest Total score.
- If there are non-distributed invitations left, identities with the Human or Verified status get one invitation starting from the highest total score.
- After the distribution, the minimal Total score of those entitled to receive invitations is known.
- All identities with this minimal Total score receive invitations. If needed, additional invitations are issued by the Idena protocol to cover the demand.
- The core Idena team is granted to issue a limited number of invitations per epoch to support the network growth. The number of available invitations for the foundation address is limited to `max(500, NetworkSize*0.1)`

## Flips

Idena proposes the Flip Challenge, a language-neutral AI-hard test that conveys narrative rather than semantic meaning. A flip, “Filter for Live Intelligent People,” utilizes four images. To solve a flip, the participant chooses between two sequences of these images, only one of which makes narrative sense. The other one is deliberately distorted so that the picture sequence does not convey linear story information.

<img src="/img/wp/flip-sample.png" alt="Idena validation flow" width="30%"
style={{display: "block", margin: "auto"}} />

_Example of a flip: a meaningful story (left) and a meaningless sequence of pictures (right)_

A flip is not an IQ test but a test for common sense. A flip is submitted without the right answer. The network comes to a consensus about the right answer after the validation session. If consensus is not reached, then the flip is disqualified. Answers for disqualified flips are not counted.

> Try to [test yourself](https://flips.idena.io/?pass=idena.io) to check whether you are bot or not.

To make a flip truly AI-hard and to avoid the need for a trusted third party, flips must be human-generated. In Idena, flips are created by validated participants. The flips are stored as encrypted data in the network before validation, and then they are algorithmically distributed.

The network reaches consensus on flip answers, scores accuracy, awards coins for each valid flip, and approves validated identities.

If consensus on a flip is not reached, then the flip is disqualified. Answers for disqualified flips are not counted. Users creating meaningless flips or spam or flips with inappropriate content will be subject to negative consequences.

### Flip creation flow

Flips are created only by validated identities:

- The participant receives two keywords randomly selected by the protocol as associative hints to think up a story within the general template of “Before – Something happens – After.”
- The participant uploads four images from their device or from the Internet to tell a story based on the two keywords.
- The participant creates an alternative – a meaningless sequence of the same four images.
- The participant submits the pair of sequences to the network.
- The flips are stored as encrypted data in the network before validation.

### Flips submission requirements

Newbie, verified and human accounts must submit flips before the next validation ceremony. Not submitting flips is equal to missing a validation.

Candidates, suspended accounts, and zombies do not submit flips for the validation ceremony.

### Flip distribution

Flips are distributed randomly within each shard, with one important exception: identities are not permitted to solve flips created by themselves.

### Flip keywords

Two random keywords selected from a dictionary are a sort of associative hint for stimulating users' creativity. Users are required to use them for two reasons. First, doing so helps to ensure the non-repeatability and unpredictability of flip types, which makes flips AI-resistant. Second, it enables the Idena protocol to detect and punish protocol abuse such as submitting a number of random pictures instead of a flip or the same flip repeatedly.

Network participants must create flips relevant to the suggested keywords. The relevance of the flip to the keywords is tested during the long qualification session. Participants who create flips that are irrelevant to the keywords are penalized by the protocol. Identities will be killed for repeatedly ignoring keywords when creating flips.

### Flip consensus

The network comes to the consensus about the right answer after the validation session. If consensus is not reached, then the flip is disqualified. Answers for disqualified flips are not counted, and the authors of these flips are not rewarded.

### Flips reporting system

Users should report the flip when:

- One of the keywords is not relevant to the flip
- One should read the text in the flip to solve it
- Flip has an inappropriate content
- Flip has numbers or letters or other labels on top of the images indicating their order

The number of flips that can be reported is limited to 1/3. So participants are motivated to pick which flip to report first relying on objective criteria (e.g. both keywords relevance).

Every successful report of a flip is rewarded: The reward for the reported flip which is not paid to the flip creator is distributed between the committee members who reported the flip.

### Can AI attack flips

We consider AI as an important part of the Idena project and announced a contest for AI researchers and practitioners with a $55,000 reward cascade to develop an open AI instrument. The AI instrument developed as the result of the contest will be integrated into the Idena app for flip patterns detection. This will prevent users from submitting flips which AI can solve.

#### Flips encryption

Each flip is available only for those participants who solve it during the validation session. There are around 10-15 persons who see it. The flips that have been used for validation are encrypted: Only 2 out of 4 images of a flip are publicly available to make it impossible to easily collect huge datasets.

#### Why machines have no common sense

[![Why machines have no common sense](/img/wp/ai-biggest-problem.png)](https://content.jwplatform.com/players/RdnxHErX-FvQKszTI.html)

### AI-resistance of flips

Adversarial attacks can be applied to the flips to prevent AI from solving them. Since the flip is a common sense test there are two types of adversarial attacks possible: 1) Adversarial perturbation added to the images 2) Adversarial nonsense image added to the flip instead of one of the images.

#### 1. Adversarial perturbations

Adversarial perturbations can be added for each of the 4 images of a flip to make it harder for AI to classify the images.

<img src="/img/wp/ai-noise.png" alt="Idena flip with adversarial noise" width="40%"
style={{display: "block", margin: "auto"}}/>

<center>Adversarial perturbations applied to the images of the flip</center>
<br/>

<img src="/img/wp/ai-google-vision.png" alt="Google Vision result for the image with adversarial perturbation" width="70%"
style={{display: "block", margin: "auto"}} />

<center>Google Vision result for the original image: Glove</center>
<br/>

<img src="/img/wp/ai-noise-google-vision.png" alt="Google Vision result for the original image" width="70%"
style={{display: "block", margin: "auto"}} />

<center>Google Vision result for the image with adversarial perturbation: Hat while original image is classified as Glove</center>

#### 2. Adversarial nonsense images

Adversarial nonsense images can be used to make it harder for AI to determine which sequence of images makes sense.

<img src="/img/wp/ai-nonsense-image.png" alt="Idena flip with an adversarial nonsense image" width="40%"
style={{display: "block", margin: "auto"}}/>

<center>A flip with an adversarial nonsense image</center>
<br/>

Nonsense images added into flips do not stop people from solving them. In contrast, it makes it harder for AI to solve the flips.

<img src="/img/wp/ai-nonsense-image-google-vision.png" alt="Google Vision result: Meaningful classification of the nonsense image" width="70%"
style={{display: "block", margin: "auto"}} />

<center>Nonsense images are classified as meaningful</center>
<br/>

Meaningful classification of the nonsense image leads to an unpredictable outcome for an AI that solves the entire flip based on the wrong image classification data.

## Idena blockchain

The public blockchain structure is used to store the state of validated identities, implement cryptoeconomic incentives for network participants, and enable transactions of the native coin enriched with additional metadata (such as P2P-encrypted messages). Every full node corresponds to one validated person with an equal chance to be rewarded for the minting of new blocks and equal voting power in the consensus and governance process.

### BFT

Idena implements a Proof-of-Person Sybil control mechanism and committee-based consensus with fast finaility.

Every validated participant has an equal voting power in the network to produce blocks and validate transactions. Randomly selected participants generate block proposals and broadcast them into the network. A random committee is selected to reach consensus about whether to include a block into the blockchain.

Idena provides a secure way to run multiple sub-chains in parallel driven by different sets of independent participants in a process called sharding. A network with millions of nodes driven by diverse people can be safely split into thousands of groups (or shards) that are processing transactions at the same time.

### Scalability

Unlike many blockchains that utilize centralization to increase capacity, we solve the scalability problem by exaggerating decentralization. It might be considered as a counterintuitive approach because of the well-known “Scalability-Security-Decentralization” trilemma. However, Idena offers decentralization-based scalability without sacrificing security.

Idena provides a secure way to run multiple sub-chains in parallel driven by different sets of independent participants in a process called sharding. A network with millions of nodes driven by diverse people could be safely split into thousands of groups (shards) processing transactions at the same time.

### Decentralization

The Idena protocol formalizes the notion of the human on the blockchain. It brings decentralization to a new level and supports the creation of a fair consensus by avoiding network centralization despite the nature of capital to concentrate. The Idena network is truly decentralized since every node is linked to a cryptoidentity.

### Mining

Idena enables democratic access to mining: Neither expensive mining hardware nor a bunch of money for stake is needed, but rather an average laptop that is online.

All validated participants are encouraged to do useful work for the network (hosting their nodes, creating and solving flips, inviting new users, and so on). This resource sharing is rewarded with a universal basic income (UBI).

### Transaction fees

The transaction fee is calculated automatically by protocol. The fee goes up or down based on how full the previous block was, targeting an average block utilization of 50%. When the previous block is more than 50% full, the transaction fee goes up proportionally. When it is below 50% usage, fees go down. A user can specify the maximum fee limit for the transaction.

```
transactionFee = currFeeRate x transactionSize

currFeeRate = max(
     1e-16,
     0.1/networkSize,
     prevFeeRate*(1+0.25*(prevBlockSize/300Kb-0.5))
    )
```

90% of paid fees are burnt. The rest 10% are paid to the block proposer.

#### Smart contracts gas costs

In addition to transaction fee per byte a gas consumption has to be paid when a smart contract is called.
GasCost is calculated as a total amount of gas consumed by the smart contract operations multiplied to the current `GasPrice`.
`GasPrice` is calculated automatically by the protocol. The minimum `GasPrice` is: GasPrice= 0.01/NetworkSize.

#### Validation ceremony transactions

Validation ceremony transactions are not charged. However, they affect the fee rate because of the block consumption.

### Idena smart contracts

Currently only predefined smart contracts available:

#### OracleVoting

The Idena network can provide the Oracle voting service to anyone who sets a high enough reward for oracles and correctly formulates a question. The Oracle voting mechanism is flexible. In order for your voting to be successful, define the purpose of getting an oracle service.

1. Oracle voting to certify a fact
   Oracles can certify a fait accompli (an accomplished fact). Such an Oracle voting may unlock the coins locked by another smart contract (e.g. OracleLock). For correct voting, the fact to be confirmed must be generally known or verified by several sources of information. To prevent a possible attack on voting, a high threshold for consensus among voters is set to prove facts. Oracles who vote against the majority are penalized.
2. Oracle voting for governance
   Oracle voting may unlock the coins locked by another smart contract (e.g OracleLock, RefundableOracleLock), depending on their subjective opinion. In some cases, such voting may not lead to a consensus. Penalization of oracles for voting outside the majority is not used in such a voting. However, if a consensus is reached, then those oracles who voted in the majority will be rewarded. If no consensus has been reached (no decision has been made), then all oracles who have voted will be rewarded, regardless of the vote cast.
3. Oracle voting as a simple poll
   Oracles can vote for any option. Rewards will be paid to everyone regardless of the outcome of the vote.

You can participate in voting if you are a validated participant and receive voting rewards. Rewards can be set either by those who create the votings, or by other smart contracts. You can also create your own voting, for example:

#### OracleLock

OracleLock is a non-refundable smart contract that locks coins until a decision is made by oracles. If the voting result matches the expected value, coins are transferred to address A, otherwise to address B. Both addresses have to be specified beforehand.

- Example: The contractor promises to complete the work by a certain date. The customer creates an oracle voting in order for oracles to vote in the future whether the work is done. The customer blocks the money on the OracleLock contract. If the result of oracle voting confirms that the work is done, the money is transferred to the contractor. Otherwise, the money is sent back to the customer.

#### RefundableOracleLock

RefundableOracleLock is a refundable smart contract address that can lock coins from multiple users until a decision is made by oracles. It works similarly to OracleLock: if the voting result matches the expected value, coins are transferred to address A (if specified), otherwise to address B (if specified). However, a refund is provided to all users if the destination address A or B is not specified or oracle voting fails to reach a consensus. The amount of the refund is equal to the initial deposit or proportional to the initial deposit if the RefundableOracleLock address has been funded additionally.

- Example 1: The contractor promises to complete the work by a certain deadline. The community is ready to fund the work. An oracle voting is created so that oracles at some point in the future confirm whether the work is done. Community members fund the work by depositing money from different wallets to RefundableOracleLock. If the result of the oracle voting confirms that the work is done, the money is transferred to the contractor. Otherwise, all contributors get a refund.

- Example 2: Prediction Market. An oracle voting is created so that oracles at some point in the future confirm the occurrence or non-occurrence of the event. Bets on the occurrence or non-occurrence of the event are locked on two linked RefundableOracleLock contracts. According to the results of the oracle voting, one of the two contracts will be the RefundableOracleLock-winner and the other will be the RefundableOracleLock-loser.
  All money locked on the RefundableOracleLock-loser contract is sent to the address of the RefundableOracleLock-winner contract. After that, the money from the RefundableOracleLock-winner is returned to the winning users in the form of a refund in proportion to the bets made.

#### Multisig

A multisignature wallet address with specified M and N locks coins. In order to send the coins from the multisig, M specific participants out of N have to provide their signatures.

#### TimeLock

Smart contract locks coins on the smart contract address until the specified time. Once a newly mined block has a timestamp greater or equal to that time, the coins can be transferred to any address specified by the owner.
