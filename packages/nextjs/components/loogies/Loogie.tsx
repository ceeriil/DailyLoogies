import React from "react";
import useHexToColor from "../../hooks/loogie/useHexToColor";
import { RenderLoogie } from "./utils";

interface LoogieComponentProps {
  loogiesData: {
    id: string;
    chubbiness: number;
    color: string;
    mouthLength: number;
  };
}

export const LoogieComponent: React.FC<LoogieComponentProps> = ({ loogiesData }) => {
  const color = useHexToColor(loogiesData?.color);

  if (!loogiesData) {
    return <p>No loogies data available</p>;
  }

  return (
    <>
      <div className="scale-150">
        <RenderLoogie
          id={loogiesData.id}
          color={color}
          chubbiness={loogiesData.chubbiness}
          mouthLength={loogiesData.mouthLength}
        />
      </div>
    </>
  );
};

export default LoogieComponent;
