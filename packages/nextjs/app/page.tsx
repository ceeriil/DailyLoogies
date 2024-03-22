"use client";

import type { NextPage } from "next";
import { Auction } from "~~/components/loogies/auction/Auction";

const Home: NextPage = () => {
  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-5 relative">
        <Auction />
      </section>
    </>
  );
};

export default Home;
