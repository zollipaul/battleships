import React from "react";
import { TabNavigator, TabBarBottom } from "react-navigation";
import LaunchScreenNavigation from "./LaunchScreenNavigation";
import GameScreenStack from "./GameScreenNavigation";
import LeaderboardStack from "./LeaderBoardNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import {store } from '../Containers/App'
import ManageGameActions from '../Redux/ManageGameRedux'
import styles from './Styles/NavigationStyles'
import { Colors, } from '../Themes'

// Manifest of possible screens
const PrimaryNav = TabNavigator(
  {
    LaunchScreenStack: {
      screen: LaunchScreenNavigation,
    },
    GameScreenStack: {
      screen: GameScreenStack,
    },
    LeaderboardScreen: {
      screen: LeaderboardStack,
    }
  },
  {
    // Default config for all screens
    initialRouteName: "LaunchScreenStack",
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "LaunchScreenStack") {
          iconName = "home";
        } else if (routeName === "GameScreenStack") {
          iconName = "gamepad";
        } else if (routeName === "LeaderboardScreen") {
          iconName = "trophy";
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
      tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
        if (scene.route.routeName === "GameScreenStack") {
          store.dispatch(ManageGameActions.clickOnGameInTabBar())
        } else {
          jumpToIndex(scene.index);
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.navBarIconActive,
      inactiveTintColor: Colors.navBarIconInactive,
      showLabel: false,
      style: styles.navBar
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false
  }
);

export default PrimaryNav;
