import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./Styles/GameTabLoggedOutStyle";

class NoLoginOrNoActiveGame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You need to login</Text>
        <Text style={styles.text}>or sign up to play a game!</Text>
      </View>
    );
  }
}

export default NoLoginOrNoActiveGame;
