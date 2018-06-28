import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";

export default StyleSheet.create({
  basic: {
    borderColor: Colors.grid,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    textAlign: "center",
    color: Colors.white
  }
});
