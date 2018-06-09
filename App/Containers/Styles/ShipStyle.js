import { StyleSheet } from 'react-native'
import { Colors, Metrics, Images } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  aircraftCarrier: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength*5,
    height: Metrics.placingShipsSquareLength,
    borderRadius: Metrics.borderRadius
  },
  battleship: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 4,
    height: Metrics.placingShipsSquareLength,
    borderRadius: Metrics.borderRadius
  },
  submarine: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
    borderRadius: Metrics.borderRadius
  },
  destroyer: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
    borderRadius: Metrics.borderRadius
  },
  patrolBoat: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 2,
    height: Metrics.placingShipsSquareLength,
    borderRadius: Metrics.borderRadius
  },
})
