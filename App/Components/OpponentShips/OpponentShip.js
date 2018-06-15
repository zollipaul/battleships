import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import SquareOpponentShip from "./SquareOpponentShip";
import styles from "./Styles/OpponentShipStyle";

export default class OpponentShip extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

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
