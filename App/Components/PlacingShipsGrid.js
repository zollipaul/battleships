import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Styles/PlacingShipsGridStyle";
import { View } from "react-native";
import { Metrics } from "../Themes";
import Square from "./Square";

export default class PlacingShipsGrid extends Component {
  static propTypes = {
    gameView: PropTypes.object.isRequired
  }

  renderSquares = () => {
    const playerId = this.props.gameView.payload.id;
    return this.props.gameView.payload.gameGrids[playerId].map(square => {
      return (
        <Square
          square={square}
          key={square.id}
          length={Metrics.placingShipsSquareLength}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.centered}>
        <View
          style={styles.grid}
          // ref={this.props.setGridRef}
        >
          {this.renderSquares()}
        </View>
      </View>
    );
  }
}
