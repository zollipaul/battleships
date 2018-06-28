import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../Themes/index'

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
    color: Colors.white,
    marginBottom: Metrics.smallMargin
  },
  textStats: {
    alignSelf: 'center',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.white
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
