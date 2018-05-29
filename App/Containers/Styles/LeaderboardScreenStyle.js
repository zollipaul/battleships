import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.fire,
    borderBottomWidth: Metrics.bottomBorderTable,
    // marginVertical: Metrics.smallMargin,
    // justifyContent: 'center'
  },
  name: {
    flex: 4,
  },
  stats: {
    flex: 1.5,
  },
  textName: {
    // alignSelf: 'center',
    color: Colors.snow,
    marginBottom: Metrics.smallMargin
  },
  textStats: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
