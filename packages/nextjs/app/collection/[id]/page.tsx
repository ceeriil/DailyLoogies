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
      owner
    }
    auction(id: $id) {
      endTime
      startTime
      settled
      amount
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
        <Auction loogieId={slug} loogiesData={loogiesData} />
      </section>
    </>
  );
};

export default CollectionId;
