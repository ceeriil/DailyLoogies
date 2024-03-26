import React from "react";
import { RenderLoogie } from "./utils";
import useHexToColor from "~~/hooks/loogie/useHexToColor";

type CardProps = {
  id: string;
  chubbiness: number;
  mouthLength: number;
  color: string;
};

export const Card: React.FC<CardProps> = ({ id, chubbiness, mouthLength, color }) => {
  return (
    <div className="border border-black rounded flex flex-col justify-between min-w-[14rem]">
      <div>
        <div className="py-1 min-h-[250px] w-full relative rounded-t border-b border-black flex items-center justify-center">
          <RenderLoogie id={id} color={useHexToColor(color)} chubbiness={chubbiness} mouthLength={mouthLength} />
        </div>
        <div className="p-6 py-3 bg-base-100 ">
          <h2 className="font-semibold text-2xl">Loogie #{id}</h2>
          <p className="">
            This Loogie is the color #f1c55f with a chubbiness of {chubbiness} and mouth length of {mouthLength}!!!
          </p>
        </div>
      </div>
    </div>
  );
};
