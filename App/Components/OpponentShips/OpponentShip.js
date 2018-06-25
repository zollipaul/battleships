import React, { Component } from "react";
import { View } from "react-native";
import SquareOpponentShip from "./SquareOpponentShip";
import styles from "./Styles/OpponentShipStyle";

export default class OpponentShip extends Component {

  render() {
    const ship = this.props.ship
    return (
      <View style={styles.ship}>
        {ship.squares.map((square, i) => {
          return <SquareOpponentShip key={i} square={square} length={20} isSunk={ship.isSunk} />;
        })}
      </View>
    );
  }
}
