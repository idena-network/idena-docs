---
hide_title: true
title: TimeLock smart contract
sidebar_label: TimeLock
---

# TimeLock 

The `TimeLock` smart contract locks coins on the smart contract address until the specified time. Once a newly mined block has a timestamp greater than that time, the coins can be transferred to any address specified by the owner.

## Smart contract data

The following smart contract data can be read using the [`contract_readData`](./smart-contracts-methods#contract_readdata-method) method:

- `timestamp` (uint64)
- `owner` (hex)

## Methods

### `contract_deploy` and `contract_estimateDeploy` methods

See static parameters for the methods [here](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods). The `amount` parameter specifies the amount of locked coins. Coins transferred to the deployed smart contract address will be locked as well.

Dynamic `args` parameter:

0. `timeStamp` (uint64): unlock time in seconds. Determines the time after which the `transfer` method can be called.

Example:

```
{
  "method": "contract_deploy",
  "params": [
    {
      "from": "<Address>",
      "amount": 100,
      "codeHash": "0x03",
      "maxFee": 123,
      "args": [
        {
          "index": 0,
          "format": "uint64",
          "value": "1611063000"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<api key>"
}
```

### `transfer` method

Once a newly mined block has a timestamp greater than the specified time, the `transfer` method can be called. The `transfer` method can be called only by the `owner` (the address which was used to deploy the smart contract).

See static parameters for the `call` method [here](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods).

Dynamic `args` parameter:

0. `Destination` (hex): the destination address for sending the locked coins. The parameter is mandatory.

```
{
  "method": "contract_call",
  "params": [
    {
      "from": "<Address>",
      "contract": "<Address>",
      "method": "transfer",
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

### `terminate` method

See static parameters for the `terminate` method [here](./smart-contracts-methods#contract_terminate-and-contract_estimateterminate-methods).

Dynamic `args` parameter:

0. `Destination address` (hex): determines address to which 50% of the staked coins will be transferred.

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
