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

  renderShip = ship => {
    if (!ship.isSunk) {
      return <OpponentShip ship={ship} />;
    }
  };

  render() {
    const ships = JSON.parse(JSON.stringify(Ships));
    const sinks = this.props.sinks;
    sinks.forEach(ship => {
      ships[ship.type].isSunk = true;
    });

    return (
      <View style={styles.container}>
        {this.renderShip(ships["patrolBoat"])}
        {this.renderShip(ships["battleship"])}
        <View style={styles.row}>
          {this.renderShip(ships["destroyer"])}
          {this.renderShip(ships["submarine"])}
        </View>
        {this.renderShip(ships["aircraftCarrier"])}
      </View>
    );
  }
}
