"use client";

import type { NextPage } from "next";
import { Card } from "~~/components/loogies/Card";

const Collection: NextPage = () => {
  return (
    <>
      <section className="flex items-center flex-col flex-grow pt-16 relative">
        <div className="container mx-auto grid grid-cols-3 gap-x-6 gap-y-8">
          <Card name="Loogies #1200" index="1" imageUrl="/loogies.svg" />
          <Card name="Loogies #1102" index="2" imageUrl="/loogies.svg" />
          <Card name="Loogies #173" index="3" imageUrl="/loogies.svg" />
        </div>
      </section>
    </>
  );
};

export default Collection;
