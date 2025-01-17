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
  const [increase, setIncrease] = useState<number[]>([]);

  useEffect(() => {
    //   if (valueArr.length < 2) setIncrease([0]);
    if (valueArr.length < 2) return setDiffSum([0]);

    const differenceTotal =
      valueArr[valueArr.length - 1].sum - valueArr[valueArr.length - 2].sum;

    const increaseAmountProcent = +(
      (valueArr[valueArr.length - 1].sum / valueArr[valueArr.length - 2].sum -
        1) *
      100
    ).toFixed(2);

    setDiffSum((prev) => [...prev, differenceTotal]);
    setIncrease((prev) => [...prev, increaseAmountProcent]);
  }, [valueArr.length, valueArr]);

  useEffect(() => {
    const totalDifference = diffSum.reduce((acc, curr) => acc + curr, 0);
    setTodalAmount(totalDifference);

    localStorage.setItem("diffSum", JSON.stringify(diffSum));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  }, [diffSum, totalAmount]);

  return (
    <>
      <h1>{totalAmount}</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sum</th>
            <th>Difference</th>
            <th>+ / - %</th>
          </tr>
        </thead>

        <tbody>
          {valueArr.map((value, index) => (
            <tr key={index}>
              <td>{value.date[index]}</td>
              <td>{value.sum}</td>
              <td>{diffSum[index]}</td>
              <td>{increase[index]} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
