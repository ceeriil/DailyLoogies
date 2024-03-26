import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../Modal";
import { AuctionBidLists } from "./AuctionBidLists";
import { AuctionDetails } from "./AuctionDetails";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import LoogieComponent from "~~/components/loogies/Loogie";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const Auction = () => {
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

  const LOOGIE_GRAPHQL = `
  {
    loogie(id:1){
      id,
      chubbiness,
      color
      mouthLength
    },
        auction(id:1){
          amount
        }
        bids(first: 6, orderBy: amount, orderDirection: desc) {
        id,amount, bidder {
          id
        }, auction {
          endTime,
          startTime,
          id
          amount
        }   
      }
    }
`;

  const LOOGIE_GQL = gql(LOOGIE_GRAPHQL);
  const { data: loogiesData } = useQuery(LOOGIE_GQL, { pollInterval: 1000 });

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

        {/*         <AuctionBidLists bids={sampleBidData} />
         */}
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
          {loogiesData && loogiesData.loogie && <AuctionBidLists bids={loogiesData.bids} />}
        </Modal>
      )}
    </div>
  );
};
