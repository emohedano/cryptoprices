
import datetime

"""
    Removes the miliseconds part of the date as well as the "Z" character at the end
"""
def normalize_iso_date(date: str):
    if not date:
        return None
    return date.split('.')[0]

def iso_date_to_timestamp(date: str):
    if not date:
        return None

    date_without_ms = normalize_iso_date(date)
    return datetime.datetime.fromisoformat(date_without_ms).timestamp()