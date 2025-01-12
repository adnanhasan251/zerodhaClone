import React, { Fragment, useState, useCallback } from "react";
import { AccessTimeOutlined, PaymentOutlined, BarChartOutlined } from "@mui/icons-material";
import MainChart from "./MainChart";
import { generateMockData } from "../../core/mockData";
import classes from "../css/Summary.module.css";

const Summary = () => {
  const [activeChart, setActiveChart] = useState(null);

  const onChartClick = useCallback((stockSymbol) => {
    try {
      const stockData = generateMockData(stockSymbol, 30);
      
      if (!stockData || !Array.isArray(stockData)) {
        console.error('Invalid stock data generated');
        return;
      }

      setActiveChart({
        stockSymbol,
        stockData,
        chartType: "Candles",
        showIndicators: true,
      });
    } catch (error) {
      console.error('Error generating chart data:', error);
    }
  }, []);

  return (
    <Fragment>
      <div className={classes.username}>
        <h6>Hi, Arshey Mishra</h6>
        <hr className={classes.divider} />
      </div>

      <div className={classes.section}>
        <span>
          <AccessTimeOutlined className={classes["section-icon"]} />
          <p>Equity</p>
        </span>

        <div className={classes.data}>
          <div className={classes.first}>
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className={classes.second}>
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className={classes.divider} />
      </div>

      <div className={classes.section}>
        <span>
          <PaymentOutlined className={classes["section-icon"]} />
          <p>Holdings (13)</p>
          <button 
            className={classes.chartButton}
            onClick={() => onChartClick('INFY')}
          >
            <BarChartOutlined className={classes.chartIcon} />
            View Chart
          </button>
        </span>

        <div className={classes.data}>
          <div className={classes.first}>
            <h3 className={classes.profit}>
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className={classes.second}>
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className={classes.divider} />
      </div>

      {/* Chart Section */}
      {activeChart && activeChart.stockData && (
        <div className={classes.chartSection}>
          <div className={classes.chartHeader}>
            <h3>{activeChart.stockSymbol} Chart</h3>
            <button 
              onClick={() => setActiveChart(null)}
              className={classes.closeButton}
            >
              Close
            </button>
          </div>
          <div className={classes.chartWrapper}>
            <MainChart
              key={activeChart.stockSymbol}
              stockData={activeChart.stockData}
              chartType={activeChart.chartType}
              showIndicators={activeChart.showIndicators}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Summary;
