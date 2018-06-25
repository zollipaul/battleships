import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  shootContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  torpedoUp: {
    width: Metrics.gamePlayOpponentGridWidth * .15,
    height: Metrics.gamePlayOpponentGridWidth * .15
  },
})
