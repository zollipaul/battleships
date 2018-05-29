import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 0,
    width: "80%",
    // height: "20%",
    backgroundColor: Colors.background
  },
  input: {
    textAlign: 'center',
    color: Colors.snow,
    height: 40,
    borderColor: Colors.snow,
    borderWidth: 1
  },
})
