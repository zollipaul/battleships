import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

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
    borderRadius: 15
  },
  battleship: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 4,
    height: Metrics.placingShipsSquareLength,
    borderRadius: 15
  },
  submarine: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
    borderRadius: 15
  },
  destroyer: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
    borderRadius: 15
  },
  patrolBoat: {
    backgroundColor: "skyblue",
    width: Metrics.placingShipsSquareLength * 2,
    height: Metrics.placingShipsSquareLength,
    borderRadius: 15
  },
})
