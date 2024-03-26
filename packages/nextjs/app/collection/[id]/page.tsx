"use client";

import { useParams } from "next/navigation";
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

const CollectionId: NextPage = () => {
  const router = useParams();
  let slug: number | undefined;
  if (Array.isArray(router.id)) {
    slug = parseInt(router.id[0]);
  } else {
    slug = parseInt(router.id);
  }
  const { data: loogiesData } = useQuery(LOOGIE_GRAPHQL, {
    variables: { id: slug },
    pollInterval: 1000,
  });
  console.log(slug, typeof slug, "hello");

  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-5 relative">
        <Auction loogiesData={loogiesData} />
      </section>
    </>
  );
};

export default CollectionId;
