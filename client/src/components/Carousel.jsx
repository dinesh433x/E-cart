import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({ slides, height = 120 }) {
  if (!slides || slides.length === 0) return <p>No slides found</p>;

  return (
    <div style={{ width: "100%", maxWidth: 1255, margin: "0 auto" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        style={{ width:"100%", borderRadius: "8px", overflow: "hidden" }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <img
              src={s.image}
              alt=""
              style={{
                width: "100%",
                height: height,
                objectFit: "cover",
                display: "block",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
