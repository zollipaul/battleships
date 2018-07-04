import React from "react";
import { StackNavigator } from "react-navigation";
import PlacingShipsScreen from "../Features/PlacingShips/Containers/PlacingShipsScreen";
import GamePlayScreen from "../Features/GamePlay/Containers/GamePlayScreen";
import Header from "../Features/Header/Header";
import WaitingForOpponentScreen from "../Features/Waiting/Containers/WaitingForOpponentScreen";
import GameTabLoggedOut from "../Features/Waiting/Components/GameTabLoggedOut";
import Loading from "../Features/Waiting/Components/Loading";

import GameTabNoActiveGame from "../Features/Waiting/Components/GameTabNoActiveGame";
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
    },
    Loading: {
      screen: Loading
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
