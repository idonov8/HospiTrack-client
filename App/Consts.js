export const REPEAT_LOCATION_SCAN_TIMES = 10;
export const NEXT_SAMPLE_DELAY = 45000; // scan every 45 seconds

export const GPS_TIMEOUT = NEXT_SAMPLE_DELAY;
export const API_TIMEOUT = NEXT_SAMPLE_DELAY;

const SERVER_PREFIX_URL = 'https://hospitrack-app-api.azurewebsites.net/api';
export const SERVER_URLS = {
  IS_ALIVE: SERVER_PREFIX_URL + '/test',
  POST_SAMPLE: SERVER_PREFIX_URL + '/insert-router-scan',
}

export const IS_DEV = __DEV__;