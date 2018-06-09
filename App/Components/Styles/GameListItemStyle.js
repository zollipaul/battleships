import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  canBeChanged: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  canBeJoined: {
    flex: 1,
    backgroundColor: Colors.skyblue,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  cannotBeChangedOrJoined: {
    flex: 1,
    backgroundColor: Colors.charcoal,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
})
