---
hide_title: true
title: Idena validation ceremony protocol
sidebar_label: Validation ceremony
---

# Idena validation ceremony protocol

## Flips

Newly created flips are not available to anyone before the validation ceremony starts. Flips are stored in the IPFS in encrypted form. When validation starts then the public part of flips becomes available to anyone and the private part of flips become available only to users who have to solve them.

Public part of a flip contains 2 random images. Private part of the flip contains another 2 images and the images order.

### Flips decryption

![image](/img/developer/flip-decryption1.png)

1. _Public part:_ Public part of a flip can be decrypted by anyone using a `temporary key` which is broadcasted by the flip’s author during the short session.

   Node automatically collects all temporary keys broadcasted by all participants.

2. _Private part:_ Private part of the flip can be decrypted only by users who have to solve this flip. Once the flip lottery starts the author calculates which addresses must solve their flips. During the flip lottery authors broadcast packages with secret key encrypted in a way that user who should solve these flips can decrypt it:

   - Every `secret key` in the package is encrypted with a user’s public key so they need their private key to decrypt the flip
   - The whole package of the secret keys is encrypted with the `temporary key`, thus none of the users can decrypt it before the validation starts

![image](/img/developer/flip-decryption2.png)

Node automatically collects all encrypted flip key packages of secret keys broadcasted by all participants during the flip lottery and temporary keys broadcasted during the short session.

Both temporary and secret keys can be fetched with a node RPC for any specified flip.

See code example: `todo: link`

### Flips encryption

Secret and temporary keys are used to encrypt the private and public part of all flips created by a validated user.

Both secret key and temporary keys are derived from the epoch number and can be calculated with identity’s private key at any time.

See code example: `todo: link`

Packages of secret keys are generated during the flip lottery once the list of identities who need the secret keys becomes available.

See code example: `todo: link`

## Validation session protocol

Validation session consists of the following stages (UTC time):

- 13:25:00 or later: `Flip lottery` starts when a block with the `flip lottery` flag is mined
- 13:30:00: `Short session`
- 13:32:00 or later: `Long session` starts when a block with the `long session` flag is mined
- 14:00:00: `After-long session` starts when a block with a `long session finished` flag is mined
- 14:05:00 or later: New epoch starts when a block with the `validation finished` flag is mined. The new epoch can be started only after mining 5 blocks in a row without any ceremonial transactions. This ensures that all pending ceremonial transactions are mined.

### Flip lottery

Flip submission is forbidden during the flip lottery. Every node calculates the distribution of flips: which flips must be solved by which address during both short and long sessions.

After the flips distribution every node broadcasts an encrypted package of the secret keys to allow users decrypting flips.

Every user gets several flips from the same identity: one of the flips is used during the short session and other flips are used in the long session. All flips of the same author are encrypted with the same secret key.

### Short session

Once the short session starts every node distributes a `temporary key` so users can decrypt flips.

Every node collects all `temporary keys` required for the flips decrypting both for the short and long sessions.

First of all 8 flips for the short session are decrypted. 6 out of 8 flips are displayed for the user. If some of the keys are not available within the first 30 seconds then other 1 or 2 extra flips are shown instead. If the extra flips are not available, the user should solve remaining flips.

Once the user provides the answer, only the proofs of the answers must be broadcasted. The full set of answers is broadcasted during the long session.

### Long session

All flips for the long sessions are decrypted and shown to the user. The user can start solving and qualifying these flips even before the long session starts. The user can submit the answers and qualification votes for the flips at any point during the long session.

## Ceremonial transactions

There are 4 types of transactions that should be broadcasted during the validation by every user:

| Validation    | Transaction                 | Tx                     | Mandatory |
| ------------- | --------------------------- | ---------------------- | --------- |
| Short session | Short session answers proof | `SubmitAnswersHashTx`  | Yes       |
| Long session  | Short session answers       | `SubmitShortAnswersTx` | Yes       |
| Long session  | Long session answers        | `SubmitLongAnswersTx`  | Yes       |
| Long session  | Validation votes            | `EvidenceTx`           | No        |

### Answers structure

In order to create `SubmitAnswersHashTx`, `SubmitShortAnswersHashTx`, and `SubmitLongAnswersHashTx` transactions, the answers structure is used. The answers structure consists of 2 fields:

