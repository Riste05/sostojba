type BarProps = {
  value: string;
  label: string;
};

export const ChartBar = ({ value, label }: BarProps) => {
  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: value }}></div>
      </div>
      <div className="char-bar__spending">{value}</div>
      <div className="chart-bar__label">{label}</div>
    </div>
  );
};
