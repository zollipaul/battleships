/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from "redux-saga/effects";
import GamesActions from "../Redux/GamesRedux";
import ConvertLocalDates from "../Transforms/ConvertLocalDates";
import { delay } from "redux-saga";
import { updateGeoLocation } from './GeolocationSagas'

export function* getGames(api) {

  const response = yield call(api.getGames);
  // success?
  if (response.ok) {
    ConvertLocalDates(response.data.games);
    yield put(GamesActions.getGamesSuccess(response.data));
  } else {
    yield put(GamesActions.getGamesFailure());
  }
}

export function* backgroundSyncGames(api) {
  // bg sync every 15 seconds
  while (true) {
    yield call(delay, 20000);
    // console.log('gamesSync')
    yield call(updateGeoLocation);
    const response = yield call(api.getGames);
    // success?
    if (response.ok) {
      ConvertLocalDates(response.data.games);
      yield put(GamesActions.getGamesSuccess(response.data));
    } else {
      yield put(GamesActions.getGamesFailure());
    }
  }
}



