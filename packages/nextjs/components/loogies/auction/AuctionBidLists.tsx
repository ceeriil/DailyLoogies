import React from "react";
import { AuctionBids } from "./AuctionBids";

export const AuctionBidLists = () => {
  return (
    <>
      <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.4} />
      <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.04} />
    </>
  );
};
