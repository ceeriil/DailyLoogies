import React from "react";
import { VoteCard } from "./VoteCard";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function VoteLoogie() {
  return (
    <div className="container mx-auto">
      <Swiper
        modules={[Navigation]}
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={swiper => console.log(swiper)}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {/*    <RenderLoogie id="1" color="#ffffff" chubbiness={63} mouthLength={10} />
        </SwiperSlide>
        <SwiperSlide>
          <RenderLoogie id="1" color="##7B65FF" chubbiness={100} mouthLength={10} />
        </SwiperSlide>
        <SwiperSlide>
          <RenderLoogie id="1" color="#49678D" chubbiness={100} mouthLength={10} />
        </SwiperSlide>
        <SwiperSlide>
          <RenderLoogie id="1" color="#9D9101" chubbiness={100} mouthLength={100} /> */}
        <SwiperSlide>
          <VoteCard name="Loogies #1200" index="1" imageUrl="/loogies.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <VoteCard name="Loogies #1200" index="1" imageUrl="/loogies.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <VoteCard name="Loogies #1300" index="1" imageUrl="/loogies.svg" />
        </SwiperSlide>
        <SwiperSlide>
          <VoteCard name="Loogies #1400" index="1" imageUrl="/loogies.svg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
