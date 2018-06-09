import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Styles
import styles from "./Styles/SquareTouchableStyle";
import { GameGrid } from "../Themes/index";
import Salvo from "./Salvo";
import { Colors } from '../Themes'

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salvo: false
    };
  }

  renderContent = square => {
    if (square.salvo || this.state.salvo) {
      return <Salvo length={this.props.length} color={square.ship.isShip ? Colors.bloodOrange : Colors.frost} />;
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
    } else {
      borderStyle = styles.standardBorder;
    }

    // no touchable for numbers and letters and first (left upper) square of grid
    if (square.title || square.id === "00") {
      return (
        <View
          style={[
            styles.basic,
            backgroundStyle,
            { width: this.props.length, height: this.props.length },
            borderStyle
          ]}
        >
          <Text style={styles.label}>{square.title}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.basic,
          backgroundStyle,
          { width: this.props.length, height: this.props.length },
          borderStyle
        ]}
        onPress={() => {
          this.props.toggleSalvo(square.id);
          this.setState(prevState => {
            return { salvo: !prevState.salvo };
          });
        }}
        // disable if (gameview shows salvo || five salvoes in grid are reached)
        disabled={square.salvo || this.props.fiveSalvoesReached}
      >
        {this.renderContent(square)}
      </TouchableOpacity>
    );
  }
}

export default Square;
