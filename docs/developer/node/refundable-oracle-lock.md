---
hide_title: true
title: RefundableOracleLock smart contract
sidebar_label: RefundableOracleLock
---

# RefundableOracleLock

The smart contract blocks `iDNA` deposited by multiple users until a decision is made by oracles. It works similarly to [`OracleLock`](./oracle-lock): if the voting result matches the expected value, coins are transferred to address A (if specified), otherwise to address B (if specified). However, a refund is provided to all users if the destination address A or B is not specified or oracle voting fails to reach a consensus. The amount of the refund is equal to the initial deposit or proportional to the initial deposit if the `RefundableOracleLock` address has been funded additionally.

## Use case 1

The contractor promises to complete the work by a certain deadline. The community is ready to fund the work. An oracle voting is created so that oracles at some point in the future confirm whether the work is done. Community members fund the work by depositing money from various wallets to `RefundableOracleLock`. If the result of the oracle voting confirms that the work is done, the money is transferred to the contractor. Otherwise, all contributors get a refund.

![image](https://user-images.githubusercontent.com/47352542/105392446-06191680-5c3d-11eb-9759-047e6e2da710.png)

## Use case 2 (prediction market)

An oracle voting is created so that oracles at some point in the future confirm the occurrence or non-occurrence of the event. Bets on the occurrence or non-occurrence of the event are locked on two linked RefundableOracleLock contracts. According to the results of the oracle voting, one of the two contracts will be the RefundableOracleLock-winner and the other will be the RefundableOracleLock-loser.
All money locked on the RefundableOracleLock-loser contract is sent to the address of the RefundableOracleLock-winner contract. After that, the money from the RefundableOracleLock-winner is returned to the winning users in the form of a refund in proportion to the bets made.

![image](https://user-images.githubusercontent.com/47352542/105392562-28129900-5c3d-11eb-85c0-402829951a2d.png)

In order to deploy several smart contracts having recursive references to each other see [how to calculate the address of the smart contract beforehand](./smart-contracts-methods#smart-contract-address).

## Smart contract data

The following smart contract data can be read using the [`contract_readData`](./smart-contracts-methods#contract_readdata-method) method:

- `oracleVoting` (hex): oracle voting smart contract address.
- `value` (byte): expected voting result at the `oracleVoting` smart contract address
- `successAddr` (hex): the destination address for sending the all the locked coins if `value` matches the voting result.
- `failAddr` (hex): the destination address for sending the all locked coins if `Value` does not match the voting result.
- `refundDelay` (uint64): the number of blocks delay since the `push` method was called. Determines when the `refund` method can be called.
- `depositDeadline` (hex): timestamp in seconds. Determines the time until when the `deposit` method can be called.
- `factEvidenceFee` (byte): determines percentage 0..100 of deposited coins that will be sent to the referred `OracleVoting` smart contract when the `deposit` method is called.
- `state` (byte): the state of the smart contract (only the `push` method can change the state):
  - `1` - `locked`: the initial state of the smart contract.
  - `2` - `unlocked_success`: the result on the `OracleVoting` smart contract matches the expected `Value` and the `Success address` is specified.
  - `3` - `unlocked_fail`: the result on the `OracleVoting` smart contract does not match the expected `Value` and the `Fail address` is specified.
  - `4` - `unlocked_refund` all other cases.
- `sum` (dna): total sum of deposited coins

The following smart contract array data can be read using the [`contract_iterateMap`](./smart-contracts-methods#contract_iteratemap-method) and [`contract_readMap`](./smart-contracts-methods#contract_readmap-method) methods:

- `deposits`: amount of coins deposited by each user

## Methods

### `contract_deploy` and `contract_estimateDeploy` methods

See static parameters for the methods [here](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods).

Dynamic `args` parameter:

0. `OracleVoting` (hex): the referred `OracleVoting` smart contract address.
1. `Value` (byte): expected voting result value on the referred `OracleVoting` smart contract (0, 1, 2...)
2. `Success address` (hex): the destination address for sending the all the locked coins if `Value` matches the voting result. The parameter is not mandatory.
3. `Fail address` (hex): the destination address for sending the all locked coins if `Value` does not match the voting result. The parameter is not mandatory.
4. `Refund delay` (uint64): the number of blocks delay since the `push` method was called. Determines when the `refund` method can be called.
5. `Deposit deadline` (uint64): timestamp in seconds. Determines the time until when the `deposit` method can be called.
6. `Oracle voting fee` (byte): Determines percentage 0..100 of deposited coins that will be sent to the referred `OracleVoting` smart contract when the `deposit` method is called.

Example:

```
{
  "method": "contract_deploy",
  "params": [
    {
      "from": "<Address>",
      "codeHash": "0x03",
      "amount": 1240,
      "maxFee": 123,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<OracleVoting smart contract address>"
        },
        {
          "index": 1,
          "format": "byte",
          "value": "0"
        },
        {
          "index": 2,
          "format": "hex",
          "value": "<Address>"
        },
        {
          "index": 3,
          "format": "hex",
          "value": "<Address>"
        },
        {
          "index": 4,
          "format": "uint64",
          "value": "4320"
        },
        {
          "index": 5,
          "format": "uint64",
          "value": "1611063000"
        },
        {
          "index": 6,
          "format": "byte",
          "value": "1"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<api key>"
}
```

### `deposit` method

In order to be able to get a refund, users must deposit their coins to the smart contract address by calling the `deposit` method. Otherwise coins cannot be refunded.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

The `amount` transferred in the transaction calling `deposit` method will be recorded in the smart contract for the corresponding sender's address. The sender can call the `deposit` method multiple times. The total sum of the deposited amount will be recorded for the sender's address.

A percentage of the deposited coins are automatically sent to the referred `OracleVoting` smart contract address according to the `Oracle voting fee` parameter specified for the `RefundableOracleLock` smart contract.

Example:

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "deposit",
      "amount": 1900,
      "maxFee": 1,
      "broadcastBlock": 0
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `push` method

When the voting result becomes known in the referred `OracleVoting` smart contract, then the `push` method can be be called. Otherwise an error will be returned. The `push` method can be called by anyone.

The `push` returns error if the the the smart contract state is not `locked`. Otherwise the state changes to:

- `unlocked_success` if the result on the `OracleVoting` smart contract matches the expected `Value` and the `Success address` is specified. Coins are sent to the `Success address` automatically.
- `unlocked_fail` if the result on the `OracleVoting` smart contract does not match the expected `Value` and the `Fail address` is specified. Coins are sent to the `Fail address` automatically.
- `unlocked_refund` all the other cases. The method `refund` can be called afterwards.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "push",
      "maxFee": 1
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `refund` method

The `refund` method can be called only when the state of the smart contract is `unlocked_refund` and `Refund delay` is expired. Otherwise an error will be returned. The `refund` method can be called by anyone.

All coins deposited at the `RefundableOracleLock` smart contract are distributed to all addresses who called `deposit` method proportionally to total amount deposited by each address.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "refund",
      "maxFee": 1
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
