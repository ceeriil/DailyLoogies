import React, { useState } from "react";
import { Modal } from "../Modal";
import { AuctionBidLists } from "./AuctionBidLists";
import { AuctionBids } from "./AuctionBids";
import { AuctionDetails } from "./AuctionDetails";
import LoogieComponent from "~~/components/loogies";
import { EtherInput } from "~~/components/scaffold-eth";

export const Auction = () => {
  const [showModal, setShowModal] = useState(false);
  const [ethAmount, SetEthAmount] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="container mx-auto grid grid-cols-2 mt-6">
      <div>
        <AuctionDetails name={"Loggies #1234"} />

        <div className="mt-6 mb-4 flex">
          <EtherInput onChange={amount => SetEthAmount(amount)} value={ethAmount} disabled={false} />
          <button className="btn btn-primary text-white rounded-none px-16">Place Bid</button>
        </div>

        <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.4} />
        <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.04} />

        <button className="cursor-pointer" onClick={handleOpenModal}>
          See More
        </button>
      </div>

      <div className="flex items-center justify-center">
        <LoogieComponent />
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal} title={"Bid for Loogies"}>
          <AuctionBidLists />
        </Modal>
      )}
    </div>
  );
};
