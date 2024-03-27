"use client";

import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { Card } from "~~/components/loogies/Card";

const Collection: NextPage = () => {
  const LOOGIE_GRAPHQL = `
  {
    loogies(first:20 orderBy:id orderDirection:desc) {
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
  const { data: loogiesData } = useQuery(LOOGIE_GQL, { pollInterval: 1000 });

  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-16 relative pb-32">
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 px-4 md:px-0">
          {loogiesData &&
            loogiesData?.loogies?.map((loogie: any, index: number) => {
              return (
                <Link href={`/collection/${loogie.id}`} key={index}>
                  <Card
                    id={loogie.id}
                    chubbiness={loogie.chubbiness}
                    color={loogie.color}
                    mouthLength={loogie.mouthLength}
                    ownerAddress={loogie.owner?.id}
                  />
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Collection;
