/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const setId = (state, {payload: { id }}) => ({
  ...state,
  id: id
});

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.SET_ID]: setId,
})
