import React from "react";
import useHexToColor from "../../hooks/loogie/useHexToColor";
import { RenderLoogie } from "./utils";
import { gql, useQuery } from "@apollo/client";

export default function LoogieComponent() {
  const LOOGIES_GRAPHQL = `
    {
      loogies(first: 1) {
        id
        chubbiness
        mouthLength
        color
      }
    }
  `;

  const LOOGIES_GQL = gql(LOOGIES_GRAPHQL);
  const { loading, data: loogiesData } = useQuery(LOOGIES_GQL, { pollInterval: 1000 });
  const color = useHexToColor(loogiesData?.loogies?.[0]?.color);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {loogiesData && loogiesData.loogies && loogiesData.loogies.length > 0 && (
        <div className="scale-150">
          <RenderLoogie
            id={loogiesData.loogies[0].id}
            color={color}
            chubbiness={loogiesData.loogies[0].chubbiness}
            mouthLength={loogiesData.loogies[0].mouthLength}
          />
        </div>
      )}
    </>
  );
}
