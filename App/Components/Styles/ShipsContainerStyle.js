import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.doubleBaseMargin,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
