/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SamplesTypes } from './Actions'

const startSampling = (state) => ({
  ...state,
  isSampling: true,
});

const stopSamping = (state) => ({
  ...state,
  isSampling: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [SamplesTypes.START_SAMPLE]: startSampling,
  [SamplesTypes.STOP_SAMPLE]: stopSamping,
})
