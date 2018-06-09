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

import { call, put, select, take } from "redux-saga/effects";
import ManageGameActions from "../Redux/ManageGameRedux";
import GamesActions from "../Redux/GamesRedux";
import { GameViewSelectors } from "../Redux/GameViewRedux";
import { NavigationActions } from "react-navigation";
import GameViewActions from "../Redux/GameViewRedux";
import ShipsActions from "../Redux/ShipsRedux";
import SalvoActions from "../Redux/SalvoRedux";
import ShipsToArray from "../Transforms/ShipsToArray";
import SalvoesToObject from "../Transforms/SalvoesToObject";

import { ManageGameReduxSelectors } from "../Redux/ManageGameRedux";

export function* createGame(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(GamesSelectors.getData)
  // make the call to the api
  const response = yield call(api.createGame, data);
  console.log(response);

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ManageGameActions.createGameSuccess(response.data));

    // yield put(NavigationActions.navigate({ routeName: "PlacingShipsScreen" }));

    yield put(GamesActions.getGamesRequest());
    yield put(GameViewActions.gameViewRequest(response.data.gamePlayerId));
    // yield put(ShipsActions.resetAllShips());
    // yield put(SalvoActions.resetAllSalvoes());
  } else {
    yield put(ManageGameActions.createGameFailure());
  }
}

export function* changeGame(action) {
  const { payload } = action;
  // yield put(NavigationActions.navigate({ routeName: "PlacingShipsScreen" }));
  yield put(GamesActions.getGamesRequest());
  yield put(GameViewActions.gameViewRequest(payload));
  // yield put(ShipsActions.resetAllShips());
  // yield put(SalvoActions.resetAllSalvoes());
}

export function* joinGame(api, action) {
  const { data } = action;
  const response = yield call(api.joinGame, data);
  console.log(response);

  // success?
  if (response.ok) {
    yield put(ManageGameActions.joinGameSuccess(response.data));

    // yield put(NavigationActions.navigate({ routeName: "PlacingShipsScreen" }));
    yield put(GamesActions.getGamesRequest());
    yield put(GameViewActions.gameViewRequest(response.data.gamePlayerId));
    // yield put(ShipsActions.resetAllShips());
    // yield put(SalvoActions.resetAllSalvoes());
  } else {
    yield put(ManageGameActions.joinGameFailure());
  }
}

export function* startGame(api, action) {
  const { data } = action;
  const ships = yield select(ManageGameReduxSelectors.getShips);
  const gamePlayerId = yield select(GameViewSelectors.getGamePlayerId);
  const shipsArray = ShipsToArray(ships);

  const response = yield call(api.postShips, gamePlayerId, shipsArray);
  console.log(response);

  // success?
  if (response.ok) {
    yield put(ManageGameActions.startGameSuccess(response.data));
    yield put(GameViewActions.gameViewRequest(gamePlayerId));

    // yield put(NavigationActions.navigate({ routeName: "GamePlayScreen" }));
    // yield put(GameViewActions.gameViewRequest(gamePlayerId));
    // yield put(ShipsActions.resetAllShips());
    // yield put(SalvoActions.resetAllSalvoes());
  } else {
    yield put(ManageGameActions.startGameFailure());
  }
}

export function* watchEndOfTurn(api, action) {
  const { data } = action;

  while (yield take("TOGGLE_SALVO")) {
    const salvoes = yield select(ManageGameReduxSelectors.getSalvoes);
    const turn = yield select (GameViewSelectors.getTurn)

    // convert to object for java backend
    const salvoObject = SalvoesToObject(turn, salvoes);

    if (salvoes.length === 5) {
      const gamePlayerId = yield select(GameViewSelectors.getGamePlayerId);
      const response = yield call(api.postSalvoes, gamePlayerId, salvoObject);
      if (response.ok) {
        yield put(ManageGameActions.endTurnSuccess(response.data));

        console.log('gameviewRequest')
        yield put(GameViewActions.gameViewRequest(gamePlayerId));

        yield put(SalvoActions.resetAllSalvoes());
      } else {
        yield put(ManageGameActions.endTurnFailure());
      }
    }
  }
}
