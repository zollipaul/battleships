import React from "react";
import { StackNavigator } from "react-navigation";
import PlacingShipsScreen from "../Containers/PlacingShipsScreen";
import GamePlayScreen from "../Containers/GamePlayScreen";
import Header from '../Containers/Header'

const GameScreenStack = StackNavigator(
  {
    PlacingShipsScreen: {
      screen: PlacingShipsScreen
    },
    GamePlayScreen: {
      screen: GamePlayScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({

      header: <Header navigation={navigation}/>,
      // header: navigation.state.params ? <Header game={navigation.state.params.game} navigation={navigation}/> : null,
      swipeEnabled: false
    })
  }
);

export default GameScreenStack;
