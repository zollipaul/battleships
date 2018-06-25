import React, { Component } from "react";
import { View, Text } from "react-native";
import Ship from "../Containers/Ship";

// Styles
import styles from "./Styles/ShipsContainerStyle";
import Ships from "../Data/Ships";

export default class ShipsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationTipEnabled: true
    };
  }

  renderRotationTip = () => {
    if (this.state.rotationTipEnabled) {
      return <Text style={styles.text}>Double tap to rotate!</Text>;
    }
  };

  disableRotationTip = () => {
    this.setState({ rotationTipEnabled: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.otherShipsContainer}>
          <View style={styles.row}>
            <Ship
              ship={Ships["5"]}
              disableRotationTip={this.disableRotationTip}
            />
            <Ship
              ship={Ships["2"]}
              disableRotationTip={this.disableRotationTip}
            />
          </View>

          <View style={styles.row}>
            <Ship
              ship={Ships["3"]}
              disableRotationTip={this.disableRotationTip}
            />
            <Ship
              ship={Ships["4"]}
              disableRotationTip={this.disableRotationTip}
            />
          </View>
        </View>

        <View style={styles.aircraftCarrierContainer}>
          <View style={styles.rotationTip}>{this.renderRotationTip()}</View>
          <Ship
            ship={Ships["1"]}
            disableRotationTip={this.disableRotationTip}
          />
        </View>
      </View>
    );
  }
}
