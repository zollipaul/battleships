import React from "react";
import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import Header from '../Containers/Header'


const LaunchScreenNavigation = StackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen
    },
  },

  {
    navigationOptions: ({ navigation, screenProps }) => ({
      header: <Header navigation={navigation} screenProps={screenProps}/>,
      swipeEnabled: false,
      initialRoute: LaunchScreen
    })
  }
);

export default LaunchScreenNavigation;
