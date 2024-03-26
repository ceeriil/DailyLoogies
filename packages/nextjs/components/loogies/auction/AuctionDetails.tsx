import React from "react";
import { Countdown } from "./Countdown";
import { formatEther } from "@ethersproject/units";

export const AuctionDetails = ({ name, currentBid, auction }: { name: string; currentBid: number; auction: any }) => {
  const formattedEndDate = (endDate: string | number) => {
    if (endDate) {
      const unixTimeInMilliseconds = Number(endDate) * 1000;
      const auctionEndDate = new Date(unixTimeInMilliseconds);
      return auctionEndDate.toISOString();
    } else {
      return 0;
    }
  };

  console.log(auction, "hi");

  return (
    <div>
      <h1 className="font-bold text-[3.5rem] mb-6">Loogie #{name}</h1>
      <p>
        Only 3728 Optimistic Loogies available on a price curve increasing 0.2% with each new mint. Double the supply of
        the Original Ethereum Mainnet Loogies
      </p>
      <p> </p>
      <div className="flex gap-x-16">
        <div className="mt-4">
          <h2>Current Bid</h2>
          {currentBid !== undefined ? (
            <p className="text-3xl font-bold">Ξ {formatEther(auction.amount)}</p>
          ) : (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>
        <div className="mt-4 border-l pl-16">
          <h2>Auction Ends At</h2>
          <Countdown deadline={formattedEndDate(auction?.endTime)} />
        </div>
      </div>
    </div>
  );
};
