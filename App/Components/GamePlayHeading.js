// @flow

import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Styles/GamePlayHeadingStyle";
import { Colors } from "../Themes";

type Props = {
  salvoesLeft: number,
  stage: number,
  opponent: string,
  turn: number
};

export default class GamePlayHeading extends Component<Props> {
  salvoText = () => {
    const salvoesLeft = this.props.salvoesLeft;
    return salvoesLeft === 1
      ? "Fire one Shot away!"
      : salvoesLeft === 0
        ? "No Shots left!"
        : "Fire " + salvoesLeft + " Shots away!";
  };

  renderStage = () => {
    if (this.props.stage === "myTurnAndOpponentHasNotShot") {
      return <Text style={styles.stage}>{this.salvoText()}</Text>;
    }

    if (this.props.stage === "myTurnAndOpponentHasShot") {
      return (
        <View>
          <Text style={styles.stage}>{this.salvoText()}</Text>
          <Text style={styles.hurry}>
            Hurry up, {this.props.opponent} is waiting for you!
          </Text>
        </View>
      );
    }

    if (this.props.stage === "waitingForSalvoOfOpponent") {
      return (
        <View>
          <Text style={styles.stage}>Waiting on opponent</Text>)
          <ActivityIndicator size="large" color={Colors.frost} />
        </View>
      );
    }

    if (this.props.stage === "GameOver") {
      return (
        <View>
          <Text style={styles.stage}>Game Over</Text>
          <Text style={styles.stage}>Winner is: {this.props.winner}</Text>)
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.turn}>Turn {this.props.turn}</Text>
        {this.renderStage()}
      </View>
    );
  }
}
