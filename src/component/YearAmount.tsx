import React, { useState, useEffect } from "react";

import { YearList } from "./YearList";

type YearAmountType = {
  year: number;
  amount: number;
};

export const YearAmount = () => {
  const [amount, setAmount] = useState<YearAmountType>({
    year: 0,
    amount: 0,
  });

  const [yearAmount, setYearAmount] = useState<YearAmountType[]>(
    localStorage.getItem("yearAmount")
      ? JSON.parse(localStorage.getItem("yearAmount")!)
      : []
  );

  function amountHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount({
      ...amount,
      [e.target.id]: parseInt(e.target.value),
    });
  }

  function yearAmountHandler() {
    if (amount.year === 0 || amount.amount === 0) {
      alert("Put some values");
      return;
    }

    setYearAmount([...yearAmount, amount]);

    setAmount({
      year: 0,
      amount: 0,
    });
  }

  useEffect(() => {
    localStorage.setItem("yearAmount", JSON.stringify(yearAmount));
  }, [yearAmount]);

  return (
    <>
      <div className="year_container">
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          value={amount.year}
          onChange={amountHandler}
        />
      </div>
      <div className="year_container">
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={amount.amount}
          onChange={amountHandler}
        />
      </div>
      <button onClick={yearAmountHandler} className="btn_year">
        Add
      </button>
      <YearList yearAmount={yearAmount} />
    </>
  );
};
