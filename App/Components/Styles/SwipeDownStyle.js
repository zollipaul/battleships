import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  arrow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipeDown: {
    ...Fonts.style.h2,
    color: Colors.text,
  }
})
