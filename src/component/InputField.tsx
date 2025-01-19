import { useState, useEffect } from "react";
import { MainTable } from "./MainTable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export type ArrProps = {
  sum: number;
  date: string[];
}[];

export const InputField = () => {
  const [value, setValue] = useState({
    sum: 0,
    date: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  });

  const [valueArr, setValueArr] = useState<ArrProps>(
    localStorage.getItem("valueArr")
      ? JSON.parse(localStorage.getItem("valueArr")!)
      : []
  );

  function addValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value),
    }));
  }

  function addValueArr() {
    if (value.sum === 0) {
      alert("Please enter a value");
      return;
    }
    setValueArr([...valueArr, value]);
  }

  // useEffect(() => {
  //   localStorage.setItem("valueArr", JSON.stringify(valueArr));
  // }, [valueArr]);

  return (
    <>
      <div className="input_container">
        <input type="text" name="sum" value={value.sum} onChange={addValue} />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="btn_icon"
          onClick={addValueArr}
        />
      </div>
      <MainTable valueArr={valueArr} />
    </>
  );
};
