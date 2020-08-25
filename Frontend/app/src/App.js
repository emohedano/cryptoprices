import React, { useState, useEffect } from 'react';

import PricesSearchForm from './components/PricesSearchForm';
import PricesChart from './components/PricesChart';
import api from './services/Api';

import logo from './logo.svg';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.getLatestBitcoinPrices().then((data) => {
      setChartData(data);
      setIsLoading(false);
    });
  }, [])

  async function handleSearch(startDate, endDate) {
    const startDateAsString = startDate.toISOString();
    const endDateAsString = endDate.toISOString();

    setIsLoading(true);
    const data = await api.getBitcoinPrices(startDateAsString, endDateAsString);
    
    setChartData(data);
    setIsLoading(false);
  }  

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="prices-section">
        <PricesSearchForm onSearch={handleSearch}/>
        <div className="chart-placeholder">
          {isLoading ? <div className="loading-indicator">Loading...</div> : <PricesChart data={chartData}/>}
        </div>
      </section>
    </div>
  );
}

export default App;
