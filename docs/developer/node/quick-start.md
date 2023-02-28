---
hide_title: true
title: Quick start
sidebar_label: Quick start
---

# Quick start

Let’s make a simple custom contract. First, create npm project and install the dependencies:

```
npm init
yarn add assemblyscript -D
yarn add jest -D

npx asinit .

yarn add idena-sdk-as@0.0.28
```

After project initialization, you will have the following project folder structure:

![image](/img/developer/quick-start-folders.png)

- `assembly`: folder with contract source code
- `build`: folder for compiled files
- `node_modules`: dependencies
- `tests`: folder with tests
- `asconfig.json`: config file for the asc compiler

Next, update `asconfig.json` file so that the asc compiler uses the transformation of the contract code with `idena-sdk-bindgen`. For this you need to add the line:

```
"extends": "idena-sdk-as/asconfig.json"
```

![image](/img/developer/quick-start-asconfig.png)

You are ready to write the contract code using [`idena-sdk-as`](./idena-sdk-as). Exported class in the `assembly/index.ts` is the entry point for executing the contract.

As an example, see the code of [hello-world](https://github.com/idena-network/idena-contract-examples/blob/master/hello-world/assembly/index.ts) contract.

## Building

To build the contracts install [asbuild](https://github.com/AssemblyScript/asbuild):

```
yarn asb
```

As a result, a file will be created:

```
/build/release/<your-project-name>.wasm
```

## Testing

For testing, we recommend using [jest](https://jestjs.io/).
Run the command to install it:

```
yarn add jest -D
```

Update the `"test"` value in your project `package.json` file in the `scripts` section as follows:

```
"test":"jest"
```

![image](/img/developer/quick-start-package-json.png)

In the tests folder, create the `index.test.js` file.

See example of tests for [hello-world](https://github.com/idena-network/idena-contract-examples/blob/master/hello-world/tests/index.test.js) contract.

To execute the contract code and run the test, you need to install and run Idena node emulator [idena-contract-runner](https://github.com/idena-network/idena-contract-runner). You can build it yourself or [download](https://github.com/idena-network/idena-contract-runner/releases) the executable file.

`idena-sdk-as` contains additional classes and methods for testing, see [idena-sdk-tests](https://github.com/idena-network/idena-sdk-as/tree/master/sdk-tests).

To run tests, use the command:

```
yarn test
```

## Deploying

To deploy your contract you can use [rpc.idena.io](https://rpc.idena.io).

- Connect to the Idena node
- Enter your coinbase address
- Select the compiled `.wasm` contract file
- Enter unique `nonce`
- Specify [`args`](./smart-contracts-methods#args) for the contract constructor if needed
- You can call the `contract_estimateDeploy` method to calcaulte [`maxfee`](./smart-contracts#maxfee-parameter) parameter

![image](/img/developer/quick-start-rpc-deploy.png)

```json
{
  "method": "contract_Deploy",
  "params": [
    {
      "from": "0x6899...",
      "code": "0x0061736d01...",
      "nonce": "0x01",
      "args": [],
      "maxFee": 2
    }
  ],
  "id": 1,
  "key": "..."
}
```

**Response example:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xdeb3..."
}
```

As a `result` you will get a hash of [`DeployContractTx`](./smart-contracts#1-deploycontracttx) transaction. To get the address of the deployed contract, call [`bcn_txReceipt`](./smart-contracts-methods#bcn_txreceipt-method) method for this transaction hash.
