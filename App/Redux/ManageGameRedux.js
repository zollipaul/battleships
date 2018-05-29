import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createGameRequest: ["data"],
  createGameSuccess: ["payload"],
  createGameFailure: null,

  changeGame: ["payload"],

  joinGameRequest: ["data"],
  joinGameSuccess: ["payload"],
  joinGameFailure: null,
});

export const ManageGameTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Selectors ------------- */

export const ManageGameReduxSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const changeGame = (state, action) => {
  const { payload } = action;
  return state.merge({ payload });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_GAME_REQUEST]: request,
  [Types.CREATE_GAME_SUCCESS]: success,
  [Types.CREATE_GAME_FAILURE]: failure,

  [Types.CHANGE_GAME]: changeGame,

  [Types.JOIN_GAME_REQUEST]: request,
  [Types.JOIN_GAME_SUCCESS]: success,
  [Types.JOIN_GAME_FAILURE]: failure,
});