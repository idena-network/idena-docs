---
hide_title: true
title: Idena smart contracts
sidebar_label: Summary
---

# Idena smart contracts

_Note: Currently only predefined smart contracts available (see [below](#predefined-smart-contracts))._

## Gas and Transaction fee

In addition to transaction fee per byte a gas consumption has to be paid when a smart contract is called.

Transaction fee and gas charged when calling the following for smart contracts:

- [`contract_deploy`](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods)
- [`contract_call`](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods)
- [`contract_terminate`](./smart-contracts-methods#contract_terminate-and-contract_estimateterminate-methods)

## `maxFee` parameter

Maximum transaction fee `maxFee` parameter must cover a sum of `txFee`+`gasCost`.

`GasCost` is calculated as a total amount of gas consumed by the smart contract operations multiplied to the current `GasPrice`.

You can use estimation methods to get an expected amount of gas that will be consumed by the smart contract:

- [`contract_estimateDeploy`](./smart-contracts-methods#contract_deploy-and-contract_estimatedeploy-methods)
- [`contract_estimateCall`](./smart-contracts-methods#contract_call-and-contract_estimatecall-methods)
- [`contract_estimateTerminate`](./smart-contracts-methods#contract_terminate-and-contract_estimateterminate-methods)

Response example:

```js
 "result": {
    ...
    "gasCost": "0.416",
    "txFee": "0.56"
  }
```

The `maxFee` parameter can be omitted when calling estimation methods.

## GasPrice

`GasPrice` is calculated automatically by the protocol. The minimum `GasPrice` is: `GasPrice`= `0.01`/`NetworkSize`.

The [`bcn_feePerGas`](#bcn_feePerGas-method) method should be called to get the current `GasPrice`.

Example:

```js
{
  "result": 1651527663100 //0.0000016515276631 iDNA
}
```

## Smart contract stake

In order to deploy a new Idena smart contract stake must be locked. The `amount` parameter has to be specified to lock the stake when `DeployTx` transaction is called. If the specified amount is less than a minimum stake then error message will be returned.

```json
  "error": {
    "code": -32000,
    "message": "invalid amount"
  }
```

Minimum smart contract stake is calculated as `GasPrice` \* `3000000`

50% of the stake will be refunded to its creator once the smart contract is terminated.

## Smart contract termination

Termination of the smart contract removes all smart contract data from the state. 50% of the stake is burnt. Another 50% of the stake transferred to the creator of the smart contract.

The contract might be terminated according to its internal rules.

For instance `OracleVoting` smart contract can be terminated after a termination delay once the public voting is finished. Termination delay is proportional to the amount of coins blocked at the smart contract stake. Termination delay, days = `round( (NetworkSize * Stake) ^ 1/3 )`

## Predefined smart contracts

Currently only predefined smart contracts available to deploy. You can find the code of the smart contracts [here](https://github.com/idena-network/idena-go/tree/master/vm/embedde).

`CodeHash` represents the algorithm of a predefined smart contract:

- `0x01`: [TimeLock](./time-lock)
- `0x02`: OracleVoting (integrated into Idena app)
- `0x03`: [OracleLock](./oracle-lock)
- `0x04`: [RefundableOracleLock](./refundable-oracle-lock)
- `0x05`: [Multisig](./multisig)

## Smart contracts transactions

- `DeployTx`: Create smart contract
- `CallTx`: Call method of the smart contract
- `TerminateTx`: Delete smart contract and refund 50% of the locked stake

## Smart contracts transaction receipt

`TxReceipt` indicates result of mined smart contract transaction `DeployTx`, `CallTx` or `TerminateTx`

```json
{
  "contract": "0xa9694569a6efe69f156a9f457bbd2163c78e4ef4",
  "method": "transfer",
  "success": true,
  "gasUsed": 382,
  "txHash": "0x7d48995a8f6a22e4d060a9471adc22e88e5303bb1129bf6c7a250438f370c5b5",
  "error": "",
  "gasCost": "114.6",
  "txFee": "17.7"
}
```

- `Contract`: address of the smart contract
- `Method`: called method of the smart contract
- `Success`: whether transaction changed the state or not
- `gasUsed`: amount of gas used
- `txHash`: smart contract transaction hash
- `Error`: error text
- `gasCost`: gas cost, iDNA
- `txFee`: transaction fee, iDNA

## Smart contract address

You can calculate the address of the smart contract before it will be deployed as [following](https://github.com/idena-network/idena-rpc/blob/master/src/Components/Contracts.js#L315):

```js
const addr = toBuffer(hexToUint8Array(state.address));
const epoch = int16ToBuffer(parseInt(state.epoch));
const nonce = int32ToBuffer(parseInt(state.nonce));
const res = [...addr, ...epoch, ...nonce];
const hash = sha3.keccak_256.array(res);
response.address = toHexString(hash.slice(hash.length - 20), true);
```

- `addr`: sender address
- `epoch`: epoch when the smart contract will be deployed
- `nonce`: nonce of the deploy transaction

Example:

```json
{
  "address": "0x6f73b00d873fc21c4ca2f44bfb20653768dbd48e",
  "epoch": "1",
  "nonce": "2"
}
{
  "address": "0x39bd250ac33f24b32af705617c0b46ead3c8f7c5"
}
```
