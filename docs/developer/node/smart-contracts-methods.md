---
hide_title: true
title: Methods
sidebar_label: Methods
---

# Smart contract methods

Node RPC call example:

```
curl -X POST --data '{
                       "jsonrpc":"2.0",
                       "key":"myAPIkey",
                       "id":1,
                       "method":"contract_call",
                       "params": [
                         {
                           "from": "0x...",
                           "contract": "0x...",
                           "method": "transfer",
                           "args": [
                             {
                               "index": 0,
                               "format": "hex",
                               "value": "0xcbb98....91"
                             },
                             {
                               "index": 1,
                               "format": "dna",
                               "value": "1000"
                             }
                           ]
                         }
                       ]
                     }'
```

Smart contract methods may have a dynamic list of parameters `args` that is specific to each smart contract:

```json
[
  {
    "index": 0,
    "format": "hex",
    "value": "0x11"
  },
  {
    "index": 1,
    "format": "uint64",
    "value": "11"
  }
]
```

- `Index`: index of parameter
- `Format`: format of parameter `byte`, `uint64`, `string`, `bigint`, `hex` (default), `dna` (float representation).
- `Value`: parameter value interpreted according to the specified format

## `contract_deploy` and `contract_estimateDeploy` methods

Method `contract_deploy` creates `DeployTx` transaction to deploy a smart contract specified by `CodeHash`. Use `contract_estimateDeploy` to estimate gas consumption of the `contract_deploy` transaction.

**Parameters:**

- `from`: sender address
- `codeHash`: predefined smart contract code
- `amount`: amount of coins that will be blocked at the smart contract stake
- `args`: dynamic list of parameters relevant to the specified smart contract
- `maxFee`: must cover a sum of `txFee`+`gasCost` (see [more about `maxFee`](./smart-contracts#gas-and-transaction-fee))

**Example:**

```json
{
  "method": "contract_estimateDeploy",
  "params": [
    {
      "from": "<address>",
      "codeHash": "0x01",
      "amount": 1100,
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "uint64",
          "value": "0"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<key>"
}
```

## `contract_call` and `contract_estimateCall` methods

Method `contract_call` creates `CallTx` transaction to call a smart contract's method. Use `contract_estimateCall` method to estimate gas consumption of the `contract_call` transaction.

**Parameters:**

- `from`: sender address
- `contract`: smart contract address
- `method`: smart contract's method to call
- `amount`: amount of coins transferred to the smart contract address
- `args`: dynamic list of parameters relevant to specified smart contract's method
- `broadcastBlock`: block number when a postponed transaction should be published by the node

**Example:**

```json
{
{
  "method": "contract_estimateCall",
  "params": [
    {
      "from": "<sender address>",
      "contract": "<smart contract address>",
      "method": "transfer",
      "amount": 123,
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<address>"
        },
        {
          "index": 1,
          "format": "dna",
          "value": "123"
        }
      ]
    }
  ],
  "id": 1,
  "key": "<key>"
}
```

## `contract_terminate` and `contract_estimateTerminate` methods

Method `contract_terminate` creates `TerminateTx` transaction to terminate the smart contract. Use `contract_estimateTerminate` method to estimates gas consumption of the `contract_terminate` transaction.

**Parameters:**

- `from`: sender address
- `contract`: smart contract address
- `args`: dynamic list of parameters relevant to specified smart contract's method

**Example:**

```json
{
  "method": "contract_estimateTerminate",
  "params": [
    {
      "from": "<sender address>",
      "contract": "<smart contract address>",
      "maxFee": 1,
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "<Destination address>"
        }
      ]
    }
  ]
}
```

## `contract_readData` method

Returns requested data of the smart contract's state.

**Parameters:**

- `contract`: smart contract address
- `key`: key of the requested data
- `format`: data format

**Example:**

```json
{
  "method": "contract_readData",
  "params": ["<smart contract address>", "key", "hex"]
}
```

## `contract_iterateMap` method

Returns requested array data (`map`) of the smart contract's state and continuation token to iterate the data.

**Parameters:**

- `contract`: smart contract address
- `map`: the name of the requested array data (see maps available for the specific smart contract)
- `continuationToken`: iteration token should be `null` for the first call
- `keyFormat`: key format of the requested array data
- `valueFormat`: data format of the requested array data

**Example:**

```json
{
  "method": "contract_iterateMap",
  "params": [
    "<smart contract address>",
    "addr", //map name
    null, //continuationToken
    "hex", //keyFormat
    "hex", //valueFormat
    10
  ]
}
```

## `contract_readMap` method

Returns requested value for the given key from the array data (`map`) of the smart contract's state.

**Parameters:**

- `contract`: smart contract address
- `map`: the name of the requested array data (see maps available for the specific smart contract)
- `key`: key of the requested array data
- `valueFormat`: data format of the requested array data

**Example:**

```json
{
  "method": "contract_readMap",
  "params": [
    "<smart contract address>",
    "addr",
    "0x725....70", //key in the array data
    "hex"
  ]
}
```

## `contract_readonlyCall` method

Calls specified smart contract's method without changing the state.

**Parameters:**

- `contract`: smart contract address
- `method`: key of the requested data
- `format`: data format
- `args`: dynamic list of parameters

**Example:**

```json
{
  "method": "contract_readonlyCall",
  "params": [
    {
      "contract": "<smart contract address>",
      "method": "getHash",
      "format": "hex",
      "args": [
        {
          "index": 0,
          "format": "hex",
          "value": "123"
        }
      ]
    }
  ]
}
```

## `contract_getStake` method

Returns amount of coins blocked at the stake of the smart contract

**Parameters:**

- `Contract`: smart contract address

**Example:**

```json
{
  "method": "contract_getStake",
  "params": ["<smart contract address>"]
}
```

## `bcn_txReceipt` method

Returns receipt of the specified transaction

**Parameters:**

- `hash`: hash of mined transaction

**Example:**

```json
{
  "method": "bcn_txReceipt",
  "params": ["<transaction hash>"]
}
```

**Response example:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "contract": "...",
    "method": "...",
    "success": false,
    "gasUsed": 200,
    "txHash": "0x217...",
    "error": "index out of range",
    "gasCost": "0.00032916392364",
    "txFee": "0.002320605661662"
  }
}
```

- `contract`: address of the called contract
- `method`: called method of the smart contract
- `success`: whether transaction changed the state or not
- `gasUsed`: amount of gas used
- `txHash`: contract transaction hash
- `error`: error text
- `gasCost`: gas cost, iDNA
- `txFee`: transaction cost, iDNA

**Errors:**

- `index out of range`: `args` array has a missing element with required `index`.

## `contract_events` method

Returns the list of events of the specified smart contract

**Parameters:**

- `contract`: smart contract address

**Example:**

```json
{
  "method": "contract_events",
  "params": [
    {
      "contract": "<smart contract address>"
    }
  ]
}
```

## `contract_subscribeToEvent` and `contract_unsubscribeFromEvent` methods

Subscribes/unsubscribes from the specified event of the smart contract

**Parameters:**

- `contract`: smart contract address
- `event`: event name

**Example:**

```json
{
  "method": "contract_subscribeToEvent",
  "params": ["<smart contract address>", "<event name>"]
}
```

## `bcn_feePerGas` method

The method returns the current `gasPrice`.

**Example:**

```json
{
  "method": "bcn_feePerGas",
  "params": [],
  "id": 1,
  "key": "<API key>"
}
```

Example:

```json
{
  "result": 1651527663100 //0.0000016515276631 iDNA
}
```

The minimum `gasPrice` is `0.01`/`NetworkSize`.
