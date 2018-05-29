import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/";

export default StyleSheet.create({
  basic: {
    borderColor: Colors.frost,
    borderWidth: 1
  },
  empty: {
    backgroundColor: Colors.eggplant
  },
  ship: {
    backgroundColor: Colors.skyblue
  },
  salvo: {
    backgroundColor: Colors.ricePaper
  },
  hit: {
    backgroundColor: Colors.bloodOrange
  },
  boldLabel: {
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.snow,
    textAlign: "center",
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: "center",
    color: Colors.snow
  }
});
