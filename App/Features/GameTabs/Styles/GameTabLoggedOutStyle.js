import { StyleSheet } from "react-native";
import { ApplicationStyles } from "../../../Themes/index";
import { Colors } from "../../../Themes/index";
import Fonts from '../../../Themes/Fonts'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  text: {
    ...Fonts.style.h4,
    color: Colors.text,
    textAlign: 'center'
  }
});
