import React from "react";
import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Features/GamesList/Containers/LaunchScreen";
import Header from "../Features/Header/Header";

const LaunchScreenNavigation = StackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen
    },
  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      header: <Header navigation={navigation} screenProps={screenProps} />,
      swipeEnabled: false,
      initialRoute: LaunchScreen
    })
  }
);

export default LaunchScreenNavigation;
