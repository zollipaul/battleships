import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({

  postGameGridSize: ["payload"]
});

export const GameGridTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Selectors ------------- */

export const GameGridSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

export const postGameGridSize = (state, action) => {
  const { payload } = action;
  return state.merge({payload})
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  [Types.POST_GAME_GRID_SIZE]: postGameGridSize
});
