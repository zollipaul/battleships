import React, { Component } from "react";
import { View } from "react-native";
import OpponentShip from "./OpponentShip";
import Ships from "../../Data/OpponentShips";
import PropTypes from "prop-types";

// Styles
import styles from "./Styles/OpponentShipsContainerStyle";

export default class OpponentShipsContainer extends Component {
  static propTypes = {
    sinks: PropTypes.array.isRequired
  };

  render() {
    const sinks = this.props.sinks;
    sinks.forEach(ship => {
      Ships[ship.type].isSunk = true
    })

    return (
      <View style={styles.rows}>
        <View style={styles.col}>
          <OpponentShip ship={Ships["aircraftCarrier"]} />
          <OpponentShip ship={Ships["battleship"]} />
        </View>
        <View style={styles.col}>
          <OpponentShip ship={Ships["submarine"]} />
          <OpponentShip ship={Ships["destroyer"]} />
          <OpponentShip ship={Ships["patrolBoat"]} />
        </View>
      </View>
    );
  }
}
