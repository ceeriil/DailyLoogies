import { LoogieCreated, Transfer, LoogieBurned } from "../types/Loogie/Loogie";
import { Loogie, TransferEvent } from "../types/schema";
import { getOrCreateAccount } from "../util/helper";
import { log } from "@graphprotocol/graph-ts";
import { BIGINT_ONE, BIGINT_ZERO, ZERO_ADDRESS } from "../util/constants";

export function handleCreatedLoogie(event: LoogieCreated): void {
  let loogieId = event.params.tokenId.toString();
  let loogie = new Loogie(loogieId);
  loogie.chubbiness = event.params.chubbiness;
  loogie.color = event.params.color;
  loogie.mouthLength = event.params.mouthLength;
  loogie.owner = getOrCreateAccount(event.params.minter.toHexString()).id;

  loogie.save();
}

export function handleBurnedLoogie(event: LoogieBurned): void {
  let loogieId = event.params.tokenId.toString();
  let loogie = Loogie.load(loogieId);
  if (loogie == null) {
    log.error("[handleBurnedLoogie] Loogie #{} not found. Hash: {}", [
      loogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }
  loogie.owner = getOrCreateAccount(ZERO_ADDRESS).id;
}
export function handleTransfer(event: Transfer): void {
  // Get the sender and receiver accounts
  let fromAccount = getOrCreateAccount(event.params.from.toHexString());
  let toAccount = getOrCreateAccount(event.params.to.toHexString());
  // Get the transferred Loogie ID
  let transferredLoogieId = event.params.tokenId.toString();
  // Create a new TransferEvent entity
  let transferEvent = new TransferEvent(
    event.transaction.hash.toHexString() + "_" + transferredLoogieId
  );
  transferEvent.blockNumber = event.block.number;
  transferEvent.blockTimestamp = event.block.timestamp;
  transferEvent.loogie = transferredLoogieId;
  transferEvent.previousHolder = fromAccount.id;
  transferEvent.newHolder = toAccount.id;
  transferEvent.save();

  if (fromAccount.tokenBalance < BIGINT_ZERO) {
    log.error("Negative balance on holder {} with balance {}", [
      fromAccount.id,
      fromAccount.tokenBalance.toString(),
    ]);
  }

  fromAccount.tokenBalance = fromAccount.tokenBalance.minus(BIGINT_ONE);
  toAccount.tokenBalance = toAccount.tokenBalance.plus(BIGINT_ONE);
  let loogie = Loogie.load(transferredLoogieId);
  if (loogie == null) {
    log.error("[handleTranfer] Loogie #{} not found. Hash: {}", [
      transferredLoogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }
  loogie.owner = toAccount.id;
  loogie.save();
}
