import React, { useState } from 'react';
import * as styles from "./years-info.module.scss";

type TPeriodItem = {
  year: string
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
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  if (!selectedPeriod) {
    return null;
  }

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={styles.period}>
          <div className={styles.startYear}>{selectedPeriod.items[0].year}</div>
          <div className={styles.endYear}>{selectedPeriod.items.at(-1)?.year}</div>
        </div>
      </div>
    </div>
  )
}

export default YearsInfo;
