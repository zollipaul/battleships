import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  grid: {
    width: Metrics.placingShipsGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.eggplant,
  },
  centered: {
    alignItems: "center"
  }
});
