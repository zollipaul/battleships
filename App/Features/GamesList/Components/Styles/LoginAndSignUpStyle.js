import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";
import { human } from 'react-native-typography'

export default StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    backgroundColor: Colors.background
  },
  input: {
    textAlign: "center",
    color: Colors.white,
    borderRadius: 5,
    width: "80%",
    marginBottom: Metrics.baseMargin,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1
  },
  buttons: {
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  login: {
    width: 100,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  orText: {
    height: 40,
marginHorizontal: Metrics.doubleBaseMargin,
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    width: 100,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  buttonText: {
    ...human.bodyObject,
    color: Colors.white
  }
});
