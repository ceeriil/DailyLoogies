import React, { useState } from "react";
import Image from "next/image";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { Modal } from "../Modal";
import { AuctionBidLists } from "./AuctionBidLists";
import { AuctionBidPreview } from "./AuctionBidPreview";
import { AuctionDetails } from "./AuctionDetails";
import { ethers } from "ethers";
import LoogieComponent from "~~/components/loogies/Loogie";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type AuctionProps = {
  loogiesData: any;
  loogieId: number;
  auctionData?: any;
};

export const Auction: React.FC<AuctionProps> = ({ loogiesData, loogieId }) => {
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
    args: [BigInt(loogieId || 0)],
    value: currentBid ? ethers.parseEther(currentBid) : undefined,
  });

  console.log(loogiesData);

  const placeBid = (amount: string) => {
    setCurrentBid(amount);
    bid();
  };

  console.log(loogiesData);

  const LoogieAuctionDetails =
    loogiesData && loogiesData.loogie ? (
      <AuctionDetails
        name={loogiesData && loogiesData.loogie?.id}
        currentBid={loogiesData && loogiesData.auction?.amount}
        auction={loogiesData.auction}
        winnerAdddress={loogiesData.auction && loogiesData.auction?.bidder?.id}
      />
    ) : (
      <LoadingSkeleton />
    );

  return (
    <div className="container mx-auto grid lg:grid-cols-2 mt-4 relative px-4 md:px-0">
      <div className="absolute w-[25%] top-[-25rem] lg:right-0 right-[25%]">
        <Image src={"/loggiesPicker.svg"} alt="loogie picker" width={100} height={100} />
      </div>

      <div className="lg:order-1 order-2">
        {LoogieAuctionDetails}

        {loogiesData && loogiesData.auction && loogiesData.auction?.settled ? (
          ""
        ) : (
          <div className="mt-6 mb-4 flex">
            <EtherInput onChange={amount => setCurrentBid(amount)} value={currentBid} disabled={false} />
            <button
              className="btn btn-primary text-white rounded-none md:px-16 px-4"
              onClick={() => placeBid(currentBid)}
            >
              Place Bid
            </button>
          </div>
        )}

        {/* Preview bids */}
        {loogiesData && loogiesData.loogie && (
          <AuctionBidPreview bids={loogiesData.auction?.bids} handleOpenModal={handleOpenModal} />
        )}
      </div>

      <div className="flex items-center justify-center lg:order-2 order-1 overflow-hidden">
        <div className="ml-[0rem] mt-32 md:ml-[5rem]">
          {loogiesData && loogiesData.loogie && <LoogieComponent loogiesData={loogiesData.loogie} />}
        </div>
      </div>

      {/* Modal to Show All Bids */}
      {showModal && (
        <Modal onClose={handleCloseModal} title={"Bid for Loogies"}>
          {loogiesData && loogiesData.loogie && <AuctionBidLists bids={loogiesData.auction?.bids} />}
        </Modal>
      )}
    </div>
  );
};
