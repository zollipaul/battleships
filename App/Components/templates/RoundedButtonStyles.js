import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30
  },
  active: {
    backgroundColor: Colors.fire,
  },
  inactive: {
    backgroundColor: Colors.charcoal,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
