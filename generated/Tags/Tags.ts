// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddTag extends ethereum.Event {
  get params(): AddTag__Params {
    return new AddTag__Params(this);
  }
}

export class AddTag__Params {
  _event: AddTag;

  constructor(event: AddTag) {
    this._event = event;
  }

  get person(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tag(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class DeleteTag extends ethereum.Event {
  get params(): DeleteTag__Params {
    return new DeleteTag__Params(this);
  }
}

export class DeleteTag__Params {
  _event: DeleteTag;

  constructor(event: DeleteTag) {
    this._event = event;
  }

  get person(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tag(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Tags extends ethereum.SmartContract {
  static bind(address: Address): Tags {
    return new Tags("Tags", address);
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class AddTagCall extends ethereum.Call {
  get inputs(): AddTagCall__Inputs {
    return new AddTagCall__Inputs(this);
  }

  get outputs(): AddTagCall__Outputs {
    return new AddTagCall__Outputs(this);
  }
}

export class AddTagCall__Inputs {
  _call: AddTagCall;

  constructor(call: AddTagCall) {
    this._call = call;
  }

  get _person(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tag(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AddTagCall__Outputs {
  _call: AddTagCall;

  constructor(call: AddTagCall) {
    this._call = call;
  }
}

export class DeleteTagCall extends ethereum.Call {
  get inputs(): DeleteTagCall__Inputs {
    return new DeleteTagCall__Inputs(this);
  }

  get outputs(): DeleteTagCall__Outputs {
    return new DeleteTagCall__Outputs(this);
  }
}

export class DeleteTagCall__Inputs {
  _call: DeleteTagCall;

  constructor(call: DeleteTagCall) {
    this._call = call;
  }

  get _person(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tag(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class DeleteTagCall__Outputs {
  _call: DeleteTagCall;

  constructor(call: DeleteTagCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}