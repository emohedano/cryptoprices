import React, { useState, useEffect } from 'react';

import PricesSearchForm from './components/PricesSearchForm';
import PricesChart from './components/PricesChart';
import api from './services/Api';

import logo from './logo.svg';
import './App.css';


function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.getLatestBitcoinPrices().then((data) => {
      setChartData(data);  
    });
  }, [])

  async function handleSearch(startDate, endDate) {
    const startDateAsString = startDate.toISOString();
    const endDateAsString = endDate.toISOString();
    const data = await api.getBitcoinPrices(startDateAsString, endDateAsString);
    setChartData(data);
  }  

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="prices-section">
        <PricesSearchForm onSearch={handleSearch}/>
        <div className="chart-placeholder">
          <PricesChart data={chartData}/>
        </div>
      </section>
    </div>
  );
}

export default App;
