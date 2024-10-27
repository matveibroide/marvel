import React, { useEffect, useState } from "react";
import s from "./loadingScreen.module.scss";
import logo from "../../resources/logo/logo.png";
import { LinearProgress } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const LoadingScreen = () => {
  const charList = useSelector((state: RootState) => state.charList.chars);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (charList.length > 0) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 17;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.loadingScreen}>
      <div className={s.container}>
        <img src={logo} alt="Loading Marvel Info..." className={s.img} />
        <p className={s.p}>Loading the Marvel Universe...</p>
        <LinearProgress
          variant="determinate"
          style={{ backgroundColor: "#fff", width: "50%" }}
          value={progress}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
