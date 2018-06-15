import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
// Styles
import styles from "./Styles/SquareOpponentGrid";
import Salvo from "./Salvo";
import { Colors } from "../Themes";

class SquareOpponentGrid extends Component {
  constructor(props) {
    super(props);
  }

  colorSalvo = square => {
    return square.ship.isShip ? Colors.bloodOrange : Colors.frost;
  };

  renderContent = square => {
    // numbers and letters of grid
    if (square.title || square.id === "00") {
      return <Text style={styles.label}>{square.title}</Text>;
    }

    if (this.props.square.salvo || this.props.newSalvo) {
      return (
        <Salvo length={this.props.length} color={this.colorSalvo(square)} />
      );
    }
  };

  render() {
    const square = this.props.square;

    let backgroundStyle, borderStyle;
    if (square.ship.isShip) {
      backgroundStyle = styles.shipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (square.ship.horizontal ? "True" : "False") +
            "AndPart" +
            square.ship.part
        ];
    } else if (square.hit) {
      backgroundStyle = styles.hitBackground;
      borderStyle = styles.standardBorder;
    } else if (this.props.newSalvo) {
      backgroundStyle = styles.currentSalvoBackground;
      borderStyle = styles.standardBorder;
    } else {
      borderStyle = styles.standardBorder;
    }

    return (
      <View
        style={[
          styles.basic,
          backgroundStyle,
          { width: this.props.length, height: this.props.length },
          borderStyle
        ]}
        pointerEvents="none"
      >
        {this.renderContent(square)}
      </View>
    );
  }
}

export default SquareOpponentGrid;
