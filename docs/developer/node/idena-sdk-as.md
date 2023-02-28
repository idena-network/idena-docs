---
hide_title: true
title: idena-sdk-as
sidebar_label: Idena-sdk-as
---

# Idena-sdk-as

Idena-sdk-as provides convenient tools for developing the [Idena smart contracts](./smart-contracts) in the AssemblyScript language. AssemblyScript code of your contract can be easily compiled into WebAssembly (see [Quick start](./quick-start)) and run in Wasmer runtime.

> _Note: idena-sdk-as is a fork from [near-sdk-as](https://github.com/near/near-sdk-as/)_

Idena-sdk-as Github repo: https://github.com/idena-network/idena-sdk-as

## Bindgen

Since WebAssembly supports only a limited set of types for arguments, Bindgen is used to transform of the code of a contract into the Wasmer-compatible code. Bindgen automatically transforms all user's classes and their methods by generating encode/decode json methods. For the contract class in `index.ts` wrapper methods are generated. In addition the Wasmer-compatible code for saving the contract state is generated.

If you want Bindgen to ignore some of your classes you can use the `@idenaBindgenIgnore` decorator for that.

### Contract state

The state of the main contract class (in `index.ts` file) is represented in a form of `json`. This `json` representation of the main contract class is saved automatically to the Idena blockchain state after any public method call.

If you need the state not to be saved (e.g. to reduce gas) you can use `@view` decorator for the method.

> _Note that you can fetch the state of the main contract class using the `STATE` key_

### Transformation example

#### Contract code before transformation

```js
export class HelloWorldContract {
  //stores value as part of 'STATE' key
  classField: string;

  constructor() {
    this.classField = 'hello';
  }

  hello(): void {
    Host.emitEvent('Hello world!', []);
  }
}
```

#### Contract code after transformation

```js
class HelloWorldContract {
  classField: string = defaultValue<string>();
  constructor() {
    this.classField = "hello";
  }
  hello(): void {
    Host.emitEvent("Hello world!", []);
  }

  decode<_V = Uint8Array>(buf: _V): HelloWorldContract {
    let json: JSON.Obj;
    if (buf instanceof Uint8Array) {
      json = JSON.parse(buf);
    } else {
      assert(buf instanceof JSON.Obj, "argument must be Uint8Array or Json Object");
      json = <JSON.Obj> buf;
    }
    return this._decode(json);
  }

  static decode(buf: Uint8Array): HelloWorldContract {
    return decode<HelloWorldContract>(buf);
  }

  private _decode(obj: JSON.Obj): HelloWorldContract {
    this.classField = obj.has("classField") ? decode<string, JSON.Obj>(obj, "classField"): defaultValue<string>();
    return this;
  }

  _encode(name: string | null = "", _encoder: JSONEncoder | null = null): JSONEncoder {
    let encoder = _encoder == null ? new JSONEncoder() : _encoder;
    encoder.pushObject(name);
    encode<string, JSONEncoder>(this.classField, "classField", encoder);
    encoder.popObject();
    return encoder;
  }
  encode(): Uint8Array {
    return this._encode().serialize();
  }

  serialize(): Uint8Array {
    return this.encode();
  }

  toJSON(): string {
    return this._encode().toString();
  }
}

@exportAs("deploy")
export function __deploy(): void {
  let __contract: HelloWorldContract;
  if (__checkState()) {
    __contract = __getState<HelloWorldContract>();
  }
  assert(isNull(__contract), "contract is already initialized");
  __contract = new HelloWorldContract();
  __setState(__contract);
}

export function hello(): void {
  let __contract: HelloWorldContract;
  if (__checkState()) {
    __contract = __getState<HelloWorldContract>();
  }
  assert(!isNull(__contract), "contract is not initialized");
  __contract.hello();
}
```

If you need to get the transformed code for debugging purposes, then add the following line to the very beginning of the transformed file:

```js
//@idenafile out
```

The transformed code will be printed to the console on `yarn asb` command.

### Marshaling

If needed you can use the following global functions for encoding/decoding arguments to/from bytes:

```js
function obj_to_bytes<T>(val: T) : Uint8Array //converts type T to Uint8Array
```

```js
function bytes_to_obj<T>(data : Bytes) : T //Converts array of bytes to type T
```

The following types `T` are supported:

- `u8-u64`, `i8-i64`, `u128`, `u256`: numeric types
- `Balance` object: a built-in type for working with balances, including IDNA, implemented based on `u128`
- `Uint8Array`: array of bytes
- `string`: strings
- [objects](https://github.com/idena-network/idena-sdk-as/blob/master/bindgen/assembly/index.ts#L60) that have encode/decode methods
- arrays of objects that have encode/decode methods
- any other objects that have been [decorated](#decorators) with `@idenaBindgen`

> _Note: You can find the implementation of convertions [here](https://github.com/idena-network/idena-sdk-as/blob/master/bindgen/assembly/index.ts#L503)_

### Decorators

- `@idenaBindgen`: force classes transformation (may be useful for library developers who need object marshaling, since library files are not automatically transformed)
- `@idenaBindgenIgnore`: ignore transformation for the entire class or specific method
- `@view`: do not save STATE after the method is called (for example for read-only methods)
- `@privateMethod`: disallow method for public calling (can be only called by other contract methods)

## Data structures

Idena-sdk-as exposes a series of structures (`Vector`, `PersistentMap`, `KeyValue`) to simplify storing data in an efficient way.

- `PersistentMap`<`K`, `V`>: key-value map. Any type that can be marshaled (see [Marshaling](#marshaling)) into bytes can be used as a key and value
- `Vector`<`T`>: array that allows you to store the value by index
- `KeyValue`<`K`,`V`>: saves a single value for a given key

> _Note that all structures need to be initialized using a unique prefix, which will be used to identify the structure's keys in the serialized state. The data is not loaded during the contract instantiation (lazy loading). The data is fetched from the state once the value is read on a particular key._

## Environment

Every method execution has an environment associated with information such as:

1. Who called the method
2. How much money is attached to the call
3. How many computational resources are available
4. The current block header
5. Helper functions for hash, ecrecover, for example

To access the environment idena-sdk-as provides wrappers [Context](https://github.com/idena-network/idena-sdk-as/blob/master/sdk-core/assembly/context.ts) and [Host](https://github.com/idena-network/idena-sdk-as/blob/master/sdk-core/assembly/host.ts).

> _Note: Complete list of environment methods can be found [here](https://github.com/idena-network/idena-sdk-as/blob/master/sdk-core/assembly/env.ts)_
