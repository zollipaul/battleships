import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../Themes/index'

export default StyleSheet.create({
  playerGrid: {
    width: Metrics.gamePlayPlayerGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    backgroundColor: Colors.eggplant,
  },
})
