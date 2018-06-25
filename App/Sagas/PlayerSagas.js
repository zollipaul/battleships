/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js -> check
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from "redux-saga/effects";
import PlayersActions from "../Redux/PlayersRedux";
import GamesActions from "../Redux/GamesRedux";
import GameViewActions from '../Redux/GameViewRedux'

// import { PlayersSelectors } from '../Redux/PlayersRedux'

export function* getPlayers(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(PlayersSelectors.getData)
  // make the call to the api
  const response = yield call(api.getPlayers, data);
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PlayersActions.getPlayersSuccess(response.data));
  } else {
    yield put(PlayersActions.getPlayersFailure());
  }
}

export function* loginPlayer(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(PostPlayersSelectors.getData)
  // make the call to the api

  const response = yield call(api.loginPlayer, data);
  console.log(response);
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PlayersActions.loginPlayerSuccess(response.data));
    yield put(GamesActions.getGamesRequest());
  } else {
    yield put(PlayersActions.loginPlayerFailure());
  }
}

export function* logoutPlayer(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(PostPlayersSelectors.getData)
  // make the call to the api

  const response = yield call(api.logoutPlayer, data);
  console.log(response);
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PlayersActions.logoutPlayerSuccess(response.data));
    yield put(GamesActions.getGamesRequest());
    yield put(GameViewActions.resetGameView())
  } else {
    yield put(PlayersActions.logoutPlayerFailure());
  }
}


export function* signUpPlayer(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(PostPlayersSelectors.getData)
  // make the call to the api

  const response = yield call(api.signUpPlayer, data);
  console.log(response);
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(PlayersActions.signUpPlayerSuccess(response.data));
    yield put(GamesActions.getGamesRequest());
  } else {
    yield put(PlayersActions.signUpPlayerFailure());
  }
}
