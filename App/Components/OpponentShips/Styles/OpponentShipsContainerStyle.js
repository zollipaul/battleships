import { StyleSheet } from "react-native";
import { Metrics } from '../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.gamePlayPlayerGridWidth/2,
    justifyContent: "space-around",
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-around",
  },
});
