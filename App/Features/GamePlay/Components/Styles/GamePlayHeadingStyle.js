import { StyleSheet } from 'react-native'
import { Colors,Fonts } from '../../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  turn: {
    ...Fonts.style.h2,
    color: Colors.text
  },
  stage: {
    fontSize: 14,
    color: Colors.text
  },
  hurry: {
    fontSize: 12,
    color: Colors.bloodOrange

  },
})
