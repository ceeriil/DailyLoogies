"use client";

import type { NextPage } from "next";
import { Auction } from "~~/components/loogies/auction/Auction";

/* import { EtherInput } from "~~/components/scaffold-eth"; */

const Home: NextPage = () => {
  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-10 relative">
        <Auction />
      </section>
    </>
  );
};

export default Home;
