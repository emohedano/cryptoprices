from enum import Enum
import datetime
import requests
from app.models.CoinPriceInTime import CoinPriceInTime
from app.settings import settings

class SupportedCoins(Enum):
    BTC = 'BTC'

class SupportedCurrencies(Enum):
    USD = 'USD'

class SupportedPeriods(Enum):
    HOUR = '1HRS'

class CoinApiService:

    def getLast24HoursDate(self):
        one_day = datetime.timedelta(days=1)
        return (datetime.datetime.utcnow() - one_day).replace(microsecond=0).isoformat()
    
    async def sendRequest(self, url: str):
        try:
            headers = {'X-CoinAPI-Key' : settings.api_key}
            full_url = f'{settings.coin_api_url}/{url}'
            apiResponse = requests.get(full_url, headers=headers)

            if apiResponse.ok:
                return apiResponse.json()
        except:
            raise Exception('There was an error while making request to Coinpi')

    async def getCoinPricesHistory(self, coin: SupportedCoins, currency: SupportedCurrencies, period: SupportedPeriods, time_start: str, time_end: str):
        
        url = f'ohlcv/{coin.value}/{currency.value}/history?period_id={period.value}&time_start={time_start}'

        if time_end:
            url = f'{url}&time_end={time_end}'

        coinPrices = await self.sendRequest(url)
        return [CoinPriceInTime.formJSON(price) for price in coinPrices]
    
    async def getBitcoinPrices(self, time_start: str, time_end: str):
        return await self.getCoinPricesHistory(SupportedCoins.BTC, SupportedCurrencies.USD, SupportedPeriods.HOUR, time_start, time_end)
    
    async def getLatestBitcoinPrices(self):
        return await self.getBitcoinPrices(self.getLast24HoursDate(), None)