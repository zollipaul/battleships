import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../../Themes/index'
import { human } from 'react-native-typography'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  label: {
    textAlign: 'center',
    color: Colors.white
  },
  sectionHeader: {
    marginLeft: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background
  },
  sectionHeaderText: {
    ...human.headlineObject,
    color: Colors.white,
  },
})
