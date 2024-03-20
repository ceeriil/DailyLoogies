import React from "react";

export function RenderLoogie({
  id,
  color,
  chubbiness,
  mouthLength,
}: {
  id: string;
  color: string;
  chubbiness: number;
  mouthLength: number;
}) {
  return (
    <svg id={id} width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <g id="eye1">
        <ellipse strokeWidth="3" ry="29.5" rx="29.5" id="svg_1" cy="154.5" cx="181.5" stroke="#000" fill="#fff" />
        <ellipse ry="3.5" rx="2.5" id="svg_3" cy="154.5" cx="173.5" strokeWidth="3" stroke="#000" fill="#000000" />
      </g>
      <g id="head">
        <ellipse
          fill={color}
          strokeWidth="3"
          cx="204.5"
          cy="211.80065"
          id="svg_5"
          rx={chubbiness}
          ry="51.80065"
          stroke="#000"
        />
      </g>
      <g id="eye2">
        <ellipse strokeWidth="3" ry="29.5" rx="29.5" id="svg_2" cy="168.5" cx="209.5" stroke="#000" fill="#fff" />
        <ellipse ry="3.5" rx="3" id="svg_4" cy="169.5" cx="208" strokeWidth="3" fill="#000000" stroke="#000" />
      </g>
      <g className="mouth" transform={`translate(${(12 * chubbiness) / 11},0)`}>
        <path d={`M 130 240 Q 165 250 ${mouthLength} 235`} stroke="black" strokeWidth="3" fill="transparent" />
      </g>
    </svg>
  );
}
