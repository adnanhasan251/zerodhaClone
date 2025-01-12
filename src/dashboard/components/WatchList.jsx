import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  DeleteOutline,
  KeyboardArrowDown,
  KeyboardArrowUp,
  List,
  MoreHoriz,
  SettingsOutlined,
} from "@mui/icons-material";
import React, { useState, useCallback } from "react";
import { watchlist } from "../../core/data";
import MainChart from "./MainChart";
import { generateMockData } from "../../core/mockData";
import classes from "../css/WatchList.module.css";

const WatchList = () => {
  const [activeChart, setActiveChart] = useState(null);

  // Memoize the chart click handler to prevent unnecessary rerenders
  const onChartClick = useCallback((stockSymbol) => {
    try {
      const stockData = generateMockData(stockSymbol, 30);
      
      // Ensure we're setting valid data
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

  const handleCloseChart = useCallback(() => {
    setActiveChart(null);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes["search-container"]}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className={classes.search}
        />
        <span className={classes.counts}> 9 / 50</span>
      </div>

      <ul className={classes["list"]}>
        {watchlist.map((stock) => (
          <WatchListItem
            stock={stock}
            key={stock.name} // Using stock.name as key instead of index
            onChartClick={onChartClick}
          />
        ))}
      </ul>

      {/* Improved chart rendering logic */}
      {activeChart && activeChart.stockData && (
        <div className={classes.chartContainer}>
          <div className={classes.chartHeader}>
            <h3>{activeChart.stockSymbol} Chart</h3>
            <button onClick={handleCloseChart} className={classes.closeChart}>
              Close
            </button>
          </div>
          <div className={classes.chartWrapper}>
            <MainChart
              key={activeChart.stockSymbol} // Add key to force re-render on symbol change
              stockData={activeChart.stockData}
              chartType={activeChart.chartType}
              showIndicators={activeChart.showIndicators}
            />
          </div>
        </div>
      )}

      <div className={classes["watchlist-number"]}>
        <ul>
          <Tooltip
            title="Companies"
            placement="top"
            arrow
            aria-label="companies"
            TransitionComponent={Grow}
          >
            <li>1</li>
          </Tooltip>
          <Tooltip
            title="Bank"
            placement="top"
            arrow
            aria-label="bank"
            TransitionComponent={Grow}
          >
            <li>2</li>
          </Tooltip>
          <Tooltip
            title="Indices"
            placement="top"
            arrow
            aria-label="indices"
            TransitionComponent={Grow}
          >
            <li>3</li>
          </Tooltip>
          <Tooltip
            title="Hospitality"
            placement="top"
            arrow
            aria-label="hospitality"
            TransitionComponent={Grow}
          >
            <li>4</li>
          </Tooltip>
          <Tooltip
            title="First Stocks"
            placement="top"
            arrow
            aria-label="stocks"
            TransitionComponent={Grow}
          >
            <li>5</li>
          </Tooltip>
        </ul>

        <Tooltip
          title="Marketwatch settings"
          placement="left"
          arrow
          aria-label="settings"
          TransitionComponent={Grow}
        >
          <SettingsOutlined className={classes.settings} />
        </Tooltip>
      </div>
    </div>
  );
};

const WatchListItem = React.memo(({ stock, onChartClick }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={classes.item}>
        <p className={stock.isDown ? classes.down : classes.up}>{stock.name}</p>
        <div className={classes["item-info"]}>
          <span className={classes.percent}>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className={classes.down} />
          ) : (
            <KeyboardArrowUp className={classes.up} />
          )}
          <span className={classes.price}>{stock.price}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions uid={stock.name} onChartClick={onChartClick} />
      )}
    </li>
  );
});

const WatchListActions = React.memo(({ uid, onChartClick }) => {
  return (
    <span className={classes.actions}>
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className={classes.buy}>B</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
        <button className={classes.sell}>S</button>
      </Tooltip>
      <Tooltip
        title="Market depth (D)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className={classes.action}>
          <List className={classes.icon} />
        </button>
      </Tooltip>
      <Tooltip title="Chart (C)" placement="top" arrow TransitionComponent={Grow}>
        <button
          className={classes.action}
          onClick={() => onChartClick(uid)}
        >
          <BarChartOutlined className={classes.icon} />
        </button>
      </Tooltip>
      <Tooltip
        title="Delete (del)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className={classes.action}>
          <DeleteOutline className={classes.icon} />
        </button>
      </Tooltip>
      <Tooltip
        title="More"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className={classes.action}>
          <MoreHoriz className={classes.icon} />
        </button>
      </Tooltip>
    </span>
  );
});

export default WatchList;
