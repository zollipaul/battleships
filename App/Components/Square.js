import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

// Styles
import styles from "./Styles/SquareStyle";
import Salvo from "./Salvo";
import { Colors } from '../Themes'

class Square extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    square: PropTypes.object.isRequired
  };

  renderContent = square => {
    if (square.title) {
      return <Text style={styles.label}>{square.title}</Text>;
    } else if (square.salvo) {
      return <Salvo length={this.props.length} color={Colors.frost}/>;
    }
  };

  render() {
    const square = this.props.square;
    let backgroundStyle, borderStyle;
    if (square.isShip) {
      backgroundStyle = styles.shipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (square.horizontal ? "True" : "False") +
            "AndPart" +
            square.part
        ];
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
      >
        {this.renderContent(square)}
      </View>
    );
  }
}

export default Square;
