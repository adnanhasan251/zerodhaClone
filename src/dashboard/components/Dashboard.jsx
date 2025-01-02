import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { GeneralContextProvider } from "../../store/general-context";

import classes from "../css/Dashboard.module.css";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className={classes.container}>
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
