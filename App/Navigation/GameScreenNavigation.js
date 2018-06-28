import React from "react";
import { StackNavigator } from "react-navigation";
import PlacingShipsScreen from "../Features/PlacingShips/Containers/PlacingShipsScreen";
import GamePlayScreen from "../Features/GamePlay/Containers/GamePlayScreen";
import Header from "../Features/Header/Header";
import WaitingForOpponentScreen from "../Features/PlacingShips/Containers/WaitingForOpponentScreen";
import GameTabLoggedOut from "../Features/GameTabs/GameTabLoggedOut";
import GameTabNoActiveGame from "../Features/GameTabs/GameTabNoActiveGame";
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
