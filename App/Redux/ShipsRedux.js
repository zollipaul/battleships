import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import Ships from '../Data/Ships'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postShipsRequest: ["data"],
  postShipsSuccess: ["payload"],
  postShipsFailure: null,

  pushShip: ["data"],

  resetShip: ['id'],

  resetAllShips: null
});

export const ShipsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const ShipsSelectors = {
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

export const pushShip = (state, action) => {
  const { data } = action;
  const id = data.id;
  return state.setIn(["data", [id]], data.ship);
};

export const resetShip = (state, action) => {
  console.log(action);
  const { id } = action;
  console.log(id)
  return state.setIn(["data", [id]], Ships[id]);
};

export const resetAllShips = state => {
  return state.merge({
    data: Ships
  });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_SHIPS_REQUEST]: request,
  [Types.POST_SHIPS_SUCCESS]: success,
  [Types.POST_SHIPS_FAILURE]: failure,

  [Types.PUSH_SHIP]: pushShip,

  [Types.RESET_SHIP]: resetShip,

  [Types.RESET_ALL_SHIPS]: resetAllShips,
});
