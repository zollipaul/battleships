import React from "react";
import { StackNavigator } from "react-navigation";
import Header from "../Features/Header/Header";
import LeaderboardScreen from "../Features/Leaderboard/LeaderboardScreen";

const LeaderboardStack = StackNavigator(
  {
    LeaderboardScreen: {
      screen: LeaderboardScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  }
);

export default LeaderboardStack;
