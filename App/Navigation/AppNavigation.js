import React from 'react'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import WaitingForOpponent from '../Containers/WaitingForOpponentScreen'
import LaunchScreenNavigation from './LaunchScreenNavigation'
import GameScreenStack from './GameScreenNavigation'
import LeaderboardScreen from '../Containers/LeaderboardScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  LaunchScreenStack: {
    screen: LaunchScreenNavigation,
    navigationOptions: {
      title: 'All Games'
    }},
  GameScreenStack: {
    screen: GameScreenStack,
    navigationOptions: {
      title: 'Game',
    }
  },
  LeaderboardScreen: {
    screen: LeaderboardScreen,
    navigationOptions: {
      title: 'Leaderboard',
    }
  },
}, {
  // Default config for all screens
  initialRouteName: 'LaunchScreenStack',
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, tintColor}) => {
      const {routeName} = navigation.state
      let iconName
      if (routeName === 'LaunchScreenStack') {
        iconName = 'home'
      } else if (routeName === 'GameScreenStack') {
        iconName = 'gamepad'
      }
      else if (routeName === 'LeaderboardScreen') {
        iconName = 'trophy'
      }
      return <Icon name={iconName} size={25} color={tintColor}/>
    }
  }),
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false
})

export default PrimaryNav
