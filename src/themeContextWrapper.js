import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./themeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }
  console.log(theme);
  useEffect(() => {
    document.body.classList.add("white-content");
  }, []);

  useEffect(() => {
    if (theme === "white-content") {
      document.body.classList.add("white-content");
    } else {
      document.body.classList.remove("white-content");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
