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
  playerGrid: {
    width: Metrics.gamePlayPlayerGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
})
