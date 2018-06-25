import { put, select, call } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { getPlacingShipsGridY } from './PlacingShipsGridPositionSagas'
import GamesActions from '../Redux/GamesRedux'
import ShipsActions from '../Redux/ShipsRedux'
import SalvoActions from '../Redux/SalvoRedux'
import GameViewActions from '../Redux/GameViewRedux'

// // exported to make available for tests
// export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  // if (__DEV__ && console.tron) {
  //   // straight-up string logging
  //   console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  //
  //   // logging an object for better clarity
  //   console.tron.log({
  //     message: 'pass objects for better logging',
  //     someGeneratorFunction: selectAvatar
  //   })
  //
  //   // fully customized!
  //   const subObject = {a: 1, b: [1, 2, 3], c: true}
  //   subObject.circularDependency = subObject // osnap!
  //   console.tron.display({
  //     name: '🔥 IGNITE 🔥',
  //     preview: 'You should totally expand this',
  //     value: {
  //       '💃': 'Welcome to the future!',
  //       subObject,
  //       someInlineFunction: () => true,
  //       someGeneratorFunction: startup,
  //       someNormalFunction: selectAvatar
  //     }
  //   })
  // }

  yield call(getPlacingShipsGridY)
  yield put(GamesActions.getGamesRequest())
  yield put(GameViewActions.resetGameView())
  yield put(ShipsActions.resetAllShips());
  yield put(SalvoActions.resetAllSalvoes());

  console.log('startup')

  // const avatar = yield select(selectAvatar)
  // // only get if we don't have it yet
  // if (!is(String, avatar)) {
  //   yield put(GithubActions.userRequest('GantMan'))
  // }
}
