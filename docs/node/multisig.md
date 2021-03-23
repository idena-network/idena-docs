---
hide_title: true
title: Multisig M-of-N smart contract
sidebar_label: Multisig M-of-N
---

# Multisig


A multisignature smart contract address with specified M and N locks coins. In order to send the coins from the `Multisig` smart contract address, M specific participants out of N have to provide their signatures.

## Smart contract data

The following smart contract data can be read using the [`contract_readData`](./smart-contracts-methods#contract_readdata-method) method:

- `maxVotes` (byte): number of voters
- `minVotes` (byte): min number of votes required to unlock the coins
- `state` (byte):
  - `1` the multisig is not initialized: the list of voters is not defined (one should not send the coins to the multisig address)
  - `2` the multisig is initialized
- `count` (byte): the number of voters added. The `count` data can be fetched only while `state`=`1`
- `owner` (hex): owner address

The following smart contract array data can be read using the [`contract_iterateMap`](./smart-contracts-methods#contract_iteratemap-method) and [`contract_readMap`](./smart-contracts-methods#contract_readmap-method) methods:

- `addr`: the votes given for the specific destination address where to unlock the coins (you can use `amount` map with the same indexes to determine amount for each vote)
- `amount`: the votes given for the specific amount to unlock the coins

## Methods

### `contract_deploy` and `contract_estimateDeploy` methods

See static parameters for the methods [here](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods). The `amount` parameter specifies the amount of locked coins. Coins transferred to the deployed smart contract address will be locked as well.

Dynamic `args` parameter:

0. `Max votes` (byte): Determines the total number of participants controlling the smart contract. The value must be within the interval `1..32`
1. `Min votes` (byte): Determines the minimum number of participants required to unlock the coins. The value must be within the interval `1..Max votes`

Example:

```
{
  "method": "contract_deploy",
  "params": [
    {
      "from": "<Address>",
      "amount": 100,
      "codeHash": "0x05",
      "maxFee": 123,
      "args": [
        {
          "index": 0,
          "format": "byte",
          "value": "10"
        },
        {
          "index": 1,
          "format": "byte",
          "value": "5"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<api key>"
}
```

### `add` method

The `add` method adds the voter's address that can vote for transfers to unlock the coins. The `add` method can be called only by the smart contract owner.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

Dynamic `args` parameter:

0. `Address` (hex): the voter's address for sending the locked coins. The parameter is mandatory.

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "add",
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<Address>"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `send` method

The `send` method can be called only by the voter's address. The `send` method doesn't physically send coins. When the `send` method is called by a voter, it means that the voter agrees to unlock a specific amount of coins to the specified address. Voter can call the `send` method multiple times but only the latest vote will be counted.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

Dynamic `args` parameter:

0. `Destination` (hex): the destination address for sending the locked coins. The parameter is mandatory.
1. `Amount` (dna): the amount of coins to transfer. The parameter is mandatory.

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "send",
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<Address>"
        },
        {
          "index": 1,
          "format": "dna",
          "value": "100"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `push` method

The `push` method can be called only if there are sufficient votes collected for transferring the specified amount of coins to the specified address. The `push` method can be called by anyone.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

Dynamic `args` parameter:

0. `Destination` (hex): the destination address for sending the locked coins. The parameter is mandatory.
1. `Amount` (dna): the amount of coins to transfer. The parameter is mandatory.

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "push",
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<Address>"
        },
        {
          "index": 1,
          "format": "dna",
          "value": "100"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `terminate` method

See static parameters for the `terminate` method [here](./smart-contracts-methods#contract_terminate-and-contract_estimateterminate-methods).

Dynamic `args` parameter:

0. `Destination address` (hex): determines the address to which 50% of the staked coins will be transferred.

Example:

```
{
  "method": "contract_terminate",
  "params": [
    {
      "from": "<Sender address>",
      "contract": "<Smart contract address>",
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<Destination address>"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<api key>"
}
```
