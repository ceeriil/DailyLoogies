"use client";

import type { NextPage } from "next";
import LoogieComponent from "~~/components/loogies";

const Home: NextPage = () => {
  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-10">
        <div className="container mx-auto grid grid-cols-2 mt-16">
          <div>
            <h1 className="font-bold text-[4rem] mb-10">Loggies #1234</h1>
            <p>
              Only 3728 Optimistic Loogies available on a price curve increasing 0.2% with each new mint. Double the
              supply of the Original Ethereum Mainnet Loogies
            </p>
            <div className="flex gap-x-16">
              <div className="mt-10">
                <h2>Current Bid</h2>
                <p className="text-4xl font-bold">0.00</p>
              </div>
              <div className="mt-10 border-l pl-16">
                <h2>Auction Ends At</h2>
                <p className="text-4xl font-bold">12h : 00m : 32s </p>
              </div>
            </div>

            <div className="mt-6 flex">
              <input
                type="text"
                className="border bg-transparent py-2 px-4 w-full border-black"
                placeholder="0.01 eth or More"
              />
              <button className="btn btn-primary text-white rounded-none px-16">Place Bid</button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <LoogieComponent />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
