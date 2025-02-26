import React from 'react';
import { Swiper, SwiperSlide, } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import cn from "classnames";
import { TPeriodItem } from "../years-info";
import { MEDIA_SIZES } from "@/shared/global/mediasize";
import NavButton from "@/shared/ui/nav-button";

import "swiper/scss";
import * as styles from "./slider.module.scss";

type TProps = {
  className?: string
  items: Array<TPeriodItem>
}

const Slider: React.FC<TProps> = ({
  className,
  items = [],
}) => {
  return (
    <div className={cn(styles.parent, className)}>
      <Swiper
        modules={[FreeMode, Navigation]}
        spaceBetween={25}
        navigation={{
          nextEl: styles.nextBtn,
          prevEl: styles.prevBtn,
        }}
        freeMode
        slidesPerView="auto"
        breakpoints={{
          [MEDIA_SIZES.BIG_DESKTOP]: {
            spaceBetween: 80,
            slidesPerView: 3,
          }
        }}
      >
        {items.map((item) => {
          return (
            <SwiperSlide key={item.year} className={styles.slide}>
              <div className={styles.year}>{item.year}</div>
              {item.description && (
                <div>{item.description}</div>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
      <NavButton className={styles.prevBtn} />
      <NavButton className={styles.nextBtn} />
    </div>
  )
}

export default Slider;
