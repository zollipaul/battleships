import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    backgroundColor: Colors.eggplant,
  },
})
