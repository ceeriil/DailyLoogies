import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../Modal";
import { AuctionBidLists } from "./AuctionBidLists";
import { AuctionDetails } from "./AuctionDetails";
import { ethers } from "ethers";
import LoogieComponent from "~~/components/loogies/Loogie";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type AuctionProps = {
  loogiesData: any;
};

export const Auction: React.FC<AuctionProps> = ({ loogiesData }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentBid, setCurrentBid] = useState<string>("0.00");

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
    value: currentBid ? ethers.parseEther(currentBid) : undefined,
  });

  const placeBid = (amount: string) => {
    setCurrentBid(amount);
    bid();
  };

  return (
    <div className="container mx-auto grid grid-cols-2 mt-4 relative">
      <div className="absolute w-[25%] top-[-25rem] right-0">
        <Image src={"/loggiesPicker.svg"} alt="loogie picker" width={100} height={100} />
      </div>

      <div className="">
        <AuctionDetails
          name={loogiesData && loogiesData.loogie?.id}
          currentBid={loogiesData && loogiesData.auction?.amount}
          deadline={loogiesData && loogiesData.auction?.endTime}
        />

        <div className="mt-6 mb-4 flex">
          <EtherInput onChange={amount => setCurrentBid(amount)} value={currentBid} disabled={false} />
          <button className="btn btn-primary text-white rounded-none px-16" onClick={() => placeBid(currentBid)}>
            Place Bid
          </button>
        </div>

        {/* Button to show all bids  */}
        <button className="cursor-pointer" onClick={handleOpenModal}>
          See More
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="ml-[6rem]">
          {loogiesData && loogiesData.loogie && <LoogieComponent loogiesData={loogiesData.loogie} />}
        </div>
      </div>

      {/* Modal to Show All Bids */}
      {showModal && (
        <Modal onClose={handleCloseModal} title={"Bid for Loogies"}>
          {loogiesData && loogiesData.loogie && <AuctionBidLists bids={loogiesData.bids} />}
        </Modal>
      )}
    </div>
  );
};
