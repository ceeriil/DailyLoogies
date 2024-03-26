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
  handleOpenModal: () => void;
};

export const AuctionBidPreview: React.FC<AuctionBidListsProps> = ({ bids, handleOpenModal }) => {
  return (
    <div className="mb-3 flex flex-col items-center">
      <div className="w-full">
        {bids.length > 0 ? (
          bids
            .slice(0, 2)
            .map((bid, index) => (
              <AuctionBids key={index} address={bid?.bidder?.id} amount={formatEther(bid?.amount)} />
            ))
        ) : (
          <div className="border w-full border-black py-4 px-2 text-center bg-base-200">
            No bid has been made for this Loogie yet.
          </div>
        )}
      </div>

      {/* Button to show all bids */}
      <button className="cursor-pointer mt-3 text-gray-500" onClick={handleOpenModal}>
        View all Bids
      </button>
    </div>
  );
};
