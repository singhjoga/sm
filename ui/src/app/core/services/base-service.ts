const loc = window.location
const API_URL = (loc.host === 'localhost:5000' ? 'http://localhost:8888' : loc.protocol + '//' + loc.host + ':' + loc.port) + '/api/v1'

export abstract class BaseService {
/*
    getBaseApiUrl(): string {
        return API_URL;
    }
    */
}