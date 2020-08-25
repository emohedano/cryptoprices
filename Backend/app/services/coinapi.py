from enum import Enum
import json
import datetime

import requests

from settings import settings
from utils.dateutils import normalize_iso_date
from models.CoinPriceInTime import CoinPriceInTime
from services.rediscache import redis_cache_service

COIN_SCORE_KEY = 'time_period_start'
API_RESULTS_LIMIT = 1000

class SUPPORTED_COINS(Enum):
    BTC = 'BTC'

class SUPPORTED_CURRENCIES(Enum):
    USD = 'USD'

class SUPPORTED_PERIODS(Enum):
    HOUR = '1HRS'

class CoinApiService:

    def __init__(self):
        self.earliest_cached_date = None
        self.latest_cached_date = None

    def __get_past_month_iso_date(self):
        one_month = datetime.timedelta(weeks=26)
        return (self.__get_current_utc_adjusted_time() - one_month).isoformat()

    def __get_current_utc_adjusted_time(self):
        return datetime.datetime.utcnow().replace(minute=0, second=0, microsecond=0)

    def __get_last_24_hours_date(self):
        one_day = datetime.timedelta(days=1)
        return (self.__get_current_utc_adjusted_time() - one_day).isoformat()
    
    def __get_current_iso_date(self):
        return self.__get_current_utc_adjusted_time().isoformat()
    
    async def __send_request(self, url: str):
        try:
            headers = {'X-CoinAPI-Key' : settings.api_key}
            full_url = f'{settings.coin_api_url}/{url}'
            api_response = requests.get(full_url, headers=headers)

            if api_response.ok:
                return api_response.json()
        except:
            raise Exception('There was an error while making request to Coinpi')
    
    async def __get_cached_coin_prices(self, coin: SUPPORTED_COINS, datetime_start: str, datetime_end: str):
        cached_results = await redis_cache_service.get_coin_prices(coin.value, datetime_start, datetime_end)

        if cached_results:
            first_result = cached_results[0]
            last_result = cached_results[-1]

            first_result_date = normalize_iso_date(first_result[COIN_SCORE_KEY])
            normalized_datetime_start = normalize_iso_date(datetime_start)

            last_result_date = normalize_iso_date(last_result[COIN_SCORE_KEY])
            normalized_datetime_end = normalize_iso_date(datetime_end)

            print('cache params', first_result_date, normalized_datetime_start, last_result_date, normalized_datetime_end)

            # Only return results from cache if the whole requested range is present in the results.
            # IMPORTANT: There is an edge case where the range starts or ends in a weekend since the
            # CoinApi is not returning days without data
            if first_result_date == normalized_datetime_start and last_result_date == normalized_datetime_end:
                print('Data from cache for:', datetime_start, datetime_end)
                return [CoinPriceInTime.fromJSON(price) for price in cached_results]
        
        return []
    
    """
        Fetches the coin prices in a ohlcv format from the CoinApi service
    """
    async def __get_coin_prices_from_api(self, coin: SUPPORTED_COINS, time_start: str, time_end: str):
        url = f'ohlcv/{coin.value}/{SUPPORTED_CURRENCIES.USD.value}/history?period_id={SUPPORTED_PERIODS.HOUR.value}&time_start={time_start}&limit={API_RESULTS_LIMIT}'

        if time_end:
            url = f'{url}&time_end={time_end}'

        return await self.__send_request(url)


    """
        Tries to fetch information from cache for the selected range, if that fails, then it goes to the CoinApi service
    """
    async def __get_coin_prices_history(self, coin: SUPPORTED_COINS, currency: SUPPORTED_CURRENCIES, period: SUPPORTED_PERIODS, datetime_start: str, datetime_end: str):
        cached_prices = await self.__get_cached_coin_prices(coin, datetime_start, datetime_end)

        if cached_prices:
            return cached_prices

        coin_prices = await self.__get_coin_prices_from_api(coin, datetime_start, datetime_end)
        print('Data from API for:', datetime_start, datetime_end)
        
        await redis_cache_service.update_coin_prices(coin.value, coin_prices, COIN_SCORE_KEY)
        return [CoinPriceInTime.fromJSON(price) for price in coin_prices]
    
    async def get_bitcoin_prices(self, time_start: str, time_end: str):
        return await self.__get_coin_prices_history(SUPPORTED_COINS.BTC, SUPPORTED_CURRENCIES.USD, SUPPORTED_PERIODS.HOUR, time_start, time_end)
    
    async def get_latest_bitcoin_prices(self):
        return await self.get_bitcoin_prices(self.__get_last_24_hours_date(), self.__get_current_iso_date())
    
    async def get_initial_bitcoin_prices(self):
        return await self.get_bitcoin_prices(self.__get_past_month_iso_date(), self.__get_current_iso_date)

coin_api_service = CoinApiService()

# Request initial cached date when the application starts (if it's already cached it won't do anything)
coin_api_service.get_initial_bitcoin_prices()