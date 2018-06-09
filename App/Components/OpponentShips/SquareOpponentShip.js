import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

// Styles
import styles from "./Styles/SquareOpponentShipStyle";
import Salvo from '../Salvo'
import { Colors } from '../../Themes'

export default class SquareOpponentShip extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    square: PropTypes.object.isRequired
  };

  renderSalvo = () => {
    if (this.props.isSunk) {
      return <Salvo length={this.props.length} color={Colors.bloodOrange}/>
    }
  }

  render() {
    const square = this.props.square;
    let backgroundStyle, borderStyle;
    backgroundStyle = styles.shipBackground;
    borderStyle =
      styles[
        "horizontal" +
          (square.horizontal ? "True" : "False") +
          "AndPart" +
          square.part
      ];

    return (
      <View
        style={[
          styles.basic,
          backgroundStyle,
          { width: this.props.length, height: this.props.length },
          borderStyle
        ]}
      >
        {this.renderSalvo()}
      </View>
    );
  }
}
