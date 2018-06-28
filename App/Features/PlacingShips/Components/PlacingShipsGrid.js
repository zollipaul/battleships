import React, { Component } from "react";
import styles from "./Styles/PlacingShipsGridStyle";
import { View } from "react-native";
import { Metrics } from "../../../Themes/index";
import SquarePlacingShips from "./SquarePlacingShips";

export default class PlacingShipsGrid extends Component {
  renderSquares = () => {
    const playerId = this.props.gameView.payload.id;
    return this.props.gameView.payload.gameGrids[playerId].map(square => {
      return (
        <SquarePlacingShips
          title={square.title}
          key={square.id}
          length={Metrics.placingShipsSquareLength}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.centered}>
        <View style={styles.grid} onLayout={this.props.measureLayout}>
          {this.renderSquares()}
        </View>
      </View>
    );
  }
}
