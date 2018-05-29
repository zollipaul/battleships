import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

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
  grid: {
    width: Metrics.placingShipsGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
})
