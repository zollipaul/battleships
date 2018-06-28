import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";

export default StyleSheet.create({
  opponentGridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.eggplant
  },
});
