import { useEffect, useState } from "react";

type TableProps = {
  valueArr: {
    sum: number;
    date: string[];
  }[];
};

export const MainTable = ({ valueArr }: TableProps) => {
  const [diffSum, setDiffSum] = useState<number[]>(
    localStorage.getItem("diffSum")
      ? JSON.parse(localStorage.getItem("diffSum")!)
      : []
  );
  const [totalAmount, setTodalAmount] = useState<number>(
    localStorage.getItem("totalAmount")
      ? JSON.parse(localStorage.getItem("totalAmount")!)
      : 0
  );
  const [increase, setIncrease] = useState<number[]>(
    localStorage.getItem("increase")
      ? JSON.parse(localStorage.getItem("increase")!)
      : []
  );

  useEffect(() => {
    if (valueArr.length < 2) {
      return setDiffSum([]);
    } else {
      const differenceTotal = valueArr
        .slice(1)
        .map((ele, i) => ele.sum - valueArr[i].sum);

      setDiffSum(differenceTotal);
    }
    // if (valueArr.length < 2) return setIncrease([0]);

    // const spendingProcent = valueArr.slice(-1).map((ele, i) => {
    //   return ((valueArr[i].sum + 10000 - ele.sum) / 10000) * 100;
    // });

    // kraen procent na potrosuvacka - tolku si potrosil

    // const savesProcent = +(100 - spendingProcent).toFixed(2);
    // tolku posto si zastedil
  }, [valueArr.length, valueArr]);

  useEffect(() => {
    if (valueArr.length < 2) {
      return setIncrease([]);
    }

    // kraen procent na potrosuvacka - tolku si potrosil
    const spendingProcent = valueArr
      .slice(1)
      .map((ele, i) => ((valueArr[i].sum + 10000 - ele.sum) / 10000) * 100);

    setIncrease(spendingProcent);
    // tolku posto si zastedil
    // const savesProcent = 100 - spendingProcent;
  }, [valueArr.length, valueArr]);

  useEffect(() => {
    const totalDifference = diffSum.reduce((acc, curr) => acc + curr, 0);
    setTodalAmount(totalDifference);

    localStorage.setItem("diffSum", JSON.stringify(diffSum));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("increase", JSON.stringify(increase));
  }, [diffSum, totalAmount, increase]);

  return (
    <>
      <h1>{totalAmount}</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sum</th>
            <th>Difference</th>
            <th>Savings</th>
          </tr>
        </thead>

        <tbody>
          {valueArr.map((value, index) => (
            <tr key={index}>
              <td>{value.date[index]}</td>
              <td>{value.sum}</td>
              <td>{diffSum[index - 1]}</td>
              <td>{increase[index - 1]} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
