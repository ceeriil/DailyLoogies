import React from "react";

export const LoadingSkeleton = () => {
  return (
    <>
      <div className="animate-pulse mt-2">
        <div className="h-6 w-[100%] bg-slate-300 rounded"></div>
      </div>
      <div className="animate-pulse mt-2">
        <div className="h-6 w-[100%] bg-slate-300 rounded"></div>
      </div>
      <div className="animate-pulse mt-2">
        <div className="h-6 w-[100%] bg-slate-300 rounded"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="animate-pulse mt-2">
            <div className="h-24 w-[100%] bg-slate-300 rounded"></div>
          </div>
          <div className="animate-pulse mt-2">
            <div className="h-24 w-[100%] bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};
