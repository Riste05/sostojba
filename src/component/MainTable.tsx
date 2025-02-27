import { useEffect, useState } from "react";
import { Chart } from "./Chart";

type TableProps = {
  valueArr: {
    sum: number;
  }[];
};

import { newDate } from "./InputField";

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
  const [saves, setSaves] = useState<number[]>(
    localStorage.getItem("saves")
      ? JSON.parse(localStorage.getItem("saves")!)
      : []
  );

  const [spend, setSpend] = useState<number[]>(
    localStorage.getItem("spend")
      ? JSON.parse(localStorage.getItem("spend")!)
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
  }, [valueArr.length, valueArr]);

  useEffect(() => {
    if (valueArr.length < 2) {
      return setSpend([]);
    } else {
      // kraen procent na potrosuvacka - tolku si potrosil
      const spendingProcent = valueArr
        .slice(1)
        .map((ele, i) =>
          Math.round(
            ((valueArr[i].sum + 35000 - ele.sum) / 35000) * 100
          ).toFixed(2)
        );
      setSpend(spendingProcent.map((ele) => parseInt(ele)));
      console.log(spendingProcent);
    }
  }, [valueArr.length, valueArr]);

  useEffect(() => {
    // tolku posto si zastedil
    const savesProcent = spend.map((ele) => 100 - ele);
    setSaves(savesProcent);
  }, [spend]);

  useEffect(() => {
    const totalDifference = diffSum.reduce((acc, curr) => acc + curr, 0);
    setTodalAmount(totalDifference);

    localStorage.setItem("diffSum", JSON.stringify(diffSum));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("saves", JSON.stringify(saves));
    localStorage.setItem("spend", JSON.stringify(spend));
  }, [diffSum, totalAmount, saves, spend]);

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
              <td>{newDate[index - 1]}</td>
              <td>{value.sum}</td>
              <td>{diffSum[index - 1]}</td>
              <td>{saves[index - 1]} %</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Chart spend={spend} />
    </>
  );
};
