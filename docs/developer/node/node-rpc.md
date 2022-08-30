---
hide_title: true
title: Idena node RPC
sidebar_label: Node RPC
---

# Node RPC

You can view node RPC methods [here](http://rpc.idena.io)

## Default RPC endpoint

http://localhost:9009

## RPC call example

```
curl -X POST --data '{
                       "jsonrpc":"2.0",
                       "key":"myAPIkey",
                       "id":1,
                       "method":"dna_getCoinbaseAddr",
                       "params": []
                     }'
```

### Address nonce

Address nonce is a transaction counter in each Idena address. This prevents replay attacks where a transaction sending eg.
20 coins from A to B can be replayed by B over and over to continually drain A's balance.
The nonce keeps track of how many transactions the sender has sent during the current epoch. Address nonce starts from 0 each epoch.
Nonce is the transaction counter only of the sending address. It doesn't include transactions received by the address.

You can get the current account nonce by calling `dna_getBalance` method. Example:

```
{
  "method": "dna_getBalance",
  "params": [
    "<address>"
  ],
  "id": 0,
  "key": "<key>"
}
```

Response:

```
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "stake": "1.727568288016598691",
    "balance": "7.376388954349732279",
    "nonce": 21
  }
}
```

### Epoch

You can get the current epoch using `dna_epoch` method. Example:

```
{
  "method": "dna_epoch",
  "params": [],
  "id": 0,
  "key": "<key>"
}
```

Response:

```
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "epoch": 65,
    "nextValidation": "2021-03-30T15:30:00+02:00",
    "currentPeriod": "None",
    "currentValidationStart": "2021-03-30T15:30:00+02:00"
  }
}
```

### Transaction nonce and epoch

When sending transaction the current epoch number and subsequent nonce value should be specified for the sender address (`address nonce`+1).

Example:

```
{
  "method": "dna_sendTransaction",
  "params": [
    {
      "from": "<address>",
      "to": "<address>",
      "amount": "100",
      "maxFee": 0.1,
      "nonce": 22,
      "epoch": 65
    }
  ],
  "id": 0,
  "key": "<key>"
}
```

### Transaction fees

The transaction fee is calculated automatically by protocol. The fee goes up or down based on how full the previous block was, targeting an average block utilization of 50%.
When the previous block is more than 50% full, the transaction fee goes up proportionally. When it is below 50% usage, fees go down.

```
transactionFee = currFeeRate * transactionSize

currFeeRate = max(
     1e-17,
     0.01/networkSize,
     prevFeeRate*(1+0.25*(prevBlockSize/300Kb-0.5))
    )
```

You can specify the maximum fee limit for the transaction `maxFee`.

### Dust

All addresses with balances less than dust are cleaned every time a new epoch starts. Dust coins are burnt to prevent spam and minimize the size of the blockchain state. You can calculate the dust size using the following formula:

```
10/networkSize
```

### The smallest unit of iDNA

The smallest unit of iDNA is `1e-18` iDNA (`0.000000000000000001` iDNA).

### Raw transactions

You can build and sign raw transaction offline. See `js` [examples](https://github.com/idena-network/idena-examples/tree/master/nodejs-protobuf-transaction-signing). Actual protobuf model of transactions see [here](https://github.com/idena-network/idena-go/blob/master/protobuf/models.proto#L6).
