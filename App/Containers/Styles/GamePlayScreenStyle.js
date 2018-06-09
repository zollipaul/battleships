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
  gameGridPlayerAndOpponentShips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  playerGrid: {
    width: Metrics.gamePlayPlayerGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    backgroundColor: Colors.eggplant,
  },
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    backgroundColor: Colors.eggplant,
  },
})
