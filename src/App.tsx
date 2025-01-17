import { InputField } from "./component/InputField";
import { YearAmount } from "./component/YearAmount";

export const App = () => {
  return (
    <div className="app">
      <div className="app_container">
        <InputField />
      </div>
      <div className="year_container">
        <YearAmount />
      </div>
    </div>
  );
};
