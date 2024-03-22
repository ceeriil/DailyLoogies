"use client";

import type { NextPage } from "next";
import VoteLoogie from "~~/components/loogies/vote";

const Vote: NextPage = () => {
  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-10 pb-24">
        <div className="container mx-auto flex flex-col items-center mt-16 text-center">
          <h1 className="font-bold text-[4rem] mb-10">Tommorows Loogies?</h1>
          <div className="flex items-center justify-center">
            <VoteLoogie />
          </div>
          <div className="mt-10 border px-10 py-5 border-black">
            <h2>Voting Ends At</h2>
            <p className="text-4xl font-bold">12h : 00m : 32s </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Vote;
