import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

export default function DarkLightIcon() {
  const [darkMode, setDarkMode] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [themeName, setThemeName] = useState("light");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (getCookie("themeValue")) {
      getCookie("themeValue") ? setThemeName("dark") : setThemeName("light");
    } else {
      setCookie(
        "themeValue",
        window.matchMedia("(prefers-color-scheme: light)").matches,
        30
      );
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? setThemeName("dark")
        : setThemeName("light");
    }
    getCookie("themeValue") === "true"
      ? document.body.classList.remove("white-content")
      : document.body.classList.add("white-content");
  }, []);

  useEffect(() => {
    if (getCookie("themeValue") === "true") {
      setThemeName("dark");
    } else {
      setThemeName("light");
    }
    getCookie("themeValue") === "true"
      ? document.body.classList.remove("white-content")
      : document.body.classList.add("white-content");
  }, [update]);

  document.addEventListener("click", function (e) {
    if (e.target.closest(".content")) {
      setToggleMenu(false);
    }
  });

  const handleToggleDarkmode = (e) => {
    if (e) {
      setCookie("themeValue", "true", 30);
    } else {
      setCookie("themeValue", "false", 30);
    }
    setUpdate(!update);
  };

  const setCookie = (cName, cValue, expDays) => {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  };

  const getCookie = (cName) => {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  };

  const properties = {
    sun: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0,
    },
    moon: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1,
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };
  const { r, transform, cx, cy, opacity } = darkMode
    ? properties["moon"]
    : properties["sun"];
  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  return (
    <a
      onClick={() => {
        setDarkMode(!darkMode);
        handleToggleDarkmode(!darkMode);
      }}>
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeOpacity={"transparent "}
        style={{ ...svgContainerProps, cursor: "pointer" }}
        // onClick={() => toggle((prev) => !prev)}
      >
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <animated.circle
            style={maskedCircleProps}
            cx="12"
            cy="4"
            r="9"
            fill="black"
          />
        </mask>
        <animated.circle
          style={centerCircleProps}
          fill="black"
          cx="12"
          cy="12"
          r="9"
          mask="url(#mask)"
        />

        <animated.g style={linesProps} fill="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </animated.g>
      </animated.svg>
    </a>
  );
}
