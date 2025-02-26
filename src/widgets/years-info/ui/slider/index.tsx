import React, { useEffect, useRef, useState } from 'react';
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
  const refParent = useRef<null | HTMLDivElement>(null);
  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    const classParent = "slider-view";

    setTimeout(() => {
      if (!refParent.current) return;

      setCurrentItems(items);
      refParent.current.classList.add(classParent);
    }, 500);

    return () => {
      if (!refParent.current) return;

      refParent.current.classList.remove(classParent);
    }
  }, [items]);

  return (
    <div ref={refParent} className={cn(styles.parent, className)}>
      <Swiper
        className={styles.slider}
        modules={[FreeMode, Navigation]}
        spaceBetween={25}
        navigation={{
          nextEl: `.${styles.nextBtn}`,
          prevEl: `.${styles.prevBtn}`,
        }}
        freeMode
        slidesPerView="auto"
        breakpoints={{
          [MEDIA_SIZES.BIG_DESKTOP]: {
            spaceBetween: 80,
          }
        }}
      >
        {currentItems.map((item) => {
          return (
            <SwiperSlide key={item.year} className={styles.slide}>
              <div className={styles.year}>{item.year}</div>
              {item.description && (
                <div className={styles.description}>{item.description}</div>
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
