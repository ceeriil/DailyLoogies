"use client";

import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Auction } from "~~/components/loogies/auction/Auction";

const LOOGIE_GRAPHQL = gql`
  query GetLoogieData($id: Int!) {
    loogie(id: $id) {
      id
      chubbiness
      color
      mouthLength
    }
    auction(id: $id) {
      amount
    }
    bids(first: 6, orderBy: amount, orderDirection: desc) {
      id
      amount
      bidder {
        id
      }
      auction {
        endTime
        startTime
        id
        amount
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data: loogiesData } = useQuery(LOOGIE_GRAPHQL, {
    variables: { id: 2 },
    pollInterval: 1000,
  });

  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-5 relative">
        <Auction loogiesData={loogiesData} />
      </section>
    </>
  );
};

export default Home;
