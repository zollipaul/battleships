import React, { Component } from "react";
import SquarePlayerGrid from "./SquarePlayerGrid";
import { View } from "react-native";
import styles from "./Styles/GamePlayPlayerGridStyle";
import { Metrics } from "../../../Themes/index";

export default class GamePlayPlayerGrid extends Component {
  renderPlayerGrid = () => {
    return this.props.grid.map(square => {
      return (
        <SquarePlayerGrid
          title={square.title}
          salvo={square.salvo}
          isShip={square.isShip}
          horizontal={square.horizontal}
          part={square.part}
          key={square.id}
          length={Metrics.gamePlayPlayerSquareLength}
        />
      );
    });
  };

  render() {
    return <View style={styles.playerGrid}>{this.renderPlayerGrid()}</View>;
  }
}
