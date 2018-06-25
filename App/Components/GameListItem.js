import React, { Component } from "react";
// import PropTypes from 'prop-types';
import styles from "./Styles/GameListItemStyle";
import { Text, TouchableOpacity } from "react-native";
import Immutable from 'seamless-immutable'

class GameListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const game = this.props.item;
    const gamePlayer2 = game.gamePlayers[1] ? (
      <Text>{game.gamePlayers[1].player.userName} </Text>
    ) : (
      <Text>No second Player yet...</Text>
    );

    // check if current user can join the game and define, if touchableOpacity is clickable and define style
    const currentUser = this.props.currentUser;
    let gamePlayerIdOfCurrentUser = null;
    if (currentUser !== null) {
      game.gamePlayers.forEach(gamePlayer => {
        if (gamePlayer.player.id === currentUser.id) {
          gamePlayerIdOfCurrentUser = gamePlayer.id;
        }
      });
    }

    const gameHasCurrentPlayer = gamePlayerIdOfCurrentUser !== null;
    const gameCanBeJoined = (game.gamePlayers.length === 1) && (!gameHasCurrentPlayer);

    const style = gameHasCurrentPlayer
      ? styles.canBeChanged
      : gameCanBeJoined
        ? styles.canBeJoined
        : styles.cannotBeChangedOrJoined;

    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          if (gameHasCurrentPlayer) {
            this.props.changeGame(gamePlayerIdOfCurrentUser);
          }
          if (gameCanBeJoined) {
            this.props.joinGame(game.id);
          }
        }}
        disabled={!gameHasCurrentPlayer && !gameCanBeJoined}
      >
        <Text style={styles.boldLabel}>
          {game.gamePlayers[0].player.userName} vs {gamePlayer2}
        </Text>
        <Text style={styles.label}>created: {game.created}</Text>
      </TouchableOpacity>
    );
  }
}

export default GameListItem;
