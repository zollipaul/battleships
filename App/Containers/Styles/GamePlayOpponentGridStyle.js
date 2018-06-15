import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/index";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
  opponentGridContainer: {
    flex: 1
  },
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    backgroundColor: Colors.eggplant
  },
  rows: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});
