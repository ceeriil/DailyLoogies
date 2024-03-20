import React from "react";
import { RenderLoogie } from "./utils";

export default function VoteLoogie() {
  return (
    <div>
      <RenderLoogie id="1" color="#ffffff" chubbiness={63} mouthLength={10} />
      <RenderLoogie id="1" color="##7B65FF" chubbiness={100} mouthLength={10} />
      <RenderLoogie id="1" color="#49678D" chubbiness={100} mouthLength={10} />
      <RenderLoogie id="1" color="#9D9101" chubbiness={100} mouthLength={100} />
    </div>
  );
}
