import React, { useEffect, useMemo, useRef, useState } from 'react';
import RadioButton from "./dot";
import VisualCount from "./visual-count";
import NavButton from "../../../shared/ui/nav-button";

import * as styles from "./years-info.module.scss";

const ANGLE_FIRST_POINT = 120;

type TPeriodItem = {
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
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [circleRadius, setCircleRadius] = useState(0);
  const angleRange = useMemo(() => 360 / periods.length, [periods]);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    if (!refCircle.current) return;

    setCircleRadius(refCircle.current.offsetWidth / 2);
  }, []);

  if (!selectedPeriod) {
    return null;
  }

  const changeRotate = (key: number) => {
    setSelectedPeriod(periods[key]);
    setRotate(angleRange * key);
  }

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={styles.period}>
          <div className={styles.startYear}>
            <VisualCount num={selectedPeriod.items[0].year} />
          </div>
          <div className={styles.endYear}>
            <VisualCount num={selectedPeriod.items.at(-1)?.year as number} />
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
                checked={selectedPeriod.type === item.type}
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
          <div className={styles.pagination}>{}/{periods.length}</div>
          <div className={styles.navButtons}>
            <NavButton></NavButton>
            <NavButton></NavButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YearsInfo;
