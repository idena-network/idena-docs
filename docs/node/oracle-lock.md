---
hide_title: true
title: OracleLock smart contract
sidebar_label: OracleLock
---
# OracleLock 

The smart contract blocks `iDNA` until the specified oracle voting result is known.
Once the voting at the referenced `OracleVoting` smart contract is finished, anyone can call the `checkOracleVoting` method and then the `push` method which sends the blocked coins to one of the two addresses:

- `Success address`: if the result on the `OracleVoting` smart contract matches the expected `Value`.
- `Fail address`: in all other cases.

Both addresses have to be specified beforehand.

## Use case

The contractor promises to complete the work by a certain date. The customer creates an oracle voting in order for oracles to vote in the future whether the work is done. The customer blocks the money on the `OracleLock` contract. If the result of oracle voting confirms that the work is done, the money is transferred to the contractor. Otherwise, the money is sent back to the customer.

![image](https://user-images.githubusercontent.com/47352542/105391877-6196d480-5c3c-11eb-8fa6-39a29f6e5243.png)

## OracleLock states

- `locked`: the initial state of the smart contract.
- `unlocked_success`: the result on the `OracleVoting` smart contract matches the expected `Value`.
- `unlocked_failed`: the result on the `OracleVoting` smart contract does not match the expected `Value`.

Only the `checkOracleVoting` method can change the state of the `OracleLock` smart contract.

## Smart contract data

The following smart contract data can be read using the [`contract_readData`](./smart-contracts-methods#contract_readdata-method) method:

- `oracleVotingAddr` (hex)
- `value` (byte)
- `successAddr` (hex)
- `failAddr` (hex)
- `owner(hex)`
- `isOracleVotingFinished` (byte)
- `hasVotedValue(byte)`
- `voted` (byte)

## Methods

### `contract_deploy` and `contract_estimateDeploy` methods

See static parameters for the methods [here](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods).

Dynamic `args` parameter:

0. `OracleVoting` (hex): the referred `OracleVoting` smart contract address.
1. `Value` (byte): the expected voting result value on the referred `OracleVoting` smart contract (0, 1, 2...)
2. `Success address` (hex): the destination address for sending the all the locked coins if the `Value` matches the voting result. The parameter is mandatory.
3. `Fail address` (hex): the destination address for sending the all locked coins if the `Value` does not match the voting result. The parameter is mandatory.

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
        }
      ]
    }
  ],
  "id": 1,
  "key": "<api key>"
}
```

### `checkOracleVoting` method

When the voting result becomes known in the referred `OracleVoting` smart contract, the `checkOracleVoting` method can be called. Otherwise an error will be returned. The `checkOracleVoting` method can be called by anyone.

The `checkOracleVoting` method changes the initial state of the smart contract `locked` to:

- `unlocked_success`: if the result on the `OracleVoting` smart contract matches the expected `Value`.
- `unlocked_failed`: if the result on the `OracleVoting` smart contract does not match the expected `Value`.

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "checkOracleVoting",
      "maxFee": 1
    }
  ],
  "id": 1,
  "key": "<API key>"
}
```

### `push` method

The `push` method can be called only when the state of the smart contract is `unlocked_success` or `unlocked_failed`. Otherwise an error will be returned. The `push` method can be called by anyone. The method can be called multiple times if needed.

All coins deposited at the `OracleLock` smart contract are transferred to the `Success address` or the `Failed address`.

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

### `terminate` method

The `terminate` method can be called only when the balance of the smart contract address is zero.

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
