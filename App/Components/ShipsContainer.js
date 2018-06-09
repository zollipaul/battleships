import React, { Component } from "react";
import { View } from "react-native";
import Ship from "../Containers/Ship";

// Styles
import styles from "./Styles/ShipsContainerStyle";
import Ships from "../Data/Ships";

export default class ShipsContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Ship ship={Ships["3"]} />
          <Ship ship={Ships["4"]} />
          <Ship ship={Ships["5"]} />
        </View>

        <View style={styles.row}>
          <Ship ship={Ships["1"]} />
          <Ship ship={Ships["2"]} />
        </View>
      </View>
    );
  }
}
