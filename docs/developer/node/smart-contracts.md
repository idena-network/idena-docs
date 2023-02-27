---
hide_title: true
title: Idena smart contracts
sidebar_label: Summary
---

# Idena smart contracts

There are two types of smart contracts in Idena:

- **Custom contracts** that can be deployed by any developer
- **Predefined contracts** built-in into the Idena node code (can be changed with hard fork updates)

Custom contracts are executed in Wasmer runtime. Any language that compiles to WebAssembly (Wasm) can be used for developing contracts. Currently you can use TypeScript-like language [AssemblyScript](https://www.assemblyscript.org/) and compile your contracts into WebAssembly (see [Quick start](./quick-start)). For developing contracts in AssemblyScript [Idena-sdk-as](./idena-sdk-as) is recommended.

## Contract transactions

There are three types of transactions to deal with Idena contracts:

### 1. `DeployContractTx`

#### Deploy custom contract

`DeployContractTx` transaction deploys a custom contract specified by the `code` and `nonce` and executes the contract class constructor. Fields of `DeployContractTx` transaction for creating a custom contract:

- `from`: sender address
- `code:  []byte`: compiled WebAssembly code (see [Quick start](./quick-start#building) to build a simple custom contract)
- `nonce: []byte`: nonce allows you to generate unique addresses for published contracts
- `args`: dynamic list of parameters of constructor which is specific to a particular contract
- `maxFee`: must cover a sum of `txCost`+`gasCost` (see more about [`maxFee`](#maxfee-parameter))

_Please note that that maximum size of the transaction payload is `MaxPayloadSize` = 3 MB_

#### Deploy predefined contract

`DeployContractTx` transaction deploys a predefined contract specified by the `codeHash` and executes the contract class constructor. Fields of `DeployContractTx` transaction for creating a predefined contract:

- `from`: sender address
- `amount`: specifies amount of coins that will be blocked in the stake of the contract
- `codeHash`: contract code
- `args`: dynamic list of parameters of constructor which is specific to a particular contract
- `maxFee`: must cover a sum of `txCost`+`gasCost` (see more about [`maxFee`](#maxfee-parameter))

`codeHash` specifies the algorithm of a predefined contract:

- `0x01`: [TimeLock](./time-lock)
- `0x02`: OracleVoting (integrated into Idena app)
- `0x03`: [OracleLock](./oracle-lock)
- `0x04`: [RefundableOracleLock](./refundable-oracle-lock)
- `0x05`: [Multisig](./multisig)

_Note: you can find the code of predefined contracts [here](https://github.com/idena-network/idena-go/tree/master/vm/embedde)_

`amount` specifies amount of iDNA transfered to the contract stake. Minimum contract stake is `gasPrice` \* `3,000,000`. If the specified amount is below the minimum stake then an error message will be returned:

```json
  "error": {
    "code": -32000,
    "message": "invalid amount"
  }
```

### 2. `CallContractTx`

`CallContractTx` transaction executes specified public method of the contract class. Fields of the `CallContractTx` transaction:

- `from`: sender address
- `contract`: smart contract address
- `method`: name of the public contract method
- `amount`: amount of coins transferred to the smart contract address
- `args`: dynamic list of parameters which is specific to a particular method

### 3. `TerminateContractTx`

_Note: `TerminateContractTx` is available only for predefined contracts_

`TerminateContractTx` transaction removes the contract's data from the Idena blockchain state. 50% of the stake is burnt. Another 50% of the stake is transferred to the creator of the smart contract. The contract might be terminated according to its internal rules. For instance `OracleVoting` smart contract can be terminated after a termination delay once the public voting is finished. Termination delay is proportional to the amount of coins blocked at the smart contract stake. Termination delay, days = `round( (NetworkSize * Stake) ^ 1/3 )`

Fields of the `TerminateContractTx` transaction:

- `from`: sender address
- `contract`: smart contract address
- `args`: dynamic list of parameters which is specific to a particular predefined smart contract

_Note: `TerminateContractTx` is not available for custom contracts. In the future to minimize the state of the Idena node a mechanism that suspends inactive contracts will be introduced. If a contract is not used (by validated users) then it might be suspended. After N epochs the state of suspended contract might be deleted. Only Merkle root will be saved so anyone who saved the state of the suspended contract offchain could initiate its recovery._

## Contract addresses

#### Custom contracts address

The address of the custom contract is calculated as a hash from code hash, protobuf packed args and deploy attachment nonce. The contract address is the last 20 bytes of the hash.

#### Predefined contract address

The address of the predefined contract is calculated as a hash from tx sender, tx epoch and tx account nonce. The contract address is the last 20 bytes of the hash.

You can calculate the address of the predefined contract before it will be deployed as [following](https://github.com/idena-network/idena-rpc/blob/master/src/Components/Contracts.js#L315)

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

## Contract transaction fee

In Idena `gasPrice` is calculated [automatically](../../wp/economics#transaction-fees) for each block. `gasPrice` is used to calculate the cost of a transaction and the cost of the gas consumed by the contract called by this transaction. The [`bcn_feePerGas`](smart-contracts-methods#bcn_feepergas-method) method should be called to get the current `gasPrice`.

The total amount of `fee` for the contract transaction is calculated as cost of transaction plus cost of the gas consumed by the called contract:

`fee` = `txCost` + `gasCost`

#### txCost

The cost of transaction depends on its size:

`txCost` = `txSize` \* 10 \* `gasPrice`

So 1 byte of transaction has the same cost as 10 units of gas.

#### gasCost

The cost of the gas is calculated as the total amount of gas consumed by a contract multiplied to the current `gasPrice`:

`gasCost` = `gasUsed` \* `gasPrice`

`gasUsed` is the amount of gas consumed by the contract during its execution.

### `maxFee` parameter

For a successful transaction, maximum transaction fee `maxFee` parameter must be greater than the sum of `txCost`+`gasCost`.

You can use estimation methods to get an expected amount of gas that will be consumed by the contract:

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

- `gasCost`: gas cost, iDNA (see [`gasCost`](#gascost))
- `txFee`: transaction cost, iDNA (see [`txCost`](#txcost))

The `maxFee` parameter can be omitted when calling estimation methods.

### Gas limit

The max amount of gas per block is limited by 5,120,000.

The max amount of gas that can be consumed by a transaction is limited by `gasLimit`, which can be calculated as follows:

`gasLimit` = (`maxFee` - `txCost`) / `gasPrice`

When developing contracts, you may need to specify an explicit limit of gas for some methods. For example if another contract is being called using `create_call_contract_promise`, then the gas limit has to be specified in units of `wasm_gas_limit`:

`wasm_gas_limit` = `gasLimit` \* 100

## Contract transaction receipt

You can call Idena node method [`TxReceipt`](./smart-contracts-methods#bcn_txreceipt-method) to check the result of mined contract transaction `DeployContractTx`, `CallContractTx` or `TerminateContractTx`

## Asynchronous calls

In future, storage of the Idena blockchain state will be split between shards. As a result neither the contracts data nor contracts code will not be available within the execution on a single node.

In sharded architecture the contract `C1` from shard A makes an asynchronous call to shard B, which holds the state of the contract `C2`. In Idena asynchronous calls for deployment, calling contracts and reading contracts data are supported. For more details about asynchronous calls see [idena-sdk-as](./idena-sdk-as).

![image](/img/developer/smart-contracts-sharding.png)

Unlike synchronous execution, in asynchronous calls, the result of the execution of the initial method can be successful, while the asynchronous calls end with errors. For example transaction `Tx1` calls a method of the contract `C1` in the Shart A. Contracts `C1` creates a promise by calling another contract `C2` that is executed in Shard B. If there are no errors, then the contract `C1` completes its execution and commits its results to the blockchain state. To get the result of the promise, the initial contract `C1` handles a callback of the contract `C2` and processes possible errors.

Currently Idena node emulates asynchronous execution, while the execution takes place within a single block. However the commits to the blockchain state and the execution order of the promises correspond to the fully sharded architecture.

For the convenience of debugging and developing contracts, a hierarchical `ActionResult` object is added to `TxReceipt`, which contains information about execution errors, used gas, resulting data, as well as information about all the results of the created promises.
