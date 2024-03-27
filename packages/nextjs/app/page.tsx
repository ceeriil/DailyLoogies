"use client";

import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Auction } from "~~/components/loogies/auction/Auction";

const GET_LATEST_AUCTION = gql`
  {
    auctions(where: { settled_not: true }) {
      loogie {
        id
      }
    }
  }
`;

const LOOGIE_GRAPHQL = gql`
  query getLoogieData($id: Int!) {
    loogie(id: $id) {
      id
      chubbiness
      color
      mouthLength
      owner
    }
    auction(id: $id) {
      endTime
      startTime
      amount
      settled
      bidder {
        id
      }
      loogie {
        owner
      }
      bids(orderBy: amount, orderDirection: desc) {
        id
        amount
        bidder {
          id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data: currentAuctionData } = useQuery(GET_LATEST_AUCTION);
  const loogieId = currentAuctionData?.auctions[0]?.loogie?.id;
  const { data: loogiesData } = useQuery(LOOGIE_GRAPHQL, {
    variables: { id: parseInt(loogieId) },
    pollInterval: 10000,
    skip: !loogieId, // Skip the query if the latest auction ID is not available
  });

  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-5 relative">
        <Auction loogieId={loogieId} loogiesData={loogiesData} />
      </section>
    </>
  );
};

export default Home;
