import { call, put, take, fork, cancel, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import GameViewActions from "../Redux/GameViewRedux";
import ConvertGameViewData from "../Transforms/ConvertGameViewData";
import { GameViewSelectors } from "../Redux/GameViewRedux";
import { navigation } from "./ManageGameSagas";

export function* getGameView(api, action) {
  const { data } = action;
  const response = yield call(api.getGameView, data);
  // success?
  if (response.ok) {
    let gameView = response.data;
    // transform
    gameView.gameGrids = ConvertGameViewData(gameView);
    yield put(GameViewActions.gameViewSuccess(gameView));
  } else {
    yield put(GameViewActions.gameViewFailure());
  }
}

export function* backgroundSync(api, gamePlayerId) {
  while (true) {
    yield call(delay, 5000);
    const response = yield call(api.getGameView, gamePlayerId);
    // success?
    if (response.ok) {
      const prevStage = yield select(GameViewSelectors.getStage);
      let gameView = response.data;
      // transform
      gameView.gameGrids = ConvertGameViewData(response.data);
      yield put(GameViewActions.gameViewSuccess(gameView));

      if (
        (prevStage === "waitingForJoiningOpponent" ||
          prevStage === "waitingForPlacingShipsOfOpponent") &&
        gameView.game.stage === "placingSalvoes"
      ) {
        yield call(navigation, gameView.stage);
      }
    } else {
      yield put(GameViewActions.gameViewFailure());
    }
  }
}

export function* gameViewSyncManager(api) {
  while (true) {
    const action = yield take("GAME_VIEW_SUCCESS");
    const stage = action.payload.stage;
    const gamePlayerId = action.payload.id;
    if (stage !== "GameOver") {
      const task = yield fork(backgroundSync, api, gamePlayerId);
      yield take([
        "JOIN_GAME_SUCCESS",
        "CHANGE_GAME",
        "CREATE_GAME_SUCCESS",
        "LOGOUT_PLAYER_SUCCESS",
        "STOP_BACKGROUND_SYNC"
      ]);

      console.log("cancel");

      yield cancel(task);
    }
  }
}
