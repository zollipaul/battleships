import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameViewRequest: ['data'],
  gameViewSuccess: ['payload'],
  gameViewFailure: null,
})

export const GameViewTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const GameViewSelectors = {
  getGamePlayerId: state => state.gameView.payload.id,
  getTurn: state => state.gameView.payload.turn,
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const update = state =>
  state.merge( { fetching: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAME_VIEW_REQUEST]: request,
  [Types.GAME_VIEW_SUCCESS]: success,
  [Types.GAME_VIEW_FAILURE]: failure,
})
