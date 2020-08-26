import os

from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.coinapi import coin_api_service, OperationException

app = FastAPI()

@app.get('/bitcoin/latestPrices')
async def get_latest_prices():

    try:
        coin_prices = coin_api_service.get_latest_bitcoin_prices()
        return coin_prices
    except OperationException as o:
        raise HTTPException(status_code=400, detail=o.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail="There was an unexpected error")   

@app.get('/bitcoin/prices')
async def get_prices(start_date: str, end_date: Optional[str] = None):
    
    try:
        coin_prices = coin_api_service.get_bitcoin_prices(start_date, end_date)
        return coin_prices
    except OperationException as o:
        raise HTTPException(status_code=400, detail=o.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail="There was an unexpected error")