import React from "react";
import { BigNumberish } from "ethers";
import { Address } from "~~/components/scaffold-eth";

export const AuctionBids = ({ address, amount }: { address: string; amount: BigNumberish }) => {
  console.log(address, amount);
  return (
    <div className="flex justify-between border-b bg-base-200 px-4">
      <Address address={address} size="lg" />
      <p className="font-bold text-lg">{amount.toString()} Ξ</p>
    </div>
  );
};
