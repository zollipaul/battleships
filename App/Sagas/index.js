import { takeLatest, all, takeEvery } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
import { GithubTypes } from "../Redux/GithubRedux";
import { PlayersTypes } from "../Redux/PlayersRedux";
import { GamesTypes } from "../Redux/GamesRedux";
import { GameViewTypes } from "../Redux/GameViewRedux";
import { LeaderboardTypes } from "../Redux/LeaderboardRedux";
import { ManageGameTypes } from "../Redux/ManageGameRedux";
import { ShipsTypes} from '../Redux/ShipsRedux'

/* ------------- Sagas ------------- */

// workers sagas
import { startup } from "./StartupSagas";
import { getUserAvatar } from "./GithubSagas";
import {
  getPlayers,
  loginPlayer,
  logoutPlayer,
  signUpPlayer
} from "./PlayerSagas";
import { getGames } from "./GamesSagas";
import { getGameView } from "./GameViewSagas";
import { getLeaderboard } from "./LeaderboardSagas";
import { createGame, changeGame, joinGame, startGame, watchEndOfTurn } from "./ManageGameSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

// watchers sagas
export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(PlayersTypes.GET_PLAYERS_REQUEST, getPlayers, api),
    takeLatest(PlayersTypes.LOGIN_PLAYER_REQUEST, loginPlayer, api),
    takeLatest(PlayersTypes.LOGOUT_PLAYER_REQUEST, logoutPlayer, api),
    takeLatest(PlayersTypes.SIGN_UP_PLAYER_REQUEST, signUpPlayer, api),
    takeLatest(GamesTypes.GET_GAMES_REQUEST, getGames, api),

    takeLatest(ManageGameTypes.CREATE_GAME_REQUEST, createGame, api),
    takeEvery(ManageGameTypes.CHANGE_GAME, changeGame),
    takeLatest(ManageGameTypes.JOIN_GAME_REQUEST, joinGame, api),
    takeLatest(ManageGameTypes.START_GAME_REQUEST, startGame, api),

    takeLatest(GameViewTypes.GAME_VIEW_REQUEST, getGameView, api),
    takeLatest(LeaderboardTypes.LEADERBOARD_REQUEST, getLeaderboard, api),

    takeLatest(ManageGameTypes.START_GAME_SUCCESS, watchEndOfTurn, api),

  ]);
}
