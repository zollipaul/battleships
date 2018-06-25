import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    backgroundColor: Colors.fire,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
