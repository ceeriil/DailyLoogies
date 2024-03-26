"use client";

import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Card } from "~~/components/loogies/Card";

const Collection: NextPage = () => {
  const LOOGIE_GRAPHQL = `
  {
    loogies(first:10){
      id,
      chubbiness,
      color
      mouthLength
    },
      bids(first:2){
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

  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-16 relative">
        <div className="container mx-auto grid grid-cols-3 gap-x-6 gap-y-8">
          {loogiesData &&
            loogiesData?.loogies?.map((loogie: any, index: number) => {
              return (
                <Card
                  id={loogie.id}
                  chubbiness={loogie.chubbiness}
                  color={loogie.color}
                  key={index}
                  mouthLength={loogie.mouthLength}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Collection;
