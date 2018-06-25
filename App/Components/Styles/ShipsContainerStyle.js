import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  aircraftCarrierContainer: {
    flex: 0.45,

    justifyContent: 'center'
  },
  otherShipsContainer: {
    flex: 0.55,
    justifyContent: 'space-around',
    // alignItems: 'center'
  },

  row: {
        // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  rotationTip: {
    position: 'absolute',
    left: -150,
  },
  text: {
fontSize: 14,
    color: Colors.text
  }
})