- Number of flips answered (e.g.: 6 for the short session)
- `Bits answers` structure

#### Bit answers

Bits answers specifies the user's answers and flags (e.g. reports). The flags are used only for the long session (`SubmitLongAnswersHashTx` transaction). The `Bits answers` structure must be aligned to n bytes.

Let's see example of the user's long session submission that contains answers for 4 flips:

| Flip | Answer | Flag       |
| ---- | ------ | ---------- |
| 1    | Left   | `Grade B`  |
| 2    | Left   | `None`     |
| 3    | Right  | `None`     |
| 4    | Right  | `Reported` |

`Bits answers` structure for given 4 flips:

![image](/img/developer/answer-struct.png)

Codes for flags:

| code | Flag          |
| ---- | ------------- |
| 000  | `None`        |
| 001  | `Reported`    |
| 010  | `GradeD` (\*) |
| 011  | `GradeC` (\*) |
| 100  | `GradeB` (\*) |
| 101  | `GradeA` (\*) |

(\*) - `GradeA`..`GradeD` are used to vote for extra rewards for the flip’s author (see [more](../wp/economics#flip-reward-fund)).

### Short session answers proof

`SubmitShortAnswersHashTx` transaction has to be broadcasted within a short session not later than 13:32:00 UTC

See the example of creating [`SubmitShortAnswersHashTx` transaction](https://github.com/idena-network/idena-web/blob/5892535dfe79b06eabbe7a49e5c1a8ce4b0230a8/screens/validation/machine.js#L1765)

### Short session answers

Once the long session has started, short session answers should be published.
In addition, the short answers transaction reveals the keywords which were used by the user to create flips.

Short session answers should be published not later than 13:35:00. Otherwise other users will not be able to qualify flips keywords and the user will be penalized.

See the example of creating [`SubmitShortAnswersTx` transaction](https://github.com/idena-network/idena-web/blob/5892535dfe79b06eabbe7a49e5c1a8ce4b0230a8/screens/validation/machine.js#L1786)

### Long session answers

See the example of creating [`SubmitLongAnswersTx` transaction](https://github.com/idena-network/idena-web/blob/5892535dfe79b06eabbe7a49e5c1a8ce4b0230a8/screens/validation/machine.js#L1810)

### EvidenceTx

Sending `EvidenceTx` is not mandatory for successful validation.

During the short session every node counts all short answer proof transactions and flip keys that were broadcasted in time. The node creates an `EvidenceTx` with a set of bits for every participant where i-th bit is equal to 1 if the i-th participant's short answer proof has been received in time.

Only mined `EvidenceTx` transactions are counted. There are 50% plus one vote required to certify if a short answer proof was submitted in time by a specific participant.

Shared nodes do not publish `EvidenceTx` transactions for their connected users.

## Idena Web App validation flow

Idena Web App connects to a shared node RPC and follows the validation flow protocol.
The private key of a user is stored in the browser local storage. It’s never sent to the shared node.

### Flip lottery

- Poll a shared node for the list of flips to solve. Once the distribution is completed the shared node provides the list of flips hashes for the specified address.
- Fetch raw flips both for short and long sessions
- Fetch encrypted flip keys for the flips decryption
- Fetch the list of addresses that are expecting the temporary and secret keys for the flips (keys must be provided for the submitted flips if the identity status is Newbie, Verified or Human), generate a package of secret keys and broadcast it.

### Short session

- Fetch the temporary keys for loaded flips
- Broadcast temporary key
- Decrypt 8 flips for the short session
- Display 6 flips the for user (use 2 extra flips is there are some flips not available after 35 seconds)
- Once the user has solved the flips, answers are stored locally.
- Generate SubmitAnswersHashTx and SubmitShortAnswersTx transactions and sign them with the private key
- Push SubmitAnswersHashTx to the shared node.
- Push SubmitAnswersHashTx automatically even if the user has not finished solving flips at 13:31:50 UTC.

### Long session

- Wait until 13:32:00 UTC and push SubmitShortAnswersTx to the shared node
- Decrypt remaining flips for the long session and display them for user
- Once user has solved the flips SubmitLongAnswersTx is created, signed and pushed to the shared node
- Poll the shared node for the validation results
