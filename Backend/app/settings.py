from pydantic import BaseSettings

class Settings(BaseSettings):
    coin_api_url: str = 'https://rest.coinapi.io/v1'
    api_key: str = ''

settings = Settings()