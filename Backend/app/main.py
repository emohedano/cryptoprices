import os

from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.coinapi import coin_api_service

app = FastAPI()

@app.get('/bitcoin/latestPrices')
async def get_latest_prices():
    coin_prices = await coin_api_service.get_latest_bitcoin_prices()

    return coin_prices

@app.get('/bitcoin/prices')
async def get_prices(start_date: str, end_date: Optional[str] = None):
    coin_prices = await coin_api_service.get_bitcoin_prices(start_date, end_date)

    return coin_prices