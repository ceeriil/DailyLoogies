import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuctionNavigation } from "./AuctionNavigation";
import { Countdown } from "./Countdown";
import { gql, useQuery } from "@apollo/client";
import { formatEther } from "@ethersproject/units";
import { Address } from "~~/components/scaffold-eth";

export const AuctionDetails = ({
  name,
  currentBid,
  auction,
  winnerAdddress,
}: {
  name: string;
  currentBid: number;
  auction: any;
  winnerAdddress: string;
}) => {
  const [isLastAuction, setIsLastAuction] = useState(false);
  const [isFirstAuction, setIsFirstAuction] = useState(false);
  const formattedEndDate = (endDate: string | number) => {
    if (endDate) {
      const unixTimeInMilliseconds = Number(endDate) * 1000;
      const auctionEndDate = new Date(unixTimeInMilliseconds);
      return auctionEndDate.toISOString();
    } else {
      return 0;
    }
  };

  const LOOGIE_GRAPHQL = `
  {
    loogies( orderBy:id orderDirection:desc) {
      id,
      chubbiness,
      color
      mouthLength
      owner {
        id
      }
    }
  }
`;

  const LOOGIE_GQL = gql(LOOGIE_GRAPHQL);
  const { data: loogieData } = useQuery(LOOGIE_GQL, { pollInterval: 1000 });

  const router = useRouter();

  const handlePrevAuctionClick = () => {
    if (parseInt(name) > 1) {
      const previousLoogies = parseInt(name) - 1;
      router.push(`/collection/${previousLoogies}`);
    } else {
      setIsFirstAuction(true);
    }
  };
  const handleNextAuctionClick = () => {
    const maxLoogies = loogieData?.loogies.length;

    if (parseInt(name) <= maxLoogies - 1) {
      const nextLoogies = parseInt(name) + 1;
      router.push(`/collection/${nextLoogies}`);
    } else {
      setIsLastAuction(true);
    }
  };

  return (
    <div>
      <AuctionNavigation
        onPrevAuctionClick={handlePrevAuctionClick}
        onNextAuctionClick={handleNextAuctionClick}
        isLastAuction={isLastAuction}
        isFirstAuction={isFirstAuction}
      />
      <h1 className="font-bold text-[3.5rem] mb-6">Loogie #{name}</h1>
      <p>
        Discover a unique Daily Loogie each day from a limited collection of 3728. Every artwork is a precious find,
        with escalating value rewarding early collectors. Join our community and acquire your slice of digital art
        history! All proceeds support the Buidl Guidl initiative.
      </p>
      <p> </p>
      <div className="flex gap-x-16 flex-col md:flex-row">
        <div className="mt-4 md:flex-col flex-row">
          <h2>{auction?.settled ? "Winning Bid" : "Current Bid"}</h2>
          {currentBid !== undefined ? (
            <p className="text-3xl font-bold">Ξ {formatEther(auction.amount)}</p>
          ) : (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>
        <div className="mt-4 md:flex-col flex-row  md:pl-16 md:border-l">
          <div>
            {auction?.settled ? (
              <>
                <h2 className="mb-4">Winner</h2>
                <Address address={winnerAdddress} size="xl" />
              </>
            ) : (
              <>
                <h2>Auction Ends In</h2>

                <Countdown deadline={formattedEndDate(auction?.endTime)} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
