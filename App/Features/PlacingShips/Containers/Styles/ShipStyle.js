import { StyleSheet } from 'react-native'
import { Colors, Metrics, Images } from '../../../../Themes/index'

export default StyleSheet.create({
  basic: {
    backgroundColor: Colors.ship,
    borderRadius: Metrics.borderRadius
  },
  aircraftCarrier: {
    width: Metrics.placingShipsSquareLength*5,
    height: Metrics.placingShipsSquareLength,
  },
  battleship: {
    width: Metrics.placingShipsSquareLength * 4,
    height: Metrics.placingShipsSquareLength,
  },
  submarine: {
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
  },
  destroyer: {
    width: Metrics.placingShipsSquareLength * 3,
    height: Metrics.placingShipsSquareLength,
  },
  patrolBoat: {
    width: Metrics.placingShipsSquareLength * 2,
    height: Metrics.placingShipsSquareLength,
  },
})
