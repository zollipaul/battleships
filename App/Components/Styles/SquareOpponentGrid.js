import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/index";

export default StyleSheet.create({
  basic: {
    borderColor: Colors.frost,
    justifyContent: "center",
    alignItems: "center"
  },
  shipBackground: {
    backgroundColor: Colors.skyblue
  },
  hitBackground: {
    backgroundColor: Colors.bloodOrange
  },
  currentSalvoBackground: {
    backgroundColor: Colors.currentSalvoBackground
  },
  horizontalTrueAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderBottomLeftRadius: Metrics.borderRadius,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1
  },
  horizontalTrueAndPartEnd: {
    borderTopRightRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },
  horizontalFalseAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderTopRightRadius: Metrics.borderRadius,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1
  },
  horizontalFalseAndPartEnd: {
    borderBottomLeftRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  horizontalTrueAndPartMid: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  horizontalFalseAndPartMid: {
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  standardBorder: {
    borderWidth: 1
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
