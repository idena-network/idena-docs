---
hide_title: true
title: idena-sdk-as
sidebar_label: Idena-sdk-as
---

# Idena-sdk-as

Idena-sdk-as provides convenient tools for developing the [Idena smart contracts](./smart-contracts) in the AssemblyScript language. AssemblyScript code of your contract can be easily compiled into WebAssembly (see [Quick start](./quick-start)) and run in Wasmer runtime.

_Note: idena-sdk-as is a fork from [near-sdk-as](https://github.com/near/near-sdk-as/)_

Idena-sdk-as Github repo: https://github.com/idena-network/idena-sdk-as

## Bindgen

Since WebAssembly supports only a limited set of types for arguments, Bindgen is used to transform of the code of a contract into the Wasmer-compatible code. Bindgen automatically transforms all user's classes and their methods by generating encode/decode json methods. For the contract class in `index.ts` wrapper methods are generated. In addition the Wasmer-compatible code for saving the contract state is generated.

If you want Bindgen to ignore some of your classes you can use the `@idenaBindgenIgnore` decorator for that.

### Contract state

The state of the main contract class (in `index.ts` file) is represented in a form of `json`. This `json` representation of the main contract class is saved automatically to the Idena blockchain state after any public method call.

If you need the state not to be saved (e.g. to reduce gas) you can use `@view` decorator for the method.

_Note that you can fetch the state of the main contract class using the `STATE` key_

### Marshaling

Bindgen automatically performs encoding/decoding for the following types and objects to/from bytes:

- `numeric`: `u8-u64`, `i8-i64`, `u128`, `u256`
- `Balance` object - a built-in type for working with balances, including IDNA, implemented based on `u128`
- `Uint8Array` - array of bytes
- `string`
- objects that have encode/decode json methods

### Decorators

- `@idenaBindgen`: force classes transformation (may be useful for library developers who need object marshaling, since library files are not automatically transformed)
- `@idenaBindgenIgnore`: ignore transformation for the entire class or specific method
- `@view`: do not save STATE after the method is called (for example for read-only methods)
- `@privateMethod`: disallow method for public calling (can be only called by other contract methods)

### Collection

`PersistentMap`<`K`, `V`>: key-value map. Any type that can be marshaled (see [Marshaling](#marshaling)) into bytes can be used as a key and value
