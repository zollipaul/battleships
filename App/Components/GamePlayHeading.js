import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Styles/GamePlayHeadingStyle";
import { Colors } from "../Themes";

export default class GamePlayHeading extends Component {
  static propTypes = {
    stage: PropTypes.string,
    turn: PropTypes.number,
    winner: PropTypes.string,
    salvoesLeft: PropTypes.number
  };

  salvoes = () => {
    const salvoesLeft = this.props.salvoesLeft;

    return salvoesLeft === 1
      ? "Fire one Shot away!"
      : salvoesLeft === 0
        ? "No Shots left!"
        : "Fire " + salvoesLeft + " Shots away!";
  };

  renderStage = () => {
    if (this.props.stage === "waitingForSalvoesOfPlayer") {
      return <Text style={styles.stage}>{this.salvoes()}</Text>;
    }

    if (this.props.stage === "waitingForSalvoesOfOpponent") {
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
