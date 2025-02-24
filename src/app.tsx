import React from "react";
import YearsInfo from "./widgets/years-info";
import yearsInfoJSON from "./data/years-info.json";

const App: React.FC = () => {
  return (
    <YearsInfo
      title={yearsInfoJSON.title}
      periods={yearsInfoJSON.periods}
    />
  );
}

export default App;
