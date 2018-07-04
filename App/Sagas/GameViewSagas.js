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

    console.log(response)
    if (response.ok) {
      const prevGameView = yield select(GameViewSelectors.getGameView);
      let gameView = response.data;
      const prevStage = prevGameView.stage;
      if (prevGameView.salvoes.length !== gameView.salvoes.length) {
        // console.log("update GameView");
        gameView.gameGrids = ConvertGameViewData(response.data);
        console.log(gameView);
        yield put(GameViewActions.gameViewSuccess(gameView));
      } else if (
        (prevStage === "waitingForJoiningOpponent" ||
          prevStage === "waitingForPlacingShipsOfOpponent") &&
        gameView.game.stage === "placingSalvoes"
      ) {
        console.log("navigation Call background Sycn");
        gameView.gameGrids = ConvertGameViewData(response.data);
        yield put(GameViewActions.gameViewSuccess(gameView));
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
    if (stage !== "gameOver") {
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
