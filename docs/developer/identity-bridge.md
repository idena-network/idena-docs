---
hide_title: true
title: Idena<>ETH bridge
sidebar_label: Idena<>ETH bridge
---

# Idena to Ethereum identity bridge

Transferring the ledger of the validated addresses from Idena to other blockchains can allow dApps to ensure the uniqueness and the humanness of the address owner while leaving them fully anonymous:

- to make an airdrop on Ethereum, BSC, or other blockchains;
- to offer a slot in an IDO;
- to vote for a governance proposal;
- to participate in an oracle;
- for quadratic funding.

[Idena Authorisation](https://docs.idena.io/docs/developer/desktop/sign-in) already works as a centralized identity solution, e.g for Gitcoin quadratic voting and Fairdrop.io airdrop service. Now we add a new decentralized solution for relaying identity states to Ethereum, BSC, or any other blockchain with smart contracts: Idena Identity Bridge.

With new API calls, a snapshot of the validation state of all identities on the Idena blockchain is hashed to a Merkle tree. The resulting hash can be recorded, for instance, to an Ethereum smart contract.

There are two API methods that allow to get the identity Merkle tree and check the status of a certain identity:

- [Get identity Merkle tree root for the specific epoch](http://api.idena.io/api/swagger/index.html#/Epochs/Epoch)
- [Get Merkle proof for an identity address for the specific epoch](http://api.idena.io/api/swagger/index.html#/Identity/EpochIdentityDataWithProof)

There is also an [example of a smart contract that can check the Merkle proof](https://github.com/idena-network/idena-examples/tree/master/solidity-voting) in the Idena GitHub repository.
