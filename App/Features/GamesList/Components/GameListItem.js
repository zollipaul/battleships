import React, { PureComponent } from "react";
import styles from "./Styles/GameListItemStyle";
import { Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../../../Themes";
import FontAweSomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

class GameListItem extends PureComponent {
  getStage = () => {
    const stage = this.props.stage;
    if (stage === "placingShips") {
      return <Text style={styles.stage}>Place ships</Text>

      // return (
      //   <View style={styles.placeShips}>
      //     <MaterialCommunityIcon
      //       style={styles.ship}
      //       name={"grid-large"}
      //       size={30}
      //       color={Colors.white}
      //     >
      //
      //     </MaterialCommunityIcon>
      //     <MaterialCommunityIcon
      //       style={styles.pointer}
      //       name={"cursor-pointer"}
      //       size={35}
      //       color={Colors.highlight}
      //     />
      //   </View>)

    } else if (stage === "placingSalvoes") {
      return <Text style={styles.stage}>Turn: {this.props.turn}</Text>;
    } else if (stage === "gameOver") {
      return <Text style={styles.stage}>Winner: {this.props.winner}</Text>;
    }
  };

  render() {


    const gamePlayer2 = this.props.gamePlayers[1] ? (
      <Text>{this.props.gamePlayers[1].player.userName} </Text>
    ) : (
      <Text>...</Text>
    );

    // check if current user can join the game and define, if touchableOpacity is clickable and define style
    const currentUser = this.props.currentUser;
    let gamePlayerIdOfCurrentUser = null;
    if (currentUser !== null) {
      this.props.gamePlayers.forEach(gamePlayer => {
        if (gamePlayer.player.id === currentUser.id) {
          gamePlayerIdOfCurrentUser = gamePlayer.id;
        }
      });
    }

    const gameHasCurrentPlayer = gamePlayerIdOfCurrentUser !== null;
    const gameCanBeJoined =
      this.props.gamePlayers.length === 1 && !gameHasCurrentPlayer;
    //
    // const specificStyle = gameHasCurrentPlayer
    //   ? styles.canBeChanged
    //   : gameCanBeJoined
    //     ? styles.canBeJoined
    //     : styles.cannotBeChangedOrJoined;

    return (
      <TouchableOpacity
        style={styles.basic}
        onPress={() => {
          if (gameHasCurrentPlayer) {
            this.props.changeGame(gamePlayerIdOfCurrentUser);
          }
          if (gameCanBeJoined) {
            this.props.joinGame(this.props.id);
          }
        }}
        disabled={!gameHasCurrentPlayer && !gameCanBeJoined}
      >
        <View style={styles.col}>
          <Text style={styles.players}>
            {this.props.gamePlayers[0].player.userName} vs {gamePlayer2}
          </Text>
          <Text style={styles.time}>{this.props.created}</Text>
        </View>
        {this.getStage()}
      </TouchableOpacity>
    );
  }
}

export default GameListItem;
