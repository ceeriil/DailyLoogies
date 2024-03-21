import React from "react";
import { Countdown } from "./Countdown";

export const AuctionDetails = ({ name }: { name: string }) => {
  return (
    <div>
      <h1 className="font-bold text-[4rem] mb-10">{name}</h1>
      <p>
        Only 3728 Optimistic Loogies available on a price curve increasing 0.2% with each new mint. Double the supply of
        the Original Ethereum Mainnet Loogies
      </p>
      <div className="flex gap-x-16">
        <div className="mt-10">
          <h2>Current Bid</h2>
          <p className="text-4xl font-bold">Ξ 0.00</p>
        </div>
        <div className="mt-10 border-l pl-16">
          <h2>Auction Ends At</h2>
          <Countdown deadline="2024-07-10T09:01:00.000Z" />
        </div>
      </div>
    </div>
  );
};
