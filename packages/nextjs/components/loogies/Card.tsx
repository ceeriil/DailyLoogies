import React from "react";
import { Address } from "../scaffold-eth";
import { RenderLoogie } from "./utils";
import useHexToColor from "~~/hooks/loogie/useHexToColor";

type CardProps = {
  id: string;
  chubbiness: number;
  mouthLength: number;
  color: string;
  ownerAddress?: string;
};

export const Card: React.FC<CardProps> = ({ id, chubbiness, mouthLength, color, ownerAddress }) => {
  return (
    <div className="border border-black rounded flex flex-col justify-between min-w-[7rem]">
      <div>
        <div className="py-1 min-h-[250px] w-full relative rounded-t border-b border-black flex items-center justify-center overflow-hidden">
          <RenderLoogie
            id={id}
            color={useHexToColor(color)}
            chubbiness={chubbiness}
            mouthLength={mouthLength}
            height={350}
            width={400}
            className="scale-130"
          />
        </div>
        <div className="p-6 py-3 bg-base-100 ">
          <h2 className="font-semibold text-2xl">Loogie #{id}</h2>
          <p className="">
            This Loogie is the color {useHexToColor(color)} with a chubbiness of {chubbiness} and mouth length of
            {mouthLength}!!!
          </p>
          {ownerAddress && <Address address={ownerAddress} />}
        </div>
      </div>
    </div>
  );
};
