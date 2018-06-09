import { StyleSheet } from "react-native";
import { Metrics } from '../../../Themes/index'

export default StyleSheet.create({
  rows: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  col: {
    height: Metrics.gamePlayPlayerGridWidth,
    justifyContent: "space-around",
  },
});
