import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../Themes'

export default StyleSheet.create({
  basic: {
    justifyContent: "center",
    alignItems: "center"
  },
  shipBackground: {
    backgroundColor: Colors.skyblue
  },
  horizontalTrueAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderBottomLeftRadius: Metrics.borderRadius,
  },
  horizontalTrueAndPartEnd: {
    borderTopRightRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,

  },
  horizontalFalseAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderTopRightRadius: Metrics.borderRadius,
  },
  horizontalFalseAndPartEnd: {
    borderBottomLeftRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
  },
  horizontalTrueAndPartMid: {
  },
  horizontalFalseAndPartMid: {
  },
})
