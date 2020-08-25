from typing import List
import json

import redis

from utils.dateutils import iso_date_to_timestamp

class RedisCacheService:
    def __init__(self):
        self.r = redis.Redis(host='redis')

    async def update_coin_prices(self, namespace: str, dataset: List[dict], score_key: str):
        data_mappings = {} 

        for data_element in dataset:
            json_data = json.dumps(data_element)
            key = iso_date_to_timestamp(data_element[score_key])
            data_mappings[json_data] = key

        self.r.zadd(namespace, data_mappings)
    
    async def get_coin_prices(self, namespace: str, start_date: str, end_date: str):

        start_timestamp = iso_date_to_timestamp(start_date)
        end_timestamp = iso_date_to_timestamp(end_date)
        
        cached_data = self.r.zrangebyscore(namespace, start_timestamp, end_timestamp)

        return [json.loads(data_element) for data_element in cached_data]

redis_cache_service = RedisCacheService()