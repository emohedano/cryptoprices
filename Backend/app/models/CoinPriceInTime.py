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
        coinPrice.price_open = data['price_open']
        coinPrice.price_high = data['price_high']
        coinPrice.price_low = data['price_low']
        coinPrice.price_close = data['price_close']

        return coinPrice