from typing import Optional

class CoinPriceInTime:

    def __init__(self):
        self.time_period_start: Optional[str] = None
        self.time_period_end: Optional[str] = None
        self.price_open: Optional[int] = None
        self.price_high: Optional[int] = None
        self.price_low: Optional[int] = None
        self.price_close: Optional[int] = None
    
    @classmethod
    def formJSON(cls, data):
        coinPrice = cls()

        coinPrice.time_period_start = data['time_period_start']
        coinPrice.time_period_end = data['time_period_start']
        coinPrice.price_open = data['time_period_start']
        coinPrice.price_high = data['time_period_start']
        coinPrice.price_low = data['time_period_start']
        coinPrice.price_close = data['time_period_start']

        return coinPrice