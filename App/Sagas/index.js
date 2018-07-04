import { takeLatest, all, takeEvery } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
import { PlayersTypes } from "../Redux/PlayersRedux";
import { GamesTypes } from "../Redux/GamesRedux";
import { GeolocationTypes } from "../Redux/GeolocationRedux";

import { GameViewTypes } from "../Redux/GameViewRedux";
import { LeaderboardTypes } from "../Redux/LeaderboardRedux";
import { ManageGameTypes } from "../Redux/ManageGameRedux";

/* ------------- Sagas ------------- */

// workers sagas
import { startup } from "./StartupSagas";
import {
  getPlayers,
  loginPlayer,
  logoutPlayer,
  signUpPlayer
} from "./PlayerSagas";
import { getGames, backgroundSyncGames } from "./GamesSagas";
import { getGameView, gameViewSyncManager } from "./GameViewSagas";
import { getLeaderboard } from "./LeaderboardSagas";
import { postGeolocation } from "./GeolocationSagas";

import {
  createGame,
  changeGame,
  joinGame,
  startGame,
  postSalvoes,
  clickOnGameInTabBar
} from "./ManageGameSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

// watchers sagas
export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.STARTUP, backgroundSyncGames, api),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(GamesTypes.GET_GAMES_REQUEST, getGames, api),
    takeLatest(GeolocationTypes.POST_GEOLOCATION_REQUEST, postGeolocation, api),

    takeLatest(PlayersTypes.GET_PLAYERS_REQUEST, getPlayers, api),
    takeLatest(PlayersTypes.LOGIN_PLAYER_REQUEST, loginPlayer, api),
    takeLatest(PlayersTypes.LOGOUT_PLAYER_REQUEST, logoutPlayer, api),
    takeLatest(PlayersTypes.SIGN_UP_PLAYER_REQUEST, signUpPlayer, api),

    takeLatest(ManageGameTypes.CREATE_GAME_REQUEST, createGame, api),
    takeEvery(ManageGameTypes.CHANGE_GAME, changeGame),
    takeLatest(ManageGameTypes.JOIN_GAME_REQUEST, joinGame, api),
    takeLatest(ManageGameTypes.START_GAME_REQUEST, startGame, api),
    takeEvery(ManageGameTypes.CLICK_ON_GAME_IN_TAB_BAR, clickOnGameInTabBar),

    takeLatest(GameViewTypes.GAME_VIEW_REQUEST, getGameView, api),
    // takeLatest(GameViewTypes.GAME_VIEW_SYNC_REQUEST, getGameView, api),

    takeLatest(LeaderboardTypes.LEADERBOARD_REQUEST, getLeaderboard, api),

    takeLatest(ManageGameTypes.POST_SALVOES_REQUEST, postSalvoes, api),

    takeLatest(
      [
        ManageGameTypes.JOIN_GAME_SUCCESS,
        ManageGameTypes.CHANGE_GAME,
        ManageGameTypes.CREATE_GAME_SUCCESS
      ],
      gameViewSyncManager,
      api
    )
  ]);
}
