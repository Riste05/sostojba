type AmountProps = {
  yearAmount: {
    year: number;
    amount: number;
  }[];
};

export const YearList = ({ yearAmount }: AmountProps) => {
  return (
    <ul>
      {yearAmount.map((item, index) => (
        <li key={index} className="year_amount">
          <span>{item.year}</span>
          <span>{item.amount}</span>
        </li>
      ))}
    </ul>
  );
};
