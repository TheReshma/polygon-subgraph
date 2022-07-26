import {
  AddTag,
  DeleteTag,
  OwnershipTransferred,
} from "../generated/Tags/Tags";
import { Address, Tag, TagCount } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

// type SentMap = {
//   [key: string]: boolean;
// };

// const sentMap: SentMap = {
//   trust: true,
//   fraud: false,
//   spam: false,
// };

const validTags = ["friend", "trust", "smrtCntct", "fraud", "spam"];
const positiveSentiment = ["friend", "trust"];
const negativeSentiment = ["fraud", "spam"];

function setTagCount(
  address: Address,
  tag: Tag,
  now: string,
  op: string
): TagCount {
  let id = address.address + "-" + tag.name;
  let tagCount = TagCount.load(id);

  if (!tagCount) {
    tagCount = new TagCount(id);
    tagCount.address = address.address;
    tagCount.tag = tag.name;
    tagCount.count = 0;
    tagCount.created = now;
  }

  if (op == "add") {
    tagCount.count = tagCount.count + 1;
  } else if (op == "delete") {
    tagCount.count = tagCount.count - 1;
  }

  if (tagCount.count < 0) {
    tagCount.count = 0;
  }

  tagCount.updated = now;
  tagCount.save();

  return tagCount as TagCount;
}

function getTag(tag: string): Tag {
  let tagEntity = Tag.load(tag);
  if (!tagEntity) {
    tagEntity = new Tag(tag);
    tagEntity.name = tag;
    // tagEntity.sentiment = sentMap[tag]

    if (positiveSentiment.includes(tag)) {
      tagEntity.sentiment = "positive";
    } else if (negativeSentiment.includes(tag)) {
      tagEntity.sentiment = "negative";
    } else {
      tagEntity.sentiment = "neutral";
    }
  }
  tagEntity.save();
  return tagEntity as Tag;
}

function getAddress(address: string, now: string): Address {
  let addressEntity = Address.load(address);

  if (!addressEntity) {
    addressEntity = new Address(address);
    addressEntity.address = address;
    addressEntity.created = now;
    addressEntity.save();
  }
  return addressEntity as Address;
}

function tagging(tag: string, person: string, now: string, op: string): void {
  let tagEntity = getTag(tag);

  let addressEntity = getAddress(person, now);

  // set tag count
  setTagCount(addressEntity, tagEntity, now, op);
}

export function handleAddTag(event: AddTag): void {
  let tag = event.params.tag;
  if (validTags.includes(tag)) {
    let person = event.params.person.toHexString().toLowerCase();
    const now = event.block.timestamp.toHexString();

    tagging(tag, person, now, "add");
  }
}

export function handleDeleteTag(event: DeleteTag): void {
  let tag = event.params.tag;
  if (validTags.includes(tag)) {
    let person = event.params.person.toHexString().toLowerCase();
    const now = event.block.timestamp.toHexString();

    tagging(tag, person, now, "delete");
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

// Entities can be loaded from the store using a string ID; this ID
// needs to be unique across all entities of the same type
// let entity = ExampleEntity.load(event.transaction.from.toHex())

// Entities only exist after they have been saved to the store;
// `null` checks allow to create entities on demand
// Entity fields can be set using simple assignments
// Entities can be written to the store with `.save()`
// Note: If a handler doesn't require existing field values, it is faster
// _not_ to load the entity from the store. Instead, create it fresh with
// `new Entity(...)`, set the fields that should be updated and save the
// entity back to the store. Fields that were not set or unset remain
// unchanged, allowing for partial updates to be applied.

// It is also possible to access smart contracts from mappings. For
// example, the contract that has emitted the event can be connected to
// with:
//
// let contract = Contract.bind(event.address)
//
// The following functions can then be called on this contract to access
// state variables and other data:
//
// - contract.owner(...)
