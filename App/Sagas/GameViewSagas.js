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

import { call, put, take, fork, cancel } from "redux-saga/effects";
import { delay } from "redux-saga";
import GameViewActions from "../Redux/GameViewRedux";
import ConvertGameViewData from "../Transforms/ConvertGameViewData";
import ConvertSinks from "../Transforms/ConvertSinks";

import ShipsActions from "../Redux/ShipsRedux";
import SalvoActions from "../Redux/SalvoRedux";
import { NavigationActions } from "react-navigation";

export function* getGameView(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(GameViewSelectors.getData)
  // make the call to the api
  const response = yield call(api.getGameView, data);
  // success?
  if (response.ok) {
    let gameView = response.data;

    // transform
    gameView.gameGrids = ConvertGameViewData(gameView);
    console.log(gameView);
    if (gameView.stage === "placingShips") {
      yield put(
        NavigationActions.navigate({ routeName: "PlacingShipsScreen" })
      );
      yield put(ShipsActions.resetAllShips());
      yield put(SalvoActions.resetAllSalvoes());
    }

    if (gameView.stage === "waitingForJoiningOpponent") {
      yield put(
        NavigationActions.navigate({ routeName: "WaitingForOpponentScreen" })
      );
    }

    if (gameView.stage === "waitingForPlacingShipsOfOpponent") {
      yield put(
        NavigationActions.navigate({ routeName: "WaitingForOpponentScreen" })
      );
    }

    if (
      gameView.stage === "GameOver" ||
      gameView.stage === "waitingForSalvoesOfPlayer" ||
      gameView.stage === "waitingForSalvoesOfOpponent"
    ) {
      yield put(NavigationActions.navigate({ routeName: "GamePlayScreen" }));
      yield put(SalvoActions.resetAllSalvoes());
    }

    yield put(GameViewActions.gameViewSuccess(gameView));
  } else {
    yield put(GameViewActions.gameViewFailure());
  }
}

export function* updateGameView(api, gamePlayerId) {
  while (true) {
    const response = yield call(api.getGameView, gamePlayerId);

    // success?
    if (response.ok) {
      let gameView = response.data;
      if (gameView.stage === "waitingForSalvoesOfOpponent") {
        console.log("delay");
        yield call(delay, 5000);
      } else {
        // transform
        gameView.gameGrids = ConvertGameViewData(response.data);

        yield put(GameViewActions.gameViewSuccess(gameView));
        return;
      }
    } else {
      yield put(GameViewActions.gameViewFailure());
    }
  }
}

export function* watchStage(api) {
  while (true) {
    const action = yield take("GAME_VIEW_SUCCESS");
    const stage = action.payload.stage;
    const gamePlayerId = action.payload.id;

    if (stage === "waitingForSalvoesOfOpponent") {
      const task = yield fork(updateGameView, api, gamePlayerId);
      yield take([
        "JOIN_GAME_SUCCESS",
        "CHANGE_GAME",
        "CREATE_GAME_SUCCESS",
        "LOGOUT_PLAYER_SUCCESS"
      ]);
      yield cancel(task);
    }
  }
}
