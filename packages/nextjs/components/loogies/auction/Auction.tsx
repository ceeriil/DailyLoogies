import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../Modal";
import { AuctionBidLists } from "./AuctionBidLists";
import { AuctionBids } from "./AuctionBids";
import { AuctionDetails } from "./AuctionDetails";
import LoogieComponent from "~~/components/loogies";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Auction = () => {
  const [showModal, setShowModal] = useState(false);
  const [ethAmount, SetEthAmount] = useState("");
  const [currentBid] = useState(0);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const { writeAsync: bid } = useScaffoldContractWrite({
    contractName: "LoogieAuction",
    functionName: "createBid",
    args: [BigInt(1)],
    value: BigInt(20000000000000),
  });

  return (
    <div className="container mx-auto grid grid-cols-2 mt-4 relative">
      <div className="absolute w-[25%] top-[-25rem] right-0">
        <Image src={"/loggiesPicker.svg"} alt="loogie picker" width={100} height={100} />
      </div>

      <div className="border-2 px-4 border-black py-4">
        <AuctionDetails name={"Loggies #1234"} currentBid={currentBid} />

        <div className="mt-6 mb-4 flex">
          <EtherInput onChange={amount => SetEthAmount(amount)} value={ethAmount} disabled={false} />
          <button className="btn btn-primary text-white rounded-none px-16" onClick={() => bid()}>
            Place Bid
          </button>
        </div>

        <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.4} />
        <AuctionBids address="0x35b5Fd4102e30540A3A3b388A4556D8EeAF12DC6" amount={0.04} />

        <button className="cursor-pointer" onClick={handleOpenModal}>
          See More
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="ml-[6rem]">
          <LoogieComponent />
        </div>
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal} title={"Bid for Loogies"}>
          <AuctionBidLists />
        </Modal>
      )}
    </div>
  );
};
