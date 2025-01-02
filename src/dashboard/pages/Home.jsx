import React, { Fragment, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import TopBar from "../components/TopBar";

const Home = () => {
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      const offset = event.dataTransfer.getData("text/plain").split(",");
      const buyWindow = document.getElementById("buy-window");

      buyWindow.style.left = event.clientX + parseInt(offset[0], 10) + "px";
      buyWindow.style.top = event.clientY + parseInt(offset[1], 10) + "px";
      event.preventDefault();
    };

    // Add event listeners
    document.body.addEventListener("dragover", handleDragOver);
    document.body.addEventListener("drop", handleDrop);

    // Cleanup event listeners on unmount
    return () => {
      document.body.removeEventListener("dragover", handleDragOver);
      document.body.removeEventListener("drop", handleDrop);
    };
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <Fragment>
      <TopBar />
      <Dashboard />
    </Fragment>
  );
};

export default React.memo(Home);
