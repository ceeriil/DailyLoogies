import React from "react";
import { AuctionBids } from "./AuctionBids";
import { formatEther } from "@ethersproject/units";

type Bid = {
  bidder: {
    id: string;
  };
  amount: number;
};

type AuctionBidListsProps = {
  bids: Bid[];
};

export const AuctionBidLists: React.FC<AuctionBidListsProps> = ({ bids }) => {
  return (
    <>
      {bids.map((bid, index) => (
        <AuctionBids key={index} address={bid?.bidder?.id} amount={formatEther(bid?.amount)} />
      ))}
    </>
  );
};
