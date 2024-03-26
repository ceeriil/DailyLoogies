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
      {bids.length > 0 ? (
        bids.map((bid, index) => (
          <AuctionBids key={index} address={bid?.bidder?.id} amount={formatEther(bid?.amount)} />
        ))
      ) : (
        <div className="border w-full border-black py-4 px-2 text-center bg-base-200">
          No bid have been made for this Loogie Yet
        </div>
      )}
    </>
  );
};
