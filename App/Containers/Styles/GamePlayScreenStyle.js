import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  gameGridPlayerAndOpponentShips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})
