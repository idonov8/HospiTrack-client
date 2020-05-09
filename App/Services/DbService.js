import fs from 'react-native-fs';
import { promisesService } from './PromisesService'
import { apiService } from './ApiService'

const saveSample = async (data) => {
  try {
    const serverResult = await promisesService.reflectPromise(apiService.writeSampleToServer(data));

    const successes = {
      server: serverResult.resolved
    };

    // uncomment on debug only - results are [{ payload: err/result, resloved: bool }].
    // results.forEach((res) => {
    //   if (!res.resolved) {
    //     console.log('e ?', res.payload);
    //   }
    // })

    console.log('Wrote data to', successes);
  } catch(e) {
    // Based on how reflectPromise built, should never get here.
    console.error('reflectPromise failed. FIXME!');
  }
}

export const dbService = {
  saveSample
}