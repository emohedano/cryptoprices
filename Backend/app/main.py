import os

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.coinapi import CoinApiService

app = FastAPI()

@app.get('/bitcoin/latestPrices')
async def get_latest_prices():
    
    coinAPIService = CoinApiService()
    coinPrices = await coinAPIService.getLatestBitcoinPrices()

    return coinPrices

@app.get('/bitcoin/prices')
async def get_prices(start_date: str, end_date: Optional[str] = None):
    
    coinApiService = CoinApiService()
    coinPrices = await coinApiService.getBitcoinPrices(start_date, end_date)

    return coinPrices