import React from "react";
import { Countdown } from "./Countdown";

export const AuctionDetails = ({ name, currentBid }: { name: string; currentBid: number }) => {
  return (
    <div>
      <h1 className="font-bold text-[3.5rem] mb-6">{name}</h1>
      <p>
        Only 3728 Optimistic Loogies available on a price curve increasing 0.2% with each new mint. Double the supply of
        the Original Ethereum Mainnet Loogies
      </p>
      <div className="flex gap-x-16">
        <div className="mt-4">
          <h2>Current Bid</h2>
          <p className="text-3xl font-bold">Ξ {currentBid.toFixed(3)}</p>
        </div>
        <div className="mt-4 border-l pl-16">
          <h2>Auction Ends At</h2>
          <Countdown deadline="2024-07-10T09:01:00.000Z" />
        </div>
      </div>
    </div>
  );
};
