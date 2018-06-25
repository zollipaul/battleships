import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  sectionHeader: {
    marginVertical: Metrics.doubleBaseMargin,
  },
  sectionHeaderText: {
    ...Fonts.style.h4,
    color: Colors.text,
    textAlign: 'center'
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
