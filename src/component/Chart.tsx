import { ChartBar } from "./ChartBar";

import { newDate } from "./InputField";

type SpendProps = {
  spend: number[];
};

export const Chart = ({ spend }: SpendProps) => {
  return (
    <>
      <h2>Spending %</h2>
      <div className="chart">
        {spend.map((ele, i) => (
          <ChartBar key={i} value={ele + "%"} label={newDate[i]} />
        ))}
      </div>
    </>
  );
};
