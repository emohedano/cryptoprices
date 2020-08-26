import React, { useState, useEffect } from 'react';

import PricesSearchForm from './components/PricesSearchForm';
import PricesChart from './components/PricesChart';
import api , { ApiError }from './services/Api';

import logo from './logo.svg';
import './App.css';

function App() {
  const [chartError, setChartError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    api.getLatestBitcoinPrices().then((data) => {
      setChartData(data);
      setIsLoading(false);
    }).catch(handleError);
  }, [])


  function handleError(error) {
      const message = (error instanceof ApiError) ? error.message :  'Unexpected error while processing the data'
      setChartError(message);
      setIsLoading(false);
  }

  async function handleSearch(startDate, endDate) {
    try {
      const startDateAsString = startDate.toISOString();
      const endDateAsString = endDate.toISOString();

      setIsLoading(true);
      setChartError(null);

      const data = await api.getBitcoinPrices(startDateAsString, endDateAsString);

      setChartData(data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  } 
  
  let message = null;

  if (isLoading) {
    message = <div className="loading-indicator">Loading...</div> 
  } else if(chartError){
    message = <div className="loading-indicator">{chartError}</div> 
  }
  
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <section className="prices-section">
        <PricesSearchForm onSearch={handleSearch}/>
        <div className="chart-placeholder">
          {message ? message : <PricesChart data={chartData}/>}
        </div>
      </section>
    </div>
  );
}

export default App;
