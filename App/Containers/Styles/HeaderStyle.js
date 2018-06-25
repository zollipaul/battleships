import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerLoggedIn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 45,
    maxHeight: 45
  },
  headerTitle: {
    ...Fonts.style.h5,
    color: Colors.snow,
  },
  logoutButton: {
      // width: 10,
  },
  headerUser:{
    ...Fonts.style.h6,
    color: Colors.snow,
  },
  userView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleView: {
  },
  logoutView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerLoggedOutOrPlacingShipsOrGamePlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 45,
    maxHeight: 45
  },
})
