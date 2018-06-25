import React from "react";
import { StackNavigator } from "react-navigation";
import PlacingShipsScreen from "../Containers/PlacingShipsScreen";
import GamePlayScreen from "../Containers/GamePlayScreen";
import Header from "../Containers/Header";
import WaitingForOpponentScreen from "../Containers/WaitingForOpponentScreen";
import GameTabLoggedOut from "../Components/GameTabLoggedOut";
import GameTabNoActiveGame from "../Containers/GameTabNoActiveGame";
import { Animated, Easing } from "react-native";

const GameScreenStack = StackNavigator(
  {
    PlacingShipsScreen: {
      screen: PlacingShipsScreen
    },
    WaitingForOpponentScreen: {
      screen: WaitingForOpponentScreen
    },
    GamePlayScreen: {
      screen: GamePlayScreen
    },
    GameTabLoggedOut: {
      screen: GameTabLoggedOut
    },
    GameTabNoActiveGame: {
      screen: GameTabNoActiveGame
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />,
      gesturesEnabled: false
    }),
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
        useNativeDriver: true
      },
    }),
  }
);

export default GameScreenStack;
