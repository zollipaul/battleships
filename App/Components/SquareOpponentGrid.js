import React, { Component, PureComponent } from "react";
import { Text, View } from "react-native";
// Styles
import styles from "./Styles/SquareOpponentGrid";
import Salvo from "./Salvo";
import Dot from "./Dot";
import Shot from "../Components/Shot";

import { Colors } from "../Themes";

class SquareOpponentGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      switch: false
    };
  }

  colorSalvo = () => {
    return this.props.isShip ? Colors.bloodOrange : Colors.frost;
  };

  renderContent = () => {
    // numbers and letters of grid
    if (this.props.title || this.props.id === "00") {
      return <Text style={styles.label}>{this.props.title}</Text>;
    }

    // oldSalvo
    else if (this.props.salvo) {
      return (
        <Salvo length={this.props.length} color={this.colorSalvo()} />
      );
    }

    // newSalvo
    else if (this.props.newSalvo) {
      return <Dot length={this.props.length} color={this.colorSalvo()} />;
    }
  };

  shoot() {
    if (this.props.shootNow) {
      return (
        <Shot
          shotPosition={{
            locationX: this.props.length / 2,
            locationY: this.props.length / 2
          }}
          resetShoot={this.props.resetShoot}
          id={this.props.newSalvoId}
        />
      );
    }
  }

  render() {
    if (this.props.id === "A3") {
      console.log(this.props);
    }

    let backgroundStyle, borderStyle;
    if (this.props.isShip) {
      backgroundStyle = styles.shipBackground;
      borderStyle =
        styles[
          "horizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
    } else if (this.props.hit) {
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
        {this.renderContent()}
        {this.shoot()}
      </View>
    );
  }
}

export default SquareOpponentGrid;
