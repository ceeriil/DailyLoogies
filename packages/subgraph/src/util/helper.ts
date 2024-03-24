import {
  Address,
  BigInt,
  Bytes,
  crypto,
  ethereum,
} from "@graphprotocol/graph-ts";
import { Account } from "../types/schema";
import { ZERO_ADDRESS, BIGINT_ZERO, BIGINT_ONE } from "./constants";

export function getOrCreateAccount(
  id: string,
  createIfNotFound: boolean = true,
  save: boolean = true
): Account {
  let tokenHolder = Account.load(id);
  if (tokenHolder == null && createIfNotFound) {
    tokenHolder = new Account(id);
    tokenHolder.tokenBalance = BIGINT_ZERO;
    tokenHolder.loogies = [];
    if (save) {
      tokenHolder.save();
    }
  }
  return tokenHolder as Account;
}
