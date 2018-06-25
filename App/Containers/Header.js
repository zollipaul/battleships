import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PlayersActions from "../Redux/PlayersRedux";
import Immutable from "seamless-immutable";

// Styles
import styles from "./Styles/HeaderStyle";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderTitleOfGameScreens = () => {
    const gamePlayers  = this.props.gameView.payload.game.gamePlayers;
    const gamePlayer2 = gamePlayers[1] ? (
      <Text>{gamePlayers[1].player.userName} </Text>
    ) : (
      <Text>No second Player yet...</Text>
    );

    return (
      <Text style={styles.headerTitle}>
        {gamePlayers[0].player.userName} vs {gamePlayer2}
      </Text>
    );
  };

  render() {
    const routeName = this.props.navigation.state.routeName.valueOf();
    if (this.props.games !== null) {
      // Logged out
      if (
        routeName === "LaunchScreen" &&
        this.props.games.currentUser === null
      ) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Games</Text>
            </View>
          </View>
        );
      }

      // Logged in, AllGamesTab
      if (routeName === "LaunchScreen" && this.props.games.currentUser) {
        return (
          <View style={styles.headerLoggedIn}>
            <View style={styles.userView}>
              <Text style={styles.headerUser}>
                {this.props.games.currentUser.userName}
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Games</Text>
            </View>
            <View style={styles.logoutView}>
              <TouchableOpacity onPress={() => this.props.logout()}>
                <Text style={styles.headerTitle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }


      // Logged in, GameTab
      if (routeName === "GameTabNoActiveGame" && this.props.games.currentUser) {
        return (
          <View style={styles.headerLoggedIn}>
            <View style={styles.userView}>
              <Text style={styles.headerUser}>
                {this.props.games.currentUser.userName}
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Game</Text>
            </View>
            <View style={styles.logoutView}>
              <TouchableOpacity onPress={() => this.props.logout()}>
                <Text style={styles.headerTitle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      if (routeName === "PlacingShipsScreen" && this.props.gameView.payload) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>
                {this.renderTitleOfGameScreens()}
              </Text>
            </View>
          </View>
        );
      }

      if (routeName === "GamePlayScreen" && this.props.gameView.payload) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>
                {this.renderTitleOfGameScreens()}
              </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.payload,
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(PlayersActions.logoutPlayerRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
