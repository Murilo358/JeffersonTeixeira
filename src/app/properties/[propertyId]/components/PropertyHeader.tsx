"use client"
import React, {useEffect, useState} from "react";
import Image from "next/image";
import { Property } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";
import "swiper/css/pagination";
import Lightbox from "yet-another-react-lightbox";
import {Zoom} from "yet-another-react-lightbox/plugins";
interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const [viewport, setViewport] = useState({ w: 0, h: 0 });
    const IMAGE_RATIO = 3 / 2;


    useEffect(() => {
        const update = () =>
            setViewport({ w: window.innerWidth, h: window.innerHeight });

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return (
    <div className="flex flex-col">
      {" "}
        <Lightbox
            open={open}

            close={() => setOpen(false)}
            index={index}
            slides={property.imagesUrl.map((img) => {
                const maxWidth = viewport.w * 0.95;
                const maxHeight = viewport.h * 0.85;

                let width = maxWidth;
                let height = width / IMAGE_RATIO;

                if (height > maxHeight) {
                    height = maxHeight;
                    width = height * IMAGE_RATIO;
                }

                return {
                    src: `/api/image?url=${encodeURIComponent(img)}`,
                    width,
                    height,
                };
            })}
            plugins={[Zoom]}
            animation={{ zoom: 100 }}
            carousel={{
                finite: false,
                imageFit: "cover",
            }}
            zoom={{
                maxZoomPixelRatio: 3,
                minZoom: 0.8,
                scrollToZoom: true,
            }}

        />
        <Swiper
            className="w-full"
            loop={true}
            slidesPerView="auto"
            spaceBetween={12}
            centeredSlides
            navigation
            pagination={{ clickable: true }}
        >

            {property.imagesUrl.map((image, i) => (
                <SwiperSlide
                    key={i}
                    className="!w-[80vw] lg:!w-[45vw]"
                >
                    <div
                        className="relative aspect-[3/2] w-full cursor-zoom-in"
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                        }}
                    >
                        <Image
                            src={image}
                            fill
                            className="object-cover rounded-2xl"
                            alt={property.title}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
};

export default PropertyHeader;
