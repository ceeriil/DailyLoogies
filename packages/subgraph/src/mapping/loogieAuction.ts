import { BigInt } from "@graphprotocol/graph-ts";
import { Loogie, Bid, Auction } from "../types/schema";
import { getOrCreateAccount } from "../util/helper";
import {
  AuctionBid,
  AuctionCreated,
  AuctionExtended,
  AuctionSettled,
} from "../types/LoogieAuction/LoogieAuction";
import { log } from "@graphprotocol/graph-ts";
import { ZERO_ADDRESS } from "../util/constants";

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
  auction.bidder = getOrCreateAccount(ZERO_ADDRESS).id;
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
