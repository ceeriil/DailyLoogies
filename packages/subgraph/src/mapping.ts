import { BigInt, Address } from "@graphprotocol/graph-ts";
import { LoogieCreated, Transfer } from "./types/Loogie/Loogie";
import { Loogie, TransferEvent, Bid, Auction, Account } from "./types/schema";
import { getOrCreateAccount } from "./util/helper";
import {
  AuctionBid,
  AuctionCreated,
  AuctionExtended,
  AuctionSettled,
} from "./types/LoogieAuction/LoogieAuction";
import { log } from "@graphprotocol/graph-ts";

export function handleCreatedLoogie(event: LoogieCreated): void {
  let loogieId = event.params.tokenId.toString();

  let loogie = Loogie.load(loogieId);
  if (loogie == null) {
    log.critical("[handleCreatedLoogie] Loogie #{} not found. Hash: {}", [
      loogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }
  loogie.chubbiness = event.params.chubbiness;
  loogie.color = event.params.color;
  loogie.mouthLength = event.params.mouthLength;
  loogie.save();
}
export function handleTransfer(event: Transfer): void {
  // Get the sender and receiver accounts
  let fromAccount = getOrCreateAccount(event.params.from.toHexString());
  let toAccount = getOrCreateAccount(event.params.to.toHexString());

  // Get the transferred Loogie ID
  let transferredLoogieId = event.params.tokenId.toString();

  // Load the Loogie entity
  let loogie = Loogie.load(transferredLoogieId);

  // Check if the Loogie exists
  if (loogie == null) {
    log.error("[handleTransfer] Loogie #{} not found. Hash: {}", [
      transferredLoogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  // Update ownership status
  loogie.owner = toAccount.id;

  // Save changes to the Loogie entity
  loogie.save();

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
}

export function handleAuctionCreated(event: AuctionCreated): void {
  const loogieId = event.params.loogieId.toString();

  let loogie = Loogie.load(loogieId);
  if (loogie == null) {
    log.error("[handleAuctionCreated] Loogie #{} not found. Hash: {}", [
      loogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  let auction = new Auction(loogieId);
  auction.loogie = loogie.id;
  auction.amount = BigInt.fromI32(0);
  auction.startTime = event.params.startTime;
  auction.endTime = event.params.endTime;
  auction.settled = false;
  auction.save();
}

export function handleAuctionBid(event: AuctionBid): void {
  let loogieId = event.params.loogieId.toString();
  let bidderAddress = event.params.sender.toHex();

  let bidder = getOrCreateAccount(bidderAddress);

  let auction = Auction.load(loogieId);
  if (auction == null) {
    log.error("[handleAuctionBid] Auction not found for Loogie #{}. Hash: {}", [
      loogieId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.amount = event.params.value;
  auction.bidder = bidder.id;
  auction.save();

  // Save Bid
  let bid = new Bid(event.transaction.hash.toHex());
  bid.bidder = bidder.id;
  bid.amount = auction.amount;
  bid.loogie = auction.loogie;
  bid.txIndex = event.transaction.index;
  bid.blockNumber = event.block.number;
  bid.blockTimestamp = event.block.timestamp;
  bid.auction = auction.id;
  bid.save();
}

export function handleAuctionExtended(event: AuctionExtended): void {
  let loogieId = event.params.loogieId.toString();

  let auction = Auction.load(loogieId);
  if (auction == null) {
    log.error(
      "[handleAuctionExtended] Auction not found for Loogie #{}. Hash: {}",
      [loogieId, event.transaction.hash.toHex()]
    );
    return;
  }

  auction.endTime = event.params.endTime;
  auction.save();
}

export function handleAuctionSettled(event: AuctionSettled): void {
  let loogieId = event.params.loogieId.toString();

  let auction = Auction.load(loogieId);
  if (auction == null) {
    log.error(
      "[handleAuctionSettled] Auction not found for Noun #{}. Hash: {}",
      [loogieId, event.transaction.hash.toHex()]
    );
    return;
  }

  auction.settled = true;
  auction.save();
}
