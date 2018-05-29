import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PlayersActions from "../Redux/PlayersRedux";

// Styles
import styles from "./Styles/HeaderStyle";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: this.props.navigation.state.routeName
    };
  }

  renderTitleOfGameScreens = () => {
      const game = this.props.gameView.payload.game;

      const gamePlayer2 = game.gamePlayers[1] ? (
        <Text>{game.gamePlayers[1].player.userName} </Text>
      ) : (
        <Text>No second Player yet...</Text>
      );

      return (
        <Text style={styles.headerTitle}>
          {game.gamePlayers[0].player.userName} vs {gamePlayer2}
        </Text>
      );
  };

  render() {
    if (this.props.games !== null) {
      // Logged out
      if (
        this.state.routeName === "LaunchScreen" &&
        this.props.games.currentUser === null
      ) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShips}>
            <View style={styles.titleView}>
              <Text style={styles.headerTitle}>Games</Text>
            </View>
          </View>
        );
      }

      // Logged in
      if (
        this.state.routeName === "LaunchScreen" &&
        this.props.games.currentUser
      ) {
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

      // PlacingShips
      if (this.state.routeName === "PlacingShipsScreen" && this.props.gameView.payload) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShips}>
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
    gameView: state.gameView,
    nav: state.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(PlayersActions.logoutPlayerRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
