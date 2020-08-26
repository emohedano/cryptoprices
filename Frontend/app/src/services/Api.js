import parseISO from 'date-fns/parseISO';

const BASE_API_URL = '/api';

export class ApiError extends Error {
    constructor(message){
        super(message);
    }
}

function mapChartData(serverData) {
    return serverData.map((result) => {
        return {
            x: parseISO(result.time_period_start),
            y: [
                result.price_open,
                result.price_high,
                result.price_low,
                result.price_close
            ]
        }
    });
}

class Api {

    async _makeRequest(url) {
        const fullUrl = `${BASE_API_URL}/${url}`;
        const response = await fetch(fullUrl);
        const body = await response.json();
        
        if (response.status > 200) {
            throw new ApiError(body.detail);
        }

        return body;        
    }
    
    async getLatestBitcoinPrices() {
        const data = await this._makeRequest('bitcoin/latestPrices');
        return mapChartData(data);
    }

    async getBitcoinPrices(startDate, endDate) {
        const url = `bitcoin/prices?start_date=${startDate}&end_date=${endDate}`;
        const data = await this._makeRequest(url);
        return mapChartData(data);
    } 
}

export default new Api();