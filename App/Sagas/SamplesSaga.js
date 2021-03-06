import { race, take, select, put, all, delay, fork, cancel, call } from 'redux-saga/effects';
import GpsActions, { GpsTypes } from '../Stores/Gps/Actions';
import { NEXT_SAMPLE_DELAY } from '../Consts';
import WifiActions, { WifiTypes } from '../Stores/Wifi/Actions';
import SampleActions, { SamplesTypes } from '../Stores/Samples/Actions';
import { gpsService } from '../Services/GpsService';
import { wifiService } from '../Services/WifiService';
import { dbService } from '../Services/DbService';
import { phoneService } from '../Services/PhoneService';
import { AndroidForegroundService } from '../Services/AndroidForegroundService';

const wifiListSelector = (state) => !state.wifi.sampleSent && state.wifi.wifiList;
const gpsLocationSelector = (state) => !state.gps.sampleSent && state.gps.gpsLocation;
const userIdSelector = (state) => state.auth.id;

const DELAY = NEXT_SAMPLE_DELAY;

export function* startSampling(isBg = true) {
  const task = yield fork(sampleData);
  
  // Make app work in background
  if (isBg) yield call(AndroidForegroundService.startForegroundService);

  yield take(SamplesTypes.STOP_SAMPLE);

  if (task) yield cancel(task);

  if (isBg) yield call(AndroidForegroundService.stopForegroundService)
}

export function* sampleData() {
  while (true) {
    const task = yield fork(sampleDataOnce);
    yield delay(DELAY);
    if (task) cancel(task);
  } 
}

export function* sampleDataOnce() {
  console.log('sampleDataOnce saga');

  try {

    // Start scan!
    yield all([
      put(GpsActions.fetchGpsLocation()),
      put(WifiActions.fetchWifiList())
    ]);

    const {data, timeout} = yield race({
      data: all([
        take(GpsTypes.FETCH_GPS_LOCATION_SUCCESS),
        take(WifiTypes.FETCH_WIFI_LIST_SUCCESS)
      ]),
      timeout: delay(DELAY)
    });

    const wifi = yield select(wifiListSelector);
    const gps = yield select(gpsLocationSelector);

    if (timeout) {
      console.log('timeout');
      if (!wifi) {
        throw new Error('No wifi makes me cryfi!');
      }
    } else {
      console.log('success - both are here :D');
    }

    const gpsDataForSample = yield call(gpsService.getGpsDataForSample, gps);
    const wifiDataForSample = yield call(wifiService.getWifiDataForSample, wifi);
    const roomDataForSample = {
      room_id: null // For now tells the server this is a client and not a mapper.
      // TODO: remove ASAP. This is ugly :D 
    };
    const phoneDataForSample = yield call(phoneService.getPhoneDataForSample);
    const userDataForSample = {
      user_id: yield select(userIdSelector)
    };
    
    const sample = {
      ...gpsDataForSample,
      ...wifiDataForSample,
      ...phoneDataForSample,
      // Time in ms
      timestamp: Date.now(),
      ...roomDataForSample,
      ...userDataForSample
    };

    yield call(sendSample, sample);
  } catch(e) {
    console.log('e ?', e);
  } finally {
    // TODO: add sample to store
    // This marks last samples as already seen, that's why we always dispatch this.
    // TODO: consider rename to markSample (as it isn't neccearly sent..)
    yield put(SampleActions.sampleSent());
  }  
}

export function* sendSample(sample) {
  console.log('sample to send ?', sample);
  dbService.saveSample(sample);
}
