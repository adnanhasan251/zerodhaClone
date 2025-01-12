import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import classes from '../css/MainChart.module.css';  // Add this if you want to use CSS modules

const MainChart = ({ stockData, chartType = 'Candles', showIndicators = true }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    // Early return if no data or container
    if (!chartContainerRef.current || !stockData || !stockData.length) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,  // Fixed height
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Format the data
    const formattedData = stockData.map(item => ({
      time: item.date,  // Using the date directly from your mock data
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    // Create and set up the main series
    let mainSeries;
    if (chartType === 'Candles') {
      mainSeries = chart.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
      });
    } else {
      mainSeries = chart.addLineSeries({
        color: '#2563eb',
        lineWidth: 2,
      });
    }

    // Set the data
    mainSeries.setData(formattedData);
    seriesRef.current = mainSeries;

    // Add high/low indicators if enabled
    if (showIndicators) {
      const highSeries = chart.addLineSeries({
        color: '#10B981',
        lineStyle: 2,
        lineWidth: 1,
      });
      
      const lowSeries = chart.addLineSeries({
        color: '#EF4444',
        lineStyle: 2,
        lineWidth: 1,
      });

      highSeries.setData(formattedData.map(item => ({
        time: item.time,
        value: item.high,
      })));

      lowSeries.setData(formattedData.map(item => ({
        time: item.time,
        value: item.low,
      })));
    }

    // Fit content
    chart.timeScale().fitContent();

    // Cleanup
    return () => {
      chart.remove();
    };
  }, [stockData, chartType, showIndicators]); // Dependencies array

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div 
        ref={chartContainerRef} 
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default MainChart;