---
hide_title: true
title: Idena economics
sidebar_label: Economics
---

## Premint, funding and vesting

The Idena blockchain has got a premint intended to be used to bootstrap core development, raise funds, and help spread the word. The Idena core team would like to cultivate such an ecosystem where the market value of Idena coin (iDNA) is driven by the fundamental demand for its utility: Advertisers will have to purchase iDNA on a market and burn the coins to compete for the network attention. Burning both preminted and minted coins will lead to the sustainable economics of the Idena network.

Total premint size: 36,000,000 iDNA

Premint structure:

- Core team allocation: 17,250,000 iDNA
- Early investors allocation: 7,065,000 iDNA
- Ambassadors fund: 365,000 iDNA
- Reserved for 2020 runway funding: 3,000,000 iDNA
- Reserved for 2021–2022 runway funding: 8,320,000 iDNA

To protect the market price, premined coins of the core team and early investors are to be vested as follows:

Core team fund:

- 1/3 vested for 3 years: 5,750,000 iDNA
- 1/3 vested for 5 years: 5,750,000 iDNA

Early investors:

- 1/3 vested for 1 year: 2,355,000 iDNA
- 1/3 vested for 2 years: 2,355,000 iDNA

Core team vested coins are locked with `TimeLock` smart contracts. See actual distribution in the [Idena blockchain explorer](https://scan.idena.io/circulation).

## Foundation wallet (DAO)

The Foundation wallet is designed to fund Idena community-driven development and Idena marketing campaigns. It accumulates 5% of the minting and rewards for invites issued by the core team.

The core team controls the foundation wallet in a centralized way until governance mechanisms are proposed and implemented.

Wallet address: 0xcbb98843270812eeCE07BFb82d26b4881a33aA91

## Zero wallet (DAO)

The zero wallet is designed to fund impact projects proposed by the Idena community. It accumulates 1% of all minted coins.
Currently the wallet address is locked. There is no private key for the zero wallet address: The network must reach consensus in order to spend the funds. Governance mechanisms for zero wallet fund allocation are to be established in the future.

Wallet address: 0x0000000000000000000000000000000000000000

## Economics of the iDNA

All validated participants are encouraged to do useful work for the network (hosting their nodes, creating and solving flips, inviting new users, and so on). This resource sharing is rewarded with iDNA Coins minting.
Total minting is capped at 51 840 iDNA per day depending on the actual number of blocks produced by the network. It includes mining reward (paid every block) and validation session reward (accumulated during epoch and paid at the end of every validation session):

| Total minting cap per day             | 51 480 iDNA       |
| ------------------------------------- | ----------------- |
| Mining reward cap per day             | 25 920 iDNA (50%) |
| Validation session reward cap per day | 25 920 iDNA (50%) |

Mining reward is capped at 25 920 iDNA per day. It includes block proposer reward (paid to block proposer) and block committee reward (distributed to members of final committee validating the block):

| Mining reward cap per day           | 25 920 iDNA        |
| ----------------------------------- | ------------------ |
| Block proposer reward cap per day   | 8 640 iDNA (~33%)  |
| Block committee reward cap per day  | 17 280 iDNA (~67%) |
| Minimum block time                  | 20 sec             |
| Maximum number of blocks per minute | 3                  |
| Maximum block size                  | 300 Kb             |
| Maximum number of blocks per day    | 4 320              |
| Block proposer reward (per block)   | 1 iDNA             |
| Block committee reward (per block)  | 5 iDNA             |

Validation session fund is capped at 25 920 iDNA per day. It accumulates daily and gets distributed at the end of validation session as follows:

| Total rewards            | 100% |
| ------------------------ | ---- |
| Staking rewards          | 18%  |
| Candidate rewards        | 2%   |
| Flip rewards             | 35%  |
| Invitation rewards       | 18%  |
| Reports rewards          | 15%  |
| Idena foundation payouts | 10%  |
| Zero wallet fund         | 2%   |

### Staking reward fund

The staking reward fund is distrubuted among all validated identities depending on their stake size. ([Quadratic Staking proposal](/docs/iip/iip-4))

### Candidate reward fund

The candidate reward fund is distributed to new users for passing their first validation.

### Flip reward fund

The flip reward fund is distributed equally to all participants proportionally to the number of their qualified flips and their grades. Non-qualified flips are not paid for.

The flip grade is determined by the votes of the committee members. During the long session committee members can vote as follows:

| Code | Vote       | Desciption                                                |
| ---- | ---------- | --------------------------------------------------------- |
| 0    | `None`     | Do not approve flip                                       |
| 1    | `Reported` | Report the flip                                           |
| 2    | `GradeD`   | Approve flip with a basic reward                          |
| 3    | `GradeC`   | Approve flip with a basic flip reward increased `2` times |
| 4    | `GradeB`   | Approve flip with a basic flip reward increased `4` times |
| 5    | `GradeA`   | Approve flip with a basic flip reward increased `8` times |

Default flip grade is `GradeD`. At least `1/3` of committee members should approve the flip to increase the flip grade. Otherwise default grade is used. The flip grade is calculated as the average grade among the votes of committee members who approved the flip.

Example:

```
Committee size: 10
Votes: [0, 1, 2, 2, 3, 4, 5, 5, 5, 5]
Flip grade = Round(Avg(2, 2, 3, 4, 5, 5, 5, 5)) = 4 //`GradeB`
```

### Invitation reward fund

The invitation reward fund is distributed to all identities whose invitations have been validated. Invitation reward is paid up to 3 epochs in a row proportionally to the invited person's age:

- A `basic reward` is paid for the first successfull validation of invited Candidate.
- A reward for the second validation of an invitee is 3 times bigger than a `basic reward` for a validated Candidate.
- A reward for the third validation of an invitee is 6 times bigger than a `basic reward` for a validated Candidate.

`Basic reward` for the invitation is calculated based on how early in the epoch the invitation was activated. The later the invitation is activated, the lower the `basic reward`. The reduction factor _k_ is calculated for each invitation as `k = 1−t⁴ · 0.5`, where `t ∈ [0..1]` is the amount of time that has passed from the start of the epoch to the moment of the activation.

![image](/img/wp/idena-invitation-rewards-curve.png)

Invitation rewards for the 2nd and 3rd validation are not paid to the Idena foundation.

### Reports rewards fund

The flip reward fund is distributed equally to all validated participants proportionally to the number of successfully reported flips during the long session.

### Idena foundation

Idena foundation rewards are paid to [Foundation wallet (DAO)](#foundation-wallet-dao)

### Zero wallet fund

Zero wallet fund is paid to [Zero wallet (DAO)](#zero-wallet-dao)

## Transaction fees

The transaction fee is calculated automatically by protocol. Fees are estimated based on the average occupancy of blocks, targeting 50% fill rate. The fee goes up or down based on how full the previous block was, targeting an average block utilization of 50%. When the previous block is more than 50% full, the transaction fee goes up proportionally. When it is below 50% usage, fees go down.

```
transactionFee = currFeeRate * transactionSize

currFeeRate = max(
     1e-16,
     0.1/networkSize,
     prevFeeRate*(1+0.25*(prevBlockSize/300Kb-0.5))
    )
```

Miners get 10% of transaction fees, 90% of the fees are burnt.

## iDNA coin utility

There are the following cases for supply utilization:

- Transaction fees: 90% of transaction fees are burnt
- Oracle voting expenses: oracle rewards payments, smart contract stake, voting deposits
- Decentralized ads: 100% of payments are burnt
- Cryptoidentity stake: 20% of minted coins are frozen in stakes, stakes of non-validated identities are burnt
- Smart contract stake: 50% of locked stake is burnt
- Mining penalties: miners must burn coins to pay the mining penalties
- Zero wallet lock: 1% of the minted coins are frozen in the zero wallet
- The bigger the network the more coinholders will just hold newly minted coins without spending them

## Use cases

There are various use cases that can be facilitated by the Idena network. Cryptoidentity enables such use cases as DAO, governance, quadratic funding, UBI, airdrops, accessible smart contracts, oracles, individual loans, courts, decentralized ads, censorship free publications, reputation system, etc.

### Decentralized ads

Current business models of most Internet services imply the monetization of personal information collected about the user’s behavior, interests, social connections, in many cases without the user’s consent. The advertising industry can be changed by turning the concept of targeting upside down: There could be an onchain model of a transparent advertiser where any advertisement contains an accessible targeting specification. Advertisers (not users!) disclose information about their target audience, and then each user’s device can decide on a particular advertisement that suits them at the moment, without revealing their personal data. The user’s device knows their current location, interests, gender, age, language, and more. All of these can be independently and automatically used to filter ads. The user gets the entire list of available advertisements, and it is the user (and not intermediaries such as search engines or social media platforms) who will have the right to choose what fits best. While in traditional media it is the intermediaries who benefit from ads delivery, onchain advertising leads to a model without intermediaries, in which the advertiser pays directly to the protocol, burning coins purchased on the market and thus distributing profits to all the network participants.

<img src="/img/wp/idena-coin-economy.png" alt="Idena validation flow" width="40%"
style={{display: "block", margin: "auto", padding: "40px"}} />

Advertisers have to purchase iDNA on a market and burn the coins to compete for the network attention. Burning coins will lead to the sustainable economics of the Idena network.

### Fair voting in online communities

Governance is one of the most important killer apps of blockchains. DAOs effectively recreate cross-border organizational structures at miniscule administrative costs and near-zero compliance burden. However, governance mechanisms in permissionless communities can only be based on the stake of tokens; hence, they are inherently plutocratic. Large stakeholders can collude to dominate the outcome of voting, discouraging others from participation. A unique cryptoidentity (one account per person) can be used to distribute voting credits to the individual members of the community to ensure fairness. Modern voting technologies such as Quadratic Voting can be implemented to engage the crowd to participate in the collective decision-making process.

### Oracles

For most use cases, smart contracts and DAOs need to be fed with factual information from the outside world. This requires oracles to supply offchain data to the blockchain. The Idena network is essentially a ready-made network of oracles. There will be mechanisms that enable every validated Idena user to have an equal chance of being selected as an oracle. Randomly chosen participants will receive information requests published by smart contracts. The selected oracles will provide the data and will stake coins to guarantee its accuracy. When the consensus on the information is reached, the oracles will be rewarded or penalized depending on the quality of the information they provided.

### Serverless messenger and in-chat payments

The network of independent nodes can securely store a queue of undelivered P2P-encrypted messages. Spam attacks are prevented by assigning a minor friction in the form of a transaction fee and a decentralized storage rent fee. The native cryptocurrency of the Idena network can be used to transact value between users as a special type of message inside the P2P chat. Trustless decentralized two-way bridges are to be developed to tokenize and transact major cryptocurrencies (BTC, ETH) as tokens on the Idena blockchain.

### Free speech publishing

The Idena network can be used as a decentralized storage for publications and whistleblowing information to build censorship-free publishing platforms, which are protected from bots manipulating content discovery.

### Global universal basic income (UBI)

A full node of the Idena blockchain could be light enough to run on an average laptop. Participation in the network is rewarded with minting and can be considered as a form of the universal basic income sufficient to cover network services (for example, sending messages) as well as the bill for the Internet service and electricity consumed. At a certain stage the Idena network can be attractive for international organizations to distribute unconditional rewards to network participants.
