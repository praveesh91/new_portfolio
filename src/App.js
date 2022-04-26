import "./App.scss";
import Pages from "./pages";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Pages />
    </div>
  );
}

export default App;
