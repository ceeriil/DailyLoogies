import React from "react";
import { Address } from "~~/components/scaffold-eth";

export const AuctionBids = ({ address, amount }: { address: string; amount: number }) => {
  return (
    <div className="flex justify-between border-b">
      <Address address={address} size="lg" />
      <p className="font-bold text-lg">{amount} Ξ</p>
    </div>
  );
};
