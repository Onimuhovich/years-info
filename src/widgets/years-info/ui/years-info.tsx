import React, { useEffect, useMemo, useRef, useState } from 'react';
import debounce from "lodash/debounce";
import RadioButton from "./dot";
import VisualCount from "./visual-count";
import NavButton from "@/shared/ui/nav-button";
import Slider from "./slider";

import * as styles from "./years-info.module.scss";

const ANGLE_FIRST_POINT = 120;

export type TPeriodItem = {
  year: number
  description?: string
}

type TPeriod = {
  type: string
  items: Array<TPeriodItem>
}

type TProps = {
  title: string
  periods: Array<TPeriod>
}

const YearsInfo: React.FC<TProps> = ({
  title,
  periods = [],
}) => {
  const refCircle = useRef<null | HTMLDivElement>(null);

  const [periodKey, setPeriodKey] = useState(0);
  const [circleRadius, setCircleRadius] = useState(0);
  const [rotate, setRotate] = useState(0);

  const angleRange = useMemo(() => 360 / periods.length, [periods]);
  const lastKey = useMemo(() => periods.length - 1, [periods]);

  useEffect(() => {
    const setRadius = debounce(() => {
      if (!refCircle.current) return;

      setCircleRadius(refCircle.current.offsetWidth / 2);
    }, 300);

    setRadius();

    window.addEventListener('resize', setRadius);
    return () => {
      window.removeEventListener('resize', setRadius);
    }
  }, []);

  if (!periods[periodKey]) {
    return null;
  }

  const changeRotate = (key: number) => {
    setPeriodKey(key);
    setRotate(angleRange * key);
  }

  const setNextPeriod = () => {
    if (periodKey === lastKey) {
      changeRotate(0);
    } else {
      changeRotate(periodKey + 1);
    }
  }

  const setPrevPeriod = () => {
    if (periodKey === 0) {
      changeRotate(lastKey);
    } else {
      changeRotate(periodKey - 1);
    }
  }

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={styles.period}>
          <div className={styles.startYear}>
            <VisualCount num={periods[periodKey].items[0].year} />
          </div>
          <div className={styles.endYear}>
            <VisualCount num={periods[periodKey].items.at(-1)?.year as number} />
          </div>
        </div>
        <div
          ref={refCircle}
          className={styles.circle}
          style={{ transform: `rotate(-${rotate}deg)` }}
        >
          {periods.map((item, n) => {
            const anglePoint = ANGLE_FIRST_POINT + (angleRange * n);

            return (
              <RadioButton
                key={item.type}
                className={styles.dot}
                name="years-info-period"
                value={item.type}
                num={n + 1}
                onChange={() => changeRotate(n)}
                checked={periods[periodKey].type === item.type}
                style={{
                  translate: `
                    calc((cos(${anglePoint}deg) * ${-circleRadius}px) - 50%)
                    calc((sin(${anglePoint}deg) * ${-circleRadius}px) - 50%)
                  `,
                  rotate: `${rotate}deg`,
                }}
              />
            )
          })}
        </div>
        <div className={styles.navBar}>
          <div className={styles.pagination}>
            {String(periodKey + 1).padStart(2, '0')}/{String(periods.length).padStart(2, '0')}
          </div>
          <div className={styles.navButtons}>
            <NavButton className={styles.prevBtn} onClick={setPrevPeriod} />
            <NavButton onClick={setNextPeriod} />
          </div>
        </div>
        <div className={styles.periodName}>{periods[periodKey].type}</div>
        
        <Slider className={styles.slider} items={periods[periodKey].items} />
      </div>
    </div>
  )
}

export default YearsInfo;
