import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  bottomBorderTable: 1.5,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,

  placingShipsGridWidth: width* 0.9,
  placingShipsSquareLength: width*0.9 * 0.0905,
  borderRadius: width*0.9 * 0.0905 / 2,

  gamePlayPlayerGridWidth: (Platform.OS === 'ios') ? width *0.6 : width *0.55,
  gamePlayPlayerSquareLength: (Platform.OS === 'ios') ? width*0.6* 0.0905 : width*0.55* 0.0905,

  gamePlayOpponentGridWidth: width *0.8,
  gamePlayOpponentSquareLength: width*0.8* 0.0905,

  crosshair: width* 0.4,

  navBarHeight: (Platform.OS === 'ios') ? 45 : 40,
  // navBarHeight: (Platform.OS === 'ios') ? 45 : 45,

  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
