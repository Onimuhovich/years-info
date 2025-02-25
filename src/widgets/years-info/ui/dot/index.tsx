import React, { CSSProperties } from 'react';
import * as styles from "./dot.module.scss";
import cn from 'classnames';

type TProps = {
  className?: string
  name: string
  value: string
  num: number
  checked: boolean
  style?: CSSProperties
  onChange: () => void
}

const RadioButton: React.FC<TProps> = ({
  className,
  name,
  value,
  num,
  style = {},
  checked,
  onChange,
}) => {
  return (
    <label className={cn(styles.parent, className)} style={style}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <div className={styles.num}>
        <div className={styles.numWrapper}>{num}</div>
      </div>
      <div className={styles.name}>{value}</div>
    </label>
  )
}

export default RadioButton;
