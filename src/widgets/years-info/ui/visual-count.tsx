import { useEffect, useMemo, useState } from "react"

type TProps = {
  num: number
}

const VisualCount: React.FC<TProps> = ({
  num,
}) => {
  const [current, setCurrent] = useState(0);
  const [prevNum, setPrevNum] = useState(0);

  const timePerNum = useMemo(() => 1000 / Math.abs(num - prevNum), [num]);

  useEffect(() => {
    setPrevNum(num);

    if (prevNum === 0) {
      setCurrent(num);
    } else {
      if (num === current) return;

      const timeId = setTimeout(() => {
        const newNum = num < current ? current - 1 : current + 1;

        setCurrent(newNum);
      }, timePerNum);

      return () => {
        clearInterval(timeId);
      }
    }
  } , [num, current, prevNum]);

  return current;
}

export default VisualCount;
