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
    const ships = JSON.parse(JSON.stringify(Ships))
    const sinks = this.props.sinks;
    sinks.forEach(ship => {
      ships[ship.type].isSunk = true
    })

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <OpponentShip ship={ships["patrolBoat"]} />
        </View>

        <View style={styles.row}>
          <OpponentShip ship={ships["battleship"]} />

        </View>
        <View style={styles.row}>
          <OpponentShip ship={ships["destroyer"]} />
          <OpponentShip ship={ships["submarine"]} />
        </View>
        <View style={styles.row}>
          <OpponentShip ship={ships["aircraftCarrier"]} />
        </View>
      </View>
    );
  }
}
